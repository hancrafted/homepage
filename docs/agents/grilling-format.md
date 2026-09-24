---
type: agent-guide
---

# Grilling Format

How a grilling round is written in this repo. It covers every round: `/grill-me`, `/grill-with-docs`, and the grilling Wayfinder runs while charting a map or resolving a `wayfinder:grilling` ticket.

This **overrides** the grilling skill's "ask the whole frontier in one round". The frontier still decides which questions are askable; [classification](#classification) decides which of them reach the user.

## The opening

A session usually starts on a ticket id, and the user is not carrying what that ticket was about. Write an orientation before Q1 — once when a `/grill-me` or `/grill-with-docs` session starts, and again each time the Wayfinder picks up a new `wayfinder:grilling` ticket mid-map.

Two lines, no more:

1. **The purpose** — what the ticket exists to settle, named by title.
2. **The end result** — what the user is holding when the session closes: a design-ADR on disk, a rewritten doc, a set of filed issues.

The orientation is not a question and takes no answer. Write it, then ask Q1.

## Classification

The user's attention belongs on contracts and architecture. Classify every candidate question before it is asked — in every grilling round, and at Wayfinder charting, including the grilling that names the destination. Each question gets exactly one bucket: the first row below that fits.

| Bucket         | The answer changes                                                                                                                                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contract`     | everything at a seam or boundary: what an Episode must declare in frontmatter, its Format's Beats, the Publish bar, or what one Layer hands another                                                                                                           |
| `architecture` | software architecture (`docs/steering/software-architecture.md`), information architecture (`docs/steering/information-architecture.md`: a Layer, a Bundle, where an artefact lives), a design pattern, an ADR Discipline or a design-ADR, or needs a new one |
| `vocabulary`   | a term in `CONTEXT.md`: its name, its meaning, or its avoid-list                                                                                                                                                                                              |
| `workflow`     | what a future agent session does — an agent-guide, a skill, `AGENTS.md`                                                                                                                                                                                       |
| `neither`      | none of the above: every reasonable answer leaves them as they were                                                                                                                                                                                           |

The first four are **asked**. `neither` is **decided**.

### Asked questions

- **One decision per question.** A question that needs "and" is two questions.
- **No cap on count.** A cap compresses several decisions into one question, and then they can no longer be answered separately. The filter is what keeps rounds short; if fifteen questions are genuinely asked, the user wants all fifteen.
- **Most consequential first**, so time running out costs the cheap end.
- The frontier rule stands: a question whose answer hangs on another open question waits for a later round.

### Decided questions

Decide every `neither` question yourself and list it at the end of the round under **Decided without asking**, one line each: the decision, then its reason, naming the design principle where one applies — cohesion, coupling, blast radius. The reason is what lets the user spot a misclassification at a glance. A line the user leaves uncontested when answering the round is settled. A contest is recorded under [Classification cases](#classification-cases).

## Question shape

Keep the grilling skill's markers (`❓ **Qn**`, `➡️`) and fill each question out in this order:

1. **The bucket and a full wh-question** as the headline: `❓ **Q1** · contract — **Which …?**`. The bucket lets the user contest the classification. The wh-question ends in a question mark and names its own subject, so it reads on its own with nothing above it. "Which Package should own the violation renderer?" — not "Where the violation renderer lives". A noun phrase makes the user reconstruct the question before they can start answering it.
2. **Options** as a numbered list, one sentence each, with at most one `because` reason.
3. **A recommendation** under the options, naming the option it picks and why it wins.
4. **An example per option**, showing what the decision looks like once taken — the file it writes, the config it changes, the directory layout it produces. Show the effect; don't describe it.

Every example gets the same shape, the same depth, and inline comments giving the why in a few words — a design pattern or a reason. Write each one as though you were about to recommend it — a thin example under the option you are arguing against makes the recommendation before the reasoning does.

## Language

Write the question in plain words and keep the technical terms exact. A term is exact when `CONTEXT.md` or the surrounding docs already establish it — reach for that one rather than a synonym.

Coin nothing silently. Where a concept genuinely has no name yet, say so in the question ("no name for this yet, calling it a _lesson bundle_ here"), so a fresh word is never mistaken for established vocabulary.

## Refer by name

No bare id ever reaches the user. Every id-like handle travels with its name or slug:

- `GEN-001-adr`, never `GEN-001`.
- An architectural tenet by its name, never `tenet 4`.
- Maps and tickets by their title, which is the Wayfinder skill's own rule.

The id alone is unreadable; the name carries the meaning while the id keeps the trail.

## Wayfinder

This section overrides three rules of the vendored Wayfinder skill and nothing else. The skill is lock-managed and overwritten on update, so the repo carries the smallest override that holds.

**Charting files by bucket.** A ticket whose decisions all come out `neither` is filed `wayfinder:grilling` plus `afk`. A ticket with any asked question, or with a bucket still unclear, is filed `wayfinder:grilling` alone — an unclear call errs toward asking. Each ticket line on the map ends with its bucket and the reason: `— contract: Publish bar`.

**An `afk` ticket is decided by a subagent.** At the start of every Wayfinder session, fire one subagent per unblocked, unclaimed `afk` ticket, the way research tickets are fired, and name this file in its prompt. Each subagent claims its ticket first, grills it against this file, posts **Decided without asking** as its closing comment, and closes it. A decision that needs a diff goes to a worktree and opens its own pull request. Fire one layer per session: a ticket that an `afk` close unblocks waits for the next session, so the user can reopen a decision before anything builds on it.

**An asked question stops the subagent.** A subagent that reaches a question in an asked bucket removes `afk`, posts the question in this format, and leaves the ticket open for the user.

**A HITL session with nothing to ask closes itself.** A `wayfinder:grilling` session whose frontier comes out all `neither` posts the list and closes the ticket. The user contests by reopening.

Against the skill's own text:

- **Ticket Types** says a grilling agent that answers its own questions has broken HITL. That still holds for asked questions; `neither` questions and `afk` tickets are the agent's to decide.
- **"Never resolve more than one ticket per session"** gains a second exception beside research: `afk` tickets.
- **"Fire the research subagents"** extends to `afk` tickets, at every session start rather than only at charting.

## A round in this format

Opening `wayfinder:grilling — where the payment contract lives`. This ticket settles which directory owns the payment interface every provider implements. You leave with one decision record on disk.

---

❓ **Q1** · architecture — **Where should the common payment interface definition live in our project directory?**

1. In `src/core/` because high-level business rules should never depend on external vendor libraries.
2. In `src/integrations/stripe/` because keeping the contract right next to the current implementation makes it easy to find.
3. In a standalone workspace package `packages/payment-contracts` because multiple applications might need to share the same types.

➡️ **Recommendation: Option 1 (`src/core/`)**  
It enforces clean architecture boundaries: high-level business rules never import low-level third-party tools, keeping code simple without the maintenance burden of a multi-package repo.

#### Concrete Examples

**Option 1: Inside `src/core/`**

```text
src/
├── core/
│   └── payments.ts         # Dependency Inversion: business domain owns the contract with zero 3rd-party imports
└── integrations/
    └── stripeAdapter.ts    # Adapter Pattern: implements the core contract while importing vendor SDKs
