import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import whoImage from '../assets/who.png';
import { Shield, Target, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // ← جديد

const AboutUsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ← جديد

  // زر "انضم إلينا" — إذا مسجل دخول روح للـ dashboard، وإلا للـ login
  const handleJoin = () => {
    if (user) {
      if (user.role === 'parent') {
        navigate('/parent/dashboard');
      } else if (user.role === 'psychologist') {
        navigate('/psychologist/dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  const Card = ({ text, icon }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '25px 15px',
      textAlign: 'center',
      border: '1.5px solid #a6ccee',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '110px',
      flex: '1',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      color: '#000',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      {text}
      {icon && <div style={{ marginTop: '15px', color: '#1098f7' }}>{icon}</div>}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-light-blue)' }}>
      <Header />

      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', width: '100%', color: '#000' }}>

        {/* ── من نحن ── */}
        <section style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>من نحن</h1>
          <p style={{ fontSize: '1.3rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', fontWeight: '600' }}>
            مبادرة رقمية شبابية تسعى من خلالها لتقريب المسافات بين الطفل المحتاج لرعاية نفسية والأخصائي النفسي في قطاع غزة، سعياً نحو طمأنينة الأسرة والمجتمع
          </p>
        </section>

        {/* ── قصتنا ── */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px', textAlign: 'right' }}>قصتنا</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px', fontSize: '1.25rem', lineHeight: '1.9', fontWeight: '600' }}>
              بدأنا بهدف مساعدة أولياء الأمور والاطمئنان على صحة أطفالهم النفسية ومساعدة الأخصائيين النفسيين على الوصول لأكبر عدد من الحالات خصوصاً المحتاجة لتدخل طارئ بعد الحرب على قطاع غزة
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <img src={whoImage} alt="قصتنا" style={{ width: '100%', borderRadius: '15px', objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        {/* ── ماذا نقدم ── */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px', textAlign: 'right' }}>ماذا نقدم؟</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Card text="الأمان لبياناتك وبيانات طفلك" />
            <Card text="متابعة أولية للحالات الحرجة" />
            <Card text="قياس لمدى صحة طفلك النفسية" />
          </div>
        </section>

        {/* ── كيف نقيس ── */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px', textAlign: 'right' }}>كيف نقيس صحة طفلك النفسية؟</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Card text="نموذج تقييم نقاط القوة والصعوبات SDQ" />
            <Card text="ألعاب مصممة لفحص صحة طفلك النفسية" />
            <Card text="متابعة الأخصائي النفسي للحالات بحسب الأولوية" />
          </div>
        </section>

        {/* ── ماذا تقيس الألعاب ── */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px', textAlign: 'right' }}>ماذا تقيس الألعاب؟</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <Card text="المشاعر" />
            <Card text="مشاكل السلوك" />
            <Card text="فرط النشاط ونقص الانتباه" />
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', width: '66%', margin: '0 auto' }}>
            <Card text="العلاقة بالأقران" />
            <Card text="السلوك الاجتماعي الإيجابي" />
          </div>
        </section>

        {/* ── قيمنا ── */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px', textAlign: 'right' }}>قيمنا</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Card text="الأمانة"        icon={<Shield size={28} />} />
            <Card text="سهولة الوصول"  icon={<Target size={28} />} />
            <Card text="الثقة"          icon={<Award  size={28} />} />
          </div>
        </section>

        {/* ── نؤكد على ── */}
        <section style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'right' }}>نؤكد على</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', fontWeight: '600', marginBottom: '10px', textAlign: 'right' }}>
            الاطمئنان على صحة طفلك النفسية من خلال موقعنا لا يغني عن الحاجة لزيارة الطبيب أو الأخصائي النفسي. نحن لا نقدم بديلاً بل نعزز إيجاد حل أكثر سهولة للوصول إليه في ظل الظروف الراهنة
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'right', marginBottom: '40px' }}>
            دمتم بخير ❤️
          </p>

          <button
            className="btn-success"
            style={{ padding: '15px 60px', fontSize: '1.3rem', borderRadius: '30px' }}
            onClick={handleJoin}
          >
            {user ? 'لوحة التحكم' : 'انضم إلينا'}
          </button>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;