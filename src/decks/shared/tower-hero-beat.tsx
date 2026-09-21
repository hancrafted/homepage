'use client';
// Hero beat component for deck tower pages (Tenet 7)

import { Button } from '@/components/ui/button';
import { type Deck, type SlideData } from '@/content/decks/types';
import { type LocaleCode } from '@/lib/preferences';
import { Play, Sparkles, Volume2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function HeroBackdrop({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 overflow-hidden opacity-25">
      <Image
        src="/assets/decks/ai-token-economy/hero.webp"
        alt="Hero background"
        fill
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
    </div>
  );
}

function HeroVideoLauncher({ title, duration, isDe }: { title: string; duration?: string; isDe: boolean }) {
  const handleLaunchVideo = () => {
    const el = document.getElementById('recording');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleLaunchVideo}
        className="gap-3 h-auto py-3 px-4 rounded-xl border-border bg-card/70 hover:border-accent hover:bg-accent/5 text-left transition-all"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shrink-0 shadow-sm">
          <Play className="h-4 w-4 fill-current ml-0.5" />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {isDe ? 'Vortrag ansehen' : 'Watch the talk'} · {duration ?? '30 min'}
          </div>
          <div className="text-xs font-semibold text-foreground">{title}</div>
        </div>
      </Button>
    </div>
  );
}

function HeroSpeakerNotes({ notes, show, isDe }: { notes?: string; show: boolean; isDe: boolean }) {
  if (!show || !notes) return null;
  return (
    <aside className="mt-6 p-5 rounded-xl border-l-4 border-secondary/60 bg-muted/30 text-xs leading-relaxed text-foreground/90 space-y-2">
      <div className="font-mono font-bold text-[11px] text-secondary uppercase tracking-widest flex items-center gap-1.5">
        <Volume2 className="h-3.5 w-3.5" />
        <span>{isDe ? 'Sprechernotiz (Hero)' : 'Speaker Note (Hero)'}</span>
      </div>
      <p>{notes}</p>
    </aside>
  );
}

function HeroMeterCounter({ isAiToken, isDe }: { isAiToken: boolean; isDe: boolean }) {
  const [tokensBilled, setTokensBilled] = useState(148);

  useEffect(() => {
    if (!isAiToken) return;
    const interval = setInterval(() => {
      setTokensBilled((prev) => prev + Math.floor(Math.random() * 12) + 3);
    }, 1800);
    return () => clearInterval(interval);
  }, [isAiToken]);

  if (!isAiToken) return null;

  return (
    <div className="absolute bottom-6 right-0 font-mono text-right hidden sm:block">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center justify-end gap-1">
        <Sparkles className="h-3 w-3 text-accent" />
        <span>{isDe ? 'Tokens berechnet · unbemerkt' : 'Tokens billed · unwatched'}</span>
      </div>
      <div className="text-2xl font-bold tabular-nums text-foreground/70">{tokensBilled.toLocaleString()}</div>
    </div>
  );
}

export function TowerHeroBeat({
  deck,
  slide,
  showNotes,
  locale,
}: {
  deck: Deck;
  slide: SlideData;
  showNotes: boolean;
  locale: LocaleCode;
}) {
  const isDe = locale === 'de';
  const isAiToken = deck.slug === 'ai-token-economy';

  return (
    <section
      id={slide.id}
      className="relative z-0 min-h-[70vh] flex flex-col justify-center py-16 sm:py-24 border-b border-border/40 scroll-mt-20"
    >
      <HeroBackdrop show={isAiToken} />

      <div className="space-y-6 max-w-4xl">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent font-bold">
          S1.1 · {isDe ? 'Einleitung' : 'Intro'}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]">
          {deck.title[locale]}
        </h1>

        <p className="text-lg sm:text-xl font-light text-foreground/80 leading-relaxed max-w-3xl">
          {deck.subtitle[locale]}
        </p>

        {deck.youtubeVideoId && (
          <HeroVideoLauncher title={deck.title[locale]} duration={deck.recordingDuration} isDe={isDe} />
        )}

        <HeroSpeakerNotes notes={slide.notes[locale]} show={showNotes} isDe={isDe} />
      </div>

      <HeroMeterCounter isAiToken={isAiToken} isDe={isDe} />
    </section>
  );
}
