'use client';
// Provides reactive locale state derived from URL pathname and context

import { type LocaleCode } from '@/lib/preferences';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useMemo } from 'react';

interface LocaleContextValue {
  locale: LocaleCode;
}

const LocaleContext = createContext<LocaleContextValue>({ locale: 'en' });

export function LocaleProvider({
  locale: explicitLocale,
  children,
}: {
  locale?: LocaleCode;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || '/';
  const detectedLocale: LocaleCode = pathname === '/de' || pathname.startsWith('/de/') ? 'de' : 'en';
  const activeLocale = explicitLocale ?? detectedLocale;

  const value = useMemo(() => ({ locale: activeLocale }), [activeLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleCode {
  return useContext(LocaleContext).locale;
}
