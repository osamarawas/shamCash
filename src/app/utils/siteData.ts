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
  FaqCategorie,
  FAnswerQuestions,
  FeaturesCards as FeaturesCardsType,
  NavLinks,
  socialMedias,
  terms as termsType,
  faqsWithCategorie,
} from "./types";
import { getTranslations } from "next-intl/server";

export const navLinks: NavLinks = [
  { id: crypto.randomUUID(), title: "الصفحة الرئيسية", Path: "/" },
  { id: crypto.randomUUID(), title: "الأحكام والشروط", Path: "/terms" },
  { id: crypto.randomUUID(), title: "تواصل معنا", Path: "#footer" },
  // { id: crypto.randomUUID(), title: "ادخال", Path: "/form" },
];

export const terms: termsType = [
  { li: "تتحمل كامل المسؤولية عن صحة بيانات حسابك وعن حماية بيانات الدخول." },
  { li: "نخلي مسؤوليتنا عن أي أخطاء نتيجة سوء استخدامك للبرنامج." },
  {
    li: "تعتبر مسؤول مسؤولية تامة عن كافة العمليات و التحويلات التي تتم في حسابك.",
  },
  {
    li: "استخدامك البرنامج بشكل غير لائق وغير أخلاقي و محاولتك التحايل والإلتفاف على البرنامج يحملك كامل المسؤولية ويعرضك للمسألة.",
  },
  {
    li: "نحن غير مسؤولين عن أي عمليات احتيال تتعرض لها نتيجة استخدامك النسخ المزورة أو بالطرق الأخرى.",
  },
  {
    li: "لا يحق لك استخدام البرنامج في الأغراض الغير شرعية او المخالفة للأنظمة والقوانين المعمول بها.",
  },
  {
    li: "يحق لنا ايقاف حسابك في حال مخالفتك للاتفاقية أو بموجب امر قضائي دون الرجوع إليك.",
  },
  {
    li: "يتم حل كافة المسائل القضائية من خلال المحاكم التابعة للسلطة المحلية.",
  },
  {
    li: "نحن نحتفظ بالحق في تغيير أو تعديل هذه الاتفاقية في أي وقت, دون ضرورة إبلاغك وإنما الإعلان عن ذلك بالطريقة التي نراها مناسبة ويعتبر استمرارك في استخدام البرنامج بعد إجراء أي تغييرات أو تعديلات على هذه الاتفاقية قبولاً منك لهذه التغييرات أو التعديلات.",
  },
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
export const featuresCards = async (): Promise<FeaturesCardsType> => {
  const t = await getTranslations("features.sections");
  return [
    {
      image: services.src,
      title: t("services.title"),
      description: t("services.description"),
    },
    {
      image: convert.src,
      title: t("convert.title"),
      description: t("convert.description"),
    },
    {
      image: flash.src,
      title: t("flash.title"),
      description: t("flash.description"),
    },
    {
      image: user.src,
      title: t("user.title"),
      description: t("user.description"),
    },
    {
      image: shield.src,
      title: t("shield.title"),
      description: t("shield.description"),
    },
    {
      image: paper.src,
      title: t("paper.title"),
      description: t("paper.description"),
    },
  ];
};

export const faqCategories = async (): Promise<FaqCategorie[]> => {
  const t = await getTranslations("faqPage.category");
  return [
    { id: "1", name: t("category1.name"), href: "faq/1" },
    {
      id: "2",
      name: t("category2.name"),
      href: "faq/2",
    },
    { id: "3", name: t("category3.name"), href: "faq/3" },
    { id: "4", name: t("category4.name"), href: "faq/4" },
    { id: "5", name: t("category5.name"), href: "faq/5" },
    { id: "6", name: t("category6.name"), href: "faq/6" },
  ];
};

export const faqWithCategories = async (): Promise<faqsWithCategorie[]> => {
  const t = await getTranslations("faqPage.category");
  return [
    {
      categoryName: t("category1.name"),
      categoryId: "1",
      questions: [
        {
          question: t("category1.questions.q1.question"),
          answer: t("category1.questions.q1.answer"),
        },
        {
          question: t("category1.questions.q2.question"),
          answer: t("category1.questions.q2.answer"),
        },
        {
          question: t("category1.questions.q3.question"),
          answer: t("category1.questions.q3.answer"),
        },
        {
          question: t("category1.questions.q4.question"),
          answer: t("category1.questions.q4.answer"),
        },
        {
          question: t("category1.questions.q5.question"),
          answer: t("category1.questions.q5.answer"),
        },
        {
          question: t("category1.questions.q6.question"),
          answer: t("category1.questions.q6.answer"),
        },
        {
          question: t("category1.questions.q7.question"),
          answer: t("category1.questions.q7.answer"),
        },
        {
          question: t("category1.questions.q8.question"),
          answer: t("category1.questions.q8.answer"),
        },
        {
          question: t("category1.questions.q9.question"),
          answer: t("category1.questions.q9.answer"),
        },
        {
          question: t("category1.questions.q10.question"),
          answer: t("category1.questions.q10.answer"),
        },
        {
          question: t("category1.questions.q11.question"),
          answer: t("category1.questions.q11.answer"),
        },
        {
          question: t("category1.questions.q12.question"),
          answer: t("category1.questions.q12.answer"),
        },
        {
          question: t("category1.questions.q13.question"),
          answer: t("category1.questions.q13.answer"),
        },
        {
          question: t("category1.questions.q14.question"),
          answer: t("category1.questions.q14.answer"),
        },
        {
          question: t("category1.questions.q15.question"),
          answer: t("category1.questions.q15.answer"),
        },
        {
          question: t("category1.questions.q16.question"),
          answer: t("category1.questions.q16.answer"),
        },
        {
          question: t("category1.questions.q17.question"),
          answer: t("category1.questions.q17.answer"),
        },
      ],
    },
    {
      categoryName: t("category2.name"),
      categoryId: "2",
      questions: [
        {
          question: t("category2.questions.q1.question"),
          answer: t("category2.questions.q1.answer"),
        },
        {
          question: t("category2.questions.q2.question"),
          answer: t("category2.questions.q2.answer"),
        },
        {
          question: t("category2.questions.q3.question"),
          answer: t("category2.questions.q3.answer"),
        },
        {
          question: t("category2.questions.q4.question"),
          answer: t("category2.questions.q4.answer"),
        },
        {
          question: t("category2.questions.q5.question"),
          answer: t("category2.questions.q5.answer"),
        },
        {
          question: t("category2.questions.q6.question"),
          answer: t("category2.questions.q6.answer"),
        },
        {
          question: t("category2.questions.q7.question"),
          answer: t("category2.questions.q7.answer"),
        },
        {
          question: t("category2.questions.q8.question"),
          answer: t("category2.questions.q8.answer"),
        },
        {
          question: t("category2.questions.q9.question"),
          answer: t("category2.questions.q9.answer"),
        },
        {
          question: t("category2.questions.q10.question"),
          answer: t("category2.questions.q10.answer"),
        },
        {
          question: t("category2.questions.q11.question"),
          answer: t("category2.questions.q11.answer"),
        },
        {
          question: t("category2.questions.q12.question"),
          answer: t("category2.questions.q12.answer"),
        },
        {
          question: t("category2.questions.q13.question"),
          answer: t("category2.questions.q13.answer"),
        },
        {
          question: t("category2.questions.q14.question"),
          answer: t("category2.questions.q14.answer"),
        },
      ],
    },
    {
      categoryName: t("category3.name"),
      categoryId: "3",
      questions: [
        {
          question: t("category3.questions.q1.question"),
          answer: t("category3.questions.q1.answer"),
        },
        {
          question: t("category3.questions.q2.question"),
          answer: t("category3.questions.q2.answer"),
        },
        {
          question: t("category3.questions.q3.question"),
          answer: t("category3.questions.q3.answer"),
        },
        {
          question: t("category3.questions.q4.question"),
          answer: t("category3.questions.q4.answer"),
        },
      ],
    },
    {
      categoryName: t("category4.name"),
      categoryId: "4",
      questions: [
        {
          question: t("category4.questions.q1.question"),
          answer: t("category4.questions.q1.answer"),
        },
        {
          question: t("category4.questions.q2.question"),
          answer: t("category4.questions.q2.answer"),
        },
        {
          question: t("category4.questions.q3.question"),
          answer: t("category4.questions.q3.answer"),
        },
        {
          question: t("category4.questions.q4.question"),
          answer: t("category4.questions.q4.answer"),
        },
        {
          question: t("category4.questions.q5.question"),
          answer: t("category4.questions.q5.answer"),
        },
        {
          question: t("category4.questions.q6.question"),
          answer: t("category4.questions.q6.answer"),
        },
        {
          question: t("category4.questions.q7.question"),
          answer: t("category4.questions.q7.answer"),
        },
        {
          question: t("category4.questions.q8.question"),
          answer: t("category4.questions.q8.answer"),
        },
        {
          question: t("category4.questions.q9.question"),
          answer: t("category4.questions.q9.answer"),
        },
        {
          question: t("category4.questions.q10.question"),
          answer: t("category4.questions.q10.answer"),
        },
        {
          question: t("category4.questions.q11.question"),
          answer: t("category4.questions.q11.answer"),
        },
        {
          question: t("category4.questions.q12.question"),
          answer: t("category4.questions.q12.answer"),
        },
        {
          question: t("category4.questions.q13.question"),
          answer: t("category4.questions.q13.answer"),
        },
        {
          question: t("category4.questions.q14.question"),
          answer: t("category4.questions.q14.answer"),
        },
        {
          question: t("category4.questions.q15.question"),
          answer: t("category4.questions.q15.answer"),
        },
        {
          question: t("category4.questions.q16.question"),
          answer: t("category4.questions.q16.answer"),
        },
        {
          question: t("category4.questions.q17.question"),
          answer: t("category4.questions.q17.answer"),
        },
        {
          question: t("category4.questions.q18.question"),
          answer: t("category4.questions.q18.answer"),
        },
        {
          question: t("category4.questions.q19.question"),
          answer: t("category4.questions.q19.answer"),
        },
      ],
    },
    {
      categoryName: t("category5.name"),
      categoryId: "5",
      questions: [
        {
          question: t("category5.questions.q1.question"),
          answer: t("category5.questions.q1.answer"),
        },
        {
          question: t("category5.questions.q2.question"),
          answer: t("category5.questions.q2.answer"),
        },
        {
          question: t("category5.questions.q3.question"),
          answer: t("category5.questions.q3.answer"),
        },
        {
          question: t("category5.questions.q4.question"),
          answer: t("category5.questions.q4.answer"),
        },
        {
          question: t("category5.questions.q5.question"),
          answer: t("category5.questions.q5.answer"),
        },
        {
          question: t("category5.questions.q6.question"),
          answer: t("category5.questions.q6.answer"),
        },
        {
          question: t("category5.questions.q7.question"),
          answer: t("category5.questions.q7.answer"),
        },
        {
          question: t("category5.questions.q8.question"),
          answer: t("category5.questions.q8.answer"),
        },
        {
          question: t("category5.questions.q9.question"),
          answer: t("category5.questions.q9.answer"),
        },
        {
          question: t("category5.questions.q10.question"),
          answer: t("category5.questions.q10.answer"),
        },
        {
          question: t("category5.questions.q11.question"),
          answer: t("category5.questions.q11.answer"),
        },
        {
          question: t("category5.questions.q12.question"),
          answer: t("category5.questions.q12.answer"),
        },
        {
          question: t("category5.questions.q13.question"),
          answer: t("category5.questions.q13.answer"),
        },
      ],
    },
    {
      categoryName: t("category6.name"),
      categoryId: "6",
      questions: [
        {
          question: "t('category6.questions.q1.question')",
          answer: "t('category6.questions.q1.answer')",
        },
        {
          question: "t('category6.questions.q2.question')",
          answer: "t('category6.questions.q2.answer')",
        },
        {
          question: "t('category6.questions.q3.question')",
          answer: "t('category6.questions.q3.answer')",
        },
        {
          question: "t('category6.questions.q4.question')",
          answer: "t('category6.questions.q4.answer')",
        },
        {
          question: "t('category6.questions.q5.question')",
          answer: "t('category6.questions.q5.answer')",
        },
        {
          question: "t('category6.questions.q6.question')",
          answer: "t('category6.questions.q6.answer')",
        },
        {
          question: "t('category6.questions.q7.question')",
          answer: "t('category6.questions.q7.answer')",
        },
        {
          question: "t('category6.questions.q8.question')",
          answer: "t('category6.questions.q8.answer')",
        },
        {
          question: "t('category6.questions.q9.question')",
          answer: "t('category6.questions.q9.answer')",
        },
        {
          question: "t('category6.questions.q10.question')",
          answer: "t('category6.questions.q10.answer')",
        },
        {
          question: "t('category6.questions.q11.question')",
          answer: "t('category6.questions.q11.answer')",
        },
      ],
    },
  ];
};
