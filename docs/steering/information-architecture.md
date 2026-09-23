---
type: steering
title: Information Architecture Vision
description: 'Where knowledge lives, the shape it takes, and why the Episode is the primitive. Use it before adding a directory, moving a markdown file, or changing what frontmatter carries.'
generated:
  at: 2026-09-23T20:58:39Z
  by: anthropic/claude-opus-5
stale_after: 2026-10-23T00:00:00Z
---

# Information Architecture Vision

The North Star for where knowledge lives, the shape it takes, and how it is reached. A steering
document, not a spec, not a decision record.

Three things it deliberately does not hold:

1. **Operational detail** — stages, dispatcher, retry policy, frontmatter state schema. Belongs
   in `docs/architecture/pipeline.md`, and churns ungoverned on purpose.
2. **Vocabulary** — `CONTEXT.md` owns it. Episode, Spine, Beat, Subject domain, Manuscript,
   Deck, Workshop, Layer, Bundle, Raw, Finding and Concept are used here exactly as defined
   there.
3. **Software architecture** — execution model, state substrate, rendering stack. Held by
   `docs/steering/software-architecture.md`, provisional until the first Deck exists.

## Deriving a decision from this

Run all three tests before proposing anything.

1. **Does it survive the split?** Every layer seam may become its own repository. If the
   proposal breaks when a layer is lifted out, it belongs inside one layer.
2. **Can frontmatter carry it?** State and trust are answerable from frontmatter alone; identity
   is the path (§2). A proposal needing a third place to look — a label, a database, a filename
   convention beyond the concept ID — owes an argument for why frontmatter cannot hold it.
3. **Is there a real run behind it?** Name the friction that produced the proposal. One from
   imagined requirements waits for evidence.

**This document does not yet pass its own third test.** No Episode exists, so no run has
happened. §2 and §7 are the exceptions: OKF was adopted against a harness that already existed,
and choosing not to build a retrieval layer costs nothing to hold. §1, §3–§6 and §8 are design
ahead of evidence — the smallest shape that lets the first run start, and the first thing that run
is allowed to break.

## 1. Layers are seams, not repositories

| Layer          | Lives in                                          | Holds                                                                              |
| -------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Steering**   | `docs/steering/`                                  | How I decide — this document, the promises, voice, models, visual pattern _intent_ |
| **Knowledge**  | `docs/llm-wiki/`                                  | What I know — Raw as it landed, Findings over it, Concepts drawn from both         |
| **Output**     | `docs/episodes/`                                  | Knowledge around one thesis, rendered and published                                |
| **Governance** | `markdown-harness.config.yaml`, `.archgate/adrs/` | The rules the other three are checked against                                      |

One repository. The three content layers are each one OKF bundle, so the bundle boundary and
the layer boundary are the same line; Governance is not a bundle — it is what checks them. The
content pipeline is the **first consumer** of this stack, not the stack itself.

Not layers: `CONTEXT.md`, `docs/agents/` and `docs/design-adr/` are scaffolding. They govern how
the repository is worked rather than what it knows, and they stay behind when a layer is lifted
out. This document and `product.md` are not scaffolding — they are the Steering layer's own
content, and they travel with it. `src/` is the site's implementation, and the architecture
over it is deferred.

**Reasoning.** Three repositories and a dispatcher holding three working trees would buy
overhead against the Leverage promise in `product.md`. Putting each bundle root on
a layer boundary keeps the split cheap anyway: lifting `docs/steering/` out becomes a
`git subtree split` with no concept ID moving.

**Consequence.** If there is a sellable product it is the substrate — steering plus knowledge
plus governance — and content is the proof it works. Whether there is one is an open question in
`product.md`.

## 2. Frontmatter follows OKF v0.2

Frontmatter follows Google's
[Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/open-knowledge-format), with
`markdown-harness.config.yaml` enforcing the required subset. Three of its properties are
load-bearing here:

- **A concept ID is its path within its bundle, minus `.md`.** Renaming a file renames the
  identifier.
- **Trust is per document.** `generated` records what wrote it; `verified` records who confirmed
  it — separate, because they answer different questions.
- **Actors follow the spec's convention**: `anthropic/claude-opus-5` for agents, `human:<handle>`
  for people, `process:<id>` for the dispatcher and the gate. Only the agent form carries no
  scheme prefix; the harness encodes that same asymmetry, citing OKF §7. The harness enforces a
  narrower slice than the spec permits: a generator is an agent or a `process:`, never a person;
  a verifier is always a person.

