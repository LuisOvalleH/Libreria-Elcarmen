import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import "../styles/institucional.css";

export default function NotFound() {
  useSeo({
    title: "Página no encontrada",
    description: "La página solicitada no existe. Regresa al inicio o revisa el catálogo.",
  });

  return (
    <section className="inst-page">
      <div className="container">
        <div className="inst-hero">
          <div className="inst-pill">Error 404</div>
          <h1 className="inst-title">
            Página <span>No Encontrada</span>
          </h1>
          <p className="inst-sub">
            El enlace que abriste no está disponible. Puedes volver al inicio o visitar el catálogo.
          </p>
          <div className="inst-actions">
            <Link className="btn-primary" to="/">
              Ir al inicio
            </Link>
            <Link className="inst-btn-secondary" to="/catalogo">
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
