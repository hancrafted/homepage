---
type: Finding
title: What an Agent Skill is, and what it is not
description: >-
  What Google's Day 3 whitepaper says an Agent Skill is — a directory anchored by SKILL.md, loaded
  in three progressive-disclosure levels, set against MCP and AGENTS.md — and which of its numbers
  survive. The 150,000-to-2,000-token figure is Anthropic's, but it measures MCP, not skills.
sources:
  - resource: docs/llm-wiki/raw/5-day-agents-vibecoding__day-3__agent-skills.pdf
    title: Agent Skills
  - resource: docs/llm-wiki/raw/5-day-agents-vibecoding__day-1__the-new-sdlc-with-vibe-coding.pdf
    title: The New SDLC With Vibe Coding
  - resource: docs/llm-wiki/raw/5-day-agents-vibecoding__day-5__spec-driven-production-grade-development.pdf
    title: Spec-Driven Production Grade Development in the Age of Vibe Coding
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-23T22:18:00Z
---

# What an Agent Skill is, and what it is not

The question: what is an Agent Skill — its anatomy, how an agent loads it, and what separates it
from an MCP server or an instructions file — on the strength of three of Google's five May 2026
whitepapers, and what a search for correction does to each figure.

Day 3 is the principal source and carries the definition. Day 1 restates the loading mechanism in
one paragraph. Day 5 places a Skill among the other places instructions live, and draws the
boundary differently; where the two disagree the ledger records it rather than picking a winner.

**Every locator below is a PDF page index.** Day 3's printed table of contents runs across four
pages and is therefore offset by three: its printed page 6 is PDF page 9. Day 1 and Day 5 print
the same numbers they index. This note is made once and not repeated.

Fourteen claims follow. Those carrying a number, a date, or a named external authority got a
search for correction; the definitional ones got a quote and a locator and no search, which is why
several verdicts read `outside the bound`.

## A Skill is a directory whose only mandatory file is SKILL.md

- **Claim.** An Agent Skill is a folder, not a file: it must contain `SKILL.md`, and everything
  else in it — `scripts/`, `references/`, `assets/` — is optional.
- **Quote.**
  > "Every skill lives in its own directory and must contain a SKILL.md. To see the full canonical
  > structure, as defined by the open standard at agentskills.io, let's look at a practical
  > example. […] (Remember, the only mandatory file is SKILL.md. The rest is optional)"
- **Locator.** Day 3, p10. The illustrative tree beneath it, Snippet 1, shows
  `cafe-preparation/` holding `SKILL.md`, `scripts/`, `references/` and `assets/`; Appendix A
  repeats the same four-folder layout at p47.
- **Searched for.** Nothing. The claim carries no number, no date and no result.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## Skills load in three levels

- **Claim.** Progressive disclosure means a Skill enters context in three stages — metadata
  always, body on trigger, bundled resources only when referenced.
- **Quote.**
  > "The innovative piece is the progressive disclosure. Skills load in three levels: 1. Metadata
  > (name + description) is always in the agent's context. 2. SKILL.md body is loaded only when
  > the skill triggers. 3. Bundled resources are loaded strictly as needed (and scripts execute
  > without ever polluting the token window)."
- **Locator.** Day 3, p10.
- **Searched for.** Nothing. Three levels is the shape of the mechanism, not a measurement of it.
  The token costs attached to each level are separate claims and have their own entries below.
- **Came back.** Not applicable. Worth recording that Day 1 states the same mechanism
  independently, at its p17: "The agent sees only lightweight metadata at startup, loads full
  instructions when a task matches, and pulls deep reference material only when explicitly
  needed." The two papers agree on the mechanism and differ only on what it costs.
- **Verdict.** `outside the bound`.

## The description field is the routing algorithm

- **Claim.** The `description` in the YAML frontmatter is what selects the Skill; the model sees
  nothing else when deciding whether to load it.
- **Quote.**
  > "Description. This is your routing algorithm. It is the only thing the model sees to decide
  > whether to load the Agent Skill. State what it does, front-load trigger keywords, be pushy if
  > the model under-triggers, and explicitly state what it is not for."
- **Locator.** Day 3, p11; restated at p48, "The description is the routing algorithm. Spend more
  time here than anywhere else."
