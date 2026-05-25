import { useRef } from "react";
import { Camera, Trash2 } from "lucide-react";
import "../../styles/ParentProfileSection.css";

export default function ParentProfileSection({ parent, onAvatarChange }) {
  const fileInputRef = useRef(null);

  const initials = (parent?.name || "?")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      const previewUrl = URL.createObjectURL(file);
      onAvatarChange(previewUrl);
    }
    e.target.value = ""; // Reset value so the change event fires again even if same file is selected
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent triggering file selector
    if (onAvatarChange) {
      onAvatarChange("");
    }
  };

  return (
    <section className="pd-profile">
      <div className="pd-avatar-container">
        <div className="pd-profile-avatar" onClick={handleAvatarClick} title="تغيير الصورة الشخصية">
          {parent?.avatar ? (
            <img src={parent.avatar} alt={parent.name} />
          ) : (
            <span>{initials}</span>
          )}
          <div className="pd-avatar-overlay">
            <Camera size={20} />
            <span className="pd-avatar-overlay-text">تغيير الصورة</span>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />

        <div className="pd-avatar-camera-badge">
          <Camera size={14} />
        </div>

        {parent?.avatar && (
          <button
            type="button"
            className="pd-avatar-delete-btn"
            onClick={handleDeleteClick}
            title="حذف الصورة"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <h2 className="pd-profile-name">{parent?.name}</h2>
      {parent?.email && <p className="pd-profile-email">{parent.email}</p>}
    </section>
  );
}
