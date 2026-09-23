---
type: Finding
title: LLM code security failure rates in the Veracode 2025 study
description: >-
  What Veracode's 2025 GenAI Code Security Report measured, and which figures survive a search for
  correction. The model count and task count stand. The 45 per cent is not a proportion of the 80
  tasks, and the flat-regardless-of-recency claim was broken by Veracode's own later measurement.
sources:
  - resource: docs/llm-wiki/raw/veracode-genai-code-security-2025.md
    title: Veracode 2025 GenAI Code Security Report
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-23T21:29:37Z
---

# LLM code security failure rates in the Veracode 2025 study

The question: what can be asserted about LLM code security failure rates on the strength of
Veracode's 2025 GenAI Code Security Report, and what does a search for correction do to each
figure.

Every quote below is from the Raw, which is itself quoted from the press release, the blog post
and the report landing page. The PDF was never retrieved and is still behind a lead-capture form,
so no locator names a page inside it. Each claim carries a number or a named study, so each got a
search.

## More than 100 models were tested

- **Claim.** Veracode's 2025 GenAI Code Security Report measured the output of more than 100 large
  language models.
- **Quote.**
  > "The tasks prompted more than 100 LLMs to auto-complete a block of code in a secure or
  > insecure manner, which the research team then analyzed using Veracode Static Analysis."
- **Locator.** `docs/llm-wiki/raw/veracode-genai-code-security-2025.md#scale`
- **Searched for.** A retraction or corrigendum of the report; a later Veracode publication giving
  a different model count for the July 2025 run; a third party citing a count other than 100-plus.
- **Came back.** No retraction and no corrigendum. Veracode's October 2025 update describes the
  July run as one that "tested over 100 LLMs across four major programming languages"; the 2026
  report gives no count for the 2025 run at all. Secondary coverage repeats "100+" without
  variation. Nothing disagrees, and nothing resolves "more than 100" to an exact figure.
- **Verdict.** `no correction found`.

## The task set is 80 code completion tasks

- **Claim.** The study put 80 code completion tasks, selected against MITRE CWE classes, to each
  model.
- **Quote.**
  > "To evaluate the security properties of LLM-generated code, Veracode designed a set of 80 code
  > completion tasks with known potential for security vulnerabilities according to the MITRE
  > Common Weakness Enumeration (CWE) system, a standard classification of software weaknesses
  > that can turn into vulnerabilities."
- **Locator.** `docs/llm-wiki/raw/veracode-genai-code-security-2025.md#the-task-set`
- **Searched for.** A retraction; a later Veracode publication giving a different task count or a
  composition that does not multiply to 80; a third party citing a number other than 80.
- **Came back.** No retraction. Veracode's October 2025 update calls the instrument "the same
  80-task benchmark", and its Spring 2026 update gives the composition the 2025 documents withhold
  — four languages, four CWEs, five task instances per language-CWE pair, which multiplies to
  exactly 80. One aggregator writes "80+ coding tasks", inflating a figure Veracode states
  precisely; that is a third party's looseness, not a restatement by the publisher.
- **Verdict.** `no correction found`.

## The 45 per cent is a proportion of samples, not of 80 tasks

- **Claim.** Veracode's 2025 study found 45 per cent of 80 coding tasks produced insecure code.
- **Quote.**
  > "45% of code samples failed security tests and introduced OWASP Top 10 security
  > vulnerabilities into the code."
- **Locator.** `docs/llm-wiki/raw/veracode-genai-code-security-2025.md#the-45-per-cent`
- **Searched for.** A retraction or corrigendum; a later Veracode publication restating the figure
  against a different denominator; a third party citing a rate other than 45 per cent.
- **Came back.** No retraction. Veracode restates the measurement after publication, each time as
  a pass rate rather than a failure rate and each time against tasks: the Spring 2026 update gives
  "only 55% of generation tasks result in secure code" on the same 80-task benchmark, and the 2026
  report gives "The average security pass rate across models is 56% – barely changed from 55% in
  the first report". Those restatements fix the denominator the 2025 documents leave open. It is
  generation tasks pooled across every model tested, not the 80-task set, which is the instrument
  each model attempts rather than the denominator of the proportion. Third parties compress the
  figure in the opposite direction, from a rate on benchmark tasks to a rate on AI-generated code
  at large; a widely repeated "2.74x more vulnerabilities than human-written code" is attributed
  to this report and belongs to a separate pull-request analysis, since Veracode ran no human
  control group.
