import { useEffect, useState } from "react";

export default function Quantity({ setQuantity = (value) => {}, max = 99 }) {
  const limit = Number(max) > 0 ? Number(max) : 99;
  const clamp = (value) => Math.max(1, Math.min(limit, value));
  const [count, setCount] = useState(1);

  // Keep the stepper in range if `max` changes (e.g. product switch)
  useEffect(() => {
    setCount((prev) => clamp(prev));
  }, [limit]);

  useEffect(() => {
    setQuantity(count);
  }, [count]);

  return (
    <div className="wg-quantity">
      <span
        className="btn-quantity minus-btn"
        onClick={() => setCount((pre) => clamp(pre - 1))}
      >
        -
      </span>
      <input
        min={1}
        max={limit}
        type="text"
        onChange={(e) => {
          const parsed = Number(e.target.value);
          setCount(Number.isFinite(parsed) ? clamp(parsed) : 1);
        }}
        name="number"
        value={count}
      />
      <span
        className="btn-quantity plus-btn"
        onClick={() => setCount((pre) => clamp(pre + 1))}
      >
        +
      </span>
    </div>
  );
}