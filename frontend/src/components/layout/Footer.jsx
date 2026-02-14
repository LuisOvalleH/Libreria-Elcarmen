import "./footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <h3 className="site-footer__brand">Librería El Carmen</h3>
          <p className="site-footer__text">Tu aliado en conocimiento</p>
          <small className="site-footer__copy">© 2026 Librería El Carmen</small>
        </div>

        <div className="site-footer__links">
          <a href="/catalogo">Catálogo</a>
          <a href="/servicios">Servicios</a>
          <a href="/contacto">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
