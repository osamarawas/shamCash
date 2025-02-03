import headphones from "@/assets/icon/headphones.svg";
import shield from "@/assets/icon/shield.svg";
import flash from "@/assets/icon/flash.svg";
import facebookLight from "@/assets/icon/facebookLight.svg";
import whatsappLight from "@/assets/icon/whatsupLight.svg";
import xLight from "@/assets/icon/xLight.svg";
import telegramLight from "@/assets/icon/telegramLight.svg";
import facebookDark from "@/assets/icon/facebookDark.svg";
import whatsappDark from "@/assets/icon/whatsupDark.svg";
import xDark from "@/assets/icon/xDark.svg";
import telegramDark from "@/assets/icon/telegramDark.svg";
import xHoverDark from "@/assets/icon/xHoverDark.svg";
import xHoverLight from "@/assets/icon/xHoverLight.svg";
import facebookHover from "@/assets/icon/facebookHover.svg";
import telegramHover from "@/assets/icon/telegramHover.svg";
import whatsupHover from "@/assets/icon/whatsupHover.svg";

import { AboutCards, FAnswerQuestions, NavLinks, socialMedias } from "./types";

export const navLinks: NavLinks = [
  { id: crypto.randomUUID(), title: "الصفحة الرئيسية", Path: "/" },
  { id: crypto.randomUUID(), title: "الأحكام والشروط", Path: "/terms" },
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
export const aboutCard: AboutCards = [
  {
    image: headphones.src,
    title: "الدعم",
    description:
      "فريق الدعم الخاص بنا متواجد على مدار الساعة للرد على استفساراتك وحل أي مشاكل قد تواجهها، لضمان تجربة استخدام سلسة وخالية من العقبات.",
  },
  {
    image: shield.src,
    title: "الأمان",
    description:
      "تطبيقنا مصمم بأعلى معايير الأمان لحماية بياناتك ومعاملاتك المالية، مما يضمن لك تجربة موثوقة وآمنة في كل خطوة.",
  },
  {
    image: flash.src,
    title: "السرعة",
    description:
      "تطبيقنا يتميز بالسرعة العالية لتنفيذ العمليات، مما يضمن تجربة فورية وسلسة تلبي احتياجاتك في أي وقت.",
  },
];
export const socialMedia: socialMedias = [
  {
    id: crypto.randomUUID(),
    name: "facebook",
    imgDark: facebookDark.src,
    imgLight: facebookLight.src,
    imgDarkHover: facebookHover.src,
    imgLightHover: facebookHover.src,
  },
  {
    id: crypto.randomUUID(),
    name: "x",
    imgDark: xDark.src,
    imgLight: xLight.src,
    imgDarkHover: xHoverDark,
    imgLightHover: xHoverLight,
  },
  {
    id: crypto.randomUUID(),
    name: "whatsapp",
    imgDark: whatsappDark.src,
    imgLight: whatsappLight.src,
    imgDarkHover: whatsupHover.src,
    imgLightHover: whatsupHover.src,
  },
  {
    id: crypto.randomUUID(),
    name: "telegram",
    imgDark: telegramDark.src,
    imgLight: telegramLight.src,
    imgDarkHover: telegramHover.src,
    imgLightHover: telegramHover.src,
  },
];
