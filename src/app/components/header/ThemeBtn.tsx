"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import sun from "@/assets/icon/sun.svg";
import moon from "@/assets/icon/moon.svg";
import { useEffect, useState } from "react";

const ThemeBtn = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [themeIcon, setThemeIcon] = useState(sun);
  useEffect(() => {
    setThemeIcon(theme === "dark" || systemTheme === "dark" ? sun : moon);
  }, [theme, systemTheme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Image
      src={themeIcon}
      onClick={toggleTheme}
      width={19}
      height={25}
      className="h-6 w-5 cursor-pointer md:block"
      alt="Theme icon"
    />
  );
};

export default ThemeBtn;
