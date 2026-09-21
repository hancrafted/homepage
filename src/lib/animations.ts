import gsap from 'gsap';

export const GSAP_DEFAULTS = {
  ease: 'expo.out',
  duration: 1.2,
} as const;

export const ANIMATION_TIMING = {
  entrance: 1.2,
  exit: 0.3,
  exitEase: 'power3.in',
  staggerAmount: 0.4,
} as const;

let isInitialized = false;

export function initGsapDefaults(): void {
  if (typeof window === 'undefined' || isInitialized) {
    return;
  }
  gsap.defaults(GSAP_DEFAULTS);
  isInitialized = true;
}
