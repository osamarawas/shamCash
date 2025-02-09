import React from "react";
import allert from "@/assets/icon/allert.svg";
import { terms } from "@/app/utils/siteData";
import Image from "next/image";
import TermsCard from "./termsCards";

const Terms = () => {
  return (
    <div className="h-full py-10 background-terms bg-[url(../assets/images/bg-light.svg)] dark:bg-[url(../assets/images/bg-dark.svg)]">
      <h1 className="text-primary text-2xl text-center max-w-52 font-bold underLine mx-auto relative mb-8">
        الأحكام و الشروط
      </h1>
      <p
        dir="rtl"
        className="mx-auto text-center text-lg font-semibold max-w-lg"
      >
        أهلاً ومرحباً بك في خدمة شام كاش، نحن فخورون بأن نقدم لك خدمة الدفع
        الإلكتروني, من خلال استخدامك لهذا البرنامج، فإنك توافق على الالتزام
        بالشروط والأحكام التالية:
      </p>
      <TermsCard term={terms} />
      <div
        dir="rtl"
        className="flex border-solid border-2 border-red-700 rounded-lg p-6 w-3/4 mx-auto mt-14"
      >
        <Image
          src={allert.src}
          alt="allert"
          className="h-16 w-16 ml-16"
          width={64}
          height={64}
        />
        <p className="text-lg">
          إن استخدامك البرنامج يعتبر قبولك لهذه الشروط والأحكام، وإذا كنت لا
          توافق على أي جزء من هذه الاتفاقية، يجب عليك التوقف عن استخدام البرنامج
          فوراً.
        </p>
      </div>
    </div>
  );
};

export default Terms;
