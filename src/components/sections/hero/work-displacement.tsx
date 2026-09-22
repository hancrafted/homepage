'use client';

import { prefersReducedMotion } from '@/lib/preferences';
import { useCallback, useEffect, useRef } from 'react';
import {
  type Attractor,
  CAPTURE_RADIUS,
  computePileSlot,
  handleBursts,
  ORBIT_SPEED,
  type Particle,
  renderOrbitRing,
  renderParticleGlyph,
  updateOrbiting,
  updateSingleParticle,
} from './work-displacement-sim';

interface CursorState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: boolean;
}

function queryAnchors(canvas: HTMLCanvasElement): {
  emitter: { x: number; y: number } | null;
  attractor: Attractor | null;
} {
  const canvasRect = canvas.getBoundingClientRect();
  const emitterEl =
    document.getElementById('hero-ai-emitter') ??
    document.querySelector('[data-hero-ai-emitter="true"]') ??
    document.querySelector('section[data-chapter="01"] h1 span[data-blur-word="true"]');

  const attractorEl =
    document.getElementById('hero-primary-cta') ??
    document.querySelector('[data-hero-primary-cta="true"]') ??
    document.querySelector('section[data-chapter="01"] a[href="#workshops"]');

  const emitter = emitterEl
    ? {
        x: emitterEl.getBoundingClientRect().left - canvasRect.left + emitterEl.getBoundingClientRect().width / 2,
        y: emitterEl.getBoundingClientRect().top - canvasRect.top + emitterEl.getBoundingClientRect().height / 2,
      }
    : null;

  const attractor = attractorEl
    ? {
        left: attractorEl.getBoundingClientRect().left - canvasRect.left,
        top: attractorEl.getBoundingClientRect().top - canvasRect.top,
        width: attractorEl.getBoundingClientRect().width,
        height: attractorEl.getBoundingClientRect().height,
      }
    : null;

  return { emitter, attractor };
}

function syncParticles(particles: Particle[], attractor: Attractor) {
  for (const p of particles) {
    const slot = computePileSlot(p.slotIndex, attractor.width);
    p.slotRelX = slot.relX;
    p.slotRelY = slot.relY;
    p.targetX = attractor.left + p.slotRelX;
    p.targetY = attractor.top + p.slotRelY;
    if (p.state === 'piled') {
      p.x = p.targetX;
      p.y = p.targetY;
    }
  }
}

function bindCursor(canvas: HTMLCanvasElement, heroEl: HTMLElement | null, cursor: CursorState) {
  const onMouseMove = (e: MouseEvent) => {
    if (!heroEl) return;
    const r = heroEl.getBoundingClientRect();
    const cr = canvas.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    cursor.active = inside;
    if (inside) {
      cursor.targetX = e.clientX - cr.left;
      cursor.targetY = e.clientY - cr.top;
    }
  };

  const onMouseLeave = () => {
    cursor.active = false;
  };

  window.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseleave', onMouseLeave);

  return () => {
    window.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
  };
}

function updateFrameParticles(ctx: CanvasRenderingContext2D, particles: Particle[], dt: number, time: number) {
  const isDark = document.documentElement.classList.contains('dark');
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    if (!updateSingleParticle(p, dt, time, particles)) {
      particles.splice(i, 1);
      continue;
    }
    renderParticleGlyph(ctx, p, isDark);
  }
}

function updateOrbitState(
  particles: Particle[],
  cursor: CursorState,
  dt: number,
  orbitAngleRef: { current: number },
): number {
  const orbiting = particles.filter((p) => p.state === 'orbiting');
  if (cursor.active) {
    for (const p of particles) {
      const isFlying = p.state === 'scattering' || p.state === 'drifting';
      if (isFlying && Math.hypot(p.x - cursor.x, p.y - cursor.y) < CAPTURE_RADIUS) {
        p.state = 'orbiting';
        orbiting.push(p);
      }
    }
    orbitAngleRef.current += ORBIT_SPEED * dt;
    updateOrbiting(orbiting, cursor, dt, orbitAngleRef.current);
  } else if (orbiting.length > 0) {
    for (const p of orbiting) p.state = 'drifting';
  }
  return orbiting.length;
}

