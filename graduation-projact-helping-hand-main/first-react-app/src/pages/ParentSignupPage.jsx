import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import TextInput from "../components/auth/TextInput";
import PasswordInput from "../components/auth/PasswordInput";
import SelectInput from "../components/auth/SelectInput";
import PrimaryButton from "../components/auth/PrimaryButton";
import SecondaryButton from "../components/auth/SecondaryButton";
import FormRow from "../components/auth/FormRow";
import { dayOptions, monthOptions, yearOptions, genderOptions } from "../utils/dateOptions";
import { isValidEmailOrPhone, isValidPassword } from "../utils/validation";
import { IdCard, Phone } from "lucide-react";
// import "../styles/parentsignup.css";

const ParentSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
    nationalId: "",
    emailOrPhone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "هذا الحقل مطلوب";
    if (!formData.lastName.trim()) newErrors.lastName = "هذا الحقل مطلوب";
    if (!formData.birthDay) newErrors.birthDay = "هذا الحقل مطلوب";
    if (!formData.birthMonth) newErrors.birthMonth = "هذا الحقل مطلوب";
    if (!formData.birthYear) newErrors.birthYear = "هذا الحقل مطلوب";
    if (!formData.gender) newErrors.gender = "هذا الحقل مطلوب";
    if (!formData.nationalId.trim()) newErrors.nationalId = "هذا الحقل مطلوب";
    
    // Use validation functions
    const emailError = isValidEmailOrPhone(formData.emailOrPhone);
    if (emailError) newErrors.emailOrPhone = emailError;
    
    const passError = isValidPassword(formData.password);
    if (passError) newErrors.password = passError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Parent Signup Data:", formData);
  };

  return (
    <div className="parent-signup-page">
      <AuthLayout>
        <AuthCard title="انشىء حسابك وابدأ رحلتك لمعرفة صحة طفلك النفسية" showBack fallbackPath="/">
          <form onSubmit={handleSubmit} className="parent-signup-form" noValidate>
            <div className="section-title">الاسم</div>
            <FormRow columns={2}>
              <TextInput placeholder="الاسم الأول" value={formData.firstName} onChange={handleChange("firstName")} error={errors.firstName} showIcon={false} />
              <TextInput placeholder="اسم العائلة" value={formData.lastName} onChange={handleChange("lastName")} error={errors.lastName} showIcon={false} />
            </FormRow>

            <div className="section-title">تاريخ الميلاد</div>
            <FormRow columns={3}>
              <SelectInput options={dayOptions} placeholder="اليوم" value={formData.birthDay} onChange={handleChange("birthDay")} error={errors.birthDay} />
              <SelectInput options={monthOptions} placeholder="الشهر" value={formData.birthMonth} onChange={handleChange("birthMonth")} error={errors.birthMonth} />
              <SelectInput options={yearOptions} placeholder="السنة" value={formData.birthYear} onChange={handleChange("birthYear")} error={errors.birthYear} />
            </FormRow>

            <SelectInput label="الجنس" options={genderOptions} placeholder="تحديد الجنس" value={formData.gender} onChange={handleChange("gender")} error={errors.gender} />

            <TextInput
              label="رقم الهوية"
              value={formData.nationalId}
              onChange={handleChange("nationalId")}
              error={errors.nationalId}
              placeholder="رقم الهوية المكون من 9 أرقام"
              showIcon
              icon={<IdCard size={16} />}
            />

            <TextInput
              label="البريد الإلكتروني"
              value={formData.emailOrPhone}
              onChange={handleChange("emailOrPhone")}
              error={errors.emailOrPhone}
              placeholder="البريد الإلكتروني"
              showIcon
              icon={<Phone size={16} />}
            />

            <PasswordInput
              label="كلمة السر"
              value={formData.password}
              onChange={handleChange("password")}
              error={errors.password}
              placeholder="كلمة السر"
              hint="أدخل تركيبة تتكون على الأقل من ستة أرقام وأحرف أبجدية وعلامات ترقيم (مثل ! و&)."
            />

            <div className="buttons-group">
              <PrimaryButton type="submit">إرسال</PrimaryButton>
              <SecondaryButton type="button" onClick={() => navigate("/login")}>
                لدي حساب بالفعل
              </SecondaryButton>
            </div>
          </form>
        </AuthCard>
      </AuthLayout>
    </div>
  );
};

export default ParentSignupPage;