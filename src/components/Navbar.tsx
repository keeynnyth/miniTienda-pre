

import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type NavbarProps = { right?: ReactNode };

export default function Navbar({ right }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link
          to="/"
          className="text-xl font-semibold rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
        >
          MiniTienda
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link
            to="/"
            className="rounded-lg px-2 py-1 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
          >
            Inicio
          </Link>
          {right}
        </div>
      </nav>
    </header>
  );
}

