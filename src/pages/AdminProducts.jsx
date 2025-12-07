
// src/pages/AdminProducts.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { getProducts, deleteProduct } from "../lib/api"; // <- tus helpers a MockAPI

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setItems(data);
      } catch (err) {
        console.error(err);
        toast.error("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onDelete = async (id, title) => {
    const ok = confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`);
    if (!ok) return;
    try {
      await deleteProduct(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
      toast.success("Producto eliminado");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo eliminar");
    }
  };

  if (loading) return <p>Cargando…</p>;

  return (
    <section className="py-3">
      {/* Título + acción Nuevo alineada a la derecha */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="display-6 fw-semibold m-0">Productos (Admin)</h1>

        <Link
          to="/admin/products/new"
          className="btn btn-dark btn-pill btn-hover-lift d-inline-flex align-items-center gap-2"
        >
          <FiPlus /> Nuevo
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: 60 }}>ID</th>
              <th>Título</th>
              <th style={{ width: 140 }}>Precio</th>
              <th style={{ width: 180 }}>Imagen</th>
              <th style={{ width: 180 }} className="text-end">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td className="text-truncate" style={{ maxWidth: 380 }}>{p.title}</td>
                <td>US$ {Number(p.price).toLocaleString("es-AR", { minimumFractionDigits: 2 })}</td>
                <td className="d-flex align-items-center gap-2">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={44}
                    height={44}
                    style={{ objectFit: "cover", borderRadius: 8, border: "1px solid rgba(0,0,0,.08)" }}
                    loading="lazy"
                  />
                  <small className="text-secondary text-truncate">{p.image}</small>
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-soft-primary btn-sm btn-pill d-inline-flex align-items-center gap-1"
                      onClick={() => nav(`/admin/products/${p.id}/edit`)}
                    >
                      <FiEdit2 /> Editar
                    </button>

                    <button
                      className="btn btn-soft-danger btn-sm btn-pill d-inline-flex align-items-center gap-1"
                      onClick={() => onDelete(p.id, p.title)}
                    >
                      <FiTrash2 /> Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-5 text-secondary">
                  No hay productos cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
