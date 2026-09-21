'use client';
// Interactive workshop filtering by status (all/upcoming/past)

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SITE_CONTENT } from '@/content/site-data';
import { WORKSHOPS, type Workshop } from '@/content/workshops';
import { Link } from '@/i18n/navigation';
import { type LocaleCode } from '@/lib/preferences';
import { ArrowUpRight, Calendar, CheckCircle2, Clock, MapPin, Users } from 'lucide-react';
import { useState } from 'react';

function WorkshopMeta({ workshop, locale }: { workshop: Workshop; locale: LocaleCode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground border-y border-border/60 py-3">
      <div className="flex items-center gap-2">
        <Calendar className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
        <span>{workshop.dateLabel[locale]}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
        <span>{workshop.location[locale]}</span>
      </div>
      <div className="flex items-center gap-2 sm:col-span-2">
        <Users className="h-3.5 w-3.5 text-foreground/70 shrink-0" />
        <span>{workshop.audience[locale]}</span>
      </div>
    </div>
  );
}

function WorkshopDeckList({ deckIds, locale }: { deckIds: string[]; locale: LocaleCode }) {
  if (deckIds.length === 0) return null;
  return (
    <div className="space-y-1 pt-1">
      <span className="text-muted-foreground font-mono text-[11px]">
        {locale === 'de' ? 'Zusammengestellt aus Decks:' : 'Composed from Decks:'}
      </span>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {deckIds.map((deckId) => (
          <Link key={deckId} href={`/decks/${deckId}`}>
            <Badge variant="outline" className="text-[11px] font-mono hover:bg-muted transition-colors">
              {deckId} ↗
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}

function WorkshopCardHeader({
  isUpcoming,
  statusLabel,
  duration,
  title,
  subtitle,
  description,
}: {
  isUpcoming: boolean;
  statusLabel: string;
  duration: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <CardHeader className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant={isUpcoming ? 'accent' : 'secondary'} className="font-mono text-xs">
          {statusLabel}
        </Badge>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Clock className="h-3 w-3" />
          <span>{duration}</span>
        </div>
      </div>
      <CardTitle className="text-xl font-bold tracking-tight">{title}</CardTitle>
      <div className="text-sm font-medium text-accent">{subtitle}</div>
      <CardDescription className="text-sm leading-relaxed text-muted-foreground pt-1">{description}</CardDescription>
    </CardHeader>
  );
}

function WorkshopCard({ workshop, locale }: { workshop: Workshop; locale: LocaleCode }) {
  const isUpcoming = workshop.status === 'upcoming';
  const statusLabel = isUpcoming
    ? locale === 'de'
      ? 'Bevorstehend'
      : 'Upcoming'
    : locale === 'de'
      ? 'Abgeschlossen'
      : 'Past Session';
  const ctaLabel = isUpcoming
    ? locale === 'de'
      ? 'Teilnahme / Session anfragen'
      : 'Inquire for Cohort'
    : locale === 'de'
      ? 'Re-Run anfragen'
      : 'Inquire Re-Run';

  return (
    <Card className="flex flex-col justify-between border-border hover:border-accent/40 transition-all hover:shadow-md">
      <WorkshopCardHeader
        isUpcoming={isUpcoming}
        statusLabel={statusLabel}
        duration={workshop.duration}
        title={workshop.title[locale]}
        subtitle={workshop.subtitle[locale]}
        description={workshop.description[locale]}
      />
      <CardContent className="space-y-4 text-xs">
        <WorkshopMeta workshop={workshop} locale={locale} />
        <div className="rounded-lg bg-muted/40 p-3 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
            <span>{locale === 'de' ? 'Konkretes Takeaway' : 'Core Takeaway'}:</span>
          </div>
          <p className="text-muted-foreground leading-relaxed pl-5">{workshop.takeaway[locale]}</p>
        </div>
        <WorkshopDeckList deckIds={workshop.composedDeckIds} locale={locale} />
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild size="sm" variant={isUpcoming ? 'default' : 'outline'} className="w-full font-mono text-xs">
          <Link href="#contact">
            <span>{ctaLabel}</span>
            <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function FilterTabs({
  active,
  onChange,
  locale,
}: {
  active: 'all' | 'upcoming' | 'past';
  onChange: (v: 'all' | 'upcoming' | 'past') => void;
  locale: LocaleCode;
}) {
  const headings = SITE_CONTENT.workshopsHeading;
  const tabs: ('all' | 'upcoming' | 'past')[] = ['all', 'upcoming', 'past'];
  const labels = {
    all: headings.tabAll[locale],
    upcoming: headings.tabUpcoming[locale],
    past: headings.tabPast[locale],
  };

  return (
    <div className="flex items-center rounded-lg border bg-muted/40 p-1 text-xs font-mono">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded px-3 py-1.5 transition-all ${
            active === tab
              ? 'bg-background text-foreground shadow-sm font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {labels[tab]}
        </button>
      ))}
    </div>
  );
}

export function WorkshopsSection({ locale }: { locale: LocaleCode }) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const headings = SITE_CONTENT.workshopsHeading;

  const filtered = WORKSHOPS.filter((w) => {
    if (filter === 'upcoming') return w.status === 'upcoming';
    if (filter === 'past') return w.status === 'past';
    return true;
  });

  return (
    <section className="py-20 border-b border-border/70" id="workshops">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
              // Live Practice
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{headings.title[locale]}</h2>
            <p className="text-muted-foreground text-base leading-relaxed">{headings.subtitle[locale]}</p>
          </div>
          <FilterTabs active={filter} onChange={setFilter} locale={locale} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {filtered.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
