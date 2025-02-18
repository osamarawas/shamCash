import { verificationCategoryData } from "@/app/utils/siteData";
import { getTranslations } from "next-intl/server";

import { Languages } from "@/app/utils/enums";
import Category from "@/app/components/Category";

interface FaqPageProps {
  params: Promise<{ locale: Languages }>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FaqPage = async ({ params }: FaqPageProps) => {
  const t = await getTranslations("");
  const verificationCategory = await verificationCategoryData();
  console.log(verificationCategory);
  return (
    <div className="flex items-center justify-center container flex-col gap-5 mx-auto  my-8 lg:my-14 ">
      <h2 className="-z-10 text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto  ">
        {t("verification.title")}
      </h2>
      <p className="md:self-end font-semibold text-2xl text-primary leading-10 ">
        {t("verification.choseType")}
      </p>
      <div
        className="grid grid-cols-1 md:grid-cols-2  text-center gap-6"
        dir="auto"
      >
        {verificationCategory.map((category) => (
          <Category {...category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
