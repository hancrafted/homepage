---
type: Finding
title: How an Agent Skill is evaluated, and what the cited evidence supports
description: >-
  How Day 3 says an Agent Skill fails and gets measured — four failure modes, five test patterns,
  trigger accuracy, trajectory scoring, pass^k — and which numbers survive. SkillsBench, Vercel,
  Latitude, ReliabilityBench and Lost in Simulation are each cited for something they do not say.
sources:
  - resource: docs/llm-wiki/raw/5-day-agents-vibecoding__day-3__agent-skills.pdf
    title: Agent Skills
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-24T00:45:00Z
---

# How an Agent Skill is evaluated, and what the cited evidence supports

The question: how is an Agent Skill evaluated — how it fails, what gets measured, and what the
published evidence under those measurements actually supports.

One Raw answers it. Section 4 of Day 3, "Evaluating Skills", is the densest cluster of external
citation in the whitepaper: six studies, two vendor posts and one documentation page carry the
argument from "an Agent Skill without a test is a hope, not a capability" to a graduation ladder
with numeric bars on it.

**Every locator below is a PDF page index.** Day 3's printed table of contents runs across four
pages and is offset by three from the index: the section that prints as page 15 is PDF page 18.
This note is made once and not repeated.

Nineteen claims follow. The mechanism claims — the failure taxonomy, the toolkit, the isolation
argument — carry no number, no date and no named study, and take a quote and a locator only. Every
claim resting on an external result took a refutation search run against the cited work itself and
against later versions of it. Superscript endnote markers in the source are not reproduced inside
the quotes; the locator names the endnote instead.

## Skills fail in four modes, split by whether one skill or the library is under test

- **Claim.** Skill failures are predictable and fall into four kinds — trigger, execution, token
  budget and regression — and the first two are observable on a single turn while the last two
  appear only when several skills are loaded together.
- **Quote.**
  > "1. Trigger Failure: The wrong skill fires, or the correct one fails to fire. 2. Execution
  > Failure: The skill triggers correctly, but produces incorrect output or errant tool calls. 3.
  > Token Budget Failure: A massive skill body crowds the context window, degrading performance on
  > unrelated turns. 4. Regression: A newly added skill overlaps with an existing one, breaking
  > previously working routing."
- **Locator.** p18. The single-turn against multi-skill split is stated on p19 — "Trigger failures
  surface in routing logs; execution failures in output quality; token budget failures under
  realistic context load; regression failures only when the full library is exercised together" —
  and drawn as Figure 1 on the same page.
- **Searched for.** Nothing. A taxonomy, carrying no number, no date and no named result.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## SkillsBench: the count holds, the year does not, and the attribution reverses

- **Claim.** Researchers benchmarked 84 real-world agent tasks in SkillsBench in 2025 and found
  that 19 per cent of them performed worse with a skill than without one, because those skills were
  poorly designed.
- **Quote.**
  > "When researchers recently benchmarked 84 real-world agent tasks in SkillsBench (2025), they
  > found that 19% performed worse with a skill than without one. These poorly designed skills were
  > not just neutral noise, they actively degraded capability."
- **Locator.** p18, with `endnote 7` giving `arxiv.org/abs/2602.12670`.
- **Searched for.** Whether the identifier resolves; whether SkillsBench states 84 tasks and a 19
  per cent figure; whether it attributes negative deltas to skill design; and what the paper itself
  reports as its headline result.
- **Came back.** The identifier resolves, and three of the four elements do not survive contact
  with it. `arXiv:2602.12670` is _SkillsBench: Benchmarking How Well Agent Skills Work Across
  Diverse Tasks_, submitted 13 February 2026, with v2 on 7 March, v3 on 13 March and v4 on 14 June
  2026; the version current when Day 3 was published in May 2026 is v3. It is a 2026 paper, not a
  2025 one. The task count holds: §2.5 of v3 reads "SkillsBench comprises 84 tasks across 11
  domains", though the same version's abstract says 86, an inconsistency internal to the paper. The
  19 per cent is arithmetic the paper does not perform: its sentence is "16 of 84 tasks show
  negative Skills deltas", and 16/84 is 19.0 per cent. The paper's own "19%" labels a different
  quantity — Appendix I.8, "16 of 84 evaluated tasks (19%) have a 0% pass rate across all models
  and conditions" — the tasks nothing solved, which is not the same set. (`taxonomy-tree-merge` is
  named in both lists, though a task at 0 per cent in every condition cannot also fall 39.3
  points.) The attribution does not survive at all. The skills producing those negative deltas are
  the paper's _curated_ condition, human-authored and expert-reviewed under §2.4's contributing
  principles, and the explanation offered is the opposite of poor design: "These failures suggest
  Skills may introduce conflicting guidance or unnecessary complexity for tasks models already
  handle well." The headline Day 3 omits points the other way — "Curated Skills raise average pass
  rate by 16.2 percentage points (pp)", with all 11 domains showing a positive aggregate delta, and
  Claude Code with Opus 4.5 gaining +23.3pp.
