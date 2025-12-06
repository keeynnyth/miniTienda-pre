

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder = "Buscar productos..." }) {
  const [q, setQ] = useState(value || "");

  useEffect(() => { setQ(value || ""); }, [value]);

  return (
    <div className="d-flex align-items-center gap-2">
      <div className="input-group">
        <span className="input-group-text"><FiSearch /></span>
        <input
          className="form-control"
          value={q}
          onChange={(e) => { setQ(e.target.value); onChange?.(e.target.value); }}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
