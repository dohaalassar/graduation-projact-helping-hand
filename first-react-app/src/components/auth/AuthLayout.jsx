// import LogoBanner from "./LogoBanner";
// import FooterNote from "./FooterNote";

// const AuthLayout = ({ children }) => {
//   return (
//     <div className="auth-bg relative overflow-hidden">
//       <LogoBanner />
//       <div className="w-full flex flex-col items-center justify-center min-h-screen py-16 px-4">
//         {children}
//         <FooterNote />
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;
import LogoBanner from "./LogoBanner";
import FooterNote from "./FooterNote";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-bg">
      <LogoBanner />

      <div className="auth-page-content">
        {children}
        <FooterNote />
      </div>
    </div>
  );
};

export default AuthLayout;