import { AccountType, DynamicForm } from "@/app/utils/types";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const businessForm = (): DynamicForm<{
  email: string;
  accountNumber: string;
  userName: string;
  phoneNumber: string;
  taxNumber: string;
  summary: string;
  commercialRegisterPhoto?: string;
  licensePhoto?: string;
  ownerIdentityImageFS?: string;
  ownerIdentityImageBS?: string;
  commissionerIdentityImageFS?: string;
  commissionerIdentityImageBS?: string;
  physicalAddressImage?: string;
}> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations();

  return {
    id: "business",
    title: "Business Account Documentation",
    type: "stipper",
    fields: {
      email: {
        type: "email",
        label: t("verificationForm.email.label"),
        placeholder: t("verificationForm.email.placeholder"),
        name: "email",
      },
      accountNumber: {
        type: "text",
        label: t("verificationForm.account_number.label"),
        placeholder: t("verificationForm.account_number.placeholder"),
        name: "accountNumber",
        maxLength: 16,
      },
      userName: {
        type: "text",
        label: t("verificationForm.account_name.label"),
        placeholder: t("verificationForm.account_name.placeholder"),
        name: "userName",
      },
      phoneNumber: {
        type: "text",
        label: t("verificationForm.account_phone_number.label"),
        placeholder: t("verificationForm.account_phone_number.placeholder"),
        name: "phoneNumber",
        maxLength: 10,
      },
      taxNumber: {
        type: "text",
        label: t("verificationForm.tax_identification_number.label"),
        placeholder: t(
          "verificationForm.tax_identification_number.placeholder"
        ),
        name: "taxNumber",
      },
      summary: {
        type: "textarea",
        label: t("verificationForm.account_activity_summary.label"),
        placeholder: t("verificationForm.account_activity_summary.placeholder"),
        name: "summary",
      },
      commercialRegisterPhoto: {
        type: "file",
        label: t("verificationForm.commercial_register_image.label"),
        placeholder: t(
          "verificationForm.commercial_register_image.placeholder"
        ),
        name: "commercialRegisterPhoto",
        accept: "image/.jpg, .jpeg, .png",
      },
      licensePhoto: {
        type: "file",
        label: t("verificationForm.practice_license_image.label"),
        placeholder: t("verificationForm.practice_license_image.placeholder"),
        name: "licensePhoto",
        accept: "image/.jpg, .jpeg, .png",
      },
      physicalAddressImage: {
        type: "file",
        label: t("verificationForm.physical_address_document.label"),
        placeholder: t(
          "verificationForm.physical_address_document.placeholder"
        ),
        name: "physicalAddressImage",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageFS: {
        type: "file",
        label: t("verificationForm.Manager_id_image.label"),
        placeholder: t("verificationForm.Manager_id_image.placeholder"),
        name: "ownerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageBS: {
        type: "file",
        label: t("verificationForm.Manager_id_image.label"),
        placeholder: t("verificationForm.Manager_id_image.placeholder1"),
        name: "ownerIdentityImageBS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageFS: {
        type: "file",
        label: t("verificationForm.delegate_id_image.label"),
        placeholder: t("verificationForm.delegate_id_image.placeholder"),
        name: "commissionerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageBS: {
        type: "file",
        label: t("verificationForm.delegate_id_image.label"),
        placeholder: t("verificationForm.delegate_id_image.placeholder1"),
        name: "commissionerIdentityImageBS",
        accept: "image/.jpg, .jpeg, .png",
      },
    },
    endpoint: {
      sendOtp: {
        url: "/api/Authentication/checkVerifications",
        method: "POST",
      },
      verificationAccount: {
        url: "/api/CommercialAccounts/verifyAccount",
        method: "POST",
      },
    },
  };
};

