---
type: memory
generated:
  at: 2026-09-23T20:58:39Z
  by: anthropic/claude-opus-5
stale_after: 2026-10-23T00:00:00Z
---

# Vocabulary

This glossary fixes the words for the things this repository makes, so every agent and every output names them the same way.

An `_Avoid_` list names words rejected **as the name for that concept**. Those words keep
their own meanings elsewhere — `script` is avoided as a name for a Manuscript, and stays
correct for an npm script or for JavaScript.

## What gets made

**Episode**:
One authored unit, medium-neutral, in exactly one Format, holding the researched content
isolated from how it is rendered. Drafted from the llm-wiki and cites it; every artefact an
audience consumes is generated from Episodes.
_Avoid_: piece, entry, work, topic, video, content

**Format**:
The kind an Episode is — Foundations or Teardown. Fixes its job, its length and its Beats.
_Avoid_: type, category, genre

**Foundations**:
A Format. One durable principle, shown working, ending in a Takeaway.

**Teardown**:
A Format. A real artefact from real work — a Deck, a messy repo, a prompt that failed —
shown for what is wrong, why, and how it should have been done.

**Spine**:
The thesis and the analogy an Episode declares in its frontmatter. Fixed before any prose is
written, and the line every Beat returns to.
_Avoid_: outline, angle, hook, premise

**Beat**:
One section of an Episode, fixed by its Format. The `##` headings are the Beats; nothing
restates them.
_Avoid_: section, chapter, step, act

**Story Thread**: A line an Episode carries through its Beats — A the idea, B the human
stake. Declared in `story_threads:`. The Episode carries the material a storyline is drawn
from; the storyline itself is the Manuscript's.
_Avoid_: storyline, narrative, arc, red thread

**Subject domain**:
A field of practice an Episode shows its principle working in — sales, coaching, testing.
Declared in frontmatter as `subject_domains:`.
_Avoid_: domain unqualified, field, area, vertical

**Takeaway**:
The action an Episode ends on — attemptable with minimal effort, and enough to experience the
benefit first-hand rather than only to have followed an instruction.
_Avoid_: call to action, next step, exercise, homework

**Manuscript**:
The spoken text generated from an Episode, then hand-tailored for delivery — storytelling, timing, delivery cues. That tailoring exists nowhere else, so regenerating overwrites it.
_Avoid_: script, voice script, narration, transcript

**Deck**:
An HTML visual sequence generated from a Manuscript and statically rendered here. Carries a mostly-theory section of a Workshop. Has no markdown document of its own.
_Avoid_: slides, presentation, PowerPoint, pitch

**Slide**:
One unit of a Deck, carrying exactly one claim. A Beat renders as one or more Slides; a Beat
needing only one is a single Slide.
_Avoid_: screen, page, step

**Workshop**:
A live session delivered to Clients, composed from Decks that already exist.
_Avoid_: training, session, coaching, talk

## Who it is for

**Channel audience**:
International, English-speaking tech and tech-adjacent knowledge workers, weighted
tech-adjacent. What they currently believe is a hypothesis, and `docs/steering/product.md`
holds it. _Viewers_ is an acceptable alias in prose; this is the canonical name.
_Avoid_: subscribers, unqualified "audience"

**Business audience**:
Prospects for consulting and coaching, mainly in Germany, who read published work as a
credibility reference rather than as its target.
_Avoid_: leads, customers, unqualified "audience"

**Client**:
A member of the Business audience who has bought consulting or coaching. A Workshop is
delivered to Clients; published work is aimed at the Business audience.
_Avoid_: customer, account

## Where it comes from

**llm-wiki**:
The Knowledge layer of this repository, holding durable knowledge written for agent
consumption in three tiers — Raw, Finding and Concept. Anything generated from it cites it and is not part of it. The name is fixed, the `wiki` inside it notwithstanding.
_Avoid_: knowledge base, notes, second brain, wiki

**Raw**:
A source landed in this repository as it was found, written once at landing and never rewritten.
Everything else the llm-wiki holds is traceable back to one.
_Avoid_: source, artefact, primary, original

**Finding**:
One research question answered against Raw — what the sources say, quoted and located, claim by
claim. Appended to, never rewritten.
_Avoid_: note, research, report, summary

**Concept**:
A durable explanation of one idea, drawn from Findings and Raw, and rewritten whenever it is
revised. The only tier claiming to be currently true, and the only one carrying a human stamp.
_Avoid_: page, article, synthesis, entry

**Steering**:
The layer holding how decisions get made here — voice, mental models, design and technical
preferences, what counts as good research. Any agent reads it to decide, not only one writing
an Episode: the llm-wiki supplies what is true, Steering supplies how to choose.
`docs/steering/index.md` indexes it.
_Avoid_: style guide, prompt library, persona

## How it is kept

**Layer**:
One of the four divisions of this repository — Steering, Knowledge, Output, Governance —
each of which could become its own repository without moving a concept ID. `docs/steering/information-architecture.md` places them.
_Avoid_: folder, module, area

**Bundle**:
An Open Knowledge Format unit, one per content layer. A concept ID is its path within its bundle, minus `.md`.
_Avoid_: package, collection, namespace

**Publish bar**:
The tests an Episode passes before it ships, defined in `docs/steering/product.md`.
_Avoid_: quality bar, standard, criteria
