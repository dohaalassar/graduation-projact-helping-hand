// import { Loader2 } from "lucide-react";

// const PrimaryButton = ({ children, loading, disabled, ...props }) => {
//   return (
//     <button className="auth-btn-primary" disabled={disabled || loading} {...props}>
//       {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
//     </button>
//   );
// };

// export default PrimaryButton;
const PrimaryButton = ({ children, loading, disabled, ...props }) => {
  return (
    <button
      className="auth-btn-primary"
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "جاري التحميل..." : children}
    </button>
  );
};

export default PrimaryButton;