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
    default: "تاس و مهره (TasoMohreh) - مرجع بازی‌های فکری و رومیزی",
    template: "%s | تاس و مهره (TasoMohreh)",
  },
  description: "وب‌سایت تاس و مهره (TasoMohreh) - مرجع تخصصی نقد، بررسی، معرفی و تحلیل مهارتی بازی‌های فکری و رومیزی فیزیکی ایرانی و بین‌المللی.",
  keywords: ["تاس و مهره", "tasomohreh", "board game", "بازی فکری", "بازی رومیزی", "منچ", "استوژیت", "کاتان", "شطرنج", "تخته نرد", "تحلیل مهارت"],
  authors: [{ name: "تاس و مهره (TasoMohreh)" }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://tasomohreh.ir",
    siteName: "تاس و مهره (TasoMohreh)",
    title: "تاس و مهره (TasoMohreh) - مرجع بازی‌های فکری و رومیزی",
    description: "وب‌سایت تاس و مهره (TasoMohreh) - مرجع تخصصی نقد، بررسی، معرفی و تحلیل مهارتی بازی‌های فکری و رومیزی فیزیکی ایرانی و بین‌المللی.",
  },
  twitter: {
    card: "summary_large_image",
    title: "تاس و مهره (TasoMohreh) - مرجع بازی‌های فکری و رومیزی",
    description: "وب‌سایت تاس و مهره (TasoMohreh) - مرجع تخصصی نقد، بررسی، معرفی و تحلیل مهارتی بازی‌های فکری و رومیزی فیزیکی ایرانی و بین‌المللی.",
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

