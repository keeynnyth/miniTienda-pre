

import { useNavigate } from "react-router-dom";
import { login } from "../lib/auth";

export default function Login() {
  const nav = useNavigate();
  return (
    <section className="max-w-sm space-y-3">
      <h1 className="text-2xl font-semibold">Ingresar</h1>
      <p className="text-sm opacity-80">Demo de autenticación para ver /admin.</p>
      <button
        className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
        onClick={() => {
          login();
          nav("/admin");
        }}
      >
        Ingresar (demo)
      </button>
    </section>
  );
}

