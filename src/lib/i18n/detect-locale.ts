import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/config";

function normalizeLanguageToken(token: string) {
  return token.toLowerCase().split(";")[0]?.trim() ?? "";
}

export function detectLocaleFromHeader(acceptLanguage?: string | null): Locale {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  const tokens = acceptLanguage.split(",").map(normalizeLanguageToken);

  for (const token of tokens) {
    if (token.startsWith("de")) {
      return "de";
    }

    if (token.startsWith("zh")) {
      return "zh";
    }

    if (token.startsWith("en")) {
      return "en";
    }
  }

  return DEFAULT_LOCALE;
}

export function resolveLocalePreference(
  cookieLocale?: string | null,
  acceptLanguage?: string | null,
): Locale {
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return detectLocaleFromHeader(acceptLanguage);
}