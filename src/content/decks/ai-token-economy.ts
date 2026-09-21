import { AI_TOKEN_ECONOMY_SLIDES_PART1 } from './ai-token-economy-part1';
import { AI_TOKEN_ECONOMY_SLIDES_PART2 } from './ai-token-economy-part2';
import { type Deck } from './types';

export const AI_TOKEN_ECONOMY_DECK: Deck = {
  id: 'ai-token-economy',
  slug: 'ai-token-economy',
  title: {
    en: 'The AI Token Economy: What AI Costs, and Why It’s Now Everyone’s Job',
    de: 'Die KI-Token-Ökonomie: Was KI kostet und warum es jedermanns Aufgabe ist',
  },
  subtitle: {
    en: 'AI is a billed freelancer with amnesia and no visible meter. What it actually costs, why the meter stays invisible, and how to manage the budget.',
    de: 'KI ist ein abrechnender Freelancer mit Amnesie und ohne sichtbaren Zähler. Was sie wirklich kostet und wie man Budgets steuert.',
  },
  thesis: {
    en: 'AI can give you and the people you lead super powers, but it comes with hidden managing responsibilities you didn’t sign up for.',
    de: 'KI verleiht Teams Superkräfte, bringt aber versteckte Management-Verantwortung mit sich, für die sich niemand gemeldet hat.',
  },
  analogy: {
    en: 'A brilliant freelance contractor who works tirelessly without breaks, but never asks clarifying questions, bills for every single word, and forgets everything between conversations.',
    de: 'Ein brillanter Freelancer, der alles weiß und pausenlos arbeitet, aber niemals Rückfragen stellt, jedes Wort abrechnet und zwischen Gesprächen alles vergisst.',
  },
  subjectDomains: [
    'AI Economics',
    'Context Engineering',
    'Agent Workflows',
    'Engineering Leadership',
    'Cost Optimization',
  ],
  youtubeVideoId: 'S0Nx4faEebY',
  recordingDuration: '34 min',
  takeaway: {
    en: 'Audit your team’s active context window baselines, calculate your outcome-per-euro across models, and enforce prompt compaction before context degrades past 50%.',
    de: 'Prüfen Sie die Kontextfenster-Basis Ihres Teams, berechnen Sie den Ertrag pro Euro über Modellstufen hinweg und erzwingen Sie Prompt-Kompaktierung vor der 50%-Grenze.',
  },
  slides: [...AI_TOKEN_ECONOMY_SLIDES_PART1, ...AI_TOKEN_ECONOMY_SLIDES_PART2],
  sources: [
    {
      id: 1,
      label: 'OpenAI — What are tokens and how to count them? (≈¾ of a word)',
      url: 'https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them',
    },
    {
      id: 2,
      label: 'Liu et al. — Lost in the Middle: How Language Models Use Long Contexts (TACL 2024)',
      url: 'https://arxiv.org/abs/2307.03172',
    },
    {
      id: 3,
      label: 'Chroma Research — Context Rot: How Increasing Input Tokens Impacts LLM Performance (2025)',
      url: 'https://research.trychroma.com/context-rot',
    },
    {
      id: 4,
      label: 'Modarressi et al. — NoLiMa: Long-Context Evaluation Beyond Literal Matching (ICML 2025)',
      url: 'https://arxiv.org/abs/2502.05167',
    },
    {
      id: 5,
      label: 'Murdock — The serial position effect of free recall (J. Exp. Psychol., 1962)',
      url: 'https://psycnet.apa.org/record/1963-06156-001',
    },
    {
      id: 6,
      label: 'Anthropic Engineering — Effective context engineering for AI agents',
      url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
    },
    {
      id: 7,
      label: 'Anthropic — Claude API pricing & prompt caching',
      url: 'https://platform.claude.com/docs/en/pricing',
    },
    {
      id: 8,
      label: 'Google — Gemini Developer API pricing',
      url: 'https://ai.google.dev/gemini-api/docs/pricing',
    },
    {
      id: 9,
      label: 'DeepSeek — Models & pricing',
      url: 'https://api-docs.deepseek.com/quick_start/pricing',
    },
    {
      id: 10,
      label: 'Investing.com — The AI Token Pricing Crisis Behind OpenAI and Anthropic’s Revenue Race (2026)',
      url: 'https://www.investing.com/analysis/the-ai-token-pricing-crisis-behind-openai-and-anthropics-revenue-race-200680777',
    },
    {
      id: 11,
      label: 'R&A — Anthropic/OpenAI may be spending more than $1000 for every $100 you pay them (2026)',
      url: 'https://ea.rna.nl/2026/06/07/anthropic-openai-may-be-spending-more-than-1000-for-every-100-you-pay-them/',
    },
    {
      id: 12,
      label: 'Appenzeller, a16z — Welcome to LLMflation: LLM inference cost is going down fast',
      url: 'https://a16z.com/llmflation-llm-inference-cost/',
    },
    {
      id: 13,
      label: 'Karpathy — "+1 for context engineering" (X, June 2025)',
      url: 'https://x.com/karpathy/status/1937902205765607626',
    },
  ],
};
