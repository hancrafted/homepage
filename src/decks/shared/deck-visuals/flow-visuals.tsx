import { type LocaleCode } from '@/lib/preferences';
import { ArrowRight, Bot, Cpu, UserCheck } from 'lucide-react';

export function FourErasFlowVisual() {
  const steps = [
    { num: '1', title: 'Chat', sub: 'Prompting' },
    { num: '2', title: 'Agents', sub: 'Context' },
    { num: '3', title: 'Harness', sub: 'Guardrails' },
    { num: '4', title: 'Loop', sub: 'Self-Tune' },
  ];
  return (
    <div className="flex items-center justify-between gap-1.5 h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs overflow-x-auto">
      {steps.map((s, idx) => (
        <div key={s.num} className="flex items-center gap-1.5 shrink-0">
          <div
            className={`p-2 rounded text-center shrink-0 min-w-[70px] ${
              idx === 2 ? 'bg-accent/20 border border-accent/40 text-accent' : 'bg-muted/40 text-foreground'
            }`}
          >
            <div className="text-[9px] text-muted-foreground">Era {s.num}</div>
            <div className="font-bold text-xs">{s.title}</div>
            <div className="text-[9px] text-muted-foreground">{s.sub}</div>
          </div>
          {idx < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />}
        </div>
      ))}
    </div>
  );
}

export function TieredStackFlowVisual() {
  return (
    <div className="flex items-center justify-between gap-2 h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs overflow-x-auto">
      <div className="p-2.5 rounded bg-sky-500/10 border border-sky-500/20 text-center shrink-0 flex-1">
        <div className="text-[9px] text-sky-400 font-bold">Phase 1: Ideation</div>
        <div className="font-bold text-xs text-foreground">Gemini Flash</div>
        <div className="text-[9px] text-muted-foreground">$0 Marginal Cost</div>
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-center shrink-0 flex-1">
        <div className="text-[9px] text-amber-400 font-bold">Phase 2: Arch</div>
        <div className="font-bold text-xs text-foreground">Claude Opus</div>
        <div className="text-[9px] text-muted-foreground">High Reasoning</div>
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-center shrink-0 flex-1">
        <div className="text-[9px] text-emerald-400 font-bold">Phase 3: Code</div>
        <div className="font-bold text-xs text-foreground">Sonnet / Haiku</div>
        <div className="text-[9px] text-muted-foreground">Fast Workhorse</div>
      </div>
    </div>
  );
}

export function VerificationTiersFlowVisual() {
  return (
    <div className="flex items-center justify-between gap-2 h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs overflow-x-auto">
      <div className="p-2.5 rounded bg-sky-500/10 border border-sky-500/20 text-center shrink-0 flex-1">
        <div className="flex items-center justify-center gap-1 text-[10px] text-sky-400 font-bold">
          <Cpu className="h-3 w-3" />
          <span>Machine</span>
        </div>
        <div className="font-bold text-xs text-foreground">Deterministic</div>
        <div className="text-[9px] text-muted-foreground">Syntax • Dates • Links</div>
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <div className="p-2.5 rounded bg-purple-500/10 border border-purple-500/20 text-center shrink-0 flex-1">
        <div className="flex items-center justify-center gap-1 text-[10px] text-purple-400 font-bold">
          <Bot className="h-3 w-3" />
          <span>AI Agent</span>
        </div>
        <div className="font-bold text-xs text-foreground">Probabilistic</div>
        <div className="text-[9px] text-muted-foreground">Cross-claims • Flags</div>
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-center shrink-0 flex-1">
        <div className="flex items-center justify-center gap-1 text-[10px] text-amber-400 font-bold">
          <UserCheck className="h-3 w-3" />
          <span>Human</span>
        </div>
        <div className="font-bold text-xs text-foreground">Semantic Truth</div>
        <div className="text-[9px] text-muted-foreground">Accountability</div>
      </div>
    </div>
  );
}

export function DefaultFlowVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="flex items-center justify-between gap-2 h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs overflow-x-auto">
      <div className="p-2.5 rounded bg-muted/70 text-center shrink-0 flex-1">
        <div className="text-muted-foreground text-[10px]">Step 1</div>
        <div className="font-bold text-foreground">{locale === 'de' ? 'Ziel' : 'Target'}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="p-2.5 rounded bg-muted/70 text-center shrink-0 flex-1">
        <div className="text-muted-foreground text-[10px]">Step 2</div>
        <div className="font-bold text-foreground">{locale === 'de' ? 'Prüfung' : 'Verify'}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="p-2.5 rounded bg-accent/20 text-accent border border-accent/30 text-center shrink-0 flex-1">
        <div className="text-[10px] font-bold">Step 3</div>
        <div className="font-bold">{locale === 'de' ? 'Handlung' : 'Execute'}</div>
      </div>
    </div>
  );
}
