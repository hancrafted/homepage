'use client';

import { initGsapDefaults } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/preferences';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ElementType, useId, useRef } from 'react';

export interface BlurRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
}

function renderWords(text: string, idPrefix: string) {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((word, idx) => (
    <span key={`${idPrefix}-w-${idx}`} data-blur-word="true" className="inline-block [will-change:filter,opacity]">
      {word}
      {idx < words.length - 1 ? '\u00A0' : ''}
    </span>
  ));
}

function useBlurAnimation(
  containerRef: React.RefObject<HTMLElement | null>,
  triggerOnScroll: boolean,
  delay: number,
  stagger: number,
) {
  useGSAP(
    () => {
      initGsapDefaults();
      const container = containerRef.current;
      if (!container || prefersReducedMotion()) return;

      const words = container.querySelectorAll('[data-blur-word="true"]');
      if (words.length === 0) return;

      gsap.set(words, { opacity: 0, filter: 'blur(10px)', y: 8 });

      const animVars: gsap.TweenVars = {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: { amount: stagger, from: 'start' },
        delay,
        onComplete: () => {
          gsap.set(words, { clearProps: 'filter,willChange' });
        },
      };

      if (triggerOnScroll) {
        animVars.scrollTrigger = {
          trigger: container,
          start: 'top 88%',
          once: true,
        };
      }

      gsap.to(words, animVars);
    },
    { scope: containerRef, dependencies: [triggerOnScroll, delay, stagger] },
  );
}

export function BlurRevealHeading({
  text,
  as: Component = 'h2',
  className = '',
  delay = 0,
  stagger = 0.8,
  triggerOnScroll = true,
}: BlurRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const idPrefix = useId();

  useBlurAnimation(containerRef, triggerOnScroll, delay, stagger);

  return (
    <Component ref={containerRef} className={className}>
      {renderWords(text, idPrefix)}
    </Component>
  );
}
