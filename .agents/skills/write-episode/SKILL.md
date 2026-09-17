---
name: write-episode
description: Author an Episode from named Sources — settle the thesis and analogy with the user, then write the argument as prose under a declared spine.
disable-model-invocation: true
argument-hint: 'Subject, plus any Sources (paths under docs/llm-wiki/)'
---

# Write Episode

Produce one Episode: `docs/episodes/<slug>/episode.md`.

An Episode is the authored argument, medium-neutral, prose under a declared **spine**. A later stage writes the Manuscript from it; this skill never does. `CONTEXT.md` fixes the vocabulary — reach for its words rather than synonyms it lists under `_Avoid_`.

This skill converts Sources the user names. It does no research of its own.

## Read before writing

| Read                                        | For                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------- |
| `CONTEXT.md`                                | vocabulary: Episode, Format, Source, Beat, Spine, and the `_Avoid_` lists |
| `docs/steering/product.md`                  | the three promises, the Publish bar, the analogy-led signature            |
| `docs/steering/information-architecture.md` | where documents live, what frontmatter carries, who may stamp             |
| `docs/steering/index.md`                    | how design decisions get made here — the five points                      |

Read-only everywhere above, and in `docs/llm-wiki/`. `docs/episodes/` is the only place this skill writes.

### When a layer is missing

`docs/llm-wiki/` and `docs/steering/` may not exist yet. Their absence is worth saying out loud, because each one silently removes something:

- **Sources came with the prompt** — name the missing layer and what it would have supplied, then carry on. Named Sources are enough to write from.
- **No Sources either** — name it and stop. There is nothing to convert.

One line each, once:

```
No docs/llm-wiki/ — working from the Sources you named.
No docs/steering/ — the five steering points unavailable, so nothing checks how this run decides.
```

## Steps

**1. Gather the Sources.** Read every Source the user named. A Source is a file; a bare URL is not one, because Sources are ingested once and re-read rather than re-fetched — a stage that re-fetches can fail on a bot check after it had already succeeded. Hand a URL back with the command that lands it:

```
yt-dlp --cookies-from-browser chrome --write-auto-subs --sub-langs "en.*" \
  --skip-download --convert-subs srt -o "docs/llm-wiki/<slug>.%(ext)s" "<url>"
```

_Done when_ every named Source has been read, or the user has been told exactly which ones could not be and has decided to proceed without them.

**2. Fix the Format.** Foundations, Teardown or Short — `docs/steering/product.md` fixes each one's job and length. Read the matching asset and nothing else: [`assets/foundations.md`](assets/foundations.md), [`assets/teardown.md`](assets/teardown.md), [`assets/short.md`](assets/short.md). The shared rules are in [`assets/episode-format.md`](assets/episode-format.md).

_Done when_ one Format is settled and its beats are in front of you.

**3. Offer the spine.** Derive candidate theses from the Sources, and candidate analogies for each. Then wait.

Deciding the message, shape and framing is the user's, not yours — `docs/steering/product.md` puts it outside automation's reach while leaving the brainstorming inside it. So generate generously and choose nothing.

Draw analogies only from domains the user has worked in: sales, pre-sales, requirements engineering, UX, recruiting, marketing, project management. These land because they are lived. A borrowed analogy fails before it is even evaluated: retrieval runs on surface similarity while mapping runs on relational structure, so an audience that has never inhabited the domain never reaches for the mapping at all.

_Done when_ the user has picked one thesis and one analogy.

**4. Offer the slug.** Propose slugs naming the Episode's **subject**, not its thesis — the slug is the concept ID, so a thesis-shaped slug changes identity every time the wording sharpens. Wait for the choice.

If `docs/episodes/<slug>/` already exists, see _Refusals_ below.

_Done when_ the user has confirmed one slug.

**5. Write the Episode.** Frontmatter per [`assets/episode-format.md`](assets/episode-format.md), beats per the Format's asset, citations keyed to `sources[].id`.

_Done when_ `docs/episodes/<slug>/episode.md` exists, every beat the Format requires has a section, and every fact-stating beat carries a footnote or a marker saying it does not.

**6. Report what is unsettled.** Name every unsupported beat, every Source that went unused, and the `stale_after` date you propose for the Publish bar's twelve-month test — that date is the user's judgement, not yours.

_Done when_ the user knows what would stop this Episode shipping.

## Refusals

**An Episode with a human verifier.** `verified` carrying a `human:` actor means the user has approved this content. Say plainly that a re-run removes that stamp, wait for an explicit yes, then append the withdrawal to `docs/episodes/<slug>/log.md` before rewriting. While `verified` is absent or machine-only, rewrite freely.

**Renaming.** The slug is the identifier, so a rename orphans the sibling `manuscript.md`'s provenance and any issue carrying a Deck specification. Renaming is its own deliberate act; leave the directory where it is.

**Writing outside `docs/episodes/`.** Landing a Source in `docs/llm-wiki/` belongs to the research stage, and one run that writes two layers makes the user's approval of the Episode silently approve the Sources under it.
