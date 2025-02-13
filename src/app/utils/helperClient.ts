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
