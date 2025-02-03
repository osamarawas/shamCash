<<<<<<< HEAD
import { aboutCard } from "@/app/utils/siteData";
import AboutCard from "@/app/components/About/AboutCard";
=======
import { aboutCart } from "@/app/utils/siteData";
import AboutCard from "./Aboutcard";
>>>>>>> 1df29e67276f409da763daee72e498bd3b22b32c

const About = () => {
  return (
    <div className="text-center justify-center flex items-center flex-col  my-8 lg:my-12">
      <div>
        <h1 className="text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto w-16 m-16">
          حول
        </h1>
        <p
          className="text-center justify-center w-8/12 mx-auto mb-8 text-lg text-muted"
          dir="rtl"
        >
          تطبيقنا هو الحل الأمثل لإدارة معاملاتك المالية بسهولة وأمان يتيح لك
          إرسال واستلام الأموال بسرعة وسلاسة، مع واجهة استخدام بسيطة وتجربة
          مريحة نسعى من خلاله إلى تقديم خدمات مالية مبتكرة تضمن الشفافية
          والموثوقية، مما يتيح لك التحكم الكامل بأموالك في أي وقت ومن أي مكان.
        </p>
      </div>

      <AboutCard aboutCard={aboutCard} />
    </div>
  );
};

export default About;
