

import { useNavigate } from "react-router-dom";
import { logout } from "../lib/auth";

export default function Admin() {
  const nav = useNavigate();
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold">Panel Admin</h1>
      <p className="opacity-80">Solo usuarios autenticados (demo).</p>
      <button
        className="rounded-xl border px-3 py-2 hover:bg-black/5"
        onClick={() => {
          logout();
          nav("/");
        }}
      >
        Salir
      </button>
    </section>
  );
}
