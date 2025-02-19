"use client";
import { ArrowLeft, ArrowRight, Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Languages } from "@/app/utils/enums";
import { setDirction } from "@/app/utils/helperServer";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { getSecondLastPath } from "@/app/utils/helperClient";
import { useLocale } from "next-intl";

interface PathLineProps {
  pagename: string | "";
  backname: string;
}
const PathLine = ({ pagename, backname }: PathLineProps) => {
  const pathname = usePathname();
  const newUrl = getSecondLastPath(pathname);
  const locale = useLocale() as Languages;
  function setArrowDirction() {
    return locale === Languages.ARABIC ? (
      <ArrowRight className="w-8 h-5" />
    ) : (
      <ArrowLeft className="w-8 h-5" />
    );
  }
  const nexturl = () => {
    return `/${locale}/${newUrl}`;
  };
  return (
    <div className="flex  items-center" dir={setDirction(locale)}>
      <Link href={`/${newUrl}`}>{setArrowDirction()}</Link>

      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={nexturl()}> {backname}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="font-bold cursor-default">
                {pagename}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PathLine;
