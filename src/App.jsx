

import { useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import EditProduct from "./pages/EditProduct";
import NewProduct from "./pages/NewProduct";
import { RequireAuth, useAuth } from "./context/AuthContext";
import { toast } from "react-toastify";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function App() {
  const [cart, setCart] = useState([]);
  const { isAuthenticated } = useAuth();

  const handleAdd = (p) => {
    setCart((prev) => {
      const i = prev.findIndex((x) => x.product.id === p.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [...prev, { product: p, qty: 1 }];
    });
    toast.success("Producto agregado 🛒");
  };

  const handleRemove = (id) => setCart((s) => s.filter((x) => x.product.id !== id));
  const handleClear = () => setCart([]);
  const increment = (id) => setCart((s) => s.map((x) => (x.product.id === id ? { ...x, qty: x.qty + 1 } : x)));
  const decrement = (id) => setCart((s) => s.map((x) => (x.product.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)));

  const cartCount = cart.reduce((a, x) => a + x.qty, 0);

  const Right = () => (
  <div className="d-flex align-items-center gap-2">
    <NavLink to="/" className="btn btn-link btn-sm d-sm-none px-2">Inicio</NavLink>

    <Link to="/cart" className="btn btn-outline-dark btn-sm btn-pill d-flex align-items-center gap-1">
      <AiOutlineShoppingCart />
      Carrito <span className="badge text-bg-light ms-1">{cartCount}</span>
    </Link>

    {isAuthenticated ? (
      <Link to="/admin" className="btn btn-dark btn-sm btn-pill">Admin</Link>
    ) : (
      <Link to="/login" className="btn btn-dark btn-sm btn-pill">Ingresar</Link>
    )}
  </div>
);


  return (
    <>
    

      <Navbar right={<Right />} />

      <main className="container py-3">
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

          <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
          <Route path="/admin/products" element={<RequireAuth><AdminProducts /></RequireAuth>} />
          <Route path="/admin/products/new" element={<RequireAuth><NewProduct /></RequireAuth>} />
          <Route path="/admin/products/:id/edit" element={<RequireAuth><EditProduct /></RequireAuth>} />

          <Route path="*" element={<p>404 — No encontrado</p>} />
        </Routes>
      </main>
    </>
  );
}
