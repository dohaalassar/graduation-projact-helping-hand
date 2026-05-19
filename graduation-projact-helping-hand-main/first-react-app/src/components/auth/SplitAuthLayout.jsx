import React from 'react';
import Header from '../layout/Header';
import FooterNote from './FooterNote';
import '../../styles/splitauth.css';
import bgImg from '../../assets/BackG.jpg';

const defaultOverlayTitle = "مرحباً بك في يداً بيد";
const defaultOverlaySubtitle = "نحن هنا لدعم طفلك ومساعدتك في كل خطوة نحو بناء بيئة صحية وآمنة للنمو والتطور.";

const SplitAuthLayout = ({ children, illustration = bgImg, title = defaultOverlayTitle, subtitle = defaultOverlaySubtitle }) => {
  return (
    <div className="split-auth-page">
      <Header />
      <main className="split-auth-main">
        <div className="split-auth-container">
          
          {/* Right Side: Form (RTL Start) */}
          <div className="split-auth-form-side">
            <div className="split-auth-form-card">
              <div className="split-auth-form-wrapper">
                {children}
              </div>
            </div>
          </div>

          {/* Left Side: Illustration */}
          <div className="split-auth-image-side">
            <div className="split-auth-image-wrapper">
              <img src={illustration} alt="Auth Illustration" className="split-auth-image" />
              <div className="split-auth-overlay">
                <div className="split-auth-overlay-content">
                  {title && <h2 className="split-auth-title">{title}</h2>}
                  {subtitle && <p className="split-auth-subtitle">{subtitle}</p>}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <div className="split-auth-footer-wrap">
        <FooterNote />
      </div>
    </div>
  );
};

export default SplitAuthLayout;
