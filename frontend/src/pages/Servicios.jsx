import { buildWhatsAppLink } from "../utils/whatsapp";
import useSeo from "../hooks/useSeo";
import "../styles/institucional.css";

export default function Servicios() {
  useSeo({
    title: "Servicios",
    description:
      "Servicios de librería y papelería: listas escolares, pedidos especiales y cotizaciones por WhatsApp.",
  });

  const phone = import.meta.env.VITE_WHATSAPP_PHONE || "50246496454";

  const servicios = [
    {
      titulo: "Listas Escolares",
      detalle:
        "Armamos pedidos completos por grado o colegio para que el cliente ahorre tiempo y compre todo en un solo lugar.",
      tiempo: "Respuesta rápida",
    },
    {
      titulo: "Pedidos Especiales",
      detalle:
        "Gestionamos productos bajo encargo cuando no están en stock inmediato y damos seguimiento por WhatsApp.",
      tiempo: "Por cotización",
    },
    {
      titulo: "Papelería de Oficina",
      detalle:
        "Surtimos insumos frecuentes para negocio, oficina y emprendimiento con recomendaciones según uso real.",
      tiempo: "Mismo día",
    },
    {
      titulo: "Material Creativo",
      detalle:
        "Apoyamos proyectos escolares y artísticos con marcadores, crayones, cartulinas y artículos complementarios.",
      tiempo: "Disponibilidad variable",
    },
    {
      titulo: "Cotización por WhatsApp",
      detalle:
        "Atendemos consultas de producto, precio y disponibilidad de forma directa para cerrar más rápido.",
      tiempo: "Atención directa",
    },
    {
      titulo: "Atención Personalizada",
      detalle:
        "Sugerimos opciones por presupuesto y necesidad para ayudar a elegir mejor en cada compra.",
      tiempo: "En tienda y online",
    },
  ];

  return (
    <section className="inst-page">
      <div className="container">
        <div className="inst-hero">
          <div className="inst-pill">Servicios para clientes y negocios</div>
          <h1 className="inst-title">
            Nuestros <span>Servicios</span>
          </h1>
          <p className="inst-sub">
            Enfocados en resolver compras de librería y papelería con atención ágil, claridad en
            disponibilidad y seguimiento por WhatsApp.
          </p>
        </div>

        <div className="inst-section inst-grid">
          {servicios.map((servicio) => {
            const href = buildWhatsAppLink(
              phone,
              `Hola, quiero información sobre el servicio: ${servicio.titulo}.`
            );

            return (
              <article className="inst-card" key={servicio.titulo}>
                <div className="service-head">
                  <h3>{servicio.titulo}</h3>
                  <span className="service-tag">{servicio.tiempo}</span>
                </div>
                <p>{servicio.detalle}</p>
                <div className="service-foot">
                  <a className="inst-link" href={href} target="_blank" rel="noreferrer">
                    Consultar servicio por WhatsApp
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
