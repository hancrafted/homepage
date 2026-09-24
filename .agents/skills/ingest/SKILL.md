---
name: ingest
description: Land a PDF or a web page in docs/llm-wiki/raw/ as a Raw, so a Finding or Concept can cite it. Reach for it whenever a file or URL is about to be quoted and no Raw holds it yet.
argument-hint: 'A URL or a local file path'
---

# Ingest

Land one Raw: `docs/llm-wiki/raw/<stem>.md`, beside `docs/llm-wiki/raw/<stem>.<ext>` when what landed is a binary. A Raw is what landed, as it was found, written once and never rewritten; everything else the llm-wiki holds traces back to one, and nothing can cite what has not landed. `CONTEXT.md` fixes the vocabulary — Raw, Finding, Concept, llm-wiki — and its `_Avoid_` lists name the synonyms to leave alone.

This skill lands. It asks no research question and writes no Finding or Concept.

## Read before landing

| Read                                           | For                                                                   |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| `npx mh --query docs/llm-wiki/raw/<stem>.md`   | every field the sidecar owes — `intent` is the test                   |
| `CONTEXT.md`                                   | Raw, Finding, Concept, llm-wiki, and the `_Avoid_` lists              |
| `docs/steering/information-architecture.md` §8 | the three tiers, one-way citation, why every tier is flat             |
| `docs/agents/finding-format.md`, _Locators_    | what a Finding will point at inside this Raw, so it arrives pointable |

## The stem

`docs/llm-wiki/raw/` is flat. The harness's `folders:` selector is literal and non-recursive, so a file one level down owes no frontmatter, nothing reports it missing, and both citation patterns — `^docs/llm-wiki/raw/[^/]+\.(md|pdf)$` — refuse its path. A nested Raw is ungoverned and uncitable at once. Grouping lives in the filename:

```text
<series-slug>__<position>__<title-slug>.<ext>
```

`__` is the segment delimiter and appears nowhere else; each segment is kebab-case. The series slug is the publisher's own name for the series, taken from the URL of the page that lists its parts, never coined here: two runs landing two parts of one series must arrive at the same first segment without seeing each other's work, and only the publisher's name gives them that. The position is the part's number as the publisher counts it — `day-1`, `part-3`, `ep-12`. A file belonging to no series, or to a series the publisher gives no URL, takes the title slug alone and names the series in the body.

```text
docs/llm-wiki/raw/5-day-agents-vibecoding__day-1__the-new-sdlc-with-vibe-coding.pdf
docs/llm-wiki/raw/5-day-agents-vibecoding__day-1__the-new-sdlc-with-vibe-coding.md
docs/llm-wiki/raw/veracode-genai-code-security-2025.md
```

## Two paths

**A binary — a PDF, a slide export, an image.** The file lands as itself at `docs/llm-wiki/raw/<stem>.<ext>`, bytes untouched. A markdown sidecar of the same stem, `docs/llm-wiki/raw/<stem>.md`, is the half the harness reads: frontmatter on top, beneath it what the frontmatter cannot hold. A Finding cites a PDF by page (`p31`, `slide 12`) at either path; any other extension is cited through its sidecar, since the pattern admits `.md` and `.pdf` alone.

**A web page.** The page's reader-mode body lands as `docs/llm-wiki/raw/<stem>.md`: frontmatter on top, then the page as markdown in its own heading order — headings, paragraphs, lists, tables, footnotes, images as links — with none of the navigation, banners, rails or comments around it. A Finding locates a passage by heading fragment, `<path>#<heading>`, so the headings arrive as the page had them and nothing is injected to make citing easier. The page carries its own byline and date, so the body adds nothing after it.

## Frontmatter

`npx mh --query docs/llm-wiki/raw/<stem>.md` lists every field with its `intent`; `markdown-harness.config.yaml` is the source of truth. What the query does not say:

