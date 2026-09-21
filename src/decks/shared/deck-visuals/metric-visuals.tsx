import { type SlideData } from '@/content/decks/types';
import { type LocaleCode } from '@/lib/preferences';

export function CostSpreadMetricVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="flex flex-col justify-between h-full p-3 rounded-lg bg-background/50 border border-border font-mono">
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/50 pb-1.5">
        <span>
          {locale === 'de' ? 'Kostenvergleich für 1 Bugfix (226k Tokens)' : '1 Bug Fix Cost Comparison (226k Tokens)'}
        </span>
        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold">~14× Spreizung</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center py-2">
        <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
          <div className="text-[10px] text-muted-foreground">DeepSeek V4</div>
          <div className="text-base sm:text-lg font-bold text-emerald-400">$0.11</div>
          <div className="text-[9px] text-muted-foreground">Budget Tier</div>
        </div>
        <div className="p-2 rounded bg-sky-500/10 border border-sky-500/20">
          <div className="text-[10px] text-muted-foreground">Claude Sonnet</div>
          <div className="text-base sm:text-lg font-bold text-sky-400">$0.62</div>
          <div className="text-[9px] text-muted-foreground">Workhorse Tier</div>
        </div>
        <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
          <div className="text-[10px] text-muted-foreground">Claude Opus</div>
          <div className="text-base sm:text-lg font-bold text-amber-400">$1.54</div>
          <div className="text-[9px] text-muted-foreground">Frontier Tier</div>
        </div>
      </div>
      <div className="text-[10px] text-center text-muted-foreground">
        {locale === 'de'
          ? 'x 2.000 Entwickler x 20 Fixes/Woche = Hunderttausende Euro Differenz'
          : 'Scaled across a team running multiple daily loops, model choice dictates P&L'}
      </div>
    </div>
  );
}

export function SmartZoneMetricVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="flex flex-col justify-between h-full p-3 rounded-lg bg-background/50 border border-border font-mono">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{locale === 'de' ? 'Kontext-Füllstand & Zuverlässigkeit' : 'Context Fullness & Reliability'}</span>
        <span className="text-emerald-400 text-xs font-bold">&lt; 50% Smart Zone</span>
      </div>
      <div className="space-y-1.5 my-auto">
        <div className="w-full bg-muted/40 h-3 rounded-full overflow-hidden flex">
          <div className="bg-emerald-500 h-full w-1/2 flex items-center justify-center text-[9px] text-black font-bold">
            0% - 50%
          </div>
          <div className="bg-rose-500/60 h-full w-1/2 flex items-center justify-center text-[9px] text-white font-bold">
            50% - 100%
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground px-1">
          <span className="text-emerald-400 font-semibold">
            {locale === 'de' ? 'Präzise Argumentation' : 'Grounded Reasoning'}
          </span>
          <span className="text-rose-400 font-semibold">
            {locale === 'de' ? 'Verlorene Mitte & Halluzination' : 'Lost Middle & Hallucinations'}
          </span>
        </div>
      </div>
      <div className="text-[10px] text-center text-muted-foreground border-t border-border/50 pt-1.5">
        {locale === 'de'
          ? 'Hebel: Kompaktieren & Zusammenfassung an neuen Thread übergeben'
          : 'Remedy: Compact state and hand off to a clean thread'}
      </div>
    </div>
  );
}

export function OutcomePerEuroVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="grid grid-cols-2 gap-2 h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs">
      <div className="p-2.5 rounded bg-muted/30 border border-border flex flex-col justify-between">
        <div className="text-[10px] text-muted-foreground">
          {locale === 'de' ? 'Flaggschiff-Default' : 'Default Flagship'}
        </div>
        <div>
          <div className="text-lg font-bold text-foreground">99% Qualität</div>
          <div className="text-xs text-rose-400">$100 Kostenbasis</div>
        </div>
        <div className="text-[9px] text-muted-foreground">
          {locale === 'de' ? '1.0x Ertrag pro Euro' : '1.0x Outcome / €'}
        </div>
      </div>
      <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 flex flex-col justify-between">
        <div className="text-[10px] text-emerald-400 font-semibold">
          {locale === 'de' ? 'Wirtschaftlich Geroutet' : 'Economic Routing'}
        </div>
        <div>
          <div className="text-lg font-bold text-emerald-400">95% Qualität</div>
          <div className="text-xs text-emerald-300">$20 Kostenbasis</div>
        </div>
        <div className="text-[10px] font-bold text-emerald-400">
          {locale === 'de' ? '5.0x Ertrag pro Euro' : '5.0x Outcome / €'}
        </div>
      </div>
    </div>
  );
}

export function DefaultMetricVisual({ slide, locale }: { slide: SlideData; locale: LocaleCode }) {
  return (
    <div className="flex flex-col justify-center items-center h-full p-4 rounded-lg bg-background/50 border border-border space-y-2 font-mono text-center">
      <div className="text-xs text-muted-foreground uppercase tracking-widest">{slide.highlight[locale]}</div>
      <div className="text-xl sm:text-2xl font-bold text-foreground">{slide.title[locale]}</div>
      <div className="text-xs text-accent max-w-md line-clamp-2">{slide.claim[locale]}</div>
    </div>
  );
}
