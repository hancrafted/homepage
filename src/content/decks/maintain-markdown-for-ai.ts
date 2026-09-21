import { MAINTAIN_MARKDOWN_FOR_AI_SLIDES_PART1 } from './maintain-markdown-for-ai-part1';
import { MAINTAIN_MARKDOWN_FOR_AI_SLIDES_PART2 } from './maintain-markdown-for-ai-part2';
import { type Deck } from './types';

export const MAINTAIN_MARKDOWN_FOR_AI_DECK: Deck = {
  id: 'maintain-markdown-for-ai',
  slug: 'maintain-markdown-for-ai',
  title: {
    en: 'Maintaining Markdown for AI: The Verification Inversion',
    de: 'Markdown für KI pflegen: Die Verifikations-Inversion',
  },
  subtitle: {
    en: 'AI collapsed the cost of writing documentation and raised the cost of verifying it. What machines check, what AI accelerates, and what remains human.',
    de: 'KI hat die Kosten des Schreibens minimiert und die Verifikation verteuert. Was Maschinen prüfen, was KI beschleunigt und was menschlich bleibt.',
  },
  thesis: {
    en: 'Writing was the historical brake holding documentation sprawl in check; with that brake gone, the work moves permanently from authoring to verifying.',
    de: 'Das Schreiben war die historische Bremse gegen Dokumentationswucher; ohne diese Bremse verlagert sich die Arbeit dauerhaft vom Verfassen zur Verifikation.',
  },
  analogy: {
    en: 'Onboarding a new colleague with stale handbooks: a human gets suspicious and asks, but an AI accepts every outdated word as absolute truth on the thousandth run.',
    de: 'Einarbeitung eines neuen Kollegen mit veralteten Unterlagen: Ein Mensch schöpft Verdacht, eine KI glaubt jedes Wort auch beim tausendsten Mal unhinterfragt.',
  },
  subjectDomains: [
    'Documentation Governance',
    'Open Knowledge Format',
    'AI Agents',
    'Deterministic Testing',
    'Context Hygiene',
  ],
  youtubeVideoId: 'YxCVw4bUbW0',
  recordingDuration: '22 min',
  takeaway: {
    en: 'Draw strict verification boundaries: delegate syntax, links, and schema to deterministic machines, use AI to flag contradictions, and reserve human sign-off for semantic truth.',
    de: 'Ziehen Sie klare Prüfgrenzen: Übertragen Sie Syntax und Links deterministischen Maschinen, nutzen Sie KI für Widersprüche und behalten Sie semantische Freigaben Menschen vor.',
  },
  slides: [...MAINTAIN_MARKDOWN_FOR_AI_SLIDES_PART1, ...MAINTAIN_MARKDOWN_FOR_AI_SLIDES_PART2],
  sources: [
    {
      id: 1,
      label: 'Google — Open Knowledge Format (OKF v0.2) Frontmatter Specification',
      url: 'https://github.com/google/open-knowledge-format',
    },
    {
      id: 2,
      label: 'hancrafted — markdown-harness (GitHub Repository & CLI)',
      url: 'https://github.com/hancrafted/markdown-harness',
    },
    {
      id: 3,
      label: 'Veracode — GenAI Code & Documentation Security (2025)',
      url: 'https://www.veracode.com/state-of-software-security',
    },
    {
      id: 4,
      label: 'Anthropic — Effective Context Engineering for Autonomous Agents',
      url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
    },
  ],
};
