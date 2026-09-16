# Homepage

## Decision records

Two separate systems, never interchangeable:

- **ADR** — Archgate governance records in `.archgate/adrs/` (`ARCH-001`, `BE-001`, …). Created and edited **only** by `archgate:adr-author`; other skills delegate to it.
- **design-ADR** — design decisions from the Matt Pocock skills in `docs/design-adr/` (`0001-<slug>.md`), each starting with `type: design-adr` as the first frontmatter field.

Use the precise term. The Matt Pocock skill files still say ADRs live in `docs/adr/` — in this repo they don't; see `docs/agents/domain.md`.

## Vision

Neither file below is a decision record. They hold the reasoning decisions get derived from, and each opens with the test to run before proposing anything.

- `docs/vision/product.md` — the promise, the two roles, the boundaries, the horizons. Read before proposing a feature, arguing scope, or writing adopter-facing copy.
- `docs/vision/architecture.md` — the tenets, and four decisions that are cheap now and expensive later. Read before adding a dependency, a config key, a write path, or an integration surface.

## Agent skills

### Issue tracker

Issues and specs live as GitHub issues in `hancrafted/homepage`, driven via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, using their default label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` at the repo root. See `docs/agents/domain.md`.

### Grilling rounds

Every grilling round — `/grill-me`, `/grill-with-docs`, or the grilling Wayfinder runs while charting a map or resolving a `wayfinder:grilling` ticket — uses this repo's round format, which overrides the grilling skill's own. See `docs/agents/grilling-format.md`. A spoken session overrides that format in turn; see `docs/agents/grilling-voice.md`.
