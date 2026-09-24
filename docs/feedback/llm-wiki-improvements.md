# llm-wiki improvements

Defects and open questions found while building the three tiers and running the first
ingest loop. This file records them; it does not act on them. Each entry names what was
hit, what it cost, and where the fix would land — the harness configuration, the
`markdown-harness` tool itself, one of the skills, or the schema.

Entries are appended in the order they were found, newest last.

## Setup phase, 2026-09-23

### 1. The harness has no `date` format, only `datetime`

**Where:** `markdown-harness.config.yaml`, `raw` rule, `published` field.

`published: 2025-07-30` failed `FORMAT_MISMATCH` against `format: datetime`, whose
regex demands a full instant with an offset. A report is published on a day. Satisfying
the format meant writing `2025-07-30T00:00:00Z`, inventing a precision the publisher
never gave.

Worked around with `pattern: '^\d{4}-\d{2}-\d{2}$'`, which loses the format's own
validation and needs a sibling `intent` to satisfy the config gate.

**Would land in:** the tool. A `date` format beside `datetime`, `uri` and `actor`.

### 2. A pattern of `.+` makes nested artefacts ungoverned yet citable

**Where:** `markdown-harness.config.yaml`, `finding` and `concept` rules,
`sources[].resource`.

Written first as `^docs/llm-wiki/raw/.+\.(md|pdf)$`. Because `folders:` selectors do
not recurse, a file at `raw/<dir>/<file>.pdf` is governed by nothing — but `.+` matched
it, so it stayed citable. A claim could rest on a document no rule had ever read, and
nothing would report it.

Tightened to `[^/]+`. The general shape of the defect: wherever a rule's folder reach
and a pattern's reach are written separately, they can disagree silently.

**Would land in:** the tool. Either a selector that can say "this folder and no deeper"
in a pattern-shareable form, or a config-time warning when a path pattern admits paths
the rule set does not govern.

### 3. `--check` cannot see a binary that arrived without its sidecar

**Where:** the tool.

`actionFor` ignores every file not ending `.md`, and no orphan or companion concept
exists anywhere in the package. The three-tier design requires a binary to land beside a
markdown sidecar, since the sidecar is the only half carrying provenance. A PDF dropped
into `raw/` with no sidecar is invisible: it violates the design and passes the gate.

No workaround. The convention is enforced by the `ingest` skill and by review.

**Would land in:** the tool. A rule-level declaration that a governed folder admits
companions, and a violation when one arrives alone.

### 4. Expiry is not a gate outcome, which reads as a gap until you know why

**Where:** the tool, `--check` versus `--assess`.

`--check` is deliberately clock-free, so a corpus cannot go red overnight on a tree
nobody touched. A Concept past its `stale_after` therefore passes `npm run verify`; the
expiry surfaces only through `--assess`, which the Claude Code hook runs on read. This
is the right call, but the split means the `assess.stale` prompt is unreachable from CI
and a repository without the hook gets no expiry signal at all.

**Would land in:** nothing yet. Recorded so the next reader does not mistake it for a
missing check and "fix" it by moving expiry into `--check`.

### 5. A spec restated to an agent is not a spec the agent reads

**Where:** the skills, and how this work was briefed.

Two rules came back missing fields that the brief stated explicitly — `stale_after` and
`assess` on `concept`, `type` on `llm-wiki-index` — each reported as "not specified".
The brief was prose. The rules that survived intact were the ones the agent could read
off an existing rule in the same file.

**Would land in:** the skills. An authoring skill that works from a field table in a
repository document, rather than from prose in a prompt, has a source it can re-read.

### 6. Publication dates arrive at three different precisions

**Where:** `markdown-harness.config.yaml`, `raw` rule, `published` field.

Entry 1 replaced `format: datetime` with a full-date pattern. That was still too
precise. The five Google whitepapers are dated "May 2026" in their page footers and
carry no day at all, while the Veracode press release is dated 30 July 2025. A
full-date pattern would have forced `2026-05-01` on the whitepapers — a day no
publisher ever stated, sitting beside locators that readers are meant to trust.

Widened to `^\d{4}(?:-\d{2}(?:-\d{2})?)?$`, admitting year, year-month, and full date.

