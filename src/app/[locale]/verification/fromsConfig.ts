import { DynamicForm } from "@/app/utils/types";

export const businessForm = (): DynamicForm => {
  return {
    id: "business",
    title: "Business Account Documentation",
    type: "stipper",
    fields: {
      email: {
        type: "email",
        label: "البريد الالكتروني",
        placeholder: "البريد الالكتروني",
        name: "email",
      },
      accountNumber: {
        type: "text",
        label: "رقم الحساب",
        placeholder: "رقم الحساب",
        name: "accountNumber",
      },
      userName: {
        type: "text",
        label: "اسم الحساب",
        placeholder: "اسم الحساب",
        name: "userName",
      },
      phoneNumber: {
        type: "text",
        label: "رقم الهاتف",
        placeholder: "رقم الهاتف",
        name: "phoneNumber",
        maxLength: 10,
      },
      taxNumber: {
        type: "text",
        label: "رقم التعريف الضريبي",
        placeholder: "رقم التعريف الضريبي",
        name: "taxNumber",
      },
      summary: {
        type: "textarea",
        label: " ملخص عن أنشطة الحساب",
        placeholder: "اكتب هنا",
        name: "summary",
      },
      commercialRegisterPhoto: {
        type: "file",
        label: "صورة السجل التجاري",
        placeholder: "صورة السجل التجاري",
        name: "commercialRegisterPhoto",
      },
      licensePhoto: {
        type: "file",
        label: "صورة رخصة مزاولة مهنة",
        placeholder: "صورة رخصة مزاولة مهنة",
        name: "licensePhoto",
      },
      physicalAddressImage: {
        type: "file",
        label: "صورة وثيقة تحمل الرقم الفيزيائي",
        placeholder: "صورة وثيقة تحمل الرقم الفيزيائي",
        name: "physicalAddressImage",
      },
      ownerIdentityImageFS: {
        type: "file",
        label: "صورة هوية المالك",
        placeholder: "الوجه الامامي",
        name: "ownerIdentityImageFS",
      },
      ownerIdentityImageBS: {
        type: "file",
        label: "صورة هوية المالك",
        placeholder: "الوجه الخلفي",
        name: "ownerIdentityImageBS",
      },
      commissionerIdentityImageFS: {
        type: "file",
        label: "صورة هوية المفوض",
        placeholder: "الوجه الامامي",
        name: "commissionerIdentityImageFS",
      },
      commissionerIdentityImageBS: {
        type: "file",
        label: "صورة هوية المفوض",
        placeholder: "الوجه الخلفي",
        name: "commissionerIdentityImageBS",
      },
    },
    endpoint: { sendOtp: { url: "exapmle.com", method: "POST" } },
  };
};


export const organizationForm = (): DynamicForm => {
  return {
    id: "organization",
    title: "Organization Account Documentation",
    type: "stipper",
    fields: {
      email: {
        type: "email",
        label: "البريد الالكتروني",
        placeholder: "البريد الالكتروني",
        name: "email",
      },
      accountNumber: {
        type: "text",
        label: "رقم الحساب",
        placeholder: "رقم الحساب",
        name: "accountNumber",
      },
      userName: {
        type: "text",
        label: "اسم الحساب",
        placeholder: "اسم الحساب",
        name: "userName",
      },
      phoneNumber: {
        type: "text",
        label: "رقم الهاتف المربوط بالحساب",
        placeholder: "رقم الهاتف المربوط بالحساب",
        name: "phoneNumber",
        maxLength: 10,
      },
      taxNumber: {
        type: "text",
        label: "رقم التعريف الضريبي",
        placeholder: "رقم التعريف الضريبي",
        name: "taxNumber",
      },
      summary: {
        type: "textarea",
        label: " ملخص عن أنشطة الحساب",
        placeholder: "اكتب هنا",
        name: "summary",
      },
      commercialRegisterPhoto: {
        type: "file",
        label: "صورة الترخيص الممنوح",
        placeholder: "صورة الترخيص الممنوح",
        name: "commercialRegisterPhoto",
      },
      physicalAddressImage: {
        type: "file",
        label: "صورة وثيقة تحمل الرقم الفيزيائي",
        placeholder: "صورة وثيقة تحمل الرقم الفيزيائي",
        name: "physicalAddressImage",
      },
      ownerIdentityImageFS: {
        type: "file",
        label: "صورة هوية المالك",
        placeholder: "الوجه الامامي",
        name: "ownerIdentityImageFS",
      },
      ownerIdentityImageBS: {
        type: "file",
        label: "صورة هوية المالك",
        placeholder: "الوجه الخلفي",
        name: "ownerIdentityImageBS",
      },
      commissionerIdentityImageFS: {
        type: "file",
        label: "صورة هوية المفوض",
        placeholder: "الوجه الامامي",
        name: "commissionerIdentityImageFS",
      },
      commissionerIdentityImageBS: {
        type: "file",
        label: "صورة هوية المفوض",
        placeholder: "الوجه الخلفي",
        name: "commissionerIdentityImageBS",
      },
    },
    endpoint: { sendOtp: { url: "exapmle.com", method: "POST" } },
  };
};
