import { type Deck } from './types';

export const EVAL_DRIVEN_DEVELOPMENT_DECK: Deck = {
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
      sectionNumber: 1,
      beatCode: 'S1.1',
      sectionTitle: { en: 'Failure Modes', de: 'Fehlerbilder' },
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
      sectionNumber: 2,
      beatCode: 'S2.1',
      sectionTitle: { en: 'Eval Rigor', de: 'Eval-Qualität' },
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
      sectionNumber: 3,
      beatCode: 'S3.1',
      sectionTitle: { en: 'State & Isolation', de: 'Zustand & Isolation' },
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
};
