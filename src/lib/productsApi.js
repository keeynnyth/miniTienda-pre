
const BASE = import.meta.env.VITE_MOCKAPI_BASE?.replace(/\/$/, "");
const HAS_API = !!BASE;
const R = HAS_API ? `${BASE}/products` : "";

// Helper para leer mensaje de error del server
async function readText(res) {
  const t = await res.text();
  try { return JSON.parse(t); } catch { return t; }
}

export const productsApi = {
  enabled: HAS_API,

  async list() {
    if (!HAS_API) throw new Error("Error al listar productos");
    const res = await fetch(R);
    if (!res.ok) throw new Error("Error al listar productos");
    return res.json();
  },

  async get(id) {
    if (!HAS_API) throw new Error("MockAPI no configurada");
    const res = await fetch(`${R}/${id}`);
    if (!res.ok) throw new Error("Producto no encontrado");
    return res.json();
  },

  async create(product) {
    if (!HAS_API) throw new Error("MockAPI no configurada");
    const res = await fetch(R, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const body = await readText(res);
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${body?.message || body || "No se pudo crear"}`);
    return typeof body === "string" ? JSON.parse(body) : body;
  },

  async update(id, product) {
    if (!HAS_API) throw new Error("MockAPI no configurada");
    const res = await fetch(`${R}/${id}`, {
      method: "PUT",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const body = await readText(res);
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${body?.message || body || "No se pudo actualizar"}`);
    return typeof body === "string" ? JSON.parse(body) : body;
  },

  async remove(id) {
    if (!HAS_API) throw new Error("MockAPI no configurada");
    const res = await fetch(`${R}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`No se pudo eliminar (HTTP ${res.status})`);
    return true;
  },
};