| Field                        | Note                                                                                                                                                                                                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`                | Read with the file closed. `docs/llm-wiki/index.md` copies it verbatim, so it says what the file contains and why it landed, in terms a later run would search for, within 300 characters.                |
| `resource`                   | The URL the publisher serves the file at, even when the bytes arrived by hand. It is the only way back to the publisher once the copy is questioned.                                                      |
| `published`                  | At the precision the publisher prints and no finer: `2026-05` for a paper footed "May 2026", `2025-07-30` for a dated press release. The pattern refuses a datetime and a day the publisher never stated. |
| `generated.by`               | The agent's own `<producer>/<version>`, never `human:`.                                                                                                                                                   |
| `verified.by`, `verified.at` | Left absent. See _Refusals_.                                                                                                                                                                              |
| `stale_after`                | Never. A Raw is a dated snapshot and does not go stale.                                                                                                                                                   |

## The sidecar body

What the frontmatter cannot hold and the link will not hold forever: authors and contributors as printed, the date as printed, page count, the document's structure with page ranges, the endnote count and where the endnotes sit — whatever a Finding's locator will need once the URL rots. Not a summary of the argument: the argument is in the file, and a summary beside it is the first copy that drifts.

The sidecar for the first part of the course above:

```markdown
---
type: Raw
title: The New SDLC With Vibe Coding
description: "Day 1 of Google's five-part agents and vibe-coding course: from ad-hoc prompting to agentic engineering, context engineering, the harness around the model, and the conductor and orchestrator roles. Landed as the framing paper the other four days build on."
resource: <url>
publisher: Google
published: 2026-05
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-23T21:30:00Z
---

# The New SDLC With Vibe Coding

Subtitle "From ad-hoc prompting to Agentic Engineering". Authors Addy Osmani, Shubham Saboo and
Sokratis Kartakis; content contributors Elia Secchi, Julia Wiesinger and Anant Nawalgaria; curator
and editor Anant Nawalgaria. Every page is footed "May 2026" and no day is printed. 51 pages;
32 endnotes on pp. 49–51, most carrying a URL.

## Structure

| Pages | Section                                                                      |
| ----- | ---------------------------------------------------------------------------- |
| 6–9   | Introduction; why this paper, why now; who this paper is for                 |
| 10    | The shift from syntax to intent; AI agents, a quick refresher                |
| 11–14 | What is vibe coding? The spectrum from vibe coding to agentic engineering    |
| 15–18 | Context engineering: the real skill                                          |
| 19–25 | The new software development life cycle; how AI transforms each phase        |
| 26–30 | Harness engineering: what surrounds the model; the harness in the SDLC       |
| 31–34 | The developer's evolving role: conductors and orchestrators; the 80% problem |
| 35–48 | Coding agents in practice, through the closing                               |
| 49–51 | Endnotes                                                                     |
```

## Steps

**1. Fix the stem.** Take the series slug and position from the publisher's URL, the title slug from the document's own title, and settle the extension. Query the sidecar path so the fields owed are in front of you before anything exists.

_Done when_ the stem carries no `/`, `__` only between segments, and the series slug is traceable to a URL the publisher serves.

**2. Land.** Binary: copy or download to `docs/llm-wiki/raw/<stem>.<ext>`, bytes untouched. Page: fetch it and write the reader-mode body to `docs/llm-wiki/raw/<stem>.md` in the page's own heading order.

_Done when_ the bytes or the body sit at the flat path and, for a page, every heading the page had is present.

**3. Write the frontmatter, and for a binary the body.** Every field the query names, none of the `verified` pair. For a binary, the body per _The sidecar body_; for a page, the frontmatter sits on top of the body already written.

_Done when_ the file opens with `type: Raw`, `description` reads as a whole sentence with the file closed, and a binary's sidecar names authors, date as printed, extent and structure.

**4. Regenerate the index and check.** `npm run wiki:index`, then `npx mh --check`. The index copies every `description` verbatim and is never hand-edited; `npm run verify` fails when it has drifted, so it is regenerated in the run that lands the file. A Raw is written once: any red the check shows is fixed inside this run, and after it the body stands.

_Done when_ `npx mh --check` is green, the new row is in `docs/llm-wiki/index.md`, and the user holds the citable path, told that the Raw is unvetted until a person stamps it.

## Refusals

**Nesting.** A directory under `raw/` puts a file outside every rule and every citation pattern. A series is a filename prefix.

**Editing a landed Raw.** Anchors, ids, trimmed boilerplate, a retitled heading: any change after landing makes the file something other than what landed, and a Finding's locator may already point at the line that moved. The body is what landed and stays so. The frontmatter admits one later addition, the person's `verified` stamp, and that is promotion: a stamp, never a file move, so the concept ID never changes and nothing citing it dangles.

**Summarising instead of landing.** A paraphrase carries no locator a Finding can point at. What cannot be landed — a PDF behind a lead-capture form, a page behind a paywall — is reported as such; what the publisher does expose lands, one `resource` per Raw, each page under its own stem.

**Writing `verified`.** `^human:[^ ]+$` is a person's stamp, and an agent writing it forges curation. An unvetted Raw is legal and citable; its absence of a stamp is information, not a defect.
