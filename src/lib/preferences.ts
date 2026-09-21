export type ThemeMode = 'light' | 'dark';
export type MotionMode = 'system' | 'reduced' | 'full';
export type LocaleCode = 'en' | 'de';

export interface Preferences {
  theme: ThemeMode;
  motion: MotionMode;
  locale: LocaleCode;
}

export const PREFERENCES_KEY = 'homepage-preferences';

export const DEFAULT_PREFERENCES: Preferences = {
  theme: 'light',
  motion: 'system',
  locale: 'en',
};

export function parsePreferences(raw: string | null): Preferences {
  if (!raw) return DEFAULT_PREFERENCES;
  try {
    const parsed = JSON.parse(raw);
    const theme = parsed.theme === 'dark' || parsed.theme === 'light' ? parsed.theme : DEFAULT_PREFERENCES.theme;
    const motion =
      parsed.motion === 'reduced' || parsed.motion === 'full' || parsed.motion === 'system'
        ? parsed.motion
        : DEFAULT_PREFERENCES.motion;
    const locale = parsed.locale === 'de' || parsed.locale === 'en' ? parsed.locale : DEFAULT_PREFERENCES.locale;
    return { theme, motion, locale };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function getStoredPreferences(): Preferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  const raw = window.localStorage.getItem(PREFERENCES_KEY);
  return parsePreferences(raw);
}

export function setStoredPreferences(patch: Partial<Preferences>): Preferences {
  const current = getStoredPreferences();
  const updated: Preferences = { ...current, ...patch };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
    applyThemeClass(updated.theme);
    applyMotionAttribute(updated.motion);
  }
  return updated;
}

export function applyThemeClass(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function applyMotionAttribute(motion: MotionMode): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.motion = motion;
}

export function prefersReducedMotion(prefs?: Preferences): boolean {
  const currentPrefs = prefs ?? getStoredPreferences();
  if (currentPrefs.motion === 'reduced') return true;
  if (currentPrefs.motion === 'full') return false;
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const BLOCKING_PREFERENCES_INLINE_SCRIPT = `
(function() {
  try {
    var raw = localStorage.getItem('${PREFERENCES_KEY}');
    var prefs = null;
    if (raw) {
      prefs = JSON.parse(raw);
    }
    var isDark = false;
    if (prefs && prefs.theme) {
      isDark = prefs.theme === 'dark';
    } else {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (prefs && prefs.motion) {
      document.documentElement.dataset.motion = prefs.motion;
    }
    if (prefs && prefs.locale === 'de' && window.location.pathname === '/') {
      window.location.replace('/de/');
    }
  } catch (e) {}
})();
`.trim();
