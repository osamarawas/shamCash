import React from "react";
import allert from "@/assets/icon/allert.svg";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import TermsCard from "../_components/terms/termsCards";

const Terms = async () => {
  const t = await getTranslations("");

  return (
    <div className="py-8 lg:py-14 background-terms bg-[url(../assets/images/bg-light.svg)] dark:bg-[url(../assets/images/bg-dark.svg)]">
      <h2 className="-z-10 text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto w-64 sm:w-fit">
        {t("terms.title")}
      </h2>
      <p
        dir="auto"
        className="mx-5 sm:mx-auto text-muted text-center text-lg font-semibold max-w-xl"
      >
        {t("terms.desc")}
      </p>
      <TermsCard />
      <div
        dir="auto"
        className="flex flex-wrap sm:flex-nowrap justify-center items-center  sm:left-0 border-solid border-2 border-red-700 rounded-lg py-2 px-6 w-3/4 mx-auto mt-14"
      >
        <Image
          src={allert.src}
          alt="allert"
          className="m-5 left-2/4"
          width={64}
          height={64}
        />
        <p className="text-lg mx-auto">{t("terms.allert")}</p>
      </div>
    </div>
  );
};

export default Terms;
