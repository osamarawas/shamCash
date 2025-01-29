"use client";
import { SocialMedia as SocialMediaType } from "@/app/utils/types";
import { useTheme } from "next-themes";
import Image from "next/image";
interface SocialMediaFooterprops {
  socialMedia: SocialMediaType;
}

const SocialMediaFooter = ({ socialMedia }: SocialMediaFooterprops) => {
  const { theme, setTheme } = useTheme();
  console.log(theme === "dark");
  const setSocialIcon = () => {
    return theme === "dark" ? socialMedia.imgDark : socialMedia.imgLight;
  };
  const setSocialIconHover = () => {
    return theme === "dark"
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
