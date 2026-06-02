import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import TextInput from "../components/auth/TextInput";
import PrimaryButton from "../components/auth/PrimaryButton";
import "../styles/authlayout.css";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  
  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleCodeKeyDown = (index, e) => {
    // Handle backspace to focus previous input
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="auth-page-container">
      <AuthLayout>
        <AuthCard showBack fallbackPath="/login">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "1rem" }}>
              قم بادخال البريد الالكتروني المستخدم عند التسجيل
            </h3>
            <p style={{ fontSize: "12px", color: "#666", textAlign: "right", marginBottom: "5px" }}>البريد الالكتروني</p>
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="helpinghand2026@gmail.com"
              showIcon
              icon={<Mail size={16} />}
              style={{ textAlign: "left", direction: "ltr" }}
            />
            <p style={{ fontSize: "11px", color: "#888", textAlign: "right", marginTop: "5px" }}>
              سيصلك رمز التحقق على بريدك الالكتروني الذي قمت بادخاله
            </p>
            
            <div style={{ marginTop: "1rem" }}>
              <PrimaryButton onClick={() => {}}>أرسل الرمز</PrimaryButton>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "1rem" }}>
              أدخل رمز التحقق المكون من 6 أرقام
            </h3>
            
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
                  }}
                />
              ))}
            </div>

            <PrimaryButton onClick={() => {}}>تحقق</PrimaryButton>
            
            <div style={{ marginTop: "15px", textAlign: "left" }}>
              <button 
                className="btn-link" 
                style={{ color: "#888", textDecoration: "underline", fontSize: "12px" }}
              >
                أعد ارسال الرمز
              </button>
            </div>
          </div>
        </AuthCard>
      </AuthLayout>
    </div>
  );
};

export default ForgotPasswordPage;
