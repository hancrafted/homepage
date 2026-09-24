---
type: Finding
title: How a third-party Agent Skill is judged trustworthy, and who owns it
description: >-
  What Day 3 says about judging a third-party Agent Skill before installing it and owning it
  afterwards, with Day 4 on supply chain. The 40,000 and 1.2M counts measure different
  populations; SkillsMP's two-star threshold does not exist; slopsquatting is not Wiz's term.
sources:
  - resource: docs/llm-wiki/raw/5-day-agents-vibecoding__day-3__agent-skills.pdf
    title: Agent Skills
  - resource: docs/llm-wiki/raw/5-day-agents-vibecoding__day-4__vibe-coding-agent-security-and-evaluation.pdf
    title: Vibe Coding Agent Security and Evaluation
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-24T00:44:29Z
---

# How a third-party Agent Skill is judged trustworthy, and who owns it

The question: by what test is a skill somebody else wrote admitted into an agent's context, and
once it is in use, who is answerable for it.

**Day 3** below is `5-day-agents-vibecoding__day-3__agent-skills.pdf`, which carries both halves —
the selection heuristics and source table at pp42–43, the governance material in Appendix A's
checklists at pp51–52, and the ownership model and capability ladder in Appendix B at pp55–59.
**Day 4** is `5-day-agents-vibecoding__day-4__vibe-coding-agent-security-and-evaluation.pdf`,
cited once, at p14, for the supply-chain control Day 3 invokes by analogy and never specifies.

**Every locator below is a PDF page index.** Day 3's page footers match that index, but its
printed table of contents runs three behind it: the contents list section 8 at 39, and section 8
begins on PDF page 42. A reader navigating by the contents lands three pages early. This note is
made once and not repeated.

Fourteen claims follow. Those naming a count, a date, a named study or a named third-party
artefact took a refutation search; the heuristics, tables and checklists that carry none of these
took a quote and a locator only, which is why seven verdicts read `outside the bound`.

## The selection test is three heuristics, not a mechanism

- **Claim.** Day 3's answer to how a practitioner chooses among skills they did not write is three
  heuristics applied by hand: prefer first-party, pin what you depend on, audit before adopting.
- **Quote.**
  > "Three heuristics help. 1. First, prefer first-party skills for vendor-specific tools.
  > Google's BigQuery skill, the official Stripe skill, anything written by the people who built
  > the underlying system. They will be more correct and more maintained than community
  > alternatives. […] 2. Second, pin everything you depend on. Community skills evolve, and an
  > unpinned dependency that worked yesterday can fail tomorrow. 3. Third, audit before adopting.
  > A skill is code that runs in your context. Treat it like any other dependency, with the same
  > supply-chain hygiene."
- **Locator.** Day 3, p42 for the first heuristic, p43 for the second and third.
- **Searched for.** Nothing. The claim carries no number, no date and no named study; it states
  three rules of thumb.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## Trust is defaulted by provenance tier, in three categories

- **Claim.** A skill's source falls into one of three categories — first-party vendor,
  organisation-curated, community — and each carries a different default stance, from trust on
  sight to audit on every adoption.
- **Quote.**
  > "Not all sources are equal. Three categories of skill source exist in early 2026, and the
  > right operational stance is different for each: […] First-party vendor skills — Trust by
  > default; pin a version […] Organization-curated skills — Trust within the org; review on
  > adoption […] Community skills — Audit before adopting; pin aggressively"
- **Locator.** Day 3, p43, Table 4, captioned "Overview of Agent Skill sources categorized by
  trust defaults, official examples, and maintenance ownership".
- **Searched for.** Nothing. A taxonomy and the stance attached to each tier, carrying no number,
  no date and no result. The named repositories in its Examples column are a separate claim and
  have their own entry below.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## Five of the six first-party repositories publish no version to pin

- **Claim.** The six repositories Table 4 names as first-party vendor skills can be trusted by
  default and pinned to a version.
