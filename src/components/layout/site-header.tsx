import Link from "next/link";

import { getSiteContent } from "@/content/site-content";
import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site-config";

import { LocaleSelect } from "./locale-select";
import { ThemeToggle } from "./theme-toggle";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = getSiteContent(locale);

  return (
    <header className="sticky top-0 z-50 border-b bg-[color:color-mix(in_srgb,var(--color-bg)_90%,transparent)] backdrop-blur">
      <div className="app-shell flex min-h-20 items-center gap-4 py-4">
        <Link className="text-lg font-semibold tracking-[0.12em] text-[var(--color-fg)]" href={`/${locale}`}>
          {copy.siteName}
        </Link>

        <nav className="hidden flex-1 md:block" aria-label="Primary">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href={`/${locale}#services`}>{copy.nav.services}</Link>
            </li>
            <li>
              <Link href={`/${locale}#methods`}>{copy.nav.methods}</Link>
            </li>
            <li>
              <Link href={`/${locale}/about`}>{copy.nav.about}</Link>
            </li>
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <LocaleSelect currentLocale={locale} label={copy.utilities.language} />
          <ThemeToggle />
          <Link className="ghost-control" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
          <Link className="ghost-control" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link className="primary-cta" href={`/${locale}#book-intro`}>
            {copy.headerCta}
          </Link>
        </div>

        <details className="relative ml-auto md:hidden">
          <summary className="summary-reset ghost-control cursor-pointer list-none">{copy.utilities.menu}</summary>
          <div className="absolute right-0 mt-3 w-72 space-y-4 rounded-[1.5rem] border bg-[var(--color-bg)] p-4 shadow-[var(--shadow-header)]">
            <nav aria-label="Mobile">
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link href={`/${locale}#services`}>{copy.nav.services}</Link>
                </li>
                <li>
                  <Link href={`/${locale}#methods`}>{copy.nav.methods}</Link>
                </li>
                <li>
                  <Link href={`/${locale}/about`}>{copy.nav.about}</Link>
                </li>
              </ul>
            </nav>
            <div className="grid gap-3">
              <LocaleSelect currentLocale={locale} label={copy.utilities.language} />
              <ThemeToggle />
              <Link className="ghost-control" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </Link>
              <Link className="ghost-control" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </Link>
              <Link className="primary-cta" href={`/${locale}#book-intro`}>
                {copy.headerCta}
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}