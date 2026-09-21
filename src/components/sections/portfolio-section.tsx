import { BlurRevealHeading } from '@/components/animations/blur-reveal-heading';
import { GsapReveal } from '@/components/animations/gsap-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { DECKS, type Deck } from '@/content/decks';
import { SITE_CONTENT } from '@/content/site-data';
import { Link } from '@/i18n/navigation';
import { type LocaleCode } from '@/lib/preferences';
import { ArrowRight, Layers, Lightbulb, Play, Video } from 'lucide-react';

function DeckCardActions({
  slug,
  hasVideo,
  duration,
  viewLabel,
  watchLabel,
}: {
  slug: string;
  hasVideo: boolean;
  duration?: string;
  viewLabel: string;
  watchLabel: string;
}) {
  return (
    <CardFooter className="pt-2 p-0 flex flex-col gap-2">
      <Button asChild size="sm" className="w-full font-mono text-xs group/btn shadow-md">
        <Link href={`/decks/${slug}`}>
          <span>{viewLabel}</span>
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </Button>
      {hasVideo && (
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="w-full font-mono text-xs bg-white/[0.04] hover:bg-white/[0.08] text-foreground/90"
        >
          <Link href={`/decks/${slug}#recording`}>
            <Play className="mr-1.5 h-3 w-3 text-red-500 fill-current" />
            <span>
              {watchLabel} ({duration})
            </span>
          </Link>
        </Button>
      )}
    </CardFooter>
  );
}

function DeckCardHeader({
  slidesCount,
  hasVideo,
  title,
  subtitle,
}: {
  slidesCount: number;
  hasVideo: boolean;
  title: string;
  subtitle: string;
}) {
  return (
    <CardHeader className="space-y-3 p-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-mono text-xs text-sky-400 font-medium">
          <Layers className="h-3.5 w-3.5" />
          <span>{slidesCount} Slides</span>
        </div>
        {hasVideo && (
          <Badge variant="secondary" className="gap-1 font-mono text-[11px] text-red-400 bg-red-500/10 border-0">
            <Video className="h-3 w-3 fill-current" />
            <span>YouTube</span>
          </Badge>
        )}
      </div>
      <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors text-foreground">
        {title}
      </CardTitle>
      <CardDescription className="text-xs leading-relaxed text-muted-foreground">{subtitle}</CardDescription>
    </CardHeader>
  );
}

function DeckCard({ deck, locale }: { deck: Deck; locale: LocaleCode }) {
  const headings = SITE_CONTENT.decksHeading;
  const hasVideo = Boolean(deck.youtubeVideoId);

  return (
    <SpotlightCard className="flex flex-col justify-between p-7 rounded-3xl bg-white/[0.035] backdrop-blur-md shadow-xl shadow-black/20 hover:bg-white/[0.06] transition-all group">
      <DeckCardHeader
        slidesCount={deck.slides.length}
        hasVideo={hasVideo}
        title={deck.title[locale]}
        subtitle={deck.subtitle[locale]}
      />
      <CardContent className="space-y-4 p-0 py-4 text-xs">
        <div className="rounded-2xl bg-amber-500/10 p-4 space-y-1.5">
          <div className="flex items-center gap-1 font-semibold text-amber-400 text-[11px] uppercase tracking-wider font-mono">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>{locale === 'de' ? 'Kernaussage (Thesis)' : 'Core Thesis'}:</span>
          </div>
          <p className="text-foreground/80 leading-relaxed italic">{deck.thesis[locale]}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {deck.subjectDomains.map((domain) => (
            <span
              key={domain}
              className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.05] text-muted-foreground"
            >
              {domain}
            </span>
          ))}
        </div>
      </CardContent>
      <DeckCardActions
        slug={deck.slug}
        hasVideo={hasVideo}
        duration={deck.recordingDuration}
        viewLabel={headings.viewTowerPage[locale]}
        watchLabel={headings.watchOnYoutube[locale]}
      />
    </SpotlightCard>
  );
}

function PortfolioHeader({ locale }: { locale: LocaleCode }) {
  const headings = SITE_CONTENT.decksHeading;

  return (
    <div className="max-w-3xl space-y-4" data-reveal-item="true">
      <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
        <span>{locale === 'de' ? 'Kapitel 04 // Verifizierte Artefakte' : 'Chapter 04 // Verified Artefacts'}</span>
      </div>
      <BlurRevealHeading
        text={headings.title[locale]}
        as="h2"
        className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight"
      />
      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{headings.subtitle[locale]}</p>
    </div>
  );
}

export function PortfolioSection({ locale }: { locale: LocaleCode }) {
  return (
    <section data-chapter="04" className="py-24 md:py-32 relative" id="portfolio">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
        <GsapReveal>
          <PortfolioHeader locale={locale} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
            {DECKS.map((deck) => (
              <div key={deck.id} data-reveal-item="true">
                <DeckCard deck={deck} locale={locale} />
              </div>
            ))}
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
