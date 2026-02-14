import { buildWhatsAppLink } from "../../utils/whatsapp";
import "./whatsapp-float.css";

export default function WhatsAppFloat() {
  const phone = import.meta.env.VITE_WHATSAPP_PHONE || "50246496454";
  const defaultMessage =
    import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE ||
    "Hola, me interesa conocer su catálogo y disponibilidad de productos.";

  return (
    <a
      className="wsp-float"
      href={buildWhatsAppLink(phone, defaultMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
    >
      <span className="wsp-float__icon">💬</span>
      WhatsApp
    </a>
  );
}
