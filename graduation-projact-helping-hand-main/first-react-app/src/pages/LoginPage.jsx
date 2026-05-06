import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import TextInput from "../components/auth/TextInput";
import PasswordInput from "../components/auth/PasswordInput";
import PrimaryButton from "../components/auth/PrimaryButton";
import SecondaryButton from "../components/auth/SecondaryButton";
import RoleSelectionModal from "../components/modal/RoleSelectionModal";
import { useFormState } from "../hooks/useFormState";
import { isRequired, isValidEmailOrPhone } from "../utils/validation";
import { loginUser } from "../services/authService";
// import "../styles/loginpage.css";

const initialValues = {
  emailOrPhone: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    values,
    errors,
    setErrors,
    loading,
    setLoading,
    serverError,
    setServerError,
    handleChange,
  } = useFormState(initialValues);

  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const newErrors = {};
    if (!isRequired(values.emailOrPhone)) {
      newErrors.emailOrPhone = "هذا الحقل مطلوب";
    } else if (!isValidEmailOrPhone(values.emailOrPhone)) {
      newErrors.emailOrPhone = "يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح";
    }
    if (!isRequired(values.password)) {
      newErrors.password = "هذا الحقل مطلوب";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(values);
      if (response.role === "parent") {
        navigate("/parent/dashboard");
      } else {
        navigate("/psychologist/dashboard");
      }
    } catch (error) {
      setServerError(error.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="card-content">
          <h2 className="auth-card-title">أهلاً بعودتك مرة أخرى ! سجل الدخول الى حسابك.</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <TextInput
              label="البريد الإلكتروني"
              name="emailOrPhone"
              value={values.emailOrPhone}
              onChange={handleChange}
              error={errors.emailOrPhone}
              placeholder="البريد الإلكتروني (مثال: example@gmail.com)"
              icon={<Mail size={18} />}
            />
            <PasswordInput
              label="كلمة السر"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="كلمة السر"
            />
            <div className="forgot-password">
              <button type="button" className="btn-link">نسيت كلمة المرور؟ اضغط هنا</button>
            </div>

            {serverError && <p className="server-error">{serverError}</p>}

            <div className="login-buttons">
              <PrimaryButton type="submit" loading={loading}>
                تسجيل الدخول
              </PrimaryButton>
              <SecondaryButton type="button" onClick={() => setModalOpen(true)}>
                ليس لدي حساب
              </SecondaryButton>
            </div>
          </form>
        </div>
      </AuthCard>
      <RoleSelectionModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AuthLayout>
  );
};

export default LoginPage;