import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

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
    <html suppressHydrationWarning>
      <body className={` antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem       
          themes={["light", "dark"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
