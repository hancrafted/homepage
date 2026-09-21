import { AI_TOKEN_ECONOMY_DECK } from './decks/ai-token-economy';
import { BACKWARD_CHAINING_DECK } from './decks/backward-chaining';
import { EVAL_DRIVEN_DEVELOPMENT_DECK } from './decks/eval-driven-development';
import { INVESTOR_PITCHING_DECK } from './decks/investor-pitching';
import { MAINTAIN_MARKDOWN_FOR_AI_DECK } from './decks/maintain-markdown-for-ai';
import { type Deck, type SlideData } from './decks/types';

export type { Deck, SlideData };

export const DECKS: Deck[] = [
  BACKWARD_CHAINING_DECK,
  INVESTOR_PITCHING_DECK,
  EVAL_DRIVEN_DEVELOPMENT_DECK,
  AI_TOKEN_ECONOMY_DECK,
  MAINTAIN_MARKDOWN_FOR_AI_DECK,
];

export function getDeckBySlug(slug: string): Deck | undefined {
  return DECKS.find((d) => d.slug === slug);
}
