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

export type AboutCart = {
  image: HTMLImageElement;
  title: string;
  description: string;
};
export type AboutCarts = AboutCart[];
