"use client";
import { getStorageTheme } from "@/app/utils/helper";
import { SocialMedia as SocialMediaType } from "@/app/utils/types";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect } from "react";
interface SocialMediaFooterprops {
  socialMedia: SocialMediaType;
}
const SocialMediaFooter = ({ socialMedia }: SocialMediaFooterprops) => {
  const { systemTheme } = useTheme();
  const ThemeStorage = getStorageTheme();
 
  const setSocialIcon = () => {
    if (ThemeStorage)
      return ThemeStorage === "dark"
        ? socialMedia.imgDark
        : socialMedia.imgLight;
    else
      return systemTheme === "dark"
        ? socialMedia.imgDark
        : socialMedia.imgLight;
  };

  const setSocialIconHover = () => {
    if (ThemeStorage)
      return ThemeStorage === "dark"
        ? socialMedia.imgDarkHover
        : socialMedia.imgLightHover;
    else
      return systemTheme === "dark"
        ? socialMedia.imgDarkHover
        : socialMedia.imgLightHover;
  };

  return (
    <div className="group m-2">
      <Image
        src={setSocialIcon()}
        alt=""
        height={42}
        width={42}
        className="group-hover:hidden"
      />
      <Image
        src={setSocialIconHover()}
        alt=""
        height={42}
        width={42}
        className="hidden group-hover:block cursor-pointer"
      />
    </div>
  );
};

export default SocialMediaFooter;
