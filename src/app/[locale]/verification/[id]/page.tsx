"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Upload } from "lucide-react";
import imgVrfication from "@/assets/images/verficationimage.svg";
import { AlertDialogDemo } from "@/app/components/AlertDialog";
import PathLine from "@/app/components/PathLine";
import { useLocale, useTranslations } from "next-intl";
import { postData } from "@/app/utils/apiService";
import Resizer from "react-image-file-resizer";
import FilleField from "@/app/components/fields/FilleField";
import { businessForm } from "../fromsConfig";
import InputField from "@/app/components/fields/InputField";
import axios from "axios";

// ✅ تعريف مخطط التحقق باستخدام Zod
const formSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  accountNumber: z.string().min(1, "رقم الحساب يجب أن يكون 5 أحرف على الأقل"),
  userName: z.string().min(1, "الحقل مطلوب"),
  phoneNumber: z
    .string()
    .regex(/^09\d{8}$/, "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام فقط")
    .length(10, "رقم الهاتف يجب أن يحتوي على 10 أرقام فقط"),
  taxNumber: z.string().min(5, "رقم التعريف الضريبي غير صالح"),
  summary: z.string().max(2048, "الملخص يجب أن يكون أكثر تفصيلاً").min(1),
  commercialRegisterPhoto: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  licensePhoto: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  ownerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  ownerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  commissionerIdentityImageFS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  commissionerIdentityImageBS: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
  physicalAddressImage: z
    .any()
    .refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
});

interface FormData {
  phoneNumber: string;
  userName: string;
  accountNumber: string;
  email: string;
  taxNumber: string;
  summary: string;
  otpCode: string;
  commercialRegisterPhoto: string;
  licensePhoto: string;
  ownerIdentityImageFS: string;
  ownerIdentityImageBS: string;
  commissionerIdentityImageFS: string;
  commissionerIdentityImageBS: string;
  physicalAddressImage: string;
}

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [openalert, setOpenAlert] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const locale = useLocale();
  const t = useTranslations("");
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const formData = businessForm();
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
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function getOtpBody(data: FormData): Record<string, any> {
    const oData: Record<string, any> = {}; // تحديد نوع الكائن بشكل دقيق
    const fieldData: (keyof FormData)[] = [
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
  const onCheckOtp = async (data: FormData) => {
    try {
      const otpData = getOtpBody(data); // الحصول على البيانات من getOtpBody
      const response = await axios.post(
        `http://test.bokla.me/api/Authentication/checkVerifications`,
        otpData
      );
      console.log(response); // إرسال البيانات عبر API succeeded
      if (true) {
        setOpenAlert(true);
      } else {
      }
    } catch (error) {
      setOpenAlert(true);
      console.error("❌ فشل الإرسال:", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const otpData = { ...data, otpCode: otp }; // إضافة قيمة otp إلى الكائن
      console.log(otpData);
      const response = await postData(
        "/api/CommercialAccounts/verifyAccount",
        otpData
      ); // إرسال البيانات عبر API succeeded
      if (true) {
        // setOpenAlert(true);
      } else {
      }
    } catch (error) {
      // setOpenAlert(true);
      console.error("❌ فشل الإرسال:", error);
    }
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300, // العرض
        300, // الارتفاع
        "JPEG", // الصيغة
        100, // الجودة
        0, // التدوير
        (uri) => {
          resolve(uri as string);
          setBase64Image(uri as string); // حفظ الصورة بصيغة Base64 في حالة useState
        },
        "base64"
      );
    });

  const onChangeFile = async (event, fieldName) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setValue(fieldName, image); // تحديث قيمة `useForm` بالحقل المناسب
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: file.name,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="mx-auto pt-5 lg:bg-none bg-cover bg-center bg-[url(../assets/images/verification-bg.svg)]"
      dir="auto"
    >
      <PathLine
        pagename={t("verification.categories.category1.name")}
        backname={t("verification.title")}
      />
      <AlertDialogDemo
        open={openalert}
        setOtp={setOtp}
        otp={otp}
        sure={handleSubmit(onSubmit)}
      />
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        {/* الصورة على اليسار */}
        <div className="hidden lg:block lg:w-1/2">
          <Image
            src={imgVrfication}
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
              <div dir="auto">
                <div className="mb-4">
                  <InputField
                    {...formData.fields.email}
                    register={register}
                    error={errors?.email}
                  />
                </div>
                <div className="mb-4">
                  <InputField
                    {...formData.fields.accountNumber}
                    register={register}
                    error={errors?.accountNumber}
                  />
                </div>
                <div className="mb-4">
                  <InputField
                    {...formData.fields.userName}
                    register={register}
                    error={errors?.userName}
                  />
                </div>
                <div className="mb-4">
                  <InputField
                    {...formData.fields.phoneNumber}
                    register={register}
                    error={errors?.phoneNumber}
                  />
                </div>
                <div className="mb-4">
                  <InputField
                    {...formData.fields.taxNumber}
                    register={register}
                    error={errors?.taxNumber}
                  />
                </div>
                <div className="mb-4">
                  <InputField
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
                  <FilleField
                    {...formData.fields.commercialRegisterPhoto}
                    register={register}
                    onchangeFile={onChangeFile}
                    error={errors.commercialRegisterPhoto}
                    fileName={fileNames.commercialRegisterPhoto}
                  />
                </div>
                <div className="mb-4">
                  <FilleField
                    {...formData.fields.licensePhoto}
                    register={register}
                    onchangeFile={onChangeFile}
                    error={errors.licensePhoto}
                    fileName={fileNames.licensePhoto}
                  />
                </div>
                <div className="mb-4">
                  <FilleField
                    {...formData.fields.physicalAddressImage}
                    register={register}
                    onchangeFile={onChangeFile}
                    error={errors.physicalAddressImage}
                    fileName={fileNames.physicalAddressImage}
                  />
                </div>
                <div className="mb-4" dir="">
                  <label className="block mb-1 text-sm font-medium text-foreground ">
                    {formData.fields.ownerIdentityImageFS.label}
                  </label>
                  <FilleField
                    {...formData.fields.ownerIdentityImageFS}
                    register={register}
                    onchangeFile={onChangeFile}
                    error={errors.ownerIdentityImageFS}
                    fileName={fileNames.ownerIdentityImageFS}
                  />
                  <div className="flex flex-col mt-2">
                    <FilleField
                      {...formData.fields.ownerIdentityImageBS}
                      register={register}
                      onchangeFile={onChangeFile}
                      error={errors.ownerIdentityImageBS}
                      fileName={fileNames.ownerIdentityImageBS}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
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

            <div className="flex justify-between mt-4">
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
