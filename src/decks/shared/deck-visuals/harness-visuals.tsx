import { type LocaleCode } from '@/lib/preferences';
import { Bot, Cpu, User } from 'lucide-react';

export function DriftCurveVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="p-5 rounded-xl border border-border bg-card/60 space-y-4">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-muted-foreground font-semibold uppercase tracking-wider">
          {isDe ? 'Wartungsaufwand vs. Dokumentations-Drift' : 'Maintenance Effort vs. Documentation Drift'}
        </span>
        <span className="text-accent">{isDe ? 'Der kritische Schnittpunkt' : 'The Inversion Crossing'}</span>
      </div>

      <div className="relative h-40 w-full">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 500 140" preserveAspectRatio="none">
          <path d="M 20 20 Q 150 70 480 120" fill="none" stroke="var(--primary, #3b82f6)" strokeWidth="3" />
          <path d="M 20 120 Q 250 80 480 20" fill="none" stroke="var(--destructive, #ef4444)" strokeWidth="3" />
          <circle cx="250" cy="73" r="6" className="fill-accent stroke-background stroke-2" />
        </svg>

        <div className="absolute top-2 left-4 text-[11px] font-mono font-bold text-primary">
          {isDe ? 'Initialer Aufwand' : 'Initial Effort'}
        </div>
        <div className="absolute bottom-2 left-4 text-[11px] font-mono font-bold text-destructive">
          {isDe ? 'Geringer Drift' : 'Zero Drift'}
        </div>
        <div className="absolute top-2 right-4 text-[11px] font-mono font-bold text-destructive">
          {isDe ? 'Stiller Dokumenten-Drift' : 'Silent Drift Accumulation'}
        </div>
        <div className="absolute bottom-2 right-4 text-[11px] font-mono font-bold text-primary">
          {isDe ? 'Wartung sinkt auf 0' : 'Effort Decays to Zero'}
        </div>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {isDe
          ? 'Bei Einzeldokumenten sinkt der manuelle Pflegeaufwand rasch, während sich der Realitätsdrift exponentiell anhäuft.'
          : 'On individual files, maintenance effort decays while drift climbs. Without automated gates, stale docs become silent liabilities.'}
      </p>
    </div>
  );
}

export function VerificationBoundariesVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-5 rounded-xl border border-primary/40 bg-primary/5 space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary uppercase">
          <Cpu className="h-4 w-4" />
          <span>{isDe ? '1. Maschine' : '1. Machine'}</span>
        </div>
        <div className="text-sm font-bold text-foreground">{isDe ? 'Deterministisch' : 'Deterministic Core'}</div>
        <p className="text-xs text-muted-foreground">
          {isDe
            ? 'YAML-Syntax, Schema-Prüfung, Link-Rot, Gültigkeitsdaten.'
            : 'YAML syntax, schema conformance, link rot, freshness dates.'}
        </p>
      </div>

      <div className="p-5 rounded-xl border border-accent/40 bg-accent/5 space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent uppercase">
          <Bot className="h-4 w-4" />
          <span>{isDe ? '2. KI' : '2. AI'}</span>
        </div>
        <div className="text-sm font-bold text-foreground">{isDe ? 'Beschleunigung' : 'Acceleration'}</div>
        <p className="text-xs text-muted-foreground">
          {isDe
            ? 'Entwürfe, Diff-Zusammenfassungen, Übersetzungen, Konsistenz.'
            : 'Drafting, summarizing diffs, translating, semantic tagging.'}
        </p>
      </div>

      <div className="p-5 rounded-xl border border-secondary/40 bg-secondary/5 space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-secondary uppercase">
          <User className="h-4 w-4" />
          <span>{isDe ? '3. Mensch' : '3. Human'}</span>
        </div>
        <div className="text-sm font-bold text-foreground">{isDe ? 'Wahrheit & Absicht' : 'Ground Truth & Intent'}</div>
        <p className="text-xs text-muted-foreground">
          {isDe
            ? 'Strategischer Kontext, Freigabe, Verifikation des Wahrheitsgehalts.'
            : 'Strategic intent, ground truth verification, editorial sign-off.'}
        </p>
      </div>
    </div>
  );
}

