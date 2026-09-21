import { type LocaleCode } from '@/lib/preferences';

export interface SlideData {
  id: string;
  number: number;
  sectionNumber?: number;
  sectionTitle?: Record<LocaleCode, string>;
  beatCode?: string;
  title: Record<LocaleCode, string>;
  claim: Record<LocaleCode, string>;
  notes: Record<LocaleCode, string>;
  visualType: string;
  highlight: Record<LocaleCode, string>;
}

export interface DeckSourceReceipt {
  id: number;
  label: string;
  url: string;
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
  sources?: DeckSourceReceipt[];
}
