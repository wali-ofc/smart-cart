import React, { useState, useRef, useEffect, useId } from "react";

// Visually hidden but still submitted with the form. Applied inline so no
// stylesheet change is needed (UI freeze).
const SR_ONLY = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

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
  required = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [labelId, setLabelId] = useState(null);
  const containerRef = useRef(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const listboxId = `${uid}-listbox`;
  const optionId = (index) => `${uid}-opt-${index}`;

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

  const selectedIndex = normalizedOptions.findIndex(
    (opt) => String(opt.value) === String(value)
  );
  const selectedOption = selectedIndex >= 0 ? normalizedOptions[selectedIndex] : null;
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // A <label for={id}> can only label a labelable element, and the visible
  // trigger is a div. When the caller passes an `id` that a <label for> points
  // at, borrow that label as the trigger's accessible name so the association
  // actually takes effect. `id` sits on the trigger rather than the hidden
  // <select> on purpose: that way clicking the label is inert instead of moving
  // focus to an invisible 1px control.
  useEffect(() => {
    if (ariaLabelledBy || ariaLabel || !id) {
      setLabelId(null);
      return;
    }
    const match = Array.from(document.querySelectorAll("label")).find(
      (label) => label.htmlFor === id
    );
    if (!match) {
      setLabelId(null);
      return;
    }
    if (!match.id) match.id = `${uid}-label`;
    setLabelId(match.id);
  }, [id, ariaLabel, ariaLabelledBy, uid]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
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
    setActiveIndex(-1);
    if (onChange) {
      // Pass synthetic event or raw value
      onChange({ target: { name, value: optionValue } }, optionValue);
    }
  };

  const openAt = (index) => {
    setIsOpen(true);
    setActiveIndex(index);
  };

  const handleToggle = () => {
    if (disabled) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : -1);
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event) => {
    if (disabled) return;
    const lastIndex = normalizedOptions.length - 1;
    const firstIndex = normalizedOptions.length ? 0 : -1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) openAt(selectedIndex >= 0 ? selectedIndex : firstIndex);
        else if (lastIndex >= 0)
          setActiveIndex((prev) => (prev < lastIndex ? prev + 1 : 0));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) openAt(selectedIndex >= 0 ? selectedIndex : lastIndex);
        else if (lastIndex >= 0)
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : lastIndex));
        break;
      case "Home":
        if (!isOpen) return;
        event.preventDefault();
        setActiveIndex(firstIndex);
        break;
      case "End":
        if (!isOpen) return;
        event.preventDefault();
        setActiveIndex(lastIndex);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isOpen) openAt(selectedIndex >= 0 ? selectedIndex : firstIndex);
        else if (activeIndex >= 0 && activeIndex <= lastIndex)
          handleSelect(normalizedOptions[activeIndex].value);
        break;
      case "Escape":
        if (!isOpen) return;
        event.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      case "Tab":
        if (isOpen) {
          setIsOpen(false);
          setActiveIndex(-1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`tf-dropdown-sort position-relative ${className} ${disabled ? "disabled opacity-75" : ""}`}
      style={{ width: "100%", ...style }}
    >
      {name ? (
        <select
          name={name}
          value={value}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
          onChange={() => {}}
          style={SR_ONLY}
        >
          {normalizedOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      ) : null}

      <div
        id={id}
        className="btn-select cursor-pointer d-flex align-items-center justify-content-between"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        style={{ width: "100%" }}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="none"
        aria-activedescendant={
          isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined
        }
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy || labelId || undefined}
        aria-describedby={ariaDescribedBy}
        aria-required={required || undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
      >
        <span className="text-sort-value">{displayText}</span>
        <span className={`icon icon-arrow-down transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
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
            // Closed: highlight the selected option, as before. Open: highlight
            // whichever option the keyboard is on. Reuses the existing `active`
            // class, which is already styled like :hover.
            const isActive = isOpen ? index === activeIndex : isSelected;
            return (
              <div
                key={index}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(item.value)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`select-item ${isActive ? "active" : ""}`}
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
