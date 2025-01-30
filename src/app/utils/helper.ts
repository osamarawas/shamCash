"use client";
export function getStorageTheme() {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme");
    if (theme) {
      return theme;
    }
  }
  // إذا لم يتم العثور على الثيم أو كنت في الخادم، قم بإرجاع القيمة الافتراضية
  return "light"; // أو القيمة الافتراضية التي تحتاجها
}
