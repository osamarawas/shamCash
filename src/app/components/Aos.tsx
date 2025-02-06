"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // مدة التأثير
      once: false, // التأثير يعمل مرة واحدة فقط
    });
  }, []);

  return null; // لا حاجة لإرجاع أي JSX
}
