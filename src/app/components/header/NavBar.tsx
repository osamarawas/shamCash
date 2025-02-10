import Image from "next/image";
import React from "react";
import Logo from "@/assets/icon/logo.svg";
import { Link } from "@/i18n/routing";
import ThemeBtn from "./ThemeBtn";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLinks from "./NavLinks";
const NavBar = () => {

  return (
    <div className=" flex justify-between items-center shadow h-28 px-12 font-se">
      <div>
        <Link href={"/"}>
          <Image
            src={Logo}
            width={86}
            height={99}
            className="h-20 w-20"
            alt="Logo"
          />
        </Link>
      </div>
        <NavLinks />
      <div className="flex gap-4 items-center">
        <LanguageSwitcher />
        <ThemeBtn />
      </div>
    </div>
  );
};

export default NavBar;
