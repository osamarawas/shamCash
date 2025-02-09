import React from "react";
import { Button } from "@/components/ui/button";

const Landing = () => {

  return (
    <div
      className="h-screen
      flex justify-center items-center lg:space-y-4 text-center mx-auto overflow-hidden bg-landing
      bg-no-repeat bg-[url(../assets/images/landing-light.png)] dark:bg-[url(../assets/images/landing-dark.png)]"
    >
      <div className="space-y-4">
        {/* المحتوى */}
        <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
          <span className="text-gradiant text-transparent bg-clip-text">
            {" "}
            تطبيق شام كاش{" "}
          </span>
          متوفر الآن
        </h1>
        <h2 className="text-xl font-semibold leading-9 font-">
          حمّل التطبيق وأستمتع بخدماتنا
        </h2>
        <p dir="rtl" className="w-3/5 mx-auto font-medium text-lg text-gray-600 leading-relaxed">
          نسعى لتوفير منصة موثوقة وآمنة تتيح للمستخدمين إجراء المعاملات المالية
          بسهولة ومرونة. هدفنا هو تمكين الأفراد من إدارة شؤونهم المالية بكفاءة
          وشفافية.
        </p>

        {/* زر التحميل */}
        <div>
          <Button className="py-2 px-12 mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg">
            تحميل
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
