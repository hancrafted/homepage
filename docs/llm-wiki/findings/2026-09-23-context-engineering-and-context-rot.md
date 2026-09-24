---
type: Finding
title: What a context window holds and how performance degrades as it fills
description: >-
  What a context window holds and how an agent degrades as it fills, against the Day 1 and Day 3
  whitepapers. Lost in the Middle and Context Rot survive correction; the MCPVerse 18.2 per cent
  figure inverts its own source; endnotes 19 and 20 carry the wrong arXiv identifiers.
sources:
  - resource: docs/llm-wiki/raw/5-day-agents-vibecoding__day-1__the-new-sdlc-with-vibe-coding.pdf
    title: The New SDLC With Vibe Coding
  - resource: docs/llm-wiki/raw/5-day-agents-vibecoding__day-3__agent-skills.pdf
    title: Agent Skills
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-23T21:53:28Z
---

# What a context window holds and how performance degrades as it fills

The question: what does a context window actually hold, and by what mechanism does an agent's
performance fall as it fills — the mechanism that makes managing context necessary rather than
optional.

Two Raw answer it, and the ledger draws on both. **Day 1** below is
`5-day-agents-vibecoding__day-1__the-new-sdlc-with-vibe-coding.pdf`, which supplies the inventory
— what the window holds, and the static/dynamic split. **Day 3** is
`5-day-agents-vibecoding__day-3__agent-skills.pdf`, which supplies the degradation curve and the
studies under it. Locators are PDF page numbers in each document's own printed numbering, which
here matches the PDF page index.

Day 1's inventory is definitional and takes a quote and a locator only. Every Day 3 claim naming a
study, a benchmark or a number took a refutation search, run against the cited work itself and
against later results. Superscript endnote markers in the source are not reproduced inside the
quotes; the locator names the endnote instead.

## A context window holds six kinds of content, not one

- **Claim.** Day 1 decomposes the content of a context window into six named types — Instructions,
  Knowledge, Memory, Examples, Tools and Guardrails — so that "context" is an inventory of six
  distinguishable things rather than one undifferentiated blob of text.
- **Quote.**
  > "Developers must consider six primary types of context:
  >
  > - Instructions: The agent's core role, goals, and operational boundaries.
  > - Knowledge: Retrieved documents, architectural diagrams, and domain-specific data.
  > - Memory: Short-term session logs (what just happened) and long-term persistent state (what
  >   the project is).
  > - Examples: Few-shot behavioral demonstrations and codebase reference patterns.
  > - Tools: The precise definitions of the APIs, scripts, and external services the agent can
  >   invoke.
  > - Guardrails: Hard constraints, formatting rules, and safety validations."
- **Locator.** Day 1, `p15`.
- **Searched for.** Nothing. The claim carries no number, no date and no named study; it defines a
  vocabulary the rest of the whitepaper uses.
- **Came back.** No search ran.
- **Verdict.** `outside the bound`.

## The static/dynamic split is where the token cost is decided

- **Claim.** Each of the six types is either static — loaded on every turn and paid for on every
  turn — or dynamic, loaded on demand and paid for only when used; the placement of a given piece
  of context on that boundary is an engineering decision, not a property of the content.
- **Quote.**
  > "Static context is always loaded: system instructions, rule files (AGENTS.md, CLAUDE.md,
  > GEMINI.md), global memory, and persona definitions. It defines who the agent is and how it
  > behaves. Static context is expensive because every token is present in every interaction,
  > regardless of relevance.
  >
  > Dynamic context is loaded on demand: skill instructions triggered by task matching, tool
  > results retrieved during execution, documents fetched from RAG pipelines, and windowed session
  > history. Dynamic context is efficient because the agent pays the token cost only when the
  > information is needed."
- **Locator.** Day 1, `p16`. The trade-off is stated on the same page: "Too much static context
  wastes tokens and dilutes signals. Too little means the agent forgets critical rules."
- **Searched for.** Nothing. Definitional, and no number, date or named study attaches to it.
- **Came back.** No search ran.
- **Verdict.** `outside the bound`.

