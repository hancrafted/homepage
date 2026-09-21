'use client';

import { prefersReducedMotion } from '@/lib/preferences';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  startTime: number;
}

const SPACING = 24;
const RIPPLE_DURATION = 2.0;

function drawBaseGrid(ctx: CanvasRenderingContext2D, width: number, height: number, isDark: boolean) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(100, 116, 139, 0.16)';
  for (let x = SPACING; x < width; x += SPACING) {
    for (let y = SPACING; y < height; y += SPACING) {
      ctx.beginPath();
      ctx.arc(x, y, 0.9, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function calculateRippleOffset(x: number, y: number, r: Ripple, now: number) {
  const age = now - r.startTime;
  const currentRadius = 380 * age;
  const dx = x - r.x;
  const dy = y - r.y;
  const dist = Math.hypot(dx, dy);

  if (dist === 0 || Math.abs(dist - currentRadius) >= 70) {
    return { dx: 0, dy: 0, alpha: 0 };
  }

  const falloff = Math.cos(((dist - currentRadius) / 70) * Math.PI * 0.5);
  const amp = 10 * (1 - age / RIPPLE_DURATION);
  return {
    dx: (dx / dist) * falloff * amp,
    dy: (dy / dist) * falloff * amp,
    alpha: 0.35 * Math.max(0, falloff) * (1 - age / RIPPLE_DURATION),
  };
}

function setupCanvasResize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawBaseGrid(ctx, window.innerWidth, window.innerHeight, document.documentElement.classList.contains('dark'));
  };
  window.addEventListener('resize', resize);
  resize();
  return () => window.removeEventListener('resize', resize);
}

function useDotCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const cleanupResize = setupCanvasResize(canvas, ctx);
    const ripples: Ripple[] = [];
    let rendering = false;

    const drawFrame = () => {
      const now = performance.now() / 1000;
      const valid = ripples.filter((r) => now - r.startTime <= RIPPLE_DURATION);
      ripples.length = 0;
      ripples.push(...valid);

      if (ripples.length === 0) {
        gsap.ticker.remove(drawFrame);
        rendering = false;
        drawBaseGrid(ctx, window.innerWidth, window.innerHeight, document.documentElement.classList.contains('dark'));
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      renderRippledDots(ctx, ripples, now, document.documentElement.classList.contains('dark'));
    };

    const handleClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('button, a, input, textarea, select, [role="button"]')) return;
      ripples.push({ x: e.clientX, y: e.clientY, startTime: performance.now() / 1000 });
      if (ripples.length > 6) ripples.shift();
      if (!rendering) {
        rendering = true;
        gsap.ticker.add(drawFrame);
      }
    };

    window.addEventListener('pointerdown', handleClick);
    return () => {
      cleanupResize();
      window.removeEventListener('pointerdown', handleClick);
      gsap.ticker.remove(drawFrame);
    };
  }, [canvasRef]);
}

function renderRippledDots(ctx: CanvasRenderingContext2D, ripples: Ripple[], now: number, isDark: boolean) {
  const baseFill = isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(100, 116, 139, 0.16)';
  for (let x = SPACING; x < window.innerWidth; x += SPACING) {
    for (let y = SPACING; y < window.innerHeight; y += SPACING) {
      let dotX = x;
      let dotY = y;
      let extraAlpha = 0;

      for (const r of ripples) {
        const offset = calculateRippleOffset(x, y, r, now);
        dotX += offset.dx;
        dotY += offset.dy;
        extraAlpha += offset.alpha;
      }

      ctx.beginPath();
      ctx.arc(dotX, dotY, extraAlpha > 0.05 ? 1.4 : 0.9, 0, Math.PI * 2);
      ctx.fillStyle = extraAlpha > 0.05 ? (isDark ? '#38bdf8' : '#2563eb') : baseFill;
      ctx.fill();
    }
  }
}

export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDotCanvas(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-30 h-full w-full opacity-65"
    />
  );
}
