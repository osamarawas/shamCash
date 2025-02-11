"use client";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";

const LanguageSwitcher = () => {
  const router = useRouter();
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
      className="cursor-pointer hover:text-primary"
    >
      {locale === "ar" ? "English" : "العربية"}
    </button>
  );
};

export default LanguageSwitcher;
