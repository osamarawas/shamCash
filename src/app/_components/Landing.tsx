import Image from "next/image";
import gradiantLeft from "@/assets/images/gradiantLeft.svg";
import gradiantRight from "@/assets/images/gradiantRigth.svg";
import React from "react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className=" fix-height bg-white">
      <div className="pointer-events-none">
        <Image
          src={gradiantRight}
          alt="gradiant"
          className="absolute fix-height object-cover w-full "
        />
        <Image
          src={gradiantLeft}
          alt="gradiant"
          className="absolute fix-height object-cover  w-full "
        />
      </div>
      <div className="flex justify-center items-center h-full flex-col space-y-4">
        <h1 className="text-3xl leading-10 font-bold">
          <span className="bg-gradient-to-t bg-linear-88.45  from-primary from-52 to-white to-100% text-transparent bg-clip-text">
            تطبيق شام{" "}
          </span>
          كاش متوفر الآن
        </h1>
        <h2 className="text-2xl font-semibold leading-10">
          حمّل التطبيق وأستمتع بخدماتنا
        </h2>
        <p className="w-2/3 text-center font-medium text-xl text-muted leading-9  ">
          نسعى لتوفير منصة موثوقة وآمنة تتيح للمستخدمين إجراء المعاملات المالية
          بسهولة ومرونة هدفنا هو تمكين الأفراد من إدارة شؤونهم المالية بكفاءة
          وشفافية
        </p>
        <div className="">
          <Button className="py-1 px-12 mt-20">تحميل</Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