- **Verdict.** `corrected`. What may be carried is that SkillsBench (2026) found skills hurt on 16
  of its 84 tasks while raising the average pass rate by 16.2 points, and attributed the losses to
  conflicting guidance on tasks models already handle. The year, the "poorly designed" diagnosis,
  and the use of the study as evidence that skills degrade capability all fail against the source.

## The evaluation toolkit is five patterns, and the numbers inside it are illustrations

- **Claim.** Five testing patterns — eval-as-unit-test, golden dataset, LLM-as-judge, adversarial
  or red-team, and canary or shadow mode — cover the whole failure surface, each addressing named
  failure modes and each required from a named tier onwards.
- **Quote.**
  > "Five complementary testing patterns cover the full failure surface."
- **Locator.** p20, above Table 1, which maps each pattern to a description, an example, the
  failure modes it addresses and when it becomes required — eval-as-unit-test on "Every skill,
  every change", golden dataset at "Draft tier and above", canary or shadow "Before each
  action-allowed release".
- **Searched for.** Nothing. The five patterns are a taxonomy of practice. The figures inside the
  Example column — three JSON eval cases, thirty representative queries, 1 per cent of live traffic
  monitored for 24 hours — are illustrations of each pattern rather than measurements of anything,
  and the table offers no source for them.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## The trigger is the first gate

- **Claim.** Routing is the first thing evaluation has to establish, because a skill that never
  fires cannot help and one that fires too broadly is a cost with no benefit.
- **Quote.**
  > "A skill that never fires cannot help. A skill that fires too broadly injects irrelevant
  > context."
- **Locator.** p21, under the heading "The trigger is the first gate"; Figure 2 on the same page
  draws metadata as "a thin routing layer".
- **Searched for.** Nothing. Definitional.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## The 56 per cent non-invocation rate is exact, and it is not production

- **Claim.** Vercel's analysis of production behaviour found that skills expected to activate
  consistently failed to be invoked 56 per cent of the time.
- **Quote.**
  > "Vercel's production analysis revealed a 56% non-invocation rate for skills expected to
  > activate consistently."
- **Locator.** p21, with `endnote 8` giving
  `vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals`.
- **Searched for.** Whether Vercel published a 56 per cent non-invocation rate, and whether the
  study observed production traffic or an evaluation suite.
- **Came back.** The post resolves and the number is verbatim: "In 56% of eval cases, the skill was
  never invoked. The agent had access to the documentation but didn't use it." What it is not is a
  production analysis. The post is "AGENTS.md outperforms skills in our agent evals", by Jude Gao,
  a Next.js engineer, dated 27 January 2026, and its subject is an internal eval suite the post
  describes building and then rebuilding — "Our initial test suite had ambiguous prompts, tests
  that validated implementation details rather than observable behavior" — around Next.js 16 APIs
  chosen because they post-date model training data. No production traffic appears anywhere in it,
  the suite's size is never stated, and the post attributes the behaviour to a general limitation
  rather than to anything about the skill: "Agents not reliably using available tools is a known
  limitation of current models."
- **Verdict.** `corrected`. The figure survives exactly. "Production analysis" does not: it is a
  single-framework eval suite run by one engineer, and a Concept should say "in Vercel's Next.js
  eval suite, the skill was never invoked in 56 per cent of cases".

## The 58-against-63 pair is one sub-metric, not a pass rate, and nothing was stripped

- **Claim.** A skill stripped of its instructions scored 58 per cent where the agent without the
  skill scored 63, and that five-point deficit demonstrates that a poorly designed skill subtracts
  capability.
- **Quote.**
  > "More critically, a skill stripped of its instructions scored 58%, while the agent without the
  > skill scored 63%. This 5-point deficit demonstrates that a poorly-designed skill can actively
  > subtract capability."
- **Locator.** p21, with `endnote 8`.
- **Searched for.** Which configurations and which metric produce 58 and 63 in the Vercel post, and
  whether Vercel draws the inference Day 3 draws from them.
- **Came back.** Both numbers are in the post and neither is a pass rate. They sit in the
  Build/Lint/Test breakdown, in the Test column only: baseline 63 per cent, "Skill (default
  behavior)" 58 per cent. On the same breakdown the two configurations are identical on Build at 84
  per cent, and the post's headline table puts them level overall — "Baseline (no docs) 53%",
  "Skill (default behavior) 53%, +0pp". The deficit is therefore confined to one of three
  sub-metrics and vanishes in the aggregate. "Stripped of its instructions" misnames the
  configuration: nothing was removed. The 58 per cent is the skill in its shipped state, before an
  instruction was added to AGENTS.md telling the agent to invoke it; adding one took the same skill
  to 84 per cent on the same Test column and 79 per cent overall. Vercel's own reading is hedged
  and names a different mechanism: "the skill actually performed worse than baseline on some
  metrics (58% vs 63% on tests), suggesting that an unused skill in the environment may introduce
  noise or distraction." The cause it proposes is non-invocation — the 56 per cent measured two
  paragraphs earlier — not design quality.
