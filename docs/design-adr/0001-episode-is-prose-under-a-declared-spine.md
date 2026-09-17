---
type: design-adr
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-17T00:00:00Z
---

# An Episode is prose under a declared spine

An Episode could have been a structured brief — named beats, each holding a claim, its evidence and a note on what it does for the argument — leaving the prose to the Manuscript. It is instead continuous prose.

`CONTEXT.md` defines the Manuscript as generated from an Episode and then _tailored_ for delivery. Tailoring presupposes an argument that already exists in words, so a brief would have quietly moved authoring into the Manuscript stage and left Gate 1 reviewing an outline. The Publish bar's first test — will this still be correct in twelve months — is a judgement over content, which needs real prose to be judgeable.

## Consequences

There is no `beats:` key. A frontmatter list restating the headings gives two places to look and drifts the first time a section moves — the same reason Open Knowledge Format keys footnotes by label rather than by position.
