import axios from 'axios';

// عنوان الباكند
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// قبل كل request — أضيفي الـ token تلقائياً
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// إذا رجع 401 (token منتهي) — أرجعي للـ login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;