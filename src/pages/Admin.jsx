

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const nav = useNavigate();
  const { user, logout } = useAuth();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Panel Admin</h1>
      <p className="opacity-80">Usuario: {user?.email}</p>

      <div className="flex flex-wrap gap-2">
        <Link to="/admin/products" className="rounded-xl border px-3 py-2 hover:bg-black/5">
          Gestionar productos
        </Link>
        <Link to="/admin/products/new" className="rounded-xl border px-3 py-2 hover:bg-black/5">
          + Nuevo producto
        </Link>
        <button
          className="rounded-xl border px-3 py-2 hover:bg-black/5"
          onClick={() => { logout(); nav("/"); }}
        >
          Salir
        </button>
      </div>

      <p className="text-sm opacity-70">
        Desde <span className="font-medium">Gestionar productos</span> podés editar o eliminar items de MockAPI.
      </p>
    </section>
  );
}
