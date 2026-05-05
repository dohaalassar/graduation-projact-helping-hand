import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import logo from "../../assets/logo.jpg";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* Contact Info (Leftmost) */}
        <div className="footer-section">
          <h4>تواصل معنا</h4>
          <ul className="footer-contact-list">
            <li>
              <span>0596548722</span> <Phone size={16} />
            </li>
            <li>
              <span>helpinghand@gmail.com</span> <Mail size={16} />
            </li>
          </ul>
        </div>

        {/* Links Info (Middle-Left) */}
        <div className="footer-section">
          <h4>روابط مهمة</h4>
          <ul className="footer-links-list">
            <li><Link to="/">الرئيسية</Link></li>
            <li><Link to="/parent/dashboard">أنا</Link></li>
            <li><Link to="/parent/children">أبنائي</Link></li>
            <li><Link to="/about">من نحن</Link></li>
            <li><Link to="/contact">تواصل معنا</Link></li>
          </ul>
        </div>

        {/* About Text (Middle-Right) */}
        <div className="footer-section footer-about-text">
          <h4>يداً بيد</h4>
          <p>
            منصة رقمية تساعد أولياء الأمور والأخصائيين النفسيين على متابعة حالة الأطفال النفسية في قطاع غزة.
          </p>
        </div>

        {/* Logo Card (Rightmost) */}
        <div className="footer-section footer-logo-section">
          <div className="footer-logo-card">
            <img src={logo} alt="Helping Hand" className="footer-logo-img" />
          </div>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>© 2026 جميع الحقوق محفوظة - HelpingHand</p>
        <p className="footer-disclaimer">
          هذا النظام لا يستبدل الأخصائيين، بل يساعد في تعزيز الوصول للحالات النفسية
        </p>
      </div>
    </footer>
  );
};

export default Footer;
