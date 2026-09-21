'use client';
// Interactive workshop filtering by status (all/upcoming/past)

import { BlurRevealHeading } from '@/components/animations/blur-reveal-heading';
import { GsapReveal } from '@/components/animations/gsap-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { SITE_CONTENT } from '@/content/site-data';
import { WORKSHOPS, type Workshop } from '@/content/workshops';
import { Link } from '@/i18n/navigation';
import { type LocaleCode } from '@/lib/preferences';
import { ArrowUpRight, Calendar, CheckCircle2, Clock, MapPin, Users } from 'lucide-react';
import { useState } from 'react';

function WorkshopMeta({ workshop, locale }: { workshop: Workshop; locale: LocaleCode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground py-2">
      <div className="flex items-center gap-2">
        <Calendar className="h-3.5 w-3.5 text-sky-400 shrink-0" />
        <span>{workshop.dateLabel[locale]}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-3.5 w-3.5 text-sky-400 shrink-0" />
        <span>{workshop.location[locale]}</span>
      </div>
      <div className="flex items-center gap-2 sm:col-span-2">
        <Users className="h-3.5 w-3.5 text-sky-400 shrink-0" />
        <span>{workshop.audience[locale]}</span>
      </div>
    </div>
  );
}

function WorkshopDeckList({ deckIds, locale }: { deckIds: string[]; locale: LocaleCode }) {
  if (deckIds.length === 0) return null;
  return (
    <div className="space-y-1.5 pt-1">
      <span className="text-muted-foreground font-mono text-[11px]">
        {locale === 'de' ? 'Zusammengestellt aus Decks:' : 'Composed from Decks:'}
      </span>
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {deckIds.map((deckId) => (
          <Link key={deckId} href={`/decks/${deckId}`}>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-foreground/90 transition-colors">
              {deckId} ↗
            </span>
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
    <CardHeader className="space-y-3 p-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge
          variant={isUpcoming ? 'default' : 'secondary'}
          className={
            isUpcoming
              ? 'font-mono text-xs bg-emerald-600 hover:bg-emerald-700 text-white border-0'
              : 'font-mono text-xs bg-white/[0.06] text-muted-foreground border-0'
          }
        >
          {statusLabel}
        </Badge>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Clock className="h-3 w-3 text-primary" />
          <span>{duration}</span>
        </div>
      </div>
      <CardTitle className="text-xl font-bold tracking-tight text-foreground">{title}</CardTitle>
      <div className="text-sm font-medium text-primary">{subtitle}</div>
      <CardDescription className="text-sm leading-relaxed text-muted-foreground pt-1">{description}</CardDescription>
    </CardHeader>
  );
}

function WorkshopTakeawayBox({ takeaway, locale }: { takeaway: Record<LocaleCode, string>; locale: LocaleCode }) {
  return (
    <div className="rounded-2xl bg-emerald-500/10 p-4 space-y-1">
      <div className="flex items-center gap-1.5 font-semibold text-emerald-400 text-xs font-mono">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
        <span>{locale === 'de' ? 'Konkretes Ergebnis (Takeaway)' : 'Core Takeaway'}:</span>
      </div>
      <p className="text-foreground/90 text-xs leading-relaxed pl-5">{takeaway[locale]}</p>
    </div>
  );
}

function WorkshopCardCta({ isUpcoming, ctaLabel }: { isUpcoming: boolean; ctaLabel: string }) {
  return (
    <CardFooter className="pt-2 p-0">
      <Button
        asChild
        size="sm"
        variant={isUpcoming ? 'default' : 'ghost'}
        className={
          isUpcoming
            ? 'w-full font-mono text-xs shadow-md'
            : 'w-full font-mono text-xs bg-white/[0.04] hover:bg-white/[0.08] text-foreground'
        }
      >
        <Link href="#contact">
          <span>{ctaLabel}</span>
          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
        </Link>
      </Button>
    </CardFooter>
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
    <SpotlightCard className="flex flex-col justify-between p-8 rounded-3xl bg-white/[0.035] backdrop-blur-md shadow-xl shadow-black/20 hover:bg-white/[0.06] transition-all">
      <WorkshopCardHeader
        isUpcoming={isUpcoming}
        statusLabel={statusLabel}
        duration={workshop.duration}
        title={workshop.title[locale]}
        subtitle={workshop.subtitle[locale]}
        description={workshop.description[locale]}
      />
      <CardContent className="space-y-4 p-0 py-5 text-xs">
        <WorkshopMeta workshop={workshop} locale={locale} />
        <WorkshopTakeawayBox takeaway={workshop.takeaway} locale={locale} />
        <WorkshopDeckList deckIds={workshop.composedDeckIds} locale={locale} />
      </CardContent>
      <WorkshopCardCta isUpcoming={isUpcoming} ctaLabel={ctaLabel} />
    </SpotlightCard>
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
    <div className="flex items-center rounded-full bg-white/[0.05] p-1.5 text-xs font-mono">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded-full px-4 py-1.5 transition-all ${
            active === tab
              ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {labels[tab]}
        </button>
      ))}
    </div>
  );
}

function WorkshopsHeader({
  locale,
  filter,
  onFilterChange,
}: {
  locale: LocaleCode;
  filter: 'all' | 'upcoming' | 'past';
  onFilterChange: (v: 'all' | 'upcoming' | 'past') => void;
}) {
  const headings = SITE_CONTENT.workshopsHeading;

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" data-reveal-item="true">
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
          <span>{locale === 'de' ? 'Kapitel 05 // Praxis & Befähigung' : 'Chapter 05 // Practice & Enablement'}</span>
        </div>
        <BlurRevealHeading
          text={headings.title[locale]}
          as="h2"
          className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight"
        />
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{headings.subtitle[locale]}</p>
      </div>
      <FilterTabs active={filter} onChange={onFilterChange} locale={locale} />
    </div>
  );
}

export function WorkshopsSection({ locale }: { locale: LocaleCode }) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filtered = WORKSHOPS.filter((w) => {
    if (filter === 'upcoming') return w.status === 'upcoming';
    if (filter === 'past') return w.status === 'past';
    return true;
  });

  return (
    <section data-chapter="05" className="py-24 md:py-32 relative" id="workshops">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
        <GsapReveal>
          <WorkshopsHeader locale={locale} filter={filter} onFilterChange={setFilter} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {filtered.map((workshop) => (
              <div key={workshop.id} data-reveal-item="true">
                <WorkshopCard workshop={workshop} locale={locale} />
              </div>
            ))}
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