- **Quote.**
  > "First-party vendor skills — Trust by default; pin a version — google/agents-cli, google/
  > skills, google-gemini/gemini-skills, anthropics/skills, stripe/ai, microsoft/skills — The team
  > that built the underlying product"
- **Locator.** Day 3, p43, Table 4, with `endnote 28` through `endnote 33` on p61 giving one
  GitHub URL for each.
- **Searched for.** Whether each of the six repositories exists at the path given and is published
  by the vendor named; and whether each publishes a version a consumer could pin to. Searched
  because the claim names six specific third-party artefacts and asserts a property of each.
- **Came back.** All six exist, under the exact paths `endnote 28` to `endnote 33` give, and all
  six are owned by the vendor named. Five of the six publish nothing to pin. Queried through the
  GitHub API, `google/skills`, `google-gemini/gemini-skills`, `anthropics/skills`, `stripe/ai` and
  `microsoft/skills` each return an empty tag list and an empty release list; only
  `google/agents-cli`, which is a CLI rather than a skills library, is tagged, at `v1.7.0`. The
  format gives no help either: the Agent Skills specification at agentskills.io defines `name`,
  `description`, `license`, `compatibility`, `metadata` and `allowed-tools` in SKILL.md
  frontmatter, and no version field at all. What pinning exists is by content rather than by
  version — the `skills` CLI records a GitHub tree SHA per skill as `skillFolderHash` in
  `.skill-lock.json`, and restoring from that lock is exposed only as `skills
experimental_install`, named experimental in the CLI's own help text.
- **Verdict.** `corrected`. The repositories and their ownership survive; "pin a version" does
  not. There is no version on five of the six examples the table itself offers, none in the
  format, and the one mechanism that approximates it pins a directory hash and is marked
  experimental. What a Concept may carry is "pin to a commit or a tree hash", not "pin a version".

## The 40,000 listings are one platform's, and not from the first weeks of January

- **Claim.** Public skill marketplaces had crossed 40,000 listings by early 2026, and the leading
  platform reported tens of thousands of new skills published in the first weeks of January alone.
- **Quote.**
  > "By early 2026, public skill marketplaces had crossed 40,000 listings, with the leading
  > platform reporting tens of thousands of new skills published in the first weeks of January
  > alone."
- **Locator.** Day 3, p42, opening section 8. The sentence carries no endnote.
- **Searched for.** A published count of marketplace listings disagreeing with 40,000; the
  identity of the "leading platform"; and a dated growth series that would put or fail to put tens
  of thousands of publications in the first weeks of January 2026.
- **Came back.** The magnitude holds and the attribution and the dates do not. The measurement
  behind the figure is the one Day 3 itself cites at p59: Ling, Zhong and Huang, `arXiv:2602.08004`,
  which crawled one marketplace, skills.sh, and finalised collection on 5 February 2026 at 40,285
  records. Its growth series is explicit — "the marketplace grows from 2,179 skills on January 16,
  2026 to 40,285 skills on February 5, 2026, a net increase of 38,106 skills in 20 days" — and its
  own summary dates the burst as running "from mid-January to early February 2026, exceeding
  40,000 by early February". On 16 January the platform held 2,179 skills in total, so tens of
  thousands were not published in the first weeks of January; they were published in the three
  weeks after. The plural "marketplaces" is also wrong: 40,000 is one platform's listing count,
  not a sum across platforms.
- **Verdict.** `corrected`. What a Concept may carry is "one marketplace, skills.sh, went from
  2,179 listings on 16 January 2026 to 40,285 on 5 February 2026". It may not carry that
  marketplaces in aggregate crossed 40,000, or that the growth fell in the first weeks of January.

## The 40,285 citation resolves, and sits outside the endnote apparatus

- **Claim.** Day 3's bibliography supports the scale of the selection problem with a measurement
  of 40,285 publicly listed skills.
