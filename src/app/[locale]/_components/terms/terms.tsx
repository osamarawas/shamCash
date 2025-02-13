import React from "react";
import allert from "@/assets/icon/allert.svg";
import Image from "next/image";
import TermsCard from "./termsCards";
import { getTranslations } from "next-intl/server";

const Terms = async () => {
  const t = await getTranslations("");

  return (
    <div className="h-full py-10 background-terms bg-[url(../assets/images/bg-light.svg)] dark:bg-[url(../assets/images/bg-dark.svg)]">
      <h1 className="-z-10 text-primary text-2xl text-center max-w-72 font-bold underLine mx-auto relative mb-8">
        {t("terms.title")}
      </h1>
      <p
        dir="auto"
        className="mx-auto text-center text-lg font-semibold max-w-lg"
      >
        {t("terms.desc")}
      </p>
      <TermsCard />
      <div
        dir="auto"
        className="flex flex-wrap sm:flex-nowrap border-solid border-2 border-red-700 rounded-lg p-6 w-3/4 mx-auto mt-14"
      >
        <Image
          src={allert.src}
          alt="allert"
          className="h-16 w-16 m-5"
          width={64}
          height={64}
        />
        <p className="text-lg m-auto">{t("terms.allert")}</p>
      </div>
    </div>
  );
};

export default Terms;
