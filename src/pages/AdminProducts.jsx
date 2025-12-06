

import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { money } from "../lib/format";
import { useState } from "react";
import { productsApi } from "../lib/productsApi";

export default function AdminProducts() {
  const { items, loading, error, deleteProduct } = useProducts();
  const [busyId, setBusyId] = useState(null);
  const [msg, setMsg] = useState(null);

  if (!productsApi.enabled) {
    return <p className="text-red-600">MockAPI no configurada (VITE_MOCKAPI_BASE).</p>;
  }
  if (loading) return <p>Cargando…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  async function onDelete(id) {
    if (!window.confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;
    try {
      setBusyId(id);
      await deleteProduct(id);          // <- contexto
      setMsg("Producto eliminado.");
      setTimeout(() => setMsg(null), 1500);
    } catch (e) {
      alert(e.message || "No se pudo eliminar");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Productos (Admin)</h1>
        <Link to="/admin/products/new" className="rounded-xl border px-3 py-2 hover:bg-black/5">
          + Nuevo
        </Link>
      </div>

      <div className="overflow-auto rounded-2xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Título</th>
              <th className="px-3 py-2 text-left">Precio</th>
              <th className="px-3 py-2 text-left">Imagen</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-3 py-2">{r.id}</td>
                <td className="px-3 py-2">{r.title}</td>
                <td className="px-3 py-2">{money(Number(r.price) || 0)}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      className="h-12 w-12 rounded-xl object-cover bg-black/5 border"
                      onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
                    />
                    <span className="line-clamp-1 max-w-[18rem] text-xs opacity-70">{r.image}</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link to={`/admin/products/${r.id}/edit`} className="rounded-xl border px-3 py-1 hover:bg-black/5">
                      Editar
                    </Link>
                    <button
                      onClick={() => onDelete(r.id)}
                      disabled={busyId === r.id}
                      className="rounded-xl border px-3 py-1 hover:bg-black/5 disabled:opacity-50"
                    >
                      {busyId === r.id ? "Eliminando…" : "Eliminar"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center opacity-70">No hay productos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {msg && <p className="text-green-700">{msg}</p>}
    </section>
  );
}
