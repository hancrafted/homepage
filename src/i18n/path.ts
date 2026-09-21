import { type LocaleCode } from '@/lib/preferences';

export function localizePath(href: string, locale: LocaleCode): string {
  if (!href.startsWith('/') || href.startsWith('//')) {
    return href;
  }
  const cleanHref = href.startsWith('/de/') ? href.slice(3) : href === '/de' ? '/' : href;
  if (locale === 'de') {
    return cleanHref === '/' ? '/de/' : `/de${cleanHref}`;
  }
  return cleanHref;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/de' || pathname === '/de/') {
    return '/';
  }
  if (pathname.startsWith('/de/')) {
    return pathname.slice(3);
  }
  return pathname;
}
