import { verificationCategoryData } from "@/app/utils/siteData";
import { getTranslations } from "next-intl/server";

import { Languages } from "@/app/utils/enums";
import Category from "@/app/components/Category";

interface FaqPageProps {
  params: Promise<{ locale: Languages }>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VerificationPage = async ({ params }: FaqPageProps) => {
  const t = await getTranslations("");
  const verificationCategory = await verificationCategoryData();
  return (
    <div
      className="h-full flex items-center justify-center container flex-col gap-5 mx-auto  my-8 lg:my-14 "
      dir="auto"
    >
      <h2 className="-z-10 text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto w-60 sm:w-fit ">
        {t("verification.title")}
      </h2>
      <p className="mx-5 sm:mx-auto text-muted text-center text-lg font-semibold max-w-3xl">
        {t("verification.desc")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        <p className="font-semibold mt-4 text-xl text-primary leading-10  col-span-full">
          {t("verification.choseType")}
        </p>
        {verificationCategory.map((category) => (
          <Category {...category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default VerificationPage;
