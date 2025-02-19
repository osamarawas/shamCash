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
import { postData } from "@/app/utils/apiService";
import { AlertDialogDemo } from "@/app/components/AlertDialog";

// ✅ تعريف مخطط التحقق باستخدام Zod
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

  // ✅ استخدام React Hook Form مع Zod للتحقق
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  // ✅ التقاط الملفات المرفوعة وتحديث القيمة يدويًا
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setValue("document", event.target.files);
    }
  };

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
    try {
      const otpData = getOtpBody(data); // الحصول على البيانات من getOtpBody
      const response = await postData("/api/Authentication/checkVerifications", otpData); // إرسال البيانات عبر API succeeded
      if(true){
        // setOpenAlert(true);
      }else{
        
      }
    } catch (error) {
      setOpenAlert(true);
      console.error("❌ فشل الإرسال:", error);
    }
  };

console.log(otp)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <AlertDialogDemo open={openalert} setOtp={setOtp} otp={otp} />
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        {/* الصورة على اليسار */}
        <div className="hidden lg:block w-1/2">
          <Image
            src={imgVrfication}
            alt="توثيق الحساب"
            width={500}
            height={500}
            className="max-w-full h-auto"
          />
        </div>

        {/* الفورم على اليمين */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* القسم الأول */}
            {step === 1 && (
              <div>
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
                    {...register("accountSummary")}
                    placeholder="اكتب هنا"
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
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    رفع المستندات الداعمة
                  </label>
                  <label className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      رفع الملف
                    </span>
                    <Input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  {errors.document && (
                    <p className="text-red-500 text-sm">
                      {errors.document.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* أزرار التنقل */}
            <div className="flex justify-between mt-4">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  السابق
                </Button>
              )}
              {step === 1 ? (
                <span onClick={() => setStep(2)}>
                  التالي
                </span>
              ) : (
                <Button type="submit">تأكيد</Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
