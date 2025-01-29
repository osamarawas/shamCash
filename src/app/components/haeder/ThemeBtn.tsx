"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import sun from "@/assets/icon/sun.svg";
import moon from "@/assets/icon/moon.svg";
const ThemeBtn = () => {
  const { theme, setTheme } = useTheme();

  const setThemIcon = () => {
    const systemThemeStorage = getSystemTheme();
    if (systemThemeStorage) return systemThemeStorage === "dark" ? sun : moon;
    else return theme === "dark" ? sun : moon;
  };
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  function getSystemTheme() {
    const theme = localStorage.getItem("theme");
    if (theme) {
      return theme;
    }
  }

  return (
    <Image
      src={setThemIcon()}
      onClick={toggleTheme}
      width={19}
      height={25}
      className="h-6 w-5 cursor-pointer "
      alt="Logo"
    />
  );
};

export default ThemeBtn;
