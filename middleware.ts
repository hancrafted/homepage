import { NextRequest, NextResponse } from "next/server";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
} from "./src/lib/i18n/config";
import { resolveLocalePreference } from "./src/lib/i18n/detect-locale";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathLocale = pathname.split("/")[1];

  if (isLocale(pathLocale)) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, pathLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  }

  const locale = resolveLocalePreference(
    request.cookies.get(LOCALE_COOKIE)?.value,
    request.headers.get("accept-language"),
  );
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname =
    pathname === "/" ? `/${locale}` : `/${DEFAULT_LOCALE}${pathname}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};