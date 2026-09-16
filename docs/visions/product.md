---
type: vision
generated:
  at: 2026-09-16T00:00:00Z
  by: agent:anthropic/claude-opus-5
verified:
  at: 2026-09-16T00:00:00Z
  by: human:hancrafted
stale_after: 2026-09-30T00:00:00Z
---

# Product Vision

The North Star for the content and education effort. A steering document, not a spec.

Every decision below carries the reasoning that produced it. A decision without its why
gets silently reversed by the next agent that reads it.

## Deriving a decision from this

Run both tests before proposing anything this document governs.

1. **Does it further at least one promise?** If it furthers none, it does not belong
   here, however good it is on its own terms.
2. **Does it damage another?** Name every promise it works against and say how, then put
   the trade to the user. Choosing between promises is the user's call.

Leverage pulls against Credibility in nearly every automation proposal. Check that pair
first.

## The promises

Three promises, one per recipient. They are the closed set the test above runs over.

### Translation — to the channel audience

Agentic practice made legible to international, English-speaking tech and tech-adjacent
knowledge workers: product owners, customer success, support, marketing.
The hypothesis is that they are already using agentic tools while holding a 2023 chat-model mental model.

Spoken as an engineer who translates — grounded in ~10 years full-stack engineering plus
sales, pre-sales, requirements engineering, UX design and some experience in marketing and recruiting.
7 years experience as founding engineer in a startup and 2 in SME and 2 in enterprise.

**Reasoning.** Pure engineering content is crowded, and channels that stay purely
technical tend to cap between 10k and 50k subscribers.
Hypothesis is that the tech-adjacent gap is real and under-served with authentic high-quality content.
The span across the value chain is the differentiator: examples come from lived experience
on both sides rather than analogy-by-guesswork, which is what makes the translation credible rather than condescending.

### Credibility — to the business audience

Published work that stands as reference for consulting and coaching, mainly Germany.
A separate stream, which uses Episodes as proof rather than being their target. Inbound
from outside Germany in English is welcome, not planned for.

**Reasoning.** Keeping the two audiences separate is what stops the channel being quietly
bent toward lead-gen messaging, which would make it worse content and worse proof at the
same time. Qualified leads beat raw views for this promise; subscriber count is the
leading indicator, not the goal.

### Leverage — to myself

Output decoupled from hours. The llm-wiki + agentic content-creation system/pipeline built here is a subgoal serving the other two
promises, and it is its own material: building this repository agentically produces Episodes.

**Reasoning.** Time does not scale, and coaching revenue is bounded by available hours.
Creative work — deciding the message, the shape, the framing — is not the target of
automation, although research, brainstorming should be supported by LLMs and AI tools.
Overhead is: chapter markers, cross-linking, uploading, cross-posting, drafting LinkedIn posts,...

Whether the llm-wiki becomes a sellable product in its own right is open. Until it is
decided, it is a subgoal, and a proposal that treats it as a product is proposing a
change to this document.

## The boundaries

### Medium — audio-first

The argument carries in audio alone. Visuals reinforce it. Default length 10–20 minutes.

**Reasoning.** Audio-first content is listenable, which suits the audience's context, and
it does not conflict with the professional expectations of a business viewer — a good
conference talk already satisfies both. One production line, not two.

The same boundary governs a Deck. A Deck that must carry a live Workshop will tend to
grow past what an Episode's visuals should be; audio-first is what holds it back.

### Format signature — analogy-led

Every Episode opens by grounding the concept in an analogy the viewer already inhabits.
The analogy runs as a red thread through the whole Episode, and the actionable ending
refers back to it: _you wouldn't do this in the analogy — so what would you do here?_

**Reasoning.** This is the mechanism that makes abstract and technical concepts land for a
non-engineering audience. It is the core signature, not a stylistic preference.

### The three formats

| Format          | Length    | Job                                                | Takeaway |
| --------------- | --------- | -------------------------------------------------- | -------- |
| **Foundations** | 10–20 min | Durable value, compounding traffic                 | Required |
| **Teardown**    | 10–20 min | Credibility — real artefacts from real work        | Required |
| **Short**       | 1–2 min   | Reach, personality, traffic into the long Episodes | Optional |

**Foundations** — one durable principle, shown working, ending in something the viewer
can try.

**Teardown** — a real artefact, a Deck, a messy repo, a prompt that failed: what is wrong,
why, and how it should be done. Drawn from everyday working experience.

**Short** — opinion. Shorter shelf life is accepted here.

**Reasoning.** Separating the formats caps the shelf-life risk of opinion content inside
the format that is cheapest to produce, while feeding traffic to the durable Episodes. It
also makes the pipeline question tractable: a Teardown starts from an artefact that
already exists, which is a fundamentally different input than a Foundations Episode.

### Publish bar — shelf life

Two tests, before an Episode ships:

1. Will the content still be correct in 12 months?
2. Is the proposed action/solution at the end accessible and practical to the channel audience?

A Short is exempt from both. This is the only exemption.

The durable material is the pre-hype canon — separation of concerns, design by contract,
decomposition, divide and conquer - translated for a non-engineering audience.
Graph Engineering is just project and schedule management of tasks (e.g. Critical Path Method).

**Reasoning.** News-cycle content drives engagement for channels that already have
traction; without traction it decays before it compounds. It is also the positioning
advantage: showing that today's agentic practice is old ideas wearing new clothes is
exactly what a sceptical audience needs to hear. Naming the Short exemption explicitly is
what keeps the bar a constraint rather than a slogan.

## The horizons

- **12 months** — ~1,000 subscribers, ~20 Episodes published, content-creation pipeline that technically can generate an (unverified) Episode or Workshop from one prompt
- **3 years** — ~50,000 subscribers.
- **Throughout** — manual effort per Episode trends down.

## Open questions

- Do Teardowns automate as deeply as Foundations Episodes? Lived-experience content is
  reported to resist automation where structured educational content automates well. If
  that holds, effort allocation differs by format.
- Does the llm-wiki become the sellable product, with Episodes as its proof?
- How do the international channel and the German consulting stream feed each other in
  practice? Currently asserted, not designed.

## Premise this rests on

The tech-adjacent audience is real and reachable. The evidence is a limited sample of the
author's own conversations. If the premise is wrong, the promises and the boundaries move
together.
