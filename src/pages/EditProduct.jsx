

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

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

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();
  const { getById, updateProduct } = useProducts();

  const base = getById(id); // puede venir aún vacío si cargó recién; lo manejamos con useEffect
  const [values, setValues] = useState({ title: base?.title || "", price: base?.price ?? "", image: base?.image || "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(!base);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [okMsg, setOkMsg] = useState(null);

  useEffect(() => {
    if (base) {
      setValues({ title: base.title ?? "", price: String(base.price ?? ""), image: base.image ?? "" });
      setLoading(false);
    }
  }, [base]);

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

    setSubmitting(true);
    try {
      await updateProduct(id, {
        title: values.title.trim(),
        price: Number(values.price),
        image: values.image.trim(),
      });
      setOkMsg("Cambios guardados ✔");
      setTimeout(() => nav("/admin/products"), 800);
    } catch (err) {
      setApiError(err.message || "No se pudo actualizar");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p>Cargando…</p>;

  return (
    <section className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Editar producto #{id}</h1>

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
            {submitting ? "Guardando…" : "Guardar cambios"}
          </button>
          <Link to="/admin/products" className="rounded-xl border px-4 py-2 hover:bg-black/5">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  );
}
 