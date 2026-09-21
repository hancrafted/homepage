import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { type LocaleCode } from '@/lib/preferences';
import { ArrowRight, Bot, CheckCircle2, EyeOff, Terminal, Wrench } from 'lucide-react';

export function ObscurityVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-5 rounded-xl border border-destructive/30 bg-destructive/5 space-y-3">
        <div className="flex items-center gap-2 text-sm font-mono font-semibold text-destructive">
          <EyeOff className="h-4 w-4" />
          <span>{isDe ? 'Web-Chat: Versteckter Zähler' : 'Web Chat: Hidden Meter'}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {isDe
            ? 'Pauschale 20 $/Monat verbergen den tatsächlichen Token-Verbrauch. Anbieter subventionieren den Einstieg, um Abhängigkeiten aufzubauen.'
            : 'Flat $20/month obscures real token burn. Vendors subsidize consumer entry to build unmonitored usage habits.'}
        </p>
        <div className="p-3 rounded-lg border border-destructive/20 bg-background/50 font-mono text-[11px] text-muted-foreground">
          &quot;Unlimited chat*&quot; · {isDe ? 'Verbrauch unsichtbar' : 'Meter invisible'}
        </div>
      </div>

      <div className="p-5 rounded-xl border border-border bg-card/60 space-y-3">
        <div className="flex items-center gap-2 text-sm font-mono font-semibold text-emerald-500">
          <Terminal className="h-4 w-4" />
          <span>{isDe ? 'CLI & API: Volle Transparenz' : 'CLI & Direct API: Visible Meter'}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {isDe
            ? 'Jeder API-Aufruf zeigt exakte Token-Kosten und Kontextfüllstand. Transparenz erzwingt wirtschaftliche Disziplin.'
            : 'Direct API & CLI tooling exposes exact input/output tokens per step. Transparency forces economic discipline.'}
        </p>
        <div className="p-3 rounded-lg border border-border bg-background/50 font-mono text-[11px] text-emerald-500 flex items-center justify-between">
          <span>Tokens: 14,820 in / 412 out</span>
          <span className="text-muted-foreground">$0.024</span>
        </div>
      </div>
    </div>
  );
}

interface PlaybookPillar {
  title: string;
  icon: typeof Wrench;
  items: string[];
}

function PlaybookColumn({ pillar }: { pillar: PlaybookPillar }) {
  const Icon = pillar.icon;
  return (
    <div className="p-5 rounded-xl border border-border bg-card/60 space-y-4">
      <div className="flex items-center gap-2 text-sm font-mono font-bold text-accent">
        <Icon className="h-4 w-4" />
        <span>{pillar.title}</span>
      </div>
      <ul className="space-y-2 text-xs text-muted-foreground">
        {pillar.items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-accent mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const PLAYBOOK_EN: PlaybookPillar[] = [
  {
    title: 'Automated',
    icon: Wrench,
    items: [
      'Automated context compaction hooks',
      'Isolated subagents for deep search',
      'Budget bounds on automated runs',
    ],
  },
  {
    title: 'Agent Steering',
    icon: Bot,
    items: ['Explicit specifications (AGENTS.md)', 'Concise prompts without noise', 'Deterministic exit conditions'],
  },
  {
    title: 'Team Practices',
    icon: CheckCircle2,
    items: ['Team-wide model routing matrix', 'Periodic token expenditure review', 'Context-engineering peer reviews'],
  },
];

const PLAYBOOK_DE: PlaybookPillar[] = [
  {
    title: 'Automatisiert',
    icon: Wrench,
    items: [
      'Automatische Kontext-Kompaktierung',
      'Subagenten für isolierte Teilaufgaben',
      'Budget-Limits in CI & Pre-Commit',
    ],
  },
  {
    title: 'Agent Steering',
    icon: Bot,
    items: ['Klare Spezifikationen (AGENTS.md)', 'Kompakte Prompts ohne Fülltext', 'Deterministische Exit-Kriterien'],
  },
  {
    title: 'Team-Praxis',
    icon: CheckCircle2,
    items: ['Modell-Routing Matrix im Team', 'Regelmäßige Token-Kosten-Reviews', 'Prompt- und Context-Pairing'],
  },
];

export function OperationalPlaybookVisual({ locale }: { locale: LocaleCode }) {
  const pillars = locale === 'de' ? PLAYBOOK_DE : PLAYBOOK_EN;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {pillars.map((p) => (
        <PlaybookColumn key={p.title} pillar={p} />
      ))}
    </div>
  );
}

export function ContextCapacityVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="p-6 md:p-8 rounded-2xl border border-border bg-card/80 space-y-6 text-center max-w-xl mx-auto">
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
          {isDe ? 'Kontext-Führung etablieren' : 'Start Building Context'}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isDe
            ? 'Die Token-Ökonomie belohnt präzise Führung. Ein Team mit geteilten Regeln und strukturierter Erinnerung skaliert mühelos.'
            : 'The token economy rewards context above all else. A team operating with shared rules and structured memory scales effortlessly.'}
        </p>
      </div>

      <div className="space-y-2 text-left">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-muted-foreground">/context capacity</span>
          <span className="text-primary font-bold">100% Cohesive</span>
        </div>
        <div className="h-3 rounded-full bg-border overflow-hidden">
          <div className="h-full w-full bg-primary transition-all duration-500" />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>Fragmented</span>
          <span>Cohesive</span>
        </div>
      </div>

      <div className="pt-2">
        <Button asChild size="lg" className="w-full sm:w-auto font-mono text-xs">
          <Link href="/#contact">
            <span>{isDe ? 'Workshop anfragen' : 'Book the Workshop'}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function CloserVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
      <div className="p-6 rounded-xl border border-border bg-card/60 space-y-4">
        <div className="flex items-center gap-2 text-sm font-mono font-bold text-muted-foreground">
          <Bot className="h-4 w-4 text-destructive" />
          <span>{isDe ? 'Die ungesteuerte KI' : 'The Unmanaged AI'}</span>
        </div>
        <ul className="space-y-3 text-xs font-mono">
          <li className="flex items-center gap-2 text-foreground/80">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span>{isDe ? 'Rechnet jedes Wort ab' : 'Bills by the word'}</span>
          </li>
          <li className="flex items-center gap-2 text-foreground/80">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span>{isDe ? 'Stellt niemals Rückfragen' : 'Never asks questions'}</span>
          </li>
          <li className="flex items-center gap-2 text-foreground/80">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span>{isDe ? 'Wird dümmer unter Volllast' : 'Dumber under heavy load'}</span>
          </li>
        </ul>
      </div>

      <div className="p-6 rounded-xl border border-primary/40 bg-primary/10 space-y-3 flex flex-col justify-center">
        <div className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
          {isDe ? 'Der Upskilling-Vorteil' : 'The Upskilling Gap'}
        </div>
        <div className="text-4xl sm:text-5xl font-extrabold text-foreground font-mono">10×</div>
        <div className="text-base font-semibold text-foreground">
          {isDe ? 'Ergebnis pro Euro (Outcome per Euro)' : 'Outcome per Euro Multiplier'}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {isDe
            ? 'Die Rohkosten für Modelle sind für alle gleich. Der Qualitätsmultiplikator hängt ausschließlich vom System ab, das Sie darum bauen.'
            : 'Raw model costs are identical for everyone. The quality multiplier depends entirely on the system you build around it.'}
        </p>
      </div>
    </div>
  );
}
