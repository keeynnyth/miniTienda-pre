

export function money(n) {
  return n.toLocaleString("es-AR", { style: "currency", currency: "USD" });
}
