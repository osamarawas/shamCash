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
  FeaturesCards as FeaturesCardsType,
  socialMedias,
  terms as termsType,
  faqsWithCategorie,
  verificationCategory,
} from "./types";
import { getTranslations } from "next-intl/server";

export const term = async (): Promise<termsType> => {
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
};

export const fAnswerQuestion = async () => {
  const t = await getTranslations("fAnswerQuestions.questions");
  return [
    {
      question: t("q1.question"),
      answer: t("q1.answer"),
    },
    {
      question: t("q2.question"),
      answer: t("q2.answer"),
    },
    {
      question: t("q3.question"),
      answer: t("q3.answer"),
    },
    {
      question: t("q4.question"),
      answer: t("q4.answer"),
    },
  ];
};

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
    path: "https://www.facebook.com/sham.cash1",
  },
  {
    id: crypto.randomUUID(),
    name: "x",
    imgDark: xDark.src,
    imgLight: xLight.src,
    imgDarkHover: xHoverDark,
    imgLightHover: xHoverLight,
    path: "https://x.com/ShamCashX",
  },
  {
    id: crypto.randomUUID(),
    name: "whatsapp",
    imgDark: whatsappDark.src,
    imgLight: whatsappLight.src,
    imgDarkHover: whatsupHover.src,
    imgLightHover: whatsupHover.src,
    path: "https://wa.me/+963983115119",
  },
  {
    id: crypto.randomUUID(),
    name: "telegram",
    imgDark: telegramDark.src,
    imgLight: telegramLight.src,
    imgDarkHover: telegramHover.src,
    imgLightHover: telegramHover.src,
    path: "https://t.me/shamcashapp",
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
    { id: "1", name: t("category1.name"), path: "faq/1" },
    {
      id: "2",
      name: t("category2.name"),
      path: "faq/2",
    },
    { id: "3", name: t("category3.name"), path: "faq/3" },
    { id: "4", name: t("category4.name"), path: "faq/4" },
    { id: "5", name: t("category5.name"), path: "faq/5" },
    { id: "6", name: t("category6.name"), path: "faq/6" },
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
          question: t("category6.questions.q1.question"),
          answer: t("category6.questions.q1.answer"),
        },
        {
          question: t("category6.questions.q2.question"),
          answer: t("category6.questions.q2.answer"),
        },
        {
          question: t("category6.questions.q3.question"),
          answer: t("category6.questions.q3.answer"),
        },
        {
          question: t("category6.questions.q4.question"),
          answer: t("category6.questions.q4.answer"),
        },
        {
          question: t("category6.questions.q5.question"),
          answer: t("category6.questions.q5.answer'"),
        },
        {
          question: t("category6.questions.q6.question"),
          answer: t("category6.questions.q6.answer"),
        },
        {
          question: t("category6.questions.q7.question"),
          answer: t("category6.questions.q7.answer"),
        },
        {
          question: t("category6.questions.q8.question"),
          answer: t("category6.questions.q8.answer"),
        },
        {
          question: t("category6.questions.q9.question"),
          answer: t("category6.questions.q9.answer"),
        },
        {
          question: t("category6.questions.q10.question"),
          answer: t("category6.questions.q10.answer"),
        },
        {
          question: t("category6.questions.q11.question"),
          answer: t("category6.questions.q11.answer"),
        },
      ],
    },
  ];
};

export const verificationCategoryData = async (): Promise<
  verificationCategory[]
> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = await getTranslations("");
  return [
    {
      id: "commercial",
      name: t("verification.categories.commercial.name"),
      path: "/verification/commercial",
    },
    // { id: "2", name: "حساب حكومي", path: "/verification/2" },
    {
      id: "organization",
      name: t("verification.categories.organization.name"),
      path: "/verification/organization",
    },
  ];
};
