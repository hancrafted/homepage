import { describe, expect, it } from 'vitest';
import {
  computePileSlot,
  handleBursts,
  MAX_PILE_CAP,
  ORBIT_RADIUS,
  type Particle,
  spawnBurst,
  updateOrbiting,
  updateSingleParticle,
} from './work-displacement-sim';

describe('work-displacement particle simulation', () => {
  describe('computePileSlot', () => {
    it('keeps all slots outside button interior so label text is never overlapped', () => {
      const width = 240;
      const cornerR = 10;
      for (let i = 0; i < MAX_PILE_CAP; i++) {
        const slot = computePileSlot(i, width);
        if (i < 34) {
          expect(slot.relY).toBeLessThanOrEqual(0);
        } else {
          const distFromCornerCenter = Math.hypot(slot.relX - cornerR, slot.relY - cornerR);
          expect(distFromCornerCenter).toBeGreaterThan(cornerR);
        }
      }
    });

    it('keeps top rim particles strictly on or above the top border', () => {
      const width = 240;
      for (let i = 0; i < 34; i++) {
        const slot = computePileSlot(i, width);
        expect(slot.relY).toBeLessThanOrEqual(0);
      }
    });

    it('distributes base layer particles across the button top span', () => {
      const width = 200;
      const slot0 = computePileSlot(0, width);
      const slot17 = computePileSlot(17, width);
      expect(slot0.relX).toBeLessThan(slot17.relX);
    });

    it('creates corner cascade slots outside the button rounded geometry', () => {
      const width = 200;
      const cornerSlot = computePileSlot(34, width);
      const dist = Math.hypot(cornerSlot.relX - 10, cornerSlot.relY - 10);
      expect(dist).toBeGreaterThan(10);
      expect(cornerSlot.relY).toBeLessThanOrEqual(10);
    });
  });

  describe('spawnBurst', () => {
    it('spawns the specified count of particles with scattering state', () => {
      const particles: Particle[] = [];
      const nextId = { current: 1 };
      const emitter = { x: 100, y: 50 };
      const attractor = { left: 100, top: 300, width: 200, height: 48 };

      spawnBurst({ count: 8, emitter, attractor, particles, nextId });

      expect(particles).toHaveLength(8);
      expect(nextId.current).toBe(9);
      for (const p of particles) {
        expect(p.state).toBe('scattering');
        expect(p.scatterTimer).toBeGreaterThan(0);
        expect(p.targetX).toBeGreaterThanOrEqual(attractor.left - 10);
      }
    });
  });

  describe('updateSingleParticle', () => {
    it('transitions scattering particles to drifting once scatter timer completes', () => {
      const particles: Particle[] = [];
      const p: Particle = {
        id: 1,
        x: 100,
        y: 100,
        vx: 10,
        vy: 10,
        radius: 2,
        alpha: 0,
        maxAlpha: 0.8,
        colorIndex: 0,
        state: 'scattering',
        scatterTimer: 0.05,
        seed: 1,
        waveFreq: 2,
        waveAmp: 2,
        slotIndex: 0,
        slotRelX: 10,
        slotRelY: -2,
        targetX: 150,
        targetY: 150,
        absorbTimer: 0,
      };
      particles.push(p);

      updateSingleParticle(p, 0.1, 0, particles);
      expect(p.state).toBe('drifting');
    });

    it('lands particle into piled state when close to target', () => {
      const particles: Particle[] = [];
      const p: Particle = {
        id: 1,
        x: 149,
        y: 149,
        vx: 1,
        vy: 1,
        radius: 2,
        alpha: 0.8,
        maxAlpha: 0.8,
        colorIndex: 0,
        state: 'drifting',
        scatterTimer: 0,
        seed: 1,
        waveFreq: 2,
        waveAmp: 2,
        slotIndex: 0,
        slotRelX: 10,
        slotRelY: -2,
        targetX: 150,
        targetY: 150,
        absorbTimer: 0,
      };
      particles.push(p);

      updateSingleParticle(p, 0.016, 0, particles);
      expect(p.state).toBe('piled');
      expect(p.x).toBe(150);
      expect(p.y).toBe(150);
    });

    it('returns false when absorbing particle timer expires for cleanup', () => {
      const particles: Particle[] = [];
      const p: Particle = {
        id: 1,
        x: 150,
        y: 150,
        vx: 0,
        vy: 0,
        radius: 2,
        alpha: 0.8,
        maxAlpha: 0.8,
        colorIndex: 0,
        state: 'absorbing',
        scatterTimer: 0,
        seed: 1,
        waveFreq: 2,
        waveAmp: 2,
        slotIndex: 0,
        slotRelX: 10,
        slotRelY: -2,
        targetX: 150,
        targetY: 150,
        absorbTimer: 0.05,
      };
      particles.push(p);

      const stillActive = updateSingleParticle(p, 0.1, 0, particles);
      expect(stillActive).toBe(false);
    });
  });

  describe('updateOrbiting', () => {
    it('evenly distributes orbiting particles around the cursor in a circle of ORBIT_RADIUS', () => {
      const particles: Particle[] = [
        {
          id: 1,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          radius: 2,
          alpha: 0.8,
          maxAlpha: 0.8,
          colorIndex: 0,
          state: 'orbiting',
          scatterTimer: 0,
          seed: 1,
          waveFreq: 2,
          waveAmp: 2,
          slotIndex: 0,
          slotRelX: 0,
          slotRelY: 0,
          targetX: 0,
          targetY: 0,
          absorbTimer: 0,
        },
        {
          id: 2,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          radius: 2,
          alpha: 0.8,
          maxAlpha: 0.8,
          colorIndex: 1,
          state: 'orbiting',
          scatterTimer: 0,
          seed: 2,
          waveFreq: 2,
          waveAmp: 2,
          slotIndex: 1,
          slotRelX: 0,
          slotRelY: 0,
          targetX: 0,
          targetY: 0,
          absorbTimer: 0,
        },
      ];

      const cursor = { x: 200, y: 300 };
      // Run multiple steps so particles converge to orbit slots
      for (let step = 0; step < 50; step++) {
        updateOrbiting(particles, cursor, 0.02, 0);
      }

      // Distance of each particle to cursor should converge to ORBIT_RADIUS
      const dist1 = Math.hypot(particles[0].x - cursor.x, particles[0].y - cursor.y);
      const dist2 = Math.hypot(particles[1].x - cursor.x, particles[1].y - cursor.y);
      expect(dist1).toBeCloseTo(ORBIT_RADIUS, 0);
      expect(dist2).toBeCloseTo(ORBIT_RADIUS, 0);

      // They should be on opposite sides (angle difference ~ pi)
      const angle1 = Math.atan2(particles[0].y - cursor.y, particles[0].x - cursor.x);
      const angle2 = Math.atan2(particles[1].y - cursor.y, particles[1].x - cursor.x);
      const angleDiff = Math.abs(angle1 - angle2);
      expect(angleDiff).toBeCloseTo(Math.PI, 1);
    });
  });

  describe('handleBursts', () => {
    it('triggers bursts when timer is <= 0 and returns next interval', () => {
      const particles: Particle[] = [];
      const nextId = { current: 1 };
      const emitter = { x: 50, y: 50 };
      const attractor = { left: 50, top: 350, width: 200, height: 48 };

      const nextTimer = handleBursts({
        timer: -0.1,
        emitter,
        attractor,
        active: false,
        particles,
        nextId,
      });

      expect(nextTimer).toBe(1.4);
      expect(particles).toHaveLength(8);
    });

    it('uses shorter interval and smaller burst when cursor is active', () => {
      const particles: Particle[] = [];
      const nextId = { current: 1 };
      const emitter = { x: 50, y: 50 };
      const attractor = { left: 50, top: 350, width: 200, height: 48 };

      const nextTimer = handleBursts({
        timer: -0.1,
        emitter,
        attractor,
        active: true,
        particles,
        nextId,
      });

      expect(nextTimer).toBe(0.28);
      expect(particles).toHaveLength(2);
    });
  });
});
