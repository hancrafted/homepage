'use client';

import { BlurRevealHeading } from '@/components/animations/blur-reveal-heading';
import { GsapReveal } from '@/components/animations/gsap-reveal';
import { LiquidInkTransition } from '@/components/animations/liquid-ink-transition';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { type LocaleCode } from '@/lib/preferences';
import { useResolvedTheme } from '@/lib/use-theme';
import { AlertTriangle, ArrowRight, Gauge, ShieldCheck } from 'lucide-react';

const SHIFTS = [
  {
    id: 'cost',
    icon: AlertTriangle,
    tag: { en: 'The Cost Shift', de: 'Der Kosten-Shift' },
    title: {
      en: 'From Cheap Prompts to Invisible Debt',
      de: 'Vom billigen Prompt zur unsichtbaren Schuld',
    },
    body: {
      en: 'AI speedups in drafting create 3x verification backlogs downstream. If nobody owns quality checks, your most senior engineers become full-time bug sorters.',
      de: 'Schnellere Entwürfe erzeugen nachgelagerte Verifikations-Staus. Ohne systematische Prüfungen werden Senior-Ingenieure zu Vollzeit-Fehlersuchern.',
    },
    stat: '3.2x',
    statLabel: { en: 'Verification Overhead', de: 'Prüfaufwand nach Rollout' },
  },
  {
    id: 'evals',
    icon: Gauge,
    tag: { en: 'The Reliability Shift', de: 'Der Verlässlichkeits-Shift' },
    title: {
      en: 'From Vibe-Coding to Deterministic Evals',
      de: 'Vom Vibe-Coding zu deterministischen Evals',
    },
    body: {
      en: 'Demos impress investors; production requires guarantees. We design continuous evaluation harnesses that test LLM outputs against strict unit benchmarks.',
      de: 'Demos begeistern Investoren; Produktion verlangt Garantien. Wir etablieren automatisierte Testschleifen, die KI-Ausgaben deterministisch prüfen.',
    },
    stat: '100%',
    statLabel: { en: 'Deterministic Coverage', de: 'Deterministische Tests' },
  },
  {
    id: 'leverage',
    icon: ShieldCheck,
    tag: { en: 'The Architecture Shift', de: 'Der Architektur-Shift' },
    title: {
      en: 'From Generic Tools to Custom Knowledge',
      de: 'Vom Standard-Tool zu unternehmenseigenem Wissen',
    },
    body: {
      en: 'Off-the-shelf chatbots cannot navigate your 20-year-old codebase or domain rules. We structure your proprietary processes into repeatable LLM-wikis.',
      de: 'Standard-Tools verstehen Ihre 20-jährige Codebasis nicht. Wir übersetzen gewachsenes Firmenwissen in strukturierte, wiederholbare LLM-Wikis.',
    },
    stat: '0%',
    statLabel: { en: 'Proprietary IP Leakage', de: 'Abfluss von Firmenwissen' },
  },
];

function ShiftCard({ item, locale }: { item: (typeof SHIFTS)[number]; locale: LocaleCode }) {
  const Icon = item.icon;
  return (
    <SpotlightCard className="h-full flex flex-col justify-between p-8 space-y-6 rounded-3xl bg-card border border-border/60 dark:border-white/[0.06] dark:bg-white/[0.035] backdrop-blur-md shadow-xl shadow-black/5 dark:shadow-black/20 hover:bg-muted/40 dark:hover:bg-white/[0.06] transition-all">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
            {item.tag[locale]}
          </span>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground">{item.title[locale]}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.body[locale]}</p>
      </div>

      <div className="pt-6 flex items-baseline justify-between">
        <div>
          <div className="text-3xl font-extrabold font-mono text-foreground">{item.stat}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{item.statLabel[locale]}</div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
      </div>
    </SpotlightCard>
  );
}

function BridgeHeader({ locale }: { locale: LocaleCode }) {
  const title = locale === 'de' ? 'Wo die Arbeit wirklich landet' : 'Where the Work Actually Lands';
  const subtitle =
    locale === 'de'
      ? 'KI schafft Arbeit nicht ab — sie verschiebt sie von der Erstellung zur Verifikation. Wer diesen Übergang nicht steuert, verliert Kontrolle und Marge.'
      : 'AI doesn’t eliminate work — it shifts it from generation to verification. Unmanaged, it eats margins and senior engineering bandwidth.';

  return (
    <div className="max-w-3xl space-y-4" data-reveal-item="true">
      <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
        <span>{locale === 'de' ? 'Kapitel 02 // Die Realität' : 'Chapter 02 // The Reality'}</span>
      </div>
      <BlurRevealHeading
        text={title}
        as="h2"
        className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight"
      />
      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{subtitle}</p>
    </div>
  );
}

export function NarrativeBridge({ locale }: { locale: LocaleCode }) {
  const resolvedTheme = useResolvedTheme();
  const inkColor = resolvedTheme === 'dark' ? '#FAF9F6' : '#0A0E1A';

  return (
    <section data-chapter="02" className="py-24 md:py-32 relative" id="narrative-bridge">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
        <GsapReveal>
          <BridgeHeader locale={locale} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {SHIFTS.map((item) => (
              <div key={item.id} data-reveal-item="true">
                <ShiftCard item={item} locale={locale} />
              </div>
            ))}
          </div>
        </GsapReveal>
      </div>
      <LiquidInkTransition targetId="services" color={inkColor} />
    </section>
  );
}
