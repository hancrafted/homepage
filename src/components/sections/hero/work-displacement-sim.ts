export const MAX_PILE_CAP = 36;
export const CAPTURE_RADIUS = 95;
export const ORBIT_RADIUS = 48;
export const ORBIT_SPEED = 0.9;
export const ABSORB_DURATION = 0.8;

const DARK_COLORS = ['#38bdf8', '#60a5fa', '#818cf8', '#93c5fd'];
const LIGHT_COLORS = ['#2563eb', '#3b82f6', '#4f46e5', '#1d4ed8'];

export type ParticleState = 'scattering' | 'drifting' | 'orbiting' | 'piled' | 'absorbing';

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  colorIndex: number;
  state: ParticleState;
  scatterTimer: number;
  seed: number;
  waveFreq: number;
  waveAmp: number;
  slotIndex: number;
  slotRelX: number;
  slotRelY: number;
  targetX: number;
  targetY: number;
  absorbTimer: number;
}

export interface Attractor {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function computePileSlot(index: number, width: number): { relX: number; relY: number } {
  const cornerR = 10;
  const topSpan = Math.max(20, width - cornerR * 2 - 8);

  if (index < 18) {
    const u = 0.05 + 0.9 * (index / 17);
    return { relX: cornerR + u * topSpan, relY: -1.5 - ((index * 7) % 3) * 0.4 };
  }
  if (index < 28) {
    const u = 0.08 + 0.65 * ((index - 18) / 9);
    return { relX: cornerR + u * topSpan, relY: -4.5 - ((index * 5) % 3) * 0.5 };
  }
  if (index < 34) {
    const u = 0.15 + 0.35 * ((index - 28) / 5);
    return { relX: cornerR + u * topSpan, relY: -7.5 - ((index * 3) % 2) * 0.5 };
  }
  const angle = Math.PI + 0.15 + ((index - 34) / 2) * (Math.PI * 0.35);
  return {
    relX: cornerR + (cornerR + 2) * Math.cos(angle),
    relY: cornerR + (cornerR + 2) * Math.sin(angle),
  };
}

function pickAvailableSlot(occupied: Set<number>, fallbackIdx: number): number {
  for (let s = 0; s < MAX_PILE_CAP; s++) {
    if (!occupied.has(s)) {
      occupied.add(s);
      return s;
    }
  }
  return fallbackIdx % MAX_PILE_CAP;
}

function createParticle(opts: {
  id: number;
  emitter: { x: number; y: number };
  attractor: Attractor;
  slotIndex: number;
}): Particle {
  const { id, emitter, attractor, slotIndex } = opts;
  const slot = computePileSlot(slotIndex, attractor.width);
  const targetX = attractor.left + slot.relX;
  const targetY = attractor.top + slot.relY;

  const baseAngle = Math.atan2(targetY - emitter.y, targetX - emitter.x);
  const disperseAngle = baseAngle + (Math.random() - 0.5) * 1.5;
  const speed = 90 + Math.random() * 70;

  return {
    id,
    x: emitter.x + (Math.random() - 0.5) * 6,
    y: emitter.y + (Math.random() - 0.5) * 6,
    vx: Math.cos(disperseAngle) * speed,
    vy: Math.sin(disperseAngle) * speed,
    radius: 1.8 + Math.random() * 0.6,
    alpha: 0,
    maxAlpha: 0.8 + Math.random() * 0.15,
    colorIndex: Math.floor(Math.random() * 4),
    state: 'scattering',
    scatterTimer: 0.3 + Math.random() * 0.25,
    seed: Math.random() * 100,
    waveFreq: 2.2 + Math.random() * 2.0,
    waveAmp: 2.0 + Math.random() * 2.5,
    slotIndex,
    slotRelX: slot.relX,
    slotRelY: slot.relY,
    targetX,
    targetY,
    absorbTimer: 0,
  };
}

export function spawnBurst(opts: {
  count: number;
  emitter: { x: number; y: number };
  attractor: Attractor;
  particles: Particle[];
  nextId: { current: number };
}) {
  const { count, emitter, attractor, particles, nextId } = opts;
  const occupied = new Set(
    particles.filter((p) => p.state === 'piled' || p.state === 'drifting').map((p) => p.slotIndex),
  );

  for (let i = 0; i < count; i++) {
    const slotIndex = pickAvailableSlot(occupied, particles.length + i);
    particles.push(createParticle({ id: nextId.current++, emitter, attractor, slotIndex }));
  }
}

export function renderParticleGlyph(ctx: CanvasRenderingContext2D, p: Particle, isDark: boolean) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = isDark
    ? DARK_COLORS[p.colorIndex % DARK_COLORS.length]
    : LIGHT_COLORS[p.colorIndex % LIGHT_COLORS.length];
  ctx.fill();

