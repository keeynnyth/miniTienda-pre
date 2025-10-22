

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { ApiProduct } from "../lib/api";
import { fetchProducts } from "../lib/api";

type Props = { onAdd: (p: ApiProduct) => void };

export default function Home({ onAdd }: Props) {
  const [data, setData] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchProducts()
      .then((d) => alive && setData(d))
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : "Error desconocido";
        if (alive) setError(msg);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <section>
        <h1 className="mb-4 text-2xl font-semibold">Productos</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border p-3">
              <div className="aspect-[4/5] w-full rounded-xl bg-black/10 animate-pulse" />
              <div className="mt-2 h-4 w-3/4 rounded bg-black/10 animate-pulse" />
              <div className="mt-2 h-6 w-1/3 rounded bg-black/10 animate-pulse" />
              <div className="mt-2 h-8 w-1/2 rounded bg-black/10 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold">Productos</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.map((p) => (
          <ProductCard key={p.id} p={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

