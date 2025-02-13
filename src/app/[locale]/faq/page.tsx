import { faqCategories } from "@/app/utils/siteData";
import Category from "./_components/Category";
import { getTranslations } from "next-intl/server";

const FaqPage = async () => {
  const t = await getTranslations("faqPage");
  const faqCategoriesArray = await faqCategories();

  return (
    <div className="flex items-center justify-center container flex-col gap-5 mx-auto  my-8 lg:my-14 ">
      <h2 className="-z-10 text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto  ">
        {t("title")}
      </h2>
      <p className="w-2/3 text-center  text-lg text-muted leading-9 font-medium ">
        {t("description")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2  text-center gap-6">
        {faqCategoriesArray.map((category) => (
          <Category {...category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
