import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/components/layout/LanguageProvider';
import { AuthProvider } from '@/components/auth/AuthProvider';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Board Game - مرجع بازی‌های فکری و رومیزی",
    template: "%s | Board Game",
  },
  description: "مرجع تخصصی نقد، بررسی، معرفی و تحلیل مهارتی بازی‌های فکری و رومیزی فیزیکی ایرانی و بین‌المللی.",
  keywords: ["board game", "بازی فکری", "بازی رومیزی", "منچ", "استوژیت", "کاتان", "شطرنج", "تخته نرد", "تحلیل مهارت"],
  authors: [{ name: "Board Game" }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://boardgame-arena.ir",
    siteName: "Board Game",
    title: "Board Game - مرجع بازی‌های فکری و رومیزی",
    description: "مرجع تخصصی نقد، بررسی، معرفی و تحلیل مهارتی بازی‌های فکری و رومیزی فیزیکی ایرانی و بین‌المللی.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Board Game - مرجع بازی‌های فکری و رومیزی",
    description: "مرجع تخصصی نقد، بررسی، معرفی و تحلیل مهارتی بازی‌های فکری و رومیزی فیزیکی ایرانی و بین‌المللی.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

