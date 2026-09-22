---
type: agent-guide
---

# Grilling Format

How a grilling round is written in this repo. It covers every round: `/grill-me`, `/grill-with-docs`, and the grilling Wayfinder runs while charting a map or resolving a `wayfinder:grilling` ticket.

This **overrides** the grilling skill's "ask the whole frontier in one round". The frontier still decides which questions are askable; the cap below decides how many of them ship this round.

## The opening

A session usually starts on a ticket id, and the user is not carrying what that ticket was about. Write an orientation before Q1 — once when a `/grill-me` or `/grill-with-docs` session starts, and again each time the Wayfinder picks up a new `wayfinder:grilling` ticket mid-map.

Three lines, no more:

1. **The purpose** — what the ticket exists to settle, named by title.
2. **The end result** — what the user is holding when the session closes: a design-ADR on disk, a rewritten doc, a set of filed issues.

The orientation is not a question and takes no answer. Write it, then ask Q1.

## Round size

- **Five questions at most** in a normal round.
- **Three at most** when the round turns on an architectural decision — one that fixes structure the later work has to sit on: a data shape, a boundary, a file layout, a dependency.

When the frontier is wider than the cap, ask the questions the rest of the frontier hangs on and leave the others for the next round.

## Question shape

Keep the grilling skill's markers (`❓ **Qn**`, `➡️`) and fill each question out in this order:

1. **A full wh-question** as the headline, ending in a question mark and naming its own subject, so it reads on its own with nothing above it. "Which Package should own the violation renderer?" — not "Where the violation renderer lives". A noun phrase makes the user reconstruct the question before they can start answering it.
2. **Options** as a numbered list, one literal line each in one simple and concise sentence, with at max one `because` reaons.
3. **A recommendation** under the options, naming the option it picks and why it wins.
4. **An example per option**, showing what the decision looks like once taken — the file it writes, the config it changes, the directory layout it produces. Show the effect; don't describe it.

Every example gets the same shape, the same depth, and and inline comments describing why, e.g. a design pattern or reason in few words. Write each one as though you were about to recommend it — a thin example under the option you are arguing against makes the recommendation before the reasoning does.

## Language

Write the question in plain words and keep the technical terms exact. A term is exact when `CONTEXT.md` or the surrounding docs already establish it — reach for that one rather than a synonym.

Coin nothing silently. Where a concept genuinely has no name yet, say so in the question ("no name for this yet, calling it a _lesson bundle_ here"), so a fresh word is never mistaken for established vocabulary.

## Refer by name

No bare id ever reaches the user. Every id-like handle travels with its name or slug:

- `GEN-001-adr`, never `GEN-001`.
- An architectural tenet by its name, never `tenet 4`.
- Maps and tickets by their title, which is the Wayfinder skill's own rule.

The id alone is unreadable; the name carries the meaning while the id keeps the trail.

## A round in this format

Opening `wayfinder:grilling — where rendering lives`. This ticket settles which Package owns the code that turns violations into text, and where that choice is written down. You leave with one decision record on disk.

---

**Q1. Where should the common payment interface definition live in our project directory?**

1. In `src/core/` because high-level business rules should never depend on external vendor libraries.
2. In `src/integrations/stripe/` because keeping the contract right next to the current implementation makes it easy to find.
3. In a standalone workspace package `packages/payment-contracts` because multiple applications might need to share the same types.

➡️ **Recommendation: Option 1 (`src/core/`)**  
It enforces clean architecture boundaries: high-level business rules never import low-level third-party tools, keeping code simple without the maintenance burden of a multi-package repo.

#### Concrete Examples

**Option 1: Inside `src/core/`**

```text
src/
├── core/
│   └── payments.ts         # Dependency Inversion: business domain owns the contract with zero 3rd-party imports
└── integrations/
    └── stripeAdapter.ts    # Adapter Pattern: implements the core contract while importing vendor SDKs
```

**Option 2: Inside `src/integrations/stripe/`**

```text
src/
├── integrations/
│   └── stripe/
│       ├── interface.ts    # Colocation Pattern: packages the contract directly alongside the primary vendor driver
│       └── adapter.ts      # Implementation: couples directly with local interface and vendor SDK
```

**Option 3: In `packages/payment-contracts`**

```text
packages/
├── payment-contracts/
│   └── interface.ts        # Shared Kernel Pattern: isolates interface for reuse across independent microservices
└── backend-api/
    └── adapter.ts          # External Consumer: imports versioned contract from local workspace package
```
