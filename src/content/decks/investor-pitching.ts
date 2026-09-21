import { type Deck } from './types';

export const INVESTOR_PITCHING_DECK: Deck = {
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
      sectionNumber: 1,
      beatCode: 'S1.1',
      sectionTitle: { en: 'Internal Champion', de: 'Interner Fürsprecher' },
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
      sectionNumber: 2,
      beatCode: 'S2.1',
      sectionTitle: { en: 'Economics', de: 'Ökonomie' },
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
      sectionNumber: 3,
      beatCode: 'S3.1',
      sectionTitle: { en: 'Defensibility', de: 'Verteidigung' },
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
};
