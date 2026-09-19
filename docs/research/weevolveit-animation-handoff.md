# weevolveit.com — animation system handoff

Reverse-engineered 2026-09-18 from the production bundle (Next.js 16.2.6 / Turbopack, Vercel, deployment `dpl_B4svXFh66zvL8Y7kVQt6KVGDmsKn`). Everything below is read off shipped JS/CSS, not inferred.

## 1. Stack

| Layer            | Choice                                                                | Evidence                                                                   |
| ---------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Framework        | Next.js 16.2.6 App Router, RSC, `next-intl` (en/es)                   | `window.next={version:"16.2.6",appDir:!0}`                                 |
| Bundler          | Turbopack, self-hosted chunks (no animation CDN)                      | `globalThis.TURBOPACK` chunk format                                        |
| Styling          | Tailwind v4 (`--spacing`, `@theme` tokens)                            | compiled CSS uses `calc(var(--spacing) * n)`                               |
| Timeline engine  | **GSAP 3.15.0** — core + ScrollTrigger + SplitText + MorphSVGPlugin   | `a0.version="3.15.0"`, `registerPlugin(useGSAP, ScrollTrigger, SplitText)` |
| React binding    | **`@gsap/react` `useGSAP`** — bundled inline, `revert()` on unmount   | `t.s(["useGSAP",0,nY],85007)`                                              |
| Smooth scroll    | **Lenis 1.3.25**                                                      | `r="1.3.25"`, `window.lenisVersion`                                        |
| Hero 3D          | **three.js (r18x)** + `@react-three/fiber` + drei `Html`              | `ACESFilmicToneMapping`, `PMREMGenerator`, `useFrame`                      |
| Ambient gradient | **OGL** (micro WebGL lib) running a ReactBits-derived `Aurora` shader | `gl.renderer`, `dpr`, `Triangle` geometry, `#version 300 es`               |
| Canvas FX        | hand-rolled Canvas2D dot field                                        | `getContext("2d")` in `DotField`                                           |

No Framer Motion, no Lottie, no Rive, no Locomotive. **GSAP is the single timeline authority.**

## 2. The three global decisions to copy first

### 2.1 One global easing contract

```js
gsap.defaults({ ease: 'expo.out', duration: 1.2 }); // set once at module load
```

Mirrored in CSS custom properties so CSS transitions match GSAP:

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1); /* expo.out */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-exit: cubic-bezier(0.55, 0.055, 0.675, 0.19);
```

Practically every entrance in the app is `expo.out`; exits are `power3.in` at ~0.3s (roughly 1/4 the entrance duration). That asymmetry is the whole "feel".

### 2.2 Data attributes are the animation contract

Animations never select by class name or React ref chains across component boundaries. Every animatable node carries a semantic `data-*` hook and GSAP queries it:

```
[data-hero-title] [data-hero-sub] [data-hero-stats] [data-hero-carousel]
[data-method-rail] [data-method-slide="N"] [data-method-name] [data-method-tagline] [data-method-bullet]
[data-footer-comms] [data-footer-comm-card] [data-footer-socials] [data-footer-social-pill]
[data-footer-strip-row] [data-footer-meta]
[data-nav-root] [data-navdropdown] [data-mega-item] [data-dd-panel] [data-dd-item] [data-dd-arrow]
[data-cursor] [data-cursor-hover] [data-intro-overlay] [data-clickable]
```

Server components render the markup and the attributes; a thin `"use client"` sibling animates by selector. This is what lets the whole site stay RSC-first while still being heavily animated.

**Adopt this.** It is the single highest-leverage convention in the codebase.

### 2.3 Reduced motion is a first-class branch, not an afterthought

```js
export const prefersReducedMotion = () =>
  globalThis.window?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false;
