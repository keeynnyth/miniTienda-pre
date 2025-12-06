

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { productsApi } from "../lib/productsApi";
import { fetchProducts as fetchLocal } from "../lib/api";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [items, setItems] = useState([]);     // lista global
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readOnly, setReadOnly] = useState(false); // si viene de JSON local

  // Carga inicial: MockAPI si existe; si no, JSON local (read-only)
  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (productsApi.enabled) {
          const data = await productsApi.list();
          if (alive) { setItems(data); setReadOnly(false); }
        } else {
          const data = await fetchLocal();
          if (alive) { setItems(data); setReadOnly(true); }
        }
      } catch (e) {
        if (alive) setError(e.message || "Error al listar productos");
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, []);

  // Helpers CRUD (optimistas)
  async function createProduct(payload) {
    if (readOnly) throw new Error("Modo solo-lectura (MockAPI no configurada)");
    const created = await productsApi.create(payload);
    setItems((s) => [...s, created]);
    return created;
  }

  async function updateProduct(id, payload) {
    if (readOnly) throw new Error("Modo solo-lectura (MockAPI no configurada)");
    const updated = await productsApi.update(id, payload);
    setItems((s) => s.map((it) => String(it.id) === String(id) ? updated : it));
    return updated;
  }

  async function deleteProduct(id) {
    if (readOnly) throw new Error("Modo solo-lectura (MockAPI no configurada)");
    await productsApi.remove(id);
    setItems((s) => s.filter((it) => String(it.id) !== String(id)));
    return true;
  }

  function getById(id) {
    return items.find((it) => String(it.id) === String(id)) || null;
  }

  const value = useMemo(() => ({
    items, loading, error, readOnly,
    createProduct, updateProduct, deleteProduct, getById,
  }), [items, loading, error, readOnly]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts debe usarse dentro de <ProductsProvider>");
  return ctx;
}
