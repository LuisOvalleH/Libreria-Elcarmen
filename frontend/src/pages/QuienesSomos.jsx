import { Link } from "react-router-dom";
import { buildWhatsAppLink } from "../utils/whatsapp";
import useSeo from "../hooks/useSeo";
import "../styles/institucional.css";

export default function QuienesSomos() {
  useSeo({
    title: "Quiénes Somos",
    description:
      "Conoce la historia de Librería El Carmen, nuestros valores y el enfoque de atención para cada cliente.",
  });

  const phone = import.meta.env.VITE_WHATSAPP_PHONE || "50246496454";
  const wspHref = buildWhatsAppLink(
    phone,
    "Hola, quiero conocer más sobre Librería El Carmen y sus productos."
  );

  const pilares = [
    {
      titulo: "Atención Cercana",
      texto:
        "Asesoramos cada compra según edad, grado y necesidad para que el cliente elija bien y rápido.",
    },
    {
      titulo: "Catálogo Curado",
      texto:
        "Trabajamos útiles, papelería y material educativo de rotación real, con enfoque en calidad y disponibilidad.",
    },
    {
      titulo: "Respuesta Ágil",
      texto:
        "Resolvemos consultas por WhatsApp y confirmamos productos en poco tiempo para facilitar cada pedido.",
    },
  ];

  return (
    <section className="inst-page">
      <div className="container">
        <div className="inst-hero">
          <div className="inst-pill">Nuestra historia</div>
          <h1 className="inst-title">
            Quiénes <span>Somos</span>
          </h1>
          <p className="inst-sub">
            Librería El Carmen acompaña a estudiantes, docentes y profesionales con productos
            confiables, atención cercana y soluciones prácticas para el día a día académico y de
            oficina.
          </p>

          <div className="inst-actions">
            <a className="btn-primary" href={wspHref} target="_blank" rel="noreferrer">
              Consultar por WhatsApp
            </a>
            <Link className="inst-btn-secondary" to="/catalogo">
              Ver catálogo
            </Link>
          </div>
        </div>

        <div className="inst-section inst-grid">
          {pilares.map((item) => (
            <article className="inst-card" key={item.titulo}>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
