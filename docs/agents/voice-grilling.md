# Voice grilling

How to run a grilling session in this project when the user is speaking rather than typing.

Derived from the `grilling` skill, repurposed for voice. It keeps the design tree and the frontier; it replaces the round format, and it drops the sub-agent fact-finding the original depends on.

## When this applies

Only when the user asks for a grilling session **and** is dictating. Trigger phrases: "grill me", "let's grill", "grill this", or an explicit request to stress-test a plan or decision out
loud.

Everything below is inert otherwise. This document sits in project Context, so it loads into every conversation here — it must not shape ordinary chats.

## The channel constraint

The user is typically driving or commuting. They cannot read, scan back, re-read a question, or type. Every rule here derives from that, and if the constraint does not hold, most of the rules stop being justified.

Note what this costs. The original skill makes fact-finding the assistant's job and says to dispatch a sub-agent rather than ask the user. In a chat session there is no filesystem, no repo and no issue list, so facts about the tree have to come from the user — and the project's context.

Web-reachable facts remain the assistant's job: search rather than ask. Time the search — run it once a position is on the table, so the result tests the position rather than seeds it. Report what holds first, then what is challenged. One pass unless more is asked for.

## Calibration, asked once, as one batch

Ask three questions before anything else. Always these three, in this order. They are the deliberate exception to one-question-at-a-time: nothing is being decided, they are short, and a fixed set becomes automatic to answer.

1. **Abstraction level** — high-level architecture, or a concrete engineering decision?
2. **Target artefact** — what is this session aimed at producing? More than one is allowed.
3. **Time available** — roughly how long, and is it one stretch or split?

Abstraction level is the load-bearing one. It sets question density: high-level architecture branches indefinitely and needs fewer, wider questions; format-level decisions resolve in a turn each and can be worked quickly.

It is load-bearing throughout, not only at the start. Calibrating the level once does not fix it. When it shifts — from product into mechanics, from architecture into practical planning — say so and get agreement before continuing. When both levels are genuinely in play, make the split explicit: work at the practical level and harvest the abstract one from it.

When the target is a set, establish the order and the dependency during calibration — one artefact usually has to be settled before the next can be argued, the way a product vision has to precede the architectural one. Say which artefact is being worked on whenever that changes.

Time available decides how much of the tree to attempt. Whether it is contiguous decides where the handoff falls: a split session — out, a call, back — is the normal case, and it is what makes an early partial handoff worth producing rather than a concession.

**Do not ask what the opening prompt already answered.** If the user opened with "twenty minutes, high level, aiming at the vision doc," read back what was inferred and ask only for the gaps. Confirmation, not interrogation.

## One question at a time

Keep the frontier — every decision whose prerequisites are settled — as private bookkeeping. Classify it first: speak only a question whose answer changes a seam or boundary, the software or information architecture, a term in `CONTEXT.md`, or what a future agent session does. Decide the rest yourself and carry them to the handoff. This restates the classification in `docs/agents/grilling-format.md`, because a voice session may have no filesystem to open it from.

Never read the frontier out as a list unless the user ask for it specifically. Five open questions cannot be held in working memory while driving, and there is no transcript to scan back through.

Ask one question. Give a recommended answer, as the original skill requires. Then stop.

State position aloud when a decision lands, briefly: "that settles the config shape, three still open, next is naming." That gives the orientation a numbered round would have given, without requiring anything to be retained.

### Which question comes next

The original never needed an ordering rule — order did not matter when a whole round was visible at once. Flattening created the gap. This rule is a proposal, not a settled decision:

1. Prefer the most consequential question, so time running out costs the cheap end.
2. Break ties toward the question that unblocks the most others. Answering it collapses the most tree.
3. Defer anything needing a fact neither party has to hand, and say it is deferred.

## Advancing: "let's move on"

Advances only until the user says a longer confirmation like **"let's move on."** or **"let's continue."**

Deliberately not One syllable, and plausibly a mis-transcription of something else. Three words will not appear by accident.

**This reason is part of the rule.** Without it the phrase gets shortened for convenience later, and the failure it prevents returns silently.

## While a question is open

Brief acknowledgement only — "mm", "right". Nothing else.

No follow-up question. No summary. No suggestion. No moving to the next question.

In audio, thinking out loud is indistinguishable from having finished, and advancing early is the specific observed failure this guards. Pure silence was considered and rejected: it cannot be told apart from a dropped connection.

A read-back of what was understood is allowed when a decision appears to have landed, but it ends by going quiet — not by asking whether to move on. Putting a question in front of the user every turn is its own kind of noise.

**A request to repeat is always honoured, and never counts as advancing.** Repeat the question and the recommendation as they were given. A paraphrase or a shortened repeat drops exactly the part that was missed, which is the whole reason the repeat was asked for. Add nothing new. The user lost a turn to a dropped connection or to the road; they did not take one.

_Provisional. Adopted to try, not on conviction._

## Vocabulary

`CONTEXT.md` is the glossary. Use it in one direction only.

- Silently use the defined term. Never invent a synonym.
- A single use of an avoid-list word gets no correction. It is probably just speech.
- Raise it only on **repeated** use — which may mean the glossary entry is wrong rather than the speaker.
- Never let vocabulary drift become its own conversation mid-session. Note genuinely new terms for the handoff instead.

## The handoff is the deliverable

The session is not the artefact. The user leaves voice mode, types a short prompt, and the output is a structured prompt they paste into a Cowork or Claude Code session.

One handoff per target artefact, produced once that artefact's decisions are settled rather than banked until the end of the session.

Three parts:

1. **Settled decisions, each with the reasoning that produced it.** Tag each one decided without asking _agent-decided_, so the user can contest it in the receiving session.
2. **Open questions, marked as open** — so the receiving agent does not assume they were decided.
3. **The concrete next action** — files to change, issues to file, whatever the session aimed at.

The reasoning is not optional. A decision without its "why" gets silently reversed by the next agent that reads it.

State any premise the design rests on, so a later reader can invalidate it rather than inherit it unknowingly.

**Read the handoff back in sections, pausing between them.** A long unbroken read-back in audio costs more attention than it returns, and the user cannot scan back to the part they wanted. On a correction, read back only the sections that changed. Offer a full re-read at the end rather
than performing one by default.

## Ending

The original ends when the frontier is empty. Voice sessions end when the commute does, which is usually sooner.

When time is nearly up, or the session is cut short, produce the handoff with what exists. A partial handoff naming three settled decisions and six open questions is worth more than an abandoned session. Never present an unfinished tree as a finished one.

Do not act on the outcome until the user confirms shared understanding has been reached.

## Known gaps

- The ordering rule above is a proposal, never tested.
- Acknowledgement-only is untested in a real commute.
- Resuming across two commutes is half addressed: calibration now surfaces the split, and the answer is still to produce the handoff early and open the next session by reading it back. Neither half has been run.
- The domain-modelling half of `grill-with-docs` is not accounted for here.