- **Searched for.** Nothing. A definition of what a field is for.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## The description length limits are 200 characters for API, 1024 in YAML

- **Claim.** A Skill description is capped at 200 characters when supplied through an API and 1024
  characters in YAML, and most authors write about 50 words.
- **Quote.**
  > "≤200 chars for API; ≤1024 chars in YAML. Most authors aim for ~50 words"
- **Locator.** Day 3, p48, in Appendix A's cheatsheet.
- **Searched for.** A published limit contradicting either figure: the open standard Day 3 names
  at p10, and the API documentation of the vendor whose format Day 3 credits at p16.
- **Came back.** The 1024 holds and the 200 does not. The Agent Skills specification at
  agentskills.io gives `description` as "Max 1024 characters. Non-empty." with no second, lower
  limit for any transport. Anthropic's own Agent Skills overview gives the same field
  requirements — "description: Must be non-empty Maximum 1024 characters" — for Skills used
  through the Claude apps, Claude Code and the API alike. No 200-character API cap was found in
  either. The "~50 words" is advice rather than a limit and nothing disagrees with it, though it
  sits in tension with this paper's own token arithmetic: 50 English words is roughly 65 tokens,
  above the 50 tokens per description that p17 bills for.
- **Verdict.** `corrected`. What may be carried is a single limit of 1024 characters. The
  200-character API figure has no support in the standard the paper cites or in the vendor
  documentation, and should not be repeated.

## Skill directories are named in snake_case

- **Claim.** A Skill's directory is named in snake_case while the skill itself is named in
  kebab-case.
- **Quote.**
  > "Naming. When naming, be obvious and boring: use snake_case for directories (e.g.,
  > bigquery_ingestion), kebab-case for skill names (e.g., pdf-processing), and prefer the gerund
  > form like managing-databases."
- **Locator.** Day 3, p11; repeated verbatim as a rule at p47, "Directory name: snake_case ·
  Skill name: kebab-case".
- **Searched for.** The naming rule in the open standard Day 3 itself names as canonical at p10,
  and any statement there about the relation between directory name and skill name. Searched
  because the claim rests on a named external authority, which is what makes it checkable.
- **Came back.** The standard contradicts it. The agentskills.io specification requires the `name`
  field to "only contain unicode lowercase alphanumeric characters (`a-z`, `0-9`) and hyphens
  (`-`)" and, decisively, that it "Must match the parent directory name". A kebab-case skill name
  in a snake_case directory therefore fails validation under the reference validator the
  specification points at, `skills-ref validate`. Day 3 also contradicts itself: its worked
  example at p10 is `cafe-preparation/`, a kebab-case directory whose `name:` at p11 is
  `cafe-preparation`, which follows the standard and breaks the rule stated on the same page.
- **Verdict.** `corrected`. The directory name equals the skill name and is kebab-case. The
  snake_case rule is contradicted by the standard Day 3 cites, by the reference validator, and by
  Day 3's own example.

## One hundred skills cost about 5,000 tokens of always-loaded metadata

- **Claim.** Progressive disclosure prices an installed Skill at roughly 50 tokens per turn, so a
  hundred-skill library costs about 5,000 tokens of always-loaded metadata.
- **Quote.**
  > "The progressive disclosure of skills means 100 skills cost ~100 × 50 tokens = ~5,000 tokens
  > of always-loaded metadata."
- **Locator.** Day 3, p17.
- **Searched for.** A published per-skill metadata cost disagreeing with 50 tokens, in the open
  standard Day 3 names at p10 or in implementation guidance derived from it; and any other figure
  in Day 3 itself that the 50 contradicts.
- **Came back.** The multiplication is right and the rate is low. The agentskills.io
  specification puts tier one at "**Metadata** (~100 tokens): The `name` and `description` fields,
  loaded at startup for all skills" — double the rate p17 bills. The same site's client
  implementation guide gives a band rather than a point, "~50-100 tokens per skill", which places
  50 at the floor. Day 3 disagrees with itself too: p34 prices fifty descriptions at ~4,000
  tokens, which is 80 tokens each, and the case study at p56 gives "~30 to 80 tokens each". At the
  standard's ~100 the same hundred-skill library costs ~10,000 tokens, not ~5,000.
