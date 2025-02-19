import React from "react";
import PathCete from "../../faq/[cate]/PathCete";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import image_verf from '@/assets/images/verficationimage.svg'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default async function page({ params }) {
  const { id, locale } = params; 

  const t = await getTranslations({ locale }); 
  return (
    <div className="flex  justify-center min-h-screen container mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Illustration Section */}
        <div className="flex justify-center">
            <Image src={image_verf} />
        </div>

        {/* Form Section */}
        <div className="p-6">
          <div>
            <form className="flex flex-col gap-4">
              <Input placeholder="البريد الإلكتروني" />
              <Input placeholder="رقم الحساب" />
              <Input placeholder="رقم الهاتف المرتبط بالحساب" />
              <Input placeholder="رقم التعريف الضريبي" />
              {/* <Textarea placeholder="ملخص عن أنشطة الحساب" className="h-32" /> */}
              <Button className="w-1/4 mt-4">التالي</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

  {/* ID: {id} */}
  {/* <PathCete locale={locale} categoryName={t("searchResults")} /> */}