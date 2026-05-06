import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, User, CalendarDays, ChevronDown, CreditCard, Pencil } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "../styles/addchildpage.css";

const AddChildPage = () => {
  const navigate = useNavigate();

  const [childName, setChildName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChild = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      navigate("/parent/dashboard");
    }, 1000);
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
            <div className="form-field">
              <label>الاسم</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="مثال: محمد علي"
                />
                <Pencil className="field-icon" size={20} />
              </div>
            </div>

            <div className="form-field">
              <label>تاريخ الميلاد</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="اختر التاريخ"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
                <CalendarDays className="field-icon" size={20} />
              </div>
            </div>

            <div className="form-field">
              <label>الجنس</label>
              <div className="input-with-icon">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={!gender ? "placeholder-style" : ""}
                >
                  <option value="" disabled>انقر للاختيار</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
                <ChevronDown className="field-icon" size={20} />
              </div>
            </div>

            <div className="form-field">
              <label>رقم الهوية</label>
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

            <div className="form-actions">
              <button type="submit" className="btn-primary full-width" disabled={loading}>
                {loading ? "جاري الحفظ..." : "حفظ"}
              </button>
              <button type="button" className="btn-outline" onClick={() => navigate("/parent/dashboard")}>
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