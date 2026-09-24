---
type: Finding
title: 'What an AI agent is: the loop, its parts, and the vocabulary'
description: >-
  What Google's Day 1 whitepaper says an AI agent is: the perceive-plan-act-observe loop and the
  parts beneath it. The five-part list contradicts itself and the four-element source it cites, and
  the endnote under it resolves to Karpathy's vibe-coding post rather than to that source.
sources:
  - resource: docs/llm-wiki/raw/5-day-agents-vibecoding__day-1__the-new-sdlc-with-vibe-coding.pdf
    title: The New SDLC With Vibe Coding
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-24T10:12:00Z
---

# What an AI agent is: the loop, its parts, and the vocabulary

The question: what does the course establish an AI agent to be — the loop it runs, the parts it is
assembled from, and the terms a reader needs in hand before anything else in the series is legible.

One Raw answers it: `5-day-agents-vibecoding__day-1__the-new-sdlc-with-vibe-coding.pdf`, Google,
May 2026, principally pp10–14, where the section "The shift from syntax to intent" sets out the
definition. The harness section at pp26–28 is read against it, because it gives a second inventory
of the same thing and the two are never set side by side. Locators are PDF page numbers; this
document prints the same numbers it indexes, so `p11` names both.

Ten claims follow. The definitional ones — what an agent is, what the loop is, what the spectrum
is — take a quote and a locator and no search, which is why three verdicts read `outside bound`.
Every claim carrying a date or a named publication took a search for correction: the November 2025
whitepaper the parts list is attributed to, and Andrej Karpathy's two posts. Superscript endnote
markers are not reproduced inside the quotes; where a marker matters it is named in the locator.

## An agent is a loop with a stopping condition, not a turn-taking responder

- **Claim.** An AI agent is a software system that runs its own loop toward a goal — perceive,
  plan, act through tools, observe, iterate — and stops on a condition rather than on the user's
  next prompt. That is what separates it from a chatbot.
- **Quote.**
  > "An AI agent is a software system that perceives a goal, plans steps to reach it, takes actions
  > through tools, observes the results, and iterates until the goal is met or it hits a stopping
  > condition. Where a chatbot produces a response and waits for the next prompt, an agent runs its
  > own loop. You give it a goal at the top, then it decides what to do next at each step."
- **Locator.** p10, under "AI Agents: A Quick Refresher". Figure 2 sits directly beneath it,
  captioned "The Agent Loop - Perceive, plan, act, observe, iterate", and draws four stations —
  Perceive Goal, Plan Steps, Act (Tools), Observe Results — entered from "User prompt / task
  specification", left by "Termination condition met → output delivered", with the ring labelled
  "Self-Correcting" and a dashed edge back to Plan Steps marked "Result unsatisfactory → re-plan".
- **Searched for.** Nothing. The claim carries no number, no date and no named study; it fixes the
  vocabulary the rest of the paper and the rest of the course use.
- **Came back.** No search ran.
- **Verdict.** `outside bound`.

## The five step names are the cited whitepaper's, with the attribution dropped

- **Claim.** The loop has five steps, and they are named "get the mission, scan the scene, think it
  through, take action, observe and iterate".
- **Quote.**
  > "These four parts work together in a continuous loop: get the mission, scan the scene, think it
  > through, take action, observe and iterate. The loop is the beating heart of every agent.
  > Everything else in this paper, and everything in the rest of the course, is a variation on this
  > loop."
- **Locator.** p11, closing the parts list. The count in its first clause is a separate claim and
  has its own entry below.
- **Searched for.** Whether the November 2025 whitepaper named on the same page states this loop
  and in these words, and whether Figure 2's four stations contradict the five steps.