**Reasoning.** The harness had independently converged on OKF's field names before the spec was
found, so adopting it closed a gap rather than converting anything. It also keeps the bundles
consumable by tooling nobody here writes.

## 3. The Episode is the primitive

The Episode is the unit the whole system operates on. `CONTEXT.md` defines it. Each is one
directory:

```
docs/episodes/<unique-slug-in-kebab-case>/   # e.g. docs/episodes/investor-pitching/
├── episode.md      # type: Episode — the authored argument
└── manuscript.md   # type: Manuscript — the spoken text, and the Deck's source
```

No per-Episode `index.md`. A Deck has no document of its own: it is an implementation, and its
spec lives in a GitHub issue.

Two properties of the content are decided once, when the Episode is authored, and recorded in
`episode.md` frontmatter beside the Spine. Both Formats carry both.

**Where it turns from theory to hands-on.** One position among the beats, named in frontmatter.

**Which Subject domains it covers.** The set is frontmatter. Which passage belongs to which
Subject domain is a position, which frontmatter cannot express, so the body's `###` headings carry
that half. The two are not in tension: the boundary is a single position at beat granularity, so
one field can name the Beat it falls after, while Subject domain bindings are many positions at
passage granularity, and frontmatter has no way to address a passage.

A `###` binds one Subject domain. Its region runs from that heading to the next `###`, the next
beat (`##`), or the end of the document. `####` and below are free structure — enumerations of
whatever encloses them — and carry no Subject domain semantics. One Subject domain per `###`,
never nested: a second sales example found later lands inside the sales region rather than opening
a second one, which is what keeps an Episode a document that gets edited rather than only appended
to.

What a checker can settle here splits cleanly, and the halves have different fates:

- **Structural, and checkable.** Every `###` names a Subject domain present in `subject_domains:`,
  every entry in `subject_domains:` appears as a `###`, and every `###` sits under a `##`. A set
  comparison, no judgement. Unimplemented — the harness reads the frontmatter keys but not the
  body, and this is one ticket.
- **Semantic, and never checkable.** Whether the passage under a `###` belongs to the Subject
  domain it claims. A human call, permanently.

**Reasoning.** A turn found later, during editing, means a recording needs bespoke work to
locate its cut point. Headings rather than paired markers, because a pair bounds a region only
while both halves survive — a formatter or a careless edit drops one and the region silently
stops being one, whereas a heading's boundary is the next heading and is already there. Fixing
the binding at `###` costs no structural headroom: three levels is where information architecture
stops earning its keep, and `####` downward is reliably an enumeration of the level above.
Heading-bounded regions also hand `markdown-harness` a unit for free — it hashes a section against
a reference to signal when either side has changed, and a region is what it hashes.

## 4. Two renderers over one source

```
                                  ┌──► Workshop — a live session composed from Decks
Episode ──► Manuscript ──► Deck ──┤
                                  └──► Recording — one take, published to the channel
```

Blog posts, podcast instalments and social posts fan out from the Episode, linking back to the
published work.

**Reasoning.** One verified core, two ways out. Composing a Workshop is a retrieval-and-compose
problem over Decks that already exist, not an authoring problem — demand for a workshop stops
being a request to write one. Composition happens at Deck level, because the Deck is the room
people actually sit through.

## 5. One document per authored artefact, one `verified` per document

Each distinct authored representation is its own durable document. The Manuscript is a document,
not a section of `episode.md`. The Deck is the exception: it is not authored as a document at
all (§3), and whether it needs a `verified` of its own is deferred.

**Reasoning.** `verified` attaches to a document, so folding the Manuscript into the Episode
would make the Episode's approval and the Manuscript's indistinguishable — a two-gate design,
gone at frontmatter level. Parallel writers must also never touch one file: fan-out to Medium, a
podcast and LinkedIn breaks that rule first.

## 6. The Episode is canonical; derivation flows one way

`episode.md` is the single source of truth, and the site embeds the Manuscript at build time.
Nothing flows back: feedback and revisions update `episode.md` directly.

**Reasoning.** If the rendered page were canonical, the Manuscript would be retrievable only by
parsing that page — and both the steering layer and Workshop composition need the text itself.

