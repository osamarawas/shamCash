"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const NavLinks = () => {
  const t = useTranslations();
  const pathName = usePathname();

  const navItems = [
    { id: "home", title: t("navlinks.home"), Path: "/" },
    { id: "terms", title: t("navlinks.terms"), Path: "/terms" },
    { id: "contact", title: t("navlinks.contact-us"), Path: "#footer" },
  ];

  return (
    <div className=" items-center gap-4 space-x-4 md:flex hidden">
      {navItems.map((link) => (
        <Link
          href={link.Path}
          key={link.id}
          className={`text-lg ${pathName === link.Path ? "text-primary font-semibold" : ""}`}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