```

Three distinct handling styles, used deliberately:

1. **Bail early** — `if (prefersReducedMotion()) return;` (LogoMarquee, DotField, SmoothScroll).
2. **Jump to end state** — footer sets `autoAlpha: 1` on everything and calls `.play()` on the sub-timelines so content is visible and static.
3. **Render a different component** — the `Method` rail subscribes reactively via
   `useSyncExternalStore(subscribeToMediaQuery, () => mq.matches, () => false)`
   and returns a _stacked vertical layout_ instead of the pinned horizontal rail. Live `change` events re-render.

Mobile (`max-width: 767px`) is treated as a fourth reduced-motion tier: the intro overlay and the hero text timeline are both skipped entirely on phones.

## 3. Smooth scroll + ScrollTrigger integration

`SmoothScroll` is a render-null client component mounted in the root layout.

```js
const lenis = new Lenis({ content: document.body, lerp: 0.09, anchors: true });

lenis.on('scroll', () => ScrollTrigger.update());
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
ScrollTrigger.addEventListener('refresh', () => lenis.resize());

// cleanup restores gsap.ticker.lagSmoothing(500, 33)
```

Route changes: on `usePathname()` change it calls `lenis.scrollTo(0, { immediate: true, force: true })` then `lenis.resize()` — **except** when a `popstate` fired first (a flag ref), so browser back/forward restores scroll position naturally.

Refresh hygiene after late layout shifts:

```js
const refresh = () => ScrollTrigger.refresh();
window.addEventListener('load', refresh);
setTimeout(refresh, 1200);
document.fonts?.ready.then(refresh);
```

## 4. Signature effects — recipes

### 4.1 `blurWordReveal` — the house text entrance

The one reusable animation primitive. Exported from its own module and reused by hero, footer and section headers.

```js
export function blurWordReveal(el, opts) {
  const split = SplitText.create(el, {
    type: 'words',
    wordsClass: 'inline-block [will-change:filter,opacity]',
  });
  gsap.set(el, { opacity: 1 }); // unhide container
  gsap.set(split.words, { opacity: 0, filter: 'blur(10px)' });

  const vars = {
    opacity: 1,
    filter: 'blur(0px)',
    duration: 1.2,
    stagger: { amount: opts?.stagger ?? 1.2, from: 'start' }, // amount, not each
    delay: opts?.delay,
    onComplete: () => gsap.set(split.words, { clearProps: 'filter,willChange' }),
  };

  const tween = opts?.tl ? opts.tl.to(split.words, vars, opts.at) : gsap.to(split.words, vars);
  return { split, tween };
}
```

Three details worth stealing:

- `stagger: { amount }` fixes **total** stagger duration regardless of word count, so a 4-word and a 14-word headline take the same time.
- `clearProps: "filter,willChange"` on complete — the blur filter and the compositor hint are removed once the animation is done, so long text isn't left on its own GPU layer.
- It returns `{ split, tween }` so the caller owns `split.revert()` in the `useGSAP` cleanup.

### 4.2 Hero entrance timeline (desktop only)

```js
gsap.set([title, sub], { opacity: 0 });
gsap.set(['[data-hero-stats]', '[data-hero-carousel]'], { y: 24, opacity: 0 });

const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
blurWordReveal(title, { tl, at: 0.6 });
blurWordReveal(sub, { tl, at: 1.4 });
tl.to('[data-hero-stats]', { y: 0, opacity: 1, duration: 1.2 }, 2.0);
tl.to('[data-hero-carousel]', { y: 0, opacity: 1, duration: 1.2 }, 2.6);
```

Absolute positions on the timeline (`0.6 / 1.4 / 2.0 / 2.6`), never `">"` chaining — so overlaps are explicit and the whole rhythm is readable in eight lines.

### 4.3 Intro preloader — fake progress bound to a real event

```js
const counter = { value: 0 };
const PHASE_STEP = 0.42; // seconds per phase label

// skip on mobile, reduced motion, or if already seen this session
if (prefersReducedMotion() || isMobile || sessionStorage.getItem('we_intro_seen')) return done();
sessionStorage.setItem('we_intro_seen', '1');