function renderFrame(opts: {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  cursor: CursorState;
  orbitingCount: number;
  particles: Particle[];
  time: number;
  dt: number;
}) {
  const { ctx, canvas, cursor, orbitingCount, particles, time, dt } = opts;
  const w = canvas.parentElement?.clientWidth || window.innerWidth;
  const h = canvas.parentElement?.clientHeight || 650;
  ctx.clearRect(0, 0, w, h);
  const isDark = document.documentElement.classList.contains('dark');
  if (cursor.active && orbitingCount > 0) renderOrbitRing(ctx, cursor.x, cursor.y, isDark);
  updateFrameParticles(ctx, particles, dt, time);
}

function resizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, updateAnchors: () => void) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = (canvas.parentElement?.clientWidth || window.innerWidth) * dpr;
  canvas.height = (canvas.parentElement?.clientHeight || 650) * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  updateAnchors();
}

function setupCanvas(canvas: HTMLCanvasElement, onResize: () => void, updateAnchors: () => void) {
  const heroEl = canvas.closest('section[data-chapter="01"]') || canvas.parentElement;
  window.addEventListener('resize', onResize);
  const ro = new ResizeObserver(onResize);
  if (heroEl) ro.observe(heroEl);
  ro.observe(canvas);
  void document.fonts?.ready?.then(updateAnchors);
  onResize();

  return () => {
    window.removeEventListener('resize', onResize);
    ro.disconnect();
  };
}

function startAnimation(opts: {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  anchorsRef: React.RefObject<{ emitter: { x: number; y: number } | null; attractor: Attractor | null }>;
  particlesRef: React.RefObject<Particle[]>;
  nextIdRef: React.RefObject<{ current: number }>;
  cursor: CursorState;
}): () => void {
  let animId = 0,
    lastTime = performance.now() / 1000,
    time = 0,
    burstTimer = 0.2;
  const orbitAngleRef = { current: 0 };
  const { canvas, ctx, anchorsRef, particlesRef, nextIdRef, cursor } = opts;

  const loop = () => {
    const now = performance.now() / 1000;
    const dt = Math.min(now - lastTime, 0.1);
    lastTime = now;
    time += dt;

    cursor.x += (cursor.targetX - cursor.x) * (1 - Math.exp(-14 * dt));
    cursor.y += (cursor.targetY - cursor.y) * (1 - Math.exp(-14 * dt));

    burstTimer = handleBursts({
      timer: burstTimer - dt,
      emitter: anchorsRef.current.emitter,
      attractor: anchorsRef.current.attractor,
      active: cursor.active,
      particles: particlesRef.current,
      nextId: nextIdRef.current,
    });

    const orbitingCount = updateOrbitState(particlesRef.current, cursor, dt, orbitAngleRef);
    renderFrame({ ctx, canvas, cursor, orbitingCount, particles: particlesRef.current, time, dt });
    animId = requestAnimationFrame(loop);
  };

  animId = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(animId);
}

function useWorkDisplacement(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const nextIdRef = useRef({ current: 1 });
  const particlesRef = useRef<Particle[]>([]);
  const anchorsRef = useRef<{ emitter: { x: number; y: number } | null; attractor: Attractor | null }>({
    emitter: null,
    attractor: null,
  });

  const updateAnchors = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { emitter, attractor } = queryAnchors(canvas);
    anchorsRef.current = { emitter, attractor };
    if (attractor) syncParticles(particlesRef.current, attractor);
  }, [canvasRef]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const cursor: CursorState = { x: -500, y: -500, targetX: -500, targetY: -500, active: false };
    const onResize = () => resizeCanvas(canvas, ctx, updateAnchors);
    const cleanupSetup = setupCanvas(canvas, onResize, updateAnchors);
    const heroEl = canvas.closest('section[data-chapter="01"]') || canvas.parentElement;
    const unbindCursor = bindCursor(canvas, heroEl as HTMLElement | null, cursor);
    const stopAnim = startAnimation({ canvas, ctx, anchorsRef, particlesRef, nextIdRef, cursor });

    return () => {
      unbindCursor();
      cleanupSetup();
      stopAnim();
    };
  }, [canvasRef, updateAnchors]);
}

export function WorkDisplacementCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useWorkDisplacement(canvasRef);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute bottom-6 right-8 hidden select-none font-mono text-[9px] text-muted-foreground/35 md:block">
        [WORK_DISPLACEMENT // AI DISPLACES • HUMAN ORDERS • LANDS AT CTA]
      </div>
    </div>
  );
}
