import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import NavBar from "./components/haeder/NavBar";
import { ThemeProvider } from "./components/theme-provider";
import Footer from "./components/Footer/Footer";

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["700", "500", "600"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className={`${notoKufi.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark"]}
        >
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
