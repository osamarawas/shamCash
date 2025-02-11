import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { Languages } from "@/app/utils/enums";

export const routing = defineRouting({
  locales: [Languages.ENGLISH, Languages.ARABIC],

  defaultLocale: Languages.ARABIC,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
