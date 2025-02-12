import Image from "next/image";
import Logo from "@/assets/icon/logo.svg";
import { Link } from "@/i18n/routing";
import NavLinks from "./NavLinks"; // Client Component
import NavbarMobile from "./NavbarMobile"; // Client Component
import ThemeBtn from "./ThemeBtn"; // Client Component
import LanguageSwitcher from "./LanguageSwitcher"; // Client Component
import { unstable_setRequestLocale } from "next-intl/server";

export default async function NavBar({ locale }: { locale: string }) {
  unstable_setRequestLocale(locale); // ضبط اللغة للترجمة

  return (
    <div className="flex justify-between items-center shadow h-24 px-12 ">
      <div>
        <Link href="/">
          <Image
            src={Logo}
            width={86}
            height={99}
            className="h-20 w-20"
            alt="Logo"
          />
        </Link>
      </div>
      {/* تمرير locale إلى NavLinks لأنه Server Component */}
      <NavLinks />
      <div className="flex gap-4 items-center">
        <LanguageSwitcher /> {/* Client Component */}
        <ThemeBtn /> {/* Client Component */}
      </div>
      <NavbarMobile /> {/* Client Component */}
    </div>
  );
}
