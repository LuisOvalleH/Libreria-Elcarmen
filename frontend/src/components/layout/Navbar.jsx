import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo-elcarmen.jpg";
import "./navbar.css";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/quienes-somos", label: "Quiénes Somos" },
  { to: "/servicios", label: "Servicios" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || "50246496454";
  const whatsappHref = `https://wa.me/${whatsappPhone}`;

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img
            className="logo__img"
            src={logo}
            alt="Librería Nuestra Señora del Carmen"
          />
          <span className="logo__tagline">Librería & Papelería</span>
        </Link>

        {/* Nav desktop */}
        <nav className="nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav__link is-active" : "nav__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Acciones */}
        <div className="actions">
          {/* WhatsApp: poné el número real en formato 502XXXXXXXX */}
          <a
            className="btn-cta"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir WhatsApp"
          >
            WhatsApp
          </a>

          {/* Botón menú móvil */}
          <button
            className="menuBtn"
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={open ? "bar bar--top open" : "bar bar--top"} />
            <span className={open ? "bar bar--mid open" : "bar bar--mid"} />
            <span className={open ? "bar bar--bot open" : "bar bar--bot"} />
          </button>
        </div>
      </div>

      {/* Drawer móvil */}
      <div
        className={open ? "drawerOverlay open" : "drawerOverlay"}
        onClick={() => setOpen(false)}
      />

      <aside className={open ? "drawer open" : "drawer"} aria-hidden={!open}>
        <div className="drawer__top">
          <div className="drawer__title">Menú</div>
          <button
            className="drawer__close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        <div className="drawer__links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "drawer__link is-active" : "drawer__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="drawer__cta">
          <a
            className="btn-cta w-full"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            WhatsApp
          </a>

          <Link
            className="btn-secondary w-full"
            to="/contacto"
            onClick={() => setOpen(false)}
          >
            Ver ubicación
          </Link>
        </div>
      </aside>
    </header>
  );
}