// Phase 1: 0 → 92 over (0.42 * PHASES.length)s, stepping the phase label
const tl = gsap.timeline({
  onComplete: () => {
    document.readyState === 'complete'
      ? finish()
      : (tail.play(), window.addEventListener('load', finish, { once: true }), gsap.delayedCall(4.5, finish));
  },
});
tl.to(counter, { value: 92, duration: 0.42 * PHASES.length, ease: 'power2.inOut', onUpdate: render }, 0);
PHASES.forEach((_, i) => tl.call(() => setActivePhase(i), [], 0.42 * i));

// Phase 2 (tail): 92 → 99 over 4.5s, paused, only played if the page isn't loaded yet
const tail = gsap.to(counter, { value: 99, duration: 4.5, ease: 'power1.out', paused: true, onUpdate: render });

// Phase 3: on load (or 4.5s hard cap) — snap to 100, hold 0.5s, fade out
function finish() {
  tail.kill();
  gsap
    .timeline()
    .to(counter, { value: 100, duration: 0.35, ease: 'power2.out', onUpdate: render })
    .to({}, { duration: 0.5 })
    .to(overlay, { autoAlpha: 0, duration: 0.6, ease: 'expo.inOut', onComplete: done });
}
```

The asymptote (92 → 99, never 100 until `load`) plus a 4.5s hard cap is the honest version of a fake preloader. `sessionStorage` means it shows once per session, not once per navigation.

### 4.4 The Method rail — pinned horizontal scroll (the centrepiece)

Two ScrollTriggers on the same element.

**A. Intro card fade, unpinned, runs before the pin:**

```js
gsap.set(introEl, { opacity: 0, scale: 0.95 });
const introTl = gsap.timeline({
  scrollTrigger: { trigger: railEl, start: 'top bottom', end: '+=200%', scrub: 1.5 },
});
introTl
  .to(introEl, { opacity: 1, scale: 1, ease: 'none', duration: 50 }) // arbitrary units:
  .to(introEl, { opacity: 1, scale: 1, duration: 35 }) // 50/35/15 = a 50%/35%/15%
  .to(introEl, { opacity: 0, scale: 1.05, ease: 'none', duration: 15 }); // split of the scrub range
```

Durations `50 / 35 / 15` are proportions of the scrubbed range, not seconds — a neat trick for authoring scrub timelines as percentages.

**B. Pinned horizontal track, `500%` of viewport:**

```js
const BREAKPOINTS = invert ? [0, 0.22, 0.46, 0.7, 0.93] : [0.25, 0.43, 0.59, 0.76, 0.92];

const railTl = gsap.timeline({
  defaults: { ease: 'none' },
  scrollTrigger: {
    trigger: railEl,
    start: 'top top',
    end: '+=500%',
    pin: true,
    scrub: 1.5,
    onUpdate: (self) => {
      /* see below */
    },
  },
});

