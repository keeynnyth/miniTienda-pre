

import { Link } from "react-router-dom";
import type { ApiProduct } from "../lib/api";
import { money } from "../lib/format";

type CartItem = { product: ApiProduct; qty: number };

type Props = {
  items: CartItem[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onInc: (id: number) => void;
  onDec: (id: number) => void;
};

export default function Cart({ items, onRemove, onClear, onInc, onDec }: Props) {
  const total = items.reduce((acc, x) => acc + x.product.price * x.qty, 0);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Carrito</h1>

      {items.length === 0 ? (
        <div className="rounded-2xl border p-6 text-center">
          <p className="mb-2">Tu carrito está vacío.</p>
          <Link to="/" className="inline-block rounded-xl border px-3 py-2 hover:bg-black/5">
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y rounded-2xl border">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="flex items-center justify-between p-3">
                <div>
                  <div className="font-medium">{product.title}</div>
                  <div className="text-sm opacity-70 flex items-center">
                    <button
                      className="rounded-lg border px-3 py-1 text-sm hover:bg-black/5"
                      onClick={() => onDec(product.id)}
                    >
                      −
                    </button>
                    <span className="mx-2 min-w-6 text-center inline-block">{qty}</span>
                    <button
                      className="rounded-lg border px-3 py-1 text-sm hover:bg-black/5"
                      onClick={() => onInc(product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div>{money(product.price * qty)}</div>
                  <button className="text-sm underline" onClick={() => onRemove(product.id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Total: {money(total)}</div>
            <div className="flex gap-2">
              <button className="rounded-xl border px-3 py-2 hover:bg-black/5" onClick={onClear}>
                Vaciar
              </button>
              <button className="rounded-xl bg-black px-3 py-2 text-white hover:opacity-90">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
