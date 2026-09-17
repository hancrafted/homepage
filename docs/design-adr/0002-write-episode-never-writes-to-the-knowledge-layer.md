---
type: design-adr
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-17T00:00:00Z
---

# /write-episode never writes to the Knowledge layer

The skill writes only under `docs/episodes/`; landing a Source belongs to the research stage.

A run could have done both, since the skill is the thing that discovers a Source is missing. `docs/steering/information-architecture.md` holds one document per stage and one stamp per document, and refuses to fold the Manuscript into the Episode because that would make the two approvals indistinguishable. A run that wrote both an Episode and the Sources beneath it recreates exactly that: approving the Episode would silently approve material nobody had reviewed, and the two-gate design would be gone at the frontmatter level.
