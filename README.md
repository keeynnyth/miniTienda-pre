
MaxiShopp — Mini eCommerce en React

Aplicación web de eCommerce mobile-first construida con React + Vite.
Incluye listado de productos, carrito, autenticación simulada con Context API, rutas protegidas, CRUD contra MockAPI (crear/editar/eliminar), búsqueda en tiempo real, paginación, y mejoras de UI/UX con Bootstrap, styled-components, React Icons y Toastify.

Proyecto de práctica / pre-entrega: manejo de estado, efectos, rutas (estáticas, dinámicas y protegidas), fetch a API, formularios controlados y validaciones básicas
(assets estáticos opcionales).

Funcionalidades
Catálogo de productos

Lectura desde MockAPI (GET /products)

Búsqueda en tiempo real (por título / precio)

Paginación (client-side)

Tarjetas con imágenes lazy, título truncado y botón de compra

Carrito (Context API + useReducer)

Agregar / eliminar / subtotales

Persistencia simple (storage) opcional

Feedback visual con React Toastify

Autenticación (simulada)

Login y logout con token simulado

Rutas protegidas (área Admin) mediante Context API

Redirección a /login si no estás autenticado

Administración de productos (CRUD)

Crear nuevo producto (POST /products)

Editar producto (PUT /products/:id)

Eliminar producto (DELETE /products/:id)

Formularios controlados con validaciones básicas

Rutas

Home (listado)

Detalle dinámico /product/:id

/cart

/login

/admin (protegida)

/admin/products/new y /admin/products/:id/edit

UI/UX

Mobile-first con Bootstrap

styled-components para detalles visuales

React Icons para iconografía

Navbar con marca MaxiShopp

Toastify para avisos de éxito/error

 Tecnologías
React 19, Vite

React Router

Context API, Hooks

Bootstrap 5, styled-components

React Icons, React Toastify

MockAPI para persistencia de productos

 Estructura (resumen)
python
Copiar código
src/
├─ components/
│  ├─ Navbar.jsx
│  ├─ ProductCard.jsx
│  ├─ Pagination.jsx
│  └─ SearchBar.jsx
├─ pages/
│  ├─ Home.jsx           # listado + búsqueda + paginación
│  ├─ Product.jsx        # detalle dinámico
│  ├─ Cart.jsx
│  ├─ Login.jsx
│  ├─ Admin.jsx
│  ├─ NewProduct.jsx     # POST
│  └─ EditProduct.jsx    # PUT/DELETE
├─ context/
│  ├─ AuthContext.jsx
│  └─ ProductsContext.jsx
├─ hooks/
│  └─ usePagination.js
├─ lib/
│  ├─ api.js             # llamadas a MockAPI
│  ├─ format.js          # helpers: money, etc.
│  └─ useSEO.js          # (opcional) título/description sin Helmet
├─ App.jsx
├─ main.jsx
└─ index.css
