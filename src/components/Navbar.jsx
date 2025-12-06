

// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ right }) {
  return (
    <header className="sticky-top bg-white border-bottom" style={{ backdropFilter: "blur(6px)" }}>
      <nav className="navbar">
        <div className="container d-flex align-items-center py-2">
          {/* Brand */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 m-0 text-decoration-none">
            <span
              className="d-inline-flex align-items-center justify-content-center bg-dark text-white rounded-circle"
              style={{ width: 28, height: 28, fontWeight: 700 }}
            >
              M
            </span>
            <span className="brand-gradient fw-bold">MaxiShopp</span>
          </Link>

          {/* Izquierda: link simple a Inicio (opcional) */}
          <div className="d-none d-sm-flex ms-auto me-2">
            <NavLink to="/" className="btn btn-link btn-sm text-decoration-none px-2">
              Inicio
            </NavLink>
          </div>

          {/* Derecha: botones que envías desde App */}
          <div className="d-flex align-items-center gap-2">{right}</div>
        </div>
      </nav>
    </header>
  );
}