- **Quote.**
  > "Ling, G., Zhong, S., & Huang, R. (2026). Agent Skills: A Data-Driven Analysis of Claude
  > Skills for Extending Large Language Model Functionality. arXiv:2602.08004. Analysis of 40,285
  > publicly listed skills from a major marketplace."
- **Locator.** Day 3, p59, at the foot of Appendix B, beneath "Cold start: where to actually
  begin". The reference carries no number and is not among the 36 endnotes at pp60–62; the Google
  Cloud Blog reference printed beside it duplicates `endnote 29`.
- **Searched for.** Whether `arXiv:2602.08004` resolves, to what, and whether the title, the
  authors and the count of 40,285 are as given; and whether the paper has been withdrawn or
  revised.
- **Came back.** The identifier resolves exactly. `arXiv:2602.08004v1`, submitted 8 February 2026,
  primary category cs.SE, authors George Ling, Shanshan Zhong and Richard Huang, titled _Agent
  Skills: A Data-Driven Analysis of Claude Skills for Extending Large Language Model
  Functionality_; one version, not withdrawn. Its abstract carries the count verbatim: "we conduct
  a large-scale, data-driven analysis of 40,285 publicly listed skills from a major marketplace".
  Two qualifiers Day 3 does not print bear directly on the question. The marketplace is named in
  the body — skills.sh — and the paper states its own limit: "our measurements are derived from a
  single snapshot of one public marketplace collected around early February 2026". More
  materially, the paper audited the safety of what it counted, and reports "54% are L0, 5% are L1,
  30% are L2, and 9% are L3", concluding that "nearly two fifths of the marketplace can access
  sensitive context or perform writes and actions, and a nontrivial share exposes critical
  capabilities", with software engineering skills carrying the highest critical share at 14 per
  cent.
- **Verdict.** `no correction found`. The identifier, the authors, the title and the count all
  hold. Recorded that the reference is orphaned from the numbered apparatus, so a reader working
  from the endnotes never reaches the only measurement in the paper that sizes the risk the
  selection problem is about.

## SkillsMP has no two-star threshold, and is not a marketplace

- **Claim.** SkillsMP is a community-aggregated marketplace of more than 1.2 million skills,
  applying minimum-quality indicators at a two-star threshold, whose operator recommends
  inspecting community skills before installation.
- **Quote.**
  > "35. Skills Marketplace. (2026). https://skillsmp.com. An independent community-aggregated
  > marketplace of 1.2M+ skills sourced from public GitHub repositories, with semantic search,
  > occupation filtering, and minimum-quality indicators (2-star threshold). Marketplace operator
  > explicitly recommends inspecting community skills before installation."
- **Locator.** Day 3, `endnote 35`, p62, cited from Table 4 at p43 where "SkillsMP marketplace" is
  listed under community skills, "Audit before adopting; pin aggressively".
- **Searched for.** Whether skillsmp.com states a 1.2M figure or a two-star minimum; whether its
  catalogue in fact excludes repositories below two stars; and whether the operator's own guidance
  says what the endnote says it says.
- **Came back.** The inspection recommendation survives and is blunter than the endnote; the
  threshold does not exist; the count and the word "marketplace" do not hold. The site's own FAQ
  reads "treat Skills like any open-source code: Skills can contain scripts (Python, Bash, etc.);
  Always review the code before installation; Check the author's reputation on GitHub; Prefer
  skills from trusted sources", and then, flatly, "We don't scan for malware (yet)". On quality it
  offers unquantified signals — "High GitHub stars (community validation)", "Active maintenance
  (recent commits)" — and says of testing, "Honestly? No. We've collected 200,000+ skills from the
  community — quality varies widely." No two-star threshold appears anywhere on the site, and the
  catalogue does not behave as if one existed: a query to the documented REST endpoint
  `/api/v1/skills/search` returned twenty results of which thirteen carry fewer than two stars and
  the top result carries zero. The only star mechanism in the API is `sortBy=stars`, an ordering,
  not a filter. The count is superseded twice over and by the operator's own inconsistency: the
  homepage reports 3,229,343 collected SKILL.md files while the FAQ still says 200,000+. Finally,
  the site describes itself not as a marketplace but as an index — "Results are indexed from public
  GitHub SKILL.md files. SkillsMP does not certify quality or safety" — so it hosts nothing, and
  Table 4's "pin aggressively" has nothing on SkillsMP to pin.
