import { type SlideData } from '@/content/decks/types';
import { type LocaleCode } from '@/lib/preferences';
import { Volume2 } from 'lucide-react';
import { DeckVisual } from './deck-visual';

interface TowerBeatItemProps {
  deckSlug: string;
  slide: SlideData;
  showNotes: boolean;
  locale: LocaleCode;
}

export function TowerBeatItem({ deckSlug, slide, showNotes, locale }: TowerBeatItemProps) {
  const isDe = locale === 'de';
  const secNum = slide.sectionNumber ?? 1;
  const beatLabel = slide.beatCode ?? `S${secNum}.${slide.number}`;
  const sectionTitle = slide.sectionTitle?.[locale] ?? `Section ${secNum}`;

  return (
    <section
      id={slide.id}
      data-section={secNum}
      data-beat={slide.number}
      className="min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-center py-16 sm:py-24 border-b border-border/40 scroll-mt-20 space-y-8"
    >
      <div className="space-y-4 max-w-4xl">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold">
          {beatLabel} · {sectionTitle}
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
          {slide.title[locale]}
        </h2>

        <div className="border-l-2 border-accent/70 pl-4 py-1 text-base sm:text-lg text-foreground/90 font-medium leading-relaxed">
          {slide.claim[locale]}
        </div>
      </div>

      <div className="pt-2">
        <DeckVisual deckSlug={deckSlug} slide={slide} locale={locale} />
      </div>

      {showNotes && slide.notes[locale] && (
        <aside className="p-4 rounded-xl border-l-4 border-secondary/60 bg-muted/20 text-xs leading-relaxed text-foreground/80 space-y-1.5 max-w-4xl">
          <div className="font-mono font-bold text-[10px] text-secondary uppercase tracking-widest flex items-center gap-1.5">
            <Volume2 className="h-3 w-3" />
            <span>{isDe ? 'Sprechernotiz' : 'Speaker Note'}</span>
          </div>
          <p>{slide.notes[locale]}</p>
        </aside>
      )}
    </section>
  );
}
