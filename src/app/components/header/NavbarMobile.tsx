"use client";
import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import ThemeBtn from "./ThemeBtn";
import LanguageSwitcher from "./LanguageSwitcher";
import { AlignJustify, X } from "lucide-react";

const NavbarMobile = () => {
  const t = useTranslations();
  const pathName = usePathname();
  const navItems = [
    { id: "home", title: t("navlinks.home"), Path: "/" },
    { id: "terms", title: t("navlinks.terms"), Path: "/terms" },
    { id: "contact", title: t("navlinks.contact-us"), Path: "#footer" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  // تبديل حالة القائمة
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden relative">
      {/* زر القائمة */}
      <button
        onClick={toggleNavbar}
        className="text-3xl md:hidden cursor-pointer mx-2 inline-flex items-center justify-center rounded-md"
      >

        {isOpen ? (
             <X className="h-8 w-8" />):
             <AlignJustify className="h-8 w-8" />
        }
        
      </button>

      {/* القائمة الجانبية */}
      {isOpen && (
        <div className="absolute right-0 top-16 bg-background shadow-lg rounded-lg p-4 flex flex-col gap-4 items-center w-screen z-50 mx-auto translate-x-12">
          {navItems.map((link) => (
            <Link
              href={link.Path}
              key={link.id}
              className={`text-lg block ${pathName === link.Path ? "text-primary font-semibold" : ""}`}
            >
              {link.title}
            </Link>
          ))}

          {/* زر تغيير اللغة والثيم */}
          <div className=" gap-4 items-center md:hidden absolute">
            <LanguageSwitcher />
            <ThemeBtn />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;
