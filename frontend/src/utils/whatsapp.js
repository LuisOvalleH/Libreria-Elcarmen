export function buildWhatsAppLink(phone, message) {
  const cleanPhone = String(phone || "").replace(/[^\d]/g, "");
  const text = encodeURIComponent(message || "");
  return `https://wa.me/${cleanPhone}?text=${text}`;
}
