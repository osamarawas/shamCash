"use client";
import { useTheme } from "next-themes";
export function getStorageTheme() {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme");
    if (theme) {
      return theme;
    }
  }
}

export function useIsDark() {
  const ThemeStorage = getStorageTheme();
  const { systemTheme } = useTheme();
  return ThemeStorage ? ThemeStorage === "dark" : systemTheme === "dark";
}
