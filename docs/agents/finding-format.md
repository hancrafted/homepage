---
type: agent-guide
---

# Finding Format

How a Finding is written in this repo. A Finding is one research question, answered against Raw
that has already landed here — `CONTEXT.md` defines Raw, Finding and Concept, and those are the
names used below.

This **overrides** the `/research` skill's last instruction, "save it where the repo already keeps
such notes; match the existing convention, and if there is none, put it somewhere sensible and say
where". There is one, and this is it. The skill still decides what counts as a primary source; this
file decides where the answer lands, what it is called, and what shape it takes.

## Where a Finding lands

`docs/llm-wiki/findings/`, flat, one question per file.

Never under the Episode that commissioned it, and never in a subdirectory of `findings/`. The
harness's `folders:` selectors are not recursive, so a nested directory is ungoverned: a Finding one
level down owes no frontmatter and nothing will tell you it is missing.

**Reasoning.** The second Episode that needs this evidence has to reach it without knowing which
Episode paid for it. Filing a Finding under its commissioner makes the evidence reusable only by
whoever remembers the first run.

## What a Finding is called

`YYYY-MM-DD-<subject-in-kebab-case>.md` — the date the research ran, then the subject it ran on.

```text
docs/llm-wiki/findings/2026-09-23-llm-code-security-failure-rates.md
```

**Reasoning.** A Finding holds one question and is only ever appended to, so re-asking that question
next year has to write a second file rather than destroy the first, and the date prefix is what
makes room for it. It also makes "when was this subject last researched?" answerable from a
directory listing, with no index to keep in step.

## No backlink to the commissioning Episode

The Episode that commissioned the research is named nowhere — not in the path, not in the
frontmatter, not in the body. Git already records which run wrote the file and what else that run
touched.

**Reasoning.** In the path it would change the concept ID the day a second Episode reuses the
Finding, and a concept ID that moves is a citation that breaks. In the frontmatter it would make
citation bidirectional, and citation here runs one way only: an Episode cites Concepts, Findings and
Raw, a Concept cites Findings and Raw, a Finding cites Raw, and Raw cites nothing. No document
records what points at it.

## Frontmatter

| Field                          | Presence        | Notes                                                                     |
| ------------------------------ | --------------- | ------------------------------------------------------------------------- |
| `type`                         | required        | `Finding`                                                                 |
| `sources`                      | required, min 1 | Repository paths matching `^docs/llm-wiki/raw/[^/]+\.(md\|pdf)$`          |
| `generated.by`, `generated.at` | required        | The agent's claim about itself                                            |
| `verified.by`, `verified.at`   | optional        | The user's to give, and their presence raises trust rather than grants it |
| `stale_after`                  | never           | A Finding records what a source said on a date; that does not expire      |

Every `sources:` entry is a repository path. A source that cannot be landed under
`docs/llm-wiki/raw/` is not cited — land it first, or leave the claim out. A URL is not a source
here, because the page behind it can be edited after the Finding is written.

`markdown-harness.config.yaml` is the source of truth for field shapes, and
`npx mh --query docs/llm-wiki/findings/<file>.md` answers what any given file owes.

A Finding records what the sources say and never what to do about it. Decisions live elsewhere;
`docs/steering/information-architecture.md` says where.

## The body is a claim ledger

One `##` per claim, in the order the question needed them. Prose between entries is fine; a claim
without an entry is not.

Each entry carries six fields, in this order:

1. **Claim.** The sentence a Concept or an Episode would assert, written out in full. Not a topic —
   a claim someone could be wrong about.
2. **Quote.** Verbatim from the Raw, in a blockquote, long enough to carry its own qualifiers.
3. **Locator.** Where in the Raw the quote sits. See below.
4. **Searched for.** The result that would have refuted the claim, named before it was looked for.
5. **Came back.** What the search returned, including nothing.
6. **Verdict.** One word from the closed set below, written **last**.

The verdict goes last because it cannot be filled in before the two lines above it exist. An entry
whose verdict was decided first is an entry that went looking for agreement.

## Locators

A locator names where in the Raw the quote sits, precisely enough that a reader opens the Raw and
lands on it.

- **PDF Raw** — prose, in the document's own numbering: `p31`, `endnote 19`, `§4.2`, `figure 3`,
  `slide 12`.
- **Markdown Raw** — the heading the quote sits under, as a repository path plus its heading
  fragment: `docs/llm-wiki/raw/veracode-genai-code-security-2025.md#the-45-per-cent`.

Never an injected anchor. Editing a landed artefact to add anchors, ids or markers makes it
something other than Raw: Raw is written once, at landing, and a file edited afterwards to suit a
citation has stopped being the thing that landed. If a markdown Raw has no heading fine-grained
enough, quote more and locate to the heading that exists.

## The refutation search is bounded

Run it on claims carrying a number, a date or a named study. Definitions, restatements and pointers
to a glossary get a quote and a locator and no search — the Raw is landed, so there is no liveness
left to check.

Where it runs, it looks for a retraction, a corrigendum, an erratum, a later result that disagrees,
or the publisher's own restatement. It never looks for a second source that agrees. This is
`docs/design-adr/0007-a-review-searches-for-correction-not-for-support.md`, and the reasoning is
there: an agent told to corroborate finds corroboration, and two retellings of one press release
come back as two sources.

## Verdicts

Three words, and no others:

| Verdict               | Means                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------- |
| `no correction found` | The search ran and returned nothing that disagrees.                                          |
| `corrected`           | The search returned something that disagrees and supersedes. The entry says what it changes. |
| `outside the bound`   | The claim carries no number, no date and no named study, so no search ran.                   |

**`verified` and `confirmed` are not verdicts here.** A claim that survives a search for its
refutation is reported as `no correction found`: what was established is that someone looked, not
that the claim is true. `verified` belongs to the frontmatter and is the user's to give.

**The prior art gets this wrong.**
`docs/research/backward-chaining/veracode-genai-code-security-2025.md` reads
`Verdict: Confirmed, verbatim` down its whole length, because it searched for support and found it —
a press release, a blog post and a landing page, all Veracode's, counted as three corroborations of
one claim. Do not copy its shape.

## A worked entry

From `docs/llm-wiki/findings/2026-09-23-llm-code-security-failure-rates.md`:

```markdown
## 45 per cent is a proportion of samples, not of the 80 tasks

- **Claim.** Veracode's 2025 study found that 45 per cent of its 80 coding tasks produced insecure
  code.
- **Quote.**
  > "45% of code samples failed security tests and introduced OWASP Top 10 security
  > vulnerabilities into the code."
- **Locator.** `docs/llm-wiki/raw/veracode-genai-code-security-2025.md#the-45-per-cent`
- **Searched for.** A retraction or corrigendum to the report, and any later Veracode publication
  restating the figure against a different denominator.
- **Came back.** No retraction. Veracode republished the same landing page as an October 2025
  update rather than issuing a correction. The Raw records the figure three times — as samples, as
  test cases, and as tests — and never as a proportion of the 80 tasks.
- **Verdict.** `corrected`. The figure survives; the denominator in the claim does not. What a
  Concept may carry is "45 per cent of samples". The count of tasks is a separate claim and needs
  its own entry.
```

The verdict is `corrected` even though nothing was retracted, because the claim as stated does not
survive the quote it rests on. A ledger that only ever reaches `no correction found` is a ledger
that was not read against its own sources.
