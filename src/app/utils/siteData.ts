import img1 from "@/assets/icon/Frame11.svg";
import img2 from "@/assets/icon/Frame17.svg";
import img3 from "@/assets/icon/Frame18.svg";
import { AboutCarts, FAnswerQuestions, NavLinks } from "./types";

export const navLinks: NavLinks = [
  { id: crypto.randomUUID(), title: "الصفحة الرئيسية", Path: "/" },
  { id: crypto.randomUUID(), title: "الأحكام والشروط", Path: "/investments" },
  { id: crypto.randomUUID(), title: "تواصل معنا", Path: "/support" },
];

export const fAnswerQuestion: FAnswerQuestions = [
  {
    id: crypto.randomUUID(),
    question: "اديش عمولة التحويل؟",
    answer: "الخدمة مجانية ولا يوجد عمولة تحويل حالياً.",
  },
  {
    id: crypto.randomUUID(),
    question: "شو ضمان المنصة أنه ماتسكر فجأة ؟",
    answer: "بنك شام هو الضامن",
  },
  {
    id: crypto.randomUUID(),
    question: "هل يوجد من يقوم بحماية المنصة من الاختراق ؟",
    answer: "صحيح يوجد عدد من الإخوة المبرمجين قائمين على حماية البرنامج.",
  },
  {
    id: crypto.randomUUID(),
    question:
      "هل يمكن الاستفاده من برنامج شام كاش من اجل تعبئه رصيد في سيريافون او تعبئه الكهرباء ؟",
    answer:
      "قريباً بإذن الله سيتم تفعيل عدد من الخدمات ومنها الاتصالات والكهرباء والتسويق الإلكتروني",
  },
];
export const aboutCart: AboutCarts = [
  {
    image: img1.src,
    title: "الدعم",
    description:
      "فريق الدعم الخاص بنا متواجد على مدار الساعة للرد على استفساراتك وحل أي مشاكل قد تواجهها، لضمان تجربة استخدام سلسة وخالية من العقبات.",
  },
  {
    image: img2.src,
    title: "الأمان",
    description:
      "تطبيقنا مصمم بأعلى معايير الأمان لحماية بياناتك ومعاملاتك المالية، مما يضمن لك تجربة موثوقة وآمنة في كل خطوة.",
  },
  {
    image: img3.src,
    title: "السرعة",
    description:
      "تطبيقنا يتميز بالسرعة العالية لتنفيذ العمليات، مما يضمن تجربة فورية وسلسة تلبي احتياجاتك في أي وقت.",
  },
];
