import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { GlobalChatAssistant } from "@/components/chat/global-chat-assistant";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeScript } from "@/components/layout/theme-script";
import { getSiteContent, siteContent } from "@/content/site-content";
import { isLocale, locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site-config";

import "../../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteContent.en.siteName} | ${siteContent.en.pages.home.title}`,
    template: "%s | Han Che",
  },
  description: siteContent.en.pages.home.description,
};

type LocaleRootLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleRootLayout({
  children,
  params,
}: LocaleRootLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getSiteContent(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansSC.variable} antialiased`}>
        <ThemeScript />
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
          <SiteHeader locale={locale} />
          <main>{children}</main>
          <footer className="border-t bg-[var(--color-bg)]">
            <div className="app-shell flex flex-col gap-3 py-8 text-sm text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
              <p>{copy.footer}</p>
              <Link className="underline decoration-[var(--color-border)] underline-offset-4" href={`/${locale}/about`}>
                {copy.nav.about}
              </Link>
            </div>
          </footer>
          <GlobalChatAssistant locale={locale} />
        </div>
      </body>
    </html>
  );
}