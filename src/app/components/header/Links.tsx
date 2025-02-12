"use client";
import { useTranslations } from "next-intl";

export default function Links() {
  const t = useTranslations(); // ← يجب أن يكون هنا داخل المكون
  const navLinks = [
    { id: "home", title: t("navlinks.home"), Path: "/" },
    { id: "faq", title: t("navlinks.faqs"), Path: "/faq" },
    { id: "terms", title: t("navlinks.terms"), Path: "/terms" },
    { id: "contact", title: t("navlinks.contact-us"), Path: "#footer" },
  ];
  return navLinks;
}
