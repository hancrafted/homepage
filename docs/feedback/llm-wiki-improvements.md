# llm-wiki improvements

Defects and open questions found while building the three tiers and running the first
ingest loop. This file records them; it does not act on them. Each entry names what was
hit, what it cost, and where the fix would land — the harness configuration, the
`markdown-harness` tool itself, one of the skills, or the schema.

Entries are appended in the order they were found, newest last.

## Setup phase, 2026-09-23

### 1. The harness has no `date` format, only `datetime`

**Where:** `markdown-harness.config.yaml`, `raw` rule, `published` field.

`published: 2025-07-30` failed `FORMAT_MISMATCH` against `format: datetime`, whose
regex demands a full instant with an offset. A report is published on a day. Satisfying
the format meant writing `2025-07-30T00:00:00Z`, inventing a precision the publisher
never gave.

Worked around with `pattern: '^\d{4}-\d{2}-\d{2}$'`, which loses the format's own
validation and needs a sibling `intent` to satisfy the config gate.

**Would land in:** the tool. A `date` format beside `datetime`, `uri` and `actor`.

### 2. A pattern of `.+` makes nested artefacts ungoverned yet citable

**Where:** `markdown-harness.config.yaml`, `finding` and `concept` rules,
`sources[].resource`.

Written first as `^docs/llm-wiki/raw/.+\.(md|pdf)$`. Because `folders:` selectors do
not recurse, a file at `raw/<dir>/<file>.pdf` is governed by nothing — but `.+` matched
it, so it stayed citable. A claim could rest on a document no rule had ever read, and
nothing would report it.

Tightened to `[^/]+`. The general shape of the defect: wherever a rule's folder reach
and a pattern's reach are written separately, they can disagree silently.

**Would land in:** the tool. Either a selector that can say "this folder and no deeper"
in a pattern-shareable form, or a config-time warning when a path pattern admits paths
the rule set does not govern.

### 3. `--check` cannot see a binary that arrived without its sidecar

**Where:** the tool.

`actionFor` ignores every file not ending `.md`, and no orphan or companion concept
exists anywhere in the package. The three-tier design requires a binary to land beside a
markdown sidecar, since the sidecar is the only half carrying provenance. A PDF dropped
into `raw/` with no sidecar is invisible: it violates the design and passes the gate.

No workaround. The convention is enforced by the `ingest` skill and by review.

**Would land in:** the tool. A rule-level declaration that a governed folder admits
companions, and a violation when one arrives alone.

### 4. Expiry is not a gate outcome, which reads as a gap until you know why

**Where:** the tool, `--check` versus `--assess`.

`--check` is deliberately clock-free, so a corpus cannot go red overnight on a tree
nobody touched. A Concept past its `stale_after` therefore passes `npm run verify`; the
expiry surfaces only through `--assess`, which the Claude Code hook runs on read. This
is the right call, but the split means the `assess.stale` prompt is unreachable from CI
and a repository without the hook gets no expiry signal at all.

**Would land in:** nothing yet. Recorded so the next reader does not mistake it for a
missing check and "fix" it by moving expiry into `--check`.

### 5. A spec restated to an agent is not a spec the agent reads

**Where:** the skills, and how this work was briefed.

Two rules came back missing fields that the brief stated explicitly — `stale_after` and
`assess` on `concept`, `type` on `llm-wiki-index` — each reported as "not specified".
The brief was prose. The rules that survived intact were the ones the agent could read
off an existing rule in the same file.

**Would land in:** the skills. An authoring skill that works from a field table in a
repository document, rather than from prose in a prompt, has a source it can re-read.
