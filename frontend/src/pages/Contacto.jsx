import { buildWhatsAppLink } from "../utils/whatsapp";
import useSeo from "../hooks/useSeo";
import "../styles/institucional.css";

export default function Contacto() {
  useSeo({
    title: "Contacto",
    description:
      "Contáctanos por WhatsApp, revisa dirección, horario y abre la ubicación en Google Maps.",
  });

  const phone = import.meta.env.VITE_WHATSAPP_PHONE || "+502 5441 9108";
  const phoneDisplay = import.meta.env.VITE_BUSINESS_PHONE_DISPLAY || "+502 5441 9108";
  const address =
    import.meta.env.VITE_BUSINESS_ADDRESS || "5ta Av, 0-35 zona 3 Salcaja/Quetgo";
  const hours = import.meta.env.VITE_BUSINESS_HOURS || "Lunes a sábado, 8:00 AM - 7:00 PM";
  const mapsUrl =
    import.meta.env.VITE_GOOGLE_MAPS_URL || "https://maps.google.com/?q=Libreria+El+Carmen";

  const wspHref = buildWhatsAppLink(
    phone,
    "Hola, quiero consultar disponibilidad y ubicación de Librería El Carmen."
  );

  return (
    <section className="inst-page">
      <div className="container">
        <div className="inst-hero">
          <div className="inst-pill">Canales de atención</div>
          <h1 className="inst-title">
            Página de <span>Contacto</span>
          </h1>
          <p className="inst-sub">
            Te atendemos por WhatsApp y en tienda física para consultas de productos, cotizaciones y
            pedidos especiales.
          </p>

          <div className="inst-actions">
            <a className="btn-primary" href={wspHref} target="_blank" rel="noreferrer">
              Abrir WhatsApp
            </a>
            <a className="inst-btn-secondary" href={mapsUrl} target="_blank" rel="noreferrer">
              Abrir en Google Maps
            </a>
          </div>
        </div>

        <div className="inst-section inst-grid">
          <article className="inst-card">
            <h3>Información Directa</h3>
            <div className="contact-list">
              <div className="contact-item">
                <strong>WhatsApp</strong>
                <p>{phoneDisplay}</p>
              </div>
              <div className="contact-item">
                <strong>Teléfono</strong>
                <p>{phoneDisplay}</p>
              </div>
              <div className="contact-item">
                <strong>Horario</strong>
                <p>{hours}</p>
              </div>
            </div>
          </article>

          <article className="inst-card">
            <h3>Ubicación</h3>
            <div className="contact-list">
              <div className="contact-item">
                <strong>Dirección</strong>
                <p>{address}</p>
              </div>
              <div className="contact-item">
                <strong>Cómo llegar</strong>
                <p>Usa el botón de Google Maps para abrir la ruta directa desde tu ubicación.</p>
              </div>
            </div>
          </article>

          <article className="inst-card">
            <h3>Atención Comercial</h3>
            <p>
              Para cotizaciones ágiles, envíanos nombre del producto y cantidad aproximada. Te
              confirmamos disponibilidad y opciones.
            </p>
            <p className="inst-note">
              Sugerencia: comparte captura del catálogo para acelerar la respuesta.
            </p>
            <div className="service-foot">
              <a className="inst-link" href={wspHref} target="_blank" rel="noreferrer">
                Enviar consulta ahora
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
