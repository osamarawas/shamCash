import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import NavBar from "../components/header/NavBar";
import { ThemeProvider } from "../components/theme-provider";
import Footer from "../components/Footer/Footer";
import AosInitializer from "../components/Aos"; // استيراد مكون AOS
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { Languages } from "../utils/enums";

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "تطبيق شام كاش",
  description:
    "تطبيق شام كاش - الحل الأمثل لإدارة معاملاتك المالية بسهولة وأمان. أرسل واستلم الأموال بسرعة، مع تجربة استخدام مرنة وآمنة تضمن الشفافية والمصداقية. حمل التطبيق الآن واستمتع بخدماتنا المالية المبتكرة!",
  keywords:
    "تطبيق شام كاش, إرسال الأموال, استلام الأموال, إدارة المعاملات المالية, تحويل الأموال, تطبيق مالي, دفع إلكتروني, خدمات مالية رقمية, أمان مالي",
  applicationName: "ِشام كاش",
  icons: {
    icon: "/logo.svg", // تحديد أيقونة التطبيق
  },
};

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
    <html lang={locale} suppressHydrationWarning>
      <body className={`${notoKufi.className} antialiased`}>
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
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
