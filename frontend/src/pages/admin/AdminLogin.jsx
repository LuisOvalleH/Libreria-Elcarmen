import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/api/admin/login/", { username, password });
      localStorage.setItem("admin_token", res.data.token);
      navigate("/admin/panel");
    } catch (err) {
      setError(err?.response?.data?.detail || "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-auth">
      <article className="admin-card">
        <span className="admin-badge">Acceso restringido</span>
        <h1>Panel Admin</h1>
        <p>Inicia sesión con una cuenta administradora para gestionar catálogo.</p>

        {error && <div className="admin-error">{error}</div>}

        <form className="admin-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar al panel"}
          </button>
        </form>
      </article>
    </section>
  );
}
