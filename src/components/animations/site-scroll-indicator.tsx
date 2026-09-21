'use client';

import { prefersReducedMotion } from '@/lib/preferences';
import { useEffect, useRef } from 'react';

function updateIndicator(
  textRef: React.RefObject<HTMLSpanElement | null>,
  chapterRef: React.RefObject<HTMLSpanElement | null>,
  barRef: React.RefObject<HTMLDivElement | null>,
) {
  const doc = document.documentElement;
  const total = doc.scrollHeight - doc.clientHeight;
  if (total <= 0) return;

  const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100)));
  if (textRef.current) textRef.current.textContent = `${pct.toString().padStart(3, '0')}%`;
  if (barRef.current) barRef.current.style.transform = `scaleY(${pct / 100})`;

  const chapters = document.querySelectorAll<HTMLElement>('[data-chapter]');
  let currentChapter = '01';
  chapters.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.45) {
      currentChapter = el.dataset.chapter || currentChapter;
    }
  });

  if (chapterRef.current && chapterRef.current.textContent !== currentChapter) {
    chapterRef.current.textContent = currentChapter;
  }
}

function useScrollProgress(
  textRef: React.RefObject<HTMLSpanElement | null>,
  chapterRef: React.RefObject<HTMLSpanElement | null>,
  barRef: React.RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateIndicator(textRef, chapterRef, barRef);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [textRef, chapterRef, barRef]);
}

export function SiteScrollIndicator() {
  const textRef = useRef<HTMLSpanElement>(null);
  const chapterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useScrollProgress(textRef, chapterRef, barRef);

  return (
    <aside
      aria-hidden="true"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2 pointer-events-none select-none text-[10px] font-mono tracking-widest text-muted-foreground mix-blend-difference"
    >
      <span className="text-[9px] uppercase tracking-wider text-muted-foreground/70">ACT</span>
      <span ref={chapterRef} className="tabular-nums font-bold text-foreground">
        01
      </span>
      <div className="relative w-0.5 h-16 bg-foreground/20 rounded-full overflow-hidden my-1">
        <div
          ref={barRef}
          className="absolute top-0 left-0 w-full h-full bg-primary origin-top transition-transform duration-75"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>
      <span ref={textRef} className="tabular-nums font-bold">
        000%
      </span>
    </aside>
  );
}
