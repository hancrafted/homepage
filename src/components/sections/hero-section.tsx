import { GsapReveal } from '@/components/animations/gsap-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SITE_CONTENT, type StatItem } from '@/content/site-data';
import { Link } from '@/i18n/navigation';
import { type LocaleCode } from '@/lib/preferences';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

function HeroActions({ primaryLabel, secondaryLabel }: { primaryLabel: string; secondaryLabel: string }) {
  return (
    <div data-reveal-item="true" className="flex flex-wrap items-center gap-4 pt-4">
      <Button size="lg" asChild className="font-mono text-sm group">
        <Link href="#workshops">
          <span>{primaryLabel}</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      <Button size="lg" variant="outline" asChild className="font-mono text-sm">
        <Link href="#portfolio">
          <Terminal className="mr-2 h-4 w-4 text-accent" />
          <span>{secondaryLabel}</span>
        </Link>
      </Button>
    </div>
  );
}

function HeroStats({ stats, locale }: { stats: StatItem[]; locale: LocaleCode }) {
  return (
    <div data-reveal-item="true" className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-border/60">
      {stats.map((stat, idx) => (
        <div key={idx} className="space-y-1" data-stat-card="true">
          <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">{stat.value}</div>
          <div className="text-xs font-semibold text-foreground uppercase tracking-wider">{stat.label[locale]}</div>
          <div className="text-xs text-muted-foreground">{stat.detail[locale]}</div>
        </div>
      ))}
    </div>
  );
}

export function HeroSection({ locale }: { locale: LocaleCode }) {
  const hero = SITE_CONTENT.hero;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-border/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <GsapReveal>
          <div className="max-w-4xl space-y-6">
            <div data-reveal-item="true">
              <Badge variant="accent" className="gap-1.5 py-1 px-3 text-xs tracking-wide">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span>{hero.badge[locale]}</span>
              </Badge>
            </div>

            <div data-reveal-item="true" className="space-y-1">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]"
                data-hero-headline="true"
              >
                {hero.headlinePart1[locale]}
                <br />
                <span className="text-accent underline decoration-accent/30 underline-offset-8">
                  {hero.headlinePart2[locale]}
                </span>
              </h1>
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
