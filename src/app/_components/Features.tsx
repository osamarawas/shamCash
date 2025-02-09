import React from "react";
import { featuresCards } from "../utils/siteData";
import Card from "../components/card";

const Features = () => {
  return (
    <div className="flex items-center justify-center container flex-col gap-5 mx-auto  my-8 lg:my-14  bg-landing  bg-feature dark:bg-feature-dark ">
      <h2 className="text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto w-16  ">
        مزايا
      </h2>
      <p className="w-2/3 text-center  text-lg text-muted leading-9 font-medium "         
          data-aos="fade-up"
          data-aos-duration="800">
        يقدم تطبيقنا مجموعة من المزايا المصممة لتلبية احتياجاتك بكل احترافية،
        منها السرعة في تنفيذ العمليات، السهولة في الاستخدام، أعلى مستويات
        الأمان، وخدمات بدون رسوم خفية. هدفنا هو توفير تجربة مالية مريحة وشفافة
        تلائم أسلوب حياتك اليومي.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 text-center ">
        {Array.isArray(featuresCards) && featuresCards.length > 0 ? (
          featuresCards.map((feature, index) => (
            <Card item={feature} key={index} />
          ))
        ) : (
          <p>No links available</p>
        )}
      </div>
    </div>
  );
};

export default Features;
