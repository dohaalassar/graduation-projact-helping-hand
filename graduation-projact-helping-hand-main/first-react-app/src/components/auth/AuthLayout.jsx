import Header from "../layout/Header";
import FooterNote from "./FooterNote";
import "../../styles/authlayout.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-bg">
      <Header />
    

      <div className="auth-page-content">
        {children}
        <FooterNote />
      </div>
    </div>
  );
};

export default AuthLayout;