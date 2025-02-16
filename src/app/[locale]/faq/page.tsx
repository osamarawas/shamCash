import { faqCategories } from "@/app/utils/siteData";
import Category from "./_components/Category";
import { getTranslations } from "next-intl/server";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { setDirction } from "@/app/utils/helperServer";
import { Languages } from "@/app/utils/enums";
interface FaqPageProps {
  params: Promise<{ locale: Languages }>;
}

const FaqPage = async ({ params }: FaqPageProps) => {
  const { locale } = await params;

  const t = await getTranslations("");
  const faqCategoriesArray = await faqCategories();

  return (
    <div className="flex items-center justify-center container flex-col gap-5 mx-auto  my-8 lg:my-14 ">
      <h2 className="-z-10 text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto  ">
        {t("faqPage.title")}
      </h2>
      <p className="w-2/3 text-center  text-lg text-muted leading-9 font-medium ">
        {t("faqPage.description")}
      </p>

      <div className="w-80  mx-auto">
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium  sr-only "
          >
            {t("search")}
          </label>
          <div className="relative" dir={setDirction(locale)}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search size={20} className="text-muted" />
            </div>

            <Input
              type="search"
              id="default-search"
              placeholder={t("search")}
              className=" block p-4 ps-10 "
            />
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  text-center gap-6">
        {faqCategoriesArray.map((category) => (
          <Category {...category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
