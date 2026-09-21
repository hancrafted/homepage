'use client';

import { FRAMEWORK_SLIDES, type FrameworkSlide } from '@/content/framework-slides';
import { initGsapDefaults } from '@/lib/animations';
import { prefersReducedMotion, type LocaleCode } from '@/lib/preferences';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import { MethodProgressStepper } from './method-stepper';

function SlideBullets({ bullets, deliverable }: { bullets: string[]; deliverable: string }) {
  return (
    <ul className="mt-8 flex max-w-xl flex-col gap-3 font-mono text-xs sm:text-sm font-light">
      {bullets.map((bullet, idx) => (
        <li key={idx} className="flex items-start gap-3 opacity-80" style={{ color: 'var(--method-fg)' }}>
          <span
            className="mt-[0.65em] inline-block h-[1px] w-3 shrink-0 opacity-40"
            style={{ backgroundColor: 'var(--method-fg)' }}
          />
          <span>{bullet}</span>
        </li>
      ))}
      <li className="flex items-start gap-3 mt-1 font-semibold text-emerald-500">
        <span className="mt-[0.65em] inline-block h-[1px] w-3 shrink-0 bg-emerald-500" />
        <span>{deliverable}</span>
      </li>
    </ul>
  );
}

function SlideItem({ slide, locale }: { slide: FrameworkSlide; locale: LocaleCode }) {
  return (
    <article
      data-method-slide={slide.step}
      className="relative flex min-h-[60vh] md:h-screen w-full md:w-[80vw] lg:w-[70vw] max-w-4xl shrink-0 flex-col justify-center px-6 md:px-12 pt-20 sm:pt-24 will-change-transform select-none"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(160px,45vh,560px)] font-black leading-none tracking-tighter opacity-[0.05] select-none text-[var(--method-fg)]"
      >
        {slide.step}
      </span>

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 mb-3 font-mono text-xs uppercase tracking-widest text-primary font-bold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>
            STEP {slide.step} // {slide.tag[locale]}
          </span>
        </div>

        <h2 className="font-display font-extrabold leading-[0.95] tracking-tight whitespace-normal sm:whitespace-nowrap text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--method-fg)]">
          <span>{slide.shortTitle[locale]}</span>
          <span className="text-primary">.</span>
        </h2>

        <div
          aria-hidden="true"
          className="mt-6 h-[1px] w-20 opacity-25"
          style={{ backgroundColor: 'var(--method-fg)' }}
        />

        <p className="mt-6 font-mono text-base sm:text-xl font-light opacity-80 max-w-xl text-[var(--method-fg)]">
          {slide.subtitle[locale]}
        </p>

        <SlideBullets bullets={slide.bullets[locale]} deliverable={slide.deliverable[locale]} />
      </div>
    </article>
  );
}

function computeThemeColors(p: number) {
  if (p <= 0.75) {
    return { bg: '#FAF9F6', fg: '#0A0E1A', border: 'rgba(10, 14, 26, 0.12)' };
  }
  const t = Math.min(1, (p - 0.75) / 0.22);
  const toBg = gsap.utils.interpolate(['#FAF9F6', '#CBD5E1', '#475569', '#1E293B', '#0B0F17']);
  const toFg = gsap.utils.interpolate(['#0A0E1A', '#0A0E1A', '#1E293B', '#F8FAFC', '#F8FAFC']);
  const toBorder = gsap.utils.interpolate([
    'rgba(10, 14, 26, 0.12)',
    'rgba(10, 14, 26, 0.12)',
    'rgba(255, 255, 255, 0.15)',
    'rgba(255, 255, 255, 0.12)',
    'rgba(255, 255, 255, 0.08)',
  ]);
  return { bg: toBg(t), fg: toFg(t), border: toBorder(t) };
}

function computeActiveStep(p: number) {
  if (p < 0.26) return 1;
  if (p < 0.51) return 2;
  if (p < 0.76) return 3;
  if (p < 0.97) return 4;
  return 5;
}

