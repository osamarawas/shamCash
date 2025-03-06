import { verificationCategoryData } from "@/app/utils/siteData";
import { getTranslations } from "next-intl/server";

import { Languages } from "@/app/utils/enums";
import Category from "@/app/components/Category";
// import { encryptData } from "@/app/utils/encrypt";

interface FaqPageProps {
  params: Promise<{ locale: Languages }>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VerificationPage = async ({ params }: FaqPageProps) => {
  const t = await getTranslations("");
  const verificationCategory = await verificationCategoryData();
  // const data = {
  //   phoneNumber: "0931807056",
  //   userName: "testq",
  //   accountNumber: 1207192511396103,
  //   email: "test@example.com",
  // };

  // const encryptedData = await encryptData(JSON.stringify(data));
  // console.log(encryptedData);

  return (
    <div
      className="sm:h-[calc(100vh-80px)] flex items-center container flex-col gap-5 mx-auto  pt-8 w-lg:pt-14 "
      dir="auto"
    >
      <h2 className="-z-10 text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto sm:w-fit ">
        {t("verification.title")}
      </h2>
      <p className="mx-5 sm:mx-auto text-muted md:text-center text-justify text-lg font-semibold max-w-3xl">
        {t("verification.desc")}
      </p>
      <p className="font-semibold mt-10 text-2xl text-primary leading-10 text-center">
        {t("verification.choseType")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-6 gap-6">
        {verificationCategory.map((category) => (
          <Category {...category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default VerificationPage;
