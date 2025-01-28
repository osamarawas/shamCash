import Aboutcard from "../../components/About/Aboutcard";
import img1 from "@/assets/icon/Frame11.svg";
import img2 from "@/assets/icon/Frame17.svg";
import img3 from "@/assets/icon/Frame18.svg";
const About = () => {
    const links=[
        {image: img1.src , title: "الدعم" , p: "فريق الدعم الخاص بنا متواجد على مدار الساعة للرد على استفساراتك وحل أي مشاكل قد تواجهها، لضمان تجربة استخدام سلسة وخالية من العقبات."} ,
        {image: img2.src, title: "الأمان" , p: "تطبيقنا مصمم بأعلى معايير الأمان لحماية بياناتك ومعاملاتك المالية، مما يضمن لك تجربة موثوقة وآمنة في كل خطوة."} ,
        {image: img3.src , title: "السرعة" , p: "تطبيقنا يتميز بالسرعة العالية لتنفيذ العمليات، مما يضمن تجربة فورية وسلسة تلبي احتياجاتك في أي وقت."} ,
      ];

  return (
    <div className="text-center justify-center">
      <h1 className="text-primary text-center text-3xl font-bold mb-14 underLine relative mx-auto w-16 m-16">حول</h1>
      <p className="text-center justify-center w-8/12 mx-auto mb-8 text-lg text-muted" dir="rtl">تطبيقنا هو الحل الأمثل لإدارة معاملاتك المالية بسهولة وأمان يتيح لك إرسال واستلام الأموال بسرعة وسلاسة، مع واجهة استخدام بسيطة وتجربة مريحة نسعى من خلاله إلى تقديم خدمات مالية مبتكرة تضمن الشفافية والموثوقية، مما يتيح لك التحكم الكامل بأموالك في أي وقت ومن أي مكان.</p>
      <Aboutcard links={links} />
    </div>
  )
}

export default About