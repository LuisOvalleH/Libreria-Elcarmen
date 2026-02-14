export default function Servicios() {
  const servicios = [
    "Asesoría personalizada en productos escolares y de oficina",
    "Pedidos especiales por encargo",
    "Impresión y fotocopiado",
    "Encuadernación y acabados",
    "Atención vía WhatsApp para cotizaciones rápidas",
  ];

  return (
    <section style={{ padding: "72px 40px" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <h1 style={{ fontSize: 44, margin: "0 0 12px", color: "#0f172a" }}>Servicios</h1>
        <ul style={{ color: "#475569", lineHeight: 1.9, fontSize: 18, margin: 0, paddingLeft: 20 }}>
          {servicios.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
