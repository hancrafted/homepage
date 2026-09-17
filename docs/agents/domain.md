# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root, or
- **`docs/design-adr/`**: design ADRs that touch the area you're about to work in.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

## Two ADR systems

This repo runs both the Matt Pocock skills and ArchGate. Each owns its own ADRs and never writes to the other's.

|             | Design ADR                           | ArchGate ADR                                                |
| ----------- | ------------------------------------ | ----------------------------------------------------------- |
| Written by  | `/domain-modeling`                   | `archgate:adr-author`                                       |
| Directory   | `docs/design-adr/`                   | `.archgate/adrs/`                                           |
| Filename    | `NNNN-slug.md`                       | `<ID>-<slug>.md`                                            |
| Frontmatter | `type: design-adr`                   | `type: adr` / `id` / `title` / `domain` / `rules` / `files` |
| Purpose     | records about grilling decisions why | records about technical and architectural decisions and why |

# Event-sourced orders

Orders need a full audit trail for dispute resolution, so the write model is
event-sourced and the read model is projected into Postgres. A CRUD table would
have been simpler but loses the per-transition history the disputes team needs.

`generated.by` and `generated.at` are required — the `design-adr` rule in `markdown-harness.config.yaml` is the source of truth for field shapes, and `npx mh --query <path>` answers what any given file owes. `status` (`proposed | accepted | deprecated | superseded by design ADR NNNN`) is optional, and only when decisions get revisited. Beyond the title and a short paragraph, sections are optional — the value is in recording the decision and its reasoning, not in filling out a template.

**A design-ADR is never authoritative.** It records why an alternative lost; the document the run actually reads records the rule. Where the two disagree — with `CONTEXT.md`, a steering document, an ArchGate ADR or a skill asset — that document is right and the design-ADR is corrected in the same pass. Never restate a rule in a design-ADR, and never point an instruction at one.

**Numbering:** scan `docs/design-adr/` for the highest existing number and increment. Never renumber an existing design ADR. Never number against `.archgate/adrs/` — the two sequences are independent. In prose, write "design ADR 0007" and "ArchGate BE-002" so the two are never confused.

**This overrides `.claude/skills/domain-modeling/ADR-FORMAT.md`**, which says ADRs live in `docs/adr/` and doesn't mention frontmatter. The numbering scheme matches; the directory and the required `type: design-adr` field are the deltas. That file is installer-managed via `skills-lock.json` and is intentionally left as shipped. `docs/adr/` is not used in this repo; don't create it.

### Boundaries

- `/domain-modeling` and the other Matt Pocock skills MUST NOT create, edit, renumber, or delete anything under `.archgate/`.
- ArchGate skills MUST NOT write to `docs/design-adr/`.
- If a decision belongs in the other system, say so and hand off rather than writing it yourself.

## File structure

```

/
├── CONTEXT.md
├── docs/design-adr/
│ ├── 0001-event-sourced-orders.md
│ └── 0002-postgres-for-write-model.md
├── .archgate/adrs/
│ ├── ARCH-001-tech-stack-and-runtime.md
│ └── BE-002-backend-framework.md
└── src/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding, and name which system it came from:

> _Contradicts design ADR 0007 (event-sourced orders), but worth reopening because…_

> _Contradicts ArchGate BE-002 (backend framework) — this is an enforced rule, so it needs an ADR amendment via `archgate:adr-author`, not a workaround._