- **Verdict.** `corrected`. The figure survives; the denominator in the claim does not. What a
  Concept may carry is "45 per cent of samples", or Veracode's own later "55 per cent security
  pass rate across generation tasks". It may not carry 45 per cent of the 80 tasks. The count of
  tasks is a separate claim and has its own entry above.

## Security performance was flat regardless of model size or recency

- **Claim.** Across models of varying size, release date and training source, security performance
  did not improve, so the shortfall is not a scaling problem.
- **Quote.**
  > "We evaluated LLMs of varying sizes, release dates, and training sources over a matter of
  > years. While the models got better at writing functional or syntactically correct code, they
  > were no better at writing secure code. Security performance remained flat, regardless of model
  > size or training sophistication."
- **Locator.**
  `docs/llm-wiki/raw/veracode-genai-code-security-2025.md#model-capability-did-not-close-the-gap`
- **Searched for.** A retraction; a later Veracode measurement on the same benchmark recording an
  improvement with model size or recency; an independent replication reporting a size or recency
  effect.
- **Came back.** Veracode's own October 2025 update, run on the same 80-task benchmark and
  published 18 November 2025, disagrees. It reads "For the first time since we began tracking
  AI-generated code security, we've seen a meaningful performance jump" and records "GPT-5 Mini
  achieved a 72% security pass rate, the highest we've recorded", with GPT-5 at 70 per cent,
  against previous generations that "typically scored between 50-60%". The update attributes the
  gain to reasoning rather than scale — GPT-5-chat, the non-reasoning variant, scored 52 per cent
  — and finds no improvement at Anthropic, Google, Qwen or xAI. The size half of the claim holds
  to the 2026 report, which records large models at 53 per cent against 51 per cent for medium and
  small. The recency half does not: the Spring 2026 update, while restating that the ceiling
  holds, still concedes "OpenAI's reasoning models posted the largest step-ups", to roughly 70 to
  72 per cent. Third-party coverage carried the disagreement under the headline "OpenAI's GPT-5
  generates more secure code than past models, report finds". No independent replication of the
  80-task benchmark was found; independent benchmarks measure different task sets and report
  anywhere from roughly 4 to 62 per cent, so they neither replicate nor refute.
- **Verdict.** `corrected`. Model size survives. Recency does not: within four months the
  publisher measured a newer model generation above the band it had called flat, on the same
  instrument. What a Concept may carry is "larger models were not more secure". "Newer models were
  not more secure" holds only for the models tested up to July 2025, and needs the October 2025
  exception stated beside it.

## The landing page was edited in place after it was first cited

- **Claim.** The report's landing page was edited in place rather than superseded, and its
  original July 2025 wording cannot be recovered.
- **Quote.**
  > "The landing page has since been edited in place rather than superseded: it now reads "October
  > 2025 Update: GenAI Code Security Report"."
- **Locator.** `docs/llm-wiki/raw/veracode-genai-code-security-2025.md#identity`
- **Searched for.** Whether the edit changed anything the Raw quotes; when it landed; whether the
  original wording is recoverable, the Raw having recorded the Wayback Machine as unreachable at
  landing.
- **Came back.** The Wayback Machine is reachable now and holds the page from launch day onward.
  The edit is a retitle and nothing more. Snapshots to 5 November 2025 carry the title "Veracode
  2025 GenAI Code Security Report"; from 1 December 2025 onward they carry "Veracode October 2025
  Update: GenAI Code Security Report", so the retitle landed in November, after the update it is
  named for. The body did not change: the September 2025 snapshot and the February 2026 snapshot
  both read "AI-generated code introduced risky security flaws in 45% of tests", and both carry
  "Bigger Models ≠ More Secure Code" over "Larger, newer AI models didn't improve security". That
  second line still stands on the page retitled for the update whose own blog post records a newer
  model at 72 per cent.
- **Verdict.** `corrected`. The edit is real, but it is a retitle rather than a rewrite, so the
  landing page quotes in the Raw are the launch wording after all, and the Raw's note that the
  original wording cannot be recovered no longer holds.

The 2025 report PDF is still gated and was not retrieved for this run. Veracode serves the
October 2025 update as an ungated PDF at `wp-content`, which is a different document and settles
nothing about the 2025 report's own pages.
