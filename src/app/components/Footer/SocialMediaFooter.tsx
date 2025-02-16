"use client";
import { SocialMedia as SocialMediaType } from "@/app/utils/types";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SocialMediaFooterprops {
  socialMedia: SocialMediaType;
}

const SocialMediaFooter = ({ socialMedia }: SocialMediaFooterprops) => {
  const { resolvedTheme } = useTheme();
  const [socialIcon, setSocialIcon] = useState(socialMedia.imgDark);
  const [socialIconHover, setSocialIconHover] = useState(
    socialMedia.imgDarkHover
  );

  function getSocialIcon() {
    if (resolvedTheme === "dark") return socialMedia.imgDark;
    else return socialMedia.imgLight;
  }
  function getSocialIconHover() {
    if (resolvedTheme === "dark") return socialMedia.imgDarkHover;
    else {
      return socialMedia.imgLightHover;
    }
  }
  useEffect(() => {
    setSocialIcon(getSocialIcon);
    setSocialIconHover(getSocialIconHover);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme]);

  return (
    <div className="group ">
      <a href={socialMedia.path} target="_blank"> 
      <Image
        src={socialIcon}
        alt="social icon"
        height={30}
        width={30}
        className="group-hover:hidden"
      />
      <Image
        src={socialIconHover}
        alt="social icon hover"
        height={30}
        width={30}
        className="hidden group-hover:block cursor-pointer"
      />
      </a>
    </div>
  );
};

export default SocialMediaFooter;