The general shape: a provenance field's precision is a property of the source, not of
the schema, and a schema that fixes one precision makes agents invent the rest. Found
before the first ingest ran, by reading the artefacts rather than by the gate — which
is the wrong way round.

**Would land in:** the tool. A `date` format that accepts reduced precision, per ISO
8601's own reduced-precision forms, rather than every repository rediscovering this
with a hand-written pattern.

### 7. Prettier does not lint a skill, so checking one proves nothing

**Where:** `.prettierignore`, and every brief that asks for `npx prettier --check` on a
`SKILL.md`.

`.prettierignore` excludes `.agents` and `.claude`. A brief asking an agent to verify a
skill with `prettier --check` therefore gets a pass that means nothing, and the agent
reports it as evidence. Confirmed by re-running with `--ignore-path /dev/null`, which
is the only way to get a real verdict on those paths.

**Would land in:** the skills, and the briefs. Either drop the check from skill-writing
instructions or state the `--ignore-path` form, so a green line is never mistaken for a
formatted file.

### 8. Tool output is rewritten in transit, including verdicts

**Where:** the RTK hook, outside this repository.

`prettier` and `diff` output came back as "all files formatted" and "files identical"
when neither was established — the hook rewrites command output before the agent reads
it. Every verification in this session that rests on reading a command's own words
rather than its exit code is therefore weaker than it looks.

This is the most serious entry here, because it is not confined to the llm-wiki: any
agent-run check whose result is read as prose can be reported green without being
green. `rtk proxy <cmd>` returns the unfiltered output.

**Would land in:** the harness, not this repository. Recorded because the verification
in these commits was read through it, and because exit codes should be preferred to
output text everywhere until it is fixed.

### 9. `write-episode` still lands files where no rule reaches

**Where:** `.agents/skills/write-episode/SKILL.md`, step 1.

It hands back a `yt-dlp` command writing to `docs/llm-wiki/<slug>.%(ext)s` — the layer
root, outside `raw/`. Under the three tiers that path is governed by nothing and
matches neither citation pattern, so a transcript landed by following that skill is
invisible and uncitable. It also uses "Source" as a type name, which the tier split
retired.

The same stale use of "Source" appears in design-ADRs 0002 and 0003; issue #8 already
records that 0003 is corrected rather than superseded.

**Would land in:** the skills. `write-episode` should call `/ingest` rather than carry
its own landing path, which is the general lesson: a skill that writes into a governed
folder by hand will go stale the first time the governance changes.

### 10. `artefact` is both the avoided word and the word used everywhere

**Where:** `CONTEXT.md`, the Raw entry, against `markdown-harness.config.yaml`,
`scripts/build-wiki-index.mjs` and `.agents/skills/ingest/SKILL.md`.

The Raw entry's `_Avoid_` list reads "source, artefact, primary, original", yet
"landed artefact" appears fourteen times across the harness intents, the index
generator's own description and the ingest skill — and throughout issue #8 and
`docs/steering/information-architecture.md`.

`CONTEXT.md` says an `_Avoid_` list rejects a word "as the name for that concept" while
the word keeps its meaning elsewhere, so the usages are defensible read one way and a
violation read another. Either resolution is cheap; leaving it unresolved is what
costs, because the next agent reads the list literally.

**Would land in:** `CONTEXT.md`. A decision, not a fix: drop `artefact` from the Raw
`_Avoid_` list, or strike the word from the other four documents. The vocabulary owner
decides, and this log does not.

## Finding loop, 2026-09-23

### 11. A Raw's `description` must describe, never assert

**Where:** `docs/llm-wiki/raw/veracode-genai-code-security-2025.md`, and the `raw`
rule's `description` intent.

The migration gave that Raw the description "Veracode's finding that model size and
recency did not improve security performance." Four hours later the first Finding
written against it returned `corrected` on exactly that claim: Veracode's own October
2025 update, on the same 80-task benchmark, records a newer model at a 72 per cent
pass rate against the band it had called flat. The recency half is now known false.

The description is the line `docs/llm-wiki/index.md` copies verbatim, so the index
broadcasts a false claim in this repository's own voice. And Raw is written once and
never rewritten, so by the tier's own rule there is no legal way to correct it.

The defect is not the stale claim. It is that a description was allowed to assert the
source's conclusion instead of describing what the artefact holds. "Veracode's finding
that X" asserts X. "A measurement of X across N models, with the PDF ungated" describes
the artefact and cannot go stale, because an artefact's contents do not change.

