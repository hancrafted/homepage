'use client';

import { initGsapDefaults } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/preferences';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

function setupScrollRefresh(lenis: Lenis) {
  const refresh = () => {
    ScrollTrigger.refresh();
    lenis.resize();
  };
  window.addEventListener('load', refresh);
  const timeoutId = setTimeout(refresh, 1200);
  document.fonts?.ready.then(refresh);

  return () => {
    window.removeEventListener('load', refresh);
    clearTimeout(timeoutId);
  };
}

function createLenisInstance() {
  return new Lenis({
    lerp: 0.09,
    duration: 1.2,
    touchMultiplier: 1.5,
  });
}

function bindLenisToGsap(lenis: Lenis) {
  lenis.on('scroll', () => ScrollTrigger.update());

  const tickerCb = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCb);
  gsap.ticker.lagSmoothing(0);

  const onRefresh = () => lenis.resize();
  ScrollTrigger.addEventListener('refresh', onRefresh);

  const cleanupRefresh = setupScrollRefresh(lenis);

  return () => {
    cleanupRefresh();
    ScrollTrigger.removeEventListener('refresh', onRefresh);
    gsap.ticker.remove(tickerCb);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
  };
}

function useLenisScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    initGsapDefaults();

    const lenis = createLenisInstance();
    lenisRef.current = lenis;
    const cleanup = bindLenisToGsap(lenis);

    return () => {
      lenisRef.current = null;
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
      lenisRef.current.resize();
    } else {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [pathname]);
}

export function SmoothScroll() {
  useLenisScroll();
  return null;
}
