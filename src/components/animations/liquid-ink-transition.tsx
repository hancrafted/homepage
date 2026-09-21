'use client';

import { prefersReducedMotion } from '@/lib/preferences';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

export type TransitionStyle = 'liquid' | 'paper' | 'glitch' | 'goo' | 'dither' | 'wave';

interface StyleConfig {
  bleed: number;
  ease: (p: number) => number;
}

const STYLE_CONFIGS: Record<TransitionStyle, StyleConfig> = {
  liquid: {
    bleed: 300,
    ease: (p: number) => (p < 0.02 ? (p / 0.02) * 0.18 : 0.18 + ((p - 0.02) / 0.98) * 0.82),
  },
  paper: {
    bleed: 120,
    ease: (p: number) => (p < 0.02 ? (p / 0.02) * 0.1 : 0.1 + ((p - 0.02) / 0.98) * 0.9),
  },
  glitch: {
    bleed: 200,
    ease: (p: number) => (p < 0.02 ? (p / 0.02) * 0.15 : 0.15 + ((p - 0.02) / 0.98) * 0.85),
  },
  goo: {
    bleed: 250,
    ease: (p: number) => (p < 0.02 ? (p / 0.02) * 0.15 : 0.15 + ((p - 0.02) / 0.98) * 0.85),
  },
  dither: {
    bleed: 100,
    ease: (p: number) => (p < 0.02 ? (p / 0.02) * 0.08 : 0.08 + ((p - 0.02) / 0.98) * 0.92),
  },
  wave: {
    bleed: 180,
    ease: (p: number) => (p < 0.02 ? (p / 0.02) * 0.12 : 0.12 + ((p - 0.02) / 0.98) * 0.88),
  },
};

function resolveStyle(variant?: TransitionStyle): TransitionStyle {
  if (variant && variant in STYLE_CONFIGS) {
    return variant;
  }
  const configured = process.env.NEXT_PUBLIC_TRANSITION_STYLE as TransitionStyle | undefined;
  if (configured && configured in STYLE_CONFIGS) {
    return configured;
  }
  return 'liquid';
}

function LiquidFilter() {
  return (
    <filter id="ink-edge-liquid" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves={3} seed={7} result="noise" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale={220}
        xChannelSelector="R"
        yChannelSelector="G"
        result="displaced"
      />
      <feGaussianBlur in="displaced" stdDeviation={1.8} result="presmooth" />
      <feComponentTransfer in="presmooth" result="cut">
        <feFuncA type="discrete" tableValues="0 0 0 0 0 1 1 1 1 1" />
      </feComponentTransfer>
      <feGaussianBlur in="cut" stdDeviation={0.4} />
    </filter>
  );
}

function PaperFilter() {
  return (
    <filter id="ink-edge-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04 0.008" numOctaves={5} seed={12} result="noise" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale={75}
        xChannelSelector="R"
        yChannelSelector="G"
        result="displaced"
      />
      <feGaussianBlur in="displaced" stdDeviation={0.8} result="presmooth" />
      <feComponentTransfer in="presmooth" result="cut">
        <feFuncA type="discrete" tableValues="0 0 0 0 0 1 1 1 1 1" />
      </feComponentTransfer>
      <feDropShadow dx={0} dy={-2} stdDeviation={1.5} floodColor="#000000" floodOpacity={0.25} />
    </filter>
  );
}

function GlitchFilter() {
  return (
    <filter id="ink-edge-glitch" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="turbulence" baseFrequency="0.001 0.35" numOctaves={2} seed={42} result="noise" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale={160}
        xChannelSelector="R"
        yChannelSelector="B"
        result="displaced"
      />
      <feMorphology in="displaced" operator="dilate" radius="3 0" result="dilated" />
      <feComponentTransfer in="dilated">
        <feFuncA type="discrete" tableValues="0 0 0 0 1 1 1 1" />
      </feComponentTransfer>
    </filter>
  );
}

function GooFilter() {
  return (
    <filter id="ink-edge-goo" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves={1} seed={3} result="noise" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale={180}
        xChannelSelector="R"
        yChannelSelector="G"
        result="displaced"
      />
      <feGaussianBlur in="displaced" stdDeviation={14} result="blurred" />
      <feColorMatrix in="blurred" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12" />
    </filter>
  );
}

function DitherFilter() {
  return (
    <filter id="ink-edge-dither" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85 0.85" numOctaves={2} seed={9} result="noise" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale={65}
        xChannelSelector="R"
        yChannelSelector="G"
        result="displaced"
      />
      <feComponentTransfer in="displaced">
        <feFuncA type="discrete" tableValues="0 0 0.15 0.35 0.65 1 1" />
      </feComponentTransfer>
    </filter>
  );
}

function WaveFilter() {
  return (
    <filter id="ink-edge-wave" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.06 0.0001" numOctaves={3} seed={5} result="noise" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale={140}
        xChannelSelector="R"
        yChannelSelector="R"
        result="displaced"
      />
      <feGaussianBlur in="displaced" stdDeviation={1.0} result="presmooth" />
      <feComponentTransfer in="presmooth">
        <feFuncA type="discrete" tableValues="0 0 0 0 1 1 1 1" />
      </feComponentTransfer>
    </filter>
  );
}

function InkFilterDefinition({ style }: { style: TransitionStyle }) {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <defs>
        {style === 'liquid' && <LiquidFilter />}
        {style === 'paper' && <PaperFilter />}
        {style === 'glitch' && <GlitchFilter />}
        {style === 'goo' && <GooFilter />}
        {style === 'dither' && <DitherFilter />}
        {style === 'wave' && <WaveFilter />}
      </defs>
    </svg>
  );
}

function useLiquidInkAnimation(
  scopeRef: React.RefObject<HTMLDivElement | null>,
  inkScaleRef: React.RefObject<HTMLDivElement | null>,
  targetId: string,
  styleConfig: StyleConfig,
) {
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const target = inkScaleRef.current;
      const trigger = document.getElementById(targetId);
      if (!target || !trigger || prefersReducedMotion()) return;

      gsap.set(target, { scaleY: 0 });

      gsap.to(target, {
        scaleY: 1,
        ease: styleConfig.ease,
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });
    },
    { scope: scopeRef },
  );
}

interface LiquidInkTransitionProps {
  targetId: string;
  color?: string;
  variant?: TransitionStyle;
}

export function LiquidInkTransition({ targetId, color = '#FAF9F6', variant }: LiquidInkTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inkScaleRef = useRef<HTMLDivElement>(null);
  const activeStyle = resolveStyle(variant);
  const styleConfig = STYLE_CONFIGS[activeStyle];
  const bleed = styleConfig.bleed;

  useLiquidInkAnimation(containerRef, inkScaleRef, targetId, styleConfig);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 right-0 h-screen z-40 overflow-hidden"
    >
      <InkFilterDefinition style={activeStyle} />
      <div
        style={{
          position: 'absolute',
          top: -bleed,
          left: -bleed,
          right: -bleed,
          bottom: -bleed,
          filter: `url(#ink-edge-${activeStyle})`,
          willChange: 'transform',
        }}
      >
        <div
          ref={inkScaleRef}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: color,
            transformOrigin: 'bottom',
            willChange: 'transform',
          }}
        />
      </div>
    </div>
  );
}
