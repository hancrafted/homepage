---
type: vision
stale_after: 2026-10-31T00:00:00Z
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-16T00:00:00Z
---

# Information Architecture Vision

The North Star for where knowledge lives, what shape it takes, and how it is reached. A steering document, not a spec, and not a decision record. Every decision below carries the reasoning that produced it, because a decision without its why gets silently reversed by the next agent that reads it.

Three things this deliberately does not hold. **Operational detail** — stages, dispatcher, retry policy, the frontmatter state schema — belongs in `docs/architecture/pipeline.md`, which churns and is ungoverned on purpose. **Vocabulary** belongs in `CONTEXT.md`; Episode, Manuscript, Deck and Workshop are used here exactly as defined there. **Software architecture** — execution model, state substrate, rendering stack — is unwritten on purpose: it waits until the first Episode lands and has to become a Deck, because that is the first run that produces evidence for it.

## Deriving a decision

Run these three tests before proposing anything this document governs.

1. **Does it survive the split?** Every layer is a seam that may become its own repository. If the proposal breaks when its layer is lifted out, it belongs inside one layer.
2. **Can frontmatter carry it?** State, trust and lifecycle are answerable from frontmatter alone. A proposal that needs a second place to look — a label, a database, a filename convention — owes an argument for why frontmatter cannot hold it.
3. **Is there a run behind it?** Name the friction that produced the proposal. A proposal from imagined requirements waits for evidence.

## 1. Layers are seams, not repositories

| Layer          | Lives in                                    | Holds                                                                  |
| -------------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| **Steering**   | `docs/steering/`                            | How I think — voice, mental models, metaphors, visual pattern _intent_ |
| **Knowledge**  | `docs/llm-wiki/`                            | What I know — sources, references, papers                              |
| **Output**     | `docs/episodes/`                            | Aggregated knowledge around one thesis, to be rendered and published   |
| **Governance** | `markdown-harness.config.yaml` and the gate | Keeps both trustworthy over time                                       |

One repository. Each layer is also one OKF bundle, so the bundle boundary and the layer boundary are the same line. The content pipeline is the **first consumer** of this stack, not the stack itself.

**Reasoning.** These were built in sequence and felt disjoint. They are not: the harness exists _because_ the wiki drifted without human review. Naming the layers makes the set coherent. Keeping them in one repository — rather than three, as first drafted — costs nothing today, since cross-directory reference checking does not exist and a dispatcher holding three working trees buys overhead against the Leverage promise in `docs/visions/product.md`. Putting each bundle root on a layer boundary is what keeps the split cheap: lifting `docs/steering/` into its own repository becomes a `git subtree split` and no concept ID moves. A single bundle root over `docs/` would re-root every identifier underneath it.

**Consequence.** The sellable product, if there is one, is the substrate — steering plus knowledge plus governance. Content is proof that it works.

## 2. Frontmatter follows OKF v0.2

Google's Open Knowledge Format (`GoogleCloudPlatform/open-knowledge-format`, see its `SPEC.md`) is the baseline for every concept document in every bundle. The spec is the source of truth for field shapes and this document does not restate it; `markdown-harness.config.yaml` enforces the required subset.

Three of its properties are load-bearing here:

- **A concept ID is its path within its bundle, minus `.md`.** Renaming a file renames an identifier.
- **Trust is per document.** `generated` records who wrote it; `verified` records who confirmed it. They are separate because those are different questions.
- **Extension is sanctioned.** `type` is the only always-required key and a consumer may not reject a document over unknown keys, so pipeline state fields are conformant by construction.

Actors follow the spec's convention: `anthropic/claude-opus-5` for agents, `human:<handle>` for people, `process:<id>` for the dispatcher and the gate. The harness enforces a narrower slice than the spec permits — a generator is an agent or a `process:`, never a person, and a verifier is always a person. For a vision or the glossary the verdict is a human's to give, and narrowing is how that stays true without depending on anyone remembering it.

**Reasoning.** The harness config had independently converged on OKF's field names — `generated`, `verified`, `stale_after`, `type` — before the spec was found. Adopting it closed a gap rather than converting anything. An external spec also keeps the bundles consumable by tooling nobody here writes, which is the reason the knowledge layer is worth keeping portable at all.

## 3. The Episode is the primitive

The Episode is the unit the whole system operates on. `CONTEXT.md` defines it. What this document adds: it carries retrieval metadata from the moment it is authored — prerequisites, audience level, duration, what it pairs with — and the boundary between theory and hands-on is decided **when the Episode is authored**, not found later during editing.