- **Verdict.** `corrected`. The pair of numbers is real; everything said around it is not. A
  Concept may carry that an uninvoked skill cost five points on Vercel's test sub-metric while
  leaving the overall pass rate unchanged. It may not carry that a poorly designed skill was
  demonstrated to subtract capability, and it may not describe the configuration as stripped.

## The AGENTS.md index held framework documentation, not project conventions

- **Claim.** In the same study a passive AGENTS.md index of project conventions reached a 100 per
  cent pass rate against a 53 per cent baseline, which shows that global context belongs in
  always-loaded documentation and skills belong to narrow, action-specific workflows.
- **Quote.**
  > "In this same study, Vercel also noted that a passive AGENTS.md index of project conventions
  > achieved a 100% pass rate against a 53% baseline. This reinforces that skills are best reserved
  > for narrow, action-specific workflows, whereas global context should remain in passive,
  > always-accessible documentation."
- **Locator.** p21, with `endnote 8`.
- **Searched for.** What the AGENTS.md index actually contained, on what the 100 per cent was
  measured, and whether Vercel reaches the same conclusion.
- **Came back.** The pair of numbers is exact — "AGENTS.md docs index 100% +47pp" against "Baseline
  (no docs) 53%" — and the conclusion is Vercel's own, near-verbatim: "For Next.js knowledge,
  passive context currently outperforms on-demand retrieval." The content is misdescribed. What
  went into AGENTS.md was a compressed index of version-matched Next.js documentation, not
  conventions: "The initial docs injection was around 40KB. We compressed it down to 8KB (an 80%
  reduction) while maintaining the 100% pass rate", in a pipe-delimited format mapping directory
  paths to `.mdx` filenames under `./.next-docs`, carrying the instruction "Prefer retrieval-led
  reasoning over pre-training-led reasoning". It is a retrieval index pointing at files the agent
  then reads on demand — which makes the passive-against-active framing narrower than it appears,
  since both arms retrieve and only the index is always loaded. The 100 per cent is measured on the
  hardened suite of Next.js 16 API tasks alone. Day 3 also omits the third configuration: the same
  skill, with an explicit instruction in AGENTS.md, reaches 79 per cent, +26pp over baseline.
- **Verdict.** `corrected`. The numbers and the recommendation survive; "project conventions" does
  not. A Concept may carry that an 8KB always-loaded index of version-matched framework
  documentation took Vercel's suite from 53 to 100 per cent, and that the same skill reached 79 per
  cent once explicitly invoked.

## No industry standard sets trigger accuracy at 90 per cent

- **Claim.** There is an industry-standard trigger accuracy rate of 90 per cent, and a description
  must pass four checks to reach it.
- **Quote.**
  > "Now, to hit the industry-standard 90% trigger accuracy rate, your SKILL.md description, the
  > only thing the model sees during routing, must pass four checks:"
- **Locator.** p22. The same bar recurs three times without a source: as the read-only tier's
  requirement at p26, "Read-Only: LLM-as-Judge eval; 90% trigger accuracy"; in Appendix A's
  eval-coverage checklist at p51, "Target 90% trigger accuracy"; and in the closing method at p52,
  "Iterate the description until trigger accuracy clears 90%". None of the four carries an endnote.
- **Searched for.** A published trigger-accuracy threshold in the open standard Day 3 names as
  canonical, in Anthropic's Agent Skills documentation, or in Google's own ADK skills
  documentation — anything that would make "industry-standard" a citation rather than an assertion.
- **Came back.** No such standard was found, and the one body of guidance that addresses the
  question sets a different number. The agentskills.io page on optimizing descriptions specifies
  the evaluation in detail — about twenty labelled queries, "8-10 that should trigger and 8-10 that
  shouldn't", each run three times to compute a trigger rate — and then sets the bar per query, not
  per library: "A should-trigger query passes if its trigger rate is above a threshold (0.5 is a
  reasonable default). A should-not-trigger query passes if its trigger rate is below the
  threshold." It selects a description by validation pass rate on a held-out 40 per cent of the
  queries and warns against overfitting; it names no aggregate accuracy target at all. Anthropic's
  Agent Skills engineering post and Google's `adk.dev/skills/` contain no accuracy figure of any
  kind. The four checks Day 3 lists — testable specificity, clarity, execution fidelity,
  rephrasing stability — are compatible with that guidance and unsourced in the same way.
