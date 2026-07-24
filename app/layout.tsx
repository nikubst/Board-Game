import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/components/layout/LanguageProvider';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NIKOO Art Studio - Creative Design Workspace",
    template: "%s | NIKOO Art Studio",
  },
  description: "A creative workspace for designers to generate ideas, manage projects, and build color palettes.",
  keywords: ["design", "creative", "art", "graphic design", "color palette", "ideas", "projects", "inspiration"],
  authors: [{ name: "NIKOO Art Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nikoo-art-studio.com",
    siteName: "NIKOO Art Studio",
    title: "NIKOO Art Studio - Creative Design Workspace",
    description: "A creative workspace for designers to generate ideas, manage projects, and build color palettes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIKOO Art Studio - Creative Design Workspace",
    description: "A creative workspace for designers to generate ideas, manage projects, and build color palettes.",
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
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
