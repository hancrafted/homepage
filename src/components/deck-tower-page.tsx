import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DECKS, type Deck } from '@/content/decks';
import { DeckRunner } from '@/decks/shared/deck-runner';
import { YouTubePlayer } from '@/decks/shared/youtube-player';
import { Link } from '@/i18n/navigation';
import { type LocaleCode } from '@/lib/preferences';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Layers, Lightbulb, Video } from 'lucide-react';

function TowerBreadcrumb({ title, locale }: { title: string; locale: LocaleCode }) {
  return (
    <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
      <Link href="/" className="hover:text-foreground transition-colors">
        {locale === 'de' ? 'Startseite' : 'Home'}
      </Link>
      <ChevronRight className="h-3 w-3" />
      <Link href="/#portfolio" className="hover:text-foreground transition-colors">
        {locale === 'de' ? 'Decks (Portfolio)' : 'Decks (Portfolio)'}
      </Link>
      <ChevronRight className="h-3 w-3" />
      <span className="text-foreground truncate">{title}</span>
    </nav>
  );
}

function TowerHeader({ deck, locale }: { deck: Deck; locale: LocaleCode }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="accent" className="font-mono text-xs">
          Tower Page
        </Badge>
        {deck.youtubeVideoId && (
          <Badge variant="secondary" className="gap-1 font-mono text-xs text-red-500 bg-red-500/10 border-red-500/20">
            <Video className="h-3 w-3 fill-current" />
            <span>YouTube Recording Available</span>
          </Badge>
        )}
        <Badge variant="outline" className="font-mono text-xs">
          {deck.slides.length} Slides
        </Badge>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
        {deck.title[locale]}
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed">{deck.subtitle[locale]}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent uppercase tracking-wider">
            <Lightbulb className="h-4 w-4" />
            <span>{locale === 'de' ? 'Die Kernaussage (Thesis)' : 'Core Thesis'}</span>
          </div>
          <p className="text-sm text-foreground font-medium leading-relaxed">{deck.thesis[locale]}</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
            <Layers className="h-4 w-4 text-accent" />
            <span>{locale === 'de' ? 'Die Analogie (Analogy)' : 'The Analogy'}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{deck.analogy[locale]}</p>
        </div>
      </div>
    </div>
  );
}

function TowerSlideList({ deck, locale }: { deck: Deck; locale: LocaleCode }) {
  return (
    <section className="space-y-6 pt-8">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {locale === 'de' ? 'Detaillierte Folienübersicht' : 'Slide-by-Slide Analysis'}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {deck.slides.map((slide) => (
          <Card key={slide.id} className="border-border">
            <CardHeader className="py-4 px-6 flex flex-row items-center justify-between gap-4 border-b border-border/50 bg-muted/20">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-accent/15 text-accent font-mono text-xs font-bold">
                  {slide.number}
                </span>
                <CardTitle className="text-base font-bold">{slide.title[locale]}</CardTitle>
              </div>
              <Badge variant="outline" className="font-mono text-[10px]">
                {slide.highlight[locale]}
              </Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-sm">
              <div className="font-medium text-foreground text-base border-l-2 border-accent pl-3">
                {slide.claim[locale]}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pl-3">
                <span className="font-mono text-foreground font-semibold">Notes: </span>
                {slide.notes[locale]}
              </p>
            </CardContent>
          </Card>
        ))}
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
          <Link key={other.id} href={`/decks/${other.slug}`} className="block group">
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
    <section id="recording" className="space-y-4 pt-8">
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

export function DeckTowerPage({ deck, locale }: { deck: Deck; locale: LocaleCode }) {
  return (
    <div className="py-12 space-y-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
        <TowerBreadcrumb title={deck.title[locale]} locale={locale} />
        <TowerHeader deck={deck} locale={locale} />

        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-foreground font-mono">// Interactive Deck Runner</h2>
            <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
              Controls in header • [←/→] to navigate
            </span>
          </div>
          <DeckRunner deck={deck} locale={locale} />
        </section>

        <TowerRecordingSection
          videoId={deck.youtubeVideoId}
          title={deck.title[locale]}
          duration={deck.recordingDuration}
          locale={locale}
        />
        <TowerSlideList deck={deck} locale={locale} />
        <TowerTakeawaySection takeaway={deck.takeaway[locale]} locale={locale} />
        <TowerOtherDecks currentSlug={deck.slug} locale={locale} />
      </div>
    </div>
  );
}
