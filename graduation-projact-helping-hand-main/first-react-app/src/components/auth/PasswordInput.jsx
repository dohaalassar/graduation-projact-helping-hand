import { useState } from "react";
import { Eye, EyeOff, Lock, Check } from "lucide-react";
import { checkPasswordStrength } from "../../utils/validation";

const PasswordInput = ({ label, error, id, value = "", showStrengthMeter = false, ...props }) => {
  const [visible, setVisible] = useState(false);
  const inputId = id || "password";

  const { score, checks } = checkPasswordStrength(value);

  // Get strength descriptive text and class
  const getStrengthText = () => {
    if (!value) return "";
    if (score <= 2) return "ضعيفة جداً";
    if (score <= 3) return "ضعيفة";
    if (score === 4) return "متوسطة";
    return "قوية";
  };

  const getStrengthClass = () => {
    if (!value) return "";
    if (score <= 2) return "strength-very-weak";
    if (score <= 3) return "strength-weak";
    if (score === 4) return "strength-medium";
    return "strength-strong";
  };

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="auth-label">
          {label}
        </label>
      )}

      <div className="password-wrapper">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          value={value}
          className="auth-input password-input-field has-password-icons"
          dir="rtl"
          {...props}
        />

        <button
          type="button"
          className="password-toggle-btn"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "إخفاء كلمة السر" : "إظهار كلمة السر"}
          tabIndex={-1}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>

        <span className="input-icon-left password-lock-icon">
          <Lock size={16} />
        </span>
      </div>

      {showStrengthMeter && value && (
        <div className="strength-meter-container" dir="rtl">
          <div className="strength-bar-row">
            <span className="strength-label">قوة كلمة المرور: </span>
            <span className={`strength-text-value ${getStrengthClass()}`}>{getStrengthText()}</span>
          </div>
          
          <div className="strength-bar-bg">
            <div 
              className={`strength-bar-fill ${getStrengthClass()}`} 
              style={{ width: `${(score / 5) * 100}%` }}
            />
          </div>

          <ul className="strength-checklist">
            <li className={checks.length ? "met" : "unmet"}>
              {checks.length ? <Check size={12} className="check-icon" /> : <span className="bullet-dot" />}
              <span>8 أحرف أو أكثر</span>
            </li>
            <li className={checks.hasUpper ? "met" : "unmet"}>
              {checks.hasUpper ? <Check size={12} className="check-icon" /> : <span className="bullet-dot" />}
              <span>حرف كبير واحد على الأقل (A-Z)</span>
            </li>
            <li className={checks.hasLower ? "met" : "unmet"}>
              {checks.hasLower ? <Check size={12} className="check-icon" /> : <span className="bullet-dot" />}
              <span>حرف صغير واحد على الأقل (a-z)</span>
            </li>
            <li className={checks.hasNumber ? "met" : "unmet"}>
              {checks.hasNumber ? <Check size={12} className="check-icon" /> : <span className="bullet-dot" />}
              <span>رقم واحد على الأقل (0-9)</span>
            </li>
            <li className={checks.hasSpecial ? "met" : "unmet"}>
              {checks.hasSpecial ? <Check size={12} className="check-icon" /> : <span className="bullet-dot" />}
              <span>رمز خاص واحد على الأقل (مثل ! و&)</span>
            </li>
          </ul>
        </div>
      )}

      {error && <p className="auth-error">{error}</p>}
    </div>
  );
};

export default PasswordInput;