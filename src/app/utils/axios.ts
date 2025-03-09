import axios from "axios";

// ✅ إنشاء instance لـ axios مع الإعدادات الافتراضية
const axiosInstance = axios.create({
  //with encypt https://shamcash.bokla.me
  //without encrypt https://test.bokla.me
  baseURL: "https://shamcash.bokla.me", // يمكن ضبطه من env
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-Requested-with": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },
});

// ✅ إضافة Interceptors لمعالجة التوكنات أو الأخطاء العامة
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // أو استرجاعه من Context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
