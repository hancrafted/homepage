import { type LocaleCode } from '@/lib/preferences';
import { Brain, Clock, ShieldAlert, Sparkles, UserCheck, Users } from 'lucide-react';

export function LeadManyVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 rounded-xl border border-primary/30 bg-primary/5">
        <Sparkles className="h-6 w-6 text-primary shrink-0" />
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            {isDe ? 'Arbeitsleistung' : 'Working Multiplier'}
          </div>
          <div className="text-xl font-bold text-foreground">
            5–20× {isDe ? 'Durchsatz bei aktiver KI-Führung' : 'Throughput on AI-suited tasks'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-border bg-card/60 space-y-3">
          <div className="flex items-center gap-2 text-sm font-mono font-semibold text-accent">
            <UserCheck className="h-4 w-4" />
            <span>{isDe ? 'Tür 1: Der Einzelne' : 'Door 1: The Individual'}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {isDe
              ? 'Führe einen unermüdlichen Mitarbeiter. Verhindere Token-Verschwendung und Kontext-Drift vor jedem Absenden.'
              : 'Direct a tireless, amnesic agent without letting token burn or attention drift derail the task.'}
          </p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-card/60 space-y-3">
          <div className="flex items-center gap-2 text-sm font-mono font-semibold text-primary">
            <Users className="h-4 w-4" />
            <span>{isDe ? 'Tür 2: Das Team' : 'Door 2: The Organization'}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {isDe
              ? 'Entwickler nicht ersetzen, sondern zu Orchestratoren weiterbilden, die autonome Agenten wirtschaftlich steuern.'
              : 'Upskill engineers into orchestrators who can responsibly supervise, evaluate, and budget autonomous collaborators.'}
          </p>
        </div>
      </div>
    </div>
  );
}

function AttentionProgressBar({ isDe }: { isDe: boolean }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2 font-mono text-xs">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-accent" />
          <span>{isDe ? 'Kontext-Füllstand über den Tag' : 'Context Fullness Progression'}</span>
        </span>
        <span className="text-foreground font-semibold">100% Window Limit</span>
      </div>
      <div className="h-3 rounded-full bg-border overflow-hidden flex">
        <div className="w-[30%] bg-primary" title="Boot Tax (30%)" />
        <div className="w-[35%] bg-amber-500" title="Active turns (35%)" />
        <div className="w-[25%] bg-destructive" title="Degradation zone (25%)" />
        <div className="w-[10%] bg-muted" />
      </div>
    </div>
  );
}

export function AttentionSpanVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl border border-border bg-card/40 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">09:00</span>
            <span className="text-emerald-500 font-bold">~30%</span>
          </div>
          <div className="font-semibold text-sm text-foreground">{isDe ? 'Boot-Up Tax' : 'System Boot-Up'}</div>
          <p className="text-xs text-muted-foreground">
            {isDe
              ? 'System-Prompts & Memory belegen 30% vor der ersten Nachricht.'
              : 'System prompt, tools, memory fill ~30% before the first word.'}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card/40 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">13:00</span>
            <span className="text-amber-500 font-bold">~60%</span>
          </div>
          <div className="font-semibold text-sm text-foreground">{isDe ? 'Arbeitsbereich' : 'Working Saturation'}</div>
          <p className="text-xs text-muted-foreground">
            {isDe
              ? 'Jeder Schritt sendet die gesamte Historie erneut.'
              : 'Every turn re-sends full history. Attention starts to drift.'}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">17:00</span>
            <span className="text-destructive font-bold">&gt;80%</span>
          </div>
          <div className="font-semibold text-sm text-destructive">{isDe ? 'Erschöpfung' : 'Attention Fumes'}</div>
          <p className="text-xs text-muted-foreground">
            {isDe
              ? 'Modell verliert den roten Faden bei vollem Fenster.'
              : 'Past half-full, reasoning degrades and constraints vanish.'}
          </p>
        </div>
      </div>

      <AttentionProgressBar isDe={isDe} />
    </div>
  );
}

function LostMiddleCurveSvg({ isDe }: { isDe: boolean }) {
  return (
    <div className="relative h-36 w-full pt-2">
      <svg className="h-full w-full overflow-visible" viewBox="0 0 500 140" preserveAspectRatio="none">
        <line x1="0" y1="110" x2="500" y2="110" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
        <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
        <path
          d="M 20 25 Q 120 35 250 110 T 480 25"
          fill="none"
          stroke="var(--accent, #38bdf8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="20" cy="25" r="5" className="fill-emerald-500" />
        <circle cx="250" cy="110" r="6" className="fill-destructive" />
        <circle cx="480" cy="25" r="5" className="fill-emerald-500" />
      </svg>
      <div className="absolute top-0 left-2 text-[10px] font-mono font-bold text-emerald-500">
        {isDe ? 'Start: ~95% Recall' : 'Start: ~95% Recall'}
      </div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-destructive flex items-center gap-1">
        <ShieldAlert className="h-3 w-3" />
        <span>{isDe ? 'Mitte: Lost in the Middle (~25%)' : 'Middle: Lost (~25%)'}</span>
      </div>
      <div className="absolute top-0 right-2 text-[10px] font-mono font-bold text-emerald-500">
        {isDe ? 'Ende: ~90% Recall' : 'End: ~90% Recall'}
      </div>
    </div>
  );
}

