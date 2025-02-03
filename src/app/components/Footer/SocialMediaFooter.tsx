"use client";
import { useIsDark } from "@/app/utils/helper";
import { SocialMedia as SocialMediaType } from "@/app/utils/types";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SocialMediaFooterprops {
  socialMedia: SocialMediaType;
}

const SocialMediaFooter = ({ socialMedia }: SocialMediaFooterprops) => {
  const { theme } = useTheme();
  const [socialIcon, setSocialIcon] = useState(socialMedia.imgLight);
  const [socialIconHover, setSocialIconHover] = useState(
    socialMedia.imgLightHover
  );
  const isDark = useIsDark();
  function getSocialIcon() {
    if (isDark) return socialMedia.imgDark;
    else return socialMedia.imgLight;
  }
  function getSocialIconHover() {
    if (isDark) return socialMedia.imgDarkHover;
    else {
      return socialMedia.imgLightHover;
    }
  }
  useEffect(() => {
    setSocialIcon(getSocialIcon);
    setSocialIconHover(getSocialIconHover);
  }, [theme]);

  return (
    <div className="group m-2">
      <Image
        src={socialIcon}
        alt="social icon"
        height={42}
        width={42}
        className="group-hover:hidden"
      />
      <Image
        src={socialIconHover}
        alt="social icon hover"
        height={42}
        width={42}
        className="hidden group-hover:block cursor-pointer"
      />
    </div>
  );
};

export default SocialMediaFooter;