- **Verdict.** `corrected`. "Industry-standard" has no referent. The published default in the
  standard Day 3 itself treats as canonical is a per-query trigger rate above 0.5 on a set of about
  twenty labelled queries, with selection made on a held-out split. A Concept may carry 90 per cent
  only as this whitepaper's own recommended bar.

## Evaluation-Driven Development is a cited term attached to an uncited practice

- **Claim.** Evaluation-Driven Development means writing three JSON evaluation cases — input,
  expected tools, expected output — before drafting the SKILL.md, and the practice comes from the
  cited work.
- **Quote.**
  > "Evaluation-Driven Development (EDD) inverts the workflow by writing three JSON evaluation
  > cases (Input, Expected Tools, Expected Output) before drafting the SKILL.md. It forces a clear
  > functional spec upfront."
- **Locator.** p24, with `endnote 11` giving `arxiv.org/html/2411.13768v2`; the same two sentences
  appear on p22 without the endnote, and Snippet 3 on p24 gives a worked `refund_dup_charge_001`
  case.
- **Searched for.** What `arXiv:2411.13768` is, whether it defines EDD, and whether it contains the
  three-JSON-cases practice or anything about skills.
- **Came back.** The identifier resolves and supports the term but not the practice.
  `arXiv:2411.13768` is _Evaluation-Driven Development of LLM Agents: A Process Model and Reference
  Architecture_, by Boming Xia, Qinghua Lu, Liming Zhu, Zhenchang Xing, Dehai Zhao and Hao Zhang of
  CSIRO's Data61, first posted 21 November 2024; v2, the version the endnote pins, is dated 27
  March 2025, and a v3 from 17 November 2025 retitles the work to add "and Operations" and reframes
  it as EDDOps. The paper does coin the term the way Day 3 uses it — an approach "inspired by
  test-driven and behavior-driven development but reimagined for the unique characteristics of LLM
  agents", derived from a multivocal literature review. What it proposes is a lifecycle process
  model and reference architecture unifying online runtime and offline redevelopment evaluation.
  The word "skill" does not appear in its body, only once in a reference title; there is no JSON
  eval case in it, no count of three, and no SKILL.md, which is expected of a paper written a year
  before the Agent Skills format existed.
- **Verdict.** `corrected`. The endnote supports the name and the inversion principle. It does not
  support the specific practice attached to it, which is Day 3's own recommendation and carries no
  source. A Concept citing EDD must not present the three-case JSON recipe as a published method.

## The judge swap is established practice; the 90 per cent agreement bar is not

- **Claim.** Two things are non-negotiable when scoring at scale with an LLM judge: swap the
  positions of reference and actual output to remove ordering bias, and calibrate the judge against
  human ratings until agreement reaches 90 per cent.
- **Quote.**
  > "When using LLM-as-Judge to score outputs at scale, remember two non-negotiables: swap the
  > positions of the reference and actual outputs to eliminate ordering bias, and calibrate against
  > human ratings until you hit 90% agreement."
- **Locator.** p22, repeated verbatim on p25; Table 1 on p20 states the same swap as the
  LLM-as-Judge pattern's example, "run twice with swapped positions to neutralize ordering bias".
  Neither instance carries an endnote.
- **Searched for.** A published source for position swapping as a remedy for ordering bias, and any
  published figure for the agreement rate at which an LLM judge is considered calibrated.
- **Came back.** The first half is standard and the second half is above the ceiling the literature
  reports. _Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena_ (Zheng et al.,
  `arXiv:2306.05685`) is the work that established both the bias and the remedy: it measures
  position bias across judges, tabulating consistency "when swapping the order of two assistants",
  and prescribes exactly the fix Day 3 gives — "Swapping positions. The position bias can be
  addressed by simple solutions. A conservative approach is to call a judge twice by swapping the
  order of two answers and only declare a win when an answer is preferred in both orders". The
  same paper is the origin of the calibration idea and puts the number at 80, not 90: strong
  judges "match both
  controlled and crowdsourced human preferences well, achieving over 80% agreement, the same level
  of agreement between humans", rising to 85 per cent only when ties are excluded. No source was
  found setting 90 per cent as a calibration target, and on MT-Bench's figures the bar sits above
  the rate at which human experts agree with each other, which makes it unreachable rather than
  strict.
- **Verdict.** `corrected`. The position swap survives and has a citation Day 3 does not give. The
  90 per cent agreement threshold does not: the established reference point is over 80 per cent,
  defined as parity with human-human agreement.

## The 20-to-40 per cent trajectory gap is Latitude quoting a paper that does not contain it

- **Claim.** Latitude's analysis of March 2026 found that scoring only the final output passes 20
  to 40 per cent more cases than trajectory-aware scoring.
