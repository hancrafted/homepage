---
type: steering
title: Software Architecture Vision
description: 'Tenets for the Next.js application that renders Decks — hosting, state, animation, testing and the data-* contract. Open it before adding a dependency, a route, a client component, an animation, or anything stored in the browser.'
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-18T00:00:00Z
stale_after: 2026-09-30T00:00:00Z
---

# Software Architecture Vision

How the Next.js application is built. `CONTEXT.md` owns the words, `product.md` owns whether a
thing belongs at all, `docs/architecture/pipeline.md` owns how an Episode becomes a Deck. Every
Deck is agent-written and reviewed side by side, so every tenet binds a generator, not an author.

## Deriving a decision from this

1. Find the tenet that names your case. Follow it.
2. None names it? The repository is the retrieval base: copy the nearest precedent in `src/` and
   say which one you copied.
3. Tenet and precedent disagree? The tenet wins, and the precedent is fixed in the same pass.
4. Neither reaches? Stop and ask. Never invent a convention silently.

## Before adding a tenet

Two questions. Could a reviewer who reads TypeScript, but does not review React idiom, **spot**
the violation? And does it bind the generator rather than a human author? A tenet failing either
is decoration, and decoration makes this document look more binding than it is.

Tenets marked **(framework)** fall if Next.js was the wrong call. They are still tenets; the mark
says what would need re-deriving rather than re-arguing.

## Tenets

### 1. Static export (framework)

`output: "export"`, hosted on GitHub Pages. A constraint, not a posture: server rendering is not
ruled out on merit, it is unpaid for. Cookies, redirects, rewrites, headers and proxy are
unsupported here, so anything reaching for them is asking to reopen this.

**Reopens when** the decision to pay for a host is taken. The trigger is the spending, not a date.

### 2. Chrome is shared, visualisations are not

Deck **chrome** — controls, theme, notes, contents, active-Slide tracking — lives in
`src/decks/shared/` from the first Deck. A visualisation stays in its own Deck and is never
extracted. Sharing is decided by kind, never by counting occurrences.

**Reasoning.** Across the two Decks that exist, 18 of 31 functions were byte-identical copies and
every one of them was chrome; no visualisation repeated. A count is a slow proxy for a distinction
you can draw directly, and a reviewer can see a theme picker sitting inside a Deck folder.

### 3. Tested properties

Performance, SEO and accessibility budgets run in `verify` from the first Deck.

**Reasoning.** There is little logic to unit-test, and the visual is what an agent damages
silently. Budgets need no baseline, so they are affordable before a Deck exists. Accessibility is
load-bearing rather than decorative: audio-first Episodes imply a Deck that gets read.

### 4. The URL carries Deck state

A Slide's id lives in the URL, written with `replace`. Presenter view is a query parameter.

**Reasoning.** A Slide must be linkable and reloadable, but the Deck is the shareable unit and its
Slides are not history — under `push`, every arrow key becomes a history entry and Back walks
backwards through the Deck instead of leaving it. Presenter view in the URL makes a two-screen
delivery two links rather than a repeated click.

### 5. One preferences object, one key

`{ theme, motion, locale }` in `localStorage` under a single key, with `theme` and `motion` read
by a blocking inline script before first paint.

**Reasoning.** The blocking script is what prevents a flash of the wrong theme; the store is
incidental to it. A cookie buys nothing: `cookies()` is unsupported under static export and
`document.cookie` is read at the same moment `localStorage` is. `locale` is a remembered choice,
never the source of truth for the page being viewed.

### 6. Locale is a path segment, English unprefixed (framework)

`localePrefix: 'as-needed'`, so every German route carries `/de`. The bare `/` redirects to `/de`
only for a visitor who previously chose German, via `replace`, and never from a deep link.

**Reasoning.** Locale is the one preference that is genuinely shareable, and search engines index
locales as separate URLs, which _Tested properties_ needs. Guessing from `navigator.language`
bounces a German speaker out of an English Deck someone sent them, and misleads crawlers.

**Cost.** The default locale can never be prefixed later without breaking every published link.
English is structurally permanent. A third locale stays cheap; changing the default does not.

### 7. Every `"use client"` states its reason (framework)

A client component is the exception, and each one carries a one-line comment naming the
interactivity or browser state requiring it. A `"use client"` without that line is a violation.

