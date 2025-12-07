
// src/pages/Admin.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiSettings, FiPlus, FiLogOut } from "react-icons/fi";

export default function Admin() {
  const nav = useNavigate();
  const { user, logout } = useAuth();

  return (
    <section className="py-3">
      <h1 className="display-6 fw-semibold">Panel Admin</h1>
      <p className="text-secondary mb-3">Usuario: {user?.email}</p>

      <div className="d-flex flex-wrap gap-2">
        <Link
          to="/admin/products"
          className="btn btn-soft-primary btn-pill btn-hover-lift d-inline-flex align-items-center gap-2"
        >
          <FiSettings /> Gestionar productos
        </Link>

        <Link
          to="/admin/products/new"
          className="btn btn-dark btn-pill btn-hover-lift d-inline-flex align-items-center gap-2"
        >
          <FiPlus /> Nuevo producto
        </Link>

        <button
          onClick={() => { logout(); nav("/"); }}
          className="btn btn-ghost btn-pill d-inline-flex align-items-center gap-2"
        >
          <FiLogOut /> Salir
        </button>
      </div>

      <p className="text-secondary mt-3">
        Desde <strong>Gestionar productos</strong> podés editar o eliminar items de MockAPI.
      </p>
    </section>
  );
}
