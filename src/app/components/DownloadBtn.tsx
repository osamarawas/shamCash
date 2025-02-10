"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
export default function DownloadBtn() {
    const t =useTranslations();
  const downloadApp = () => {
    window.location.href = "https://shamcash.com/downloads/shamcash.apk";
  };
  return (
    <Button
      className="py-2 px-12 mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg"
      onClick={downloadApp}
    >
     {t('download')}
    </Button>
  );
}
