"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import sun from "@/assets/icon/sun.svg";
import moon from "@/assets/icon/moon.svg";
const ThemeBtn = () => {
  const { theme, setTheme } = useTheme();
  const setThemIcon = () => (theme === "dark" ? sun : moon);
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
