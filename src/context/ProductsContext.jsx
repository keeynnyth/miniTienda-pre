// src/context/ProductsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  getProducts,
  getProduct as apiGetOne,
  createProduct as apiCreate,
  updateProduct as apiUpdate,
  deleteProduct as apiDelete,
} from "../lib/api";

const ProductsCtx = createContext(null);

export function ProductsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // siempre string

  // Carga inicial
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const list = await getProducts();
        if (!alive) return;
        setItems(Array.isArray(list) ? list : []);
        setError("");
      } catch (err) {
        if (!alive) return;
        console.error("[Products] getProducts error:", err);
        setError(err?.message || String(err));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Refrescar lista manualmente
  async function refresh() {
    setLoading(true);
    try {
      const list = await getProducts();
      setItems(Array.isArray(list) ? list : []);
      setError("");
    } catch (err) {
      console.error("[Products] refresh error:", err);
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  // Obtener uno (busca en memoria y si no, va a la API)
  async function getOne(id) {
    const found = items.find((p) => String(p.id) === String(id));
    if (found) return found;
    return apiGetOne(id);
  }

  // Crear
  async function createProduct(data) {
    try {
      const saved = await apiCreate(data);
      setItems((prev) => [...(prev || []), saved]);
      return saved;
    } catch (err) {
      console.error("[Products] createProduct error:", err);
      setError(err?.message || String(err));
      throw err;
    }
  }

  // Editar
  async function updateProduct(id, data) {
    try {
      const saved = await apiUpdate(id, data);
      setItems((prev) =>
        (prev || []).map((p) => (String(p.id) === String(id) ? saved : p))
      );
      return saved;
    } catch (err) {
      console.error("[Products] updateProduct error:", err);
      setError(err?.message || String(err));
      throw err;
    }
  }

  // Eliminar
  async function deleteProduct(id) {
    try {
      await apiDelete(id);
      setItems((prev) => (prev || []).filter((p) => String(p.id) !== String(id)));
      return true;
    } catch (err) {
      console.error("[Products] deleteProduct error:", err);
      setError(err?.message || String(err));
      throw err;
    }
  }

  return (
    <ProductsCtx.Provider
      value={{
        items,
        loading,
        error,
        // helpers
        refresh,
        getOne,
        // CRUD para usar en páginas
        createProduct,
        updateProduct,
        deleteProduct,
        // acceso manual si lo necesitás
        setItems,
      }}
    >
      {children}
    </ProductsCtx.Provider>
  );
}

export const useProducts = () => useContext(ProductsCtx);
