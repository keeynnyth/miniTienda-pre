

// src/lib/format.ts
export function money(n: number) {
  // si querés ARS poné currency: 'ARS'
  return n.toLocaleString('es-AR', { style: 'currency', currency: 'USD' });
}
