"use client";
export function getStorageTheme() {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme");
    if (theme) {
      return theme;
    }
  }
}
export function removeLanguageFromPath(path: string): string {
  return path.replace(/^\/[a-zA-Z-]+(\/|$)/, "/");
}
export function getSecondLastPath(url: string): string | null {
  const parts = url.split("/").filter(Boolean); // تقسيم المسار مع إزالة الفراغات
  return parts.length > 1 ? parts[parts.length - 2] : null;
}
