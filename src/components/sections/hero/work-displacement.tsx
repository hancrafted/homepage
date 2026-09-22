'use client';

import { prefersReducedMotion } from '@/lib/preferences';
import { useEffect, useRef } from 'react';

interface CursorState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: boolean;
}

interface PointParams {
  x: number;
  baseY: number;
  xProgress: number;
  lineIdx: number;
  time: number;
}

function calculateDisplacement(p: PointParams, cursor: CursorState): { y: number; alphaBoost: number } {
  // Ambient natural drift
  const wave1 = Math.sin(p.xProgress * 3.5 + p.time + p.lineIdx * 0.35) * 18;
  const wave2 = Math.cos(p.xProgress * 2.2 - p.time * 0.6 + p.lineIdx * 0.2) * 12;
  let y = p.baseY + wave1 + wave2;
  let alphaBoost = 0;

  if (!cursor.active) return { y, alphaBoost };

  const dx = p.x - cursor.x;
  const dy = y - cursor.y;
  const dist = Math.hypot(dx, dy);
  const radius = 220;

  if (dist < radius && dist > 0) {
    // Powerful displacement force pushing work away from AI cursor
    const force = Math.pow(1 - dist / radius, 1.8) * 65;
    const angle = Math.atan2(dy, dx);
    y += Math.sin(angle) * force;
    alphaBoost = (1 - dist / radius) * 0.6;
  }

  return { y, alphaBoost };
}

function getStrokeStyle(isDark: boolean, isAccent: boolean, alphaBoost: number): string {
  const baseAlpha = isAccent ? 0.35 : 0.15;
  const finalAlpha = Math.min(0.9, baseAlpha + alphaBoost);
  if (isAccent) {
    return isDark ? `rgba(99, 102, 241, ${finalAlpha})` : `rgba(59, 130, 246, ${finalAlpha})`;
  }
  return isDark ? `rgba(56, 189, 248, ${finalAlpha})` : `rgba(37, 99, 235, ${finalAlpha})`;
}

interface RenderLineProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  lineIdx: number;
}

function renderDisplacedLine(p: RenderLineProps, time: number, cursor: CursorState, isDark: boolean) {
  const lineProgress = p.lineIdx / 15;
  const baseY = p.height * 0.12 + lineProgress * (p.height * 0.78);
  const isAccent = p.lineIdx % 4 === 0;
  const points = 45;

  p.ctx.beginPath();
  let maxAlpha = 0;

  for (let j = 0; j <= points; j++) {
    const xProgress = j / points;
    const x = xProgress * p.width;
    const { y, alphaBoost } = calculateDisplacement({ x, baseY, xProgress, lineIdx: p.lineIdx, time }, cursor);
    if (alphaBoost > maxAlpha) maxAlpha = alphaBoost;

    if (j === 0) p.ctx.moveTo(x, y);
    else p.ctx.lineTo(x, y);
  }

  p.ctx.strokeStyle = getStrokeStyle(isDark, isAccent, maxAlpha);
  p.ctx.lineWidth = isAccent || maxAlpha > 0.2 ? 1.8 : 1.0;
  p.ctx.stroke();
}

function bindCursorEvents(canvas: HTMLCanvasElement, cursor: CursorState, onResize: () => void) {
  const onMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    cursor.targetX = e.clientX - rect.left;
    cursor.targetY = e.clientY - rect.top;
    cursor.active = true;
  };

  const onLeave = () => {
    cursor.active = false;
  };

  window.addEventListener('resize', onResize);
  window.addEventListener('mousemove', onMove);
  document.addEventListener('mouseleave', onLeave);
  onResize();

  return () => {
    window.removeEventListener('resize', onResize);
    window.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseleave', onLeave);
  };
}

function useDisplacementCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let animId: number;
    let time = 0;
    const dims = { width: 0, height: 0 };
    const cursor: CursorState = { x: -500, y: -500, targetX: -500, targetY: -500, active: false };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dims.width = canvas.parentElement?.clientWidth || window.innerWidth;
      dims.height = canvas.parentElement?.clientHeight || 650;
      canvas.width = dims.width * dpr;
      canvas.height = dims.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const cleanup = bindCursorEvents(canvas, cursor, handleResize);

    const loop = () => {
      time += 0.007;
      cursor.x += (cursor.targetX - cursor.x) * 0.12;
      cursor.y += (cursor.targetY - cursor.y) * 0.12;
      ctx.clearRect(0, 0, dims.width, dims.height);

      const isDark = document.documentElement.classList.contains('dark');
      for (let i = 0; i < 16; i++) {
        renderDisplacedLine({ ctx, width: dims.width, height: dims.height, lineIdx: i }, time, cursor, isDark);
      }
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cleanup();
      cancelAnimationFrame(animId);
    };
  }, [canvasRef]);
}

export function WorkDisplacementCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDisplacementCanvas(canvasRef);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full opacity-80" />
      <div className="absolute bottom-6 right-8 font-mono text-[9px] text-muted-foreground/35 hidden md:block select-none">
        [WORK_DISPLACEMENT_FIELD // AI SHIFTS THE TOPOLOGY]
      </div>
    </div>
  );
}