- **Quote.**
  > "Latitude's analysis (March 2026) found that final-output-only scoring passes 20% to 40% more
  > cases than trajectory-aware scoring. This gap represents instances where the agent reached the
  > correct answer via an incorrect sequence of tool calls."
- **Locator.** p22, with `endnote 9` giving
  `latitude.so/blog/agent-first-comparison-guide-vs-braintrust`.
- **Searched for.** Whether Latitude ran an analysis producing the figure, and if not, what the
  figure is sourced to and whether that source contains it.
- **Came back.** The chain breaks at the second link and again at the third. The page resolves: it
  is "Best AI evaluation tools for agents in 2026: Agent-first vs LLM-only platforms", by César
  Migueláñez, dated 26 March 2026 — a vendor comparison of seven evaluation products, with
  Latitude's own pricing in the matrix, not an analysis or an experiment. It reports no data of its
  own. The figure appears twice, both times as a citation: "agents evaluated only on final-output
  quality pass 20–40% more test cases than trajectory-level evaluation reveals (Wei et al., 2023)".
  That attribution is wrong twice over. The hyperlink under "Wei et al., 2023" points to
  `arXiv:2308.11432`, which is _A Survey on Large Language Model based Autonomous Agents_ by Lei
  **Wang** and twelve co-authors, posted 22 August 2023 — the only Wei on the paper is Zhewei Wei,
  the twelfth author. And the survey does not contain the finding: it is a literature review whose
  full text carries no percentage figure at all, and neither "20-40" nor any equivalent gap between
  final-output and trajectory scoring appears in it.
- **Verdict.** `corrected`. Day 3 attributes to Latitude a number Latitude attributes to someone
  else, under a misspelt author name, linked to a survey that does not state it. Nothing in the
  chain measures anything. The qualitative point — that final-output scoring passes runs which
  reached the right answer by the wrong route — is sound and is exactly what the next claim's
  tooling exists to catch, but the 20-to-40 per cent interval must not be repeated.

## The ADK trajectory modes are documented exactly as described

- **Claim.** Google's ADK evaluation framework offers three trajectory scoring modes — EXACT,
  IN_ORDER and ANY_ORDER — and the choice among them should track the skill's tier of authority.
- **Quote.**
  > "The Google ADK eval framework offers three trajectory scoring modes: EXACT (exact order),
  > IN_ORDER (ordered subset), and ANY_ORDER (unordered subset). Trajectory validation should align
  > with the skill tier: read-only skills can use ANY_ORDER, action-allowed skills require IN_ORDER
  > or EXACT."
- **Locator.** p23, with `endnote 10` giving `adk.dev/evaluate/`.
- **Searched for.** Whether the three modes exist under those names in ADK, whether the
  parenthesised glosses match the documentation, and whether the endnote lands on the page that
  documents them.
- **Came back.** All three exist and the glosses are accurate. The ADK evaluation criteria page
  documents `tool_trajectory_avg_score` as comparing the called sequence against expected calls and
  computing "an average score based on one of three match types: EXACT, IN_ORDER, or ANY_ORDER",
  then defines each: EXACT where you "consider any deviation—whether in tool name, arguments, or
  order—as a failure"; IN_ORDER where "certain key tool calls occur in a specific order, but allow
  other tool calls to happen in between"; ANY_ORDER where key calls must occur but order is
  irrelevant and other calls are permitted. Two small imprecisions survive the check. "EXACT (exact
  order)" understates the mode, which also fails on a wrong tool name or wrong arguments. And the
  endnote lands one level too shallow: `adk.dev/evaluate/` is the overview and contains none of the
  three strings; the modes are on `adk.dev/evaluate/criteria/`. The tier-to-mode mapping is Day 3's
  own advice, not ADK's, and the documentation offers nothing that disagrees with it.
- **Verdict.** `no correction found`. Anything citing the three modes should cite
  `adk.dev/evaluate/criteria/` rather than the endnote's URL, and should not describe EXACT as
  order-only.

## Trajectory tests measure the host agent and the skill together

- **Claim.** Trajectory testing cannot isolate a skill, because what it exercises is the composite
  of host agent and skill; the remedy is to evaluate one skill against a base agent and defer
  multi-skill co-loading to production staging.
- **Quote.**
  > "Trajectory testing evaluates the composite system of the host agent interacting with the skill
  > rather than the skill in isolation. When a multi-skill trajectory fails, it is often impossible
  > to decouple agent routing, instruction quality, or execution fidelity. To simplify calibration,
  > evaluate skills via a "Single-Skill Sub-Agent pattern" (Agent + 1 Skill vs. Base Agent); save
  > complex multi-skill co-loading for advanced production staging."
- **Locator.** p24, under "System vs. Skill: The Evaluation Illusion"; the two-tiered assert
  framework that follows on p25 makes the same point about model portability.
