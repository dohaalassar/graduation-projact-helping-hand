
const TextInput = ({
  label,
  error,
  id,
  icon = null,
  showIcon = false,
  inputClassName = "",
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

      <div className="input-wrapper">
        <input
          id={inputId}
          className={`auth-input text-input ${showIcon ? "has-left-icon" : ""} ${inputClassName}`}
          dir="rtl"
          {...props}
        />

        {showIcon && icon && (
          <span className="input-icon-left">
            {icon}
          </span>
        )}
      </div>

      {error && <p className="auth-error">{error}</p>}
    </div>
  );
};

export default TextInput;