export function LostMiddleVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="p-5 rounded-xl border border-border bg-card/60 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest flex items-center gap-1.5">
          <Brain className="h-4 w-4" />
          <span>{isDe ? 'U-Kurve der Aufmerksamkeit' : 'Lost in the Middle (Liu et al.)'}</span>
        </span>
        <span className="text-[10px] font-mono text-muted-foreground">TACL 2024</span>
      </div>

      <LostMiddleCurveSvg isDe={isDe} />

      <p className="text-xs text-muted-foreground leading-relaxed pt-1">
        {isDe
          ? 'Modelle fokussieren extrem auf Beginn und Ende des Fensters. Wichtige Regeln in der Mitte werden übersehen.'
          : 'Models attend hardest to the start and most recent messages. Crucial constraints buried in the middle vanish.'}
      </p>
    </div>
  );
}

interface BugFixStep {
  num: string;
  titleEn: string;
  titleDe: string;
  delta: string;
  total: string;
}

const BUG_FIX_STEPS: BugFixStep[] = [
  { num: '01', titleEn: 'User Prompt & Bug Report', titleDe: 'User-Prompt & Bugreport', delta: '+500', total: '500' },
  {
    num: '02',
    titleEn: 'Agent Reads Source Files',
    titleDe: 'Agent liest Code-Dateien',
    delta: '+12,000',
    total: '12,500',
  },
  {
    num: '03',
    titleEn: 'Run Tests & Read Stack Trace',
    titleDe: 'Tests ausführen & Logs lesen',
    delta: '+18,000',
    total: '30,500',
  },
  {
    num: '04',
    titleEn: 'Apply Patch & Verify Re-test',
    titleDe: 'Patch anwenden & Re-Test',
    delta: '+25,000',
    total: '55,500',
  },
  {
    num: '05',
    titleEn: 'Final Review & Git Commit',
    titleDe: 'Code Review & Git Commit',
    delta: '+17,500',
    total: '~73,000',
  },
];

function BugFixStepRow({ step, isDe }: { step: BugFixStep; isDe: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/60 text-xs">
      <div className="flex items-center gap-3">
        <span className="font-mono font-bold text-accent">{step.num}</span>
        <span className="font-medium text-foreground">{isDe ? step.titleDe : step.titleEn}</span>
      </div>
      <div className="flex items-center gap-2 font-mono">
        <span className="text-muted-foreground text-[11px]">{step.delta}</span>
        <span className="text-foreground font-bold">{step.total}</span>
      </div>
    </div>
  );
}

export function BugFixStepsVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';

  return (
    <div className="space-y-3">
      <div className="font-mono text-xs text-muted-foreground flex items-center justify-between pb-1">
        <span>{isDe ? 'Agenten-Schritt' : 'Agent Iteration'}</span>
        <span>{isDe ? 'Kontext kumuliert' : 'Accumulated Context'}</span>
      </div>

      <div className="space-y-2">
        {BUG_FIX_STEPS.map((s) => (
          <BugFixStepRow key={s.num} step={s} isDe={isDe} />
        ))}
      </div>

      <div className="p-3 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-between text-xs font-mono font-bold text-foreground">
        <span>{isDe ? 'Re-sendete Billed Input Tokens' : 'Total Billed Input Tokens Across Steps'}</span>
        <span className="text-primary text-sm">~226,000 Tokens</span>
      </div>
    </div>
  );
}

export function CompoundingCurveVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-5 rounded-xl border border-border bg-card/60 space-y-2">
        <div className="text-xs font-mono text-muted-foreground">DeepSeek V3</div>
        <div className="text-2xl font-bold text-foreground font-mono">$0.11</div>
        <p className="text-xs text-muted-foreground">
          {isDe ? 'Wirtschaftlich ideal für iterative Tool-Loops.' : 'Baseline economic tier for automated tool loops.'}
        </p>
      </div>

      <div className="p-5 rounded-xl border border-border bg-card/60 space-y-2">
        <div className="text-xs font-mono text-accent">Claude 3.5 Sonnet</div>
        <div className="text-2xl font-bold text-foreground font-mono">$0.62</div>
        <p className="text-xs text-muted-foreground">
          {isDe ? '5,6× teurer — stark für Architektur und Planung.' : '5.6× cost multiplier — strong for planning.'}
        </p>
      </div>

      <div className="p-5 rounded-xl border border-destructive/30 bg-destructive/5 space-y-2">
        <div className="text-xs font-mono text-destructive">Claude 3.5 Opus</div>
        <div className="text-2xl font-bold text-destructive font-mono">$1.54</div>
        <p className="text-xs text-muted-foreground">
          {isDe ? '14× Spreizung für den exakt selben Bugfix.' : '14× cost swing for the exact same bug fix.'}
        </p>
      </div>
    </div>
  );
}
