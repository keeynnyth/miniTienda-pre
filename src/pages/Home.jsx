
// src/pages/Home.jsx  (o src/pages/AllProductos.jsx)
import { useState, useMemo } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { usePagination } from "../hooks/usePagination";

export default function Home({ onAdd }) {
  const { items, loading, error } = useProducts();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(p =>
      String(p.title || "").toLowerCase().includes(q) ||
      String(p.price || "").toLowerCase().includes(q)
    );
  }, [items, query]);

  const { page, pages, data, setPage, total } = usePagination(filtered, { perPage: 8 });

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 m-0">Productos</h1>
      </div>

      <div className="mb-3">
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} />
        <div className="small text-muted mt-1">
          {loading ? "Cargando…" : error ? `Error: ${error}` : `Mostrando ${data.length} de ${total}`}
        </div>
      </div>

      {loading && <div className="text-muted">Cargando…</div>}
      {error && <div className="text-danger">Error: {error}</div>}

      {!loading && !error && (
        <>
        {/* Home.jsx o AllProductos.jsx */}
<div className="row g-3">
  {data.map((p) => (
    <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
      <ProductCard p={p} onAdd={onAdd} />
    </div>
  ))}
</div>

          <Pagination page={page} pages={pages} onChange={setPage} />
        </>
      )}
    </section>
  );
}



