import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import "../../styles/header.css";

const navLinks = [
  { label: "تواصل معنا", path: "/contact" },
  { label: "من نحن", path: "/about" },
  { label: "أبنائي", path: "/parent/children" },
  { label: "أنا", path: "/parent/dashboard" },
  { label: "الرئيسية", path: "/" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-blue-bar">
        <div className="header-container">
          
          <div className="header-logo-wrapper">
            <Link to="/">
              <div className="logo-box">
                <img src={logo} alt="Helping Hand" className="logo-img" />
              </div>
            </Link>
          </div>

          <nav className="desktop-nav">
            <ul className="nav-list main-links">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            
            <div className="auth-links">
              <Link to="/login" className="nav-link login-link">تسجيل الدخول</Link>
              <Link to="/signup/parent" className="nav-link signup-btn">انشاء حساب</Link>
            </div>
          </nav>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav-overlay">
          <ul className="mobile-nav-list">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                تسجيل الدخول
              </Link>
            </li>
            <li>
              <Link to="/signup/parent" className="mobile-nav-link signup-mobile" onClick={() => setMobileOpen(false)}>
                انشاء حساب
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