## Context overflow is named the most common production failure, ahead of hallucination

- **Claim.** The most common failure mode of agents in production is context overflow rather than
  hallucination, and it degrades output silently.
- **Quote.**
  > "The most common failure mode of agents in production is not hallucination. It is context
  > overflow: the model receiving more context than it can effectively use, and degrading silently
  > before the operator notices."
- **Locator.** Day 3, `p32`. The sentence carries no endnote; the two endnoted studies follow it
  on `p33` and neither measures failure frequency.
- **Searched for.** A published failure distribution for deployed agents that ranks failure modes,
  to see whether any puts context overflow first or hallucination above it.
- **Came back.** The largest annotated corpus found disagrees. MAST (Cemri et al.,
  `arXiv:2503.13657`, v3), built from 1,600-plus annotated traces across seven multi-agent
  frameworks with 14 failure modes in three categories, gives the frequency of each mode. The most
  frequent are step repetition at 15.7 per cent, reasoning-action mismatch at 13.2 per cent,
  failure to recognise task completion at 12.4 per cent and disobeying the task specification at
  11.8 per cent. The mode nearest to context overflow — "Loss of conversation history … unexpected
  context truncation" (FM-1.4) — is measured at 2.80 per cent, among the rarest in the taxonomy.
  MAST covers multi-agent systems on benchmark tasks rather than single-agent production traffic,
  so it does not settle the production question; it is, however, the only quantified distribution
  the search returned, and it points the other way. Nothing was found that ranks context overflow
  first. TRAIL (`arXiv:2505.08638`) offers a second error taxonomy for agentic traces but reports
  no comparable frequency ranking.
- **Verdict.** `corrected`. Context overflow as a real and silent degradation mode survives — the
  two studies on `p33` establish the degradation. The superlative does not: no evidence is offered
  in the Raw, and the one measured distribution found places the nearest mode at 2.80 per cent.
  What a Concept may carry is that context overflow degrades output silently and is easy to miss;
  it may not carry that it is the most common failure mode, or that it outranks hallucination.

## Position within the input governs retrieval, and long-context training does not remove the effect

- **Claim.** Liu et al.'s _Lost in the Middle_ finds retrieval accuracy highest when the relevant
  span sits at the start or end of the input and lowest in the middle, and the U-curve persists in
  models explicitly built for long contexts.
- **Quote.**
  > "Lost in the Middle (Liu et al., TACL 2024). Across multi-document QA and retrieval,
  > performance is highest when relevant information sits at the start or end of the input and
  > degrades in the middle; a U-curve that holds even for models trained on long contexts."
- **Locator.** Day 3, `p33`, with `endnote 19`.
- **Searched for.** A retraction, corrigendum or erratum against the TACL article; a later result
  reporting the U-curve absent in models trained on long contexts.
- **Came back.** No retraction. Crossref's record for `10.1162/tacl_a_00638` carries no
  `update-to` relation, and OpenAlex marks the work not retracted; it is TACL volume 12 (2024),
  pages 157–173, cited over 1,300 times. The characterisation is the paper's own: its abstract
  reads that performance "significantly degrades when models must access relevant information in
  the middle of long contexts, even for explicitly long-context models". Later work reproduces
  rather than contradicts it — _Found in the Middle_ (`arXiv:2406.16008`) opens by stating that
  models "even when specifically trained to process long input contexts, struggle to capture
  relevant information located in the middle", and the effect is still being attacked as an open
  problem in June 2026 (`arXiv:2606.27705`). One 2025 paper reframes the cause, arguing the
  behaviour is an adaptation to retrieval demands during pre-training rather than a flaw
  (`arXiv:2510.10276`), but it does not dispute the curve. Nothing found reports its absence.
- **Verdict.** `no correction found`.

## Context Rot: 18 models, but not 18 frontier models

- **Claim.** Chroma Research's _Context Rot_ measured 18 frontier models and found performance
  falling as input length grows with task difficulty held constant, worst where relevant content
  resembles the distractors around it.
