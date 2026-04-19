import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, User, CalendarDays, ChevronDown, CreditCard } from "lucide-react";

import Header from "../components/layout/Header";
import FooterNote from "../components/auth/FooterNote";

import "../styles/addchildpage.css";

const AddChildPage = () => {
  const navigate = useNavigate();

  const [childName, setChildName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [childImage, setChildImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setChildImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChild = async (e) => {
    e.preventDefault();

    setLoading(true);
    setServerError(null);

    try {
      console.log("Child data:", {
        childName,
        birthDate,
        gender,
        nationalId,
        childImage,
      });

      navigate("/parent/dashboard");
    } catch (error) {
      setServerError("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/parent/dashboard");
  };

  return (
    <div className="add-child-page">
      <Header activeLink="children" />

      <div className="add-child-main">
        <h1 className="add-child-title">
          لإضافة ابنك، قم بتعبئة بيانات طفلك الآتية :
        </h1>

        <div className="add-child-card">
          <form onSubmit={handleSaveChild} className="add-child-form">
            <div className="add-child-field">
              <label className="add-child-label">الاسم</label>
              <div className="add-child-input-wrap">
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="مثال: محمد علي"
                  className="add-child-input"
                />
                <User className="add-child-input-icon" size={18} />
              </div>
            </div>

            <div className="add-child-field">
              <label className="add-child-label">تاريخ الميلاد</label>
              <div className="add-child-input-wrap">
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="add-child-input"
                />
                <CalendarDays className="add-child-input-icon" size={18} />
              </div>
            </div>

            <div className="add-child-field">
              <label className="add-child-label">الجنس</label>
              <div className="add-child-input-wrap">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="add-child-select"
                >
                  <option value="" disabled>
                    انقر للاختيار
                  </option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
                <ChevronDown className="add-child-input-icon" size={18} />
              </div>
            </div>

            <div className="add-child-field">
              <label className="add-child-label">رقم الهوية</label>
              <div className="add-child-input-wrap">
                <input
                  type="text"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  placeholder="مثال: 404284872"
                  className="add-child-input"
                />
                <CreditCard className="add-child-input-icon" size={18} />
              </div>
            </div>

            <div className="add-child-upload-wrap">
              <label className="add-child-upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="add-child-file-input"
                />

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="صورة الطفل"
                    className="add-child-preview-image"
                  />
                ) : (
                  <div className="add-child-upload-placeholder">
                    <div className="add-child-upload-icon-circle">
                      <Camera size={30} />
                    </div>
                    <span className="add-child-upload-text">
                      أضف صورة شخصية لطفلك
                    </span>
                  </div>
                )}
              </label>
            </div>

            {serverError && (
              <div className="add-child-server-error">{serverError}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="add-child-save-btn"
            >
              {loading ? "جاري الحفظ..." : "حفظ"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="add-child-cancel-btn"
            >
              إلغاء
            </button>
          </form>
        </div>

        <div className="add-child-footer-wrap">
          <FooterNote />
        </div>
      </div>
    </div>
  );
};

export default AddChildPage;