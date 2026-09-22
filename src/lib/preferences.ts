export type ThemeMode = 'light' | 'dark' | 'system';
export type MotionMode = 'system' | 'reduced' | 'full';
export type LocaleCode = 'en' | 'de';

export interface Preferences {
  theme: ThemeMode;
  motion: MotionMode;
  locale: LocaleCode;
}

export const PREFERENCES_KEY = 'homepage-preferences';

export const DEFAULT_PREFERENCES: Preferences = {
  theme: 'dark',
  motion: 'system',
  locale: 'en',
};

const VALID_THEMES: ReadonlySet<string> = new Set(['light', 'dark', 'system']);
const VALID_MOTIONS: ReadonlySet<string> = new Set(['reduced', 'full', 'system']);
const VALID_LOCALES: ReadonlySet<string> = new Set(['en', 'de']);

function sanitizeTheme(value: unknown): ThemeMode {
  return typeof value === 'string' && VALID_THEMES.has(value) ? (value as ThemeMode) : DEFAULT_PREFERENCES.theme;
}

function sanitizeMotion(value: unknown): MotionMode {
  return typeof value === 'string' && VALID_MOTIONS.has(value) ? (value as MotionMode) : DEFAULT_PREFERENCES.motion;
}

function sanitizeLocale(value: unknown): LocaleCode {
  return typeof value === 'string' && VALID_LOCALES.has(value) ? (value as LocaleCode) : DEFAULT_PREFERENCES.locale;
}

export function parsePreferences(raw: string | null): Preferences {
  if (!raw) return DEFAULT_PREFERENCES;
  try {
    const parsed = JSON.parse(raw);
    return {
      theme: sanitizeTheme(parsed.theme),
      motion: sanitizeMotion(parsed.motion),
      locale: sanitizeLocale(parsed.locale),
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function getStoredPreferences(): Preferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  const raw = window.localStorage.getItem(PREFERENCES_KEY);
  return parsePreferences(raw);
}

export function resolveTheme(theme: ThemeMode): 'light' | 'dark' {
  if (theme === 'system') {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

export function applyThemeClass(theme: ThemeMode): 'light' | 'dark' {
  if (typeof document === 'undefined') return resolveTheme(theme);
  const resolved = resolveTheme(theme);
  const root = document.documentElement;
  if (resolved === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  root.dataset.theme = theme;
  return resolved;
}

export function setStoredPreferences(patch: Partial<Preferences>): Preferences {
  const current = getStoredPreferences();
  const updated: Preferences = { ...current, ...patch };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
    const resolved = applyThemeClass(updated.theme);
    if (patch.theme !== undefined) {
      window.dispatchEvent(new CustomEvent('theme-change', { detail: resolved }));
    }
    applyMotionAttribute(updated.motion);
  }
  return updated;
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
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = true;
    if (prefs && prefs.theme) {
      if (prefs.theme === 'dark') {
        isDark = true;
      } else if (prefs.theme === 'light') {
        isDark = false;
      } else if (prefs.theme === 'system') {
        isDark = systemDark;
      }
    } else {
      isDark = true;
    }
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (prefs && prefs.theme) {
      document.documentElement.dataset.theme = prefs.theme;
    }
    if (prefs && prefs.motion) {
      document.documentElement.dataset.motion = prefs.motion;
    }
    var currentPath = window.location.pathname;
    var base = currentPath.startsWith('/homepage') ? '/homepage' : '';
    var homePath = base ? base + '/' : '/';
    if (prefs && prefs.locale === 'de' && (currentPath === homePath || currentPath === base)) {
      window.location.replace(base + '/de/');
    }
  } catch (e) {}
})();
`.trim();
