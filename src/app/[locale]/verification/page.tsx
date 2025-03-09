import { verificationCategoryData } from "@/app/utils/siteData";
import { getTranslations } from "next-intl/server";

import { Languages } from "@/app/utils/enums";
import Category from "@/app/components/Category";
import { decryptDataByAes, encryptData } from "@/app/utils/encrypt";

interface FaqPageProps {
  params: Promise<{ locale: Languages }>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VerificationPage = async ({ params }: FaqPageProps) => {
  const t = await getTranslations("");
  const verificationCategory = await verificationCategoryData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const originalText = "Hello, World!";
  const data = {
    email: "osama@gmail.com",
    phoneNumber: "0931807056",
    userName: "osama",
    accountNumber: "1234567891234567",
  };
  // 🔒 تشفير النص

  // encryptData
  const encrypt = await encryptData(JSON.stringify(data));
  console.log(encrypt);
  console.log(encrypt);
  // 🔓 فك التشفير
  const decryptedText = await decryptDataByAes(
    "LL7M2IaL1GsxWrzrZ0pJn0r2U1etPGBQ+3OvxqIlp5814cCEKVjYKNJZ6fjKQo1nSpzkoOCtIoI9CyYQwpMEbsnh4xRuIVnP7zq9Ug+Y8VpQobJqvZHlvU5+SwOQxwuL1uH3k6XM+885u+LoJd1pg9d2oYLtUMdZ7gC5sw==.U8zIBTABS8AJ1ctF",
    "R94OZZ8gwEK1NctwaOePsA=="
  );
  console.log("🔓 Decrypted old:", decryptedText);

  return (
    <div
      className="flex items-center container flex-col gap-5 mx-auto  pt-8 pb-20 w-lg:pt-14 "
      dir="auto"
    >
      <h2 className="-z-10 text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto sm:w-fit ">
        {t("verification.title")}
      </h2>
      <p className="mx-5 sm:mx-auto text-muted md:text-center text-justify text-lg font-medium max-w-3xl">
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
