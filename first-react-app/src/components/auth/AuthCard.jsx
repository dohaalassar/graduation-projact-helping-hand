// import { useNavigate } from "react-router-dom";
// import { ArrowRight } from "lucide-react";

// const AuthCard = ({ children, title, showBack = false, backTo = "/" }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="auth-card animate-scale-in">
//       {showBack && (
//         <button
//           onClick={() => navigate(backTo)}
//           className="absolute top-5 left-5 w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/70 transition-colors"
//           aria-label="العودة"
//         >
//           <ArrowRight className="w-5 h-5 text-secondary-foreground" />
//         </button>
//       )}

//       <h1 className="text-lg md:text-xl font-bold text-card-foreground leading-relaxed mb-6 text-right">
//         {title}
//       </h1>

//       {children}
//     </div>
//   );
// };

// const AuthCard = ({ children, title }) => {
//   return (
//     <div className="auth-card">
//       <div className="card-arrow">›</div>
//       <h1 className="auth-card-title">{title}</h1>
//       {children}
//     </div>
//   );
// };

// export default AuthCard;
import { useNavigate } from "react-router-dom";

const AuthCard = ({
  children,
  title,
  showBack = false,
  fallbackPath = "/",
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <div className="auth-card">
      {showBack && (
        <button
          type="button"
          className="card-arrow-btn"
          onClick={handleBack}
          aria-label="الرجوع"
        >
          <span className="card-arrow">›</span>
        </button>
      )}

      <h1 className="auth-card-title">{title}</h1>
      {children}
    </div>
  );
};

export default AuthCard;
