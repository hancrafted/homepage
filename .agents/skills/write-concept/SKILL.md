---
name: write-concept
description: Write or rewrite one commissioned Concept in docs/llm-wiki/concepts/ from the Findings and Raw it draws on; the human stamp stays the user's.
disable-model-invocation: true
argument-hint: 'The idea, plus the Findings and Raw it draws on (paths under docs/llm-wiki/findings/ and docs/llm-wiki/raw/)'
---

# Write Concept

Produce or rewrite one Concept: `docs/llm-wiki/concepts/<slug>.md`. A Concept is a durable explanation of one idea, drawn from Findings and Raw and rewritten whenever it is revised — the only tier claiming to be currently true, and the only one carrying a human stamp. `CONTEXT.md` fixes the vocabulary; reach for its words rather than the synonyms under `_Avoid_`.

**Commissioned, never automatic.** This run exists because someone named an idea and asked for the Concept. Landing a Raw or writing a Finding commissions nothing: the Concept carries a person's `verified` stamp, and a revision arriving as the by-product of a research task would knock that stamp off a page nobody asked to reopen. A Finding standing alone, absorbed into no Concept, is a legal end state and not a backlog item.

**Rewritten whole.** The unit of revision is the file. A revision re-reads every source and writes the Concept again; it does not patch prose, because a fresh stamp on a patched page would cover paragraphs nobody re-read.

## Read before writing

| Read                                              | For                                                                     |
| ------------------------------------------------- | ----------------------------------------------------------------------- |
| `npx mh --query docs/llm-wiki/concepts/<slug>.md` | every field the Concept owes — `intent` is the test                     |
| `CONTEXT.md`                                      | Concept, Finding, Raw, Steering, and the `_Avoid_` lists                |
| `docs/steering/information-architecture.md` §8    | one-way citation; knowledge, never decisions                            |
| `docs/agents/finding-format.md`                   | how to read a Finding's claim ledger — what each verdict lets you carry |

## Cites downward only

Every `sources[].resource` is a repository path matching `^docs/llm-wiki/(raw|findings)/[^/]+\.(md|pdf)$`: a Finding or a Raw, never another Concept, never a URL. Citation running one way keeps the evidence a tree, so rewriting one Concept cannot silently change what another claims. The pattern refuses a directory separator inside the tier because the harness's folder selectors do not recurse: a nested file is ungoverned, and citing one would rest a claim on a document no rule ever read. Each entry carries the file's `title` beside its path.

## Knowledge, never decisions

A Concept says what is true. What to do about it lives elsewhere: a decision about code is an ArchGate ADR in `.archgate/adrs/`, written only by `archgate:adr-author`; a design decision is a design-ADR in `docs/design-adr/`; how to choose is the Steering layer. A sentence ending in "so we should…" is in the wrong document — hand it to the user with the place it belongs, and write the Concept without it.

## Frontmatter

`npx mh --query docs/llm-wiki/concepts/<slug>.md` lists every field with its `intent`; `markdown-harness.config.yaml` is the source of truth. What the query does not say:

| Field                        | Note                                                                                                                                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`                | Read with the file closed. `docs/llm-wiki/index.md` copies it verbatim, so it names the subject and when an agent needs it, within 300 characters, and does not summarise the argument. |
| `sources[]`                  | Per _Cites downward only_. Every Finding and Raw the body draws on, and nothing the body does not.                                                                                      |
| `stale_after`                | The date the claim to be currently true expires. You write a proposal; the date is the user's judgement, so the report names it.                                                        |
| `generated.by`               | The agent's own `<producer>/<version>`, never `human:`.                                                                                                                                 |
| `verified.by`, `verified.at` | Required, and never written by the agent. See step 5.                                                                                                                                   |

The frontmatter this run leaves behind:

```yaml
---
type: Concept
title: Security failure rate of LLM-generated code
description: 'What share of LLM-generated code fails security tests, and how that share moves with model size and recency, as Veracode measured it in 2025. Open when a baseline figure for insecure AI-written code is needed.'
sources:
  - resource: docs/llm-wiki/findings/2026-09-23-llm-code-security-failure-rates.md
    title: LLM code security failure rates
  - resource: docs/llm-wiki/raw/veracode-genai-code-security-2025.md
    title: Veracode 2025 GenAI Code Security Report
stale_after: 2027-09-23T00:00:00Z
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-23T22:10:00Z
---
```

## Steps

**1. Take the commission.** The idea, named; the Findings and Raw it draws on, as repository paths. A claim whose evidence has not landed is handed back rather than sourced from memory: `/ingest` lands a file or page as a Raw, `/research` answers a question as a Finding.

_Done when_ every source path resolves to a flat file under `docs/llm-wiki/raw/` or `docs/llm-wiki/findings/`, or the user has decided to proceed without the one that does not.

**2. Read the sources whole.** A Finding by its claim ledger: a `corrected` entry says what the Concept may carry and what it may not; `no correction found` says a search ran, not that the claim is true; `outside bound` carries a quote and a locator and no search. A Raw by the pages or headings the Findings locate. On a revision the existing Concept is not a source; it is what is being replaced.

_Done when_ every claim the Concept will make traces to a ledger entry or a located passage in a Raw, and every claim the sources do not carry has been struck rather than softened.

**3. Fix the slug.** `docs/llm-wiki/concepts/<slug>.md`, kebab-case, naming the idea and not the thesis: the slug is the concept ID and Episodes cite it, so a thesis-shaped slug goes stale the day the thesis does. On a revision the slug stands.

_Done when_ the path is flat and, for a new Concept, `npx mh --query` on it has returned the fields owed.

**4. Write the whole file.** Frontmatter per the table, both `verified` fields absent. Body: the explanation, in written argument, each claim one the sources carry, each sentence a statement of what is true.

_Done when_ the file exists, every field the query names but `verified.by` and `verified.at` is present, and no sentence in the body says what to do.

**5. Regenerate the index, run the check, report the red.** `npm run wiki:index`, then `npx mh --check`. The index copies every `description` verbatim and is never hand-edited; `npm run verify` fails when it has drifted, so it is regenerated in the run that writes the file. The check fails on exactly this file, on `verified.by` and `verified.at`; that red is the design — the check is asking for the person. Writing `human:` to satisfy it forges the stamp. The report carries the path, the proposed `stale_after`, every claim struck in step 2, every decision-shaped sentence handed back in _Knowledge, never decisions_, and the block to paste beneath `generated:`:

```yaml
verified:
  by: human:<handle>
  at: 2026-09-23T22:15:00Z
```

`by:` is the user's own handle. `at:` is the instant of the re-reading; a person who reads later changes it. Once pasted, `npx mh --check` goes green; until then the tree is red and the push gate holds it there.

_Done when_ the user holds the block, the path, and the list of what was struck or handed back.

## Refusals

**Writing `verified`.** `^human:[^ ]+$` is a person's stamp. An agent that writes it has certified its own work, and an unstamped Concept claiming to be currently true on nobody's authority is the honest state until the person has read it.

**Revising uncommissioned.** A Concept found past its `stale_after`, or a Finding found absorbed into no Concept, is reported and left where it is. The next run is the user's to commission.

**Landing or researching in this run.** The commission names its evidence. Evidence that does not exist yet is `/ingest`'s or `/research`'s work, and a person stamping the Concept would otherwise be stamping material that arrived unreviewed beneath it.

**Renaming.** The slug is the concept ID; renaming it orphans every Episode citing it. Renaming is its own deliberate act; leave the file where it is.
