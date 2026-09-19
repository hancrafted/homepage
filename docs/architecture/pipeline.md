# Content Pipeline

How an Episode becomes published work: the stages, the gates between them, and the loop that runs them.

This document churns, and it is ungoverned on purpose — no frontmatter rule reaches it, so a stage can be added or a field renamed without resetting anything. The half that does not churn — where documents live, what shape they take, who may stamp them — is `docs/steering/information-architecture.md`. Vocabulary is `CONTEXT.md`.

## The loop

The dispatcher is mechanical. It holds no judgement, and it is a plug point rather than a decision: self-built, Hermes, or otherwise. Its contract is the frontmatter schema and nothing else.

One run advances one stage:

1. **Scan** every `episode.md` for pipeline state. Done when every Episode directory has been read.
2. **Pick** the highest-priority Episode whose next stage is ready — prerequisites met, no gate pending. Done when one stage is selected, or when none is ready and the run ends here.
3. **Invoke** that stage as a subprocess. Done when the process exits and its artefact is on disk.
4. **Validate** by running `npm run verify`. Done when it passes, or when its errors have been written into the Episode's frontmatter.
5. **Commit** the artefact and the state change together. Done when the working tree is clean.
6. **Stop.**

**Why it stops.** One agent carrying every stage in one context cannot be re-run from the middle: a stage that fails takes the research back with it. Stopping is what turns each stage into a **checkpoint** — on disk and in git — so a failed stage is re-runnable alone. This is the Ralph loop pattern.

## Gates

Two gates, both human, both on artefacts rather than on a conversation.

| Gate | Sits on         | Blocks              |
| ---- | --------------- | ------------------- |
| 1    | `episode.md`    | everything after it |
| 2    | `manuscript.md` | publication         |

Research runs unattended between them.

**Why there.** Research is cheap to redo, so a bad research pass costs a re-run rather than a review. The Episode is where creative judgement lives, and `docs/steering/product.md` keeps creative work outside automation's reach. The Deck has no document of its own, so its verdict rides on the Manuscript's stamp.

**Validation is a gate, not a stage.** The dispatcher runs the verify pipeline after the agent exits. A failure blocks advancement, and its errors go into frontmatter as the next invocation's input, so the re-run self-corrects. Same principle as `verified.by` in `AGENTS.md`: the verdict is not the agent's to give.

## Stages

Only the YouTube path is worked out: Episode, then Manuscript, then Deck. Fan-out targets — Medium, podcast, LinkedIn — are named and not enumerated.

**Concurrency.** Research fans out: one agent per research question, one file each. Everything after Gate 1 is single-threaded. Parallel writers never share a file.

## State

Pipeline state lives in the frontmatter of `episode.md`. Git is the log. GitHub carries implementation issues — a Deck specification, a bug — and the `gh` conventions for those are in `docs/agents/issue-tracker.md`.

**Why frontmatter.** GitHub as the state machine was considered and rejected on four grounds: a hard dependency on an external service for creative work; labels that carry no transition validation; webhooks and polling as infrastructure of their own; and agent chatter burying the human record. Frontmatter is portable across machines, and the harness already governs frontmatter.

**Where that reasoning is thin.** The harness validates presence, format and allowed values per path glob. It does not validate transitions either. Frontmatter wins on the other three grounds, not on this one — so an illegal stage change is caught by review, or not at all.

**The schema is unspecified.** Field names, stage vocabulary and priority representation are all open. Run `npx mh --query docs/episodes/<slug>/episode.md` before writing it.

## Invocation

A stage is a Claude Code subprocess, run non-interactively against the existing subscription. No API key.

Stages are file-in, file-out: the artefact on disk is the return value, not the transcript. That is what puts review on a file rather than in a chat log.

_Rejected:_ the Agent SDK. Structured output and streaming do not repay building a tool layer when stages communicate through files.

**Premise.** If Claude Code stops being usable non-interactively under subscription auth, this decision falls and the Agent SDK returns.

## Open

- **Two decisions are lost.** The voice session settled nine; seven are above. The other two survive only as fragments — one about re-ingesting rather than re-fetching sources, one about a field a human flips to skip an artefact entirely. Neither is written down in full anywhere. Restate them before treating this document as complete.
- **Retry policy.** How many failed re-runs before a stage escalates to a human.
- **Stage sequence past the Episode.** The fan-out artefacts have no glossary entry; they are not Manuscripts, which are spoken text.
- **Dispatcher: self-built or Hermes.** Deferred deliberately.
- **Spoolway** (`marvingygas/spoolway`) is the closest prior art found: an agent state machine driving sessions through pipelines, markdown tasks with frontmatter, background dispatcher. MIT licensed, so forkable. Two stars, no forks, solo author — bus factor one, and pushed to as recently as this week. Open: read as a reference implementation, or fork as a base?
- **One machine.** Filesystem-as-queue assumes no multi-machine concurrency.
