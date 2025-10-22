

import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import type { ApiProduct } from "./lib/api";
import { isAuthenticated } from "./lib/auth";

function PrivateRoute({ children }: { children: JSX.Element }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

type CartItem = { product: ApiProduct; qty: number };

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [authed, setAuthed] = useState<boolean>(isAuthenticated());
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "auth") setAuthed(isAuthenticated());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1500);
  }

  const handleAdd = (p: ApiProduct) => {
    setCart((prev) => {
      const i = prev.findIndex((x) => x.product.id === p.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [...prev, { product: p, qty: 1 }];
    });
    showToast("Producto agregado 🛒");
  };

  const handleRemove = (id: number) =>
    setCart((s) => s.filter((x) => x.product.id !== id));
  const handleClear = () => setCart([]);
  const increment = (id: number) =>
    setCart((s) => s.map((x) => (x.product.id === id ? { ...x, qty: x.qty + 1 } : x)));
  const decrement = (id: number) =>
    setCart((s) =>
      s.map((x) =>
        x.product.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x
      )
    );

  const cartCount = cart.reduce((a, x) => a + x.qty, 0);

  const Right = () => (
    <div className="flex items-center gap-2">
      <Link
        to="/cart"
        className="relative rounded-xl border px-3 py-1 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
      >
        Carrito
        <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full border px-1 text-xs">
          {cartCount}
        </span>
      </Link>
      {authed ? (
        <Link
          to="/admin"
          className="rounded-xl border px-3 py-1 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
        >
          Admin
        </Link>
      ) : (
        <Link
          to="/login"
          className="rounded-xl border px-3 py-1 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
        >
          Ingresar
        </Link>
      )}
    </div>
  );

  return (
    <>
      <Navbar right={<Right />} />
      <main className="mx-auto max-w-5xl p-4">
        <Routes>
          <Route path="/" element={<Home onAdd={handleAdd} />} />
          <Route path="/product/:id" element={<Product onAdd={handleAdd} />} />
          <Route
            path="/cart"
            element={
              <Cart
                items={cart}
                onRemove={handleRemove}
                onClear={handleClear}
                onInc={increment}
                onDec={decrement}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<p>404 — No encontrado</p>} />
        </Routes>
      </main>
      {toast && (
        <div className="fixed bottom-4 right-4 rounded-xl bg-black px-4 py-2 text-white shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
}
