export const locales = ["de", "en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "preferred-locale";

export const localeLabels: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  zh: "中文",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}