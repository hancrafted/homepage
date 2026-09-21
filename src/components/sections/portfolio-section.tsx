import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
    <CardFooter className="pt-2 flex flex-col gap-2">
      <Button asChild size="sm" className="w-full font-mono text-xs group/btn">
        <Link href={`/decks/${slug}`}>
          <span>{viewLabel}</span>
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </Button>
      {hasVideo && (
        <Button
          asChild
          size="sm"
          variant="outline"
          className="w-full font-mono text-xs text-muted-foreground hover:text-foreground"
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
    <CardHeader className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Layers className="h-3.5 w-3.5 text-accent" />
          <span>{slidesCount} Slides</span>
        </div>
        {hasVideo && (
          <Badge
            variant="secondary"
            className="gap-1 font-mono text-[11px] text-red-500 bg-red-500/10 border-red-500/20"
          >
            <Video className="h-3 w-3 fill-current" />
            <span>YouTube</span>
          </Badge>
        )}
      </div>
      <CardTitle className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
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
    <Card className="flex flex-col justify-between border-border hover:border-accent/50 transition-all hover:shadow-lg group bg-card">
      <DeckCardHeader
        slidesCount={deck.slides.length}
        hasVideo={hasVideo}
        title={deck.title[locale]}
        subtitle={deck.subtitle[locale]}
      />
      <CardContent className="space-y-4 text-xs">
        <div className="rounded-lg bg-muted/50 p-3 space-y-1.5 border border-border/60">
          <div className="flex items-center gap-1 font-semibold text-foreground text-[11px] uppercase tracking-wider font-mono">
            <Lightbulb className="h-3.5 w-3.5 text-accent" />
            <span>{locale === 'de' ? 'Kernaussage (Thesis)' : 'Core Thesis'}:</span>
          </div>
          <p className="text-muted-foreground leading-relaxed italic">{deck.thesis[locale]}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {deck.subjectDomains.map((domain) => (
            <Badge key={domain} variant="outline" className="text-[10px] font-mono">
              {domain}
            </Badge>
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
    </Card>
  );
}

export function PortfolioSection({ locale }: { locale: LocaleCode }) {
  const headings = SITE_CONTENT.decksHeading;

  return (
    <section className="py-20 border-b border-border/70 bg-muted/15" id="portfolio">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
            // Knowledge & Decks
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{headings.title[locale]}</h2>
          <p className="text-muted-foreground text-base leading-relaxed">{headings.subtitle[locale]}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {DECKS.map((deck) => (
            <DeckCard key={deck.id} deck={deck} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
