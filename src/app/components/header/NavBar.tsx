"use client";
import Image from "next/image";
import Logo from "@/assets/icon/logo.svg";
import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Links from "./Links";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeBtn from "./ThemeBtn";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navLinks = Links();
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // إخفاء الـ Navbar عند التمرير لأسفل
      } else {
        setIsVisible(true); // إظهار الـ Navbar عند التمرير لأعلى
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white shadow-md transition-transform duration-300 z-50 px-10 py-2 md:justify-around items-center  ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src={Logo}
            width={86}
            height={90}
            className="h-20 w-20"
            alt="Logo"
          />
        </Link>

        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.Path}
              className={`text-lg transition-colors hover:text-primary ${
                pathName === link.Path ? "text-primary font-semibold" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}
        </ul>

        {/* Language & Theme Buttons - Visible Only on Large Screens */}
        <div className="hidden md:flex gap-4 items-center">
          <LanguageSwitcher />
          <ThemeBtn />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full transition-all duration-500 ease-in-out transform ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ul className="absolute top-8 bg-background shadow-lg rounded-lg flex flex-col gap-4 items-center w-screen ">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.Path}
              className={`text-lg transition-colors hover:text-primary ${
                pathName === link.Path ? "text-primary font-semibold" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}

          {/* Language & Theme Buttons - Only in Mobile Sidebar */}
          <div className="flex gap-4 items-center">
            <LanguageSwitcher />
            <ThemeBtn />
          </div>
        </ul>
      </div>
    </nav>
  );
}
