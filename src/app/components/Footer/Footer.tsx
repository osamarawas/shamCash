import React from "react";
import { socialMedia } from "@/app/utils/siteData";
import SocialMediaFooter from "./SocialMediaFooter";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const t = await getTranslations("");

  return (
    <footer
      id="footer"
      className=" bg-footer text-center items-center pt-8 pb-3  px-7 "
    >
      <h1
        className="text-white dark:text-primary font-bold text-2xl underLine relative w-48 text-center mx-auto"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        {t("footer.title")}
      </h1>
      <p
        dir="auto"
        className="text-white  dark:text-footer-foreground text-lg mx-auto w-3/4 mt-10"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        {t("footer.description")}
      </p>
      <div
        className="flex items-center justify-evenly   lg:px-10
             w-4/6 lg:w-1/3 mx-auto 
             h-32 sm:h-28 "
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        {socialMedia.map((social, index) => (
          <SocialMediaFooter socialMedia={social} key={index} />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
