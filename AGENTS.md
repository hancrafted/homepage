# Homepage

Content built agentically: an llm-wiki, Episodes drafted from it, and a site that publishes
them. `CONTEXT.md` fixes every word in that sentence — read it before writing prose, and use
its names.

## Who owns what

Four documents govern, each authoritative over exactly one thing:

| Document                                    | Owns                                             |
| ------------------------------------------- | ------------------------------------------------ |
| `CONTEXT.md`                                | Vocabulary. Every other document uses its names. |
| `docs/steering/product.md`                  | Scope — whether something belongs here at all.   |
| `docs/steering/information-architecture.md` | Placement — where an artefact lives.             |
| `.archgate/adrs/`                           | Code.                                            |

Outside its own subject a document is a copy, and copies drift. On a disagreement the owner
wins and the losing document gets corrected in the same pass, not worked around.

## Before writing any `.md`

`npx mh --query <path>` — it answers what frontmatter that path owes before the file exists;
`invisible` means ungoverned, so write freely. The push gate runs `mh --check`, and querying
first is what keeps it green.

`verified.by` and `verified.at` are the user's to give. Ask for them in a pass of their own —
an agent that updates a document and stamps it verified in the same go has certified its own
work. `generated.*` is the agent's claim; `verified.*` is the human's.

## Steering

`docs/steering/index.md` is the front door: five disciplines in one line each, then the
documents holding the reasoning decisions get derived from. Most rounds end on a discipline
without opening a document; when one has to be opened, its `description` frontmatter says which,
and that is the one list of triggers.

Software architecture is `docs/steering/software-architecture.md`, written ahead of the first
Deck and provisional until one exists.

## Decision records

- **ADR** — Archgate governance, in `.archgate/adrs/`. Created and edited **only** by
  `archgate:adr-author`; other skills delegate to it.
- **design-ADR** — a design decision from the Matt Pocock skills, in
  `docs/design-adr/0001-<slug>.md`, with `type: design-adr` as the first frontmatter field.

Never interchangeable; use the precise term. The Matt Pocock skill files say ADRs live in
`docs/adr/` — in this repo that path does not exist.

## Conventions

**Issues** — GitHub issues in `hancrafted/homepage`, driven via the `gh` CLI. See
`docs/agents/issue-tracker.md`.

**Triage** — five canonical roles at their default label strings. Read
`docs/agents/triage-labels.md` before labelling an issue.

**Domain docs** — one `CONTEXT.md`, at the repo root. See `docs/agents/domain.md`.

**Grilling rounds** — every round (`/grill-me`, `/grill-with-docs`, or the one Wayfinder runs
while charting a map or resolving a `wayfinder:grilling` ticket) uses this repo's format,
which overrides the grilling skill's own. See `docs/agents/grilling-format.md`.
