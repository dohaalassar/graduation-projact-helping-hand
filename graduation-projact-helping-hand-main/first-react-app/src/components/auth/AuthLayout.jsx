import Header from "../layout/Header";
import LogoBanner from "./LogoBanner";
import FooterNote from "./FooterNote";
import "../../styles/authlayout.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-bg">
      <Header />
      <LogoBanner />

      <div className="auth-page-content">
        {children}
        <FooterNote />
      </div>
    </div>
  );
};

export default AuthLayout;