Note the boundary question this exposes and does not answer: immutability protects what
landed, and a `description` is metadata this repository authored about the artefact
rather than anything its original author wrote. Whether correcting it counts as
rewriting a Raw is undecided, and the tier rules do not distinguish the two halves of
the file.

**Would land in:** `markdown-harness.config.yaml`, the `raw` rule's `description`
intent, and the `ingest` skill. Both should say a Raw's description names what the
artefact contains and never what it concludes — a description that can be refuted is
in the wrong tier. The boundary question is a design-ADR.

### 12. The refutation search works, and it is expensive

**Where:** `docs/agents/finding-format.md`, and any run that budgets for a Finding.

The first Finding ran seven distinct refutation searches over five claims and
overturned two verdicts the prior work had recorded as confirmed, plus a third about
citation decay. Two of the three corrections came from the publisher's own later
documents rather than from any critic — which is the case a search for support can
never reach, because the publisher agrees with itself at every point in time.

It took roughly twelve minutes and two hundred thousand tokens for five claims against
one source. The five course Findings carry substantially more claims each. The bound —
a search fires only on a claim carrying a number, a date or a named study — is what
makes this affordable at all, and it is load-bearing rather than a convenience.

**Would land in:** nothing yet. Recorded so the cost is known before the remaining
~67 topics are commissioned, and so the bound is not loosened without someone pricing
it first.

## Ingest loop, 2026-09-23

### 13. A required `published` has no answer for an undated page

**Where:** the `raw` rule, and `.agents/skills/ingest/SKILL.md`, _Refusals_.

`published` is required and the intent forbids inventing precision. The Kaggle course
landing page prints no date anywhere. The skill's refusals cover a page that cannot be
landed at all; nothing covers a page that lands carrying no date, so the run had to
decide alone and wrote `'2026'` with the reasoning in the body.

**Would land in:** the skill. Name the case and fix one answer, rather than leaving
every run to invent its own.

### 14. A bare four-digit year fails as an integer, and the error does not say so

**Where:** the harness, `CONSTRAINT_SHAPE_MISMATCH`.

`published: 2026` is parsed by YAML as a number, so a string pattern reports a shape
mismatch. The message never says the value needs quoting. `2026-05` is fine unquoted;
`'2026'` is not. Cost one red check and a guess.

**Would land in:** the tool. A shape mismatch between a scalar and a string constraint
should say what the value was parsed as and what would fix it.

### 15. The skill has no path for a JavaScript-only page

**Where:** `.agents/skills/ingest/SKILL.md`, _Two paths_.

The landing page returns HTTP 200 with an empty `<div id="root">`. A Googlebot
user-agent returns the same shell. The five-part list and the day ordering — the whole
reason that page was worth landing — are in nothing Kaggle serves.

A client-rendered shell is now the common case for a course or product page, and the
skill has exactly two paths, neither of which fits. The working precedent already
exists in the corpus: the Veracode Raw carries a "what this Raw cannot support"
section that keeps later Findings honest. The skill does not point at it, so the run
had to infer the shape by reading that file.

The order was recovered instead from the whitepapers citing each other by day number —
days 1, 4 and 5 rest on printed text, and Day 3 has no series cross-reference at all,
so its position rests only on its download filename. That is recorded in each sidecar
rather than smoothed over.

**Would land in:** the skill. A third path, named, with the honest-shortfall section as
its shape.

### 16. `resource` assumes a direct file URL that often does not exist

**Where:** the `raw` rule's `resource` intent, and the skill.

The five PDFs are served from a `storage.googleapis.com` path that returns 403; no
public direct URL exists. The publisher's per-artefact landing page is the only durable
handle, and is better than a signed URL that expires anyway.

**Would land in:** the skill and the rule intent. A landing page satisfies `resource`,
and is preferable to a direct file URL that will not resolve later.

### 17. The 300-character description cap is invisible until the check fails

**Where:** the `raw`, `finding` and `concept` rules.

The skill's worked example models a prose description, and the first Day 1 attempt came
in at 335 characters and failed. The cap is real and right — the index copies these
verbatim — but nothing surfaces it at writing time.

