'use client';

import { BlurRevealHeading } from '@/components/animations/blur-reveal-heading';
import { GsapReveal } from '@/components/animations/gsap-reveal';
import { MetricCounter } from '@/components/animations/metric-counter';
import { WorkDisplacementCanvas } from '@/components/sections/hero/work-displacement';
import { Button } from '@/components/ui/button';
import { SITE_CONTENT, type StatItem } from '@/content/site-data';
import { Link } from '@/i18n/navigation';
import { type LocaleCode } from '@/lib/preferences';
import { ArrowDown, ArrowRight, Sparkles, Terminal, Users } from 'lucide-react';

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

function HeroServicePills({ pills, locale }: { pills: typeof SITE_CONTENT.hero.servicePills; locale: LocaleCode }) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'consulting':
        return Terminal;
      case 'coaching':
        return Users;
      default:
        return Sparkles;
    }
  };

  return (
    <div data-reveal-item="true" className="flex flex-wrap items-center gap-2.5">
      {pills.map((pill) => {
        const Icon = getIcon(pill.id);
        const href = pill.id === 'workshops' ? '#workshops' : '#about';
        return (
          <Link
            key={pill.id}
            href={href}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-card/80 dark:bg-white/[0.04] border border-border/80 dark:border-white/[0.08] hover:border-primary/50 hover:bg-primary/10 shadow-sm transition-all text-foreground/90 group"
          >
            <Icon className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-foreground">{pill.label[locale]}:</span>
            <span className="text-muted-foreground">{pill.detail[locale]}</span>
          </Link>
        );
      })}
    </div>
  );
}

function HeroActions({ primaryLabel, secondaryLabel }: { primaryLabel: string; secondaryLabel: string }) {
  return (
    <div data-reveal-item="true" className="flex flex-wrap items-center gap-4 pt-2">
      <Button size="lg" asChild className="font-mono text-sm group shadow-md hover:shadow-lg transition-all">
        <Link href="#workshops">
          <span>{primaryLabel}</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      <Button
        size="lg"
        variant="ghost"
        asChild
        className="font-mono text-sm bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.05] dark:hover:bg-white/[0.08] text-foreground border border-border/60"
      >
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
    <div data-reveal-item="true" className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="space-y-1.5 p-4 rounded-2xl bg-card border border-border/60 dark:border-white/[0.06] dark:bg-white/[0.035] backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 hover:bg-muted/40 dark:hover:bg-white/[0.06] transition-all"
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

function HeroScrollInvite({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';

  const handleScrollDown = () => {
    const el = document.getElementById('narrative-bridge');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div data-reveal-item="true" className="pt-12 flex flex-col items-center justify-center text-center">
      <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary/50 to-primary mb-3" />
      <button
        type="button"
        onClick={handleScrollDown}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wider text-muted-foreground hover:text-foreground bg-card/60 dark:bg-white/[0.03] border border-border/60 dark:border-white/[0.08] hover:border-primary/50 hover:bg-primary/5 backdrop-blur-md transition-all group"
      >
        <ArrowDown className="h-3.5 w-3.5 text-primary group-hover:translate-y-0.5 transition-transform" />
        <span>
          {isDe ? 'KAPITEL 02: WO DIE ARBEIT WIRKLICH LANDET' : 'SCROLL TO CHAPTER 02 // WHERE THE WORK ACTUALLY LANDS'}
        </span>
      </button>
    </div>
  );
}

function HeroAmbientBackground() {
  return (
    <>
      <WorkDisplacementCanvas />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl opacity-70" />
    </>
  );
}

export function HeroSection({ locale }: { locale: LocaleCode }) {
  const hero = SITE_CONTENT.hero;

  return (
    <section
      data-chapter="01"
      className="relative overflow-hidden pt-24 sm:pt-28 md:pt-36 pb-20 md:pb-28 bg-background"
    >
      <HeroAmbientBackground />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <GsapReveal>
          <div className="space-y-8">
            <div className="max-w-4xl space-y-6">
              {/* Service chips at top instead of green label */}
              <HeroServicePills pills={hero.servicePills} locale={locale} />

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
            </div>

            <HeroStats stats={SITE_CONTENT.stats} locale={locale} />
            <HeroScrollInvite locale={locale} />
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
