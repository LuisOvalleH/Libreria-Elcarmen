import AnimatedSection from "../components/ui/AnimatedSection";
import { Link } from "react-router-dom";

export default function Home() {
  const stats = [
    { value: "20+", label: "Años" },
    { value: "5K+", label: "Productos" },
    { value: "98%", label: "Satisfacción" },
  ];

  return (
    <>
      {/* HERO */}
      <section style={{ padding: "80px 40px" }}>
        <AnimatedSection>
          <div className="container grid-hero">
            {/* Texto */}
            <div>
              <span
                style={{
                  display: "inline-block",
                  background: "#fff7ed",
                  color: "#f59e0b",
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                Desde 2004 · +20 años de experiencia
              </span>

              {/* ✅ Headline (sin repetir El Carmen) */}
              <h1 style={{ fontSize: 52, marginBottom: 18, lineHeight: 1.1 }}>
                Todo lo que necesitas para{" "}
                <span style={{ color: "#f59e0b" }}>estudiar y crear</span>
              </h1>

              <p style={{ fontSize: 18, color: "#475569", marginBottom: 28, lineHeight: 1.7 }}>
                Libros, útiles y papelería para estudiantes y profesionales. Atención rápida,
                productos de calidad y asesoría cuando la necesitás.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link className="btn-primary" to="/catalogo">
                  Explorar Catálogo →
                </Link>

                <Link
                  to="/contacto"
                  style={{
                    fontWeight: 900,
                    color: "#0f172a",
                    textDecoration: "none",
                    padding: "12px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(15,23,42,.12)",
                    background: "white",
                  }}
                >
                  Ver ubicación
                </Link>
              </div>
            </div>

            {/* Imagen */}
            <div
              style={{
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,.12)",
                height: 420,  
                background: "#fff",  
              }}
            >
              <img
                src="https://granadillaempresarial.com/wp-content/uploads/job-manager-uploads/job_cover_image/2025/01/Libreria-y-Papeleria-Carmen_Fotos_3_1920x1080.jpg"
                alt="Librería"
                style={{ width: "100%", height: "100%", objectFit: "cover",display: "block" }}
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* STATS */}
      <section style={{ padding: "40px 40px 70px", background: "#fff7ed" }}>
        <div className="container grid-3" style={{ maxWidth: 1000, textAlign: "center" }}>
          {stats.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.15}>
              <div>
                <div style={{ fontSize: 48, fontWeight: 800, color: "#f59e0b" }}>
                  {item.value}
                </div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>{item.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* TODO LO QUE NECESITAS */}
      <section style={{ padding: "90px 40px", background: "#ffffff" }}>
        <div className="container">
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 46 }}>
              <h2 style={{ fontSize: 54, margin: 0, color: "#0f172a" }}>
                Todo lo que <span style={{ color: "#f59e0b" }}>necesitas</span>
              </h2>
              <p style={{ marginTop: 14, fontSize: 18, color: "#475569" }}>
                Soluciones completas para tu éxito académico y profesional
              </p>
            </div>
          </AnimatedSection>

          <div className="grid-3">
            {[
              {
                title: "Amplio Catálogo",
                desc: "Libros, útiles escolares, papelería profesional y material didáctico. Todo en un solo lugar.",
                icon: "🛍️",
              },
              {
                title: "Servicio Rápido",
                desc: "Atención inmediata, pedidos especiales y entregas ágiles. Tu tiempo es valioso.",
                icon: "⏱️",
              },
              {
                title: "Calidad Garantizada",
                desc: "Productos verificados de las mejores marcas. Garantía en todas tus compras.",
                icon: "🛡️",
              },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.12}>
                <div
                  style={{
                    background: "white",
                    borderRadius: 22,
                    padding: 26,
                    border: "1px solid rgba(15,23,42,.08)",
                    boxShadow: "0 18px 45px rgba(15,23,42,.06)",
                    minHeight: 210,
                    transition: "transform .2s ease, box-shadow .2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 26px 60px rgba(15,23,42,.10)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 18px 45px rgba(15,23,42,.06)";
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 16,
                      background: "#f59e0b",
                      display: "grid",
                      placeItems: "center",
                      color: "white",
                      fontSize: 22,
                      marginBottom: 18,
                    }}
                  >
                    {card.icon}
                  </div>

                  <h3 style={{ margin: "0 0 10px", fontSize: 22 }}>{card.title}</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.6 }}>
                    {card.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 3 COLUMNAS: QUE VENDEMOS / SERVICIOS / UBICACION */}
      <section style={{ padding: "90px 40px", background: "#f8fafc" }}>
        <div className="container grid-3">
          {/* Card 1 */}
          <AnimatedSection>
            <div
              style={{
                background: "white",
                borderRadius: 26,
                padding: 30,
                border: "1px solid rgba(15,23,42,.08)",
                boxShadow: "0 18px 45px rgba(15,23,42,.06)",
                minHeight: 380,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: "#f59e0b",
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  fontSize: 22,
                  marginBottom: 18,
                }}
              >
                📦
              </div>

              <h3 style={{ margin: "0 0 10px", fontSize: 28, color: "#0f172a" }}>
                ¿Qué Vendemos?
              </h3>

              <p style={{ margin: "0 0 18px", color: "#475569", lineHeight: 1.7 }}>
                Todo lo que necesitas para tu desarrollo académico y profesional
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {[
                  "Libros de texto y literatura",
                  "Útiles escolares y de oficina",
                  "Material didáctico especializado",
                  "Papelería profesional premium",
                  "Artículos tecnológicos educativos",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 999,
                        border: "2px solid #f59e0b",
                        display: "grid",
                        placeItems: "center",
                        color: "#f59e0b",
                        fontWeight: 900,
                        flex: "0 0 24px",
                        marginTop: 2,
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ color: "#0f172a", fontWeight: 700 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Card 2 */}
          <AnimatedSection delay={0.1}>
            <div
              style={{
                background: "white",
                borderRadius: 26,
                padding: 30,
                border: "1px solid rgba(15,23,42,.08)",
                boxShadow: "0 18px 45px rgba(15,23,42,.06)",
                minHeight: 380,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: "#f59e0b",
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  fontSize: 22,
                  marginBottom: 18,
                }}
              >
                🎧
              </div>

              <h3 style={{ margin: "0 0 10px", fontSize: 28, color: "#0f172a" }}>
                Nuestros Servicios
              </h3>

              <p style={{ margin: "0 0 18px", color: "#475569", lineHeight: 1.7 }}>
                Soluciones integrales para todas tus necesidades
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {[
                  "Asesoría personalizada experta",
                  "Pedidos especiales y reservas",
                  "Encuadernación profesional",
                  "Impresión y fotocopias digitales",
                  "Envíos rápidos a domicilio",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 999,
                        border: "2px solid #f59e0b",
                        display: "grid",
                        placeItems: "center",
                        color: "#f59e0b",
                        fontWeight: 900,
                        flex: "0 0 24px",
                        marginTop: 2,
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ color: "#0f172a", fontWeight: 700 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Card 3 */}
          <AnimatedSection delay={0.2}>
            <div
              style={{
                background: "white",
                borderRadius: 26,
                padding: 30,
                border: "1px solid rgba(15,23,42,.08)",
                boxShadow: "0 18px 45px rgba(15,23,42,.06)",
                minHeight: 380,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: "#f59e0b",
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  fontSize: 22,
                  marginBottom: 18,
                }}
              >
                📍
              </div>

              <h3 style={{ margin: "0 0 10px", fontSize: 28, color: "#0f172a" }}>
                Dónde Estamos
              </h3>

              <p style={{ margin: "0 0 18px", color: "#475569", lineHeight: 1.7 }}>
                Fácil acceso y atención de primera
              </p>

              <div style={{ display: "grid", gap: 14, marginTop: 8 }}>
                {[
                  { title: "Dirección", value: "Calle Principal #123\nCentro, Ciudad", icon: "📌" },
                  { title: "Teléfono", value: "(555) 123-4567", icon: "📞" },
                  { title: "Email", value: "info@libreriaelcarmen.com", icon: "✉️" },
                ].map((it) => (
                  <div
                    key={it.title}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "50px 1fr",
                      gap: 14,
                      alignItems: "center",
                      padding: 14,
                      borderRadius: 18,
                      background: "#fff7ed",
                      border: "1px solid rgba(245,158,11,.18)",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 16,
                        background: "white",
                        display: "grid",
                        placeItems: "center",
                        color: "#f59e0b",
                        fontSize: 18,
                        border: "1px solid rgba(15,23,42,.08)",
                      }}
                    >
                      {it.icon}
                    </div>

                    <div>
                      <div style={{ fontWeight: 900, color: "#0f172a" }}>{it.title}</div>
                      <div style={{ whiteSpace: "pre-line", color: "#475569", fontWeight: 700 }}>
                        {it.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "auto" }} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SECCIÓN NARANJA: ¿POR QUÉ ELEGIRNOS? */}
      <section
        style={{
          padding: "90px 40px",
          background: "linear-gradient(180deg, #f59e0b 0%, #fbbf24 100%)",
        }}
      >
        <div className="container">
          <AnimatedSection>
            <div style={{ textAlign: "center", color: "white" }}>
              <h2 style={{ fontSize: 62, margin: 0 }}>¿Por qué elegirnos?</h2>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 18,
                  maxWidth: 820,
                  marginLeft: "auto",
                  marginRight: "auto",
                  lineHeight: 1.7,
                  opacity: 0.95,
                }}
              >
                Combinamos tradición, calidad y tecnología para ofrecerte la mejor experiencia en
                productos educativos y culturales.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid-3" style={{ marginTop: 46, gap: 22 }}>
            {[
              { title: "Amplio Catálogo", desc: "Miles de productos siempre disponibles", icon: "📚" },
              { title: "Servicio Rápido", desc: "Atención inmediata y entregas ágiles", icon: "⚡" },
              { title: "Mejor Precio", desc: "Ofertas y promociones especiales", icon: "💎" },
            ].map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.12}>
                <div
                  style={{
                    borderRadius: 22,
                    padding: 26,
                    background: "rgba(255,255,255,.18)",
                    border: "1px solid rgba(255,255,255,.25)",
                    boxShadow: "0 18px 45px rgba(0,0,0,.10)",
                    textAlign: "center",
                    color: "white",
                    minHeight: 190,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div style={{ fontSize: 38, marginBottom: 12 }}>{c.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: 22 }}>{c.title}</div>
                  <div style={{ marginTop: 8, opacity: 0.95 }}>{c.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.15}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
              <Link
                to="/contacto"
                style={{
                  background: "white",
                  color: "#f59e0b",
                  fontWeight: 900,
                  padding: "16px 26px",
                  borderRadius: 999,
                  textDecoration: "none",
                  boxShadow: "0 18px 45px rgba(0,0,0,.15)",
                }}
              >
                Visítanos Hoy →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
