
import { ChevronDown } from "lucide-react";

const SelectInput = ({
  label,
  options = [],
  placeholder,
  value,
  error,
  id,
  ...props
}) => {
  const inputId = id || label;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="auth-label">
          {label}
        </label>
      )}

      <div className="select-wrapper">
        <select
          id={inputId}
          value={value}
          className={`auth-select ${error ? "input-error" : ""}`}
          dir="rtl"
          {...props}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="select-icon">
          <ChevronDown size={16} />
        </span>
      </div>

      {error && <p className="auth-error">{error}</p>}
    </div>
  );
};

export default SelectInput;