```

**Option 2: Inside `src/integrations/stripe/`**

```text
src/
├── integrations/
│   └── stripe/
│       ├── interface.ts    # Colocation Pattern: packages the contract directly alongside the primary vendor driver
│       └── adapter.ts      # Implementation: couples directly with local interface and vendor SDK
```

**Option 3: In `packages/payment-contracts`**

```text
packages/
├── payment-contracts/
│   └── interface.ts        # Shared Kernel Pattern: isolates interface for reuse across independent microservices
└── backend-api/
    └── adapter.ts          # External Consumer: imports versioned contract from local workspace package
```

## A classified round

The payment round shows the question shape; this one shows classification, in this repo's buckets. It replays the decision recorded in `0004-an-episode-declares-its-subject-domains-twice`: classified, it becomes five asked questions and two decided lines.

Opening `wayfinder:grilling — where an Episode declares its Subject domains`. This ticket settles how an Episode says which Subject domains it covers and where each one is argued. You leave with a design-ADR on disk.

---

❓ **Q1** · contract — **Where should an Episode declare the Subject domains it covers?**

1. In a `subject_domains:` list in frontmatter, because a set is what frontmatter is for.
2. In `###` headings in the body, because a heading carries position at passage granularity.
3. In both, required to be equal, because each catches the gap the other cannot see.

➡️ **Recommendation: Option 3.** A list alone cannot tell a Subject domain argued at length from one declared and never argued; headings alone cannot tell a Beat that skipped a Subject domain from one that had no business carrying it. The pair catches both. It changes what every Episode must declare, which is what makes this `contract`.

**Option 1: frontmatter only**

```text
subject_domains: [project-management, acceptance-testing]   # the set, checkable by mh --check
## The explanation
Prose about project management, then AI…                     # where coverage sits: invisible
```

**Option 2: headings only**

```text
## The explanation
### Project management                                       # position, readable in the body
### AI                                                       # a skipped Subject domain: invisible
```

**Option 3: both, equal**

```text
subject_domains: [project-management, acceptance-testing]   # the set
## The explanation
### Project management                                       # the position
                                                             # acceptance-testing never bound: the gap shows
```

---

❓ **Q2** · contract — **What should a Subject-domain heading carry?** _(options, recommendation and examples as in Q1)_

❓ **Q3** · contract — **Must every Beat carry a heading for every Subject domain?** _(as in Q1)_

❓ **Q4** · vocabulary — **What should a field of practice an Episode shows its principle working in be called?** _(as in Q1)_

❓ **Q5** · workflow — **Who checks the frontmatter list against the headings until `mh` reads the body?** _(as in Q1)_

---

**Decided without asking:**

- A heading derives its key by kebab-casing: `### Project management` yields `project-management` — the casing every frontmatter key here already uses: consistency.
- Prose after a `###` belongs to that Subject domain until the next heading — Markdown headings do not close, so any other reading needs a marker the format does not have.

## Classification cases

When the user pulls a **Decided without asking** line back into a question, or waves an asked question off as mechanics, add one line here: the question, the bucket it was given, the bucket the user gave it, and why. The filter sharpens from these instead of staying general.

_None yet._