- **Searched for.** Nothing. An argument about what a measurement measures, carrying no number, no
  date and no named result.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## tau-bench: the pass^k figures are the paper's own, for the retail split

- **Claim.** On tau-bench, GPT-4o scored 61 per cent on pass^1 and fell below 25 per cent on
  pass^8, which shows single-run success is a poor predictor of production reliability.
- **Quote.**
  > "pass^k measures consistent, rather than occasional, success by running the evaluation k times
  > and requiring success on every run. On tau-bench (Yao et al., 2024), GPT-4o scored 61% on
  > pass^1 but dropped below 25% on pass^8, demonstrating that single-run success is a poor
  > predictor of production reliability."
- **Locator.** p27, with `endnote 14` giving `arxiv.org/abs/2406.12045`.
- **Searched for.** A retraction or withdrawal of the paper; whether it states 61 and sub-25; and
  whether those figures describe the benchmark or one split of it.
- **Came back.** The endnote resolves, the paper is intact, and both figures are its own.
  `arXiv:2406.12045` is _τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World
  Domains_, Shunyu Yao, Noah Shinn, Pedram Razavi and Karthik Narasimhan, submitted 17 June 2024,
  v1 only, with no withdrawal or replacement. Its abstract reads that state-of-the-art agents "are
  quite inconsistent (pass^8 <25% in retail)", its introduction gives "∼61% on τ-retail" for
  gpt-4o function calling, and §5.1 states "Even for the best-performing gpt-4o function calling
  agent which has a > 60% average task success, pass^8 drops to < 25%". Table 2 puts the exact
  value at 61.2. The definition of pass^k Day 3 gives is also the paper's: success required on
  every one of k i.i.d. trials. One qualifier is dropped. Both numbers are the τ-retail split
  alone; on τ-airline the same agent scores 35.2 on pass^1, and its average across the two domains
  is 48.2. Nothing was found that disputes either figure.
- **Verdict.** `no correction found`. The pair should be quoted as "61 per cent on pass^1 and below
  25 per cent on pass^8 on τ-retail", since the unqualified "on tau-bench" reads as a
  benchmark-wide result the paper does not report.

## ReliabilityBench measures no production performance and reports no 20-to-30 per cent drop

- **Claim.** ReliabilityBench shows that production performance typically drops 20 to 30 per cent
  relative to offline benchmark pass@1 numbers.
- **Quote.**
  > "1. Production Degradation: ReliabilityBench shows that production performance typically drops
  > 20% to 30% compared to offline benchmark pass@1 numbers."
- **Locator.** p27, item 1 of the two calibration factors, with `endnote 15` giving
  `arxiv.org/abs/2601.06112`.
- **Searched for.** Whether the identifier resolves to ReliabilityBench; whether the paper reports
  a 20-to-30 per cent production drop; and what it actually measured.
- **Came back.** The identifier resolves and the figure is not in the paper. `arXiv:2601.06112` is
  _ReliabilityBench: Evaluating LLM Agent Reliability Under Production-Like Stress Conditions_, by
  Aayush Gupta, submitted 3 January 2026, v1 only — a single-author technical report of 18 pages
  whose own title page carries the date "January 02, 2025", a year before its arXiv submission. It
  measures no production performance: it evaluates two models, Gemini 2.0 Flash and GPT-4o, in two
  architectures, ReAct and Reflexion, across four synthetic domains over 1,280 episodes, under
  perturbation intensity ε and injected-fault intensity λ, and its Limitations concede that the
  domains "lack the full complexity of production systems with external APIs, authentication, and
  real-time data dependencies". The largest degradation it reports is 8.8 points: "agents achieving
  96.9% pass@1 at ε = 0 drop to 88.1% at ε = 0.2 (an 8.8% decline)". Its ablation puts the worst
  fault profile at 2.5 points below the mixed baseline. The nearest thing to the whitepaper's range
  is a rule of thumb in the Discussion, not a measurement: "If a benchmark reports 90% accuracy,
  expect 70-80% in production when accounting for consistency and faults" — a 10-to-20 point band,
  or 11 to 22 per cent in relative terms, and explicitly an extrapolation. The string "25-30%"
  does occur in the paper, at §3.3, but it names the fault-injection probability of the heavy
  profile, "λ = 0.3 (heavy: 25-30% failures)", which is an input to the experiment rather than a
  result of it.
- **Verdict.** `corrected`. Neither the number nor the thing measured survives. What may be carried
  is that ReliabilityBench measured an 8.8-point fall from paraphrase perturbation alone and
  recommends discounting a benchmark figure of 90 per cent to 70-80 per cent in production as an
  extrapolation. It may not be cited as evidence that production performance typically drops 20 to
  30 per cent.

