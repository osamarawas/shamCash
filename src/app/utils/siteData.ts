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
import services from "@/assets/icon/services.svg";
import convert from "@/assets/icon/convert.svg";
import user from "@/assets/icon/user.svg";
import paper from "@/assets/icon/paper.svg";

import {
  AboutCards,
  FAnswerQuestions,
  FeaturesCards as FeaturesCardsType,
  socialMedias,
  terms as termsType,
} from "./types";
import { getTranslations } from "next-intl/server";



export const term = async ():Promise<termsType> => {
  const t = await getTranslations("terms.cnonditions");
  return [
  { li: t("cnonditions1") },
  { li: t("cnonditions2") },
  { li: t("cnonditions3") },
  { li: t("cnonditions4") },
  { li: t("cnonditions5") },
  { li: t("cnonditions6") },
  { li: t("cnonditions7") },
  { li: t("cnonditions8") },
  { li: t("cnonditions9") },
];
}

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

export const aboutCards = async (): Promise<AboutCards> => {
  const t = await getTranslations("about.sections");
  return [
    {
      image: headphones.src,
      title: t("support.title"),
      description: t("support.description"),
    },
    {
      image: shield.src,
      title: t("security.title"),
      description: t("security.description"),
    },
    {
      image: flash.src,
      title: t("speed.title"),
      description: t("speed.description"),
    },
  ];
};

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
export const featuresCards = async () : Promise<FeaturesCardsType>=>{
  const t = await getTranslations("features.sections");
  return [
    {
      image: services.src,
      title: t("services.title"),
      description:t("services.description")    
    },
    {
      image: convert.src,
      title: t("convert.title"),
      description:t("convert.description")  
    },
    {
      image: flash.src,
      title: t("flash.title"),
      description:t("flash.description")  
    },
    {
      image: user.src,
      title: t("user.title"),
      description:t("user.description")  
    },
    {
      image: shield.src,
      title: t("shield.title"),
      description:t("shield.description")  
    },
    {
      image: paper.src,
      title: t("paper.title"),
      description:t("paper.description")  
    },
  ];
} 
