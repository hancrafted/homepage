import { describe, expect, it } from 'vitest';
import { DECKS, getDeckBySlug } from './decks';

describe('decks data integrity', () => {
  it('contains valid decks with non-empty slides', () => {
    expect(DECKS.length).toBeGreaterThanOrEqual(3);
    for (const deck of DECKS) {
      expect(deck.slug).toBeTruthy();
      expect(deck.slides.length).toBeGreaterThanOrEqual(3);
      expect(deck.thesis.en).toBeTruthy();
      expect(deck.thesis.de).toBeTruthy();
    }
  });

  it('retrieves deck by slug correctly', () => {
    const deck = getDeckBySlug('backward-chaining');
    expect(deck).toBeDefined();
    expect(deck?.slug).toBe('backward-chaining');

    const tokenDeck = getDeckBySlug('ai-token-economy');
    expect(tokenDeck).toBeDefined();
    expect(tokenDeck?.slides.length).toBe(18);

    const markdownDeck = getDeckBySlug('maintain-markdown-for-ai');
    expect(markdownDeck).toBeDefined();
    expect(markdownDeck?.slides.length).toBe(13);
  });

  it('returns undefined for non-existent deck slug', () => {
    expect(getDeckBySlug('non-existent-deck')).toBeUndefined();
  });

  it('ensures each slide in a deck has a unique id and sequential number', () => {
    for (const deck of DECKS) {
      const ids = new Set<string>();
      deck.slides.forEach((slide, index) => {
        expect(ids.has(slide.id)).toBe(false);
        ids.add(slide.id);
        expect(slide.number).toBe(index + 1);
      });
    }
  });
});
