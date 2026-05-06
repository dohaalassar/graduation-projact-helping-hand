import React from "react";
import FooterNote from "../auth/FooterNote";
import logo from "../../assets/logo.jpg";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="site-footer" dir="rtl">
      <div className="footer-top-line" />

      <div className="footer-inner">
        <div className="footer-grid">
          {/* Logo (rightmost in RTL) */}
          <div className="footer-col footer-col-logo">
            <img src={logo} alt="يدًا بيد" className="footer-logo-img" />
          </div>

          {/* Brand / Description */}
          <div className="footer-col footer-col-brand">
            <h3 className="footer-heading">يدًا بيد</h3>
            <p className="footer-description">
              منصة رقمية تساعد أولياء الأمور والأخصائيين
              <br />
              النفسيين على متابعة حالة الأطفال النفسية
              <br />
              في قطاع غزة.
            </p>
          </div>

          {/* Important Links */}
          <div className="footer-col footer-col-links">
            <h3 className="footer-heading">روابط مهمة</h3>
            <ul className="footer-list footer-list-plain">
              <li><a href="/">الرئيسية</a></li>
              <li><a href="/me">أنا</a></li>
              <li><a href="/my-child">أبنائي</a></li>
              <li><a href="/about">من نحن</a></li>
              <li><a href="/contact">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col footer-col-contact">
            <h3 className="footer-heading">تواصل معنا</h3>
            <ul className="footer-list">
              <li>
                <span className="footer-text">0596548722</span>
                <span className="footer-icon" aria-hidden="true">📞</span>
              </li>
              <li>
                <span className="footer-text">helpinghand@gmail.com</span>
                <span className="footer-icon" aria-hidden="true">✉️</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <FooterNote />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
