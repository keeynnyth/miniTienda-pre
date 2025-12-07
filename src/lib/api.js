

// src/lib/api.js

// Base MockAPI (quitar barras finales)
const RAW = import.meta.env.VITE_MOCKAPI_BASE ?? "";
const BASE = RAW.replace(/\/+$/, "");

// Útil para mostrar avisos en UI (p.ej. en NewProduct)
export const mockEnabled = !!BASE;

// --- Helper HTTP genérico ---
async function http(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${txt}`);
  }
  try {
    return await res.json();
  } catch {
    // DELETE puede no traer body
    return true;
  }
}

// --- Fallback local SOLO LECTURA (/products.json) ---
async function readLocalList() {
  const res = await fetch("/products.json");
  if (!res.ok) throw new Error("Error al cargar productos (local)");
  return res.json();
}

// ===== Lectura =====
export async function getProducts() {
  if (BASE) return http(`${BASE}`);        // MockAPI
  return readLocalList();                  // Local solo lectura
}

export async function getProduct(id) {
  if (BASE) return http(`${BASE}/${id}`);  // MockAPI
  const all = await readLocalList();       // Local
  const found = all.find((p) => String(p.id) === String(id));
  if (!found) throw new Error("Producto no encontrado");
  return found;
}

// ===== Escritura (solo si hay MockAPI) =====
export async function createProduct(data) {
  if (!BASE) throw new Error("Crear no disponible en modo local; define VITE_MOCKAPI_BASE");
  return http(`${BASE}`, { method: "POST", body: JSON.stringify(data) });
}

export async function updateProduct(id, data) {
  if (!BASE) throw new Error("Editar no disponible en modo local; define VITE_MOCKAPI_BASE");
  return http(`${BASE}/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export async function deleteProduct(id) {
  if (!BASE) throw new Error("Eliminar no disponible en modo local; define VITE_MOCKAPI_BASE");
  return http(`${BASE}/${id}`, { method: "DELETE" });
}

// Aliases para compatibilidad con código viejo (Home/Detalle)
export const fetchProducts = getProducts;
export const fetchProductById = getProduct;
