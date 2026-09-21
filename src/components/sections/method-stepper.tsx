'use client';

import { FRAMEWORK_SLIDES, type FrameworkSlide } from '@/content/framework-slides';
import { type LocaleCode } from '@/lib/preferences';

const STEP_THRESHOLDS = [0, 26, 51, 76, 97];

function NodeSymbol({
  isPassed,
  isCurrent,
  isTerminal,
  letter,
}: {
  isPassed: boolean;
  isCurrent: boolean;
  isTerminal: boolean;
  letter: string;
}) {
  return (
    <div className="relative flex items-center justify-center min-w-[28px] sm:min-w-[32px] h-7 sm:h-8">
      <span
        className={`rounded-full transition-all duration-300 ease-out transform ${
          isPassed ? 'scale-0 opacity-0' : 'scale-100'
        } ${
          isTerminal
            ? 'h-2 w-2 sm:h-2.5 sm:w-2.5 bg-primary shadow-sm shadow-primary/50'
            : 'h-1.5 w-1.5 sm:h-2 sm:w-2 bg-current opacity-70'
        }`}
      />
      <span
        className={`absolute font-mono text-base sm:text-lg tracking-tight px-1.5 py-0.5 rounded transition-all duration-300 ease-out transform ${
          isPassed ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        } ${isCurrent ? 'font-black text-primary scale-110' : 'font-bold text-current opacity-75'}`}
        style={{ backgroundColor: 'var(--method-bg)' }}
      >
        {letter}
      </span>
    </div>
  );
}

function NodeWord({ isCurrent, word }: { isCurrent: boolean; word: string }) {
  return (
    <div className="absolute top-7 sm:top-8 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none pt-0.5">
      <div
        className={`font-mono text-[7.5px] xs:text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.14em] uppercase transition-all duration-300 ease-out transform ${
          isCurrent ? 'translate-y-0 opacity-100 font-bold text-primary' : 'translate-y-2 opacity-0'
        }`}
      >
        {word}
      </div>
    </div>
  );
}

function TrackNode({
  slide,
  idx,
  currentStep,
  progressPercent,
  locale,
}: {
  slide: FrameworkSlide;
  idx: number;
  currentStep: number;
  progressPercent: number;
  locale: LocaleCode;
}) {
  const isPassed = progressPercent >= (STEP_THRESHOLDS[idx] ?? 0);
  const isCurrent = currentStep === idx + 1;
  const isTerminal = idx === FRAMEWORK_SLIDES.length - 1;
  const leftPercent = (idx / (FRAMEWORK_SLIDES.length - 1)) * 100;

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      style={{ left: `${leftPercent}%` }}
    >
      <NodeSymbol isPassed={isPassed} isCurrent={isCurrent} isTerminal={isTerminal} letter={slide.letter[locale]} />
      <NodeWord isCurrent={isCurrent} word={slide.phase[locale]} />
    </div>
  );
}

function TrackBackground({ progressPercent }: { progressPercent: number }) {
  const clampedProgress = Math.min(100, Math.max(0, progressPercent));

  return (
    <>
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-current opacity-20 -translate-y-1/2 pointer-events-none" />
      <div
        className="absolute top-1/2 left-0 h-[1.5px] bg-primary -translate-y-1/2 pointer-events-none"
        style={{ width: `${clampedProgress}%` }}
      />
    </>
  );
}

export function MethodProgressStepper({
  currentStep,
  progressPercent,
  locale,
}: {
  currentStep: number;
  progressPercent: number;
  locale: LocaleCode;
}) {
  return (
    <div
      className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 pointer-events-none flex items-center justify-center transition-colors"
      style={{ color: 'var(--method-fg)' }}
    >
      <div className="relative w-[220px] xs:w-[260px] sm:w-[320px] md:w-[380px] max-w-[85vw] h-14 sm:h-16 flex items-center pointer-events-auto">
        <TrackBackground progressPercent={progressPercent} />
        {FRAMEWORK_SLIDES.map((slide, idx) => (
          <TrackNode
            key={slide.id}
            slide={slide}
            idx={idx}
            currentStep={currentStep}
            progressPercent={progressPercent}
            locale={locale}
          />
        ))}
      </div>
      <div className="hidden sm:block absolute right-8 sm:right-16 text-[10px] font-mono tracking-wider tabular-nums opacity-60">
        {String(Math.round(progressPercent)).padStart(3, '0')}%
      </div>
    </div>
  );
}
