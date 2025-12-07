

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../lib/api";
import { money } from "../lib/format";
import { useSEO } from "../lib/useSEO";


export default function Product({ onAdd }) {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let alive = true;
    setLoading(true);
    fetchProductById(id)
      .then((d) => alive && setP(d))
      .catch((e) => alive && setError(e.message || "Error"))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <article className="grid gap-6 md:grid-cols-2">
        <div className="aspect-square w-full rounded-2xl bg-black/10 animate-pulse" />
        <div>
          <div className="h-6 w-2/3 rounded bg-black/10 animate-pulse mb-2" />
          <div className="h-4 w-20 rounded bg-black/10 animate-pulse mb-4" />
          <div className="h-6 w-28 rounded bg-black/10 animate-pulse mb-4" />
          <div className="h-10 w-44 rounded bg-black/10 animate-pulse" />
        </div>
      </article>
    );
  }

  if (error || !p) return <p className="text-red-600">{error || "No encontrado"}</p>;

  return (
    <article className="grid gap-6 md:grid-cols-2">
      <img
        src={p.image}
        alt={p.title}
        className="w-full rounded-2xl object-contain md:aspect-square max-h-[70vh] bg-white"
      />
      <div>
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <p className="opacity-80 mt-1">ID: {p.id}</p>
        <div className="my-3 text-xl font-bold">{money(p.price)}</div>
        <button onClick={() => onAdd(p)} className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90">
          Agregar al carrito
        </button>
      </div>
    </article>
  );
useSEO({
  title: producto ? `${producto.title} • MiniTienda` : "Producto • MiniTienda",
  description: `Detalle del producto ${producto?.title ?? ""} en MiniTienda.`,
});
 
}

