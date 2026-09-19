---
name: review-episode
description: Reviews an episode.md against its Format, its frontmatter and its sources, and reports findings without editing it. Use after an Episode is written or edited, and before a human applies the Publish bar.
argument-hint: 'Path to an episode.md'
---

# Review Episode

A reviewer's checklist, executed. Findings go back as a list and the verdict stays with the
user: the Publish bar in `docs/steering/product.md` is their judgement, and this run is a
precondition to it.

Two passes over the document, then the sources, then the Beats. The whole-document pass runs
first because the findings that matter most are invisible inside any single Beat — a phrase
repeated until it reads as established, a condition stated two ways, a Subject domain declared
and never argued. The Beat pass runs afterwards already knowing which phrases to distrust.

## Read before checking

| Read                                                    | For                                                                    |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| `npx mh --query <path>`                                 | what each frontmatter field must be true of — the `intent` is the test |
| `.agents/skills/write-episode/assets/episode-format.md` | Subject domains, Story Threads, citations, register, definitions       |
| the Format's own asset, under the same `assets/`        | the Beats this Format requires and what each one owes                  |
| `CONTEXT.md`                                            | vocabulary — name things as the repository names them                  |
| `docs/steering/product.md`                              | the Publish bar, quoted verbatim at the end of the report              |
| `docs/steering/information-architecture.md`             | General guidance                                                       |

Read the Format asset the Episode's `format:` field names, `foundations.md` or `teardown.md`,
and only that one.

## What a check owes

Several checks below turn on exact text — a frontmatter key, a footnote label, a quoted passage.
Where a check depends on exact text, obtain the uncompressed original before judging it; where the
environment will not supply it, the check is `Not checked` and says why. A verdict computed around
a lossy read is worse than no verdict, because it is reported with the same confidence as a sound
one.

**`Not checked` is an outcome, not a silence.** A check that could not be performed is reported as
`Not checked`, naming the check and the reason. It is never a pass, and a pass never stands in for
one.

**Every finding carries the passage it is about, quoted verbatim.** Mechanical findings too — a
missing Beat, an absent key, a duplicated footnote. A verbatim quote is not producible from a lossy
read, so this does the work a separate "prove you read the file" rule would do; and a mechanical
claim that cannot be quoted out of the file is a claim about something the file does not say.

**Every finding names the document that makes it a rule** — `assets/episode-format.md`, the Format
asset, `docs/steering/product.md`, a design-ADR, `markdown-harness.config.yaml`. A candidate
finding with no governing document is disqualified and moves to `Not a finding`, where an
observation with no rule behind it is recorded and not counted. A finding is what a document
already governs; anything else is an opinion arriving with a verdict's authority.

## 1. Whole-document pass

**Frontmatter is a claim about the body.** For every field the `mh --query` returns, name the passage
that honours it, or report it unhonoured. The field's `intent` is the test; hold the body to it
rather than to a list restated here. Fields describing the document rather than its content —
`generated`, `verified`, `stale_after`, `status` — are read, not checked.

**Subject domain coverage.** Kebab-case every `###` heading in the body and compare the set with
`subject_domains:`. Report the two directions separately: a declared Subject domain no heading
binds is reach the Episode did not show, a heading nobody declared is a case that arrived
undecided. Report which Beats carry which Subject domains as information and flag nothing about
the distribution — the headings are optional per Beat, and uniform headings would be coverage
theatre. Flag a Subject domain appearing twice inside one Beat: that is an argument that stopped
and got readdressed.

**Story Thread traces.** For each thread in `story_threads:`, write one line per Beat saying what
that thread carries there, or that it is untouched. A Beat a thread does not touch is not a gap.
A point where the trace needs material the Episode does not carry is a gap, and so is a thread
that reaches the last Beat without concluding. Where `story_threads:` is absent, say so and trace
nothing — an undeclared thread is not a missing one.

**Repeated phrases.** Find phrases that recur across Beats and test each instance against its own
Beat rather than against the first. Repetition is what makes an overclaim invisible: a phrase
true of one Subject domain, metaphorical in the second and false in the third reads as
established by the fourth time it appears.

**Stated conditions, definitions and counts.** Collect every one into a single list, so the user
sees them side by side and judges once. Consistency is not correctness — a condition stated the
same wrong way twice passes a consistency check and fails a reader.

_Done when_ every check in this pass carries a verdict, which may be `Not checked`: every field
the query returned has a passage named or is reported unhonoured, both
Subject domain directions are reported, every declared Story Thread has a Beat-by-Beat trace, and
every phrase recurring across Beats has been tested per instance.

