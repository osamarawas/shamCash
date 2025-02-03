import React from "react";

import { socialMedia } from "@/app/utils/siteData";
import SocialMediaFooter from "./SocialMediaFooter";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative bg-footer text-center items-center py-14 px-7 min-h-96"
    >
      <h1 className="text-white dark:text-primary font-bold text-2xl underLine relative w-48 text-center mx-auto mb-16">
        تواصل معنا
      </h1>
      <p dir="rtl" className="text-footer-foreground text-lg mx-auto w-3/4">
        إذا كان لديك أي استفسار، ملاحظة، أو تواجه أي مشكلة، لا تتردد في التواصل
        معنا. فريق الدعم الخاص بنا متواجد دائمًا لتقديم المساعدة وضمان تجربة
        استخدام سلسة.
      </p>
      <div className="flex flex-wrap items-center w-1/3 mx-auto mt-12 justify-around flex-row ">
        {socialMedia.map((social, index) => (
          <SocialMediaFooter socialMedia={social} key={index} />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
