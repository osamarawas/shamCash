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
import { getMessages } from "next-intl/server";
import { Languages } from "../utils/enums";
import clsx from "clsx";
import NavBar from "../components/header/NavBar";

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

export const metadata: Metadata = {
  title: "تطبيق شام كاش",
  description: "...",
  keywords: "...",
  applicationName: "ِشام كاش",
  icons: {
    icon: "/logo.svg",
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
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