## Lost in Simulation reports a spread between simulators, not an optimistic bias

- **Claim.** Simulation-based evaluation can be optimistically biased by up to 9 per cent, which is
  the finding of "Lost in Simulation".
- **Quote.**
  > "2. Simulation Bias: Simulation-based evaluations can suffer from an optimistic bias of up to
  > 9% (the 'Lost in Simulation' finding)."
- **Locator.** p27, item 2 of the two calibration factors, with `endnote 16` giving
  `arxiv.org/abs/2601.17087`.
- **Searched for.** Whether the identifier resolves to the named paper; what the 9 measures; and
  whether the paper finds bias in the optimistic direction.
- **Came back.** The identifier resolves and the claim inverts the paper on two of three counts.
  `arXiv:2601.17087` is _Lost in Simulation: LLM-Simulated Users are Unreliable Proxies for Human
  Users in Agentic Evaluations_, by Preethi Seshadri, Samuel Cahyawijaya, Ayomide Odumakinde,
  Sameer Singh and Seraphina Goldfarb-Tarrant, v1 on 23 January 2026 and v2 on 28 January 2026,
  built from a user study with participants in the United States, India, Kenya and Nigeria against
  τ-Bench retail tasks. The 9 is not a bias and not a per cent: it is the spread in measured agent
  success when only the simulator is changed — "user simulation lacks robustness, with agent
  success rates varying up to 9 percentage points across different user LLMs", specifically between
  Sonnet 3.7 and Sonnet 4.5 as the user model, with the agent held fixed at GPT-4o. It is a
  reliability finding about the instrument, not a directional error. The paper's bias finding is
  separate and bidirectional: simulated users "underestimate agent success on the hardest tasks
  (success with human users: 30.8%) while overestimating it on moderate tasks (success with human
  users: 39.0%)", and overestimate on easy tasks. The word "optimistic" does not appear anywhere in
  the paper, whose stated consequence runs the other way — evaluations with simulated users "risk
  systematically underestimating difficulty agents face when deployed to diverse, global user
  populations". The paper's largest reported gap is unrelated to either: a 19-point fall in agent
  success across demographic groups.
- **Verdict.** `corrected`. A Concept may carry that swapping the LLM playing the user moves
  measured agent success by up to 9 percentage points, and that simulated users are miscalibrated
  in both directions depending on task difficulty. It may not carry an optimistic bias of up to 9
  per cent, which is neither the statistic, the direction, nor the unit.

## Endnotes 15 and 16 are correct, and are the source of the defect at 19 and 20

- **Claim.** A reader following the endnotes under the two calibration factors on p27 reaches the
  works those factors name.
- **Quote.**
  > "15. https://arxiv.org/abs/2601.06112
  >
  > 16. https://arxiv.org/abs/2601.17087"
- **Locator.** `endnote 15` and `endnote 16`, both on p60.
- **Searched for.** What each identifier resolves to, and whether either has been withdrawn or
  replaced by a different work.
- **Came back.** Both land where p27 says they should. `arXiv:2601.06112` is ReliabilityBench, 3
  January 2026, and `arXiv:2601.17087` is _Lost in Simulation_, 23 January 2026; neither carries a
  withdrawal notice, and neither has been superseded by a different paper at the same identifier.
  Both URLs also appear a second time in the endnote list, under 19 and 20, where they sit beneath
  the names of two entirely different works, _Lost in the Middle_ and Chroma's _Context Rot_. The
  duplication runs in one direction only: 15 and 16 are the originals and are right for what p27
  cites, and 19 and 20 carry identifiers that do not belong to them.
- **Verdict.** `no correction found`. Endnotes 15 and 16 are sound as cited. That the same two URLs
  reappear under 19 and 20 is a defect in 19 and 20, and anything citing Day 3's degradation
  argument must take its identifiers from elsewhere.

## Eval coverage is four conditions, one per failure mode

- **Claim.** A skill counts as evaluated only when all four conditions are met — trigger, execution,
  regression and token budget — each mapped to one of the four failure modes, and failing any one
  holds the skill in the draft tier.
- **Quote.**
  > "A skill achieves complete eval coverage by satisfying four conditions mapped directly to the
  > primary failure modes: Trigger Failure: Verifying trigger behavior with both positive (should
  > fire) and negative (should not fire) test cases. Execution Failure: Ensuring correct outputs
  > across a representative range of expected inputs. Regression: Confirming that adding the skill
  > causes zero performance drops in the existing library. Token Budget Failure: Bounding the
  > skill's token footprint to ensure it does not degrade performance on unrelated turns."
- **Locator.** pp27–28, spanning the page break; restated as a checklist in Appendix A at p51, and
  the governing rule follows on p28: "failure on any single condition holds the skill in the draft
  tier, regardless of its happy-path performance".
