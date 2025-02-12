import React from "react";
import { socialMedia } from "@/app/utils/siteData";
import SocialMediaFooter from "./SocialMediaFooter";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
    const t = await getTranslations("");
  
  return (
    <footer
      id="footer"
      className=" bg-footer text-center items-center py-14 px-7 min-h-96"
    >
      <h1 className="text-white dark:text-primary font-bold text-2xl underLine relative w-48 text-center mx-auto mb-16">
        {t("footer.title")}
      </h1>
      <p dir="auto" className="text-footer-foreground text-lg mx-auto w-3/4"
       data-aos="fade-up" data-aos-duration="800">
        {t("footer.description")}
      </p>
      <div className="flex  items-center lg:w-1/3  mx-auto mt-12 justify-around flex-row h-32 "  data-aos="zoom-in" data-aos-duration="800">
        {socialMedia.map((social, index) => (
          <SocialMediaFooter socialMedia={social} key={index} />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
