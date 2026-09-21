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
  spotlightColor = 'hsl(var(--primary) / 0.14)',
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  useSpotlight(cardRef);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-card/50 text-card-foreground shadow-lg shadow-black/20 transition-all duration-300 hover:shadow-2xl',
        'before:pointer-events-none before:absolute before:-inset-px before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100',
        className,
      )}
      style={
        {
          '--spotlight-color': spotlightColor,
          backgroundImage:
            'radial-gradient(420px circle at var(--mouse-x, -200px) var(--mouse-y, -200px), var(--spotlight-color), transparent 80%)',
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
