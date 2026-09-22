'use client';

import { applyThemeClass, getStoredPreferences, setStoredPreferences, type ThemeMode } from '@/lib/preferences';
import { useCallback, useEffect, useState } from 'react';

export function useResolvedTheme(): 'light' | 'dark' {
  const [resolved, setResolved] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const update = () => {
      setResolved(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    window.addEventListener('theme-change', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('theme-change', update);
    };
  }, []);

  return resolved;
}

function useThemeObserver(onUpdate: () => void) {
  useEffect(() => {
    const observer = new MutationObserver(onUpdate);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    window.addEventListener('theme-change', onUpdate);

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => {
      if (getStoredPreferences().theme === 'system') {
        applyThemeClass('system');
        onUpdate();
      }
    };
    media.addEventListener('change', handleMediaChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('theme-change', onUpdate);
      media.removeEventListener('change', handleMediaChange);
    };
  }, [onUpdate]);
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  const syncTheme = useCallback(() => {
    const p = getStoredPreferences();
    setThemeState(p.theme);
    setResolvedTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    syncTheme();
    setMounted(true);
  }, [syncTheme]);

  useThemeObserver(syncTheme);

  const setTheme = (nextTheme: ThemeMode) => {
    setStoredPreferences({ theme: nextTheme });
    setThemeState(nextTheme);
    const resolved = applyThemeClass(nextTheme);
    setResolvedTheme(resolved);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: resolved }));
  };

  return { theme, resolvedTheme, setTheme, mounted };
}
