
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

// Claves de localStorage
const LS_TOKEN = "auth_token";
const LS_USER = "auth_user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // { email }
  const [loading, setLoading] = useState(true);

  // Carga inicial desde localStorage (persistencia básica)
  useEffect(() => {
    const t = localStorage.getItem(LS_TOKEN);
    const u = localStorage.getItem(LS_USER);
    if (t && u) {
      setToken(t);
      try {
        setUser(JSON.parse(u));
      } catch {
        setUser({ email: u });
      }
    }
    setLoading(false);
  }, []);

  // Token simulado (solo práctica)
  function generateToken() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  async function login({ email, password }) {
    // Demo: cualquier email/password no vacíos son aceptados
    if (!email || !password) throw new Error("Completa email y contraseña.");
    // Simular latencia
    await new Promise((r) => setTimeout(r, 400));
    const t = generateToken();
    const u = { email };
    setToken(t);
    setUser(u);
    localStorage.setItem(LS_TOKEN, t);
    localStorage.setItem(LS_USER, JSON.stringify(u));
    return true;
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_USER);
  }

  const value = useMemo(
    () => ({ token, user, loading, login, logout, isAuthenticated: !!token }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}

/** Componente de guard: requiere sesión para ver children */
export function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Cargando sesión…</p>;
  if (!isAuthenticated) {
    // Redirige a /login y recuerda a dónde querías ir
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
