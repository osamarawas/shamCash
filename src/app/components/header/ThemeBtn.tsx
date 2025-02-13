"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import sun from "@/assets/icon/sun.svg";
import moon from "@/assets/icon/moon.svg";
import { useIsDark } from "@/app/utils/helperClient";
import { useEffect, useState } from "react";
const ThemeBtn = () => {
  const { theme, setTheme } = useTheme();
  const [themeIcon, setThemeIcon] = useState(moon);

  const isDark = useIsDark();
  useEffect(() => {
    setThemeIcon(isDark ? sun : moon);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Image
      src={themeIcon}
      onClick={toggleTheme}
      width={19}
      height={25}
      className="h-6 w-5 cursor-pointer  hidden md:block"
      alt="Logo"
    />
  );
};

export default ThemeBtn;
