import { resourceType } from "./enums";

export type NavLink = {
  id: string;
  title: string;
  Path: string;
};

export type NavLinks = NavLink[];

export type FAnswerQuestion = {
  id: string;
  answer: string;
  question: string;
};
export type FAnswerQuestions = FAnswerQuestion[];

export type Card = {
  image: HTMLImageElement;
  title: string;
  description: string;
};
export type AboutCards = Card[];

export type term = {
  li: string;
};
export type terms = term[];

export type SocialMedia = {
  id: string;
  name: string;
  imgDark: HTMLImageElement;
  imgLight: HTMLImageElement;
  imgDarkHover: HTMLImageElement;
  imgLightHover: HTMLImageElement;
};
export type socialMedias = SocialMedia[];

export type FeaturesCards = Card[];

export type FaqCategorie = {
  id: string;
  name: string;
  href: string;
};

export type faqsWithCategorie = {
  categoryName: string;
  categoryId: string;
  description?: string;
  questions: {
    question: string;
    answer: string;
    resources?: { type: resourceType; url: string }[];
    lastUpdated?: string;
  }[];
};
