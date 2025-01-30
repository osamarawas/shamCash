"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import sun from "@/assets/icon/sun.svg";
import moon from "@/assets/icon/moon.svg";
import { getStorageTheme } from "@/app/utils/helper";
const ThemeBtn = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  const setThemIcon = () => {
    const ThemeStorage = getStorageTheme();
    if (ThemeStorage) return ThemeStorage === "dark" ? sun : moon;
    else return systemTheme === "dark" ? sun : moon;
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

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