- **Verdict.** `corrected`. What may be carried is that SkillsMP indexes SKILL.md files found in
  public GitHub repositories, does not certify or scan them, and tells users to read the code
  before installing. The 1.2M figure, the two-star minimum-quality threshold and the
  classification as a marketplace should not be repeated.

## The Google repository is real, and its installer belongs to a third party

- **Claim.** Google launched its official Agent Skills repository at github.com/google/skills at
  Google Cloud Next 2026, installable with `npx skills install github.com/google/skills`.
- **Quote.**
  > "At Google Cloud Next 2026, Google launched its official Agent Skills repository at
  > github.com/google/skills, with skills installable via `npx skills install github.com/google/
skills` for use across Antigravity CLI, and any other coding agent that supports the Skills
  > standard."
- **Locator.** Day 3, p42, with `endnote 29` on p61; the same command is reprinted in the orphaned
  reference at p59.
- **Searched for.** Whether the repository exists and is Google's; whether it was launched at
  Cloud Next 2026 and when that was; whether `npx skills install` is a command the named CLI
  actually accepts; and who publishes that CLI.
- **Came back.** All four check out, and the fourth answer is not Google. The repository exists,
  created 31 March 2026, Apache-2.0, described "Agent Skills for Google products and
  technologies". The blog `endnote 29` cites is dated 22 April 2026 and opens "Today, on Day 1 of
  Google Cloud Next 2026, we're excited to announce the launch of Google's official Agent Skills
  repository: github.com/google/skills", listing thirteen skills at launch across seven products,
  three Well-Architected pillars and three recipes; the repository holds 162 skills today. The
  command string is Google's own, printed verbatim in that post — "Use `npx skills install
