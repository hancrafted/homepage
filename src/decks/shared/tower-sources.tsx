import { type DeckSourceReceipt } from '@/content/decks/types';
import { type LocaleCode } from '@/lib/preferences';
import { ExternalLink } from 'lucide-react';

export function TowerSources({ sources, locale }: { sources?: DeckSourceReceipt[]; locale: LocaleCode }) {
  if (!sources || sources.length === 0) return null;
  const isDe = locale === 'de';

  return (
    <section id="sources" className="py-12 border-t border-border/60 space-y-6">
      <div className="space-y-1">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-bold">
          {isDe ? 'Quellen & Nachweise' : 'Sources & Further Reading'}
        </div>
        <p className="text-xs text-muted-foreground">
          {isDe
            ? 'Die Thesen dieser Präsentation, belegt und verifiziert (Stand Juli 2026).'
            : 'The claims on this page, receipted. Prices and findings verified.'}
        </p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs text-muted-foreground">
        {sources.map((src) => (
          <li key={src.id} className="flex items-start gap-2">
            <span className="font-mono font-bold text-accent shrink-0">[{src.id}]</span>
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-1 group leading-snug"
            >
              <span className="group-hover:underline">{src.label}</span>
              <ExternalLink className="h-3 w-3 shrink-0 opacity-40 group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
