import Image from "next/image";
import React from "react";
import Logo from "@/assets/icon/logo.svg";
import theme from "@/assets/icon/noun-mode-3638316 1.svg";
import Link from "next/link";
import { navLinks } from "@/app/utils/siteData";
const NavBar = () => {
  return (
    <div className=" flex justify-between items-center shadow-xl px-12">
      <div className=" py-4">
        <Image
          src={Logo}
          width={86}
          height={99}
          className="h-20 w-20"
          alt="Logo"
        />
      </div>
      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link href={link.Path} className="text-primary text-lg" key={link.id}>
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex gap-4 items-center">
        <span>العربية</span>
        <Image
          src={theme}
          width={19}
          height={25}
          className="h-6 w-5"
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default NavBar;