**Reasoning is bundle weight, not render timing.** A client component still pre-renders to HTML at
build; it also ships its JavaScript. "Pushed as far down the tree as possible" was the original
wording and fails the spot test, because judging _possible_ needs the React idiom this document
assumes absent. The comment is the half that can be checked.

### 8. GSAP owns the timeline

GSAP and `@gsap/react`'s `useGSAP` own anything sequenced or scroll-bound. CSS `@keyframes` own
ambient loops. A second animation dependency needs its own argument.

**Reasoning.** An unnamed authority is not an authority: an agent reaching for Framer Motion on one
Deck and CSS on the next destroys the property this tenet exists to hold.

Set one easing contract once — `gsap.defaults({ ease: "expo.out", duration: 1.2 })` with matching
`--ease-*` custom properties, so CSS and GSAP agree. Entrances run long and exits run short,
roughly 1.2s against 0.3s at `power3.in`; that asymmetry is most of the character. Use
`stagger: { amount }` so a four-word and a fourteen-word headline take the same total time.

### 9. `data-*` is the only contract between markup and behaviour

Script and animation select on `data-*`. Classes style, ids anchor, and neither is ever a selector
for code. A server component renders the markup and its attributes; a thin client sibling selects
on them.

**Reasoning.** This is the mechanism letting the client-component and animation tenets coexist, and
it is the most checkable line here — the hook is visible in the markup, while a class name is free
to be rewritten by a bundler.

### 10. Reduced motion is a branch

One `prefersReducedMotion()` helper, called in the first lines of every animated component, then
choosing one of three named strategies: bail early, jump to the end state, or render a different
component.

**Reasoning.** Naming the three is what stops "supports reduced motion" meaning "disabled the good
part".

### 11. Two dimensions, and the browser's own scroll

Visuals are two-dimensional; the page scrolls natively. Smooth scrolling is programmatic only —
anchors and controls — and drops to `auto` under reduced motion. No WebGL, no shader work, and
nothing handling `wheel` or `touchmove` to move the page, which rules out Lenis by mechanism.

**Reasoning.** On the reference site, WebGL bought two decorative set pieces for roughly 731 KB plus a
third-party call on a render path. Hijacked scroll breaks the scroll that
assistive technology, find-in-page and keyboard paging all drive, and the people harmed
largely do not set `prefers-reduced-motion`, so gating it there misses them.

**Reopens when** an Episode's visualisation genuinely needs three dimensions and no
two-dimensional treatment carries the argument.

### 12. Content is typed data

A Deck's structure — Slide order, which visualisation each Slide carries — is one exported, fully
typed module beside the page. No user-visible string is written inside a component.

**Reasoning.** It costs nothing, it keeps a specification grill reading data rather than JSX, and
localisation forces it anyway once German exists. **Consequence:** adding German to a Deck is a
translation task, not an editing task.

### 13. Navigation imports from `@/i18n/navigation` (framework)

`Link`, `useRouter`, `redirect` and `usePathname` come from the locale-aware module, enforced by
`no-restricted-imports`.

**Reasoning.** next-intl's wrappers carry the current locale, so a logo linking to `/` emits `/de`
for a German visitor. Importing from `next/link` drops it and nothing breaks: the page quietly
serves English, and that import is the one every example shows.

## Open

- **The two Decks in `hancrafted/coaching-content`.** Reference, not precedent: no tenet here is
  retrofitted to them. Their `FE-001-design.md` bans third-party UI libraries, which _GSAP owns the
  timeline_ reverses. **Reopens when** the application, its `CONTEXT.md` and its harness are
  standing.
- **Visual regression**, per Slide, on build. **Reopens when** shared chrome stops changing every
  run and a baseline would survive the week.
- **SEO under a split domain.** Landing page and Decks on separate domains fragments it. The
  metadata, structured data and semantic markup are free now and survive the move.

## Premises this rests on

1. **These tenets are transferred judgement, not measurement.** Ten years of TypeScript and Angular
   mapped onto a framework never used here. Next.js was chosen for career leverage — React being in
   most of the roles looked at — and against the evidence, which pointed at Vite with no framework
   at all. Astro and Starlight are deliberately not chosen here; they go to markdown-harness
   documentation instead.
2. **The evidence that exists is mostly negative.** Tested against the two Decks in
   `coaching-content`: of twelve inherited tenets, four survived, one half-survived, six were
   contradicted, one had nothing to say. Each contradicted one was rewritten, not restated.
3. **Cost dominates hosting.** _Static export_ falls if that stops being true.
