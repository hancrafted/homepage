---
type: vision
title: Information Architecture Vision
description: 'Defines how knowledge is structured, where each layer lives, and why the Episode is the primitive. Read, if generating or moving new markdown files, adding directories or need decision guidance about information architecture.'
generated:
  by: google/gemini-3.8-flash
  at: 2026-09-17T10:53:27Z
stale_after: 2026-09-30T00:00:00Z
---

# Information Architecture Vision

The North Star for where knowledge lives, what shape it takes, how it is reached and structured. A steering document, not a spec, and not a decision record. Every decision below carries the reasoning that produced it, because a decision without its why gets silently reversed by the next agent that reads it.

Three things this deliberately does not hold.

1. **Operational detail** — stages, dispatcher, retry policy, the frontmatter state schema.
2. **Vocabulary** belongs in `CONTEXT.md`; Episode, Manuscript and Deck are used here exactly as defined there.
3. **Software architecture** — execution model, state substrate, rendering stack — is unwritten on purpose: it waits until the first Episode lands and has to become a Deck, because that is the first run that produces evidence for it.

## Deriving a decision

Run these three tests before proposing anything this document governs.

1. **Does it survive the split?** Every layer is a seam that may become its own repository. If the proposal breaks when its layer is lifted out, it belongs inside one layer.
2. **Can frontmatter carry it?** Metadata, trust and lifecycle are answerable from frontmatter alone. A proposal that needs a second place to look — a label, a database, a filename convention — owes an argument for why frontmatter cannot hold it.
3. **Is there real friction behind it?** Name the friction in authoring, organizing, or retrieving content that produced the proposal. A proposal from imagined requirements waits for evidence.

## 1. Layers are seams, not repositories

| Layer          | Lives in                                    | Holds                                                                  |
| -------------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| **Steering**   | `docs/steering/`                            | How I think — voice, mental models, metaphors, visual pattern _intent_ |
| **Knowledge**  | `docs/llm-wiki/`                            | What I know — sources, references, papers                              |
| **Output**     | `docs/episodes/`                            | Aggregated knowledge around one thesis, to be rendered and published   |
| **Governance** | `markdown-harness.config.yaml` and the gate | Keeps both trustworthy over time                                       |

One repository. Each layer is also one OKF bundle, so the bundle boundary and the layer boundary are the same line. The content pipeline is the **first consumer** of this stack, not the stack itself.

**Reasoning.** Single repo avoids multi-tree overhead today while aligning bundle roots on layer seams ensures frictionless subtree extraction without invalidating concept IDs.

**Consequence.** The sellable product, if there is one, is the substrate — steering plus knowledge plus governance. Content is proof that it works.

## 2. Frontmatter follows OKF v0.2

Frontmatter follows Google's [Open Knowledge Format OKF Spec](https://raw.githubusercontent.com/GoogleCloudPlatform/open-knowledge-format/refs/heads/main/SPEC.md), with `markdown-harness.config.yaml` enforcing the required subset.

**Reasoning.** Adopting OKF formalized already-converged harness conventions, ensuring knowledge bundles stay portable and consumable by external tooling.

## 3. The Episode is the primitive

The Episode is the unit the whole system operates on. `CONTEXT.md` defines it.

Each Episode is one directory:

```
docs/episodes/<unique-slug-in-kebab-case>/          # e.g. docs/episodes/investor-pitching/
├── episode.md      # type: Episode          — the authored argument
└── manuscript.md   # type: Manuscript       — the spoken text, and the Deck's source
```

No per-Episode `index.md`. A Deck has no document of its own: it is an implementation, and its specification lives in a GitHub issue.

**Reasoning.** Hard content boundaries eliminate bespoke post-recording cuts across multiple renderers, while plain path slugs avoid redundant naming.

## 4. Derived content artefacts fan out from the Episode

One Episode is the source for multiple derivative representations:

- **Manuscript**: Spoken text derived from the Episode, tailored for delivery.
- **Deck**: Visual presentation sequence derived from a Manuscript and its Episode.
- **Workshop**: Live session composed from one or multiple Decks.
- **Fan-out artefacts**: Shorts, Blog Posts, and Social media posts (e.g. LinkedIn) derived from the Episode, linking back to published work.

## 5. One document per artefact, one stamp per document

Each distinct content representation is its own durable document. The Manuscript is a document, not a section of `episode.md`.

**Reasoning.** Distinct documents isolate human verification stamps (`verified`), maintain unambiguous content boundaries, and prevent derived content from modifying or conflating with the canonical source document.

## 6. Episode is canonical; derivation flows one way

The `episode.md` is the single source of truth. All derived representations (Manuscript, Decks, published pages) flow downstream from it. Nothing flows backward: user feedback and revisions update `episode.md` directly, rather than back-propagating from rendered or downstream artefacts.

**Reasoning.** A canonical source document keeps the underlying knowledge directly accessible for steering, retrieval, and composition without reverse-parsing rendered outputs.

## 7. Visual patterns split across layers, joined by name

Intent lives in the steering layer: which argument shapes want visualisation, and why. Implementation lives in `src/`. The two halves are joined by a **name**. Intent is canonical; implementations may differ — the same pattern rendered differently on two pages is variation, not drift.

**Reasoning.** Decoupling conceptual visual intent from code components allows rendering variations across contexts while preserving architectural meaning through name binding.

## 8. Direct bundle navigation over retrieval layers

Content is navigated directly through predictable bundle paths and frontmatter metadata. There is no secondary index, MCP server, or retrieval layer.

**Reasoning.** Explicit folder hierarchies and OKF metadata make knowledge self-indexing. Deferring specialized retrieval tooling until directory-based navigation proves insufficient avoids over-engineering against imagined requirements.

## Open questions

- **Taxonomy and placement of fan-out artefacts**: Where derivative content (Shorts, Blog Posts, Social media posts) lives in the directory tree (e.g. within `docs/episodes/<slug>/` or in separate output structures), what frontmatter schemas they carry, and their glossary entries in `CONTEXT.md`.
- **Cross-layer reference conventions**: How citations and references across layers (e.g. an Episode citing a concept in `docs/llm-wiki/` or referencing a visual pattern in `docs/steering/`) are formatted and governed.
- **Deck verification and provenance**: Since a Deck has no markdown document of its own in the bundle, whether hand-adjusted Decks require their own metadata/stamp to detect drift from the Manuscript.

## Premise this rests on

**Knowledge and content can be structured as decoupled, filesystem-native layers.**
The assumption is that steering (how to think), durable knowledge (what is known), and output (what is communicated) separate cleanly into file-based bundles, and that plain Markdown with frontmatter metadata is sufficient to track identity, trust, and derivation without an external database, CMS, or specialized indexing service.

If this premise fails — if content cannot be authored in a medium-neutral core without coupling to its delivery vehicle, or if file hierarchies cannot sustain discovery and governance across layers — the layer seams and the Episode primitive move together.
