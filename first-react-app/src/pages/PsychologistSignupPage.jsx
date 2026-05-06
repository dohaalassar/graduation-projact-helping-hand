import { useNavigate } from "react-router-dom";
import { IdCard, Phone } from "lucide-react";
import "../styles/psychologistsignup.css";

import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import TextInput from "../components/auth/TextInput";
import PasswordInput from "../components/auth/PasswordInput";
import SelectInput from "../components/auth/SelectInput";
import PrimaryButton from "../components/auth/PrimaryButton";
import SecondaryButton from "../components/auth/SecondaryButton";
import FormRow from "../components/auth/FormRow";

import { useFormState } from "../hooks/useFormState";
import { isRequired,isValidEmailOrPhone,isValidPassword,isValidEmployeeId,} from "../utils/validation";
import { dayOptions, monthOptions, yearOptions, genderOptions } from "../utils/dateOptions";

const initialValues = {
  firstName: "",
  lastName: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
  gender: "",
  employeeId: "",
  emailOrPhone: "",
  password: "",
};

const PsychologistSignupPage = () => {
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

  const validate = () => {
    const newErrors = {};
    newErrors.firstName = isRequired(values.firstName);
    newErrors.lastName = isRequired(values.lastName);
    newErrors.birthDay = isRequired(values.birthDay);
    newErrors.birthMonth = isRequired(values.birthMonth);
    newErrors.birthYear = isRequired(values.birthYear);
    newErrors.gender = isRequired(values.gender);
    newErrors.employeeId = isValidEmployeeId(values.employeeId);
    newErrors.emailOrPhone = isValidEmailOrPhone(values.emailOrPhone);
    newErrors.password = isValidPassword(values.password);

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError(null);

    try {
      console.log("Psychologist Signup Data:", values);
    } catch (error) {
      setServerError("حدث خطأ في الاتصال، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="psychologist-signup-page">
      <AuthLayout>
        <AuthCard
          title="أنشئ حسابك وساهم في مشروع تحسين الوصول لحالات الأطفال النفسية"
          showBack
          fallbackPath="/"
        >
          <form onSubmit={handleSubmit} className="psychologist-signup-form" noValidate>
            <div className="section-title">الاسم</div>

            <FormRow columns={2}>
              <TextInput
                label=""
                value={values.firstName}
                onChange={handleChange("firstName")}
                error={errors.firstName}
                placeholder="الاسم الأول"
                showIcon={false}
              />

              <TextInput
                label=""
                value={values.lastName}
                onChange={handleChange("lastName")}
                error={errors.lastName}
                placeholder="اسم العائلة"
                showIcon={false}
              />
            </FormRow>

            <div className="section-title">تاريخ الميلاد</div>

            <FormRow columns={3}>
              <SelectInput
                options={dayOptions}
                placeholder="اليوم"
                value={values.birthDay}
                onChange={handleChange("birthDay")}
                error={errors.birthDay}
              />

              <SelectInput
                options={monthOptions}
                placeholder="الشهر"
                value={values.birthMonth}
                onChange={handleChange("birthMonth")}
                error={errors.birthMonth}
              />

              <SelectInput
                options={yearOptions}
                placeholder="السنة"
                value={values.birthYear}
                onChange={handleChange("birthYear")}
                error={errors.birthYear}
              />
            </FormRow>

            <SelectInput
              label="الجنس"
              options={genderOptions}
              placeholder="تحديد الجنس"
              value={values.gender}
              onChange={handleChange("gender")}
              error={errors.gender}
            />

            <TextInput
              label="الرقم الوظيفي"
              value={values.employeeId}
              onChange={handleChange("employeeId")}
              error={errors.employeeId}
              placeholder="رقم الهوية المكون من 9 أرقام"
              showIcon
              icon={<IdCard size={16} />}
            />

            <TextInput
              label="رقم الهاتف المحمول أو البريد الإلكتروني"
              value={values.emailOrPhone}
              onChange={handleChange("emailOrPhone")}
              error={errors.emailOrPhone}
              placeholder="رقم الهاتف المحمول أو البريد الإلكتروني"
              showIcon
              icon={<Phone size={16} />}
            />

            <PasswordInput
              label="كلمة السر"
              value={values.password}
              onChange={handleChange("password")}
              error={errors.password}
              placeholder="كلمة السر"
              hint="أدخل تركيبة تتكون على الأقل من ستة أرقام وأحرف وعلامات ترقيم"
              autoComplete="new-password"
            />

            {serverError && <div className="server-error-box">{serverError}</div>}

            <div className="buttons-group">
              <PrimaryButton type="submit" loading={loading}>
                إرسال
              </PrimaryButton>

              <SecondaryButton type="button" onClick={() => navigate("/")}>
                لدي حساب بالفعل
              </SecondaryButton>
            </div>
          </form>
        </AuthCard>
      </AuthLayout>
    </div>
  );
};

export default PsychologistSignupPage;