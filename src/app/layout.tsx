import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PayBorsa - Kitlesel Fonlama Payları Alım Satım Platformu",
  description: "Türkiye'nin ilk kitlesel fonlama pay alım satım platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100`}>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  PayBorsa
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-6">
                <Link 
                  href="/campaigns" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Kampanyalar
                </Link>
                <Link 
                  href="/trade" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Al/Sat
                </Link>
                <Link 
                  href="/market" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Pazar
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-4">
                <Link 
                  href="/auth/login"
                  className="px-4 py-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link 
                  href="/auth/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex items-center gap-1 hover:from-blue-600 hover:to-purple-600 transition-all"
                >
                  Kayıt Ol
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 hover:bg-gray-800 rounded-lg">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
