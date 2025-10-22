

import { Link } from "react-router-dom";
import type { ApiProduct } from "../lib/api";
import { money } from "../lib/format";

type Props = { p: ApiProduct; onAdd: (p: ApiProduct) => void };

export default function ProductCard({ p, onAdd }: Props) {
  return (
    <article className="rounded-2xl border p-3 shadow-sm transition hover:shadow-md">
      <Link to={`/product/${p.id}`} className="block rounded-xl overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="aspect-[4/5] w-full object-cover"
          loading="lazy"
        />
      </Link>

      <div className="mt-2">
        <h3 className="font-medium">{p.title}</h3>
        <div className="mt-1 font-semibold">{money(p.price)}</div>

        <div className="mt-2 flex gap-2">
          <Link
            to={`/product/${p.id}`}
            className="rounded-xl border px-3 py-1 text-sm hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
          >
            Ver
          </Link>
          <button
            onClick={() => onAdd(p)}
            className="rounded-xl border px-3 py-1 text-sm hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}
