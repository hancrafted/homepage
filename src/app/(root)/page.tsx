import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { LOCALE_COOKIE } from "@/lib/i18n/config";
import { resolveLocalePreference } from "@/lib/i18n/detect-locale";

export const dynamic = "force-dynamic";

export default async function RootRedirectPage() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = resolveLocalePreference(
    cookieStore.get(LOCALE_COOKIE)?.value,
    headerStore.get("accept-language"),
  );

  redirect(`/${locale}`);
}