"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import imgVrfication from "@/assets/images/verficationimage.svg";
import Image from "next/image";
import { Upload } from "lucide-react";

const MultiStepForm = ({ locale } : any) => {
  const [step, setStep] = useState(1);

  // تحديد اتجاه النص بناءً على اللغة
  const uploadDirection = locale === "ar" ? "ltr" : "rtl";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
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
          <div>
            {/* القسم الأول */}
            {step === 1 && (
              <div dir="auto">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    البريد الإلكتروني
                  </label>
                  <Input type="email" placeholder="البريد الإلكتروني" />
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
                  <Input type="text" placeholder="رقم الحساب" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    رقم الهاتف
                  </label>
                  <Input type="text" placeholder="رقم الهاتف" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    رقم التعريف الضريبي
                  </label>
                  <Input type="text" placeholder="رقم التعريف الضريبي" />
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
                      <span className="text-sm text-gray-500 dark:text-gray-400">صورة السجل التجاري</span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    صورة رخصة مزاولة مهنة
                  </label>
                  <div className="flex flex-col" dir={uploadDirection}>
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">صورة رخصة مزاولة مهنة</span>
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
                      <span className="text-sm text-gray-500 dark:text-gray-400">صورة وثيقة تحمل الرقم الفيزيائي</span>
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
                      <span className="text-sm text-gray-500 dark:text-gray-400">صورة الوجه الأمامي</span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input type="file" className="hidden" />
                    </label>
                  </div>
                  <div className="flex flex-col mt-2" dir={uploadDirection}>
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">الوجه الخلفي</span>
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
                      <span className="text-sm text-gray-500 dark:text-gray-400">الوجه الأمامي</span>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <Input type="file" className="hidden" />
                    </label>
                  </div>  
                  <div className="flex flex-col mt-2" dir={uploadDirection}>
                    <label className="justify-between flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">الوجه الخلفي</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;


