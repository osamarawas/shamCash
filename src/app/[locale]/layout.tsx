// RootLayout.tsx
import type { Metadata } from "next";
import { Montserrat, Noto_Kufi_Arabic } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "../components/theme-provider";
import Footer from "../components/Footer/Footer";
import AosInitializer from "../components/Aos";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { Languages } from "../utils/enums";
import clsx from "clsx";
import NavBar from "../components/header/NavBar";
import { Toaster } from "sonner";
import { CircleCheck, CircleX } from "lucide-react";

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-arabic",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-english",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("");
  return {
    title: t("appName"),
    description:
      "تطبيق شام كاش - الحل الأمثل لإدارة معاملاتك المالية بسهولة وأمان. أرسل واستلم الأموال بسرعة، مع تجربة استخدام مرنة وآمنة تضمن الشفافية والمصداقية. حمل التطبيق الآن واستمتع بخدماتنا المالية المبتكرة!",
    keywords:
      "تطبيق شام كاش, إرسال الأموال, استلام الأموال, إدارة المعاملات المالية, تحويل الأموال, تطبيق مالي, دفع إلكتروني, خدمات مالية رقمية, أمان مالي",
    applicationName: "شام كاش",
    icons: {
      icon: "/logo.svg", // تحديد أيقونة التطبيق
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Languages };
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Languages)) {
    notFound();
  }
  const messages = await getMessages({ locale });
  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={clsx(
          locale === "ar" ? notoKufi.variable : montserrat.variable,
          "antialiased"
        )}
        lang={locale}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            themes={["light", "dark"]}
          >
            <AosInitializer />
            <NavBar />
            <Toaster
              icons={{
                success: <CircleCheck className="text-white w-6 h-6 " />,
                error: <CircleX className="text-white w-6 h-6 " />,
              }}
              className={"!flex !items-center !gap-10"}
              toastOptions={{
                classNames: {
                  success: "!bg-success !text-foreground !border-none",
                  error: "!bg-error !text-foreground !border-none",
                },
              }}
            />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
