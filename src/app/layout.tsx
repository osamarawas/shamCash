import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import NavBar from "./components/haeder/NavBar";
import { ThemeProvider } from "./components/theme-provider";
import Footer from "./components/Footer/Footer";

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Sham Cash",
  description: "Sham Cash Applecation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className={`${notoKufi.className}  antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
