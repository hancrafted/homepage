'use client';
// Sequenced GSAP entrance animations selecting elements via data-* attributes

import { ANIMATION_TIMING, initGsapDefaults } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/preferences';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

interface GsapRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}

export function GsapReveal({ children, className, stagger = true }: GsapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      initGsapDefaults();
      const container = containerRef.current;
      if (!container) return;

      const items = container.querySelectorAll<HTMLElement>('[data-reveal-item]');
      if (items.length === 0) return;

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION_TIMING.entrance,
          ease: 'expo.out',
          stagger: stagger ? { amount: ANIMATION_TIMING.staggerAmount } : 0,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={className} data-reveal-container="true">
      {children}
    </div>
  );
}
