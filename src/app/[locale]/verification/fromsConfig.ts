import { DynamicForm } from "@/app/utils/types";

export const businessForm: DynamicForm = {
  id: "business",
  title: "Business Account Documentation",
  type: "stipper",
  fields: [
    {
      name: "email",
      type: "email",
      autoFocus: true,
      placeholder: "البريد الالكتروي",
      label: "البريد الالكتروني",
    },
    {
      name: "email",
      type: "email",
      autoFocus: true,
      placeholder: "البريد الالكتروي",
      label: "البريد الالكتروني",
    },
  ],
  endpoint: { sendOtp: { url: "exapmle.com", method: "POST" } },
};