railTl.fromTo(
  trackEl,
  { x: () => startFactor * window.innerWidth }, // function-based: re-measured on refresh
  { x: () => -2.65 * window.innerWidth, duration: railDuration },
  invert ? 0 : 0.2,
);
```

The `onUpdate` callback does three things at once:

1. **Slide state machine.** A `boolean[]` of "has this slide entered" latches against `BREAKPOINTS`, calling `enter(i)` / `leave(i)` on the crossing only — never every frame.

   ```js
   const enter = ({ chars, tagline, bullets }) => {
     gsap.to(chars, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'expo.out', overwrite: 'auto' });
     gsap.to(tagline, { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: 'expo.out', overwrite: 'auto' });
     gsap.to(bullets, {
       y: 0,
       opacity: 1,
       duration: 0.8,
       stagger: 0.08,
       delay: 0.3,
       ease: 'expo.out',
       overwrite: 'auto',
     });
   };
   const leave = ({ chars, tagline, bullets }) => {
     gsap.to(chars, { y: 24, opacity: 0, duration: 0.3, ease: 'power3.in', overwrite: 'auto' });
     gsap.to(tagline, { y: 12, opacity: 0, duration: 0.3, ease: 'power3.in', overwrite: 'auto' });
     gsap.to(bullets, { y: 12, opacity: 0, duration: 0.3, ease: 'power3.in', overwrite: 'auto' });
   };
   ```

   `overwrite: "auto"` everywhere is what makes fast scrubbing back and forth not tear.

2. **Per-slide `SplitText` by chars**, created once up front, pushed into an array, all reverted in cleanup. Slide 0 is pre-set to its _end_ state so nothing pops on first paint.

3. **Scroll-driven theme inversion.** The section background/foreground/border are CSS custom properties on the `[data-method]` ancestor, rewritten imperatively — light → dark across the back half of the pin:

   ```js
   const toFg = gsap.utils.interpolate('#171717', '#F0F0F8');
   const toBorder = gsap.utils.interpolate('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)');
   const easeIn = gsap.parseEase('power2.in');

   const t = easeIn(clamp01((progress - 0.5) / 0.5)); // only the last 50% of the pin
   const fade = clamp01((progress - 0.95) / 0.05); // last 5%: go transparent
   section.style.setProperty('--method-bg', `rgba(${255 - 249 * t}, ${255 - 247 * t}, ${255 - 239 * t}, ${1 - fade})`);
   section.style.setProperty('--method-fg', toFg(t));
   section.style.setProperty('--method-border', toBorder(t));
   ```

   Note `transition: none` is set inline on that element so the CSS variables snap per frame instead of fighting a transition.

**Cleanup** kills both `scrollTrigger`s, both timelines, and reverts every `SplitText`.

### 4.5 Infinite logo marquee — `modifiers` + IntersectionObserver

```js
const wrap = gsap.utils.unitize(gsap.utils.wrap(-oneQuarterWidth, 0));
tween = gsap.to(track, {
  x: `-=${oneQuarterWidth}`,
  duration: 70,
  ease: 'none',
  repeat: -1,
  modifiers: { x: wrap },
});
new IntersectionObserver(([e]) => (e.isIntersecting ? tween.play() : tween.pause()), { threshold: 0 }).observe(track);
```

- Content is rendered **4×**; the tween travels `scrollWidth / 4` and `modifiers` wraps it — seamless, no restart flash.
- `scrollWidth` is read inside a `requestAnimationFrame` so layout has settled.
- Paused when offscreen. Edges are feathered with a `mask-image` linear-gradient rather than overlay divs (works on any background, including the one that inverts).

### 4.6 Footer outro — batched ScrollTriggers

Four independent triggers, all `start: "top 85%"` except the last:

| Target                                  | Trigger                          | Config                                                                                                          |
| --------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Phrase (`SplitText` words + inline SVG) | phrase el, `top 85%`             | `onEnter` **and** `onEnterBack` → replays both directions                                                       |
| `[data-footer-comm-card]`               | `[data-footer-comms]`, `top 85%` | `once: true`, `y:24→0`, `stagger .12`                                                                           |
| `[data-footer-social-pill]`             | socials, `top 85%`               | `once: true`, `y:14→0`, `stagger .06`, then `tl.call()` to fire each pill's own sub-timeline at `0.15 + 0.06*i` |
| strip row + meta                        | footer root, `top 40%`           | `once: true`, `y:20→0`, `stagger .15`                                                                           |

The phrase animation is the only one that replays; everything else is `once: true`. That's a deliberate choice — the hero-scale moment repeats, the chrome doesn't.

### 4.7 Nav mega-menu — one paused timeline, reversed at 2× speed

```js
tlRef.current = gsap
  .timeline({ paused: true })
  .fromTo(
    panel,
    { autoAlpha: 0, y: -14, scale: 0.94, transformOrigin: 'top center' },
    { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: 'back.out(1.4)', easeReverse: 'power3.out' },
    0,
  )
  .fromTo(
    items,
    { autoAlpha: 0, y: 16 },
    { autoAlpha: 1, y: 0, duration: 0.25, ease: 'back.out(2.2)', easeReverse: 'power2.out', stagger: 0.012 },
    0.06,
  );

