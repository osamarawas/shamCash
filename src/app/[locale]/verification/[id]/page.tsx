"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import imgLightAr from "@/assets/images/verficationimage.svg";
import imgDarkAr from "@/assets/images/verficationimage-dark.svg";
import imgDarkEn from "@/assets/images/imgVrfication-darkEn.svg";
import imgLightEn from "@/assets/images/imgVrfication-lightEn.svg";
import { AlertDialogDemo } from "@/app/components/AlertDialog";
import PathLine from "@/app/components/PathLine";
import { useLocale, useTranslations } from "next-intl";
import { postData } from "@/app/utils/apiService";
import Resizer from "react-image-file-resizer";
import FilleField from "@/app/components/fields/FilleField";
import { businessForm } from "../fromsConfig";
import InputField from "@/app/components/fields/InputField";
import { setDirctionReverse } from "@/app/utils/helperServer";
import { Languages } from "@/app/utils/enums";
import { FormBusinessType } from "../fromsConfig";
import { formSchema } from "../fromsConfig";
import { useTheme } from "next-themes";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [openalert, setOpenAlert] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const locale = useLocale() as Languages;
  const { theme } = useTheme();
  const t = useTranslations("");
  const formData = businessForm();
  const [errorsApi, setErrorsApi] = useState({
    accountError: false,
    otpError: false,
  });
  const [fileNames, setFileNames] = useState({
    commercialRegisterPhoto: "",
    licensePhoto: "",
    ownerIdentityImageFS: "",
    ownerIdentityImageBS: "",
    commissionerIdentityImageFS: "",
    commissionerIdentityImageBS: "",
    physicalAddressImage: "",
    // أضف هنا المزيد من الحقول إذا كنت بحاجة إلى ذلك
  });
  // ✅ استخدام React Hook Form مع Zod للتحقق
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormBusinessType>({
    resolver: zodResolver(formSchema),
  });

  function getOtpBody(data: FormBusinessType): Record<string, string> {
    const oData: Record<string, string> = {}; // تحديد نوع الكائن بشكل دقيق
    const fieldData: (keyof FormBusinessType)[] = [
      "phoneNumber",
      "userName",
      "accountNumber",
      "email",
    ];
    for (let i = 0; i < fieldData.length; i++) {
      oData[fieldData[i]] = data[fieldData[i]];
    }
    return oData; // إرجاع البيانات بعد المعالجة
  }

  // ✅ إرسال البيانات عند التأكيد
  const onCheckOtp = async (data: FormBusinessType) => {
    try {
      const otpData = getOtpBody(data); // الحصول على البيانات من getOtpBody
      const response = await postData(
        `https://192.168.10.90:7089/api/Authentication/checkVerifications`,
        otpData
      );
      console.log(response);
      // إرسال البيانات عبر API succeeded
      if (response.succeeded) {
        setOpenAlert(true);

        setErrorsApi((prev) => ({
          ...prev,
          accountError: false,
        }));
      } else {
        console.log("wwwwww")
        setOpenAlert(false);
        setStep(1);
        setErrorsApi((prev) => ({
          ...prev,
          accountError: true,
        }));
      }
    } catch (error) {
      console.error("❌ فشل الإرسال:", error);
    }
  };

  const onSubmit = async (data: FormBusinessType) => {
    try {
      const otpBody = { ...data, otpCode: otp }; // إضافة قيمة otp إلى الكائن
      const response = await postData(
        `https://192.168.10.90:7089/api/CommercialAccounts/verifyAccount`,
        otpBody
      ); // إرسال البيانات عبر API succeeded
      if (true) {
        setOpenAlert(false);
      } else {
      }
      console.log(response);
    } catch (error) {
      setOpenAlert(true);
      console.error("❌ فشل الإرسال:", error);
    }
  };

  const resizeFile = (file: File): Promise<string> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        3000, // العرض
        3000, // الارتفاع
        "JPEG", // الصيغة
        100, // الجودة
        0, // التدوير
        (uri) => {
          resolve(uri as string);
        },
        "base64"
      );
    });

  const onChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return; // التحقق من وجود الملف
      const image = await resizeFile(file);
      setValue(fieldName as keyof FormBusinessType, image); // تحديث قيمة `useForm` بالحقل المناسب
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: file.name,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // تحديد الصورة بناءً على اللغة والثيم
  const [currentTheme, setCurrentTheme] = useState<string | undefined>();

  useEffect(() => {
    setCurrentTheme(theme); // تحديث الثيم بعد التحميل
  }, [theme]);

  const getImageSrc = () => {
    if (locale === Languages.ARABIC) {
      return currentTheme === "dark" ? imgDarkAr : imgLightAr;
    } else {
      return currentTheme === "dark" ? imgDarkEn : imgLightEn;
    }
  };

  return (
    <div
      className="mx-auto pt-5 lg:bg-none bg-cover bg-center bg-[url(../assets/images/verification-bg.svg)]"
      dir={setDirctionReverse(locale)}
    >
      <PathLine
        pagename={t("verification.categories.category1.name")}
        backname={t("verification.title")}
      />
      <AlertDialogDemo
        open={openalert}
        setOpen={setOpenAlert}
        setOtp={setOtp}
        otp={otp}
        sure={handleSubmit(onSubmit)}
        resend_otp={handleSubmit(onCheckOtp)}
      />
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between ">
        {/* الصورة على اليسار */}
        <div className="hidden lg:block lg:w-1/2">
          <Image
            src={getImageSrc()}
            alt="توثيق الحساب"
            width={600}
            height={600}
            className="max-w-full h-auto"
          />
        </div>
        {/* الفورم على اليمين */}
        <div className="lg:w-1/3 p-8">
          <form onSubmit={handleSubmit(onCheckOtp)}>
            {/* القسم الأول */}
            {step === 1 && (
              <div>
                <div className="mb-4">
                  <InputField<FormBusinessType>
                    {...formData.fields.email}
                    register={register}
                    error={errors?.email}
                    classNameExtra={`${
                      errorsApi.accountError && "!border-destructive "
                    }`}
                  />
                </div>
                <div className="mb-4">
                  <InputField<FormBusinessType>
                    {...formData.fields.accountNumber}
                    register={register}
                    error={errors?.accountNumber}
                    classNameExtra={`${
                      errorsApi.accountError && "!border-destructive  "
                    }`}
                  />
                </div>
                <div className="mb-4">
                  <InputField<FormBusinessType>
                    {...formData.fields.userName}
                    register={register}
                    error={errors?.userName}
                    classNameExtra={`${
                      errorsApi.accountError && "!border-destructive  "
                    }`}
                  />
                </div>
                <div className="mb-4">
                  <InputField<FormBusinessType>
                    {...formData.fields.phoneNumber}
                    register={register}
                    error={errors?.phoneNumber}
                    classNameExtra={`${
                      errorsApi.accountError && "!border-destructive  "
                    }`}
                  />
                </div>
                <div className="mb-4">
                  <InputField<FormBusinessType>
                    {...formData.fields.taxNumber}
                    register={register}
                    error={errors?.taxNumber}
                  />
                </div>
                <div className="mb-4">
                  <InputField<FormBusinessType>
                    {...formData.fields.summary}
                    register={register}
                    error={errors?.summary}
                  />
                </div>
              </div>
            )}

            {/* القسم الثاني */}
            {step === 2 && (
              <div dir="auto">
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-foreground ">
                    {formData.fields.commercialRegisterPhoto.label}
                  </label>
                  <FilleField<FormBusinessType>
                    {...formData.fields.commercialRegisterPhoto}
                    register={register}
                    onchangeFile={onChangeFile}
                    error={errors.commercialRegisterPhoto}
                    fileName={fileNames.commercialRegisterPhoto}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-foreground ">
                    {formData.fields.licensePhoto.label}
                  </label>
                  <FilleField<FormBusinessType>
                    {...formData.fields.licensePhoto}
                    register={register}
                    onchangeFile={onChangeFile}
                    error={errors.licensePhoto}
                    fileName={fileNames.licensePhoto}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-foreground ">
                    {formData.fields.physicalAddressImage.label}
                  </label>
                  <FilleField<FormBusinessType>
                    {...formData.fields.physicalAddressImage}
                    register={register}
                    onchangeFile={onChangeFile}
                    error={errors.physicalAddressImage}
                    fileName={fileNames.physicalAddressImage}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-foreground ">
                    {formData.fields.ownerIdentityImageFS.label}
                  </label>
                  <FilleField<FormBusinessType>
                    {...formData.fields.ownerIdentityImageFS}
                    register={register}
                    onchangeFile={onChangeFile}
                    error={errors.ownerIdentityImageFS}
                    fileName={fileNames.ownerIdentityImageFS}
                  />
                  <div className="flex flex-col mt-2">
                    <FilleField<FormBusinessType>
                      {...formData.fields.ownerIdentityImageBS}
                      register={register}
                      onchangeFile={onChangeFile}
                      error={errors.ownerIdentityImageBS}
                      fileName={fileNames.ownerIdentityImageBS}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-foreground">
                    {formData.fields.ownerIdentityImageFS.label}
                  </label>
                  <div className="flex flex-col  gap-2">
                    <FilleField
                      {...formData.fields.commissionerIdentityImageFS}
                      register={register}
                      onchangeFile={onChangeFile}
                      error={errors.commissionerIdentityImageFS}
                      fileName={fileNames.commissionerIdentityImageFS}
                    />
                    <FilleField
                      {...formData.fields.commissionerIdentityImageBS}
                      register={register}
                      onchangeFile={onChangeFile}
                      error={errors.commissionerIdentityImageBS}
                      fileName={fileNames.commissionerIdentityImageBS}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              {step === 2 && (
                <Button
                  className="mt-3 font-semibold text-md bg-inherit border-none shadow-none text-primary hover:bg-gray-200"
                  type="submit"
                >
                  تأكيد
                </Button>
              )}
              {step === 1 ? (
                <span
                  className="font-semibold mt-3 bg-none text-primary cursor-pointer"
                  onClick={() => setStep(2)}
                >
                  التالي
                </span>
              ) : (
                <span
                  className="font-semibold mt-3 bg-inherit text-primary cursor-pointer"
                  onClick={() => setStep(1)}
                >
                  رجوع
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
