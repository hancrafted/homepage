'use client';
// Switches application locale preserving current page path and updates preferences

import { useLocale } from '@/i18n/context';
import { usePathname, useRouter } from '@/i18n/navigation';
import { setStoredPreferences, type LocaleCode } from '@/lib/preferences';

export function LocaleSwitcher() {
  const currentLocale = useLocale();
  const cleanPath = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: LocaleCode) {
    if (nextLocale === currentLocale) return;
    setStoredPreferences({ locale: nextLocale });
    const target = nextLocale === 'de' ? (cleanPath === '/' ? '/de/' : `/de${cleanPath}`) : cleanPath;
    router.push(target);
  }

  return (
    <div className="flex items-center rounded-lg border bg-muted/40 p-0.5 text-xs font-mono font-medium">
      <button
        type="button"
        onClick={() => switchLocale('en')}
        className={`rounded px-2 py-1 transition-all ${
          currentLocale === 'en'
            ? 'bg-background text-foreground shadow-sm font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Switch to English"
        data-locale-switch="en"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchLocale('de')}
        className={`rounded px-2 py-1 transition-all ${
          currentLocale === 'de'
            ? 'bg-background text-foreground shadow-sm font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Auf Deutsch wechseln"
        data-locale-switch="de"
      >
        DE
      </button>
    </div>
  );
}
