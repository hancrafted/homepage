import { type LocaleCode } from '@/lib/preferences';
import { Check, X } from 'lucide-react';

export function FreelancerContrastVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs">
      <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-emerald-400">
          <Check className="h-3.5 w-3.5" />
          <span>{locale === 'de' ? 'Stärken auf dem Papier' : 'Strengths On Paper'}</span>
        </div>
        <ul className="text-[11px] text-muted-foreground space-y-1">
          <li className="flex items-center gap-1">
            <span className="text-emerald-400">•</span>
            {locale === 'de' ? 'Enzyklopädisches Wissen & Schnell' : 'Encyclopedic knowledge & fast'}
          </li>
          <li className="flex items-center gap-1">
            <span className="text-emerald-400">•</span>
            {locale === 'de' ? 'Nimmt jede Aufgabe an' : 'Accepts any task immediately'}
          </li>
          <li className="flex items-center gap-1">
            <span className="text-emerald-400">•</span>
            {locale === 'de' ? 'Pausenlose Ausdauer' : 'Tireless stamina, never sleeps'}
          </li>
        </ul>
      </div>

      <div className="p-3 rounded-md bg-rose-500/10 border border-rose-500/20 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-rose-400">
          <X className="h-3.5 w-3.5" />
          <span>{locale === 'de' ? 'Kritische Schwachstellen' : 'Critical Operational Flaws'}</span>
        </div>
        <ul className="text-[11px] text-muted-foreground space-y-1">
          <li className="flex items-center gap-1">
            <span className="text-rose-400">•</span>
            {locale === 'de' ? 'Stellt keine Rückfragen (rät)' : 'Never asks questions (guesses)'}
          </li>
          <li className="flex items-center gap-1">
            <span className="text-rose-400">•</span>
            {locale === 'de' ? 'Rechnet jedes Wort ab' : 'Bills for every single word'}
          </li>
          <li className="flex items-center gap-1">
            <span className="text-rose-400">•</span>
            {locale === 'de' ? 'Komplette Amnesie je Sitzung' : 'Total amnesia across sessions'}
          </li>
        </ul>
      </div>
    </div>
  );
}

export function InvoiceContrastVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs">
      <div className="p-3 rounded-md bg-muted/40 border border-border space-y-1.5">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="font-bold text-foreground">
            {locale === 'de' ? 'Menschlicher Berater' : 'Human Contractor'}
          </span>
          <span className="text-[10px] text-accent">1 Rechnung</span>
        </div>
        <div className="text-lg font-bold text-foreground">€ 3.200</div>
        <p className="text-[11px] text-muted-foreground">
          {locale === 'de'
            ? '1 Pitch Deck • Formelle Freigabe • Geklärter Business Case'
            : '1 Pitch Deck • Formal sign-off • Explicit business case required'}
        </p>
      </div>

      <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/20 space-y-1.5">
        <div className="flex items-center justify-between text-amber-400">
          <span className="font-bold">{locale === 'de' ? 'KI Token-Drip' : 'AI Token Drip'}</span>
          <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded">0 Freigaben</span>
        </div>
        <div className="text-lg font-bold text-foreground">€ 3.200</div>
        <p className="text-[11px] text-muted-foreground">
          {locale === 'de'
            ? '3.000 unüberwachte Prompts • Unsichtbare monatliche Cloud-Rechnung'
            : '3,000 unmonitored prompts • Silent accumulation in developer IDEs'}
        </p>
      </div>
    </div>
  );
}

export function VerificationInversionVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs">
      <div className="p-3 rounded-md bg-sky-500/10 border border-sky-500/20 space-y-1">
        <div className="text-sky-400 font-bold">{locale === 'de' ? 'Klassisches Modell' : 'Pre-AI Paradigm'}</div>
        <div className="text-xs text-foreground font-semibold">
          {locale === 'de' ? 'Schreiben = Flaschenhals' : 'Writing was the bottleneck'}
        </div>
        <p className="text-[11px] text-muted-foreground">
          {locale === 'de'
            ? 'Hohe Erstellungskosten hielten das Volumen begrenzt. Manuelle Pflege war machbar.'
            : 'Authoring cost was high; production volume remained naturally bounded.'}
        </p>
      </div>

      <div className="p-3 rounded-md bg-purple-500/10 border border-purple-500/20 space-y-1">
        <div className="text-purple-400 font-bold">{locale === 'de' ? 'KI-Zeitalter' : 'AI Era Inversion'}</div>
        <div className="text-xs text-foreground font-semibold">
          {locale === 'de' ? 'Prüfung = Flaschenhals' : 'Verification is the bottleneck'}
        </div>
        <p className="text-[11px] text-muted-foreground">
          {locale === 'de'
            ? 'Erstellung kostet fast nichts. Prüfaufwand explodiert quadratisch durch Querverweise.'
            : 'Drafting cost collapsed to zero; verification exploded across compounding claims.'}
        </p>
      </div>
    </div>
  );
}

export function DefaultContrastVisual({ locale }: { locale: LocaleCode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full p-3 rounded-lg bg-background/50 border border-border font-mono text-xs">
      <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-destructive">
          <X className="h-3.5 w-3.5" />
          <span>{locale === 'de' ? 'Vorwärtsmodus (Unkontrolliert)' : 'Forward Mode (Uncontrolled)'}</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {locale === 'de'
            ? 'Beginnt bei vertrauten Aktivitäten. Hofft auf das Ergebnis ohne mathematische Kausalkette.'
            : 'Begins with familiar activities. Hopes for the outcome with zero causal arithmetic.'}
        </p>
      </div>
      <div className="p-3 rounded-md bg-accent/10 border border-accent/20 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-accent">
          <Check className="h-3.5 w-3.5" />
          <span>{locale === 'de' ? 'Rückwärtsverkettung (Gesteuert)' : 'Backward Chain (Controlled)'}</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {locale === 'de'
            ? 'Beginnt beim Zielzustand. Dividiert rückwärts bis zur kontrollierbaren Handlung.'
            : 'Begins at desired win. Divides backward until reaching a task fully inside control.'}
        </p>
      </div>
    </div>
  );
}
