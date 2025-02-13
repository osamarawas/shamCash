import { ArrowLeft, ArrowRight, Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Languages } from "@/app/utils/enums";
import { getTranslations } from "next-intl/server";
import { setDirction } from "@/app/utils/helperServer";
import { Link } from "@/i18n/routing";
interface PathCeteProps {
  locale: Languages;
  categoryName: string | "";
}
const PathCete = async ({ locale, categoryName }: PathCeteProps) => {
  function setArrowDirction() {
    return locale === Languages.ARABIC ? (
      <ArrowRight className="w-8 h-5" />
    ) : (
      <ArrowLeft className="w-8 h-5" />
    );
  }
  const nexturl = () => {
    return `/${locale}/faq`;
  };
  const t = await getTranslations("faqPage");
  return (
    <div className="flex  items-center" dir={setDirction(locale)}>
      <Link href={"/faq"}>{setArrowDirction()}</Link>

      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={nexturl()}> {t("title")}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="font-bold cursor-default">
                {categoryName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PathCete;