github.com/google/skills` to install these skills in the agents of your choice" — and it works,
  although not as documented: the `skills` CLI's README and help text list `add`, `use`, `list`,
  `find`, `remove`, `update` and `init`, and `install` and `i` appear only in the source as
  unlisted aliases of `add`. The CLI itself is `skills` on npm, version 1.7.0, MIT, whose
  repository field is `github.com/vercel-labs/skills` and whose npm maintainers are `rauchg` and
  `quuu`. The directory the whitepaper implies at p42 by "the leading platform" is the same
  vendor's: skills.sh carries the footer "Made with care by Vercel".
- **Verdict.** `no correction found`. Nothing here is refuted. Recorded because it bears on the
  first heuristic: the first-party skills the paper says to prefer are fetched by an installer and
  surfaced by a directory that neither Google nor Anthropic publishes, so "first-party" covers the
  content of a skill and not the path it travels.

## The 28.2 to 96.6 per cent figure is Google's own measurement of Google's own skill

- **Claim.** The Gemini API developer skill lifted Gemini 3.1 Pro from 28.2 per cent to 96.6 per
  cent on SDK code generation across 117 prompts.
- **Quote.**
  > "30. Google Developers Blog. (2026, March). Closing the knowledge gap with agent skills.
  > https://developers.googleblog.com/closing-the-knowledge-gap-with-agent-skills/. Reports the
  > Gemini API developer skill improving Gemini 3.1 Pro from 28.2% to 96.6% on SDK code generation
  > across 117 prompts."
- **Locator.** Day 3, `endnote 30`, p61, cited from Table 4's first-party row at p43.
- **Searched for.** Whether the post exists at that URL, whether it is dated March 2026, and
  whether it reports 28.2, 96.6 and 117 for the model named.
- **Came back.** All three figures are in the post, verbatim, and the date matches. The article's
  own structured description reads "Evaluation results show a massive performance boost, with the
  gemini-3.1-pro-preview model jumping from 28.2% to 96.6% success rate when equipped with the
  skill", `datePublished` 2026-03-25. The harness is as described: "We created an evaluation
  harness of 117 prompts to generate Python or TypeScript code using the Gemini SDKs". Three
  qualifiers the endnote drops are worth recording. The model is `gemini-3.1-pro-preview`, not
  Gemini 3.1 Pro generally, and the post's prose rounds the baseline to "28% for 3.1 Pro". The
  evaluation is the vendor's, of the vendor's own skill, so it is evidence for the first-party
  heuristic only in the sense that a vendor measured itself. And the same post cuts against two of
  the paper's positions in a single paragraph: "we know from Vercel's work that direct instruction
  through AGENTS.md can be more effective than using skills", and "right now there isn't a great
  skill update story, other than requiring users to update manually. In the long term this could
  leave old skill information in user's workspaces, doing more harm than good."
- **Verdict.** `no correction found`. The numbers, the model family, the prompt count and the date
  all hold. What a Concept may carry is "Google measured its own Gemini API skill lifting
  gemini-3.1-pro-preview from 28.2 to 96.6 per cent across 117 SDK prompts"; it should not be
  quoted as independent evidence that first-party skills are more correct.

## Ownership is the first governance decision, and it is distributed

- **Claim.** The most important governance decision about a skills library is who owns each skill,
  and the answer is to give each skill to the team that already owns the expertise inside it.
- **Quote.**
  > "The single most important governance decision a retailer makes about its skills library is
  > who owns each skill. The principle is to distribute ownership to the teams that already own
  > the underlying expertise"
- **Locator.** Day 3, p57, above Table 5, which maps `project-guidance` and `product-fit` to trades
  knowledge and category management, `materials-list` to Pro merchandising, `delivery-window` to
  store operations and fulfilment, and `review-summarize` to personalisation and data science, each
  with a reason.
- **Searched for.** Nothing. A governance principle and an illustrative mapping, carrying no
  number, no date and no named study.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## A skill's owner is named alongside its capability tier, skill by skill

- **Claim.** Ownership is recorded per skill, not per library, and is stated together with what
  that skill is permitted to do.
- **Quote.**
  > "materials-list. […] Owned by Pro merchandising. Draft-only tier: the customer reviews before
  > purchasing. […] return-policy. […] Owned by customer service. Read-only tier. Promotion to
  > action-allowed (e.g. issuing a refund) requires a second skill with much tighter review. […]
  > Each one is small enough to be reviewed, tested, and shipped independently."
- **Locator.** Day 3, p56; the list begins at p55, where each skill is introduced as "one folder"
  with "a single owner" and "its own eval suite".
- **Searched for.** Nothing. A worked illustration the paper labels as such — "We describe a
  pattern, not the implementation of a single vendor", p53 — carrying no number, no date and no
  named study.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## The second governance decision is a three-rung capability ladder

- **Claim.** What a skill is allowed to do is fixed by placing it on one of three rungs —
  read-only, draft-only, action-allowed — each with its own review requirement, rising to
  security, compliance and executive sign-off at the top.
- **Quote.**
  > "The second governance decision is what each skill is allowed to do. […] Read-Only — May fetch,
  > query, or describe data; cannot mutate state — Domain team approval […] Draft-Only — May
  > produce content for human review; cannot send or commit — Domain team + format owner […]
  > Action-Allowed — May execute irreversible operations on real systems — Domain team +
  > security/compliance + executive sign-off"
- **Locator.** Day 3, p58, Table 6, captioned "The read/draft/act governance ladder classifying
  skill capabilities, review requirements, and operational examples"; the same tier model is
  applied to evaluation at p51, "Any failure holds the skill at the draft tier, regardless of
  happy-path performance".
- **Searched for.** Nothing. A classification and the approvals attached to it, carrying no number,
  no date and no named study.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## Publishing a skill requires review by someone other than its author

- **Claim.** Before a skill ships, a second person reads its description, a security scan passes,
  the cross-tool install paths are tested, and org-level provisioning is updated.
- **Quote.**
  > "Deployment checklist — Frontmatter validates (lint passes) — Description includes what + when
  >
  > - when-not — Scripts have unit tests passing in CI — Eval suite passes in CI with min-pass
  >   threshold — Security scan clean (no secrets, no untrusted deps) — Description reviewed by
  >   someone other than the author — Cross-tool install paths tested if shipping publicly —
  >   Org-level admin provisioning updated (if applicable)"
- **Locator.** Day 3, pp51–52, in Appendix A. The first five items sit on p51, the last three on
  p52.
- **Searched for.** Nothing. A checklist, carrying no number, no date and no named study.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`.

