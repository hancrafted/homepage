import { type LocaleCode } from '@/lib/preferences';

export interface NavItem {
  id: string;
  href: string;
  label: Record<LocaleCode, string>;
}

export interface ServiceItem {
  id: string;
  title: Record<LocaleCode, string>;
  description: Record<LocaleCode, string>;
  iconName: 'sparkles' | 'target' | 'trending-up' | 'terminal' | 'users';
}

export interface StatItem {
  label: Record<LocaleCode, string>;
  value: string;
  detail: Record<LocaleCode, string>;
}

export interface SiteContent {
  author: {
    name: string;
    role: Record<LocaleCode, string>;
    location: Record<LocaleCode, string>;
    experience: Record<LocaleCode, string>;
    bio: Record<LocaleCode, string>;
    promises: {
      title: string;
      target: Record<LocaleCode, string>;
      description: Record<LocaleCode, string>;
    }[];
  };
  navigation: NavItem[];
  hero: {
    badge: Record<LocaleCode, string>;
    headlinePart1: Record<LocaleCode, string>;
    headlinePart2: Record<LocaleCode, string>;
    paragraph: Record<LocaleCode, string>;
    primaryCta: Record<LocaleCode, string>;
    secondaryCta: Record<LocaleCode, string>;
    servicePills: {
      id: string;
      label: Record<LocaleCode, string>;
      detail: Record<LocaleCode, string>;
    }[];
  };
  servicesHeading: {
    title: Record<LocaleCode, string>;
    subtitle: Record<LocaleCode, string>;
  };
  services: ServiceItem[];
  stats: StatItem[];
  workshopsHeading: {
    title: Record<LocaleCode, string>;
    subtitle: Record<LocaleCode, string>;
    tabAll: Record<LocaleCode, string>;
    tabUpcoming: Record<LocaleCode, string>;
    tabPast: Record<LocaleCode, string>;
    inquireBtn: Record<LocaleCode, string>;
  };
  decksHeading: {
    title: Record<LocaleCode, string>;
    subtitle: Record<LocaleCode, string>;
    watchOnYoutube: Record<LocaleCode, string>;
    exploreDeck: Record<LocaleCode, string>;
    viewTowerPage: Record<LocaleCode, string>;
  };
  aboutHeading: {
    title: Record<LocaleCode, string>;
    subtitle: Record<LocaleCode, string>;
    getInTouch: Record<LocaleCode, string>;
  };
  footer: {
    builtWith: Record<LocaleCode, string>;
    copyright: Record<LocaleCode, string>;
    privacyNotice: Record<LocaleCode, string>;
  };
}