export function OkfSchemaVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="space-y-3">
      <div className="p-4 rounded-xl border border-border bg-muted/30 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between pb-2 border-b border-border text-[11px] text-muted-foreground">
          <span>{isDe ? 'OKF v0.2 Frontmatter Standard' : 'Open Knowledge Format v0.2 Schema'}</span>
          <span className="text-accent">Google OKF</span>
        </div>
        <pre className="text-foreground/90 overflow-x-auto leading-relaxed text-[11px]">
          {`---
type: steering
title: "Software Architecture Vision"
description: "Tenets for the Next.js application that renders Decks"
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-18T00:00:00Z
verified:
  by: han
  at: 2026-09-20T12:00:00Z
stale_after: 2026-10-30T00:00:00Z
---`}
        </pre>
      </div>
      <p className="text-xs text-muted-foreground">
        {isDe
          ? 'Klare Trennung: generated.* ist die Behauptung des Agenten; verified.* ist die explizite Bestätigung des Menschen.'
          : 'Clear governance: generated.* is the AI claim; verified.* is the explicit human certification.'}
      </p>
    </div>
  );
}

export function DeterministicCoreVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="p-5 rounded-xl border border-border bg-card/60 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center">
        <div className="p-3 rounded-lg border border-border bg-background space-y-1.5 text-xs font-mono">
          <div className="text-primary font-bold">{isDe ? '3 Auslöser (Triggers)' : '3 Triggers'}</div>
          <div className="text-muted-foreground text-[11px]">CLI · Git Hook · CI Push</div>
        </div>

        <div className="p-4 rounded-xl border-2 border-accent bg-accent/10 space-y-1 text-xs font-mono">
          <div className="text-accent font-extrabold text-sm">markdown-harness</div>
          <div className="text-foreground font-bold">
            {isDe ? '100% Deterministischer Core' : '100% Deterministic Core'}
          </div>
        </div>

        <div className="p-3 rounded-lg border border-border bg-background space-y-1.5 text-xs font-mono">
          <div className="text-emerald-500 font-bold">{isDe ? '3 Ergebnisse' : '3 Outcomes'}</div>
          <div className="text-muted-foreground text-[11px]">Pass · Warnung · Blocked Push</div>
        </div>
      </div>
    </div>
  );
}

export function LiveDemoTerminalVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="rounded-xl border border-border bg-black text-emerald-400 font-mono text-xs p-4 space-y-2 overflow-x-auto shadow-lg">
      <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 text-muted-foreground text-[11px]">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-white/50">bash — npx mh --check</span>
      </div>
      <div className="text-white/80">$ npx mh --check</div>
      <div className="text-emerald-400">✔ markdown-harness.config.yaml loaded (13 rules)</div>
      <div className="text-amber-400">
        {isDe
          ? '⚠ docs/steering/product.md: stale_after vor 3 Tagen abgelaufen'
          : '⚠ docs/steering/product.md: stale_after expired 3 days ago'}
      </div>
      <div className="text-red-400">
        {isDe
          ? "✖ docs/episodes/new.md: Pflichtfeld 'verified.by' fehlt"
          : "✖ docs/episodes/new.md: missing required field 'verified.by'"}
      </div>
      <div className="text-white/60 pt-1">
        {isDe ? 'Ergebnis: 1 Regelverletzung. Push blockiert.' : 'Result: 1 violation found. Gate blocked push.'}
      </div>
    </div>
  );
}

export function RoadmapVisual({ locale }: { locale: LocaleCode }) {
  const isDe = locale === 'de';
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 rounded-xl border border-border bg-card/60 space-y-2">
        <div className="font-mono text-xs font-bold text-emerald-500 uppercase">
          {isDe ? 'Bereits implementiert (Shipped)' : 'Shipped Features'}
        </div>
        <ul className="text-xs text-muted-foreground space-y-1.5 font-mono">
          <li>✔ OKF v0.2 Schema Validation</li>
          <li>✔ Freshness sentence generation</li>
          <li>✔ Query CLI: npx mh --query &lt;path&gt;</li>
        </ul>
      </div>

      <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 space-y-2">
        <div className="font-mono text-xs font-bold text-accent uppercase">
          {isDe ? 'In Planung (Roadmap)' : 'Planned Roadmap'}
        </div>
        <ul className="text-xs text-muted-foreground space-y-1.5 font-mono">
          <li>→ AST Markdown deep-linting</li>
          <li>→ Automated git blame drift tracker</li>
          <li>→ Interactive terminal auto-fix</li>
        </ul>
      </div>
    </div>
  );
}