// open / close
open ? tl.timeScale(1).play() : tl.timeScale(2).reverse();
```

- Built once in `useGSAP`, driven by an `useEffect` on `open` — no rebuild per toggle.
- `timeScale(2)` on close: closing is twice as fast as opening. Cheap, and it makes the menu feel responsive.
- `easeReverse` gives the reverse a different curve from the forward play.
- Reduced motion collapses it to `gsap.set(panel, { autoAlpha: open ? 1 : 0 })`.

### 4.8 Custom cursor / click ripple (`DotField`)

Full-viewport Canvas2D at `z-[-2]`, 22px dot lattice, 1px dots at `rgba(255,255,255,0.09)`.

```js
// on click (ignored over a, button, [role=button], input, textarea, select, [data-cursor-hover])
ripples.push({ x, y, startTime: performance.now() / 1000 }); // max 6 concurrent
```

Each ripple is an expanding ring, `radius = 380 * age`, life `2.2s`, and displaces + brightens dots within `±80px` of the ring:

```js
const falloff = Math.cos(((dist - ring.currentRadius) / 80) * Math.PI * 0.5);
dot.x += (dx / dist) * falloff * ring.amplitude; // amplitude = 14 * (1 - age/2.2)
dot.alpha += ring.brightness * Math.max(0, falloff); // brightness = 0.28 * (1 - age/2.2)
```

Driven by `gsap.ticker.add(render)` — and **removed from the ticker when the last ripple expires**, so it costs nothing at idle. Uses `devicePixelRatio` with `ctx.setTransform(dpr,0,0,dpr,0,0)`.

### 4.9 Logo mark — `MorphSVGPlugin` idle loop

```js
tl.to(path, {
  morphSVG: { shape: shapeB, type: 'rotational', shapeIndex: 'auto' },
  scale: 1.4,
  svgOrigin: '50 50',
  duration: 1.5,
  ease: 'sine.inOut',
});
tl.to(path, {
  morphSVG: { shape: shapeA, type: 'rotational', shapeIndex: 'auto' },
  scale: 1,
  duration: 1.5,
  ease: 'sine.inOut',
});

// re-arm with jitter so multiple marks on a page never sync up
next = gsap.delayedCall(2.5 + Math.random() * 3, run);
```

Gated by an `IntersectionObserver` — `delayedCall` is killed when the mark scrolls out of view, re-armed with `0.5 + Math.random() * 1.8` on the way back in.

### 4.10 Hero globe (`ParticleWorld`)

`next/dynamic` with `ssr: false` and a `h-[100svh]` placeholder to reserve layout.

Raw three.js (not r3f) — `Scene`, `PerspectiveCamera(40, 1, 0.1, 50)`, `WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" })`, `setClearColor(0, 0)`.

- **Atmosphere**: `SphereGeometry(1.045, 48, 48)` + custom `ShaderMaterial`, `AdditiveBlending`, `depthWrite: false`, `depthTest: false`.
- **Point cloud + great-circle arcs**: `BufferGeometry` with custom attributes `aArcT`, `aOffset`, `aSpeed`, `aScatter`, `aDelay`, `aSize`, `aPhase`, `aAccent`. Arc geometry is slerped on the CPU from lat/lng pairs (~40 cities, Monterrey and Dubai flagged `isHQ`), animation is entirely in the vertex shader off a shared `uTime`.
- **Personalised arc**: the visitor's city is fetched from `ipapi.co`, converted to a unit vector, and a single extra accent-coloured arc is built from Monterrey → visitor. `?loc=<lat>,<lng>,<label>` overrides it for demos/screenshots.
- Uniforms are a single shared object (`uTime`, `uProgress`, `uArcProgress`, `uMotion`, `uRotX/Y`, `uCamZ`, `uScale`, `uPixelRatio`) reused across materials — one place to drive everything.
- `uMotion` is set to `0` and `uProgress`/`uArcProgress` to `1` under reduced motion: the globe renders in its final state and never animates.
- `dpr` capped at `2`; `renderer.setSize(w, h, false)` (no style writes, CSS owns layout); `frustumCulled = false` on the shader objects.

### 4.11 Aurora backdrop

