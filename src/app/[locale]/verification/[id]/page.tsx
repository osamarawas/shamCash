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
// import { AlertDialogDemo } from "@/app/components/AlertDialog";
import PathLine from "@/app/components/PathLine";
import { useLocale, useTranslations } from "next-intl";

const formSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  accountNumber: z.string().min(1, "رقم الحساب يجب أن يكون 5 أحرف على الأقل"),
  userName: z.string().min(1, "الحقل مطلوب"),
  phoneNumber: z
    .string()
    .regex(/^09\d{8}$/, "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام فقط")
    .length(10, "رقم الهاتف يجب أن يحتوي على 10 أرقام فقط"),
  taxId: z.string().min(5, "رقم التعريف الضريبي غير صالح"),
  accountSummary: z
    .string()
    .max(2048, "الملخص يجب أن يكون أكثر تفصيلاً")
    .min(1),
  document: z.any().refine((file) => file?.length > 0, "يجب رفع ملف مستندات"),
});

interface FormData {
  phoneNumber: string;
  userName: string;
  accountNumber: string;
  email: string;
  taxId: string;
  accountSummary: string;
  document: FileList;
}

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [openalert, setOpenAlert] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const locale = useLocale();
  const t = useTranslations("");
  const uploadDirection = locale === "ar" ? "ltr" : "rtl";

  // ✅ استخدام React Hook Form مع Zod للتحقق
  const {
    register,
    handleSubmit,
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
  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
    try {
      const otpData = getOtpBody(data); // الحصول على البيانات من getOtpBody
      const response = await postData(
        "/api/Authentication/checkVerifications",
        otpData
      ); // إرسال البيانات عبر API succeeded
      if (true) {
        // setOpenAlert(true);
      } else {
      }
    } catch (error) {
      setOpenAlert(true);
      console.error("❌ فشل الإرسال:", error);
    }
  };

  return (
    <div className=" container mx-auto pt-5">
      <PathLine
        pagename={t("verification.categories.category1.name")}
        backname={t("verification.title")}
      />
      {/* <AlertDialogDemo open={openalert} setOtp={setOtp} otp={otp} /> */}
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        {/* الصورة على اليسار */}
        <div className="hidden lg:block w-1/2">
          <Image
            src={imgVrfication}
            alt="توثيق الحساب"
            width={600}
            height={600}
            className="max-w-full h-auto"
          />
        </div>
        {/* الفورم على اليمين */}
        <div className="w-1/3 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* القسم الأول */}
            {step === 1 && (
              <div dir="auto">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    البريد الإلكتروني
                  </label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="البريد الإلكتروني"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    اسم الحساب
                  </label>
                  <Input type="text" placeholder="اسم الحساب" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    رقم الحساب
                  </label>
                  <Input
                    {...register("accountNumber")}
                    type="text"
                    placeholder="رقم الحساب"
                  />
                  {errors.accountNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.accountNumber.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    اسم الحساب
                  </label>
                  <Input
                    {...register("userName")}
                    type="text"
                    placeholder="اسم الحساب"
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-sm">
                      {errors.userName.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    رقم الهاتف
                  </label>
                  <Input
                    {...register("phoneNumber")}
                    type="text"
                    placeholder="رقم الهاتف"
                    maxLength={10}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    رقم التعريف الضريبي
                  </label>
                  <Input
                    {...register("taxId")}
                    type="text"
                    placeholder="رقم التعريف الضريبي"
                  />
                  {errors.taxId && (
                    <p className="text-red-500 text-sm">
                      {errors.taxId.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    ملخص عن أنشطة الحساب
                  </label>
                  <Textarea
                    placeholder="اكتب هنا"
                    {...register("accountSummary")}
                    className="w-full mt-1 bg-transparent border-[1px] border-gray-400 p-3 rounded-md outline-none capitalize focus:border-gray-600"
                  />
                  {errors.accountSummary && (
                    <p className="text-red-500 text-sm">
                      {errors.accountSummary.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* القسم الثاني */}
            {step === 2 && (
              <div dir="auto">
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    صورة السجل التجاري
                  </label>
                  <div className="flex flex-col" dir={uploadDirection}>
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        صورة السجل التجاري
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input
                        type="file"
                        className="hidden"
                        {...register("document")}
                      />
                    </label>
                    {errors.document && (
                      <p className="text-red-500 text-sm">
                        {errors.document.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    صورة رخصة مزاولة مهنة
                  </label>
                  <div className="flex flex-col" dir={uploadDirection}>
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        صورة رخصة مزاولة مهنة
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    صورة وثيقة تحمل الرقم الفيزيائي
                  </label>
                  <div className="flex flex-col" dir={uploadDirection}>
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        صورة وثيقة تحمل الرقم الفيزيائي
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    صورة هوية المالك
                  </label>
                  <div className="flex flex-col" dir={uploadDirection}>
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        صورة الوجه الأمامي
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input type="file" className="hidden" />
                    </label>
                  </div>
                  <div className="flex flex-col mt-2" dir={uploadDirection}>
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        الوجه الخلفي
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    صورة هوية المفوض
                  </label>
                  <div className="flex flex-col" dir={uploadDirection}>
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        الوجه الأمامي
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input type="file" className="hidden" />
                    </label>
                  </div>
                  <div className="flex flex-col mt-2" dir={uploadDirection}>
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        الوجه الخلفي
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* أزرار التنقل */}
            <div className="flex justify-between mt-4">
              {step === 2 && (
                <Button
                  className="mt-3 bg-inherit text-primary font-semibold hover:bg-gray-300"
                  type="submit"
                >
                  تأكيد
                </Button>
              )}
              {step === 1 ? (
                <Button
                  className="mt-3 bg-inherit text-primary font-semibold hover:bg-gray-300"
                  onClick={() => setStep(2)}
                >
                  التالي
                </Button>
              ) : (
                <Button
                  className="mt-3 bg-inherit text-primary font-semibold hover:bg-gray-300"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  السابق
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
