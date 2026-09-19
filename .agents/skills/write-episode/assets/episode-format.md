# Episode Format

The rules every Episode obeys, whatever its Format. The beats themselves are in `foundations.md` and `teardown.md`.

## Frontmatter

Follows Open Knowledge Format v0.2 (`GoogleCloudPlatform/open-knowledge-format`), which is the source of truth for field shapes. Custom keys are sanctioned by the spec: `type` is the only always-required key and consumers may not reject a document over keys they do not recognise.

```yaml
---
type: Episode
title: Investor pitching
description: Decomposition is the practice they already run, under a different name.
tags: [decomposition, pre-sales]
format: Foundations
thesis: Decomposition is project management with new vocabulary
analogy: splitting a bid into priceable workstreams
subject_domains: [pitching, project-management, testing]
story_threads:
  a: decomposition makes work priceable
  b: the bid I lost by quoting it whole
theory_hands_on_boundary: after "Shown working"
sources:
  - id: cpm-1959
    resource: 'https://en.wikipedia.org/wiki/Critical_path_method'
    title: Critical path method
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-16T00:00:00Z
stale_after: 2027-09-16T00:00:00Z
status: draft
---
```

Field notes, in the order above. `npx mh --query docs/episodes/<slug>/episode.md` returns what
each field must be true of; these notes are how to write it.

- **`format`** — `Foundations | Teardown`, and it selects the Beats you write.
- **`title`** — always write one. Every Episode's filename is `episode.md`, so a consumer
  deriving a title from the filename gets nothing.
- **`description`** — written last, once you know what the Episode turned out to teach. It is
  copied verbatim into an index and read with the Episode closed, so it carries the terms
  someone assembling a Workshop would search for.
- **`tags`** — what the Episode is _about_. A tag is a subject, a Subject domain is a field the
  principle is shown working in: `decomposition` is a tag, `pitching` a Subject domain.
- **`thesis`** and **`analogy`** — the Spine. Declared rather than left in the prose because the
  signature is analogy-led, and no check can confirm the analogy recurs unless it can read what
  the analogy is.
- **`story_threads`** — optional. A is the idea, B the human stake. Omit both rather than invent
  a B thread. `## Story Threads` below holds the rule.
- **`subject_domains`** — kebab-case. The body binds passages to them; `## Subject domains`
  below holds the rule.
- **`theory_hands_on_boundary`** — the Beat the turn falls after. Both Formats carry it.
- **`sources`** — every Source the Episode rests on. `resource` is required per entry and accepts
  a URL, a path under `docs/llm-wiki/`, or a scope descriptor such as
  `voice grilling session, morning commute`. Give every entry an `id`; the body joins to it.
- **`generated`** — yours to write.
- **`verified`** — never yours to write. A `human:` actor in it is the only thing that marks
  content reviewed, and an agent that stamps its own work has certified itself.
- **`stale_after`** — propose it, let the user confirm.
- **`status`** — `draft | stable`. Always write it explicitly.

## Subject domains

`CONTEXT.md` defines Subject domain. One Foundations Episode carries its principle across several, and `subject_domains:` is the claim that it does.

Frontmatter declares the set; the body binds each passage to one of them. Both, because frontmatter cannot carry a position, and a heading on its own says nothing about coverage across the whole Episode.

### The heading is the Subject domain

A `###` heading carries the Subject domain's label and nothing else — the label itself, not the words "Subject domain". Kebab-casing the whole heading yields exactly one `subject_domains:` entry, which is what makes the binding derivable without parsing.

```markdown
### Project management

### AI evals
```

Whatever the passage would have been titled becomes its opening sentence instead.

### Every Beat: a lede, then Subject domains where they differ

A Beat opens in prose — its own lede, the argument it is making — and then runs its
Subject-domain-specific material under `###` headings to the end of the Beat. The headings
are optional. A Beat whose material is not Subject-domain-specific is all lede, and no Beat
owes a heading to every Subject domain it could have carried.

Markdown headings do not close. Prose after a `###` belongs to that Subject domain the way
anything after a heading belongs to its section, so material belonging to no single Subject
domain goes in the lede. The lede states the Beat's argument; the headings below already
name their Subject domains, so it does not enumerate them.

At most one `###` per Subject domain per Beat. A second passage in the same Subject domain
joins the first section — a heading appearing twice is an argument that stopped and got
readdressed.

### Coverage

`subject_domains:` equals the union of the `###` headings across the whole Episode. Across
the Episode, never per Beat: no Beat carries every Subject domain and a Beat may carry none.
An entry in `subject_domains:` means at least one Beat binds it somewhere, and that equality
is what makes a coverage gap visible. A Subject domain declared and never bound is an Episode
claiming a reach it did not show; a heading naming a Subject domain never declared is a case
that arrived without anyone deciding to include it.

