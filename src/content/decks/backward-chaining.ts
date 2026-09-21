import { type Deck } from './types';

export const BACKWARD_CHAINING_DECK: Deck = {
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
  youtubeVideoId: 'dQw4w9WgXcQ',
  recordingDuration: '18 min',
  takeaway: {
    en: 'Find the last dated milestone in your plan, identify the nearest measurable dependency, divide by conversion, and terminate on a task you can start Monday.',
    de: 'Finden Sie den letzten Meilenstein im Plan, bestimmen Sie die nächste messbare Abhängigkeit und enden Sie bei einer Aufgabe für Montag.',
  },
  slides: [
    {
      id: 'slide-1',
      number: 1,
      sectionNumber: 1,
      beatCode: 'S1.1',
      sectionTitle: { en: 'The Problem', de: 'Das Problem' },
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
      sectionNumber: 2,
      beatCode: 'S2.1',
      sectionTitle: { en: 'The Logic', de: 'Die Logik' },
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
      sectionNumber: 3,
      beatCode: 'S3.1',
      sectionTitle: { en: 'The Math', de: 'Die Arithmetik' },
      title: { en: 'Reverse Funnel Math', de: 'Reverse Funnel Arithmetik' },
      claim: {
        en: 'Target deals ÷ conversion rate = required conversations. Divide backward until you reach today’s action.',
        de: 'Zielabschlüsse ÷ Conversion Rate = nötige Gespräche. Rechnen Sie rückwärts bis zur Aktion heute.',
      },
      notes: {
        en: 'Walk through concrete arithmetic: 10 deals at 20% conversion = 50 pitches = 200 outbound contacts = 40 contacts per week.',
        de: 'Rechnen Sie das Zahlenbeispiel konkret vor: 10 Abschlüsse bei 20% Conversion = 50 Pitches = 200 Erstkontakte.',
      },
      visualType: 'flow',
      highlight: { en: 'Deterministic Math', de: 'Deterministische Zahlen' },
    },
    {
      id: 'slide-4',
      number: 4,
      sectionNumber: 4,
      beatCode: 'S4.1',
      sectionTitle: { en: 'Execution', de: 'Umsetzung' },
      title: { en: 'Terminating on Monday', de: 'Abschluss am Montag' },
      claim: {
        en: 'A backward chain only completes when it hits an action with no preceding dependencies that can begin immediately.',
        de: 'Eine Rückwärtskette ist erst vollständig, wenn sie bei einer sofort ausführbaren Handlung ohne Vorbedingungen endet.',
      },
      notes: {
        en: 'Closing slide: do not leave the room with a plan that requires more planning. Leave with Monday morning’s calendar blocked.',
        de: 'Die Kette endet erst, wenn der Montagskalender blockiert ist.',
      },
      visualType: 'hierarchy',
      highlight: { en: 'Zero Dependency', de: 'Keine Vorbedingungen' },
    },
  ],
};
