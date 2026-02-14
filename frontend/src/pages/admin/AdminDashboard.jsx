import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./admin.css";

const PAGE_SIZE = 6;
const MAX_IMAGE_SIZE_MB = 3;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const emptyCategory = { id: null, nombre: "", slug: "", activa: true };
const emptyProduct = {
  id: null,
  nombre: "",
  slug: "",
  descripcion: "",
  categoria_id: "",
  activo: true,
  imagen: null,
  imagen_url: "",
};

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const extractErrorMessage = (error, fallback) => {
  const data = error?.response?.data;
  if (typeof data?.detail === "string") return data.detail;
  if (Array.isArray(data?.detail) && data.detail[0]) return String(data.detail[0]);
  if (data && typeof data === "object") {
    const first = Object.values(data)[0];
    if (Array.isArray(first) && first[0]) return String(first[0]);
    if (typeof first === "string") return first;
  }
  return fallback;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");
  const toastTimeoutRef = useRef(null);
  const [tab, setTab] = useState("productos");
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [catForm, setCatForm] = useState(emptyCategory);
  const [prodForm, setProdForm] = useState(emptyProduct);
  const [catSlugTouched, setCatSlugTouched] = useState(false);
  const [prodSlugTouched, setProdSlugTouched] = useState(false);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("todos");
  const [toast, setToast] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [localImagePreview, setLocalImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const authConfig = useMemo(
    () => ({ headers: { Authorization: `Token ${token}` } }),
    [token]
  );

  const imagePreview = localImagePreview || prodForm.imagen_url || "";

  const catNameMissing = !catForm.nombre.trim();
  const catSlugMissing = !catForm.slug.trim();
  const catSlugDuplicate = categorias.some(
    (c) => c.id !== catForm.id && (c.slug || "").toLowerCase() === catForm.slug.trim().toLowerCase()
  );

  const prodNameMissing = !prodForm.nombre.trim();
  const prodSlugMissing = !prodForm.slug.trim();
  const prodCategoryMissing = !String(prodForm.categoria_id || "").trim();
  const prodSlugDuplicate = productos.some(
    (p) => p.id !== prodForm.id && (p.slug || "").toLowerCase() === prodForm.slug.trim().toLowerCase()
  );

  const categoryFormInvalid = catNameMissing || catSlugMissing || catSlugDuplicate;
  const productFormInvalid =
    prodNameMissing ||
    prodSlugMissing ||
    prodCategoryMissing ||
    prodSlugDuplicate ||
    !!imageError;

  const pushToast = useCallback((type, message) => {
    setToast({ type, message });
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 3200);
  }, []);

  const resetForms = useCallback(() => {
    setCatForm(emptyCategory);
    setProdForm(emptyProduct);
    setCatSlugTouched(false);
    setProdSlugTouched(false);
    setLocalImagePreview("");
    setImageError("");
  }, []);

  useEffect(
    () => () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    },
    []
  );

  useEffect(() => {
    if (!prodForm.imagen) {
      setLocalImagePreview("");
      return undefined;
    }
    const objectUrl = URL.createObjectURL(prodForm.imagen);
    setLocalImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [prodForm.imagen]);

  useEffect(() => {
    setPage(1);
  }, [tab, search, stateFilter]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [me, cRes, pRes] = await Promise.all([
        api.get("/api/admin/me/", authConfig),
        api.get("/api/admin/catalogo/categorias/", authConfig),
        api.get("/api/admin/catalogo/productos/", authConfig),
      ]);
      if (!me.data?.is_staff) {
        throw new Error("No autorizado");
      }
      setCategorias(cRes.data || []);
      setProductos(pRes.data || []);
    } catch {
      localStorage.removeItem("admin_token");
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [authConfig, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    loadData();
  }, [token, navigate, loadData]);

  const saveCategory = async (e) => {
    e.preventDefault();
    setError("");
    if (categoryFormInvalid) {
      pushToast("error", "Corrige los campos de categoria antes de guardar.");
      return;
    }
    try {
      if (catForm.id) {
        await api.patch(
          `/api/admin/catalogo/categorias/${catForm.id}/`,
          { nombre: catForm.nombre, slug: catForm.slug, activa: catForm.activa },
          authConfig
        );
        pushToast("success", "Categoria actualizada.");
      } else {
        await api.post(
          "/api/admin/catalogo/categorias/",
          { nombre: catForm.nombre, slug: catForm.slug, activa: catForm.activa },
          authConfig
        );
        pushToast("success", "Categoria creada.");
      }
      resetForms();
      await loadData();
    } catch (err) {
      const message = extractErrorMessage(err, "No se pudo guardar la categoria.");
      setError(message);
      pushToast("error", message);
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    setError("");
    if (productFormInvalid) {
      pushToast("error", "Corrige los campos de producto antes de guardar.");
      return;
    }
    try {
      const hasImage = !!prodForm.imagen;
      if (prodForm.id) {
        if (hasImage) {
          const fd = new FormData();
          fd.append("nombre", prodForm.nombre);
          fd.append("slug", prodForm.slug);
          fd.append("descripcion", prodForm.descripcion);
          fd.append("categoria_id", prodForm.categoria_id);
          fd.append("activo", prodForm.activo);
          fd.append("imagen", prodForm.imagen);
          await api.patch(`/api/admin/catalogo/productos/${prodForm.id}/`, fd, authConfig);
        } else {
          await api.patch(
            `/api/admin/catalogo/productos/${prodForm.id}/`,
            {
              nombre: prodForm.nombre,
              slug: prodForm.slug,
              descripcion: prodForm.descripcion,
              categoria_id: prodForm.categoria_id,
              activo: prodForm.activo,
            },
            authConfig
          );
        }
        pushToast("success", "Producto actualizado.");
      } else {
        const fd = new FormData();
        fd.append("nombre", prodForm.nombre);
        fd.append("slug", prodForm.slug);
        fd.append("descripcion", prodForm.descripcion);
        fd.append("categoria_id", prodForm.categoria_id);
        fd.append("activo", prodForm.activo);
        if (prodForm.imagen) fd.append("imagen", prodForm.imagen);
        await api.post("/api/admin/catalogo/productos/", fd, authConfig);
        pushToast("success", "Producto creado.");
      }
      resetForms();
      await loadData();
    } catch (err) {
      const message = extractErrorMessage(err, "No se pudo guardar el producto.");
      setError(message);
      pushToast("error", message);
    }
  };

  const requestDelete = (type, item) => {
    setPendingDelete({ type, id: item.id, nombre: item.nombre });
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await api.delete(`/api/admin/catalogo/${pendingDelete.type}/${pendingDelete.id}/`, authConfig);
      pushToast("success", "Registro eliminado.");
      setPendingDelete(null);
      await loadData();
    } catch {
      const message = "No se pudo eliminar el registro.";
      setError(message);
      pushToast("error", message);
    } finally {
      setDeleting(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/admin/logout/", {}, authConfig);
    } catch {
      // noop
    } finally {
      localStorage.removeItem("admin_token");
      navigate("/admin/login");
    }
  };

  const startEditCategory = (item) => {
    setCatForm(item);
    setCatSlugTouched(true);
  };

  const startEditProduct = (item) => {
    setProdForm({
      id: item.id,
      nombre: item.nombre,
      slug: item.slug || "",
      descripcion: item.descripcion || "",
      categoria_id: item.categoria?.id || "",
      activo: item.activo,
      imagen: null,
      imagen_url: item.imagen || "",
    });
    setProdSlugTouched(true);
    setImageError("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setProdForm((p) => ({ ...p, imagen: null }));
      setImageError("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setImageError("El archivo debe ser una imagen valida.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setImageError(`La imagen supera ${MAX_IMAGE_SIZE_MB}MB.`);
      return;
    }
    setImageError("");
    setProdForm((p) => ({ ...p, imagen: file }));
  };

  const currentItems = tab === "categorias" ? categorias : productos;

  const filteredItems = currentItems.filter((item) => {
    const term = search.trim().toLowerCase();
    const nameMatch = item.nombre?.toLowerCase().includes(term);
    const slugMatch = item.slug?.toLowerCase().includes(term);
    const categoryMatch = item.categoria?.nombre?.toLowerCase().includes(term);
    const byText = !term || nameMatch || slugMatch || categoryMatch;

    const enabled = tab === "categorias" ? item.activa : item.activo;
    const byStatus =
      stateFilter === "todos" ||
      (stateFilter === "activos" && enabled) ||
      (stateFilter === "inactivos" && !enabled);

    return byText && byStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedItems = filteredItems.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pageStart = Math.max(1, safePage - 2);
  const pageEnd = Math.min(totalPages, pageStart + 4);
  const pageNumbers = Array.from({ length: pageEnd - pageStart + 1 }, (_, i) => pageStart + i);

  const summary = {
    totalProductos: productos.length,
    productosActivos: productos.filter((p) => p.activo).length,
    totalCategorias: categorias.length,
    categoriasActivas: categorias.filter((c) => c.activa).length,
  };

  if (loading) return <section className="admin-shell">Cargando panel...</section>;

  return (
    <section className="admin-shell">
      <div className="admin-topbar">
        <div>
          <h2>Administrador de Catalogo</h2>
          <p className="admin-subtitle">Gestiona productos y categorias en una sola vista.</p>
        </div>
        <div className="admin-actions">
          <span className="admin-badge">Solo personal autorizado</span>
          <button className="btn-lite" onClick={logout} type="button">
            Cerrar sesion
          </button>
        </div>
      </div>

      {toast && <div className={`admin-toast ${toast.type}`}>{toast.message}</div>}

      <div className="admin-stats">
        <article className="admin-stat-card">
          <p>Productos</p>
          <h4>{summary.totalProductos}</h4>
          <small>{summary.productosActivos} activos</small>
        </article>
        <article className="admin-stat-card">
          <p>Categorias</p>
          <h4>{summary.totalCategorias}</h4>
          <small>{summary.categoriasActivas} activas</small>
        </article>
        <article className="admin-stat-card">
          <p>Mostrando</p>
          <h4>{filteredItems.length}</h4>
          <small>{tab === "categorias" ? "categorias filtradas" : "productos filtrados"}</small>
        </article>
      </div>

      <div className="admin-layout">
        <aside className="admin-panel">
          <div className="admin-tabs">
            <button
              type="button"
              className={`admin-tab ${tab === "productos" ? "active" : ""}`}
              onClick={() => {
                setTab("productos");
                setSearch("");
                setStateFilter("todos");
                setError("");
                setPage(1);
              }}
            >
              Productos
            </button>
            <button
              type="button"
              className={`admin-tab ${tab === "categorias" ? "active" : ""}`}
              onClick={() => {
                setTab("categorias");
                setSearch("");
                setStateFilter("todos");
                setError("");
                setPage(1);
              }}
            >
              Categorias
            </button>
          </div>

          {error && <div className="admin-error">{error}</div>}

          {tab === "categorias" ? (
            <form className="admin-form" onSubmit={saveCategory}>
              <div className="admin-form-head">
                <h3>{catForm.id ? "Editar categoria" : "Nueva categoria"}</h3>
                {catForm.id && (
                  <button type="button" className="btn-lite" onClick={resetForms}>
                    Cancelar edicion
                  </button>
                )}
              </div>
              <input
                className={catNameMissing ? "admin-input invalid" : "admin-input"}
                placeholder="Nombre"
                value={catForm.nombre}
                onChange={(e) =>
                  setCatForm((p) => ({
                    ...p,
                    nombre: e.target.value,
                    slug: catSlugTouched ? p.slug : slugify(e.target.value),
                  }))
                }
              />
              {catNameMissing && <small className="admin-field-error">El nombre es obligatorio.</small>}
              <input
                className={catSlugMissing || catSlugDuplicate ? "admin-input invalid" : "admin-input"}
                placeholder="Slug"
                value={catForm.slug}
                onChange={(e) => {
                  setCatSlugTouched(true);
                  setCatForm((p) => ({ ...p, slug: slugify(e.target.value) }));
                }}
              />
              <small className="admin-slug-hint">URL sugerida automaticamente editable.</small>
              {catSlugMissing && <small className="admin-field-error">El slug es obligatorio.</small>}
              {!catSlugMissing && catSlugDuplicate && (
                <small className="admin-field-error">Este slug ya existe en categorias.</small>
              )}
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={catForm.activa}
                  onChange={(e) => setCatForm((p) => ({ ...p, activa: e.target.checked }))}
                />
                Activa
              </label>
              <button className="btn-primary" type="submit" disabled={categoryFormInvalid}>
                {catForm.id ? "Guardar cambios" : "Crear categoria"}
              </button>
            </form>
          ) : (
            <form className="admin-form" onSubmit={saveProduct}>
              <div className="admin-form-head">
                <h3>{prodForm.id ? "Editar producto" : "Nuevo producto"}</h3>
                {prodForm.id && (
                  <button type="button" className="btn-lite" onClick={resetForms}>
                    Cancelar edicion
                  </button>
                )}
              </div>
              <input
                className={prodNameMissing ? "admin-input invalid" : "admin-input"}
                placeholder="Nombre"
                value={prodForm.nombre}
                onChange={(e) =>
                  setProdForm((p) => ({
                    ...p,
                    nombre: e.target.value,
                    slug: prodSlugTouched ? p.slug : slugify(e.target.value),
                  }))
                }
              />
              {prodNameMissing && <small className="admin-field-error">El nombre es obligatorio.</small>}
              <input
                className={prodSlugMissing || prodSlugDuplicate ? "admin-input invalid" : "admin-input"}
                placeholder="Slug"
                value={prodForm.slug}
                onChange={(e) => {
                  setProdSlugTouched(true);
                  setProdForm((p) => ({ ...p, slug: slugify(e.target.value) }));
                }}
              />
              <small className="admin-slug-hint">Slug automatico, puedes personalizarlo si quieres.</small>
              {prodSlugMissing && <small className="admin-field-error">El slug es obligatorio.</small>}
              {!prodSlugMissing && prodSlugDuplicate && (
                <small className="admin-field-error">Este slug ya existe en productos.</small>
              )}

              <textarea
                className="admin-input"
                placeholder="Descripcion"
                value={prodForm.descripcion}
                onChange={(e) => setProdForm((p) => ({ ...p, descripcion: e.target.value }))}
              />

              <select
                className={prodCategoryMissing ? "admin-input invalid" : "admin-input"}
                value={prodForm.categoria_id}
                onChange={(e) => setProdForm((p) => ({ ...p, categoria_id: e.target.value }))}
              >
                <option value="">Selecciona categoria</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
              {prodCategoryMissing && (
                <small className="admin-field-error">Selecciona una categoria.</small>
              )}

              {imagePreview && (
                <div className="admin-upload-preview">
                  <img src={imagePreview} alt="Preview" />
                  <div className="admin-upload-meta">
                    <strong>Imagen lista</strong>
                    <span>{prodForm.imagen ? prodForm.imagen.name : "Imagen actual del producto"}</span>
                  </div>
                  {prodForm.imagen && (
                    <button
                      type="button"
                      className="btn-lite"
                      onClick={() => {
                        setProdForm((p) => ({ ...p, imagen: null }));
                        setImageError("");
                      }}
                    >
                      Quitar seleccion
                    </button>
                  )}
                </div>
              )}

              <input type="file" accept="image/*" onChange={handleImageChange} />
              <small className="admin-slug-hint">Formato imagen, maximo {MAX_IMAGE_SIZE_MB}MB.</small>
              {imageError && <small className="admin-field-error">{imageError}</small>}

              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={prodForm.activo}
                  onChange={(e) => setProdForm((p) => ({ ...p, activo: e.target.checked }))}
                />
                Activo
              </label>
              <button className="btn-primary" type="submit" disabled={productFormInvalid}>
                {prodForm.id ? "Guardar cambios" : "Crear producto"}
              </button>
            </form>
          )}
        </aside>

        <div className="admin-panel">
          <div className="admin-list-tools">
            <input
              className="admin-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                tab === "categorias"
                  ? "Buscar categoria o slug"
                  : "Buscar producto, slug o categoria"
              }
            />
            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
              <option value="todos">Todos</option>
              <option value="activos">Activos</option>
              <option value="inactivos">Inactivos</option>
            </select>
          </div>

          <div className="admin-list">
            {filteredItems.length === 0 ? (
              <div className="admin-empty">No hay resultados con los filtros actuales.</div>
            ) : (
              pagedItems.map((item) => {
                const enabled = tab === "categorias" ? item.activa : item.activo;
                return (
                  <article key={item.id} className="admin-item">
                    <div className="admin-item-main">
                      {tab === "productos" && item.imagen ? (
                        <img className="admin-thumb" src={item.imagen} alt={item.nombre} />
                      ) : (
                        <div className="admin-thumb admin-thumb-fallback">{item.nombre?.[0] || "?"}</div>
                      )}

                      <div>
                        <h4>{item.nombre}</h4>
                        <p>
                          {tab === "categorias"
                            ? `Slug: ${item.slug || "-"}`
                            : `${item.categoria?.nombre || "Sin categoria"} · Slug: ${
                                item.slug || "-"
                              }`}
                        </p>
                      </div>
                    </div>

                    <div className="admin-actions">
                      <span className={`admin-status ${enabled ? "on" : "off"}`}>
                        {enabled ? "Activo" : "Inactivo"}
                      </span>
                      <button
                        type="button"
                        className="btn-lite"
                        onClick={() =>
                          tab === "categorias" ? startEditCategory(item) : startEditProduct(item)
                        }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() =>
                          requestDelete(tab === "categorias" ? "categorias" : "productos", item)
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {filteredItems.length > PAGE_SIZE && (
            <div className="admin-pagination">
              <button
                className="btn-lite"
                type="button"
                disabled={safePage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Anterior
              </button>

              {pageNumbers.map((n) => (
                <button
                  key={n}
                  className={`btn-lite ${n === safePage ? "is-current" : ""}`}
                  type="button"
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}

              <button
                className="btn-lite"
                type="button"
                disabled={safePage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>

      {pendingDelete && (
        <div className="admin-modal-backdrop" onClick={() => !deleting && setPendingDelete(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar eliminacion</h3>
            <p>
              Vas a eliminar <strong>{pendingDelete.nombre}</strong>. Esta accion no se puede deshacer.
            </p>
            <div className="admin-modal-actions">
              <button
                type="button"
                className="btn-lite"
                onClick={() => setPendingDelete(null)}
                disabled={deleting}
              >
                Cancelar
              </button>
              <button type="button" className="btn-danger" onClick={confirmDelete} disabled={deleting}>
                {deleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
