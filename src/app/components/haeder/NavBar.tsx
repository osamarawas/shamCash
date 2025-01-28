"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/icon/logo.svg";
import theme from "@/assets/icon/noun-mode-3638316 1.svg";
import Link from "next/link";
import { navLinks } from "@/app/utils/siteData";
import { usePathname } from "next/navigation";
const NavBar = () => {
  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;
  const activeStyle = " text-primary font-semibold ";

  return (
    <div className=" flex justify-between items-center shadow h-28 px-12 ">
      <div>
        <Image
          src={Logo}
          width={86}
          height={99}
          className="h-20 w-20"
          alt="Logo"
        />
      </div>
      <div className="md:flex items-center gap-8 hidden ">
        {navLinks.map((link) => (
          <Link
            href={link.Path}
            className={`${isActive(link.Path) ? activeStyle : ""}} text-lg`}
            key={link.id}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex gap-4 items-center">
        <span className="cursor-pointer">العربية</span>
        <Image
          src={theme}
          width={19}
          height={25}
          className="h-6 w-5 cursor-pointer"
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default NavBar;
