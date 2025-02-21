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
      const response = await postData("/api/Authentication/checkVerifications",otpData ); // إرسال البيانات عبر API succeeded
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

  const onChange = async (event, fieldName) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      console.log(image);
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
    <div className="mx-auto pt-5 lg:bg-none bg-cover bg-center bg-[url(../assets/images/verification-bg.svg)]">
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
                    {...register("taxNumber")}
                    type="text"
                    placeholder="رقم التعريف الضريبي"
                  />
                  {errors.taxNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.taxNumber.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    ملخص عن أنشطة الحساب
                  </label>
                  <Textarea
                    placeholder="اكتب هنا"
                    {...register("summary")}
                    className="w-full mt-1 bg-transparent border-[1px] border-gray-400 p-3 rounded-md outline-none capitalize focus:border-gray-600"
                  />
                  {errors.summary && (
                    <p className="text-red-500 text-sm">
                      {errors.summary.message}
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
                  <div className="flex flex-col" dir="auto">
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {fileNames.commercialRegisterPhoto ||"صورة السجل التجاري"}
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("commercialRegisterPhoto", {
                          onChange: (e) =>
                            onChange(e, "commercialRegisterPhoto"), // تمرير الدالة هنا
                        })}
                      />
                    </label>
                    {errors.commercialRegisterPhoto && (
                      <p className="text-red-500 text-sm">
                        {errors.commercialRegisterPhoto.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    صورة رخصة مزاولة مهنة
                  </label>
                  <div className="flex flex-col" dir="auto">
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {fileNames.licensePhoto || "صورة رخصة مزاولة مهنة"}
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("licensePhoto", {
                          onChange: (e) => onChange(e, "licensePhoto"), // تمرير الدالة هنا
                        })}
                      />{" "}
                    </label>
                    {errors.licensePhoto && (
                      <p className="text-red-500 text-sm">
                        {errors.licensePhoto.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    صورة وثيقة تحمل الرقم الفيزيائي
                  </label>
                  <div className="flex flex-col" dir="auto">
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {fileNames.physicalAddressImage || "صورة وثيقة تحمل الرقم الفيزيائي"}
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("physicalAddressImage", {
                          onChange: (e) => onChange(e, "physicalAddressImage"), // تمرير الدالة هنا
                        })}
                      />
                    </label>
                    {errors.physicalAddressImage && (
                      <p className="text-red-500 text-sm">
                        {errors.physicalAddressImage.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    صورة هوية المالك
                  </label>
                  <div className="flex flex-col" dir="auto">
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {fileNames.ownerIdentityImageFS || "الوجه الامامي"}
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("ownerIdentityImageFS", {
                          onChange: (e) => onChange(e, "ownerIdentityImageFS"), // تمرير الدالة هنا
                        })}
                      />
                    </label>
                    {errors.ownerIdentityImageFS && (
                      <p className="text-red-500 text-sm">
                        {errors.ownerIdentityImageFS.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mt-2" dir="auto">
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {fileNames.ownerIdentityImageBS || "الوجه الخلفي"}
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("ownerIdentityImageBS", {
                          onChange: (e) => onChange(e, "ownerIdentityImageBS"), // تمرير الدالة هنا
                        })}
                      />
                    </label>
                    {errors.ownerIdentityImageBS && (
                      <p className="text-red-500 text-sm">
                        {errors.ownerIdentityImageBS.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    صورة هوية المفوض
                  </label>
                  <div className="flex flex-col" dir="auto">
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {fileNames.commissionerIdentityImageFS ||
                          " الوجه الامامي"}
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("commissionerIdentityImageFS", {
                          onChange: (e) =>
                            onChange(e, "commissionerIdentityImageFS"), // تمرير الدالة هنا
                        })}
                      />
                    </label>
                    {errors.commissionerIdentityImageFS && (
                      <p className="text-red-500 text-sm">
                        {errors.commissionerIdentityImageFS.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mt-2" dir="auto">
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {fileNames.commissionerIdentityImageBS ||
                          " الوجه الخلفي"}
                      </span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("commissionerIdentityImageBS", {
                          onChange: (e) =>
                            onChange(e, "commissionerIdentityImageBS"), // تمرير الدالة هنا
                        })}
                      />{" "}
                    </label>
                    {errors.commissionerIdentityImageBS && (
                      <p className="text-red-500 text-sm">
                        {errors.commissionerIdentityImageBS.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* أزرار التنقل */}
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
