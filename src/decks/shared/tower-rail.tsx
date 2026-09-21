'use client';
// Interactive scroll-synced TOC rail, accordion navigation, and speaker notes toggle (Tenet 7)

import { Button } from '@/components/ui/button';
import { type LocaleCode } from '@/lib/preferences';
import { ChevronDown, ChevronRight, Menu, Volume2, X } from 'lucide-react';
import { useState } from 'react';
import { type TowerSection } from './tower-types';

interface TowerRailProps {
  sections: TowerSection[];
  activeBeatId: string;
  progress: number;
  showNotes: boolean;
  onToggleNotes: () => void;
  locale: LocaleCode;
}

function TocSingleBeat({
  section,
  isActive,
  locale,
  onJump,
}: {
  section: TowerSection;
  isActive: boolean;
  locale: LocaleCode;
  onJump: (id: string) => void;
}) {
  const beat = section.beats[0];
  const activeClass = isActive
    ? 'bg-accent/15 text-accent font-bold border-l-2 border-accent'
    : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground';

  return (
    <button
      type="button"
      onClick={() => onJump(beat.id)}
      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 ${activeClass}`}
    >
      <span className="opacity-40">{String(section.number).padStart(2, '0')}</span>
      <span className="truncate">{section.title[locale]}</span>
    </button>
  );
}

function TocMultipleBeats({
  section,
  activeBeatId,
  locale,
  onJump,
}: {
  section: TowerSection;
  activeBeatId: string;
  locale: LocaleCode;
  onJump: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center justify-between text-foreground/80 hover:bg-muted/40 transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="opacity-40">{String(section.number).padStart(2, '0')}</span>
          <span className="truncate">{section.title[locale]}</span>
        </span>
        {isOpen ? <ChevronDown className="h-3 w-3 opacity-40" /> : <ChevronRight className="h-3 w-3 opacity-40" />}
      </button>

      {isOpen && (
        <div className="pl-5 space-y-0.5 border-l border-border/40 ml-4">
          {section.beats.map((beat) => (
            <button
              key={beat.id}
              type="button"
              onClick={() => onJump(beat.id)}
              className={`w-full text-left px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors truncate block ${
                beat.id === activeBeatId
                  ? 'bg-accent/15 text-accent font-bold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              {beat.title[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TocNavList({
  sections,
  activeBeatId,
  locale,
  onJump,
}: {
  sections: TowerSection[];
  activeBeatId: string;
  locale: LocaleCode;
  onJump: (id: string) => void;
}) {
  return (
    <nav className="flex-1 overflow-y-auto space-y-2 pr-1" aria-label="Table of contents">
      {sections.map((section) =>
        section.beats.length === 1 ? (
          <TocSingleBeat
            key={section.number}
            section={section}
            isActive={section.beats[0].id === activeBeatId}
            locale={locale}
            onJump={onJump}
          />
        ) : (
          <TocMultipleBeats
            key={section.number}
            section={section}
            activeBeatId={activeBeatId}
            locale={locale}
            onJump={onJump}
          />
        ),
      )}
    </nav>
  );
}

function TocHeader({ progress, isDe }: { progress: number; isDe: boolean }) {
  return (
    <div className="space-y-2 pb-3 border-b border-border/60">
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span>{isDe ? 'Inhalt' : 'Contents'}</span>
        <span className="text-accent font-bold">{Math.round(progress)}%</span>
      </div>
      <div className="h-1 rounded-full bg-border overflow-hidden">
        <div className="h-full bg-accent transition-[width] duration-200" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function TocNotesButton({
  showNotes,
  onToggleNotes,
  isDe,
}: {
  showNotes: boolean;
  onToggleNotes: () => void;
  isDe: boolean;
}) {
  return (
    <div className="pt-3 border-t border-border/60">
      <Button
        type="button"
        variant={showNotes ? 'default' : 'outline'}
        size="sm"
        onClick={onToggleNotes}
        className="w-full justify-between font-mono text-xs"
      >
        <span className="flex items-center gap-1.5">
          <Volume2 className="h-3.5 w-3.5" />
          <span>{isDe ? 'Sprechernotizen' : 'Speaker notes'}</span>
        </span>
        <kbd className="px-1.5 py-0.5 rounded bg-muted/60 text-[10px] font-mono">N</kbd>
      </Button>
    </div>
  );
}

function MobileDrawer({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;
  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-background/90 backdrop-blur-sm p-4 flex flex-col">
      <div className="flex justify-end pb-2">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

function MobileTopBar({
  progress,
  showNotes,
  onOpenDrawer,
  onToggleNotes,
  isDe,
}: {
  progress: number;
  showNotes: boolean;
  onOpenDrawer: () => void;
  onToggleNotes: () => void;
  isDe: boolean;
}) {
  return (
    <div className="lg:hidden sticky top-14 z-20 flex items-center justify-between border-b border-border/60 bg-background/95 backdrop-blur px-4 py-2.5">
      <Button type="button" variant="outline" size="sm" onClick={onOpenDrawer} className="gap-2 font-mono text-xs">
        <Menu className="h-3.5 w-3.5" />
        <span>{isDe ? 'Inhalt & Navigation' : 'Contents & Navigation'}</span>
      </Button>

      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-accent">{Math.round(progress)}%</span>
        <Button
          type="button"
          variant={showNotes ? 'default' : 'ghost'}
          size="sm"
          onClick={onToggleNotes}
          className="h-8 px-2 font-mono text-xs"
        >
          Notes
        </Button>
      </div>
    </div>
  );
}

export function TowerRail({ sections, activeBeatId, progress, showNotes, onToggleNotes, locale }: TowerRailProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDe = locale === 'de';

  const handleJump = (id: string) => {
    setMobileOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navBody = (
    <div className="flex flex-col h-full space-y-4">
      <TocHeader progress={progress} isDe={isDe} />
      <TocNavList sections={sections} activeBeatId={activeBeatId} locale={locale} onJump={handleJump} />
      <TocNotesButton showNotes={showNotes} onToggleNotes={onToggleNotes} isDe={isDe} />
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-72 shrink-0 border-r border-border/60 p-4 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
        {navBody}
      </aside>

      <MobileTopBar
        progress={progress}
        showNotes={showNotes}
        onOpenDrawer={() => setMobileOpen(true)}
        onToggleNotes={onToggleNotes}
        isDe={isDe}
      />

      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
        {navBody}
      </MobileDrawer>
    </>
  );
}
