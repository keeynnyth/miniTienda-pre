

import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login({ email, password }); // genera token simulado
      nav(from, { replace: true });
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-sm">
      <h1 className="text-2xl font-semibold mb-4">Ingresar</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-xl border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full rounded-xl border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="•••••••"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="text-sm opacity-70 mt-3">
        Acceso demo: acepta cualquier email/contraseña. Guarda un <em>token</em> simulado en localStorage.
      </p>

      <p className="text-sm mt-4">
        Volver a <Link className="underline" to="/">Inicio</Link>
      </p>
    </section>
  );
}


