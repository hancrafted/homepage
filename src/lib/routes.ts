import { isLocale, type Locale } from "@/lib/i18n/config";

export function stripLocaleFromPathname(pathname: string): string {
  const [pathWithoutQuery] = pathname.split("?");
  const segments = pathWithoutQuery.split("/");
  const firstSegment = segments[1];

  if (!firstSegment || !isLocale(firstSegment)) {
    return pathWithoutQuery || "/";
  }

  const nextPath = segments.slice(2).join("/");

  return nextPath ? `/${nextPath}` : "/";
}

export function localizePath(locale: Locale, pathname: string): string {
  const cleanPath = stripLocaleFromPathname(pathname);

  return cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;
}