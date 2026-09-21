import { type LocaleCode } from '@/lib/preferences';

export interface SlideData {
  id: string;
  number: number;
  title: Record<LocaleCode, string>;
  claim: Record<LocaleCode, string>;
  notes: Record<LocaleCode, string>;
  visualType: 'flow' | 'metric' | 'contrast' | 'hierarchy';
  highlight: Record<LocaleCode, string>;
}

export interface Deck {
  id: string;
  slug: string;
  title: Record<LocaleCode, string>;
  subtitle: Record<LocaleCode, string>;
  thesis: Record<LocaleCode, string>;
  analogy: Record<LocaleCode, string>;
  subjectDomains: string[];
  youtubeVideoId?: string;
  recordingDuration?: string;
  takeaway: Record<LocaleCode, string>;
  slides: SlideData[];
}

export const DECKS: Deck[] = [
  {
    id: 'backward-chaining',
    slug: 'backward-chaining',
    title: {
      en: 'Backward Chaining: Planning From The Outcome',
      de: 'Rückwärtsverkettung: Planung vom Ergebnis her',
    },
    subtitle: {
      en: 'How to connect a 12-month goal to this week’s work using arithmetic rather than optimism.',
      de: 'Wie man ein 12-Monats-Ziel mithilfe von Arithmetik statt Optimismus mit der Arbeit dieser Woche verknüpft.',
    },
    thesis: {
      en: 'You can plan toward an outcome you do not control, by chaining backwards until you hit something you do.',
      de: 'Man kann auf ein unkontrollierbares Ergebnis hin planen, indem man rückwärts verkettet, bis man auf eine kontrollierbare Handlung stößt.',
    },
    analogy: {
      en: 'Wanting someone to say yes, where the only controllable step is saying hi.',
      de: 'Der Wunsch nach einem Ja, bei dem der einzig kontrollierbare Schritt das Grüßen ist.',
    },
    subjectDomains: ['Sales', 'Startup Coaching', 'AI Agents', 'Software Testing', 'Project Management'],
    youtubeVideoId: 'dQw4w9WgXcQ', // Clean placeholder ID that renders an interactive video player
    recordingDuration: '18 min',
    takeaway: {
      en: 'Find the last dated milestone in your plan, identify the nearest measurable dependency, divide by conversion, and terminate on a task you can start Monday.',
      de: 'Finden Sie den letzten Meilenstein im Plan, bestimmen Sie die nächste messbare Abhängigkeit und enden Sie bei einer Aufgabe für Montag.',
    },
    slides: [
      {
        id: 'slide-1',
        number: 1,
        title: { en: 'The Planning Paradox', de: 'Das Planungs-Paradoxon' },
        claim: {
          en: 'Someone else saying yes sits outside your control. What is inside your control is what you do between now and the decision.',
          de: 'Ein Ja von jemand anderem liegt außerhalb Ihrer Kontrolle. Kontrollierbar ist nur das, was Sie bis zur Entscheidung tun.',
        },
        notes: {
          en: 'Establish the core distinction: outcome vs. controllable antecedent. Do not confuse activity with causality.',
          de: 'Den Unterschied zwischen Ergebnis und kontrollierbarer Vorbedingung etablieren.',
        },
        visualType: 'contrast',
        highlight: { en: 'Control Boundary', de: 'Kontrollgrenze' },
      },
      {
        id: 'slide-2',
        number: 2,
        title: { en: 'The Planning Fallacy', de: 'Die Planungsfalle' },
        claim: {
          en: 'Forward reasoning defaults to familiarity rather than necessity. We build what we know how to build.',
          de: 'Vorwärtsdenken greift auf Bekanntes zurück statt auf das Notwendige. Wir bauen, was wir kennen.',
        },
        notes: {
          en: 'Kahneman and Tversky planning fallacy: time and cost underestimated, benefits overestimated. Backward planning eliminates this optimism bias.',
          de: 'Kahneman & Tversky: Optimismus-Verzerrung durch Vorwärtsplanung.',
        },
        visualType: 'metric',
        highlight: { en: 'Cognitive Bias', de: 'Kognitive Verzerrung' },
      },
      {
        id: 'slide-3',
        number: 3,
        title: { en: 'The 4-Step Recursive Operation', de: 'Die 4-Schritte-Rekursion' },
        claim: {
          en: 'Define outcome → Ask if controllable → If not, find nearest upstream measurable → Repeat until fully inside control.',
          de: 'Ziel definieren → Kontrollierbarkeit prüfen → Wenn nicht, vorgelagerten Messpunkt suchen → Bis zur Eigenkontrolle wiederholen.',
        },
        notes: {
          en: 'The recursion stops when the task depends on zero external approvals.',
          de: 'Die Rekursion endet, wenn keine externe Erlaubnis mehr erforderlich ist.',
        },
        visualType: 'flow',
        highlight: { en: 'Recursive Method', de: 'Rekursive Methode' },
      },
      {
        id: 'slide-4',
        number: 4,
        title: { en: 'Reverse Funnel Arithmetic', de: 'Reverse-Funnel-Arithmetik' },
        claim: {
          en: '€100k revenue @ €10k/deal = 10 contracts ← 30 negotiations ← 90 opportunities ← 270 target accounts contacted.',
          de: '100.000 € Umsatz @ 10.000 € = 10 Verträge ← 30 Verhandlungen ← 90 qualifizierte Leads ← 270 Kontaktierungen.',
        },
        notes: {
          en: 'Arithmetic replaces hope. January calling volume is derived directly from the annual cash flow requirement.',
          de: 'Mathematik ersetzt Hoffnung. Das Anrufvolumen im Januar folgt direkt aus dem Jahresziel.',
        },
        visualType: 'hierarchy',
        highlight: { en: 'Funnel Math', de: 'Funnel-Mathematik' },
      },
      {
        id: 'slide-5',
        number: 5,
        title: { en: 'AI Evals Before Prompts', de: 'KI-Evals vor Prompts' },
        claim: {
          en: 'In AI agent systems, evals are acceptance tests written before the model executes. Pass/fail criteria must exist first.',
          de: 'In KI-Agenten-Systemen sind Evals Akzeptanztests vor der Modell-Ausführung. Bewertungskriterien müssen zuerst existieren.',
        },
        notes: {
          en: 'Demystifying evals: 20-50 verified domain tasks. If an agent has no test, failure cannot trigger replanning.',
          de: 'Ohne automatisierte Verifikation kann ein Agenten-Fehlschlag keine Selbstkorrektur anstoßen.',
        },
        visualType: 'flow',
        highlight: { en: 'Deterministic Bounds', de: 'Deterministische Grenzen' },
      },
    ],
  },
  {
    id: 'investor-pitching',
    slug: 'investor-pitching',
    title: {
      en: 'Investor Pitching: Decks That Argue For Themselves',
      de: 'Investor Pitching: Decks, die für sich selbst argumentieren',
    },
    subtitle: {
      en: 'How to replace 8-slide templates with backward chaining from the investment committee decision.',
      de: 'Wie man 8-Folien-Vorlagen durch Rückwärtsverkettung aus dem Investment-Komitee ersetzt.',
    },
    thesis: {
      en: 'A pitch deck does not introduce a startup; it equips an internal sponsor to defend the investment when you are not in the room.',
      de: 'Ein Pitch Deck stellt kein Startup vor; es befähigt einen Fürsprecher, das Investment zu verteidigen, wenn Sie nicht im Raum sind.',
    },
    analogy: {
      en: 'A defense attorney brief prepared for the jury deliberations behind closed doors.',
      de: 'Ein Plädoyer, das für die Beratungen der Jury hinter verschlossenen Türen vorbereitet wurde.',
    },
    subjectDomains: ['Fundraising', 'Founder Finance', 'Startup Coaching'],
    youtubeVideoId: 'dQw4w9WgXcQ',
    recordingDuration: '24 min',
    takeaway: {
      en: 'Identify the single blocker each stakeholder in the room holds (angel, lead VC, partner), and allocate each slide to resolving one specific objection.',
      de: 'Identifizieren Sie den zentralen Einwand jedes Entscheiders und widmen Sie jede Folie genau einem Gegenargument.',
    },
    slides: [
      {
        id: 'slide-1',
        number: 1,
        title: { en: 'The Closed Door Problem', de: 'Das Problem der geschlossenen Tür' },
        claim: {
          en: 'You do not close the round during the pitch. You close it when the lead partner explains your defensibility to their peers.',
          de: 'Die Runde wird nicht während des Pitches geschlossen, sondern wenn der Partner die These intern vertritt.',
        },
        notes: {
          en: 'Derive slide claims from what the champion needs to state in partner meetings.',
          de: 'Folieninhalte aus den internen Verhandlungsfragen ableiten.',
        },
        visualType: 'contrast',
        highlight: { en: 'Internal Champion', de: 'Interner Fürsprecher' },
      },
      {
        id: 'slide-2',
        number: 2,
        title: { en: 'Break-Even Economics', de: 'Break-even-Ökonomie' },
        claim: {
          en: 'A financial model is not an Excel forecast; it is proof that overhead scales slower than gross transaction value.',
          de: 'Ein Finanzmodell ist kein Excel-Traum, sondern der mathematische Beweis unterproportionaler Fixkosten.',
        },
        notes: {
          en: 'Nono break-even model: deriving required customer volume from €120k founding overhead.',
          de: 'Deckungsbeitragsanalyse auf Basis realer Kostenstrukturen.',
        },
        visualType: 'metric',
        highlight: { en: 'Unit Economics', de: 'Stückkostenrechnung' },
      },
      {
        id: 'slide-3',
        number: 3,
        title: { en: 'The Defensibility Spine', de: 'Die Verteidigungslinie' },
        claim: {
          en: 'Every slide is an answer to a pre-existing suspicion: Why now? Why you? Why won’t incumbents copy this on Monday?',
          de: 'Jede Folie beantwortet einen konkreten Verdacht: Warum jetzt? Warum dieses Team? Warum baut Google das nicht Montag nach?',
        },
        notes: {
          en: 'Structural integrity of the narrative spine.',
          de: 'Strukturierte Beweisführung statt unzusammenhängender Folien.',
        },
        visualType: 'hierarchy',
        highlight: { en: 'Moat Architecture', de: 'Wettbewerbsvorteil' },
      },
    ],
  },
  {
    id: 'eval-driven-development',
    slug: 'eval-driven-development',
    title: {
      en: 'Eval-Driven Development: Taming Agent Workflows',
      de: 'Eval-Driven Development: Agenten-Workflows zähmen',
    },
    subtitle: {
      en: 'Applying 20 years of software testing rigor to multi-agent architectures and LLM reasoning.',
      de: '20 Jahre Software-Testing-Disziplin auf Multi-Agenten-Architekturen übertragen.',
    },
    thesis: {
      en: 'The eval comes first — before the prompt, before the pipeline, and before model selection.',
      de: 'Das Eval kommt zuerst — vor dem Prompt, vor der Pipeline und vor der Modellwahl.',
    },
    analogy: {
      en: 'Acceptance criteria and smoke tests written before manufacturing a safety valve.',
      de: 'Akzeptanzkriterien und Rauchtests, die vor dem Bau eines Sicherheitsventils verfasst werden.',
    },
    subjectDomains: ['AI Agents', 'Software Testing', 'System Architecture'],
    recordingDuration: '15 min',
    takeaway: {
      en: 'Extract your last 15 prompt failure cases into JSON benchmark assertions with deterministic pass/fail evaluators.',
      de: 'Überführen Sie die letzten 15 Prompt-Fehler in deterministische JSON-Benchmark-Prüfungen.',
    },
    slides: [
      {
        id: 'slide-1',
        number: 1,
        title: { en: 'The Vibe Coding Trap', de: 'Die Vibe-Coding-Falle' },
        claim: {
          en: 'One-shot prompt tuning gives the illusion of progress while silently degrading edge cases across production.',
          de: 'One-Shot-Prompt-Tuning erzeugt die Illusion von Fortschritt, während es Edge-Cases unbemerkt zerstört.',
        },
        notes: {
          en: 'Veracode 2025 study: 45% security defect rate across generated code regardless of model size.',
          de: 'Veracode 2025: Hohe Fehlerquote unabhängig von der Modellgröße ohne formale Tests.',
        },
        visualType: 'contrast',
        highlight: { en: 'Regression Risk', de: 'Regressionsrisiko' },
      },
      {
        id: 'slide-2',
        number: 2,
        title: { en: 'The Two-Expert Agreement Standard', de: 'Der Zwei-Experten-Standard' },
        claim: {
          en: 'A valid eval requires that two independent domain experts agree on the pass/fail score of the agent output.',
          de: 'Ein valides Eval verlangt, dass zwei unabhängige Experten unabhängig zum selben Urteil gelangen.',
        },
        notes: {
          en: 'How to build high-signal eval datasets without spending tens of thousands on LLM-as-a-judge loops.',
          de: 'Qualitativ hochwertige Datensätze schlagen reine Testmengen.',
        },
        visualType: 'metric',
        highlight: { en: 'Eval Rigor', de: 'Eval-Qualität' },
      },
      {
        id: 'slide-3',
        number: 3,
        title: { en: 'Agent Checkpoints & Re-runs', de: 'Agenten-Checkpoints & Re-runs' },
        claim: {
          en: 'Decompose agent loops so each stage writes an immutable artifact to disk. Failure restarts only the failing link.',
          de: 'Agenten-Schleifen zerlegen, sodass jede Stufe ein unveränderliches Artefakt schreibt. Ein Fehler startet nur diese Stufe neu.',
        },
        notes: {
          en: 'The Ralph loop pattern: disk as state machine, verification as non-negotiable gate.',
          de: 'Ralph-Loop-Muster: Dateisystem als Zustandsmaschine.',
        },
        visualType: 'flow',
        highlight: { en: 'State & Isolation', de: 'Zustand & Isolation' },
      },
    ],
  },
];

export function getDeckBySlug(slug: string): Deck | undefined {
  return DECKS.find((d) => d.slug === slug);
}
