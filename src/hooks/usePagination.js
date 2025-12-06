

import { useMemo, useState } from "react";

export function usePagination(items = [], { perPage = 8 } = {}) {
  const [page, setPage] = useState(1);

  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / perPage));

  const data = useMemo(() => {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, page, perPage]);

  function setSafePage(p) {
    const n = Math.min(Math.max(1, p), pages);
    setPage(n);
  }

  return { page, pages, perPage, total, data, setPage: setSafePage };
}
