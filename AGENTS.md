# Homepage

A centralized repository for creating content agentically: llm-wiki as knowledge base, Episodes derived
from it, and a next.js site that renders episodes as Decks, to be published on (for now) as GitHub Pages.
YouTube videos, Medium articles and Podcast episodes are derived from Episodes/Manuscripts.
Workshops are delivered to business clients, based on the published content and decks.

## Decision records

Two separate systems, never interchangeable:

- **ADR** — Archgate governance records in `.archgate/adrs/` (`ARCH-001`, `BE-001`, …). Created and edited **only** by `archgate:adr-author`; other skills delegate to it.
- **design-ADR** — design decisions from the Matt Pocock skills in `docs/design-adr/` (`0001-<slug>.md`), each starting with `type: design-adr` as the first frontmatter field.

Use the precise term. The Matt Pocock skill files still say ADRs live in `docs/adr/` — in this repo they don't; see `docs/agents/domain.md`.

## Vision

Neither file below is a decision record. They hold the reasoning decisions get derived from, and each opens with the test to run before proposing anything.

- `docs/visions/product.md` — the promises, the boundaries, the horizons. Read before proposing content, arguing scope, or running a non-technical grilling session.
- `docs/visions/information-architecture.md` — the layers, the bundles, the Episode primitive. Read before adding a directory, changing what frontmatter carries, or deciding where a new artefact lives. A software architecture vision is deferred until the first Episode has to become a Deck.

## Agent skills

### Issue tracker

Issues and specs live as GitHub issues in `hancrafted/homepage`, driven via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, using their default label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` at the repo root. See `docs/agents/domain.md`.

### Markdown frontmatter

`npx mh --query <path>/<current-file-name>.md` (e.g. `npx mh --query docs/visions/product.md`) before writing or updating any `.md` file. It answers what frontmatter that path owes before the file exists; `invisible` means ungoverned, so write freely. The push gate runs `mh --check`, and querying first is what keeps it green.

`verified.by` and `verified.at` are the user's to give. Ask for them in a pass of their own — an agent that updates a document and stamps it verified in the same go has certified its own work. `generated.*` is the agent's claim; `verified.*` is the human's.

### Grilling rounds

Every grilling round — `/grill-me`, `/grill-with-docs`, or the grilling Wayfinder runs while charting a map or resolving a `wayfinder:grilling` ticket — uses this repo's round format, which overrides the grilling skill's own. See `docs/agents/grilling-format.md`.
