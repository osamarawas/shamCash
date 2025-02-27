import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { FormType, resourceType } from "./enums";

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
  path?: string;
};
export type socialMedias = SocialMedia[];

export type FeaturesCards = Card[];

export type FaqCategorie = {
  id: string;
  name: string;
  path: string;
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

export type verificationCategory = {
  id: string;
  name: string;
  path: string;
};

type Endpoint = Record<
  string,
  {
    url: string;
    method: "POST" | "GET" | "PUT" | "DELETE";
  }
>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IFormField<T extends Record<string, any>> {
  name: keyof T;
  label?: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "checkbox"
    | "radio"
    | "select"
    | "hidden"
    | "file"
    | "textarea";
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  options?: IOption;
  id?: string;
  defaultValue?: string;
  readOnly?: boolean;
  error?: ValidationErrors;
  maxLength?: number;
  accept?:
    | "image/.jpg, .jpeg, .png"
    | "video/.mp4,"
    | ".doc,.docx,.xml"
    | ".pdf";
  multiple?: boolean;
  valueAsNumber?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DynamicForm<T extends Record<string, any>> = {
  id?: string; // معرف فريد للنموذج
  type: FormType; // نوع النموذج
  title?: string; // عنوان النموذج
  description?: string; // وصف مختصر للنموذج
  submitText?: string; // نص زر الإرسال
  successMessage?: string; // رسالة نجاح بعد الإرسال
  redirectUrl?: string; // رابط إعادة التوجيه بعد الإرسال
  layout?: {
    columns?: number; // عدد الأعمدة في النموذج (1, 2, 3)
    spacing?: string; // المسافة بين الحقول (مثل "md", "lg")
    alignment?: "left" | "center" | "right"; // محاذاة العناصر
    showLabels?: boolean; // هل يتم عرض العناوين فوق الحقول؟
    showPlaceholders?: boolean; // هل يتم عرض النماذج الفارغة؟
  };
  validations?: {
    requireAllFields?: boolean; // هل يجب ملء جميع الحقول؟
  };
  integrations?: {
    saveToDatabase?: boolean; // هل يتم حفظ البيانات في قاعدة بيانات؟
  };
  permissions?: {
    rolesAllowed?: string[]; // الأدوار المسموح لها باستخدام النموذج
    authenticationRequired?: boolean; // هل يتطلب تسجيل الدخول؟
  };
  fields: Record<string, IFormField<T>>;
  endpoint: Endpoint;
};

export type ValidationErrors = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
>;
export interface IOption {
  label: string;
  value: string;
}
export type AccountType = "organization" | "business";
