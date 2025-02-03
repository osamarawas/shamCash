import React from "react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div
      className=" landbg relative h-screen
      lg:fix-height flex justify-center items-center flex-col  lg:space-y-4 text-center mx-auto overflow-hidden"
    >
      {/* الخلفيات */}
      {/* <div className="absolute top-0 -right-12 lg:right-0  w-1/2 h-full bg-cover lg:bg-right gradiantRight"></div>
      <div className="absolute -top-3 left-0 w-1/2 h-full bg-cover bg-left gradiantLeft"></div> */}
      <div className="space-y-4">
        {/* المحتوى */}
        <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
          <span className="text-gradiant text-transparent bg-clip-text">
            تطبيق شام{" "}
          </span>{" "}
          كاش متوفر الآن
        </h1>
        <h2 className="text-xl font-semibold leading-9">
          حمّل التطبيق وأستمتع بخدماتنا
        </h2>
        <p className="w-3/5 mx-auto font-medium text-lg text-gray-700 leading-relaxed">
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
