import { aboutCards } from "@/app/utils/siteData";
import Card from "../../components/card";

const About = () => {
  return (
    <div className="flex items-center justify-center container flex-col gap-5 mx-auto my-8 lg:my-14">
      <h2
        className="text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto  "
        data-aos="zoom-out"
      >
        حول
      </h2>
      <p
        data-aos="fade-up"
        data-aos-duration="800"
        className="text-center justify-center w-8/12 mx-auto mb-8 text-lg text-muted"
        dir="rtl"
      >
        تطبيقنا هو الحل الأمثل لإدارة معاملاتك المالية بسهولة وأمان يتيح لك
        إرسال واستلام الأموال بسرعة وسلاسة، مع واجهة استخدام بسيطة وتجربة مريحة
        نسعى من خلاله إلى تقديم خدمات مالية مبتكرة تضمن الشفافية والموثوقية، مما
        يتيح لك التحكم الكامل بأموالك في أي وقت ومن أي مكان.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 text-center ">
        {Array.isArray(aboutCards) && aboutCards.length > 0 ? (
          aboutCards.map((about, index) => <Card item={about} key={index} />)
        ) : (
          <p>No links available</p>
        )}
      </div>
    </div>
  );
};

export default About;
