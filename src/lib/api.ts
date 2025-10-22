

// src/lib/api.ts
export type ApiProduct = {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
};

export async function fetchProducts(): Promise<ApiProduct[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

export async function fetchProductById(id: number | string): Promise<ApiProduct> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}
