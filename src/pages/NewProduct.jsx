

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { productsApi } from "../lib/productsApi";

function validate(values) {
  const errors = {};
  const title = values.title?.trim() ?? "";
  const price = Number(values.price);
  const image = values.image?.trim() ?? "";
  if (title.length < 3 || title.length > 80) errors.title = "Entre 3 y 80 caracteres";
  if (!Number.isFinite(price) || price <= 0) errors.price = "Precio debe ser un número mayor a 0";
  const urlLike = /^https?:\/\//i.test(image) || image.startsWith("/img/");
  if (!urlLike) errors.image = 'Debe ser URL http(s) o ruta local tipo "/img/archivo.jpg"';
  return errors;
}

export default function NewProduct() {
  const nav = useNavigate();
  const { createProduct } = useProducts();
  const [values, setValues] = useState({ title: "", price: "", image: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [okMsg, setOkMsg] = useState(null);

  function onChange(e) {
    const { name, value } = e.target;
    const v = { ...values, [name]: value };
    setValues(v);
    setErrors(validate(v));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setApiError(null);
    setOkMsg(null);
    if (Object.keys(errs).length) return;

    if (!productsApi.enabled) {
      setApiError("MockAPI no está configurada. Agrega VITE_MOCKAPI_BASE en .env");
      return;
    }

    setSubmitting(true);
    try {
      await createProduct({
        title: values.title.trim(),
        price: Number(values.price),
        image: values.image.trim(),
      });
      setOkMsg("Producto creado ✔");
      setTimeout(() => nav("/admin/products"), 800);
    } catch (err) {
      setApiError(err.message || "No se pudo crear");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Nuevo producto</h1>

      {!productsApi.enabled && (
        <p className="mb-3 rounded-xl border bg-yellow-50 p-3 text-sm">
          <strong>Atención:</strong> MockAPI no configurada. Define <code>VITE_MOCKAPI_BASE</code> y reinicia el server.
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Título</label>
          <input name="title" value={values.title} onChange={onChange} className="w-full rounded-xl border px-3 py-2" />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Precio</label>
          <input name="price" value={values.price} onChange={onChange} className="w-full rounded-xl border px-3 py-2" inputMode="decimal" />
          {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Imagen (URL o /img/archivo.jpg)</label>
          <input name="image" value={values.image} onChange={onChange} className="w-full rounded-xl border px-3 py-2" />
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
        </div>

        {apiError && <p className="text-red-600 text-sm">{apiError}</p>}
        {okMsg && <p className="text-green-700 text-sm">{okMsg}</p>}

        <div className="flex gap-2">
          <button type="submit" disabled={submitting} className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-50">
            {submitting ? "Guardando..." : "Guardar"}
          </button>
          <button type="button" onClick={() => nav(-1)} className="rounded-xl border px-4 py-2 hover:bg-black/5">
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
