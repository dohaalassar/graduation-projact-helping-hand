// import React from "react";
// import { Camera } from "lucide-react";

// const ProfileSection = ({ name, email, imageUrl }) => {
//   const hasImage = !!imageUrl;

//   return (
//     <div className="profile-section">
//       <div className="profile-avatar">
//         {hasImage ? (
//           <img src={imageUrl} alt={name} className="profile-avatar-image" />
//         ) : (
//           <Camera size={40} className="profile-avatar-icon" />
//         )}
//       </div>

//       <h1 className="profile-name">{name}</h1>
//       <p className="profile-email">{email}</p>
//     </div>
//   );
// };

// export default ProfileSection;
import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";

const ProfileSection = ({ name, email, imageUrl, onImageChange }) => {
  const fileInputRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const newImageUrl = URL.createObjectURL(file);
    setImageError(false);
    onImageChange(newImageUrl);
  };

  const showImage = imageUrl && !imageError;

  return (
    <div className="profile-section">
      <div
        className="profile-avatar clickable-avatar"
        onClick={handleAvatarClick}
        title="اختر صورة من الجهاز"
      >
        {showImage ? (
          <img
            src={imageUrl}
            alt={name}
            className="profile-avatar-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <Camera size={40} className="profile-avatar-icon" />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="profile-file-input"
        onChange={handleFileChange}
      />

      <h1 className="profile-name">{name}</h1>
      <p className="profile-email">{email}</p>
    </div>
  );
};

export default ProfileSection;