import { describe, expect, it } from 'vitest';
import { DEFAULT_PREFERENCES, parsePreferences, prefersReducedMotion, type Preferences } from './preferences';

describe('preferences', () => {
  it('parses null as default preferences', () => {
    expect(parsePreferences(null)).toEqual(DEFAULT_PREFERENCES);
  });

  it('parses invalid JSON as default preferences', () => {
    expect(parsePreferences('invalid-json')).toEqual(DEFAULT_PREFERENCES);
  });

  it('parses valid preferences correctly', () => {
    const raw = JSON.stringify({ theme: 'dark', motion: 'reduced', locale: 'de' });
    expect(parsePreferences(raw)).toEqual({
      theme: 'dark',
      motion: 'reduced',
      locale: 'de',
    });
  });

  it('handles partial fields gracefully', () => {
    const raw = JSON.stringify({ theme: 'dark' });
    expect(parsePreferences(raw)).toEqual({
      theme: 'dark',
      motion: 'system',
      locale: 'en',
    });
  });

  it('detects reduced motion when explicitly set in preferences', () => {
    const prefs: Preferences = { theme: 'light', motion: 'reduced', locale: 'en' };
    expect(prefersReducedMotion(prefs)).toBe(true);
  });

  it('detects full motion when explicitly set in preferences', () => {
    const prefs: Preferences = { theme: 'light', motion: 'full', locale: 'en' };
    expect(prefersReducedMotion(prefs)).toBe(false);
  });
});
