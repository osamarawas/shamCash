"use client";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  const toggleLanguage = () => {
    // setLoading(true);
    const newLocale = locale === "ar" ? "en" : "ar";
    const newPathUrl = `/${newLocale}${pathname.replace(/^\/(ar|en)/, "")}`;
    window.location.replace(newPathUrl);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-lg z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      )}

      <button
        onClick={toggleLanguage}
        className="cursor-pointer hover:text-primary md:block"
        disabled={loading}
      >
        {locale === "ar" ? "English" : "العربية"}
      </button>
    </>
  );
};

export default LanguageSwitcher;
