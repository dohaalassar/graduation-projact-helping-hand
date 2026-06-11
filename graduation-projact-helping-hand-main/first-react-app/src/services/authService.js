import API from './api';

// ─────────────────────────────────────────
// تسجيل الدخول
// ─────────────────────────────────────────
export async function loginUser(data) {
  try {
    const response = await API.post('/auth/login', {
      email: data.emailOrPhone,
      password: data.password,
    });

    const { token, user } = response.data;

    // احفظي الـ token والـ user في localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return {
      success: true,
      role: user.role,
      user,
      token,
      message: 'تم تسجيل الدخول بنجاح',
    };
  } catch (error) {
    const message = error.response?.data?.message || 'حدث خطأ';

    if (message.includes('Invalid email')) {
      throw new Error('EMAIL_NOT_FOUND');
    }
    if (message.includes('password')) {
      throw new Error('INCORRECT_PASSWORD');
    }
    throw new Error(message);
  }
}

// ─────────────────────────────────────────
// تسجيل حساب والد
// ─────────────────────────────────────────
export async function registerUser(userData) {
  try {
    const response = await API.post('/auth/register', {
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.emailOrPhone,
      password: userData.password,
      role: userData.role,
    });

    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return {
      success: true,
      token,
      user,
      message: 'تم تسجيل الحساب بنجاح',
    };
  } catch (error) {
    const message = error.response?.data?.message || 'حدث خطأ';

    if (message.includes('already')) {
      throw new Error('EMAIL_ALREADY_EXISTS');
    }
    throw new Error(message);
  }
}

// ─────────────────────────────────────────
// تسجيل الخروج
// ─────────────────────────────────────────
export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// ─────────────────────────────────────────
// الحصول على المستخدم الحالي
// ─────────────────────────────────────────
export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// ─────────────────────────────────────────
// التحقق إذا المستخدم مسجل دخول
// ─────────────────────────────────────────
export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

// إرسال رمز التحقق للإيميل
export async function sendResetCode(email) {
  const response = await API.post('/auth/forgot-password', { email });
  return response.data;
}

// التحقق من الرمز وتغيير كلمة السر
export async function resetPassword(email, code, newPassword) {
  const response = await API.post('/auth/reset-password', {
    email,
    code,
    newPassword,
  });
  return response.data;
}