- **Quote.**
  > "Context Rot (Chroma Research, 2025). Across 18 frontier models; Claude 4 Opus and Sonnet,
  > Gemini 2.5, Qwen3; performance degrades as input grows, even when task difficulty is held
  > constant. Every model gets worse, and faster when relevant content is hard to distinguish from
  > distractors. The noise typical of real agent contexts (tool outputs, half-relevant retrievals,
  > intermediate reasoning) is among the worst."
- **Locator.** Day 3, `p33`, with `endnote 20`. The figure caption on the same page repeats the
  descriptor: "the curve shows what 18 frontier models actually do (Liu et al. 2024; Chroma
  2025)".
- **Searched for.** A correction or withdrawal of the Chroma report; a later result disagreeing
  that performance degrades with input length at constant task difficulty; and the report's own
  model list, to check the count and the word "frontier".
- **Came back.** The report is live at `research.trychroma.com/context-rot`, dated 14 July 2025,
  by Kelly Hong, Anton Troynikov and Jeff Huber, with no correction or erratum notice. The
  mechanism survives intact and the methodological qualifier is the report's own: "We focus our
  experiments to isolate input length as a factor and maintain task difficulty as a constant."
  Later work treats context rot as established — `arXiv:2606.29718` calls it "a widely recognized
  issue" and adds that models "give up or provide uncertain incorrect answers long before
  exhausting the context window". The count and the descriptor do not survive together. The report
  says it evaluates "18 LLMs, including state-of-the-art GPT-4.1, Claude 4, Gemini 2.5, and Qwen3
  models"; its Models Tested list is Claude Opus 4, Claude Sonnet 4, Claude Sonnet 3.7, Claude
  Sonnet 3.5, Claude Haiku 3.5, o3, GPT-4.1, GPT-4.1 mini, GPT-4.1 nano, GPT-4o, GPT-4 Turbo,
  GPT-3.5 Turbo, Gemini 2.5 Pro, Gemini 2.5 Flash, Gemini 2.0 Flash, Qwen3-235B-A22B, Qwen3-32B
  and Qwen3-8B. Eighteen is right; GPT-3.5 Turbo, GPT-4 Turbo and Gemini 2.0 Flash are not
  frontier models at July 2025. The same list carries a qualifier the whitepaper drops: "Not all
  18 models are included in each experiment due to context window or thinking_budget constraints."
- **Verdict.** `corrected`. The mechanism, the constant-difficulty design, the distractor finding
  and the count of 18 all survive. "Frontier" does not, and neither does the figure caption's
  claim to show what all 18 do on one curve. What a Concept may carry is "across the 18 models
  Chroma evaluated, spanning GPT-3.5 Turbo to Claude Opus 4".

## Endnotes 19 and 20 point at the wrong papers

- **Claim.** A reader following Day 3's endnotes reaches the two studies on which the degradation
  argument rests.
- **Quote.**
  > "19. Liu et al., "Lost in the Middle" (TACL 2024). https://arxiv.org/abs/2601.06112
  >
  > 20. Chroma Research, "Context Rot" (2025). https://arxiv.org/abs/2601.17087"
  >
  > "15. https://arxiv.org/abs/2601.06112
  >
  > 16. https://arxiv.org/abs/2601.17087"
- **Locator.** Day 3, `endnote 19`, `endnote 20`, `endnote 15` and `endnote 16`, all on `p60`.
  Endnotes 15 and 16 are cited from `p27`, against ReliabilityBench and the "Lost in Simulation"
  finding respectively.
- **Searched for.** What each of the four identifiers resolves to, and the correct identifiers for
  the two works endnotes 19 and 20 name.
