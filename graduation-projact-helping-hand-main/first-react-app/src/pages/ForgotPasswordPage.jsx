import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import TextInput from "../components/auth/TextInput";
import PasswordInput from "../components/auth/PasswordInput";
import PrimaryButton from "../components/auth/PrimaryButton";
import { sendResetCode, resetPassword } from "../services/authService";
import "../styles/authlayout.css";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  // المراحل: 1=إدخال إيميل، 2=إدخال رمز، 3=كلمة سر جديدة، 4=نجاح
  const [stage, setStage]           = useState(1);
  const [email, setEmail]           = useState("");
  const [code, setCode]             = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [emailError, setEmailError] = useState("");

  // ── إرسال الرمز ──
  const handleSendCode = async () => {
    setError("");
    if (!email.trim()) {
      setEmailError("البريد الإلكتروني مطلوب");
      return;
    }
    setLoading(true);
    try {
      await sendResetCode(email);
      setStage(2);
    } catch (err) {
      setError(err.response?.data?.message || "البريد الإلكتروني غير مسجل");
    } finally {
      setLoading(false);
    }
  };

  // ── التحقق من الرمز ──
  const handleVerifyCode = () => {
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      setError("يرجى إدخال الرمز كامل");
      return;
    }
    setError("");
    setStage(3);
  };

  // ── تغيير كلمة السر ──
  const handleResetPassword = async () => {
    setError("");
    if (!newPassword || newPassword.length < 6) {
      setError("كلمة السر يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    setLoading(true);
    try {
      const fullCode = code.join("");
      await resetPassword(email, fullCode, newPassword);
      setStage(4);
    } catch (err) {
      setError(err.response?.data?.message || "رمز التحقق غير صحيح أو منتهي");
    } finally {
      setLoading(false);
    }
  };

  // ── إدخال الرمز ──
  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError("");
      if (value !== "" && index < 5) {
        const next = document.getElementById(`code-${index + 1}`);
        if (next) next.focus();
      }
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  return (
    <div className="auth-page-container">
      <AuthLayout>
        <AuthCard showBack fallbackPath="/login">

          {/* ── المرحلة 1: إدخال الإيميل ── */}
          {stage === 1 && (
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "1rem" }}>
                قم بإدخال البريد الإلكتروني المستخدم عند التسجيل
              </h3>
              <p style={{ fontSize: "12px", color: "#666", textAlign: "right", marginBottom: "5px" }}>
                البريد الإلكتروني
              </p>
              <TextInput
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                  setError("");
                }}
                placeholder="helpinghand2026@gmail.com"
                showIcon
                icon={<Mail size={16} />}
                error={emailError}
              />
              <p style={{ fontSize: "11px", color: "#888", textAlign: "right", marginTop: "5px" }}>
                سيصلك رمز التحقق على بريدك الإلكتروني
              </p>

              {error && (
                <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "8px" }}>
                  {error}
                </p>
              )}

              <div style={{ marginTop: "1rem" }}>
                <PrimaryButton onClick={handleSendCode} loading={loading}>
                  أرسل الرمز
                </PrimaryButton>
              </div>
            </div>
          )}

          {/* ── المرحلة 2: إدخال الرمز ── */}
          {stage === 2 && (
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "0.5rem" }}>
                أدخل رمز التحقق المكون من 6 أرقام
              </h3>
              <p style={{ fontSize: "12px", color: "#888", marginBottom: "1.5rem" }}>
                تم إرسال الرمز إلى {email}
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: "10px", direction: "ltr", marginBottom: "1.5rem" }}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(index, e)}
                    style={{
                      width: "40px",
                      height: "45px",
                      textAlign: "center",
                      fontSize: "18px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      outline: "none",
                    }}
                  />
                ))}
              </div>

              {error && (
                <p style={{ color: "#ef4444", fontSize: "13px", marginBottom: "10px" }}>
                  {error}
                </p>
              )}

              <PrimaryButton onClick={handleVerifyCode}>
                تحقق
              </PrimaryButton>

              <div style={{ marginTop: "15px" }}>
                <button
                  onClick={() => {
                    setStage(1);
                    setCode(["", "", "", "", "", ""]);
                    setError("");
                  }}
                  style={{
                    color: "#888",
                    textDecoration: "underline",
                    fontSize: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  أعد إرسال الرمز
                </button>
              </div>
            </div>
          )}

          {/* ── المرحلة 3: كلمة سر جديدة ── */}
          {stage === 3 && (
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "1.5rem" }}>
                أدخل كلمة السر الجديدة
              </h3>

              <PasswordInput
                label="كلمة السر الجديدة"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError("");
                }}
                placeholder="كلمة السر الجديدة"
                showStrengthMeter={true}
              />

              {error && (
                <p style={{ color: "#ef4444", fontSize: "13px", margin: "10px 0" }}>
                  {error}
                </p>
              )}

              <div style={{ marginTop: "1.5rem" }}>
                <PrimaryButton onClick={handleResetPassword} loading={loading}>
                  تغيير كلمة السر
                </PrimaryButton>
              </div>
            </div>
          )}

          {/* ── المرحلة 4: نجاح ── */}
          {stage === 4 && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ fontSize: "60px", marginBottom: "20px" }}>✅</div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "10px", color: "#00a651" }}>
                تم تغيير كلمة السر بنجاح!
              </h3>
              <p style={{ color: "#666", marginBottom: "30px" }}>
                يمكنك الآن تسجيل الدخول بكلمة السر الجديدة
              </p>
              <PrimaryButton onClick={() => navigate("/login")}>
                تسجيل الدخول
              </PrimaryButton>
            </div>
          )}

        </AuthCard>
      </AuthLayout>
    </div>
  );
};

export default ForgotPasswordPage;