import React, { useState, useRef, useEffect } from "react";

export default function CustomSelect({
  options = [],
  value = "",
  onChange,
  placeholder = "Select an option",
  name,
  id,
  className = "",
  style = {},
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Normalize options array to { value, label }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "object" && opt !== null) {
      return {
        value: opt.value !== undefined ? opt.value : opt.label,
        label: opt.label !== undefined ? opt.label : opt.text || String(opt.value),
      };
    }
    return { value: opt, label: String(opt) };
  });

  const selectedOption = normalizedOptions.find((opt) => String(opt.value) === String(value));
  const displayText = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    if (disabled) return;
    setIsOpen(false);
    if (onChange) {
      // Pass synthetic event or raw value
      onChange({ target: { name, value: optionValue } }, optionValue);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`tf-dropdown-sort position-relative ${className} ${disabled ? "disabled opacity-75" : ""}`}
      style={{ width: "100%", ...style }}
      id={id}
    >
      <div
        className="btn-select cursor-pointer d-flex align-items-center justify-content-between"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        style={{ width: "100%" }}
      >
        <span className="text-sort-value">{displayText}</span>
        <span className={`icon icon-arrow-down transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div
          className="dropdown-menu show w-100 position-absolute"
          style={{
            top: "100%",
            left: 0,
            zIndex: 1050,
            maxHeight: "220px",
            overflowY: "auto",
            display: "block",
          }}
        >
          {normalizedOptions.map((item, index) => {
            const isSelected = String(item.value) === String(value);
            return (
              <div
                key={index}
                onClick={() => handleSelect(item.value)}
                className={`select-item ${isSelected ? "active" : ""}`}
                style={{ cursor: "pointer" }}
              >
                <span className="text-value-item">{item.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