- **Came back.** The defect is real. `arXiv:2601.06112` is _ReliabilityBench: Evaluating LLM Agent
  Reliability Under Production-Like Stress Conditions_ (3 January 2026) — correct for endnote 15,
  wrong for endnote 19. `arXiv:2601.17087` is _Lost in Simulation: LLM-Simulated Users are
  Unreliable Proxies for Human Users in Agentic Evaluations_ (23 January 2026) — correct for
  endnote 16, wrong for endnote 20. Endnotes 19 and 20 name the right works in their prose and
  carry endnote 15's and 16's URLs, so the error is a duplication rather than a misattribution of
  the studies themselves. The correct identifiers are: _Lost in the Middle: How Language Models
  Use Long Contexts_, Liu, Lin, Hewitt, Paranjape, Bevilacqua, Petroni and Liang,
  `arXiv:2307.03172`, published as TACL volume 12 (2024), pages 157–173,
  `doi:10.1162/tacl_a_00638`; and _Context Rot: How Increasing Input Tokens Impacts LLM
  Performance_, Hong, Troynikov and Huber, Chroma Technical Report, 14 July 2025, at
  `research.trychroma.com/context-rot`, which has no arXiv identifier at all — the report's own
  BibTeX gives `trychroma.com/research/context-rot` as its URL. The whitepaper already holds the
  correct Chroma pointer at `endnote 13`, cited from `p25` for the same body of work, so the
  document contradicts itself between endnote 13 and endnote 20.
- **Verdict.** `corrected`. The studies are correctly named and correctly summarised; the
  identifiers under them are not. Anything citing Day 3's degradation argument must take the
  identifiers from this entry rather than from `endnote 19` or `endnote 20`.

## The MCPVerse 18.2 per cent inverts its own source on Claude-4-Sonnet

- **Claim.** MCPVerse measured an 18.2 per cent accuracy drop in Claude-4-Sonnet caused by tool
  proliferation and competition for context attention.
- **Quote.**
  > "MCPVerse noted an 18.2% accuracy drop in Claude-4-Sonnet due to tool proliferation and
  > context attention competition. Additionally, Chroma Research (2025) found that all frontier
  > models degrade as input grows, particularly when hindered by co-loaded noise."
- **Locator.** Day 3, `p25`, with `endnote 12` giving `arxiv.org/abs/2508.16260`.
- **Searched for.** Whether MCPVerse states an 18.2 per cent drop for Claude-4-Sonnet, whether it
  attributes any such drop to tool proliferation, and whether the paper has been revised or
  withdrawn.
- **Came back.** The endnote resolves correctly: `arXiv:2508.16260` is _MCPVerse: An Expansive,
  Real-World Benchmark for Agentic Tool Use_, v1 August 2025, v2 October 2025, not withdrawn. The
  string "18.2" does not appear anywhere in the paper. Its Table 2 gives Claude-4-Sonnet success
  rates of 62.3 in Oracle mode, 62.4 in Standard mode and 44.2 in Max-Scale mode; 62.4 minus 44.2
  is 18.2, so the figure is a difference in percentage points that the whitepaper reports as a
  percentage drop. The relative fall over the same interval is 29 per cent. More seriously, the
  direction is inverted at the point the whitepaper makes it. MCPVerse's own abstract reads that
  "while most models suffer performance degradation when confronted with larger tool sets, the
  agentic models, such as Claude-4-Sonnet, can effectively leverage expanded exploration spaces to
  improve accuracy", and its Figure 3 records Claude-4-Sonnet gaining +4.10 as the tool set grows
  from Oracle to Standard — one of only three models to improve. Claude-4-Sonnet is the paper's
  named counterexample to the degradation claim, not its illustration. The 18.2-point fall occurs
  only at Max-Scale, where all 65 MCP servers and 550-plus tools are mounted at roughly 140,000 to
  147,000 tokens, a configuration the paper reports only two of twelve models could complete at
  all. The paper attributes the difficulty to context length and API tool caps rather than to
  attention competition, a mechanism it does not name.
- **Verdict.** `corrected`. The number is traceable but is percentage points, not per cent, and is
  derived rather than stated. The attribution does not survive: the cited paper singles out
  Claude-4-Sonnet as the model that improves under tool proliferation. What a Concept may carry is
  "on MCPVerse, Claude-4-Sonnet fell from 62.4 to 44.2 when the tool set was expanded from 32 MCP
  servers to all 65, about 140,000 tokens of tool definitions". It may not carry that MCPVerse
  found Claude-4-Sonnet degraded by tool proliferation.

## The co-loading numbers are design targets, not measurements

