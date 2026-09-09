// Server-supported sort values only (spec GET /api/products?sort=)
const sortingOptions = [
  { text: "Default", value: "" },
  { text: "Price, low to high", value: "price" },
  { text: "Price, high to low", value: "-price" },
  { text: "Newest", value: "newest" },
  { text: "Top rated", value: "rating" },
];

export default function Sorting({ value = "", onChange }) {
  const selected =
    sortingOptions.find((o) => o.value === value) || sortingOptions[0];

  return (
    <>
      <div className="btn-select">
        <span className="text-sort-value">{selected.text}</span>
        <span className="icon icon-arrow-down" />
      </div>
      <div className="dropdown-menu">
        {sortingOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => onChange(item.value)}
            className={`select-item ${item == selected ? "active" : ""}`}
          >
            <span className="text-value-item">{item.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}