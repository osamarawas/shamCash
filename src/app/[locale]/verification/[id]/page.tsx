"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import imgVrfication from "@/assets/images/verficationimage.svg";
import Image from "next/image";
import { Upload } from "lucide-react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        {/* الصورة على اليسار */}
        <div className="hidden lg:block w-1/2">
          <Image
            src={imgVrfication} // استبدلها بالصورة الفعلية
            alt="توثيق الحساب"
            width={500}
            height={500}
            className="max-w-full h-auto"
          />
        </div>

        {/* الفورم على اليمين */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <div>
            {/* القسم الأول */}
            {step === 1 && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    البريد الإلكتروني
                  </label>
                  <Input type="email" placeholder="البريد الإلكتروني" />
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
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    ملخص عن أنشطة الحساب
                  </label>
                  <Textarea placeholder="اكتب هنا" />
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
                    <Input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            )}

            {/* أزرار التنقل */}
            <div className="flex justify-between mt-4">
              {step === 2 && (
                <Button variant="outline" onClick={() => setStep(1)}>
                  السابق
                </Button>
              )}
              {step === 1 ? (
                <Button onClick={() => setStep(2)}>التالي</Button>
              ) : (
                <Button type="submit">تأكيد</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;