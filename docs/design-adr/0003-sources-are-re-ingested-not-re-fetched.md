---
type: design-adr
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-17T00:00:00Z
---

# Sources are re-ingested, not re-fetched

A Source is landed once as a file and read from there on every subsequent run.

Fetching per run looked cheaper — nothing to store, the citation lives in frontmatter as a `resource` URI either way, and accepting a YouTube link was the original ask. It fails on two counts. `docs/architecture/pipeline.md` stops after each stage precisely so that a failed stage does not take the research back with it, and a per-run fetch makes every re-run a fresh chance for YouTube's bot check to break a stage that had already succeeded — `--cookies-from-browser` needs the browser closed and does not work headless, so the skill cannot recover on its own. Independently, a video can be deleted or re-captioned, which takes the evidence with it.