## Day 4: the supply-chain control is vetted registries, pinning, SBOM and signatures

- **Claim.** An agent that can alter a dependency graph must draw dependencies only from vetted
  providers or internal registries, pin them cryptographically, and have CI verify SBOM entries
  and digital signatures before anything reaches production.
- **Quote.**
  > "Because autonomous agents can alter dependency graphs without human confirmation, a single
  > hallucination can pull malware directly into the build environment. […] Instead, agents must
  > source dependencies exclusively from vetted providers or internal enterprise registries,
  > whilst enforcing strict cryptographic version pinning. As a final defensive pillar, CI/CD
  > pipelines must automatically verify Software Bill of Materials (SBOM) entries and digital
  > signatures before any artifacts advance to production, acting as a definitive gate using
  > Binary Authorisation."
- **Locator.** Day 4, p14, under "Mitigating Hallucinated Packages".
- **Searched for.** Nothing. A prescription, carrying no number, no date and no named study.
- **Came back.** Not applicable.
- **Verdict.** `outside the bound`. Recorded because it is the control Day 3 gestures at from p43
  — "Treat it like any other dependency, with the same supply-chain hygiene" — and never applies to
  a skill. Of the four parts, only the first has any counterpart in the skills ecosystem, as a
  provenance tier that nothing enforces. A skill has no SBOM, no signature and, per the entry
  above, in five of six first-party cases no version to pin.

## Day 4: slopsquatting is not Wiz's term

- **Claim.** Attackers publish malware under dependency names that language models are known to
  hallucinate, in a technique Wiz refers to as "slopsquatting".
- **Quote.**
  > "According to Wiz's research on vibe coding, attackers actively exploit the tendency of
  > language models to hallucinate dependency names: they upload malicious packages using these
  > fabricated names so that automated agents will inadvertently download them, a technique Wiz
  > refers to as 'slopsquatting.'"
- **Locator.** Day 4, p14, with `endnote 5` on p41 giving Wiz Research, "From Prompts to
  Production: The Technical Guide to Secure Vibe Coding", 2026. `endnote 5` duplicates `endnote 2`
  exactly — same publisher, same title, same URL, cited twice under two numbers.
- **Searched for.** Whether the cited Wiz guide contains the term; whether Wiz coined it; and
  whether any published measurement disagrees that the hallucination rate is high enough to make
  the attack practical.
