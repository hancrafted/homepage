---
type: steering
title: Product Vision
description: 'Three promises, the boundaries around them, and the reasoning each was derived from. Use it before proposing content, arguing scope, or judging whether an idea belongs here at all.'
generated:
  at: 2026-09-18T15:36:11Z
  by: anthropic/claude-opus-5
stale_after: 2026-09-21T00:00:00Z
---

# Product Vision

The North Star for the content and education effort. A steering document, not a spec.

## Deriving a decision from this

Run both tests before proposing anything.

1. **Does it further at least one promise?** If it furthers none, it does not belong here, however good it is on its own terms.
2. **Does it damage another?** Name every promise it works against and say how, then put the trade to the user. Choosing between promises is the user's call.

Two pairs pull hardest, and the reasoning below argues both. Leverage against Translation, in
every automation proposal: the creative core is ruled out of scope for automation. Translation against Credibility, whenever lead-gen messaging is proposed. Check those two first.

## The promises

Three promises, one per recipient. They are the closed set the test above runs over.

### Translation — to the channel audience

Agentic practice, Engineering Principles and System Thinking made legible and actionable to the channel audience: international, English-speaking tech and tech-adjacent knowledge workers — product owners, customer success, support, marketing.

Spoken as an engineer who translates: ~11 years full-stack — 7 as founding engineer in a
startup, 2 in an SME, 2 in enterprise — alongside sales, pre-sales, requirements engineering,
UX design, and some marketing and recruiting.

**Reasoning.** Purely technical channels tend to cap between 10k and 50k subscribers, and the
tech-adjacent audience is under-served. The span across the value chain is the differentiator:
examples come from lived experience on both sides rather than analogy-by-guesswork, which is
what makes the translation credible rather than condescending.

**The audience hypothesis.** They are already using agentic tools while holding a 2023
chat-model mental model. Unverified — see the premise at the end. It lives here rather than in
`CONTEXT.md` so that killing it never means editing the glossary.

### Credibility — to the business audience

Published work that stands as a reference for consulting and coaching, mainly Germany. A
separate stream, which uses Episodes as proof rather than being their target. Inbound from
outside Germany in English is welcome, not planned for.

**Reasoning.** Keeping the two audiences separate stops the channel being quietly bent toward
lead-gen messaging, which would make it worse content and worse proof at the same time.
Qualified leads beat raw views for this promise; subscriber count is a leading indicator for
Translation, not a goal for this one.

### Leverage — to myself

Output decoupled from hours. The llm-wiki and the content creation pipeline built here are a subgoal serving
the other two promises, and they are their own material: building this repository agentically produces Episodes.

**Reasoning.** Time does not scale, and coaching revenue is bounded by available hours.
Creative work — deciding the message, the shape, the framing — is not a target for automation,
though research and brainstorming should be supported by LLMs. Overhead is: chapter markers,
cross-linking, uploading, cross-posting, drafting LinkedIn posts.

## The boundaries

### Medium — audio-first

The argument carries in audio alone. Visuals reinforce it.

**Reasoning.** Audio-first content is listenable, suits the audience's context, and does not
conflict with the professional expectations of a business viewer — a good conference talk
already satisfies both. One production line, not two.

The same boundary governs the Deck: it must carry a live Workshop and will tend to grow past
what an Episode's visuals should be; audio-first holds it back.

### Format signature — analogy-led

Every Episode grounds the concept in an analogy the viewer already inhabits — the analogy is
half its Spine. It lands in the first Beat that argues rather than establishes: `Definitions`
opens both Formats and fixes vocabulary only, and a Teardown puts its artefact before anything
else. The analogy returns at every major turn of the Episode, and the actionable ending refers
back to it: _you wouldn't do this in the analogy — so what would you do here?_

**Reasoning.** The bet is that a grounding analogy is what makes a technical abstraction click
for a non-engineer. Unsourced, and the whole format signature rests on it.

### The two formats

| Format          | Length    | Job                                         | Takeaway |
| --------------- | --------- | ------------------------------------------- | -------- |
| **Foundations** | 10–20 min | Durable value, compounding traffic          | Required |
| **Teardown**    | 10–20 min | Credibility — real artefacts from real work | Required |

**Foundations** — one durable principle, shown working, ending in a Takeaway.

**Teardown** — a real artefact, a Deck, a messy repo, a prompt that failed: what is wrong, why,
and how it should be done. Drawn from everyday working experience.

**Reasoning.** Two formats, because a Teardown starts from an artefact that already exists — a
fundamentally different input from a Foundations Episode, and the reason the beats differ. That
is a format stressing the shape rather than dodging it, which is what a second one is for.

**A third was scoped and removed.** A short opinion-or-teaser format, one to two minutes, buying
reach and personality and traffic into the long Episodes. It accumulated three exemptions —
both Publish bar tests, the theory/hands-on boundary, and the Subject domain headings — and a
format defined by what does not apply to it is miscategorised rather than varied. Whether it
returns as a third Format or as something lateral to Formats is open, and reopens when reach
becomes a goal.
Removing it costs the traffic argument, which is a real cost against Translation, taken
knowingly.

### Publish bar — shelf life

Two tests, before an Episode ships:

1. Will the content still be correct in 12 months?
2. Does the Episode name at least one action with its object already supplied — not a
   procedure for deriving one — attemptable this week, needing no permission and no new
   tool?

Every Episode passes both. There is no exemption at this bar.

The durable material is the pre-hype canon — separation of concerns, design by contract,
decomposition, divide and conquer — translated for a non-engineering audience.

**Reasoning.** News-cycle content drives engagement on channels that already have traction;
without traction it decays where durable material compounds. It is also a positioning
advantage: showing that today's agentic practice is old ideas wearing new clothes is exactly
what a sceptical audience needs to hear. A bar with no carve-out is a constraint; one with a
carve-out drifts into a slogan.

## The horizons

- **12 months** — ~1,000 subscribers and ~20 Episodes published (Translation); the pipeline
  runs end-to-end from a fixed Spine to an unverified Episode (Leverage). Not from one prompt:
  fixing the Spine is the creative work Leverage's reasoning rules out of scope.
- **3 years** — ~50,000 subscribers (Translation). That is the top of the technical-channel
  ceiling named above, so hitting it proves reach, not yet the positioning.
- **Throughout** — manual effort per Episode trends down. Unmeasurable until the first Episode
  gives it a baseline in hours.
- **Credibility has no target.** It is the promise tied to revenue and the only one without a
  number. Naming one is open.

## Open questions

- Do Teardowns automate as deeply as Foundations Episodes? Lived-experience content is said to
  resist automation where structured educational content automates well — asserted, unsourced.
  If it holds, effort allocation differs by format.
- Does the substrate become the sellable product, with Episodes as its proof?
  `information-architecture.md` scopes the substrate as steering plus knowledge plus
  governance, which is wider than the llm-wiki alone. Until this is decided the substrate is a
  subgoal, and a proposal that treats it as a product is proposing a change to this document.
- How do the English channel and the German consulting stream feed each other? The language gap
  is the question: nothing here says how English-language proof converts a German-speaking
  prospect. Currently asserted, not designed.

## Premise this rests on

The tech-adjacent audience is real and reachable. The evidence is a limited sample of the
author's own conversations.

**What would kill it.** The first ten Episodes land and the audience that engages is the
technical one — same comments, same questions, same channels a purely technical channel would
draw. If the premise dies, the promises and the boundaries move together.
