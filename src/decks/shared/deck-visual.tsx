import { type SlideData } from '@/content/decks';
import { type LocaleCode } from '@/lib/preferences';
import { ArrowRight, Check, X } from 'lucide-react';

function ContrastVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full p-4 rounded-lg bg-background/50 border border-border">
      <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-destructive">
          <X className="h-4 w-4" />
          <span>{locale === 'de' ? 'Vorwärtsmodus (Unkontrolliert)' : 'Forward Mode (Uncontrolled)'}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {locale === 'de'
            ? 'Beginnt bei vertrauten Aktivitäten. Hofft auf das gewünschte Ergebnis ohne mathematische Kausalkette.'
            : 'Begins with familiar activities. Hopes for the outcome with zero causal arithmetic.'}
        </p>
      </div>
      <div className="p-4 rounded-md bg-accent/10 border border-accent/20 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent">
          <Check className="h-4 w-4" />
          <span>{locale === 'de' ? 'Rückwärtsverkettung (Gesteuert)' : 'Backward Chain (Controlled)'}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {locale === 'de'
            ? 'Beginnt beim Zielzustand. Dividiert rückwärts bis zur ersten Handlung, die vollständig in eigener Hand liegt.'
            : 'Begins at desired win. Divides backward until reaching a task fully inside your control.'}
        </p>
      </div>
    </div>
  );
}

function MetricVisual({ slide, locale }: { slide: SlideData; locale: LocaleCode }) {
  return (
    <div className="flex flex-col justify-center items-center h-full p-6 rounded-lg bg-background/50 border border-border space-y-3 font-mono text-center">
      <div className="text-xs text-muted-foreground uppercase tracking-widest">{slide.highlight[locale]}</div>
      <div className="text-2xl sm:text-3xl font-bold text-foreground">
        {locale === 'de' ? 'Strikte Kausalität' : 'Deterministic Causality'}
      </div>
      <div className="text-xs text-accent max-w-sm">
        {locale === 'de'
          ? 'Kein Vibe-Coding • Verifizierbare Schwellenwerte'
          : 'No Vibe-Coding • Verifiable Benchmarks'}
      </div>
    </div>
  );
}

function FlowVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="flex items-center justify-between gap-2 h-full p-4 rounded-lg bg-background/50 border border-border font-mono text-xs overflow-x-auto">
      <div className="p-2.5 rounded bg-muted/70 text-center shrink-0">
        <div className="text-muted-foreground text-[10px]">Step 1</div>
        <div className="font-bold text-foreground">{locale === 'de' ? 'Ziel' : 'Target'}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="p-2.5 rounded bg-muted/70 text-center shrink-0">
        <div className="text-muted-foreground text-[10px]">Step 2</div>
        <div className="font-bold text-foreground">{locale === 'de' ? 'Prüfung' : 'Verify'}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="p-2.5 rounded bg-accent/20 text-accent border border-accent/30 text-center shrink-0">
        <div className="text-[10px] font-bold">Step 3</div>
        <div className="font-bold">{locale === 'de' ? 'Handlung' : 'Execute'}</div>
      </div>
    </div>
  );
}

export function DeckVisual({ slide, locale }: { slide: SlideData; locale: LocaleCode }) {
  if (slide.visualType === 'contrast') {
    return <ContrastVisual locale={locale} />;
  }
  if (slide.visualType === 'metric') {
    return <MetricVisual slide={slide} locale={locale} />;
  }
  return <FlowVisual locale={locale} />;
}
