import axios from "axios";
import { encryptData } from "./encrypt";

const withEncrypt: boolean = false;
// ✅ إنشاء instance لـ axios مع الإعدادات الافتراضية
const axiosInstance = axios.create({
  //with encypt https://shamcash.bokla.me
  //without encrypt https://test.bokla.me
  baseURL: "https://test.bokla.me", // يمكن ضبطه من env
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
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (withEncrypt) {
      if (config.data) {
        try {
          console.log("load", config.data);
          const bodyString = JSON.stringify(config.data);
          const encrypted = await encryptData(bodyString);
          console.log(encrypted);
          config.data = encrypted; // Send encrypted data instead of raw
        } catch (error) {
          console.error("Encryption failed:", error);
          // Optionally, proceed with unencrypted data or reject the request
        }
      }
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