**Two hand-edits already break this.** The Manuscript is hand-tailored for delivery after it is
generated, and a Deck may be hand-adjusted. Regenerating either destroys that work and nothing
detects it. The regeneration policy is deferred.

## 7. Direct bundle navigation over retrieval layers

Agents read bundles directly. There is no MCP server and no retrieval layer.

**One index is admitted.** `docs/llm-wiki/index.md` is generated from the frontmatter the gate
already validates, and is never hand-edited. That is what separates it from the secondary index
this section used to rule out: a hand-kept index is a second copy of the truth and drifts from it,
while a generated one cannot say anything the documents it indexes do not already say. An index
that has to be hand-edited to stay correct is the excluded kind, whatever it is called.

**Reasoning.** Explicit hierarchies and OKF metadata make the knowledge self-indexing, and a
corpus this small cannot tell you what a retrieval layer would need. Building one now means
designing against imagined requirements.

## 8. The Knowledge layer has three tiers

`docs/llm-wiki/` is cut by one question — is rewriting the document legal?

| Directory   | `type:`   | Rewrite                          | `verified`                           | `stale_after` |
| ----------- | --------- | -------------------------------- | ------------------------------------ | ------------- |
| `raw/`      | `Raw`     | Never. Written once, at landing. | Optional; its presence means curated | None          |
| `findings/` | `Finding` | Never. Appended to only.         | Optional; its presence raises trust  | None          |
| `concepts/` | `Concept` | Yes, on every revision.          | Required                             | Required      |

Directory names are the type names, lowercased. All three are flat: the harness's `folders:`
selectors are not recursive, so a nested directory would be ungoverned and nothing would report it
missing. `docs/agents/finding-format.md` holds the Finding's own shape.

**Citation runs one way.** An Episode cites Concepts, Findings and Raw; a Concept cites Findings
and Raw; a Finding cites Raw; Raw cites nothing. No document records what points at it, so a
citation can be added without editing the thing being cited — which is the only way `raw/` and
`findings/` can be unrewritable at all.

**Every `sources:` entry is a repository path.** A source that cannot be landed under `raw/` is not
cited. A URL names a page that can change after the citation is written; a landed path names bytes
in this repository.

**Knowledge, never decisions.** The llm-wiki holds what is true and nothing about what to do about
it. Decisions about code are ArchGate ADRs in `.archgate/adrs/`, design decisions are design-ADRs in
`docs/design-adr/`, and how to choose is the Steering layer. A Finding or a Concept that ends in
"so we should…" has been written in the wrong place.

**Reasoning.** The three tiers exist so that `verified` means something different in each. A Raw
that may be rewritten cannot be cited by locator, because the line a Finding pointed at may no
longer be there; a Finding that may be rewritten loses the record of what was believed when an
Episode shipped. Only the Concept is allowed to change its mind, which is why it is the only tier
that has to carry a human `verified` and an expiry.

## Deferred and open

Deferred — decided to decide later, each with the trigger that reopens it:

- Visual patterns. Intent lives in the steering layer, implementation in `src/`, joined by a
  name; intent is canonical, so one pattern rendered differently on two pages is variation, not
  drift. Reopens when the first Deck exists.
- The frontmatter state schema — field names, stage vocabulary, priority representation.
  Reopens with the first pipeline run.
- Stage sequence past the Episode, retry policy, when a failing stage escalates to a human.
  Reopens with the first pipeline run.
- Regeneration policy, and whether a hand-adjusted Deck needs a `verified` of its own (§6).
  Reopens
  with the first hand-edit that gets overwritten.
- Cross-directory reference checking in the harness — a noted requirement, not a design.

Open — not known yet:

- Where blog posts, podcast instalments and social posts live, and what frontmatter they carry.
- How an Episode cites a pattern in `docs/steering/`. Section 8 settles the `docs/llm-wiki/` half;
  the Steering half is untouched, because nothing has needed to cite a pattern yet.

## Premise this rests on

**The architecture is written from evidence, not ahead of it.** The first end-to-end run is the
requirements-gathering exercise, and it ships something while it runs. Every point of friction in
that run becomes a line in this document.

The premise is itself a reaction to a real cost: the harness needed a redesign because it was
built fast without an architecture. The counter-risk is designing against imagined requirements —
which the note under the third test admits this document is currently doing. The chosen balance
is one real run first, then design; everything written ahead of it is provisional by
construction.
