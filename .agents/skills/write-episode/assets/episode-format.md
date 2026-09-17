# Episode Format

The rules every Episode obeys, whatever its Format. The beats themselves are in `foundations.md`, `teardown.md` and `short.md`.

## Frontmatter

Follows Open Knowledge Format v0.2 (`GoogleCloudPlatform/open-knowledge-format`), which is the source of truth for field shapes. Custom keys are sanctioned by the spec: `type` is the only always-required key and consumers may not reject a document over keys they do not recognise.

```yaml
---
type: Episode
title: Investor pitching
description: Decomposition is the practice they already run, under a different name.
tags: [decomposition, pre-sales]
format: Foundations
thesis: Decomposition is project management with new vocabulary
analogy: splitting a bid into priceable workstreams
threads:
  a: decomposition makes work priceable
  b: the bid I lost by quoting it whole
sources:
  - id: cpm-1959
    resource: 'https://en.wikipedia.org/wiki/Critical_path_method'
    title: Critical path method
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-16T00:00:00Z
stale_after: 2027-09-16T00:00:00Z
status: draft
---
```

Field notes, in the order above:

- **`format`** — `Foundations | Teardown | Short`. It selects the beats, so it is a field rather than a tag: a checker cannot resolve a skeleton out of free text.
- **`title`** — always write one. A consumer may derive a missing title from the filename, and every Episode's filename is `episode.md`.
- **`thesis`** and **`analogy`** — the spine. Declared rather than left to prose because the analogy-led red thread is the signature, and no check can confirm the analogy recurs unless it can read what the analogy is.
- **`threads`** — optional. The A thread is the idea, the B thread the human stake. Omit both rather than invent a B thread.
- **`sources`** — every Source the Episode rests on. `resource` is required per entry and accepts a URL, a path under `docs/llm-wiki/`, or a scope descriptor such as `voice grilling session, morning commute`. Give every entry an `id`; the body joins to it.
- **`generated`** — yours to write.
- **`verified`** — never yours to write. It is a list, and a `human:` actor in it is the only thing that marks content as reviewed. An agent that stamps its own work has certified itself.
- **`stale_after`** — propose it, let the user confirm. The Publish bar asks whether the content will still be correct in twelve months, which is this date.
- **`status`** — always write it explicitly. Its absence reads as `stable`, so an unwritten `status` would have a first draft claiming to be finished.

No `beats:` key. The `##` headings are the beats, and a list restating them drifts the first time a section moves.

## Register

The Episode is the written argument. The Manuscript is the spoken performance generated from it, and the Deck is generated from the Manuscript — so delivery language leaking in here propagates twice with nothing downstream to catch it.

Written register, therefore: continuous prose, no second-person address, no delivery cues, no timing marks, no "let me show you". The Manuscript adds every one of those.

The Episode also has to be complete. It holds every claim, every source and every limit, because the Manuscript may re-voice and cut but never add.

```markdown
Episode: The bid analogy holds while workstreams can be priced independently.
Manuscript: Now watch what happens when I merge two workstreams — [pause] —
you can already feel where this is going.
```

## Citations

Per-claim attribution uses a markdown footnote whose label is a `sources[].id`. Labels are keyed rather than positional because these documents get rewritten constantly.

```markdown
Splitting work so each piece can be accepted alone is what project management
has called a work breakdown structure since the 1950s.[^cpm-1959]

[^cpm-1959]: Critical path method
```

**Fact-stating beats must cite.** The misconception, the explanation and the worked example make claims about the world; an uncited explanation is merely lucid, which raises how confident an audience feels without raising what they know.

**Two beats are exempt.** The analogy opening draws its authority from the user having lived it, so demanding a source would push the work toward borrowed analogies. The closing takeaway is a recommendation, not a finding.

A fact-stating beat with no footnote is unsupported. Mark it in place and leave `status: draft`:

```markdown
## Shown working

> **Unsupported** — no entry in `sources:` backs this beat.
> Needed: one case where decomposition by acceptance test changed a price.
```

## The theory/hands-on boundary

Foundations and Teardown carry one; Short does not. It marks where theory stops and hands-on begins, decided now rather than found later when a recording has to be cut. It is a body marker rather than a frontmatter field, because it names a position among the beats.

```markdown
<!-- theory/hands-on boundary -->
```