- **Verdict.** `corrected`. The arithmetic survives; the rate does not carry. What a Concept may
  say is that always-loaded metadata runs roughly 50 to 100 tokens per skill, so a hundred-skill
  library costs somewhere between 5,000 and 10,000 tokens a turn. The flat ~5,000 is the
  best case, not the expected case.

## L1 descriptions cost 30 to 80 tokens each, about 2KB in total

- **Claim.** A runtime loads every skill's level-one description at session start, at roughly 30
  to 80 tokens each and about 2KB in total.
- **Quote.**
  > "The runtime loads the L1 descriptions of all skills at session start (~30 to 80 tokens each,
  > ~2KB total)."
- **Locator.** Day 3, p56, in Appendix B's retail case study.
- **Searched for.** A published per-description cost outside the 30-to-80 band; and whether the
  two halves of the parenthesis agree with each other and with p17.
- **Came back.** Nothing disagrees with the band. It brackets p17's 50 and p34's implied 80, and
  its top touches the "~50-100 tokens per skill" the agentskills.io client guide gives, so the
  three Day 3 figures are mutually compatible at the top of the range and only p17's point
  estimate sits at the floor. The two halves are consistent with each other but not with the
  library printed beside them: ~2KB is roughly 500 tokens, which at 30 to 80 tokens apiece implies
  something between six and seventeen descriptions, where the case study names five skills. The
  paper calls that list "a representative set" rather than the whole library, so the slack is
  unresolved rather than contradicted.
- **Verdict.** `no correction found`. The band stands. The "~2KB total" is not refuted, but it
  does not follow from the five skills the case study names and should not be quoted as their cost.

## The fifty-workflow arithmetic

- **Claim.** An agent with fifty workflows pays 15,000 tokens a turn as a monolithic system prompt
  and about 6,000 as a skills library.
- **Quote.**
  > "Consider an agent with fifty distinct workflows. As a single system prompt, it loads 15,000
  > tokens every turn. As a skills library, it loads ~4,000 tokens of descriptions plus the
  > ~2,000-token body of the one active skill with ~6,000 tokens total, with the other forty-nine
  > bodies on disk."
- **Locator.** Day 3, p34, beneath the heading "What this means for the token budget"; Figure 8 on
  the same page charts it as "a single big prompt versus a fifty-skill library".
- **Searched for.** Whether the figures multiply, and whether the two sides of the comparison
  describe the same fifty workflows.
- **Came back.** The addition is sound — 4,000 plus 2,000 is 6,000 — and the description side is
  internally consistent at 80 tokens each, though that contradicts the 50 tokens p17 uses. The
  comparison itself is not like for like. At ~2,000 tokens a body, fifty skill bodies hold
  ~100,000 tokens of instruction; the monolithic prompt it is set against holds 15,000, or ~300
  tokens per workflow. The skills library therefore carries close to seven times as much
  instruction per workflow as the baseline it beats, and the honest reading of the figure is that
  a library costs 60 per cent less context than a much smaller prompt, not that the same content
  was compressed from 15,000 tokens to 6,000.
- **Verdict.** `corrected`. The arithmetic holds; the comparison does not. What may be carried is
  that only the active body sits in context, which is the point Figure 8 is actually making. The
  15,000-versus-6,000 pair should not be quoted as a saving on identical content.

## Anthropic published a cut from 150,000 tokens to 2,000

- **Claim.** Anthropic has published examples in which converting a workflow to skills cut active
  context from roughly 150,000 tokens to 2,000, more than a 98 per cent reduction.
- **Quote.**
  > "Anthropic has published examples where converting a workflow to skills cut active context
  > from roughly 150,000 tokens to 2,000, a reduction of more than 98 percent."
- **Locator.** Day 3, p34. The sentence carries no endnote, unlike most numbered claims in the
  paper; Day 3's 36 endnotes at pp60–62 include Anthropic's Agent Skills engineering post but no
  link supporting this figure.
- **Searched for.** The Anthropic publication carrying 150,000 and 2,000; whether it is about
  Agent Skills; whether the percentage matches; and whether Anthropic has since restated it.
