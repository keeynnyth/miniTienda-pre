

# MiniTienda — Pre-entrega React

Catálogo eCommerce con React + Vite + TypeScript. Lista productos desde API pública, permite ver detalle, agregar al carrito, manejar cantidades y navegar entre secciones. Incluye una ruta protegida de demo (Login/Admin). Estilos con Tailwind v4.

## 🧱 Stack
- **Vite + React + TypeScript**
- **Tailwind CSS v4** (plugin `@tailwindcss/vite`)
- **React Router** (`react-router-dom`)
- Fetch API (sin librerías extras)

## ✅ Requisitos cumplidos

### Requerimiento #1 — Carrito básico
- Componente para **listar productos** (inicialmente mock; luego API).
- **Estado del carrito con `useState`** en `App.tsx`.
- **Evento de clic** “Agregar al carrito”.
- Componente **Cart** que muestra ítems y total.
- **Layout** con `Navbar`.

### Requerimiento #2 — API + estados
- **Integración con API** pública: `https://fakestoreapi.com/products`.
- **Estados de carga y error** en Home y Product.
- **Gestión de estado con `useState`** para `loading`, `error`, `data`.
- **`useEffect`** para efectos de carga inicial.
- **Ampliación del carrito**: botones **+ / −** para cantidades.
- Mejora de diseño (Tailwind v4, skeletons de carga, toast simple).

### Requerimiento #3 — Rutas
- **React Router** configurado.
- Rutas: `/` (Home), `/product/:id` (Detalle), `/cart` (Carrito).
- **Navegación** entre productos (link en card y botón “Ver”).
- **Loading/Error** en páginas que hacen fetch.

### Requerimiento #4 — Rutas dinámicas y protegidas
- **Ruta dinámica** `/product/:id`.
- **Interactividad** (agregar desde detalle y navegación SPA).
- **Ruta protegida** `/admin` con guard (demo `localStorage`).
- **Navbar** con links, badge de carrito y acceso a Login/Admin.

## 📂 Estructura principal

src/
components/
Navbar.tsx
ProductCard.tsx
lib/
api.ts # fetch a la API pública
auth.ts # demo auth via localStorage
format.ts # helper para formatear moneda
pages/
Home.tsx # listado (API + loading/error)
Product.tsx # detalle (API + loading/error)
Cart.tsx # carrito (+/−, total)
Login.tsx # login demo
Admin.tsx # ruta protegida
App.tsx
main.tsx
index.css # Tailwind v4: @import "tailwindcss";
public/
(assets estáticos opcionales)