function applyThemeToContainer(container: HTMLElement, p: number) {
  const { bg, fg, border } = computeThemeColors(p);
  container.style.setProperty('--method-bg', bg);
  container.style.setProperty('--method-fg', fg);
  container.style.setProperty('--method-border', border);
  container.style.backgroundColor = bg;
  container.style.color = fg;
}

function useMethodRailScrub(
  containerRef: React.RefObject<HTMLDivElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>,
  setStep: (s: number) => void,
  setProgress: (p: number) => void,
) {
  useGSAP(
    () => {
      initGsapDefaults();
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track || prefersReducedMotion()) return;

      const slides = track.querySelectorAll<HTMLElement>('article');
      const s1 = slides[0];
      const s5 = slides[slides.length - 1];
      const startX = () => (window.innerWidth - (s1?.offsetWidth ?? window.innerWidth * 0.75)) / 2;
      const endX = () =>
        (window.innerWidth - (s5?.offsetWidth ?? window.innerWidth * 0.75)) / 2 - (s5?.offsetLeft ?? 0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.3,
          onUpdate: (self) => {
            const p = self.progress;
            applyThemeToContainer(container, p);
            setProgress(p * 100);
            setStep(computeActiveStep(p));
          },
        },
      });

      tl.set(track, { x: () => startX() });
      tl.fromTo(track, { x: () => startX() }, { x: () => endX(), duration: 1, ease: 'none' }, 0);
    },
    { scope: containerRef },
  );
}

function DesktopMethodRail({ locale }: { locale: LocaleCode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);

  useMethodRailScrub(containerRef, trackRef, setStep, setProgressPercent);

  return (
    <div
      ref={containerRef}
      data-method="true"
      className="hidden md:block relative h-screen w-full overflow-hidden select-none"
      style={{
        backgroundColor: '#FAF9F6',
        color: '#0A0E1A',
        transition: 'none',
      }}
    >
      <div className="absolute top-20 sm:top-24 left-0 right-0 z-20 px-8 sm:px-16 flex items-center justify-between pointer-events-none text-[var(--method-fg)]">
        <div className="font-mono text-xs font-bold tracking-widest uppercase text-primary">
          {locale === 'de' ? 'KAPITEL 03 // MEINE METHODE' : 'CHAPTER 03 // MY METHOD'}
        </div>
        <div className="font-mono text-xs opacity-60">
          {locale === 'de' ? 'HORIZONTAL SCROLLEN' : 'SCROLL TO PROGRESS'} →
        </div>
      </div>

      <div ref={trackRef} className="flex h-screen items-stretch will-change-transform">
        {FRAMEWORK_SLIDES.map((slide) => (
          <SlideItem key={slide.id} slide={slide} locale={locale} />
        ))}
      </div>

      <MethodProgressStepper currentStep={step} progressPercent={progressPercent} locale={locale} />
    </div>
  );
}

function MobileMethodStack({ locale }: { locale: LocaleCode }) {
  return (
    <div
      className="md:hidden py-16 px-4 space-y-12"
      style={{ '--method-fg': 'var(--foreground)', '--method-bg': 'var(--background)' } as React.CSSProperties}
    >
      <div className="space-y-2">
        <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
          {locale === 'de' ? 'KAPITEL 03 // MEINE METHODE' : 'CHAPTER 03 // MY METHOD'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {locale === 'de' ? 'Meine Methode' : 'My Method'}
        </h2>
      </div>
      <div className="space-y-16">
        {FRAMEWORK_SLIDES.map((slide) => (
          <SlideItem key={slide.id} slide={slide} locale={locale} />
        ))}
      </div>
    </div>
  );
}

export function ServicesSection({ locale }: { locale: LocaleCode }) {
  return (
    <section data-chapter="03" className="relative" id="services">
      <DesktopMethodRail locale={locale} />
      <MobileMethodStack locale={locale} />
    </section>
  );
}
