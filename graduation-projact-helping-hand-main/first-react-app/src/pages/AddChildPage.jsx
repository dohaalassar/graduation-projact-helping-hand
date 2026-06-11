import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, CalendarDays, ChevronDown, CreditCard, Pencil } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { addChild } from "../services/childService";
import "../styles/addchildpage.css";

const AddChildPage = () => {
  const navigate = useNavigate();

  const [childName, setChildName]     = useState("");
  const [birthDate, setBirthDate]     = useState("");
  const [gender, setGender]           = useState("");
  const [nationalId, setNationalId]   = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading]         = useState(false);
  const [errors, setErrors]           = useState({});
  const [serverError, setServerError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ── حساب العمر من تاريخ الميلاد ──
  const calculateAge = (birthDateStr) => {
    const today = new Date();
    const birth = new Date(birthDateStr);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // ── التحقق من الحقول ──
  const validate = () => {
    const newErrors = {};

    if (!childName.trim())
      newErrors.childName = "اسم الطفل مطلوب";

    if (!birthDate)
      newErrors.birthDate = "تاريخ الميلاد مطلوب";
    else {
      const age = calculateAge(birthDate);
      if (age < 7 || age > 12)
        newErrors.birthDate = "عمر الطفل يجب أن يكون بين 7 و 12 سنة";
    }

    if (!gender)
      newErrors.gender = "الجنس مطلوب";

    return newErrors;
  };

  const handleSaveChild = async (e) => {
    e.preventDefault();
    setServerError("");

    // التحقق من الحقول
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const age = calculateAge(birthDate);

      await addChild({
        name:   childName.trim(),
        age,
        gender,
      });

      // نجح الحفظ — ارجعي للـ dashboard
      navigate("/parent/dashboard");

    } catch (error) {
      setServerError(
        error.response?.data?.message || "حدث خطأ أثناء إضافة الطفل"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-child-page">
      <Header />

      <main className="add-child-container">
        <h1 className="add-child-title">
          لإضافة ابنك، قم بتعبئة بيانات طفلك الآتية :
        </h1>

        <div className="common-card add-child-card">
          <form onSubmit={handleSaveChild} className="add-child-form">

            {/* ── الاسم ── */}
            <div className="form-field">
              <label>الاسم</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => {
                    setChildName(e.target.value);
                    setErrors((prev) => ({ ...prev, childName: "" }));
                  }}
                  placeholder="مثال: محمد علي"
                />
                <Pencil className="field-icon" size={20} />
              </div>
              {errors.childName && (
                <p className="field-error">{errors.childName}</p>
              )}
            </div>

            {/* ── تاريخ الميلاد ── */}
            <div className="form-field">
              <label>تاريخ الميلاد</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    setErrors((prev) => ({ ...prev, birthDate: "" }));
                  }}
                  placeholder="اختر التاريخ"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
                <CalendarDays className="field-icon" size={20} />
              </div>
              {errors.birthDate && (
                <p className="field-error">{errors.birthDate}</p>
              )}
            </div>

            {/* ── الجنس ── */}
            <div className="form-field">
              <label>الجنس</label>
              <div className="input-with-icon">
                <select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    setErrors((prev) => ({ ...prev, gender: "" }));
                  }}
                  className={!gender ? "placeholder-style" : ""}
                >
                  <option value="" disabled>انقر للاختيار</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
                <ChevronDown className="field-icon" size={20} />
              </div>
              {errors.gender && (
                <p className="field-error">{errors.gender}</p>
              )}
            </div>

            {/* ── رقم الهوية (اختياري) ── */}
            <div className="form-field">
              <label>رقم الهوية <span style={{color:'#999', fontSize:'13px'}}>(اختياري)</span></label>
              <div className="input-with-icon">
                <input
                  type="text"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  placeholder="مثال: 404284872"
                />
                <CreditCard className="field-icon" size={20} />
              </div>
            </div>

            {/* ── صورة الطفل ── */}
            <div className="image-upload-section">
              <label className="image-upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden-file-input"
                />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="preview-img" />
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon-circle">
                      <Camera size={40} color="#888" />
                    </div>
                    <span className="upload-text">أضف صورة شخصية لطفلك</span>
                  </div>
                )}
              </label>
            </div>

            {/* ── خطأ الـ server ── */}
            {serverError && (
              <p className="auth-server-error">{serverError}</p>
            )}

            {/* ── أزرار ── */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary full-width"
                disabled={loading}
              >
                {loading ? "جاري الحفظ..." : "حفظ"}
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => navigate("/parent/dashboard")}
              >
                إلغاء
              </button>
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddChildPage;