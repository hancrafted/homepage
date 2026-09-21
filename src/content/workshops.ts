import { type LocaleCode } from '@/lib/preferences';

export interface Workshop {
  id: string;
  slug: string;
  title: Record<LocaleCode, string>;
  subtitle: Record<LocaleCode, string>;
  description: Record<LocaleCode, string>;
  audience: Record<LocaleCode, string>;
  format: Record<LocaleCode, string>;
  duration: string;
  status: 'upcoming' | 'past';
  dateLabel: Record<LocaleCode, string>;
  location: Record<LocaleCode, string>;
  takeaway: Record<LocaleCode, string>;
  composedDeckIds: string[];
}

export const WORKSHOPS: Workshop[] = [
  {
    id: 'ai-evals-production',
    slug: 'ai-evals-production',
    title: {
      en: 'AI Enablement & Eval-Driven Production',
      de: 'KI-Enablement & Eval-getriebene Produktion',
    },
    subtitle: {
      en: 'Moving beyond vibe-coding into deterministic verification pipelines.',
      de: 'Vom Vibe-Coding zu deterministischen Verifikations-Pipelines.',
    },
    description: {
      en: 'For engineering and product teams building with LLMs. How to build test suites that define planned agent capabilities before prompts are written, creating reliable safety bounds.',
      de: 'Für Entwicklungs- und Produktteams, die mit LLMs bauen. Wie man Testsuiten aufbaut, die Fähigkeiten definieren, bevor Prompts geschrieben werden.',
    },
    audience: {
      en: 'CTOs, Engineering Leads, AI Product Teams',
      de: 'CTOs, Engineering Leads, KI-Produktteams',
    },
    format: {
      en: 'Interactive 1-Day Deep Dive (Hands-on)',
      de: 'Interaktiver 1-Tages-Workshop (Hands-on)',
    },
    duration: '1 Day',
    status: 'upcoming',
    dateLabel: {
      en: 'November 2026 • Limited cohort',
      de: 'November 2026 • Begrenzte Plätze',
    },
    location: {
      en: 'Munich, Germany / Hybrid',
      de: 'München / Hybrid',
    },
    takeaway: {
      en: 'A working set of 20 pass/fail benchmark evals for your specific agentic tasks before rollout.',
      de: 'Eine funktionierende Suite von 20 Pass/Fail-Benchmark-Evals für Ihre konkreten Agenten-Aufgaben.',
    },
    composedDeckIds: ['eval-driven-development', 'backward-chaining'],
  },
  {
    id: 'investor-pitch-decks',
    slug: 'investor-pitch-decks',
    title: {
      en: 'Investor Pitching: Decks That Argue For Themselves',
      de: 'Investor Pitching: Decks, die für sich selbst argumentieren',
    },
    subtitle: {
      en: 'Backward chaining from the decision-maker room to slide architecture.',
      de: 'Rückwärtsverkettung von den Entscheidern bis zur Folienarchitektur.',
    },
    description: {
      en: 'For pre-seed and seed founders. Stop filling in 8-slide pitch templates. We derive the narrative spine from "I win" backwards to what each slide must prove to angels and VCs.',
      de: 'Für Pre-Seed- und Seed-Gründer. Keine starren 8-Folien-Templates mehr. Wir leiten die Kernbotschaft rückwärts vom Investorenerfolg ab.',
    },
    audience: {
      en: 'Startup Founders, Co-Founders, Pitch Teams',
      de: 'Startup-Gründer, Co-Founder, Pitch-Teams',
    },
    format: {
      en: 'Intensive Half-Day Clinic',
      de: 'Intensive Halbtags-Klinik',
    },
    duration: '4 Hours',
    status: 'upcoming',
    dateLabel: {
      en: 'October 2026 • 6 Startups max',
      de: 'Oktober 2026 • Max. 6 Startups',
    },
    location: {
      en: 'Frankfurt / Online Live',
      de: 'Frankfurt / Online Live',
    },
    takeaway: {
      en: 'A restructured pitch spine and battle-tested defensibility narrative tailored for VC questions.',
      de: 'Eine neu strukturierte Pitch-Spine und eine fundierte Argumentation für kritische VC-Fragen.',
    },
    composedDeckIds: ['investor-pitching', 'backward-chaining'],
  },
  {
    id: 'axel-pitch-workshop',
    slug: 'axel-pitch-workshop',
    title: {
      en: 'AXEL Energy Pitch Workshop & Financial Models',
      de: 'AXEL Energy Pitch-Workshop & Finanzmodelle',
    },
    subtitle: {
      en: 'Delivered in Feb 2026: Pitch story surgery and break-even unit economics.',
      de: 'Durchgeführt im Feb 2026: Pitch-Optimierung und Break-even-Wirtschaftlichkeit.',
    },
    description: {
      en: 'Hands-on coaching for cleantech and energy startups preparing for investment rounds. Built break-even models and backward planning schedules for demo day.',
      de: 'Praxis-Coaching für Cleantech- und Energie-Startups vor Finanzierungsrunden mit Break-even-Kalkulationen.',
    },
    audience: {
      en: 'Cleantech Founders & Accelerators',
      de: 'Cleantech-Gründer & Accelerator-Teams',
    },
    format: {
      en: '2-Day Live Accelerator Workshop',
      de: '2-Tage Live-Accelerator-Workshop',
    },
    duration: '2 Days',
    status: 'past',
    dateLabel: {
      en: 'February 2026',
      de: 'Februar 2026',
    },
    location: {
      en: 'Karlsruhe, Germany',
      de: 'Karlsruhe',
    },
    takeaway: {
      en: 'Direct pivot from product-feature lists to investor ROI and unit transaction economics.',
      de: 'Schwenk von reinen Feature-Listen hin zu Investoren-ROI und Transaktionsökonomie.',
    },
    composedDeckIds: ['investor-pitching', 'backward-chaining'],
  },
  {
    id: 'grow-finals-prep',
    slug: 'grow-finals-prep',
    title: {
      en: 'Grow Finals Prep: Constraint-Led Milestones',
      de: 'Grow Finals Prep: Engpass-orientierte Meilensteine',
    },
    subtitle: {
      en: 'Delivered Jan 2026: Overturning founder roadmaps two weeks before finals.',
      de: 'Durchgeführt Jan 2026: Gründer-Fahrpläne zwei Wochen vor dem Finale geschärft.',
    },
    description: {
      en: 'Coaching teams for the Grow finals. Replacing two more weeks of low-impact prototype hacking with 30 target customer validation interviews derived via reverse planning.',
      de: 'Coaching für Finalteams des Grow-Wettbewerbs. Verlagerung von Prototyp-Coding hin zu 30 Kundeninterviews.',
    },
    audience: {
      en: 'Growth-stage Teams, Student Incubators',
      de: 'Wachstumsteams, Inkubator-Startups',
    },
    format: {
      en: 'Intensive Review & Strategy Pass',
      de: 'Strategische Intensivprüfung',
    },
    duration: '1 Day',
    status: 'past',
    dateLabel: {
      en: 'January 2026',
      de: 'Januar 2026',
    },
    location: {
      en: 'Stuttgart, Germany',
      de: 'Stuttgart',
    },
    takeaway: {
      en: 'A clear critical path cutting non-essential tasks to guarantee pitch readiness on deadline.',
      de: 'Ein klarer kritischer Pfad zur garantierten Pitch-Readiness ohne Ablenkung.',
    },
    composedDeckIds: ['backward-chaining'],
  },
];
