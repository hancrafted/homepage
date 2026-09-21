'use client';
// Locale-aware navigation wrappers ensuring paths respect localePrefix: as-needed

import { useLocale } from '@/i18n/context';
import { localizePath, stripLocalePrefix } from '@/i18n/path';
import { type LocaleCode } from '@/lib/preferences';
// eslint-disable-next-line no-restricted-imports
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { usePathname as useNextPathname, useRouter as useNextRouter } from 'next/navigation';
import React, { forwardRef, useTransition } from 'react';

export { localizePath, stripLocalePrefix };

export type LinkProps = Omit<NextLinkProps, 'href'> & {
  href: string;
  locale?: LocaleCode;
  className?: string;
  children?: React.ReactNode;
  target?: string;
  rel?: string;
  'data-nav-item'?: string;
  'aria-label'?: string;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, locale: explicitLocale, ...props },
  ref,
) {
  const currentLocale = useLocale();
  const targetLocale = explicitLocale ?? currentLocale;
  const localizedHref = localizePath(href, targetLocale);

  return <NextLink ref={ref} href={localizedHref} {...props} />;
});

Link.displayName = 'LocaleAwareLink';

export function usePathname(): string {
  const rawPathname = useNextPathname() || '/';
  return stripLocalePrefix(rawPathname);
}

export function useRouter() {
  const router = useNextRouter();
  const locale = useLocale();
  const [, startTransition] = useTransition();

  return {
    ...router,
    push: (href: string) => {
      startTransition(() => {
        router.push(localizePath(href, locale));
      });
    },
    replace: (href: string) => {
      startTransition(() => {
        router.replace(localizePath(href, locale));
      });
    },
  };
}

export function redirect(href: string, locale: LocaleCode = 'en'): never {
  const target = localizePath(href, locale);
  if (typeof window !== 'undefined') {
    window.location.replace(target);
  }
  throw new Error(`Redirecting to ${target}`);
}