export const SITE_CONTENT: SiteContent = {
  author: {
    name: 'Han',
    role: {
      en: 'Startup & SME Consultant | Engineering Leader',
      de: 'Startup- & KMU-Berater | Engineering Leader',
    },
    location: {
      en: 'Germany & International Remote',
      de: 'Deutschland & International Remote',
    },
    experience: {
      en: '~11 years full-stack: 7 founding engineer in startup, 2 SME, 2 enterprise',
      de: '~11 Jahre Full-Stack: 7 Gründungsingenieur im Startup, 2 KMU, 2 Enterprise',
    },
    bio: {
      en: 'Spoken as an engineer who translates across the entire value chain: software architecture, sales engineering, investor pitch rooms, and AI verification pipelines.',
      de: 'Aus der Perspektive eines Ingenieurs, der die gesamte Wertschöpfungskette übersetzt: Softwarearchitektur, Vertrieb, Pitch-Rooms für Investoren und KI-Verifikations-Pipelines.',
    },
    promises: [
      {
        title: 'Translation',
        target: { en: 'For Knowledge Workers', de: 'Für Knowledge Worker' },
        description: {
          en: 'Engineering principles, agentic practice, and system thinking made actionable without condescension.',
          de: 'Engineering-Prinzipien, agentische Praxis und Systemdenken handlungsorientiert und verständlich vermittelt.',
        },
      },
      {
        title: 'Credibility',
        target: { en: 'For Business & Founders', de: 'Für Unternehmen & Gründer' },
        description: {
          en: 'Real artefacts from real work: working decks, unit economics models, and eval-driven pipelines as proof.',
          de: 'Echte Artefakte aus echter Arbeit: Decks, Wirtschaftlichkeitsmodelle und Eval-gestützte Pipelines als Beweis.',
        },
      },
      {
        title: 'Leverage',
        target: { en: 'Decoupled Value', de: 'Entkoppelte Hebelwirkung' },
        description: {
          en: 'Turning repeatable insights into structured Decks, workshops, and automated verification loops.',
          de: 'Wiederholbare Erkenntnisse in strukturierte Decks, Workshops und automatisierte Prüfschleifen übersetzen.',
        },
      },
    ],
  },
  navigation: [
    { id: 'workshops', href: '#workshops', label: { en: 'Workshops', de: 'Workshops' } },
    { id: 'portfolio', href: '#portfolio', label: { en: 'Decks & Portfolio', de: 'Decks & Portfolio' } },
    { id: 'about', href: '#about', label: { en: 'About Me', de: 'Über Mich' } },
    { id: 'contact', href: '#contact', label: { en: 'Contact', de: 'Kontakt' } },
  ],
  hero: {
    badge: {
      en: 'THESIS // AI DIDN’T REMOVE THE WORK. IT MOVED IT.',
      de: 'THESE // KI HAT DIE ARBEIT NICHT ABGESCHAFFT. SIE HAT SIE VERSCHOBEN.',
    },
    headlinePart1: {
      en: 'AI DIDN’T REMOVE THE WORK.',
      de: 'KI HAT DIE ARBEIT NICHT ABGESCHAFFT.',
    },
    headlinePart2: {
      en: 'Master where the work actually lands.',
      de: 'Meistern, wo die Arbeit wirklich landet.',
    },
    paragraph: {
      en: 'Every AI speedup shifts work into verification — I help SMEs turn generative tools into reliable, high-margin systems through consulting, coaching, and workshops.',
      de: 'Jeder KI-Vorsprung verlagert Arbeit in die Verifikation — ich helfe KMUs und Führungskräften, durch Beratung, Coaching und Workshops verlässliche Systeme mit echter Marge zu bauen.',
    },
    servicePills: [
      {
        id: 'consulting',
        label: { en: 'Consulting', de: 'Beratung' },
        detail: { en: 'Evals & Architecture', de: 'Evals & Architektur' },
      },
      {
        id: 'coaching',
        label: { en: '1:1 Coaching', de: '1:1-Coaching' },
        detail: { en: 'Founder Sparring', de: 'Gründer-Sparring' },
      },
      {
        id: 'workshops',
        label: { en: 'Workshops', de: 'Workshops' },
        detail: { en: 'Team Upskilling', de: 'Team-Befähigung' },
      },
    ],
    primaryCta: {
      en: 'Explore Workshops & Consulting',
      de: 'Workshops & Beratung entdecken',
    },
    secondaryCta: {
      en: 'View Decks (Portfolio)',
      de: 'Decks ansehen (Portfolio)',
    },
  },
  servicesHeading: {
    title: { en: 'Practice & Services', de: 'Praxis & Dienstleistungen' },
    subtitle: {
      en: 'Translating deep engineering rigor into scalable business outcomes for startups and SMEs.',
      de: 'Tiefgehende technische Disziplin in skalierbare Geschäftsergebnisse für Startups und KMU übersetzen.',
    },
  },
  services: [
    {
      id: 'coaching',
      title: { en: 'Startup & SME 1:1 Coaching', de: 'Startup- & KMU-1:1-Coaching' },
      description: {
        en: 'Strategic guidance for founding teams: breaking bottlenecks across product delivery, market validation, and runway management.',
        de: 'Strategische Begleitung für Gründerteams: Engpässe bei Produkt, Marktvalidierung und Runway-Management überwinden.',
      },
      iconName: 'users',
    },
    {
      id: 'ai-enablement',
      title: { en: 'AI-Enablement & Evals', de: 'KI-Enablement & Evals' },
      description: {
        en: 'Moving beyond vibe-coding: designing eval-driven development, deterministic checks, and structured agent pipelines that survive in production.',
        de: 'Über Vibe-Coding hinaus: Eval-gestützte Entwicklung, deterministische Prüfungen und strukturierte Agenten-Pipelines für die Produktion.',
      },
      iconName: 'terminal',
    },
    {
      id: 'pitching',
      title: { en: 'Pitching & Deck Architecture', de: 'Pitching & Deck-Architektur' },
      description: {
        en: 'Decks that argue for themselves. Backward chaining from the investor "I win" decision rather than filling in eight generic slides.',
        de: 'Präsentationen, die für sich selbst argumentieren. Rückwärtsverkettung von der Investorenentscheidung statt starrer Vorlagen.',
      },
      iconName: 'target',
    },
    {
      id: 'sales',
      title: { en: 'Reverse Funnel Sales Math', de: 'Reverse-Funnel-Vertriebsmathematik' },
      description: {
        en: 'Translating annual revenue goals into exact weekly outreach quotas using proven conversion ratios and pipeline arithmetic.',
        de: 'Jahresumsatzziele mithilfe bewährter Konversionsraten und Pipeline-Mathematik in exakte wöchentliche Vertriebsaktivitäten zerlegen.',
      },
      iconName: 'trending-up',
    },
  ],
  stats: [
    {
      label: { en: 'Full-Stack & Systems', de: 'Full-Stack & Systeme' },
      value: '~11 Years',
      detail: { en: 'Startup founding to enterprise scale', de: 'Vom Startup-Fundament bis zum Großkonzern' },
    },
    {
      label: { en: 'Founding Engineer', de: 'Gründungsingenieur' },
      value: '7 Years',
      detail: { en: 'Built from 0 to sustainable traction', de: 'Von 0 bis zur nachhaltigen Marktreife gebaut' },
    },
    {
      label: { en: 'Production Evals', de: 'Produktions-Evals' },
      value: '100% Verified',
      detail: { en: 'Rigorous testing before prompt rollout', de: 'Strenge Tests vor dem Prompt-Rollout' },
    },
    {
      label: { en: 'Workshops Delivered', de: 'Durchgeführte Workshops' },
      value: '40+',
      detail: { en: 'Delivered to founders & SME teams', de: 'Für Gründer und Führungskräfte' },
    },
  ],
  workshopsHeading: {
    title: { en: 'Workshops', de: 'Workshops' },
    subtitle: {
      en: 'Live sessions delivered to Clients, composed from modular Decks that already exist.',
      de: 'Live-Sessions für Mandanten, zusammengestellt aus bereits erprobten modularen Decks.',
    },
    tabAll: { en: 'All Sessions', de: 'Alle Sessions' },
    tabUpcoming: { en: 'Upcoming', de: 'Bevorstehend' },
    tabPast: { en: 'Past Delivered', de: 'Abgeschlossen' },
    inquireBtn: { en: 'Book Session', de: 'Session anfragen' },
  },
  decksHeading: {
    title: { en: 'Portfolio: Decks as Tower Pages', de: 'Portfolio: Decks als Tower-Pages' },
    subtitle: {
      en: 'Interactive presentation Decks with recorded YouTube sessions, slide breakdowns, and core theses.',
      de: 'Interaktive Decks mit YouTube-Aufzeichnungen, Folien-Details und Kernüberlegungen.',
    },
    watchOnYoutube: { en: 'Watch Recording', de: 'Aufzeichnung ansehen' },
    exploreDeck: { en: 'Launch Deck Runner', de: 'Deck-Runner starten' },
    viewTowerPage: { en: 'View Tower Page', de: 'Tower-Page ansehen' },
  },
  aboutHeading: {
    title: { en: 'About Me', de: 'Über Mich' },
    subtitle: {
      en: 'Bridging deep engineering principles with strategic business leadership.',
      de: 'Die Brücke zwischen tiefgehenden Engineering-Prinzipien und unternehmerischer Strategie.',
    },
    getInTouch: { en: 'Start a Conversation', de: 'Gespräch anfragen' },
  },
  footer: {
    builtWith: {
      en: 'Built agentically with Next.js, shadcn/ui & GSAP following software-architecture.md',
      de: 'Agentisch erstellt mit Next.js, shadcn/ui & GSAP nach software-architecture.md',
    },
    copyright: {
      en: '© 2026 Han. All rights reserved.',
      de: '© 2026 Han. Alle Rechte vorbehalten.',
    },
    privacyNotice: {
      en: 'Static export hosted on GitHub Pages. Zero third-party trackers.',
      de: 'Statischer Export auf GitHub Pages. Keine Third-Party-Tracker.',
    },
  },
};
