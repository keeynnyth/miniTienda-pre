

export async function fetchProducts() {
  const res = await fetch("/products.json");
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

export async function fetchProductById(id) {
  const all = await fetchProducts();
  const found = all.find(p => String(p.id) === String(id));
  if (!found) throw new Error("Producto no encontrado");
  return found;
}

