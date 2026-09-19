---
type: Source
title: Veracode 2025 GenAI Code Security Report
resource: 'https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/'
publisher: Veracode
published: 2025-07-30
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-19T00:00:00Z
---

# Veracode 2025 GenAI Code Security Report

Veracode asked more than a hundred language models to complete code that could be written
securely or insecurely, and measured which way they went. The finding this repository landed it
for is the last one: security performance did not improve with model size or recency.

**The PDF was not retrieved.** It sits behind a lead-capture form asking for name, business
email, company and job title. Everything below is quoted from the three Veracode-hosted
documents that are open — the press release, the CTO's blog post, and the report landing page —
and every locator names a section in one of those, never a page in the PDF.

## Identity

- **Title at launch** — 2025 GenAI Code Security Report.
- **Publisher** — Veracode, Burlington, Massachusetts.
- **Published** — 30 July 2025.
- **Landing page** — `https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/`
- **Press release** — `https://www.veracode.com/press-release/ai-generated-code-poses-major-security-risks-in-nearly-half-of-all-development-tasks-veracode-research-reveals/`
- **Blog post**, by Jens Wessling, Veracode's CTO — `https://www.veracode.com/blog/genai-code-security-report/`

The landing page has since been edited in place rather than superseded: it now reads "October
2025 Update: GenAI Code Security Report". The press release and the blog post carry the launch
framing and are the stabler citations. This is the decay design ADR 0003 anticipates, arriving
within a year of publication.

## Scale

> "The tasks prompted more than 100 LLMs to auto-complete a block of code in a secure or
> insecure manner, which the research team then analyzed using Veracode Static Analysis."

Press release, section "LLMs Introduce Dangerous Levels of Common Security Vulnerabilities".

> "In our new 2025 GenAI Code Security Report, we tested over 100 large language models across
> Java, Python, C#, and JavaScript."

Blog post, opening paragraph.

## The task set

> "To evaluate the security properties of LLM-generated code, Veracode designed a set of 80 code
> completion tasks with known potential for security vulnerabilities according to the MITRE
> Common Weakness Enumeration (CWE) system, a standard classification of software weaknesses
> that can turn into vulnerabilities."

Press release, section "LLMs Introduce Dangerous Levels of Common Security Vulnerabilities". The
count of 80 appears only in the press release; neither the blog post nor the landing page states
a task count.

## The 45 per cent

The figure is consistent across all three documents. The denominator is not, and the difference
is Veracode's own, so it is recorded rather than resolved.

> "45% of code samples failed security tests and introduced OWASP Top 10 security
> vulnerabilities into the code."

Blog post, section "The Results: AI-generated Code That Works, But Isn't Safe", first bullet.
This is the only place that says _samples_, and the only place that puts the figure and the OWASP
Top 10 in one sentence.

> "In 45 percent of all test cases, LLMs introduced vulnerabilities classified within the OWASP
> (Open Web Application Security Project) Top 10—the most critical web application security
> risks."

Press release, section "LLMs Introduce Dangerous Levels of Common Security Vulnerabilities".

> "when given a choice between a secure and insecure method to write code, GenAI models chose the
> insecure option 45 percent of the time"

Press release, second paragraph. The behavioural framing of the same measurement.

The landing page gives the figure as "45% [of] tests" and does not name OWASP beside it. Note
that 80 is a count of tasks and 45 per cent is a proportion of samples, cases or tests — a
different denominator, never stated as a proportion of the 80.

## Model capability did not close the gap

This is the clause worth citing. It says the shortfall is not a scaling problem.

> "We evaluated LLMs of varying sizes, release dates, and training sources over a matter of
> years. While the models got better at writing functional or syntactically correct code, they
> were no better at writing secure code. Security performance remained flat, regardless of model
> size or training sophistication."

Blog post, section "Aren't Newer AI Models Generating More Secure Code?", which answers its own
heading with "It's a great question. Unfortunately, they don't."

> "We also found larger models do not perform significantly better than smaller models,
> suggesting this is a systemic issue rather than an LLM scaling problem."

Press release, quoted from Jens Wessling, Veracode CTO.

The landing page compresses the same finding to "Bigger Models ≠ More Secure Code" and "Larger,
newer AI models didn't improve security."

## What this Source cannot support

- **Anything keyed to a page or section of the PDF.** The PDF was never opened.
- **A proportion expressed against the 80 tasks.** Veracode never states one.
- **The 45 per cent under a single named denominator.** Quote the document, name which.
- **Per-CWE or per-language methodology detail.** The four CWEs and the per-combination task
  counts circulate in secondary summaries and in Veracode's later 2026 methodology, but appear
  nowhere in the accessible 2025 documents.
- **The landing page's original July 2025 wording.** It was edited in place, and the Wayback
  Machine was unreachable when this was landed.