  if (p.state === 'orbiting') {
    ctx.strokeStyle = isDark ? 'rgba(147, 197, 253, 0.5)' : 'rgba(59, 130, 246, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();
}

export function renderOrbitRing(ctx: CanvasRenderingContext2D, x: number, y: number, isDark: boolean) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, ORBIT_RADIUS, 0, Math.PI * 2);
  ctx.strokeStyle = isDark ? 'rgba(147, 197, 253, 0.22)' : 'rgba(59, 130, 246, 0.2)';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 4]);
  ctx.stroke();
  ctx.restore();
}

function handlePileCap(particles: Particle[]) {
  const activePiled = particles.filter((pt) => pt.state === 'piled');
  if (activePiled.length > MAX_PILE_CAP) {
    const oldest = activePiled[0];
    oldest.state = 'absorbing';
    oldest.absorbTimer = ABSORB_DURATION;
  }
}

function updateDriftingParticle(p: Particle, dt: number, time: number, particles: Particle[]) {
  p.alpha = Math.min(p.maxAlpha, p.alpha + dt * 2.5);
  const dx = p.targetX - p.x;
  const dy = p.targetY - p.y;
  const dist = Math.hypot(dx, dy);

  if (dist < 3.5) {
    p.x = p.targetX;
    p.y = p.targetY;
    p.vx = 0;
    p.vy = 0;
    p.state = 'piled';
    handlePileCap(particles);
    return;
  }

  const dirX = dx / dist;
  const dirY = dy / dist;
  const desiredSpeed = 100 + 130 * Math.min(1, dist / 140);
  const wave = Math.sin(time * p.waveFreq + p.seed) * p.waveAmp * Math.min(1, dist / 100);

  const targetVx = dirX * desiredSpeed - dirY * wave * 16;
  const targetVy = dirY * desiredSpeed + dirX * wave * 16;
  const steerRate = 1 - Math.exp(-4.5 * dt);

  p.vx += (targetVx - p.vx) * steerRate;
  p.vy += (targetVy - p.vy) * steerRate;
  p.x += p.vx * dt;
  p.y += p.vy * dt;
}

export function updateSingleParticle(p: Particle, dt: number, time: number, particles: Particle[]): boolean {
  if (p.state === 'scattering') {
    p.alpha = Math.min(p.maxAlpha, p.alpha + dt * 5);
    p.vx *= Math.exp(-2.2 * dt);
    p.vy *= Math.exp(-2.2 * dt);
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.scatterTimer -= dt;
    if (p.scatterTimer <= 0) p.state = 'drifting';
    return true;
  }
  if (p.state === 'drifting') {
    updateDriftingParticle(p, dt, time, particles);
    return true;
  }
  if (p.state === 'piled') {
    p.y = p.targetY + Math.sin(time * 1.5 + p.seed) * 0.3;
    return true;
  }
  if (p.state === 'absorbing') {
    p.absorbTimer -= dt;
    const progress = Math.max(0, p.absorbTimer / ABSORB_DURATION);
    p.alpha = p.maxAlpha * progress;
    p.radius = Math.max(0.6, (1.8 + (p.seed % 0.6)) * (0.5 + 0.5 * progress));
    return p.absorbTimer > 0;
  }
  return true;
}

export function updateOrbiting(orbiting: Particle[], cursor: { x: number; y: number }, dt: number, baseAngle: number) {
  const count = orbiting.length;
  for (let k = 0; k < count; k++) {
    const p = orbiting[k];
    const angle = baseAngle + (k / count) * Math.PI * 2;
    const targetX = cursor.x + Math.cos(angle) * ORBIT_RADIUS;
    const targetY = cursor.y + Math.sin(angle) * ORBIT_RADIUS;
    const rate = 1 - Math.exp(-10 * dt);

    p.x += (targetX - p.x) * rate;
    p.y += (targetY - p.y) * rate;
    p.vx = (targetX - p.x) * 8;
    p.vy = (targetY - p.y) * 8;
    p.alpha = Math.min(1, p.alpha + dt * 4);
  }
}

export function handleBursts(opts: {
  timer: number;
  emitter: { x: number; y: number } | null;
  attractor: Attractor | null;
  active: boolean;
  particles: Particle[];
  nextId: { current: number };
}): number {
  const { timer, emitter, attractor, active, particles, nextId } = opts;
  if (timer > 0 || !emitter || !attractor) return timer;
  const dist = Math.hypot(attractor.left + attractor.width / 2 - emitter.x, attractor.top - emitter.y);
  if (dist <= 60) return timer;

  if (active) {
    spawnBurst({ count: 2, emitter, attractor, particles, nextId });
    return 0.28;
  }
  spawnBurst({ count: 8, emitter, attractor, particles, nextId });
  return 1.4;
}
