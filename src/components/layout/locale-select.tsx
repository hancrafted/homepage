"use client";

import {
  LOCALE_COOKIE,
  localeLabels,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { localizePath, stripLocaleFromPathname } from "@/lib/routes";

type LocaleSelectProps = {
  currentLocale: Locale;
  label: string;
};

export function LocaleSelect({ currentLocale, label }: LocaleSelectProps) {
  const handleChange = (nextLocale: Locale) => {
    const pathname = window.location.pathname || "/";
    const query = window.location.search;
    const barePath = stripLocaleFromPathname(pathname);

    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    window.location.assign(`${localizePath(nextLocale, barePath)}${query}`);
  };

  return (
    <label className="flex items-center gap-2 rounded-full border bg-[var(--color-surface)] px-3 py-2 text-sm font-medium">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">🌐</span>
      <select
        aria-label={label}
        className="min-h-8 bg-transparent text-sm outline-none"
        value={currentLocale}
        onChange={(event) => handleChange(event.target.value as Locale)}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeLabels[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}