- **Came back.** The words are that whitepaper's, verbatim. Google's _Introduction to Agents: From
  Predictive AI to Autonomous Agents_, November 2025, 54 pages, published on Kaggle at
  `kaggle.com/whitepaper-introduction-to-agents`, writes at its p11 that the loop "can be broken
  down into five fundamental steps as discussed in detail in the book Agentic System Design" and
  names them "1. Get the Mission … 2. Scan the Scene … 3. Think It Through … 4. Take Action … 5.
  Observe and Iterate". Day 1 reproduces all five names and drops the onward attribution, so a
  reader cannot tell the loop is borrowed. Figure 2 does not contradict it: its Perceive Goal
  station merges steps 1 and 2, which is a compression rather than a disagreement. One defect
  belongs to the source rather than to Day 1 — the endnote under "Agentic System Design" in
  _Introduction to Agents_ resolves to a book titled _Agentic Design Patterns_.
- **Verdict.** `no correction found`.

## Five parts, then four parts, on one page

- **Claim.** Every agent is built from five parts, and the November 2025 _Introduction to Agents_
  whitepaper covers each of them in depth.
- **Quote.**
  > "Every agent, however simple or sophisticated, is built from five parts. The November 2025
  > Introduction to Agents whitepaper covers each in depth. For our purposes here, the short
  > version:"
- **Locator.** p11, opening the section; the bullets that follow name the model, tools, memory,
  orchestration and deployment. The contradicting sentence — "These four parts work together in a
  continuous loop" — closes the same page, eight lines below.
- **Searched for.** What the named whitepaper actually counts, and whether Day 1's "four" is a
  typographic slip or the residue of a different source count.
