import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { AiLabBackground } from "@/components/AiLabBackground";
import { Header } from "@/components/Header";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageProvider } from "@/i18n/language-context";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Lab — AI Sandbox for Experiments",
  description:
    "AI Lab — лаборатория для быстрых экспериментов с UI, ассистентами и маршрутами на Next.js.",
  keywords: [
    "AI Lab",
    "Next.js",
    "AI Assistant",
    "Tailwind CSS",
    "Groq",
    "эксперименты",
    "прототипирование",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "AI Lab — AI Sandbox for Experiments",
    description:
      "AI Lab — лаборатория для быстрых AI-экспериментов: чат ассистент, UI прототипы, маршруты.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "AI Lab",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "AI Lab preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-slate-950 text-slate-50 antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <AiLabBackground />
            <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pt-6 pb-10 sm:px-6">
              <Header center={<LanguageSwitcher />} right={<ThemeSwitcher />} />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
