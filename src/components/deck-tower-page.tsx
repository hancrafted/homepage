'use client';
// Interactive scroll spy, active section tracking, and keyboard shortcuts for deck tower (Tenet 7)

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DECKS, type Deck, type SlideData } from '@/content/decks';
import { TowerBeatItem } from '@/decks/shared/tower-beat-item';
import { TowerHeroBeat } from '@/decks/shared/tower-hero-beat';
import { TowerRail } from '@/decks/shared/tower-rail';
import { TowerSources } from '@/decks/shared/tower-sources';
import { getDeckSections } from '@/decks/shared/tower-types';
import { YouTubePlayer } from '@/decks/shared/youtube-player';
import { Link } from '@/i18n/navigation';
import { type LocaleCode } from '@/lib/preferences';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Video } from 'lucide-react';
import { useEffect, useState } from 'react';

function TowerBreadcrumb({ title, locale }: { title: string; locale: LocaleCode }) {
  return (
    <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
      <Link href="/" className="hover:text-foreground transition-colors">
        {locale === 'de' ? 'Startseite' : 'Home'}
      </Link>
      <ChevronRight className="h-3 w-3" />
      <Link href="/#portfolio" className="hover:text-foreground transition-colors">
        {locale === 'de' ? 'Episoden (Portfolio)' : 'Episodes (Portfolio)'}
      </Link>
      <ChevronRight className="h-3 w-3" />
      <span className="text-foreground truncate">{title}</span>
    </nav>
  );
}

function TowerRecordingSection({
  videoId,
  title,
  duration,
  locale,
}: {
  videoId?: string;
  title: string;
  duration?: string;
  locale: LocaleCode;
}) {
  if (!videoId) return null;
  return (
    <section id="recording" className="space-y-4 pt-12 border-t border-border/60 scroll-mt-20">
      <div className="space-y-1">
        <div className="font-mono text-xs font-semibold text-red-500 uppercase tracking-widest flex items-center gap-1.5">
          <Video className="h-3.5 w-3.5 fill-current" />
          <span>{locale === 'de' ? 'Aufgezeichnete Präsentation' : 'Recorded Presentation Session'}</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {locale === 'de' ? 'Live-Vortrag auf YouTube ansehen' : 'Watch Live Presentation on YouTube'}
        </h2>
      </div>
      <YouTubePlayer videoId={videoId} title={title} duration={duration} />
    </section>
  );
}

function TowerTakeawaySection({ takeaway, locale }: { takeaway: string; locale: LocaleCode }) {
  return (
    <section className="p-8 rounded-xl border border-border bg-muted/30 space-y-4">
      <div className="flex items-center gap-2 font-mono text-sm font-bold text-foreground">
        <CheckCircle2 className="h-5 w-5 text-accent" />
        <span>{locale === 'de' ? 'Zusammenfassung & Takeaway' : 'Takeaway & Action'}:</span>
      </div>
      <p className="text-base text-foreground/90 leading-relaxed font-medium">{takeaway}</p>
      <div className="pt-2">
        <Button asChild size="sm" className="font-mono text-xs">
          <Link href="/#contact">
            <span>{locale === 'de' ? 'Diesen Inhalt als Workshop buchen' : 'Inquire for Live Workshop'}</span>
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function TowerOtherDecks({ currentSlug, locale }: { currentSlug: string; locale: LocaleCode }) {
  const others = DECKS.filter((d) => d.slug !== currentSlug);
  return (
    <section className="pt-8 border-t border-border space-y-6">
      <h3 className="text-lg font-bold tracking-tight text-foreground font-mono">
        // {locale === 'de' ? 'Weitere Decks im Portfolio' : 'More Decks in Portfolio'}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {others.map((other) => (
          <Link key={other.id} href={`/episodes/${other.slug}`} className="block group">
            <Card className="h-full border-border hover:border-accent/40 transition-all p-4 space-y-2">
              <div className="font-bold text-sm text-foreground group-hover:text-accent transition-colors flex items-center justify-between">
                <span>{other.title[locale]}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{other.subtitle[locale]}</p>
            </Card>
          </Link>
        ))}
      </div>
      <div className="pt-2">
        <Button asChild variant="outline" size="sm" className="font-mono text-xs">
          <Link href="/#portfolio">
            <ArrowLeft className="mr-2 h-3.5 w-3.5" />
            <span>{locale === 'de' ? 'Zurück zur Übersicht' : 'Back to Portfolio Overview'}</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

function useTowerScrollSpy(slides: SlideData[]) {
  const [activeBeatId, setActiveBeatId] = useState(slides[0]?.id ?? 'slide-1');
  const [showNotes, setShowNotes] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100)));
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyN' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        setShowNotes((prev) => !prev);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveBeatId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );
    slides.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [slides]);

  return { activeBeatId, showNotes, setShowNotes, progress };
}

function TowerMainColumn({ deck, showNotes, locale }: { deck: Deck; showNotes: boolean; locale: LocaleCode }) {
  return (
    <main className="min-w-0 space-y-4">
      <TowerHeroBeat deck={deck} slide={deck.slides[0]} showNotes={showNotes} locale={locale} />
      {deck.slides.slice(1).map((slide) => (
        <TowerBeatItem key={slide.id} deckSlug={deck.slug} slide={slide} showNotes={showNotes} locale={locale} />
      ))}
      <TowerRecordingSection
        videoId={deck.youtubeVideoId}
        title={deck.title[locale]}
        duration={deck.recordingDuration}
        locale={locale}
      />
      <TowerSources sources={deck.sources} locale={locale} />
      <TowerTakeawaySection takeaway={deck.takeaway[locale]} locale={locale} />
      <TowerOtherDecks currentSlug={deck.slug} locale={locale} />
    </main>
  );
}

export function DeckTowerPage({ deck, locale }: { deck: Deck; locale: LocaleCode }) {
  const { activeBeatId, showNotes, setShowNotes, progress } = useTowerScrollSpy(deck.slides);
  const sections = getDeckSections(deck);

  return (
    <div className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <TowerBreadcrumb title={deck.title[locale]} locale={locale} />

        <div className="lg:grid lg:grid-cols-[18rem_1fr] gap-8 items-start">
          <TowerRail
            sections={sections}
            activeBeatId={activeBeatId}
            progress={progress}
            showNotes={showNotes}
            onToggleNotes={() => setShowNotes((p) => !p)}
            locale={locale}
          />

          <TowerMainColumn deck={deck} showNotes={showNotes} locale={locale} />
        </div>
      </div>
    </div>
  );
}