## 2. Source pass

**Both directions resolve.** Every `[^id]` in the body resolves to an entry in `sources[]`, and
every entry is used by at least one footnote.

**Each footnote against its claim.** Check what the footnote supports, not that one exists. A
claim wider than its source — a study covering one setting cited for four — is the failure here,
and it hides behind density: a paragraph carrying six footnotes reads as verified and may be
sourced for none of what it says.

**Liveness.** Fetch every `resource` that is a URL. Report dead, moved and paywalled links with
the status that came back.

**Falsification.** For every claim carrying a number, a date or a named study, search for a
retraction, a corrigendum, or a published result that disagrees. Report what comes back, and
report `no correction found` as a fact about the search rather than as support. Search for
disagreement only: an agent looking for corroboration finds it, and two retellings of one study
come back looking like two sources.

**Provenance.** A first-hand source carries enough locator to be found again — slide range, date,
context. Report where a first-hand source is doing work a public source could do instead.

_Done when_ every check in this pass carries a verdict, which may be `Not checked`: every footnote
and every `sources[]` entry is accounted for in both directions, every
URL has a status beside it, and every claim carrying a number, a date or a named study has a
search result beside it.

## 3. Beat pass

For each Beat the Format requires, in the order the Format requires:

- **Present, and in order.** A missing Beat and a reordered one are different findings.
- **Citation follows the claim.** A Beat asserting something about the world carries a footnote
  or a `> **Unsupported** —` marker. There is no list of exempt Beats and no count of them: the
  test is the claim. A Beat that states the analogy, names where the analogy stops mapping, or
  recommends an action asserts nothing about the world; the same Beat making a factual claim
  alongside still owes a footnote for that claim.
- **The two limit Beats stay apart.** `Where the method stops applying` is a claim about the
  world and cites. `Where the analogy breaks down` is the author's own and carries no citation.
  Report a method-limit Beat that talks about the analogy, and an analogy-limit Beat carrying
  footnotes — a footnote under that heading usually means method content landed there.
- **The hook.** `The practice they already run` opens with one to three lines a fifteen-year-old
  inhabits, with no professional experience assumed, and it is distinguishable from the analogy
  that follows. It is not the Episode's first Beat — `Definitions` precedes it.
- **The Takeaway.** `What to do` names at least one action with its object already supplied, not
  a procedure for deriving one, attemptable this week and needing no permission and no new tool.
  Where a checklist appears, every step meets the same test a single action does. Leave whether
  the action is enough to experience the benefit alone: that is the audience hypothesis, and
  failing an Episode on it argues with `product.md` rather than with the Episode.
- **Register.** Written argument throughout: no second-person address, no timing marks, no
  performance cues. Delivery language here propagates into the Manuscript and the Deck.
- **Definitions.** Marked as definitions, each carrying two or more references. Every one sits
  in the `Definitions` Beat and none appears mid-argument. No term is defined twice, every term
  defined is used somewhere in the Episode, and every term the Episode needs in order to be
  understood is defined. A Subject-domain-specific definition sits under that Subject domain's
  `###` inside the Beat.
- **The theory/hands-on turn** happens after the Beat `theory_hands_on_boundary` names.

_Done when_ every Beat the Format requires has been visited in order and every check above carries
a verdict against it — including the ones that pass, and including `Not checked` where the text
did not arrive intact.

## 4. Report

Write the report against [`assets/report-template.md`](assets/report-template.md). It carries one
slot per check named above, in the order the passes run, and every slot is present whether it
passed or not — so two runs over the same Episode diff line by line instead of shifting position.

Each finding carries its verbatim passage and its governing document, per **What a check owes**.
Observations with no governing document go under `Not a finding`. Checks that could not be
performed go under `Not checked`, each naming its reason. Close with the Publish bar's two tests
quoted from `docs/steering/product.md` as the user's to answer.

_Done when_ every check named in this skill has a slot carrying `PASS`, `FINDING` or
`NOT CHECKED`, and the user holds every finding, every reason a check went unperformed, and both
Publish bar tests, unanswered.

## Refusals

**Editing the Episode.** Findings go back as a list. One writer per document: the Episode belongs
to `write-episode` and to the user, and a reviewer that fixes in passing leaves nothing to review.

**Adding to `sources[]`.** A source the falsification search turns up goes in the report as a
suggestion for the user to accept.

**Writing `verified`.** A `human:` actor is the user's to give. An agent that stamps its own
findings resolved has certified its own work.

**Passing or failing an Episode.** The findings are a list and the verdict is a person's.
