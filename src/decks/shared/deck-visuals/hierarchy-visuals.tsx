import { type SlideData } from '@/content/decks/types';
import { type LocaleCode } from '@/lib/preferences';

export function BootTaxHierarchyVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="flex flex-col justify-between h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs">
      <div className="flex items-center justify-between text-muted-foreground border-b border-border/50 pb-1.5">
        <span className="font-bold text-foreground">
          {locale === 'de' ? 'Konversations-Startsteuer' : 'Boot Tax Before Prompt 1'}
        </span>
        <span className="text-amber-400 font-bold">~30% Belegt</span>
      </div>
      <div className="grid grid-cols-3 gap-2 py-1.5 text-center">
        <div className="p-2 rounded bg-muted/30 border border-border">
          <div className="text-[10px] text-muted-foreground">System Prompt</div>
          <div className="font-bold text-foreground">9.4k Tokens</div>
        </div>
        <div className="p-2 rounded bg-muted/30 border border-border">
          <div className="text-[10px] text-muted-foreground">Tool Schemas</div>
          <div className="font-bold text-foreground">42.9k Tokens</div>
        </div>
        <div className="p-2 rounded bg-muted/30 border border-border">
          <div className="text-[10px] text-muted-foreground">Skills & Memory</div>
          <div className="font-bold text-foreground">8.2k Tokens</div>
        </div>
      </div>
      <div className="text-[10px] text-muted-foreground text-center">
        {locale === 'de'
          ? 'Jeder neue Thread startet mit über 60.000 belegten Tokens im 200k-Fenster'
          : 'Launching an agent thread instantly commits ~60,000 tokens of working memory'}
      </div>
    </div>
  );
}

export function ContextTypesHierarchyVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="grid grid-cols-3 gap-2 h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs">
      <div className="p-2.5 rounded bg-sky-500/10 border border-sky-500/20 flex flex-col justify-between">
        <div className="text-[10px] text-sky-400 font-bold">1. Knowledge</div>
        <div className="text-xs font-semibold text-foreground">{locale === 'de' ? 'Auf Abruf' : 'On-Demand'}</div>
        <p className="text-[10px] text-muted-foreground leading-tight">
          {locale === 'de' ? 'Nur bei Bedarf geladen (z.B. Wiki, Docs)' : 'Retrieved only when the task requires it'}
        </p>
      </div>

      <div className="p-2.5 rounded bg-purple-500/10 border border-purple-500/20 flex flex-col justify-between">
        <div className="text-[10px] text-purple-400 font-bold">2. Instructions</div>
        <div className="text-xs font-semibold text-foreground">{locale === 'de' ? 'Skills' : 'Skills'}</div>
        <p className="text-[10px] text-muted-foreground leading-tight">
          {locale === 'de' ? 'Einmal geschrieben, mit Namen aufgerufen' : 'Codified workflows triggered explicitly'}
        </p>
      </div>

      <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 flex flex-col justify-between">
        <div className="text-[10px] text-amber-400 font-bold">3. Memory</div>
        <div className="text-xs font-semibold text-foreground">{locale === 'de' ? 'Dauerhaft' : 'Every Session'}</div>
        <p className="text-[10px] text-muted-foreground leading-tight">
          {locale === 'de' ? 'Wird unbemerkt bei jedem Start gelesen' : 'Loaded automatically at every thread start'}
        </p>
      </div>
    </div>
  );
}

export function DefaultHierarchyVisual({ slide, locale }: { slide: SlideData; locale: LocaleCode }) {
  return (
    <div className="flex flex-col justify-between h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs">
      <div className="flex items-center justify-between text-muted-foreground border-b border-border/50 pb-1">
        <span className="font-bold text-foreground">{slide.title[locale]}</span>
        <span className="text-accent text-[10px]">{slide.highlight[locale]}</span>
      </div>
      <div className="p-3 rounded bg-muted/20 border border-border/60 text-xs text-foreground/90 leading-relaxed my-auto">
        {slide.claim[locale]}
      </div>
      <div className="text-[10px] text-muted-foreground text-center">
        {locale === 'de'
          ? 'Strukturierte Schichten & Vertrauensgrenzen'
          : 'Structured architectural boundaries & layers'}
      </div>
    </div>
  );
}