**Would land in:** the skills. State the cap where the description is written, not only
where it is validated.

### 18. `mh --check` has no human-readable summary

**Where:** the tool.

Every check in this session was piped through a JSON parser to read three numbers.
A single summary line on success, with the JSON behind a flag, would remove a parser
from every skill and every brief that runs the gate.

**Would land in:** the tool.

### 19. Subagents writing Findings have no web search

**Where:** the harness, not this repository.

`WebSearch` and `WebFetch` are advertised as deferred tools but do not register for a
spawned subagent: `ToolSearch` returns no match for either name. Every refutation search
in the Finding loop therefore ran through `curl` from Bash, against publishers' own
pages plus the npm and GitHub APIs. DuckDuckGo's HTML endpoint starts returning 202
anomaly pages after a few queries, so keyword search is effectively unavailable.

The coverage this leaves is asymmetric, and the asymmetry runs the right way by luck
rather than design. Direct fetching is strong at the question "does the cited source
say what the citing document claims it says" — which is where every correction in this
loop came from. It is weak at "has anyone published a critique", because finding an
unknown document is what a search engine is for.

So a `no correction found` verdict produced under this constraint is weaker than the
same verdict produced with search, and nothing in the Finding records which regime it
was written under.

**Would land in:** `docs/agents/finding-format.md`. Either the refutation search records
the tools it had, or the verdict vocabulary distinguishes a search that could not run
from one that ran and returned nothing — which is the same distinction `no correction
found` already draws against `verified`, one level down.

### 20. Every correction came from the publisher, not from a critic

**Where:** `docs/design-adr/0007-a-review-searches-for-correction-not-for-support.md`,
now evidenced rather than argued.

Six Findings, sixty-one claims, thirty-one verdicts of `corrected`. Not one correction
came from a critic. Every one came from the cited publisher's own material:

- Veracode's October 2025 update contradicting its own flat-performance claim, on the
  same benchmark.
- Anthropic's MCP paper being the true source of a token figure used to argue for
  skills, in a paper saying the two approaches compose rather than compete.
- Google's own earlier whitepaper being where Day 1's "four parts" came from, which is
  why one page counts both five and four.
- SkillsBench's own headline — a 16.2-point average gain — omitted beside a 19 per cent
  figure computed over a different set than the one the paper labels.

A search for support would have found every one of these documents and counted them as
agreement. They are the same publishers, saying compatible-sounding things, at
different times. That is precisely the failure mode design-ADR 0007 describes, and it
is now measured rather than reasoned about.

The operational consequence for the bound: a claim citing a named source needs the
source read, not merely resolved. Eleven of nineteen claims in the evaluation Finding
carry live URLs that return 200 and do not say what they are cited for. A link check
would have passed all of them.

**Would land in:** nothing. Recorded as evidence for a decision already taken, and as
the answer to anyone proposing to replace the refutation search with link validation.

## Concept phase, 2026-09-24

### 21. The mechanism that enforces "commissioned" also blocks orchestration

**Where:** `.agents/skills/write-concept/SKILL.md`, `disable-model-invocation: true`.

A Concept must be commissioned and never automatic. Writing that into the description
leaves it to the model's judgement; setting `disable-model-invocation` puts it in the
mechanism, which is why the skill was written that way and why `write-episode` and
`review-episode` already are.

It works. An orchestrated subagent asked to write the Concept was refused by the Skill
tool and declined to reconstruct the workflow by hand, on the correct reasoning that a
relayed commission is not the user's own invocation.

The cost is that an orchestrated run cannot complete. The user had commissioned the
Concept explicitly — the words "run /write-concept on the 5 findings" were theirs — but
the commission arrived through an agent, and the mechanism cannot tell a relayed
instruction from an invented one. That is the same property that makes it trustworthy.

This is the second place in this design where enforcement lands on the user rather than
on the gate, and both are deliberate. The `verified` stamp cannot be forged because its
pattern is unsatisfiable by an agent. The Concept cannot be commissioned by an agent
because its skill is unreachable by one. Together they mean a Concept has two points
where a person must act, and a pipeline that claims to produce one without a person is
lying somewhere.

**Would land in:** nothing yet. Recorded because the trade-off should be re-decided
consciously if orchestration matters more than the guarantee. Flipping the flag moves
the rule back into the description, where it is advisory.
