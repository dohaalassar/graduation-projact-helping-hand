import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { MapPin, Mail, Phone, Clock, X } from 'lucide-react';
import '../index.css';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim())    newErrors.name    = 'الاسم مطلوب';
    if (!formData.email.trim())   newErrors.email   = 'البريد الإلكتروني مطلوب';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    if (!formData.subject.trim()) newErrors.subject = 'عنوان الموضوع مطلوب';
    if (!formData.message.trim()) newErrors.message = 'الرسالة مطلوبة';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    // محاكاة الإرسال
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const inputStyle = (field) => ({
    width: '100%',
    height: '45px',
    borderRadius: '10px',
    border: errors[field] ? '1px solid #ef4444' : '1px solid #ccc',
    padding: '0 15px',
    fontSize: '1rem',
    fontFamily: 'Cairo, sans-serif',
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-light-blue)' }}>
      <Header />

      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ textAlign: 'center', color: '#000', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '50px' }}>
          لأننا نحب أن نسمع منك
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'space-between', marginBottom: '60px' }}>

          {/* ── معلومات التواصل ── */}
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '30px', color: '#000' }}>
              تواصل معنا
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', fontSize: '1.2rem', color: '#000' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <MapPin size={24} style={{ marginTop: '5px' }} />
                <div>
                  <div style={{ fontWeight: 'bold' }}>موقعنا</div>
                  <div>غزة، فلسطين</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <Mail size={24} style={{ marginTop: '5px' }} />
                <div>
                  <div style={{ fontWeight: 'bold' }}>البريد الإلكتروني</div>
                  <div>helpinghand@gmail.com</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <Phone size={24} style={{ marginTop: '5px' }} />
                <div>
                  <div style={{ fontWeight: 'bold' }}>جوال</div>
                  <div style={{ direction: 'ltr', textAlign: 'right' }}>+970596548722</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <Clock size={24} style={{ marginTop: '5px' }} />
                <div>
                  <div style={{ fontWeight: 'bold' }}>ساعات العمل</div>
                  <div>الأحد - الخميس &nbsp; 8ص - 5م</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── نموذج التواصل ── */}
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '30px', color: '#000' }}>
              أرسل رسالة
            </h2>

            {/* رسالة النجاح */}
            {success && (
              <div style={{
                backgroundColor: '#d1fae5',
                border: '1px solid #00a651',
                borderRadius: '10px',
                padding: '15px 20px',
                marginBottom: '20px',
                color: '#065f46',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
                ✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* الاسم */}
              <div>
                <label style={{ display: 'block', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 'bold', color: '#000' }}>
                  الاسم كامل
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle('name')}
                />
                {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
              </div>

              {/* البريد */}
              <div>
                <label style={{ display: 'block', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 'bold', color: '#000' }}>
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle('email')}
                />
                {errors.email && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
              </div>

              {/* الموضوع */}
              <div>
                <label style={{ display: 'block', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 'bold', color: '#000' }}>
                  عنوان الموضوع
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={inputStyle('subject')}
                />
                {errors.subject && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.subject}</p>}
              </div>

              {/* الرسالة */}
              <div>
                <label style={{ display: 'block', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 'bold', color: '#000' }}>
                  الرسالة
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    height: '150px',
                    borderRadius: '10px',
                    border: errors.message ? '1px solid #ef4444' : '1px solid #ccc',
                    padding: '15px',
                    fontSize: '1rem',
                    resize: 'vertical',
                    fontFamily: 'Cairo, sans-serif',
                  }}
                />
                {errors.message && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.message}</p>}
              </div>

              <button
                type="button"
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading}
                style={{ alignSelf: 'flex-start', padding: '10px 40px', fontSize: '1.1rem' }}
              >
                {loading ? 'جاري الإرسال...' : 'إرسال'}
              </button>

            </div>
          </div>

        </div>

        {/* ── السوشيال ميديا ── */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px', color: '#000' }}>
            للمزيد تابعنا عبر منصاتنا الحالية
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#000', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#4267B2', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ContactUsPage;