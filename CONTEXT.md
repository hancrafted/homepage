---
type: memory
generated:
  at: 2026-09-16T00:00:00Z
  by: agent:anthropic/claude-opus-5
verified:
  at: 2026-09-16T00:00:00Z
  by: human:hancrafted
stale_after: 2026-12-16T00:00:00Z
---

# Homepage

A centralized space for creating content agentically: durable knowledge, Episodes derived
from it, and the site that publishes them. This glossary fixes the words for those things
so every agent and every output names them the same way.

## Language

An `_Avoid_` list names words rejected **as the name for that concept**. Those words keep
their own meanings elsewhere — `script` is avoided as a name for a Manuscript, and stays
correct for an npm script or for JavaScript.

### What gets made

**Episode**:
One authored unit, medium-neutral, in exactly one Format, holding the researched content
isolated from how it is rendered. Drafted from the llm-wiki and cites it; every artefact an
audience consumes is generated from it.
_Avoid_: piece, entry, work, topic, video, content

**Format**:
The kind an Episode is — Foundations, Teardown or Short. Fixes its job, its length, and
whether a takeaway is required.
_Avoid_: type, category, genre

**Foundations**:
A Format. One durable principle, shown working, ending in something a viewer can try.

**Teardown**:
A Format. A real artefact from real work — a Deck, a messy repo, a prompt that failed —
shown for what is wrong, why, and how it should have been done.

**Short**:
A Format. One to two minutes of opinion, or a teaser for another Episode in a longer Format.

**Manuscript**:
The spoken text generated from an Episode, then tailored for delivery (story telling, timing, delivery cues etc)
_Avoid_: script, voice script, narration, transcript

**Deck**:
An HTML visual sequence generated from an Manuscript, authored here and statically rendered. Can be used to deliver a (mostly theory) section in a Workshop.
_Avoid_: slides, presentation, PowerPoint, pitch

**Workshop**:
A live session delivered to Clients from one or multiple Decks, defined by material in this repository.
_Avoid_: training, session, coaching, talk

### Who it is for

**Channel audience**:
International, English-speaking tech and tech-adjacent knowledge workers, weighted
tech-adjacent, already using agentic tools while holding a 2023 chat-model mental model.
_Avoid_: subscribers, unqualified "audience"

**Viewers**:
See Channel audience. Interchangeable in prose; Channel audience is the canonical name.

**Business audience**:
Prospects for consulting and coaching, mainly in Germany, who read published work as a
credibility reference rather than as its target.
_Avoid_: leads, customers, unqualified "audience"

**Client**:
A member of the Business audience who has bought consulting or coaching. A Workshop is
delivered to Clients; published work is aimed at the Business audience.
_Avoid_: customer, account

### Where it comes from

**llm-wiki**:
The layer of this repository holding durable knowledge written for agent consumption.
Anything generated from it cites it and is not part of it.
_Avoid_: knowledge base, notes, second brain, wiki

**Publish bar**:
The tests an Episode passes before it ships, defined in `docs/visions/product.md`.
_Avoid_: quality bar, standard, criteria
