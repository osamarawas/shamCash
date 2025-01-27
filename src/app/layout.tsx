import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import NavBar from "./components/haeder/NavBar";

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
    <html lang="en">
      <body className={`${notoKufi.className}  antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