Each Episode is one directory:

```
docs/episodes/investor-pitching/
├── episode.md      # type: Episode     — the authored argument, and the pipeline state
└── manuscript.md   # type: Manuscript  — the spoken text, and the Deck's stamp
```

No identifier prefix and no per-Episode `index.md`. A Deck has no document of its own: it is an implementation, and its specification lives in a GitHub issue.

**Reasoning.** Retrieval metadata serves two consumers rather than one (see _Two renderers over one source_), so it is not optional decoration — and two Episodes is the cheapest possible moment to discover the schema is wrong. The theory/hands-on boundary is a property of the content, decided once; found later, every recording needs bespoke editing to locate its cut point. Format decides whether that boundary is required: Foundations and Teardown carry one, a Short does not, the same exemption `docs/visions/product.md` already grants Short at the Publish bar. Identifier prefixes were dropped because they duplicate `type` and `title` while buying no stability — the slug sits in the path either way — and because the spec's own reference bundles use plain slugs. `__` is reserved for genuinely composite names.

## 4. Two renderers over one source

```
                                     ┌──► Workshop — a live session composed from one or more Decks
Episode ──► Manuscript ──► Deck ─────┤
                                     └──► Channel  — one recording, published
```

One verified core, two ways out. Composition for a Workshop is a retrieval-and-compose problem over Decks that already exist, not an authoring problem.

**Reasoning.** This is what turns content production into a reusable asset base: demand for a workshop stops being a request to write one. Composition happens at Deck level rather than Episode level because a Deck is what a room actually sits through.

## 5. One document per stage, one stamp per document

Each stage writes its own durable document before the next stage starts. The Manuscript is a document, not a section of the Episode.

**Reasoning.** `verified` attaches to a document and one document holds one list, so folding the Manuscript into the Episode would make the Episode's approval and the Manuscript's approval indistinguishable — the two-gate design, gone at the frontmatter level. Folding also puts a later stage's machine output inside a document a human already approved, so a rejected re-run rewrites approved content. And parallel writers must never touch one file: the fan-out to Medium, podcast and LinkedIn produces artefacts of exactly the Manuscript's shape, so folding would either break that rule at the first fan-out or put three agents in one file.

## 6. Markdown is canonical; rendering runs one way

The markdown file is the single source. The site embeds the Manuscript at build time. Nothing flows back.

**Reasoning.** If the page were canonical, the Manuscript would be retrievable only by parsing the page — and both the steering layer and Workshop composition need the text itself.

## 7. Visual patterns split across layers, joined by name

Intent lives in the steering layer: which argument shapes want visualisation, and why. Implementation lives in `src/`. The two halves are joined by a **name**. Intent is canonical; implementations may differ — the same pattern rendered differently on two pages is variation, not drift.

**Reasoning.** A visual pattern is not a React component; the component is one rendering of it. Checking that every pattern name in the steering layer resolves to something in `src/` is a harness requirement this document notes and does not design — one-directional, producing signal only.

## 8. Retrieval stays dumb until a run says otherwise

Agents read the bundles directly. There is no MCP server and no retrieval layer.

**Reasoning.** Two Episodes cannot tell you what a retrieval layer needs. Building one now means designing against imagined requirements — the same failure mode as designing the architecture before the first end-to-end run.

## Open questions

- The frontmatter state schema itself — field names, stage vocabulary, priority representation. Nothing specified.
- Stage sequence past the Episode. Fan-out targets are named but not enumerated, and the artefacts they produce have no glossary entry; they are not Manuscripts, which are spoken text.
- Retry policy, and when a failing stage escalates to a human.
- The shape of an eventual retrieval layer. Deferred until a run produces evidence.
- Cross-directory reference checking in the harness — a noted requirement, not a design.
- The page stack — Next.js static export to GitHub Pages, later a private host — is assumed, not decided, and nothing is installed. It belongs to the deferred software architecture vision.
- Whether a Deck adjusted by hand after generation needs a stamp of its own. Today the Manuscript's stamp covers it and the drift is undetected.

## The premise this rests on

**The architecture is written from evidence, not ahead of it.** The first end-to-end run is the requirements-gathering exercise, and it ships something while it runs. Every point of friction during a run becomes a line in this document.

The premise is itself a reaction to a real cost: the harness needed a redesign because it was built fast without an architecture. The counter-risk is designing against imagined requirements instead. The chosen balance is one real run first, then design.