export const organizationForm = (): DynamicForm<{
  email: string;
  accountNumber: string;
  userName: string;
  phoneNumber: string;
  taxNumber: string;
  summary: string;
  licensePhoto?: string;
  ownerIdentityImageFS?: string;
  ownerIdentityImageBS?: string;
  commissionerIdentityImageFS?: string;
  commissionerIdentityImageBS?: string;
  physicalAddressImage?: string;
}> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations();

  return {
    id: "organization",
    title: "organization Account Documentation",
    type: "stipper",
    fields: {
      email: {
        type: "email",
        label: t("verificationForm.email.label"),
        placeholder: t("verificationForm.email.placeholder"),
        name: "email",
      },
      accountNumber: {
        type: "text",
        label: t("verificationForm.account_number.label"),
        placeholder: t("verificationForm.account_number.placeholder"),
        name: "accountNumber",
        maxLength: 16,
      },
      userName: {
        type: "text",
        label: t("verificationForm.account_name.label"),
        placeholder: t("verificationForm.account_name.placeholder"),
        name: "userName",
      },
      phoneNumber: {
        type: "text",
        label: t("verificationForm.account_phone_number.label"),
        placeholder: t("verificationForm.account_phone_number.placeholder"),
        name: "phoneNumber",
        maxLength: 10,
      },
      taxNumber: {
        type: "text",
        label: t("verificationForm.tax_identification_number.label"),
        placeholder: t(
          "verificationForm.tax_identification_number.placeholder"
        ),
        name: "taxNumber",
      },
      summary: {
        type: "textarea",
        label: t("verificationForm.account_activity_summary.label"),
        placeholder: t("verificationForm.account_activity_summary.placeholder"),
        name: "summary",
      },

      licensePhoto: {
        type: "file",
        label: t("verificationForm.licensePhotoOrganization.label"),
        placeholder: t("verificationForm.licensePhotoOrganization.placeholder"),
        name: "licensePhoto",
        accept: "image/.jpg, .jpeg, .png",
      },
      physicalAddressImage: {
        type: "file",
        label: t("verificationForm.physical_address_document.label"),
        placeholder: t(
          "verificationForm.physical_address_document.placeholder"
        ),
        name: "physicalAddressImage",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageFS: {
        type: "file",
        label: t("verificationForm.Manager_id_image.label"),
        placeholder: t("verificationForm.Manager_id_image.placeholder"),
        name: "ownerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      ownerIdentityImageBS: {
        type: "file",
        label: t("verificationForm.Manager_id_image.label"),
        placeholder: t("verificationForm.Manager_id_image.placeholder1"),
        name: "ownerIdentityImageBS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageFS: {
        type: "file",
        label: t("verificationForm.delegate_id_image.label"),
        placeholder: t("verificationForm.delegate_id_image.placeholder"),
        name: "commissionerIdentityImageFS",
        accept: "image/.jpg, .jpeg, .png",
      },
      commissionerIdentityImageBS: {
        type: "file",
        label: t("verificationForm.delegate_id_image.label"),
        placeholder: t("verificationForm.delegate_id_image.placeholder1"),
        name: "commissionerIdentityImageBS",
        accept: "image/.jpg, .jpeg, .png",
      },
    },
    endpoint: {
      sendOtp: {
        url: "/api/Authentication/checkVerifications",
        method: "POST",
      },
      verificationAccount: {
        url: "/api/OrganizationAccount/verifyAccount",
        method: "POST",
      },
    },
  };
};

export const businessformSchema = z.object({
  email: z.string().email("errors.invalidEmail").min(1, "errors.required"),
  accountNumber: z.preprocess(
    (val) => Number(val),
    z.number().refine((val) => val.toString().length >= 16, {
      message: "errors.accountNumberLength",
    })
  ),
  userName: z.string().min(1, "errors.required"),
  phoneNumber: z
    .string()
    .regex(/^09\d{8}$/, "errors.invalidPhoneNumber")
    .length(10, "errors.phoneNumberLength"),
  taxNumber: z
    .string()
    .regex(/^\d+$/, "errors.taxNumberDigitsOnly")
    .min(5, "errors.invalidTaxNumber"),
  summary: z
    .string()
    .max(2048, "errors.summaryTooLong")
    .min(1, "errors.required"),

  commercialRegisterPhoto: z
    .any()
    .refine((file) => file?.length > 0, "errors.imageRequired"),
  licensePhoto: z.any().refine((file) => file?.length > 0, "errors.imageRequired"),
  ownerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "errors.imageRequired"),
  ownerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "errors.imageRequired"),
  commissionerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "errors.imageRequired"),
  commissionerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "errors.imageRequired"),
  physicalAddressImage: z
    .any()
    .refine((file) => file?.length > 0, "errors.imageRequired"),
});

export const organizationformSchema = z.object({
  email: z.string().email("errors.invalidEmail").min(1, "errors.required"),
  accountNumber: z.preprocess(
    (val) => Number(val),
    z.number().refine((val) => val.toString().length >= 16, {
      message: "errors.accountNumberLength",
    })
  ),
  userName: z.string().min(1, "errors.required"),
  phoneNumber: z
    .string()
    .regex(/^09\d{8}$/, "errors.invalidPhoneNumber")
    .length(10, "errors.phoneNumberLength"),
  taxNumber: z
    .string()
    .regex(/^\d+$/, "errors.taxNumberDigitsOnly")
    .min(5,"errors.invalidTaxNumber"),
  summary: z
    .string()
    .max(2048, "errors.summaryTooLong")
    .min(1, "errors.required"),
  
  licensePhoto: z.any().refine((file) => file?.length > 0, "errors.imageRequired"),
  ownerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "errors.imageRequired"),
  ownerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "errors.imageRequired"),
  commissionerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "errors.imageRequired"),
  commissionerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "errors.imageRequired"),
  physicalAddressImage: z
    .any()
    .refine((file) => file?.length > 0, "errors.imageRequired"),
});

export type FormBusinessType = z.infer<typeof businessformSchema>;
export type FormOrganizationType = z.infer<typeof organizationformSchema>;

export function getFormSchema(accountType: AccountType) {
  switch (accountType) {
    case "organization":
      return organizationformSchema;
    case "business":
      return businessformSchema;
    default:
      throw new Error(`Invalid form type: ${accountType}`);
  }
}

export function getFormData(accountType: AccountType) {
  switch (accountType) {
    case "organization":
      return organizationForm();
    case "business":
      return businessForm();
    default:
      throw new Error(`Invalid account type: ${accountType}`);
  }
}
