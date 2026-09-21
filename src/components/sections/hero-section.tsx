'use client';

import { BlurRevealHeading } from '@/components/animations/blur-reveal-heading';
import { GsapReveal } from '@/components/animations/gsap-reveal';
import { MetricCounter } from '@/components/animations/metric-counter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SITE_CONTENT, type StatItem } from '@/content/site-data';
import { Link } from '@/i18n/navigation';
import { type LocaleCode } from '@/lib/preferences';
import { ArrowRight, Cpu, Sparkles, Terminal } from 'lucide-react';

function HeroActions({ primaryLabel, secondaryLabel }: { primaryLabel: string; secondaryLabel: string }) {
  return (
    <div data-reveal-item="true" className="flex flex-wrap items-center gap-4 pt-2">
      <Button size="lg" asChild className="font-mono text-sm group shadow-sm hover:shadow transition-all">
        <Link href="#workshops">
          <span>{primaryLabel}</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      <Button size="lg" variant="outline" asChild className="font-mono text-sm border-border/80 hover:bg-muted/50">
        <Link href="#portfolio">
          <Terminal className="mr-2 h-4 w-4 text-primary" />
          <span>{secondaryLabel}</span>
        </Link>
      </Button>
    </div>
  );
}

function HeroStats({ stats, locale }: { stats: StatItem[]; locale: LocaleCode }) {
  return (
    <div data-reveal-item="true" className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-border/70">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="space-y-1 p-3.5 rounded-lg border border-border/70 bg-card/75 backdrop-blur-sm shadow-xs transition-colors hover:border-primary/40"
          data-stat-card="true"
        >
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
            <MetricCounter value={stat.value} />
          </div>
          <div className="text-xs font-semibold text-foreground uppercase tracking-wider">{stat.label[locale]}</div>
          <div className="text-xs text-muted-foreground">{stat.detail[locale]}</div>
        </div>
      ))}
    </div>
  );
}

function HeroAmbientBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-20 bg-precision-grid opacity-35 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl opacity-70" />
    </>
  );
}

function HeroHeadline({ part1, part2 }: { part1: string; part2: string }) {
  return (
    <h1
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]"
      data-hero-headline="true"
    >
      <BlurRevealHeading as="span" text={part1} delay={0.1} stagger={0.6} triggerOnScroll={false} />
      <br />
      <BlurRevealHeading
        as="span"
        text={part2}
        delay={0.45}
        stagger={0.6}
        triggerOnScroll={false}
        className="text-primary underline decoration-primary/30 underline-offset-8"
      />
    </h1>
  );
}

function HeroHeaderBadge({ badgeText }: { badgeText: string }) {
  return (
    <div data-reveal-item="true" className="flex flex-wrap items-center gap-3">
      <Badge variant="secondary" className="gap-1.5 py-1 px-3 text-xs tracking-wide border border-border/80 font-mono">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span>{badgeText}</span>
      </Badge>
      <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
        <Cpu className="h-3 w-3 text-primary" />
        <span>ACT 01 // FOUNDATION</span>
      </div>
    </div>
  );
}

export function HeroSection({ locale }: { locale: LocaleCode }) {
  const hero = SITE_CONTENT.hero;

  return (
    <section
      data-chapter="01"
      className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-border/70 bg-background"
    >
      <HeroAmbientBackground />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <GsapReveal>
          <div className="max-w-4xl space-y-6">
            <HeroHeaderBadge badgeText={hero.badge[locale]} />
            <div data-reveal-item="true" className="space-y-1">
              <HeroHeadline part1={hero.headlinePart1[locale]} part2={hero.headlinePart2[locale]} />
            </div>
            <p
              data-reveal-item="true"
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl font-normal"
            >
              {hero.paragraph[locale]}
            </p>
            <HeroActions primaryLabel={hero.primaryCta[locale]} secondaryLabel={hero.secondaryCta[locale]} />
            <HeroStats stats={SITE_CONTENT.stats} locale={locale} />
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