- **Came back.** The figure is Anthropic's, verbatim, and it is not about skills. It appears in
  "Code execution with MCP: Building more efficient agents", published 4 November 2025: "This
  reduces the token usage from 150,000 tokens to 2,000 tokens—a time and cost saving of 98.7%."
  What it measures is an agent that stops loading every MCP tool definition up front and instead
  explores a `./servers/` directory on the filesystem, reading only the tool files the current
  task needs. There is no SKILL.md in it. Anthropic's Agent Skills engineering post — the one Day
  3 does cite, at endnote 6 — carries no token figures at all, and no Anthropic publication
  attaching 150,000 to 2,000 to a skills conversion was found. The "more than 98 percent" is
  consistent with Anthropic's 98.7, so only the subject is wrong.
- **Verdict.** `corrected`. The number and the publisher survive; the thing measured does not. It
  is a progressive-disclosure result for MCP tool definitions, not for Agent Skills. The
  misattribution is sharper than it looks, because Day 3's own p15 insists Skills and MCP "do not
  compete, they compose": the number borrowed here to argue for skills is MCP's own result. A
  Concept may cite it only as "Anthropic measured 150,000 tokens down to 2,000 for code execution
  with MCP", and must not restate it as a skills figure.

## Skill versus MCP: reach against know-how

- **Claim.** An MCP server and a Skill are not alternatives. MCP connects an agent to an external
  system; a Skill teaches it how to think about a kind of work, and calls MCP tools when it needs
  data.
- **Quote.**
  > "Skill vs. MCP. These do not compete, they compose. Model Context Protocol is about reach: an
  > MCP server connects the agent to an external system (Drive, Salesforce, BigQuery, or an
  > internal API). A Skill is about know-how: it teaches the agent how to think about a particular
  > kind of work. When a Skill needs data, it tells the agent to call a tool, typically one
  > provided by an MCP server."
- **Locator.** Day 3, p15.
- **Searched for.** Nothing. A definition of two primitives against each other, carrying no
  number, no date and no named result.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## Skill versus AGENTS.md: always loaded against loaded on demand

- **Claim.** An instructions file is always in context for the project; a Skill enters context
  only when it triggers. The two compose, with AGENTS.md optionally acting as a router into the
  skills library.
- **Quote.**
  > "Skill vs. AGENTS.md. From one side AGENTS.md is always loaded within the project; Skills load
  > on demand. The cleanest setups use both. Keep AGENTS.md tight (project conventions, stack,
  > build commands, etc.) and if needed use it also as a router into the Skills library, with a
  > short catalog at the bottom that tells the agent what's available."
- **Locator.** Day 3, p15.
- **Searched for.** Nothing. Definitional.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## Skills install into a shared .agents/skills/ folder, and managers symlink them

- **Claim.** A cross-tool convention is emerging around a shared `.agents/skills/` folder at the
  project root, and the community managers skillport and openskills will automatically symlink a
  central skills library into every tool's expected location.
- **Quote.**
  > "While a highly welcome cross-tool convention is emerging around a shared .agents/skills/
  > folder at your project root, many tools still protect their own bespoke paths. (Pro tip: If
  > you bounce between multiple CLI tools and IDEs, community managers like skillport or
  > openskills will automatically symlink your central skills library to every tool's expected
  > location)."
- **Locator.** Day 3, p13, under "1. The File Drop (Coding Agents & CLIs)".
- **Searched for.** Whether `.agents/skills/` is documented as a convention anywhere outside this
  paper; whether both named tools exist; and whether either does what is claimed. Searched because
  the claim names two specific third-party artefacts and a behaviour each is said to have.
- **Came back.** The convention is real and the described behaviour is not. The agentskills.io
  client implementation guide tells agent authors to scan both a client-specific directory and
  `.agents/skills/` at project and user scope, and states that "The `.agents/skills/` paths have
  emerged as a widely-adopted convention for cross-client skill sharing", while noting the
  specification itself "does not mandate where skill directories live". The same note records that
  "Some implementations also scan `.claude/skills/` … since many existing skills are installed
  there". Both tools exist: `openskills` is on npm under Apache-2.0, and `skillport` is
  `gotalab/skillport` on GitHub. Neither symlinks by default. OpenSkills installs copies —
  "By default, installs are project-local (`./.claude/skills`, or `./.agent/skills` with
  `--universal`)" — and documents symlinks only as a manual `ln -s` under "Local Development with
  Symlinks". SkillPort does not place files in each tool's path at all; it serves skills to agents
  "via MCP or CLI" and takes an explicit `--skills-dir`.
