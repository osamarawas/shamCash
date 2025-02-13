"use client";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const newPathUrl = `/${newLocale}${pathname.replace(/^\/(ar|en)/, "")}`;
    console.log(newPathUrl);
    window.location.replace(newPathUrl);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="cursor-pointer hover:text-primary hidden md:block"
    >
      {locale === "ar" ? "English" : "العربية"}
    </button>
  );
};

export default LanguageSwitcher;
