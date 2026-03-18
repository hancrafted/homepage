import type { Metadata } from "next";

import { getSiteContent, siteContent, type PageKey } from "@/content/site-content";
import { locales, type Locale } from "@/lib/i18n/config";

const routeMap: Record<PageKey, string> = {
  home: "",
  about: "/about",
};

export function buildPageMetadata(locale: Locale, page: PageKey): Metadata {
  const content = getSiteContent(locale);
  const copy = content.pages[page];
  const route = routeMap[page];
  const languages = Object.fromEntries(
    locales.map((entry) => [entry, `/${entry}${route}`]),
  );

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${locale}${route}`,
      languages: {
        ...languages,
        "x-default": `/en${route}`,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      siteName: content.siteName || siteContent.en.siteName,
      type: "website",
      url: `/${locale}${route}`,
    },
  };
}