- **Verdict.** `corrected`. The `.agents/skills/` convention stands, and it stands on a better
  source than this paper. "Will automatically symlink your central skills library to every tool's
  expected location" describes neither tool's default: one copies, the other serves over MCP.

## Day 5: skills must live in a .agent directory for Antigravity

- **Claim.** Skills can live anywhere in a repository but must be stored in a designated `.agent`
  directory to be recognised by the Antigravity workspace manager.
- **Quote.**
  > "While skills can live anywhere in the repository, they must be stored in the designated
  > .agent directory to be recognized by the Antigravity workspace manager. […]
  > ./my-app/.agent/skills/docs-maintenance/SKILL.md"
- **Locator.** Day 5, p11, item 2 of "Where do the instructions live?".
- **Searched for.** Google's own documentation for Antigravity skill locations — specifically the
  codelab Day 3 cites as its first endnote — and whether the singular `.agent` path exists
  anywhere in the ecosystem.
- **Came back.** Google's "Getting Started with Antigravity Skills" codelab, which Day 3 cites at
  endnote 1, gives the project scope as `<project-root>/.agents/skills/` — plural — and the global
  scope as `~/.gemini/antigravity-cli/skills/`, and separately warns that skills installed to
  `~/.agents/skills` are picked up by Antigravity but not by the Antigravity CLI, which needs them
  copied to one of those two paths. Day 3's own p13 gives `.agents/skills/` as well. The singular
  `.agent/skills/` is not invented — it is what OpenSkills writes to under `--universal`, chosen
  explicitly "to avoid conflicts with Claude's plugin marketplace" — but it is not the path
  Google's Antigravity documentation designates.
- **Verdict.** `corrected`. Day 5 and Day 3 disagree, and Google's own Antigravity documentation
  sides with Day 3. The path is `.agents/skills/` at project root, with
  `~/.gemini/antigravity-cli/skills/` for the Antigravity CLI at global scope. `.agent/skills/` is
  a real but different convention belonging to one third-party installer.

## Day 5: a Skill is a structured Markdown file

- **Claim.** Skills are structured Markdown files containing specialised, trigger-based workflows.
- **Quote.**
  > "Skills are structured Markdown files containing specialized, trigger-based workflows."
- **Locator.** Day 5, p11.
- **Searched for.** Nothing. A definition, carrying no number, no date and no named result.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`. Recorded because it is narrower than Day 3's definition and
  the two cannot both be the vocabulary. Day 3, p10, makes a Skill a directory of which the
  Markdown file is one required member, with `scripts/` able to hold executable code in any
  language and `assets/` able to hold templates and schemas; Day 5's phrasing loses that, and with
  it the whole of the third disclosure level. Day 1, p17, sits between them — "structured,
  portable packages of procedural knowledge" — and is compatible with Day 3. On a disagreement of
  this kind the paper that owns the subject wins, and the subject is Day 3's.

## Where the whitepaper and this repository diverge

This repository runs on skills, so three of Day 3's checkable claims can be read against practice
rather than only against the standard.

The naming rule is the clearest divergence. All forty skill directories under `.agents/skills/`
are kebab-case and none is snake_case, which is what the agentskills.io specification requires and
what the entry above records as a correction to Day 3, pp11 and 47.

The install path is the clearest agreement. Skills live once in `.agents/skills/` — the shared
convention Day 3 names at p13 and the client implementation guide documents — and are surfaced to
Claude Code through symlinks in `.claude/skills/`, which is the compatibility path the same guide
records. That is the arrangement Day 3 attributes to skillport and openskills at p13; neither tool
performs it by default, and here it is done directly, which is a further reason the symlink half
of that claim does not stand as written.

The four-folder layout is a floor rather than a ceiling. The standard permits any additional
files and directories, and most skills here carry an `agents/` subdirectory that appears in
neither Day 3's Snippet 1 nor Appendix A's structure. That is an extension the specification
allows and Day 3 does not mention, not a contradiction of either.