- **Came back.** The mechanism is solid and better sourced elsewhere; the naming is not Wiz's. The
  cited URL resolves to a lead-capture landing page whose public text is a download form and four
  key takeaways, none of which mention hallucinated packages, dependency names or slopsquatting;
  the guide itself is behind registration, so the attribution cannot be checked against the source
  Day 4 gives for it. Wiz's public vibe-coding corpus does not use the word either: neither
  `wiz.io/academy/ai-security/vibe-coding-security` nor
  `wiz.io/blog/common-security-risks-in-vibe-coded-apps` contains "slopsquatting", and neither
  discusses package hallucination. The coinage is recorded elsewhere and predates the 2026 guide
  by a year: Socket's report of 8 April 2025 states that "the term slopsquatting was coined by PSF
  Developer-in-Residence Seth Larson and popularized in a recent post by Ecosyste.ms creator
  Andrew Nesbitt". The underlying measurement is Spracklen, Wijewickrama, Sakib, Maiti, Viswanath
  and Jadliwala, _We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by
  Code Generating LLMs_, `arXiv:2406.10279`, USENIX Security Symposium 2025, pages 3687–3706: 16
  models, 576,000 code samples in Python and JavaScript, "an average percentage of hallucinated
  packages of at least 5.2% for commercial models and 21.7% for open-source models, including a
  staggering 205,474 unique examples of hallucinated package names". That paper never uses the
  word "slopsquatting" once. The class remains live work — `arXiv:2605.01047` names slopsquatting
  as the attack its defence targets, and `arXiv:2602.20717`, `arXiv:2607.02052` and
  `arXiv:2608.22652` all address package hallucination through 2026 — and nothing found disputes
  the mechanism.
- **Verdict.** `corrected`. The attack, the incentive and the agent's role in it survive. The
  attribution does not: the term is Seth Larson's, from April 2025, and the source Day 4 cites for
  it neither demonstrably contains it nor can be read without registering. A Concept may write
  "slopsquatting, the registration of package names that models hallucinate", and must not write
  that Wiz named it.

## How 40,000 and 1.2M sit in one whitepaper

The three counts are not three estimates of one population, and only one of the three is a
measurement.

**40,285** is a census: every skill listed on one marketplace, skills.sh, on 5 February 2026,
crawled and audited by Ling, Zhong and Huang. It is the number the whitepaper rounds to 40,000 at
p42 and cites, unnumbered, at p59.

**1.2M+** is a crawl: SKILL.md files discovered in public GitHub repositories by an aggregator
that hosts none of them. The unit differs — a file found in a repository, not a listing published
to a platform — and so does the gate, since publishing to skills.sh is an act and being indexed by
SkillsMP is not. The endnote's figure is also the oldest of the three: the aggregator now reports
3,229,343 files, and skills.sh itself now reports 1,533,499 skills, having grown thirty-eight-fold
in the seven months since the census the whitepaper rests on. By its own May 2026 publication date
the 40,000 was already stale.

So the orders of magnitude separate a platform's listings from the open web's files, and the gap
between them is the size of the selection problem rather than a contradiction inside it. What does
not survive is the framing: "public skill marketplaces had crossed 40,000 listings" makes a
single-platform census read as an ecosystem total, and `endnote 35` makes a search index read as a
peer of that platform.

## What the format does not carry

Two observations fall out of the searches above and belong beside the ledger rather than inside it.

The Agent Skills specification defines no field for signature, provenance, publisher or version.
Its one capability field, `allowed-tools`, is optional and labelled "Experimental. Support for
this field may vary between agent implementations". Day 3's read/draft/act ladder at p58 is
therefore an organisational control enforced by review and by who is allowed to merge, not a
constraint the format expresses or any runtime is obliged to honour. Nothing in a SKILL.md tells
an agent which rung its author put it on.

The ecosystem has, since May 2026, built two of the things Table 4 leaves to the adopter. skills.sh
now publishes an Official listing naming the organisations that build the technology their skills
describe, and a Security Audits table carrying three independent verdicts per skill — from Gen
Agent Trust Hub, Socket and Snyk — with "Pending" where no scanner has run. That is the first
heuristic and the third made machine-readable by the platform rather than performed by hand. Day
3's account of how a skill is judged is not wrong so much as it is a description of the moment
before the infrastructure arrived. Notably, `google/skills` is indexed there, at 162 skills and
668,400 installs, but does not appear in that Official listing.