The harness reads frontmatter only, so `review-episode` is what checks this. Whatever writes
the Episode still reports the two sides against each other when it hands the work back — an
author pass, ahead of the gate rather than instead of it.

## Story Threads

`CONTEXT.md` defines Story Thread. A declared thread is traceable Beat by Beat and reaches a
conclusion by the last Beat. A Beat a thread does not touch is not a gap — an Episode argues,
it does not narrate. A point where the trace needs material the Episode does not carry is.

Where both are declared they alternate rather than run together: A carries the argument
forward, B returns when the argument needs a person in it. Both land by `What to do`.

The storyline itself belongs to the Manuscript. What the Episode owes is the material a
storyline can be drawn from, which is why the test is a trace and not a reading.

## The misconception rule

Both Formats raise a wrong mental model, and both close it. Closing it is the load-bearing half.

Introducing a concept through a misconception and failing to resolve it properly leaves viewers holding **more** misconceptions and **fewer** correct conceptions than a plain correct explanation would, while feeling equally clear. Confidence rises either way; only the resolution moves what the audience knows.

Foundations asserts the model in `The model they are running` and closes it in `The explanation`. Teardown diagnoses it from the artefact in `Why it happened` and closes it in `How it should have been done`. An Episode that raises a model it never closes is worse than one that never raised it.

## Register

The Episode is the written argument. The Manuscript is the spoken performance generated from it, and the Deck is generated from the Manuscript — so delivery language leaking in here propagates twice with nothing downstream to catch it.

Written register, therefore: the Episode argues on the page. Markdown structure is available and sometimes required — a procedure is a numbered list, a definition is a marked block. What stays out is delivery: second-person address, timing marks, performance cues, "let me show you". The Manuscript adds every one of those.

The Episode also has to be complete. It holds every claim, every source and every limit, because the Manuscript may re-voice and cut but never add.

```markdown
Episode: The bid analogy holds while workstreams can be priced independently.
Manuscript: Now watch what happens when I merge two workstreams — [pause] —
you can already feel where this is going.
```

## Definitions

A definition is a different kind of claim from an argument, so it is marked rather than folded into the prose around it:

```markdown
> **Definition** — Backward chaining is the goal-driven inference method, working from
> consequent to antecedent until the chain lands on something already
> established.[^backward-chaining-wiki]
```

Same construct as the `> **Unsupported** —` marker below, for the same reason: it says what kind of passage this is rather than emphasising it. It greps in one line.

Every definition sits in the `## Definitions` Beat, which is the first Beat of both Formats, and nowhere else. A term defined mid-argument is the restatement that produced this rule: the same definition turned up twice in one Episode because it had no home of its own.

The Beat opens with one fixed sentence, identical in every Episode, and carries no other prose:

```markdown
These definitions establish the vocabulary this Episode uses, and the source each term takes
its official meaning from.
```

Definitions that hold across the Episode follow it in the lede. A definition that is a Subject domain's own name for the thing sits under that Subject domain's `###` inside the Beat — Project management's _backward pass_ is a Subject domain definition; backward chaining itself is not. Those `###` headings bind their Subject domain like any other, and count towards the coverage equality below.

## Citations

Per-claim attribution uses a markdown footnote whose label is a `sources[].id`. Labels are keyed rather than positional because these documents get rewritten constantly.

A footnote definition carries the **locator within the Source** — slide range, section, page, timestamp. The `title` already lives in `sources[]`, and two copies of one field drift the moment either is edited.

```markdown
Splitting work so each piece can be accepted alone is what project management
has called a work breakdown structure since the 1950s.[^cpm-1959]

[^cpm-1959]: "History" section
```

Where a Source has no internal location, the locator names the specific claim it supports. Where one label is referenced from two claims, its single definition names the widest region covering both: a label is a `sources[].id` and stays one-to-one with it.

**Citation follows the claim, not the Beat.** A Beat asserting something about the world
cites it: the misconception, the explanation, the worked example, the limit of the method. An
uncited explanation is merely lucid — it raises how confident an audience feels without
raising what they know.

A Beat that states the analogy, names where the analogy stops mapping, or recommends what to
do next asserts nothing about the world. The analogy is the author's own and the Takeaway is
a recommendation, not a finding; neither has a source to key to, and demanding one pushes the
author toward a borrowed analogy the audience has never stood inside. There is no list of
exempt Beats and no count of them — the test is the claim.

A fact-stating beat with no footnote is unsupported. Mark it in place and leave `status: draft`:

```markdown
## Shown working

> **Unsupported** — no entry in `sources:` backs this beat.
> Needed: one case where decomposition by acceptance test changed a price.
```

## The theory/hands-on boundary

Every Episode carries one. It marks where theory stops and hands-on begins, decided when the Episode is authored rather than found later when a recording has to be cut.

It is the frontmatter field `theory_hands_on_boundary`, naming the Beat it falls after:

```yaml
theory_hands_on_boundary: after "Shown working"
```