- **Claim.** Production agents load 5 to 15 skills at once, and a skill body over 5,000 tokens
  that passes in isolation will cause context rot once co-loaded.
- **Quote.**
  > "Never evaluate a skill purely in isolation. Agents in production co-load 5 to 15 skills
  > simultaneously. A skill body exceeding 5,000 tokens might work perfectly alone, but it will
  > cause context rot when co-loaded."
- **Locator.** Day 3, `p25`. The same interval recurs in the Appendix A checklist as "Co-loaded
  with 5 to 15 frequently-active skills". Neither sentence carries an endnote.
- **Searched for.** A published measurement of how many skills a deployed agent loads at once, and
  any vendor or benchmark threshold at which a skill body is shown to degrade performance when
  co-loaded.
- **Came back.** No measurement of either number was found, and nothing disagrees with them.
  Anthropic, which publishes the Agent Skills format, states the 5,000-token figure as a design
  budget rather than a degradation threshold: its overview documents Level 2 as "Under 5k tokens"
  for the SKILL.md body and Level 1 metadata as "~100 tokens per Skill", and its best-practices
  page gives the operative limit in a different unit — "Keep SKILL.md body under 500 lines for
  optimal performance" — with the rationale "The context window is a public good". Neither page
  states how many skills are co-loaded in practice, and no benchmark found reports a co-loading
  count. The competition mechanism is corroborated in the literature without the numbers:
  `arXiv:2605.19330` states that "co-resident skills compete for limited context windows".
- **Verdict.** `no correction found`. The search returned nothing that contradicts either figure.
  What it also returned is that neither is a measurement: 5,000 tokens is the publisher's budget
  for a skill body, and the 5-to-15 interval rests on nothing this search could locate.

## Degradation begins far below the advertised window

- **Claim.** A model's advertised context capacity does not predict the input length at which its
  accuracy falls; a 1M-token window can degrade significantly at 50K tokens.
- **Quote.**
  > "Capacity is the wrong metric. A 1M-token window can show significant degradation at 50K
  > tokens."
- **Locator.** Day 3, `p35`. The supporting figure caption sits on `p33`: "As prompt size grows,
  accuracy on a fixed task degrades, long before the context window fills."
- **Searched for.** A long-context evaluation reporting a model holding performance flat up to or
  near its advertised capacity, which would make degradation at a twentieth of the window an
  outlier rather than the pattern.
- **Came back.** Nothing of the kind. Every benchmark found reports the opposite. RULER
  (`arXiv:2404.06654`), across 17 long-context models, finds that "despite achieving nearly
  perfect accuracy in the vanilla NIAH test, almost all models exhibit large performance drops as
  context length increases", and that of models claiming 32K or more, "only half maintain
  satisfactory performance at the length of 32K". NoLiMa (`arXiv:2502.05167`), across 13 models
  all claiming at least 128K, finds that "at 32K, for instance, 11 models drop below 50% of their
  strong short-length baselines", with GPT-4o falling from 99.3 per cent to 69.7 per cent. HELMET
  (`arXiv:2410.02694`), across 59 models, finds synthetic needle tests do not predict downstream
  performance at all. A 2026 study of deep-search agents reports models terminating early "long
  before exhausting the context window" (`arXiv:2606.29718`). None of these names the 50K figure,
  and the whitepaper cites none of them; what they establish is the shape the sentence asserts.
- **Verdict.** `no correction found`. The specific pairing of 1M and 50K is an illustration the
  Raw supplies without a citation, and no source was found that states it. The general form — that
  measured degradation begins at a small fraction of advertised capacity — is what the published
  benchmarks support.

The mechanism the question asks for is assembled from three of these entries and does not depend
on the two defective citations. Day 1 supplies the inventory and the static/dynamic boundary; _Lost
in the Middle_ supplies position sensitivity within a fixed input; _Context Rot_ supplies
length sensitivity at constant task difficulty. The claims that did not survive — the failure-mode
ranking, the MCPVerse attribution, and the endnote identifiers — are the whitepaper's framing
around that mechanism rather than the mechanism itself.
