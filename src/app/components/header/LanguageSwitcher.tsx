"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    router.push(`/${newLocale}${pathname.replace(/^\/(ar|en)/, "")}`);
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
