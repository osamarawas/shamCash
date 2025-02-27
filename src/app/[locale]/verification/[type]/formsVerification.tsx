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
import {
  FormBusinessType,
  FormOrganizationType,
  getFormData,
  getFormSchema,
} from "../fromsConfig";
import InputField from "@/app/components/fields/InputField";
import { setDirctionReverse } from "@/app/utils/helperServer";
import { Languages } from "@/app/utils/enums";
import { useTheme } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { z, ZodSchema } from "zod";
import { AccountType, DynamicForm } from "@/app/utils/types";
import { useParams } from "next/navigation";

const MultiStepForm = async () => {
  const params = useParams();
  const accountType = params.type as AccountType;
  const schema = getFormSchema(accountType) as unknown as ZodSchema<
    FormBusinessType | FormOrganizationType
  >;
  type formType = z.infer<typeof schema>;
  const formData = await getFormData(accountType);
  const [step, setStep] = useState(1);
  const [openalert, setOpenAlert] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const locale = useLocale() as Languages;
  const { resolvedTheme } = useTheme();
  const t = useTranslations("");
  const [errorsApi, setErrorsApi] = useState({
    accountError: false,
    otpError: false,
  });

  const [resolvedFormData, setResolvedFormData] = useState<DynamicForm<formType> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await formData; // حل Promise
      setResolvedFormData(data);
    };
    fetchData();
  }, []);


  const [fileNames, setFileNames] = useState({
    commercialRegisterPhoto: "",
    licensePhoto: "",
    ownerIdentityImageFS: "",
    ownerIdentityImageBS: "",
    commissionerIdentityImageFS: "",
    commissionerIdentityImageBS: "",
    physicalAddressImage: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(schema),
  });

  function getOtpBody(data: formType): Record<string, string> {
    const oData: Record<string, string> = {};
    const fieldData: (keyof formType)[] = [
      "phoneNumber",
      "userName",
      "accountNumber",
      "email",
    ];
    for (let i = 0; i < fieldData.length; i++) {
      oData[fieldData[i]] = data[fieldData[i]];
    }
    return oData;
  }
  const onCheckOtp = async (data: formType) => {
    try {
      const otpData = getOtpBody(data);
      const response = await postData(
        `${formData.endpoint.sendOtp.url}`,
        otpData
      );

      if (response.succeeded) {
        setOpenAlert(true);
        setErrorsApi((prev) => ({
          ...prev,
          accountError: false,
        }));
      } else {
        if (+response.result === 1107) {
          toast("تم ارسال الطلب سابقاً.");
        } else if (+response.result === 1206)
          setErrorsApi((prev) => ({
            ...prev,
            accountError: true,
          }));
      }
    } catch (error) {
      console.error("❌ فشل الإرسال:", error);
      toast.error("فشل في الاتصال بالخادم. يرجى المحاولة لاحقاً.");
    }
  };

  const onSubmit = async (data: formType) => {
    try {
      const otpWithData = { ...data, otpCode: otp };
      const response = await postData(
        `${formData.endpoint.verificationAccount.url}`,
        otpWithData
      );
      console.log(response);
      if (response.succeeded) {
        toast(" تم ارسال الطلب  بنجاح.");
        setOpenAlert(false);
      } else {
        if (+response.result === 1306) {
          console.log("otp is invalid ");
        } else {
          console.log("حصل حذث غير متوقع");
        }
      }
    } catch (error) {
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
      setValue(fieldName as keyof formType, image); // تحديث قيمة `useForm` بالحقل المناسب
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
    setCurrentTheme(resolvedTheme); // تحديث الثيم بعد التحميل
  }, [resolvedTheme]);

  const getImageSrc = () => {
    if (locale === Languages.ARABIC) {
      return currentTheme === "dark" ? imgDarkAr : imgLightAr;
    } else {
      return currentTheme === "dark" ? imgDarkEn : imgLightEn;
    }
  };

  return (
    <div
      className="mx-auto pt-5 lg:bg-none bg-cover bg-center bg-[url(../assets/images/verification-bg.svg)] "
      dir={setDirctionReverse(locale)}
    >
      <div className="container mx-auto">
        <Toaster />
        <PathLine
          pagename={t(`verification.categories.${accountType}.name`)}
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
        <div className="mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
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
      {resolvedFormData && Object.keys(resolvedFormData.fields).length > 0 ? (
        <>
          {step === 1 && (
            <div>
              {Object.entries(resolvedFormData.fields).map(([key, field]) => (
                ["email", "accountNumber", "userName", "phoneNumber", "taxNumber", "summary"].includes(key) && (
                  <div className="mb-4" key={key}>
                    <InputField<formType>
                      {...field}
                      register={register}
                      error={errors?.[key]}
                      classNameExtra={errorsApi.accountError ? "!border-destructive" : ""}
                    />
                  </div>
                )
              ))}
            </div>
          )}

          {step === 2 && (
            <div dir="auto">
              {Object.entries(resolvedFormData.fields).map(([key, field]) => (
                ["commercialRegisterPhoto", "licensePhoto", "physicalAddressImage", "ownerIdentityImageFS", "ownerIdentityImageBS", "commissionerIdentityImageFS", "commissionerIdentityImageBS"].includes(key) && (
                  <div className="mb-4" key={key}>
                    <label className="block mb-1 text-sm font-medium text-foreground">{field.label}</label>
                    <FilleField<formType>
                      {...field}
                      register={register}
                      onchangeFile={onChangeFile}
                      error={errors?.[key]}
                      fileName={fileNames[key]}
                    />
                  </div>
                )
              ))}
            </div>
          )}

          <div className="flex justify-between">
            {step === 2 && (
              <Button className="w-16 mt-3 font-semibold text-md bg-inherit border-none shadow-none text-primary hover:bg-gray-200" type="submit">
                تأكيد
              </Button>
            )}
            <span
              className="w-16 h-9 inline-flex mt-3 py-2 px-4 font-semibold text-md bg-inherit border-none shadow-none text-primary rounded-md white justify-center items-center hover:bg-gray-200 cursor-pointer"
              onClick={() => setStep(step === 1 ? 2 : 1)}
            >
              {step === 1 ? "التالي" : "رجوع"}
            </span>
          </div>
        </>
      ) : (
        <p>لا توجد بيانات لعرضها.</p>
      )}
    </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
