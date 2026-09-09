import React from "react";

export default function Pagination({ page = 1, pages = 1, onChange }) {
  if (pages <= 1) return null;
  const range = [];
  for (let i = 1; i <= pages; i++) range.push(i);
  return (
    <>
      {range.map((n) => (
        <li key={n} className={n === page ? "active" : ""}>
          <a
            className="pagination-link animate-hover-btn"
            onClick={() => onChange(n)}
          >
            {n}
          </a>
        </li>
      ))}
      <li>
        <a
          onClick={() => (page < pages ? onChange(page + 1) : null)}
          className="pagination-link animate-hover-btn"
        >
          <span className="icon icon-arrow-right" />
        </a>
      </li>
    </>
  );
}