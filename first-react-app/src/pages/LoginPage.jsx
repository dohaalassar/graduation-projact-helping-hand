import { useState } from "react";
import { Mail } from "lucide-react";
import "../styles/loginpage.css";

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

const initialValues = {
  emailOrPhone: "",
  password: "",
};

const LoginPage = () => {
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

  const validate = () => {
    const newErrors = {};
    newErrors.emailOrPhone = isValidEmailOrPhone(values.emailOrPhone);
    newErrors.password = isRequired(values.password);
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setServerError(null);

    try {
      const response = await loginUser({
        emailOrPhone: values.emailOrPhone,
        password: values.password,
      });

      if (!response.success) {
        setServerError(response.message || "حدث خطأ أثناء تسجيل الدخول");
      }
    } catch (error) {
      setServerError("حدث خطأ في الاتصال، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <AuthLayout>
        <AuthCard title="أهلاً بعودتك مرة أخرى ، سجل الدخول الى حسابك." showBack
  fallbackPath="/" >
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <TextInput
              label="رقم الهاتف المحمول أو البريد الإلكتروني"
              value={values.emailOrPhone}
              onChange={handleChange("emailOrPhone")}
              error={errors.emailOrPhone}
              placeholder="helpinghand2026@gmail.com"
              autoComplete="username"
              showIcon
              icon={<Mail size={16} />}
            />

            <PasswordInput
              label="كلمة السر"
              value={values.password}
              onChange={handleChange("password")}
              error={errors.password}
              placeholder="كلمة السر"
              autoComplete="current-password"
            />

            <button type="button" className="forgot-password-btn">
              نسيت كلمة المرور؟ <span>اضغط هنا</span>
            </button>

            {serverError && <div className="server-error-box">{serverError}</div>}

            <div className="buttons-group">
              <PrimaryButton type="submit" loading={loading}>
                تسجيل الدخول
              </PrimaryButton>

              <SecondaryButton type="button" onClick={() => setModalOpen(true)}>
                ليس لدي حساب
              </SecondaryButton>
            </div>
          </form>
        </AuthCard>

        <RoleSelectionModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </AuthLayout>
    </div>
  );
};

export default LoginPage;
// import { useState } from "react";
// import "../styles/loginpage.css";
// import AuthLayout from "../components/auth/AuthLayout";
// import AuthCard from "../components/auth/AuthCard";
// import TextInput from "../components/auth/TextInput";
// import PasswordInput from "../components/auth/PasswordInput";
// import PrimaryButton from "../components/auth/PrimaryButton";
// import SecondaryButton from "../components/auth/SecondaryButton";
// import RoleSelectionModal from "../components/modal/RoleSelectionModal";
// import { useFormState } from "../hooks/useFormState";
// import { isRequired, isValidEmailOrPhone } from "../utils/validation";
// import { loginUser } from "../services/authService";

// const initialValues = {
//   emailOrPhone: "",
//   password: "",
// };

// const LoginPage = () => {
//   const {
//     values,
//     errors,
//     setErrors,
//     loading,
//     setLoading,
//     serverError,
//     setServerError,
//     handleChange,
//   } = useFormState(initialValues);

//   const [modalOpen, setModalOpen] = useState(false);

//   const validate = () => {
//     const newErrors = {};
//     newErrors.emailOrPhone = isValidEmailOrPhone(values.emailOrPhone);
//     newErrors.password = isRequired(values.password);
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(Boolean);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     setServerError(null);

//     try {
//       const response = await loginUser({
//         emailOrPhone: values.emailOrPhone,
//         password: values.password,
//       });

//       if (!response.success) {
//         setServerError(response.message || "حدث خطأ أثناء تسجيل الدخول");
//       }
//     } catch {
//       setServerError("حدث خطأ في الاتصال، حاول مرة أخرى");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       <AuthCard title="أهلاً بعودتك مرة أخرى، سجل الدخول إلى حسابك.">
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
//           <TextInput
//             label="رقم الهاتف المحمول أو البريد الإلكتروني"
//             value={values.emailOrPhone}
//             onChange={handleChange("emailOrPhone")}
//             error={errors.emailOrPhone}
//             placeholder="أدخل رقم الهاتف أو البريد الإلكتروني"
//             autoComplete="username"
//           />

//           <PasswordInput
//             label="كلمة السر"
//             value={values.password}
//             onChange={handleChange("password")}
//             error={errors.password}
//             placeholder="أدخل كلمة السر"
//             autoComplete="current-password"
//           />

//           <button
//             type="button"
//             className="text-sm text-auth-link hover:underline text-right self-start"
//           >
//             نسيت كلمة المرور؟ اضغط هنا
//           </button>

//           {serverError && (
//             <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 text-center">
//               {serverError}
//             </div>
//           )}

//           <div className="flex flex-col gap-3 mt-2">
//             <PrimaryButton type="submit" loading={loading}>
//               تسجيل الدخول
//             </PrimaryButton>

//             <SecondaryButton type="button" onClick={() => setModalOpen(true)}>
//               ليس لدي حساب
//             </SecondaryButton>
//           </div>
//         </form>
//       </AuthCard>

//       <RoleSelectionModal open={modalOpen} onClose={() => setModalOpen(false)} />
//     </AuthLayout>
//   );
// };

// export default LoginPage;