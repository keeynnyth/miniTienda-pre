

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;

  const items = [];
  const max = 5; // cantidad de botones visibles

  const start = Math.max(1, page - Math.floor(max / 2));
  const end = Math.min(pages, start + max - 1);
  const first = start > 1;
  const last = end < pages;

  return (
    <nav aria-label="Paginación" className="d-flex justify-content-center my-3">
      <ul className="pagination mb-0">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(page - 1)}>&laquo;</button>
        </li>

        {first && (
          <>
            <li className="page-item"><button className="page-link" onClick={() => onChange(1)}>1</button></li>
            <li className="page-item disabled"><span className="page-link">…</span></li>
          </>
        )}

        {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(n => (
          <li key={n} className={`page-item ${n === page ? "active" : ""}`}>
            <button
              className="page-link"
              aria-current={n === page ? "page" : undefined}
              onClick={() => onChange(n)}
            >{n}</button>
          </li>
        ))}

        {last && (
          <>
            <li className="page-item disabled"><span className="page-link">…</span></li>
            <li className="page-item"><button className="page-link" onClick={() => onChange(pages)}>{pages}</button></li>
          </>
        )}

        <li className={`page-item ${page === pages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(page + 1)}>&raquo;</button>
        </li>
      </ul>
    </nav>
  );
  <ul className="pagination pagination-sm mb-0">
  {/* ... */}
</ul>

}
