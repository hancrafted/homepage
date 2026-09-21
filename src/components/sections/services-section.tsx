'use client';

import { BlurRevealHeading } from '@/components/animations/blur-reveal-heading';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { SITE_CONTENT, type ServiceItem } from '@/content/site-data';
import { initGsapDefaults } from '@/lib/animations';
import { prefersReducedMotion, type LocaleCode } from '@/lib/preferences';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CheckCircle2, Sparkles, Target, Terminal, TrendingUp, Users } from 'lucide-react';
import { useRef, useState } from 'react';

const iconMap = {
  users: Users,
  terminal: Terminal,
  target: Target,
  'trending-up': TrendingUp,
  sparkles: Sparkles,
};

const deliverables: Record<string, { en: string; de: string }> = {
  coaching: {
    en: 'Deliverable: Unit Economics & Bottleneck Dossier',
    de: 'Ergebnis: Wirtschaftlichkeits- & Engpass-Dossier',
  },
  'ai-enablement': {
    en: 'Deliverable: Deterministic Eval Harness & Evals',
    de: 'Ergebnis: Deterministische Test-Harness & Evals',
  },
  pitching: {
    en: 'Deliverable: Backward-Chained Investor Deck',
    de: 'Ergebnis: Rückwärtsverkettetes Investoren-Deck',
  },
  sales: {
    en: 'Deliverable: Reverse Funnel Outreach Engine',
    de: 'Ergebnis: Wöchentliche Vertriebs-Engine',
  },
};

function MethodCard({ service, index, locale }: { service: ServiceItem; index: number; locale: LocaleCode }) {
  const Icon = iconMap[service.iconName];
  const deliverable = deliverables[service.id];

  return (
    <SpotlightCard className="w-[340px] sm:w-[420px] shrink-0 flex flex-col justify-between p-6 border-border/80 bg-card rounded-2xl shadow-sm">
      <CardHeader className="p-0 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
            STEP 0{index + 1}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-foreground">{service.title[locale]}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-4 space-y-4">
        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
          {service.description[locale]}
        </CardDescription>
        {deliverable && (
          <div className="p-3 rounded-lg bg-muted/50 border border-border/60 text-xs font-mono text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{deliverable[locale]}</span>
          </div>
        )}
      </CardContent>
    </SpotlightCard>
  );
}

function useMethodScrollTrigger(
  sectionRef: React.RefObject<HTMLDivElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>,
  progressRef: React.RefObject<HTMLDivElement | null>,
  setStep: (s: number) => void,
) {
  useGSAP(
    () => {
      initGsapDefaults();
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || prefersReducedMotion()) return;

      const trackWidth = () => track.scrollWidth - window.innerWidth + 80;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            setStep(Math.min(4, Math.floor(self.progress * 4) + 1));
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      tl.fromTo(track, { x: 0 }, { x: () => -trackWidth(), ease: 'none' });
    },
    { scope: sectionRef },
  );
}

function MethodRailHeader({
  locale,
  step,
  progressRef,
}: {
  locale: LocaleCode;
  step: number;
  progressRef: React.RefObject<HTMLDivElement | null>;
}) {
  const headline =
    locale === 'de' ? 'Von Engpässen zu deterministischer Skalierung' : 'From Bottlenecks to Deterministic Scale';

  return (
    <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 pb-6 flex items-end justify-between border-b border-border/60">
      <div>
        <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
          {locale === 'de' ? 'KAPITEL 03 // DER SYSTEMISCHE ABLAUF' : 'CHAPTER 03 // THE SYSTEMIC METHOD'}
        </div>
        <BlurRevealHeading text={headline} as="h2" className="text-3xl font-bold tracking-tight text-foreground" />
      </div>
      <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
        <span className="font-bold text-foreground">0{step}</span>
        <span>/</span>
        <span>04</span>
        <div className="w-24 h-1 bg-border rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-primary origin-left transition-transform duration-75"
            style={{ transform: 'scaleX(0.25)' }}
          />
        </div>
      </div>
    </div>
  );
}

function DesktopMethodRail({ services, locale }: { services: ServiceItem[]; locale: LocaleCode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);

  useMethodScrollTrigger(sectionRef, trackRef, progressRef, setStep);

  return (
    <div ref={sectionRef} className="hidden md:flex flex-col justify-center min-h-screen py-12 overflow-hidden">
      <MethodRailHeader locale={locale} step={step} progressRef={progressRef} />
      <div className="pt-8 overflow-visible">
        <div ref={trackRef} className="flex gap-6 pl-6 sm:pl-16 pr-16 w-max">
          {services.map((service, idx) => (
            <MethodCard key={service.id} service={service} index={idx} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMethodStack({ services, locale }: { services: ServiceItem[]; locale: LocaleCode }) {
  return (
    <div className="md:hidden py-16 px-4 space-y-8">
      <div className="space-y-2">
        <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
          {locale === 'de' ? 'KAPITEL 03 // DER ABLAUF' : 'CHAPTER 03 // THE METHOD'}
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {locale === 'de'
            ? 'Von Engpässen zu deterministischer Skalierung'
            : 'From Bottlenecks to Deterministic Scale'}
        </h2>
      </div>
      <div className="space-y-6">
        {services.map((service, idx) => (
          <MethodCard key={service.id} service={service} index={idx} locale={locale} />
        ))}
      </div>
    </div>
  );
}

export function ServicesSection({ locale }: { locale: LocaleCode }) {
  const services = SITE_CONTENT.services;

  return (
    <section data-chapter="03" className="border-b border-border/70 bg-background relative" id="services">
      <DesktopMethodRail services={services} locale={locale} />
      <MobileMethodStack services={services} locale={locale} />
    </section>
  );
}
