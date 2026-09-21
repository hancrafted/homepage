import { type Deck, type SlideData } from '@/content/decks/types';
import { type LocaleCode } from '@/lib/preferences';

export interface TowerSection {
  number: number;
  title: Record<LocaleCode, string>;
  beats: SlideData[];
}

export function getDeckSections(deck: Deck): TowerSection[] {
  const map = new Map<number, TowerSection>();

  deck.slides.forEach((slide) => {
    const secNum = slide.sectionNumber ?? 1;
    const existing = map.get(secNum);
    if (!existing) {
      map.set(secNum, {
        number: secNum,
        title: slide.sectionTitle ?? { en: `Section ${secNum}`, de: `Abschnitt ${secNum}` },
        beats: [slide],
      });
    } else {
      existing.beats.push(slide);
    }
  });

  return Array.from(map.values());
}