- **Searched for.** Nothing. A definition of a completion criterion, carrying no number, no date
  and no named result. The numeric bars inside the graduation ladder it governs — 90 per cent
  trigger accuracy at p26, a golden dataset of twenty-plus cases, co-loading with 5 to 15 skills —
  are separate claims; the first has its own entry above and the last two belong to the token-budget
  question rather than to this one.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## The 98.4 per cent is a community estimate the cited paper marks as its weakest evidence

- **Claim.** A reverse-engineering of Claude Code v2.1.88 by Liu, Zhao, Shang and Shen found that
  98.4 per cent of the codebase is operational infrastructure and only 1.6 per cent is the agent
  loop, and ccunpacked.dev is that work's companion site.
- **Quote.**
  > "A recent reverse-engineering of Claude Code v2.1.88 (Liu, Zhao, Shang, and Shen, 2026) found
  > that 98.4% of the codebase is operational infrastructure: permission classifiers, context
  > compaction pipelines, subagent delegation, session storage and only 1.6% is the agent loop
  > itself. […] The companion site ccunpacked.dev maps the same architecture visually."
- **Locator.** p30, with `endnote 18`, which gives no identifier — only "Liu, Zhao, Shang, and Shen
  (2026), reverse-engineering of Claude Code v2.1.88; companion site ccunpacked.dev".
- **Searched for.** Whether the paper exists and can be identified; whether it reports the split;
  what evidence it rests on; and whether ccunpacked.dev is its companion site.
- **Came back.** The paper exists and is findable despite the endnote. It is _Dive into Claude Code:
  The Design Space of Today's and Future AI Agent Systems_, Jiacheng Liu, Xiaohan Zhao, Xinyi Shang
  and Zhiqiang Shen, `arXiv:2604.14228`, v1 on 14 April 2026 and v2 on 2 July 2026, a technical
  report analysing an extracted v2.1.88 TypeScript codebase of roughly 1,884 files and 512K lines.
  The split is in it, twice, and both times hedged: "Community analysis of the extracted source
  estimates that only about 1.6% of Claude Code's codebase constitutes AI decision logic, with the
  remaining 98.4% being operational infrastructure", and "An estimated 1.6% of the codebase
  constitutes decision logic, the remaining 98.4% is the operational harness." The authors did not
  measure it. Their appendix defines three evidence tiers and places exactly this kind of claim in
  the weakest: "Tier C (reconstructed): Claims derived from community analysis […] These are stated
  with hedging language", against Tier B, "code-verified […] This is the strongest evidence tier".
  The companion-site attribution is also wrong. The paper's own artefact is
  `github.com/VILA-Lab/Dive-into-Claude-Code`; ccunpacked.dev is an independent site credited to
  "Zakaria O. I. A. / @razakiau", dated 31 March 2026, which states "Unofficial. Not affiliated
  with Anthropic […] Curation assisted by AI" and nowhere carries the 98.4 or 1.6 figure. Day 3's
  gloss of the 1.6 per cent as "the agent loop itself" is also narrower than the paper's "decision
  logic"; what the paper says of the loop is that "the core system is a simple while-loop that
  calls the model, runs tools, repeats".
- **Verdict.** `corrected`. The qualitative claim survives on better evidence than the number: the
  paper's Tier B analysis documents the permission system, the five-layer compaction pipeline, four
  extensibility mechanisms, subagent delegation and append-oriented session storage as where the
  code lives. The ratio does not survive as a finding. It is an unattributed community estimate
  that the cited paper repeats under its own weakest evidence tier, and it should be cited as
  `arXiv:2604.14228` rather than to ccunpacked.dev, which does not contain it.

The question can be answered without any of the numbers that failed. What an Agent Skill is
evaluated for is fixed by the four-mode taxonomy on p18 and the four coverage conditions on
pp27–28, and how it is evaluated is fixed by the five patterns on p20, the trigger-first ordering
on p21, the output-against-trajectory separation on p22 and the composite-system caveat on p24.
Every one of those is definitional and none depends on a citation. Three external results survive
their searches: τ-bench's pass^k figures, ADK's three trajectory modes, and MT-Bench's position
swap, which Day 3 states without citing. The rest of the numbers in section 4 fail in one of two
ways. Four of them — SkillsBench's 19 per cent, Vercel's 58-against-63, ReliabilityBench's 20 to 30
per cent, and Lost in Simulation's 9 per cent — are real figures relocated from what their sources
measured onto what this argument needed. Two more, the 90 per cent trigger accuracy and the 90 per
cent judge agreement, are asserted as industry standards with no source and, in the second case,
above the level at which human experts agree with each other. One, Latitude's 20 to 40 per cent,
dissolves entirely on following it: a vendor page citing a misnamed author, linked to a survey
containing no percentage at all.