OGL, WebGL2, fullscreen `Triangle` (3 verts, not a quad), 2D simplex noise in the fragment shader, a 3-stop horizontal colour ramp, and a triangular vertical falloff parameterised by `uOriginY` / `uBandHalfWidth` so the same shader does both a top-hanging curtain and a centred band. Defaults `["#5227FF", "#7cff67", "#5227FF"]` are stock ReactBits `Aurora`, so this started as that component and was extended.

### 4.12 Scroll indicator (`SiteScrollIndicator`)

Not GSAP. Raw scroll listener, rAF-coalesced, writing directly to the DOM — no React state per frame:

```js
el.textContent = `${pct.toString().padStart(3, '0')}%`;
bar.style.transform = `translateY(${(pct / 100) * 56}px)`;
```

React state is set **only** when it crosses the ≥99.5% threshold (to swap to accent colour). `mix-blend-difference` keeps it legible over both the light and dark halves of the page. Disabled on `/` until the intro overlay has finished.

## 5. CSS-side animation

GSAP owns anything sequenced or scroll-bound. CSS `@keyframes` own the ambient loops:

`ai-star-twinkle`, `stats-star-twinkle`, `stats-spark-head` (`stroke-dashoffset: 0 → -100px` on a `pathLength=100` rect with `stroke-dasharray: 7.5 92.5` — a spark tracing the stats pill border, mirrored by a second copy), `card-candle-breathe`, `pulse-ring`, `underline-loop`, `review-orbit` / `review-parabola`, `page-cross-in` / `page-cross-out`, `gate-enter` / `gate-row-in`, `svc-card-in` / `svc-rotate-in`, `results-enter`, `step-enter`.

Tailwind's `motion-safe:` / `motion-reduce:` variants are used alongside the JS guard.

## 6. Implementation checklist for adopting this

1. Install `gsap` + `@gsap/react` + `lenis`. Register `ScrollTrigger`, `SplitText` once at module scope, and set `gsap.defaults({ ease: "expo.out", duration: 1.2 })` in the same file.
2. Define the four `--ease-*` custom properties so CSS transitions match GSAP.
3. Mount a render-null `<SmoothScroll />` in the root layout with the Lenis↔GSAP ticker wiring and the route-change reset.
4. Export one `prefersReducedMotion()` helper. Every animated component calls it in its first three lines and picks one of: bail / jump-to-end / render a static variant.
5. Write animations against `data-*` selectors, not classes or cross-component refs. Keep markup in server components.
6. Wrap every effect in `useGSAP({ scope })` and return a cleanup that kills timelines, kills their `scrollTrigger`s, and reverts every `SplitText`.
7. `overwrite: "auto"` on anything a scrub can re-fire. `clearProps` anything expensive (`filter`, `will-change`) on complete.
8. Use `once: true` for chrome, `onEnter` + `onEnterBack` only for the moments worth repeating.
9. Refresh ScrollTrigger on `load`, on `document.fonts.ready`, and once on a 1200ms timeout.
10. Lazy-load WebGL with `next/dynamic({ ssr: false })` and a placeholder that reserves the exact height.

## 7. Risks / things not to copy blindly

- **`pin: true` + `end: "+=500%"`** costs five viewport heights of scroll for one section. It works there because the content genuinely has five slides; it reads as padding if it doesn't.
- **Function-based `x` values** (`x: () => -2.65 * window.innerWidth`) are correct — they re-evaluate on `ScrollTrigger.refresh()`. A literal value would break on resize.
- **`content: document.body` in the Lenis config** (rather than a wrapper element) means `position: fixed` elements behave normally, but any nested scroll area needs `data-lenis-prevent`.
- **The `ipapi.co` call** in the hero is a third-party runtime dependency on a render path and is CSP-allowlisted. It fails soft (no personalised arc) but it is a request before first meaningful paint of the globe.
- **three.js is ~731 KB** in one lazy chunk. Justified for the hero; make sure it never lands in the initial bundle.
- **`transition: none`** inline on the Method section is load-bearing — without it the per-frame CSS-variable writes fight a transition and the colour lags the scroll.
