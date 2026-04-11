// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

// const PasswordInput = ({ label, error, hint, id, ...props }) => {
//   const [visible, setVisible] = useState(false);
//   const inputId = id || "password";

//   return (
//     <div className="w-full">
//       <label htmlFor={inputId} className="auth-label">
//         {label}
//       </label>

//       <div className="relative">
//         <input
//           id={inputId}
//           type={visible ? "text" : "password"}
//           className={`auth-input pl-12 ${error ? "border-destructive ring-1 ring-destructive" : ""}`}
//           dir="rtl"
//           {...props}
//         />

//         <button
//           type="button"
//           onClick={() => setVisible((v) => !v)}
//           className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors"
//           aria-label={visible ? "إخفاء كلمة السر" : "إظهار كلمة السر"}
//           tabIndex={-1}
//         >
//           {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//         </button>
//       </div>

//       {hint && !error && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
//       {error && <p className="auth-error">{error}</p>}
//     </div>
//   );
// };

// export default PasswordInput;
import { Lock } from "lucide-react";

const PasswordInput = ({ label, error, id, value = "", ...props }) => {
  const inputId = id || "password";

  return (
    <div className="input-group">
      <label htmlFor={inputId} className="auth-label">
        {label}
      </label>

      <div className="password-wrapper">
        <input
          id={inputId}
          type="password"
          value={value}
          className="auth-input password-input-field"
          dir="rtl"
          {...props}
        />

        {!value && (
          <span className="input-icon-left password-lock-icon">
            <Lock size={16} />
          </span>
        )}
      </div>

      {error && <p className="auth-error">{error}</p>}
    </div>
  );
};

export default PasswordInput;

// import { useState } from "react";
// import { Eye, EyeOff, Lock } from "lucide-react";

// const PasswordInput = ({ label, error, id, ...props }) => {
//   const [visible, setVisible] = useState(false);
//   const inputId = id || "password";

//   return (
//     <div className="input-group">
//       <label htmlFor={inputId} className="auth-label">
//         {label}
//       </label>

//       <div className="password-wrapper">
//         <input
//           id={inputId}
//           type={visible ? "text" : "password"}
//           className="auth-input password-input-field"
//           dir="rtl"
//           {...props}
//         />

//         <button
//           type="button"
//           className="password-toggle-btn"
//           onClick={() => setVisible(!visible)}
//         >
//           {visible ? <EyeOff size={16} /> : <Eye size={16} />}
//         </button>

//         <span className="input-icon-left password-lock-icon">
//           <Lock size={16} />
//         </span>
//       </div>

//       {error && <p className="auth-error">{error}</p>}
//     </div>
//   );
// };

// export default PasswordInput;