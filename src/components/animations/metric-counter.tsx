'use client';

import { prefersReducedMotion } from '@/lib/preferences';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

interface MetricCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export function MetricCounter({ value, className, duration = 1.4 }: MetricCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const span = spanRef.current;
      if (!span) return;

      if (prefersReducedMotion()) {
        span.textContent = value;
        return;
      }

      const match = value.match(/^([^0-9]*)([0-9]+)(.*)$/);
      if (!match) {
        span.textContent = value;
        return;
      }

      const prefix = match[1];
      const target = parseInt(match[2], 10);
      const suffix = match[3];

      const proxy = { count: 0 };
      span.textContent = `${prefix}0${suffix}`;

      gsap.to(proxy, {
        count: target,
        duration,
        ease: 'expo.out',
        onUpdate: () => {
          if (span) {
            span.textContent = `${prefix}${Math.round(proxy.count)}${suffix}`;
          }
        },
      });
    },
    { scope: spanRef, dependencies: [value] },
  );

  return (
    <span ref={spanRef} className={className} data-metric-counter="true">
      {value}
    </span>
  );
}
