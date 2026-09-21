'use client';

import { prefersReducedMotion } from '@/lib/preferences';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

function useSpotlight(ref: React.RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const card = ref.current;
      if (!card || prefersReducedMotion()) return;

      const xTo = gsap.quickTo(card, '--mouse-x', { duration: 0.25, ease: 'power2.out' });
      const yTo = gsap.quickTo(card, '--mouse-y', { duration: 0.25, ease: 'power2.out' });

      const handlePointerMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };

      card.addEventListener('pointermove', handlePointerMove);
      return () => card.removeEventListener('pointermove', handlePointerMove);
    },
    { scope: ref },
  );
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'hsl(var(--primary) / 0.12)',
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  useSpotlight(cardRef);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border/80 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md',
        'before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100',
        className,
      )}
      style={
        {
          '--spotlight-color': spotlightColor,
          backgroundImage:
            'radial-gradient(400px circle at var(--mouse-x, -200px) var(--mouse-y, -200px), var(--spotlight-color), transparent 80%)',
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
