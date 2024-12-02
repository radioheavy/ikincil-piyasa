import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "İkincil Piyasa",
  description: "Türkiye'nin en güvenilir kitle fonlama platformu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} antialiased bg-gray-950 text-gray-100`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