- **Came back.** It is a residue. _Introduction to Agents_ states at its p8: "In the simplest
  terms, an AI Agent can be defined as the combination of models, tools, an orchestration layer,
  and runtime services which uses the LM in a loop to accomplish a goal. These four elements form
  the essential architecture of any autonomous system." Its four are The Model ("The Brain"), Tools
  ("The Hands"), The Orchestration Layer ("The Nervous System") and Deployment ("The Body and
  Legs"). Four of Day 1's five bullets are those four, in that order, reworded. The trailing "These
  four parts" is therefore the source's count left standing under a sentence that had been raised
  to five, not a misprint: both numbers are correct about a different document.
- **Verdict.** `corrected`. The whitepaper Day 1 cites names four elements, not five, so "built
  from five parts … covers each in depth" does not survive as stated. What may be carried is that
  Google's November 2025 architecture is four elements — model, tools, orchestration layer,
  deployment — and that Day 1 divides it into five. The five-part list is this paper's own cut and
  has to be named as such.

## Memory is the fifth part only in this paper

- **Claim.** Memory is a part of an agent coordinate with the model, tools, orchestration and
  deployment.
- **Quote.**
  > "Memory is the state. It allows the agent to recall past interactions, retrieve
  > project-specific rules, and retain context across sessions so it never starts from a blank
  > slate."
- **Locator.** p11, third bullet of five.
- **Searched for.** Whether the cited whitepaper treats memory as a top-level component or places
  it inside one, and whether anything in Day 1 itself carries memory as a part elsewhere.
- **Came back.** The source houses it inside orchestration. _Introduction to Agents_, pp8–9: "The
  Orchestration Layer (The 'Nervous System'): The governing process that manages the agent's
  operational loop. It handles planning, memory (state), and reasoning strategy execution. … This
  layer is also responsible for giving agents the memory to 'remember.'" Memory appears there as a
  responsibility of the orchestration layer and never as an element beside it, which is exactly the
  slot Day 1's own orchestration bullet leaves empty by assigning it context assembly and dispatch
  only. Day 1 does not carry memory anywhere else either: the harness inventory at p28, its second
  account of what an agent is made of, has no memory component at all.
- **Verdict.** `corrected`. The elevation is Day 1's own editorial act, not the cited paper's, and
  it is the single difference that turns four elements into five. Nothing found disputes that
  agents have memory; what does not survive is the attribution, and a Concept may not write "the
  November 2025 whitepaper covers memory as one of five parts".

## The endnote under the parts list resolves to Karpathy's vibe-coding post

- **Claim.** A reader following the citation on the parts list reaches the November 2025
  _Introduction to Agents_ whitepaper.
- **Quote.**
  > "2. Karpathy, A., "Vibe Coding," X/Twitter post, February 2025. https://x.com/karpathy/
  > status/1886192184808149383; Wikipedia, "Vibe coding," https://en.wikipedia.org/wiki/Vibe_coding"
  >
  > "11. Google, "Introduction to Agents," Agents Whitepaper Series, November 2025."
- **Locator.** The marker is superscript 2, at p11, on "covers each in depth". Both endnotes are at
  p49. Endnote 11 is cited once in the document, from p26, against the harness sentence.
- **Searched for.** What endnote 2 resolves to, where endnote 11 is cited from, and whether either
  yields a retrievable pointer to the whitepaper the sentence names.
- **Came back.** The marker is off by nine. Endnote 2 is Karpathy's X post of 2 February 2025 plus
  the Wikipedia article on vibe coding; it is the correct endnote for the quotation one page later
  at p12, where it is also cited, and has nothing to do with agent architecture. Endnote 11 is the
  whitepaper and is reached only from p26. The error is survivable but not silently: endnote 11
  carries no URL, and neither does endnote 17, which names the same whitepaper's multi-agent
  section, so the one citation in Day 1 that would settle the parts count is unlinked in both of
  its appearances. The whitepaper is retrievable — Kaggle publishes it at
  `kaggle.com/whitepaper-introduction-to-agents`, and its pages are footed "November 2025".
- **Verdict.** `corrected`. The correct endnote for the parts list is 11, not 2, and following the
  printed marker lands on a source that says nothing about the claim it is attached to.

## Vibe coding: February 2025, Karpathy, quoted verbatim

- **Claim.** In February 2025 Andrej Karpathy posted the description that named vibe coding, and
  the words Day 1 quotes are his.
- **Quote.**
  > "In February 2025, Andrej Karpathy posted a description of a new way of programming that
  > resonated widely across the software engineering community. He described an approach where you
  > "fully give in to the vibes, embrace exponentials, and forget that the code even exists." In
  > this mode, a developer describes what they want in natural language, accepts the AI's output,
  > and when something breaks, copies the error message back into the prompt and asks the AI to fix
  > it."
- **Locator.** pp11–12, spanning the page break; the sentence carries endnote 2 at p49.
- **Searched for.** A different date, a different author, or a different wording for the post; and
  any later statement by Karpathy withdrawing or restating the coinage.
- **Came back.** Nothing disagrees. The post is `x.com/karpathy/status/1886192184808149383`, dated
  2 February 2025, and opens: "There's a new kind of coding I call 'vibe coding', where you fully
  give in to the vibes, embrace exponentials, and forget that the code even exists." The clause Day
  1 quotes is verbatim and in order. The sentence after the quote is a fair compression of the same
  post — "I 'Accept All' always, I don't read the diffs anymore. When I get error messages I just
  copy paste them in with no comment, usually that fixes it." Karpathy restated rather than
  withdrew it a year later, calling the original "a shower of thoughts throwaway tweet that I just
  fired off without thinking". The Wikipedia article endnote 2 also names records the same February
  2025 coinage and the same quoted clause.
- **Verdict.** `no correction found`.

## Karpathy picked "agentic engineering", he did not introduce it

- **Claim.** By early 2026 Karpathy acknowledged that his original framing was too narrow and
  introduced the term "agentic engineering" for the disciplined end of the spectrum.
- **Quote.**
  > "By early 2026, Karpathy himself acknowledged that the original framing was too narrow,
  > introducing the term "agentic engineering" to describe the more disciplined end of the
  > spectrum."
- **Locator.** p12, carrying endnote 4; endnote 4 at p49 reads "Karpathy, A., "From Vibe Coding to
  Agentic Engineering," 2026; The New Stack, "Vibe Coding is Passe,"
  https://thenewstack.io/vibe-coding-is-passe/".
- **Searched for.** The Karpathy work endnote 4 names; whether he introduced the term or adopted
  it; and whether he described the original framing as too narrow.
- **Came back.** The date holds and both verbs fail. The post is
  `x.com/karpathy/status/2019137879310836075`, 4 February 2026, and its operative sentence reads:
  "Many people have tried to come up with a better name for this to differentiate it from vibe
  coding, personally my current favorite 'agentic engineering'". He presents the term as his pick
  from names other people had proposed, which is the opposite of introducing it. Nor does he call
  the original framing too narrow; what he says is that "at the time, LLM capability was low enough
  that you'd mostly use vibe coding for fun throwaway projects, demos and explorations" and that
  "Today (1 year later), programming via LLM agents is increasingly becoming a default workflow for
  professionals, except with more oversight and scrutiny" — a claim about how the practice moved,
  not about how the word was wrong. No work titled "From Vibe Coding to Agentic Engineering" was
  found; endnote 4 gives that title with no URL, and its second half, The New Stack's "Vibe coding
  is passé", is a report of that same post. Addy Osmani, one of Day 1's three named authors,
  published "Agentic Engineering" at `addyosmani.com/blog/agentic-engineering/` on 4 February 2026,
  links that same post, writes "Andrej Karpathy suggested 'agentic engineering' this week and I
  think I like it", and records that Simon Willison had already proposed "vibe engineering" for the
  same thing. That post is Day 1's endnote 3.
- **Verdict.** `corrected`. What may be carried is that on 4 February 2026 Karpathy named "agentic
  engineering" as his preferred term for professional, agent-driven programming, choosing among
  names others had proposed. It may not be carried that he introduced the term, or that he called
  his 2025 framing too narrow.

## The spectrum has three bands, and the middle one is labelled twice

- **Claim.** Vibe coding and agentic engineering are endpoints of a spectrum rather than a binary,
  the band between them is Structured AI-Assisted Coding, and the differentiator is how much
  structure, verification and human judgement surrounds the output rather than whether AI is used.
- **Quote.**
  > "Rather than treating vibe coding and agentic engineering as a binary, we find it more useful
  > to think of them as endpoints on a spectrum. The key differentiator is not whether you use AI.
  > It's how much structure, verification, and human judgment surrounds the AI's output."
- **Locator.** p12. Table 1 at p13 works the three bands across six dimensions — intent
  specification, verification, codebase understanding, error handling, appropriate scope, risk
  profile. Figure 3 at p14 draws the same three bands on a gradient from "Less structure, more
  speed" to "More structure, more reliability".
- **Searched for.** Nothing. The paper is declaring its own taxonomy; the claim carries no number,
  no date and no named study.
- **Came back.** No search ran. Two things are worth recording without one. Table 1 labels the
  middle band "Structured AI-Assisted Coding" and Figure 3, one page later, labels it "Structured
  AI-Assisted", so the one new term the taxonomy introduces is printed two ways in two pages.
  And the taxonomy's terms are a self-citation: endnote 3, beneath "agentic engineering", is a blog
  post by Addy Osmani, who is the first-named author of Day 1.
- **Verdict.** `outside bound`.

## Verification is the differentiator: tests for the deterministic half, evals for the rest

- **Claim.** What separates the two ends of the spectrum is how outputs get verified: tests check
  the deterministic parts, evaluations check the non-deterministic ones, and without both the
  practice is vibe coding however sophisticated the prompting.
- **Quote.**
  > "The single biggest differentiator between the two ends is how outputs get verified. In vibe
  > coding, verification is optional; the developer runs the code and checks if it seems right. In
  > agentic engineering, two mechanisms work together. Tests verify the deterministic parts of the
  > system: a function given this input produces that output. Evaluations, or evals, verify the
  > parts that are not deterministic: did the agent take the right trajectory of steps, choose the
  > right tools, and produce a final response that meets the quality bar. Tests are checked by
  > code; evals are checked by labelled datasets, scoring rubrics, and LM judges. Without both, the
  > practice is always vibe coding, regardless of how sophisticated the prompts are."
- **Locator.** pp14–15, spanning the page break. Figure 3's own header at p14 states the same
  thing: "The differentiator is not whether you use AI — it's how outputs get verified."
- **Searched for.** Nothing. A definition of two verification mechanisms against each other,
  carrying no number, no date and no named result.
- **Came back.** No search ran.
- **Verdict.** `outside bound`.

## Agent = Model + Harness is a second inventory, and endnote 11 does not support it

- **Claim.** A raw model is not an agent until a harness surrounds it, and the account of that
  harness is drawn from the November 2025 _Introduction to Agents_ whitepaper.
- **Quote.**
  > "The model is one input into a running agent. Everything else, the prompts, the tools, the
  > context policies, the hooks, the sandboxes, the sub-agents, the observability, is the harness:
  > the scaffolding wrapped around the model that lets it actually finish something."
  >
  > "A raw model is not an agent. It becomes one once a harness gives it state, tool execution,
  > feedback loops, and enforceable constraints."
- **Locator.** p26, where the first sentence carries superscript 11, and p27. Figure 7 between them
  is captioned "Harness Anatomy | Agent = Model + Harness". The six components are listed at p28 —
  instructions and rule files, tools, sandboxes and execution environments, orchestration logic,
  guardrails or hooks, observability.
- **Searched for.** Whether the cited whitepaper uses "harness" as a term, states the equation, or
  carries a comparable component list.
- **Came back.** It does none of the three. "Harness" occurs once in the 54 pages of _Introduction
  to Agents_, in its closing sentence, as the verb "harnessing the full power of agentic AI"; there
  is no noun sense, no equation and no six-part inventory. The framing is Day 1's own. The
  consequence for this question is larger than the citation: Day 1 now holds two accounts of what
  an agent is made of, fifteen pages apart, neither referring to the other. p11 gives model, tools,
  memory, orchestration, deployment. pp26–28 give a model plus six harness components. Memory is in
  the first and absent from the second; observability, guardrails and sandboxes are in the second
  and absent from the first; deployment in the first is replaced in the second by "sandboxes and
  execution environments", which names where code runs rather than how a prototype becomes a
  service. Nothing in the paper reconciles them.
- **Verdict.** `corrected`. The equation and the six components are this paper's contribution and
  must be cited to it. Endnote 11 does not carry them, and a Concept attributing "Agent = Model +
  Harness" to Google's November 2025 whitepaper would be attributing it to a document that does not
  contain the word.

## What a reader can carry

The loop survives every search run here. An agent takes a goal, assembles context, calls a model,
acts through tools, observes what came back, and repeats under a stopping condition — that much is
stated in Day 1, drawn from the November 2025 whitepaper it cites, and named there in the same five
words Day 1 reuses.

The count of its parts does not survive. Day 1 says five in one sentence and four in the next, and
the second number is the one its cited source defends: model, tools, orchestration layer,
deployment, with memory a responsibility inside orchestration rather than a peer of it. Fifteen
pages later the same paper describes the same object as a model plus six harness components, an
inventory that shares only two entries with the first. A reader can safely carry the four elements
as Google's and the loop as the course's spine; the five-part list and the harness anatomy are both
this paper's own and have to be named as such rather than cited upward.

The vocabulary for the practice is in the same position. Vibe coding is Karpathy's, February 2025,
and the whitepaper quotes him accurately. Agentic engineering is a term he endorsed on 4 February
2026 and not one he introduced, and the spectrum the two terms bracket — with structured
AI-assisted coding between them — is the taxonomy of the paper's own first author, not a finding
about the field.
