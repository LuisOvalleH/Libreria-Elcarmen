import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import "../styles/catalogo.css";

export default function Catalogo() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");

        const [cRes, pRes] = await Promise.all([
          api.get("/api/productos/categorias/"),
          api.get("/api/productos/productos/"),
        ]);

        setCategorias(cRes.data || []);
        setProductos(pRes.data || []);
      } catch (e) {
        setError(e?.message || "Error cargando catálogo");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const countsBySlug = useMemo(() => {
    const map = new Map();
    for (const p of productos || []) {
      const slug = p?.categoria?.slug;
      if (!slug) continue;
      map.set(slug, (map.get(slug) || 0) + 1);
    }
    return map;
  }, [productos]);

  const filtrados = useMemo(() => {
    const text = q.trim().toLowerCase();

    return (productos || []).filter((p) => {
      const byCat = cat === "todos" ? true : p?.categoria?.slug === cat;
      const byText =
        !text ||
        (p?.nombre || "").toLowerCase().includes(text) ||
        (p?.descripcion || "").toLowerCase().includes(text);
      return byCat && byText;
    });
  }, [productos, q, cat]);

  if (loading) {
    return (
      <div className="catalogo-page">
        <div className="container">
          <div className="catalogo-state">Cargando catálogo…</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalogo-page">
        <div className="container">
          <div className="catalogo-state" style={{ color: "crimson" }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  const apiBase = api.defaults.baseURL || "http://127.0.0.1:8000";
  const phone = import.meta?.env?.VITE_WHATSAPP_PHONE || "50246496454";

  return (
    <div className="catalogo-page">
      <div className="container">
        {/* HERO */}
        <section className="catalogo-hero">
          <div className="catalogo-hero-inner">
            <div className="catalogo-pill">✨ Explora nuestro catálogo completo</div>

            <h1 className="catalogo-title">
              Nuestro <span>Catálogo</span>
            </h1>

            <p className="catalogo-sub">
              Descubre productos educativos y profesionales. Busca por nombre o filtra por categoría.
            </p>

            <div className="catalogo-panel">
              <div className="catalogo-row">
                <input
                  className="catalogo-input"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar productos…"
                />

                <select
                  className="catalogo-select"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                >
                  <option value="todos">Todas las categorías</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chips (más “tienda” que un select) */}
              <div className="catalogo-chips">
                <div
                  className={`chip ${cat === "todos" ? "active" : ""}`}
                  onClick={() => setCat("todos")}
                  role="button"
                >
                  Todos <span className="chip-badge">{productos.length}</span>
                </div>

                {categorias.map((c) => (
                  <div
                    key={c.id}
                    className={`chip ${cat === c.slug ? "active" : ""}`}
                    onClick={() => setCat(c.slug)}
                    role="button"
                  >
                    {c.nombre}{" "}
                    <span className="chip-badge">{countsBySlug.get(c.slug) || 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meta */}
        <div className="catalogo-meta">
          <div>
            Mostrando <b>{filtrados.length}</b> productos
          </div>
        </div>

        {/* Grid */}
        <section className="catalogo-grid">
          {filtrados.map((p) => {
            const rawImg = p?.imagen || "";
            const img = rawImg?.startsWith("http") ? rawImg : `${apiBase}${rawImg}`;

            // Mensaje WhatsApp (más pro: trae nombre/categoría)
            const msg = encodeURIComponent(
              `Hola 👋, me interesa este producto:\n\n• ${p?.nombre}\n• Categoría: ${
                p?.categoria?.nombre || "Sin categoría"
              }\n\n¿Me das precio y disponibilidad?`
            );

            const wspLink = `https://wa.me/${phone}?text=${msg}`;

            return (
              <article key={p.id} className="pcard">
                <div className="pmedia">
                  <img
                    src={img}
                    alt={p?.nombre || "Producto"}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="pbadge">DISPONIBLE</div>
                </div>

                <div className="pbody">
                  <h3 className="ptitle">{p?.nombre}</h3>
                  <div className="pcat">{p?.categoria?.nombre || "Sin categoría"}</div>

                  <p className="pdesc">{p?.descripcion || "Sin descripción."}</p>

                  <div className="pactions">
                    <a
                      className="btn-primary btn-wsp"
                      href={wspLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Consultar por WhatsApp →
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Empty */}
        {filtrados.length === 0 && (
          <div className="catalogo-state">
            No hay resultados con ese filtro. Prueba otra categoría o búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}
