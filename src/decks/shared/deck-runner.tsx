'use client';
// Interactive deck slide runner, keyboard navigation, and URL state sync using replace

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Deck, type SlideData } from '@/content/decks';
import { DeckVisual } from '@/decks/shared/deck-visual';
import { type LocaleCode } from '@/lib/preferences';
import { ChevronLeft, ChevronRight, FileText, MonitorPlay, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

function updateUrlState(slideId: string, presenter: boolean) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (presenter) {
    url.searchParams.set('presenter', 'true');
  } else {
    url.searchParams.delete('presenter');
  }
  url.hash = slideId;
  window.history.replaceState(null, '', url.toString());
}

function RunnerNavButtons({
  index,
  total,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center gap-1 border-l border-border pl-2">
      <Button
        size="icon"
        variant="outline"
        disabled={index === 0}
        onClick={onPrev}
        aria-label="Previous slide"
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        disabled={index === total - 1}
        onClick={onNext}
        aria-label="Next slide"
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface RunnerHeaderProps {
  index: number;
  total: number;
  title: string;
  showNotes: boolean;
  presenter: boolean;
  onToggleNotes: () => void;
  onTogglePresenter: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function RunnerHeader(props: RunnerHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-border bg-muted/30">
      <div className="flex items-center gap-2">
        <Badge variant="accent" className="font-mono text-xs">
          Slide {props.index + 1} / {props.total}
        </Badge>
        <span className="text-xs text-muted-foreground hidden sm:inline">({props.title})</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={props.showNotes ? 'default' : 'outline'}
          onClick={props.onToggleNotes}
          className="text-xs font-mono h-8 gap-1.5"
          aria-label="Toggle speaker notes"
        >
          <FileText className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Notes</span>
        </Button>

        <Button
          size="sm"
          variant={props.presenter ? 'default' : 'outline'}
          onClick={props.onTogglePresenter}
          className="text-xs font-mono h-8 gap-1.5"
          aria-label="Toggle presenter view mode"
        >
          <MonitorPlay className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Presenter</span>
        </Button>

        <RunnerNavButtons index={props.index} total={props.total} onPrev={props.onPrev} onNext={props.onNext} />
      </div>
    </div>
  );
}

function RunnerSlide({ slide, locale }: { slide: SlideData; locale: LocaleCode }) {
  return (
    <div className="p-6 sm:p-10 space-y-8 min-h-[360px] flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <Sparkles className="h-3 w-3 text-accent" />
          <span>{slide.highlight[locale]}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
          {slide.title[locale]}
        </h3>
        <p className="text-lg text-foreground/90 font-medium leading-relaxed max-w-3xl border-l-2 border-accent pl-4 py-1">
          {slide.claim[locale]}
        </p>
      </div>

      <div className="h-44 sm:h-48 pt-2">
        <DeckVisual slide={slide} locale={locale} />
      </div>
    </div>
  );
}

function RunnerFooter({
  slides,
  currentIndex,
  onGoTo,
}: {
  slides: SlideData[];
  currentIndex: number;
  onGoTo: (idx: number) => void;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-border/60 bg-muted/10 text-xs text-muted-foreground font-mono">
      <div className="flex items-center gap-1 overflow-x-auto py-1">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onGoTo(i)}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              i === currentIndex
                ? 'bg-primary text-primary-foreground font-bold'
                : 'hover:bg-muted text-muted-foreground'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="hidden sm:inline text-[11px]">Keys: [←] Prev • [→/Space] Next • [N] Notes • [P] Presenter</div>
    </div>
  );
}

function useDeckNavigation(slides: SlideData[]) {
  const [index, setIndex] = useState(0);
  const [presenter, setPresenter] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (url.searchParams.get('presenter') === 'true') {
      setPresenter(true);
      setShowNotes(true);
    }
    const hash = window.location.hash.replace('#', '');
    const found = slides.findIndex((s) => s.id === hash);
    if (found >= 0) setIndex(found);
  }, [slides]);

  function goToSlide(next: number) {
    if (next < 0 || next >= slides.length) return;
    setIndex(next);
    updateUrlState(slides[next].id, presenter);
  }

  function togglePresenter() {
    const next = !presenter;
    setPresenter(next);
    if (next) setShowNotes(true);
    updateUrlState(slides[index].id, next);
  }

  return { index, presenter, showNotes, setShowNotes, goToSlide, togglePresenter };
}

function RunnerNotes({ notes, locale }: { notes: string; locale: LocaleCode }) {
  return (
    <div className="p-4 border-t border-border bg-muted/40 text-xs space-y-1.5 animate-in fade-in duration-200">
      <div className="font-mono font-semibold text-foreground flex items-center gap-1.5">
        <FileText className="h-3.5 w-3.5 text-accent" />
        <span>{locale === 'de' ? 'Vortragsnotizen (Speaker Notes)' : 'Speaker Notes'}:</span>
      </div>
      <p className="text-muted-foreground leading-relaxed pl-5">{notes}</p>
    </div>
  );
}

export function DeckRunner({ deck, locale }: { deck: Deck; locale: LocaleCode }) {
  const slides = deck.slides;
  const nav = useDeckNavigation(slides);
  const currentSlide = slides[nav.index] ?? slides[0];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') nav.goToSlide(nav.index + 1);
      else if (e.key === 'ArrowLeft') nav.goToSlide(nav.index - 1);
      else if (e.key.toLowerCase() === 'n') nav.setShowNotes((prev) => !prev);
      else if (e.key.toLowerCase() === 'p') nav.togglePresenter();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const progressPercent = ((nav.index + 1) / slides.length) * 100;

  return (
    <div
      className="rounded-xl border border-border bg-card shadow-lg overflow-hidden space-y-0"
      data-deck-container="true"
      data-active-slide={currentSlide.id}
    >
      <RunnerHeader
        index={nav.index}
        total={slides.length}
        title={deck.title[locale]}
        showNotes={nav.showNotes}
        presenter={nav.presenter}
        onToggleNotes={() => nav.setShowNotes(!nav.showNotes)}
        onTogglePresenter={nav.togglePresenter}
        onPrev={() => nav.goToSlide(nav.index - 1)}
        onNext={() => nav.goToSlide(nav.index + 1)}
      />
      <div className="w-full bg-muted/40 h-1">
        <div className="bg-accent h-1 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
      </div>
      <RunnerSlide slide={currentSlide} locale={locale} />
      {nav.showNotes && <RunnerNotes notes={currentSlide.notes[locale]} locale={locale} />}
      <RunnerFooter slides={slides} currentIndex={nav.index} onGoTo={nav.goToSlide} />
    </div>
  );
}
