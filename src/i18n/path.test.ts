import { describe, expect, it } from 'vitest';
import { localizePath, stripLocalePrefix } from './path';

describe('navigation path helpers', () => {
  it('keeps English paths unprefixed', () => {
    expect(localizePath('/', 'en')).toBe('/');
    expect(localizePath('/decks/backward-chaining', 'en')).toBe('/decks/backward-chaining');
  });

  it('prefixes German paths with /de', () => {
    expect(localizePath('/', 'de')).toBe('/de/');
    expect(localizePath('/decks/backward-chaining', 'de')).toBe('/de/decks/backward-chaining');
  });

  it('avoids double prefixing German paths', () => {
    expect(localizePath('/de/', 'de')).toBe('/de/');
    expect(localizePath('/de/decks/backward-chaining', 'de')).toBe('/de/decks/backward-chaining');
  });

  it('ignores external URLs and protocol-relative links', () => {
    expect(localizePath('https://youtube.com', 'de')).toBe('https://youtube.com');
    expect(localizePath('//cdn.example.com', 'de')).toBe('//cdn.example.com');
  });

  it('strips /de prefix correctly', () => {
    expect(stripLocalePrefix('/de')).toBe('/');
    expect(stripLocalePrefix('/de/')).toBe('/');
    expect(stripLocalePrefix('/de/decks/backward-chaining')).toBe('/decks/backward-chaining');
    expect(stripLocalePrefix('/decks/backward-chaining')).toBe('/decks/backward-chaining');
  });
});
