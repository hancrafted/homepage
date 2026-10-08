# Agentic-workflow workshop series — architecture

Handoff, 2026-10-06, revised the same day. Source of truth for the series design.
The day agendas below were reconsidered after the handoff and match the schedule in
`masterclass-application.md`; where a decision was changed by that, it says so.

## Summary

Three reusable workshops: Intro, Basics, Advanced. Intro is recorded and serves as pre-work.
Basics and Advanced are live, 3h remote each. The paid masterclass is Basics (day 1) + Advanced (day 2).

Spine: AI doesn't remove work, it relocates it to specification and review.
Context engineering is the internal spine. "Agentic Workflows" is the audience-facing name.

## Deliveries

| Date   | Event                                | Audience                | Content           |
| ------ | ------------------------------------ | ----------------------- | ----------------- |
| 23 Oct | Axel workshop, 3h                    | flexible, low stakes    | Intro             |
| 28 Oct | Cyberform Academy presentation       | very non-technical      | Intro             |
| 16 Nov | Academy follow-up, 3–4h              | very non-technical      | Basics            |
| 18 Nov | Masterclass (voluntary, advertising) | startups                | Intro             |
| TBD    | Paid masterclass, 2 × 3h remote      | startups, tech-adjacent | Basics + Advanced |

## Settled decisions

1. **Scope: human-in-the-loop only.** AI helps one person do a complex task better. Agents embedded in products are out.
   _Why:_ not Han's lived experience; not the promise to this audience.

2. **Spine: the work moves to specification and review.** Complex tasks get decomposed into chunks with reviewable artefacts between them.
   _Why:_ holds for every audience, from office worker to founder.

3. **Grounding analogy: the LLM is a highly capable, knowledgeable freelancer with amnesia.**
   You onboard it, give it context and cut work to a reviewable size, as a staff engineer or manager would.
   Consequences to land: natural language is ambiguous, output is non-deterministic, the freelancer is fallible, so you review its work.
   _Why:_ amnesia makes context the actual job; management skills transfer directly.

4. **Concentric structure.** Constant spine; each concept has a depth and a floor (the earliest workshop where it is fully taught). Above its floor a concept appears only by analogy.

5. **Audience register is a second axis**, independent of depth: very non-technical (Academy) vs tech-adjacent (startups).

6. **Theory blocks: self-contained, 10–25 min, each backed by a Manuscript.** Each must stand alone as a YouTube video. No Episode layer.
   _Test applied during design:_ a block does exactly one idea. Anything extra moves elsewhere (e.g. the definition of agentic workflows moved out of block D1-1 into Intro).

7. **Hands-on exercises are separate units.** Attached live; recordable later as "how I'd solve it" videos, never live.

8. **Intro is recorded and becomes pre-work.** 2–3 theory blocks of 10–20 min, watched before Basics. Carries the definition of agentic workflows and the full freelancer analogy.
   Basics still opens with a short freelancer setup so the day stands alone.

9. **Day template (3h remote ≈ 2h real content).**
   ~15 min arrival buffer, one 5–10 min break, 10–15 min Q&A/buffer at the end.
   One hands-on per day, 20–30 min, optionally extended by 20–30 min (continuation or 2–3-person breakout feedback). Leaves room for 2–3 theory blocks.
   _Why:_ Han's experience from two remote pitch workshops (3h, 4h) on Miro.

10. **Never end on hands-on.** The last block is theory/outlook, and it is the flex buffer: scoped so it can be cut short.
    _Why:_ ending on unfinished hands-on leaves people frustrated; an outlook leaves them with a sense of gain.

11. **Basics runs without a CLI.** Grilling works in ChatGPT/Copilot by pasting the skill into the chat. Claude Code / Cowork is optional, not required.
    _Why:_ Cyber Forum demo: an office worker answered two grill questions in 20 min because operating the CLI consumed all attention.
    _Masterclass:_ participants bring Claude Pro (Claude Desktop for non-tech founders, CLI for developers; alternatively Codex or Antigravity). Basics is still conceived to run in ChatGPT/Copilot with skills pasted into the chat, so it ports to audiences without Claude (e.g. Academy).

12. **Basics stops at the spec, on purpose.** No live implementation. Day 1 ends on a reviewed spec: the review runs in a fresh, parallel chat and feeds back. (Earlier plan: a spec → artefact demo as the closing flex block; dropped from the schedule — candidate for a recipe/video.)
    _Why:_ implement, to-spec and to-tickets are software-engineering-shaped; machine setups vary; no remote debugging. Ending on "can you review this spec?" makes the thesis physical.

13. **Advanced is anchored on skills.**
    Principle: a skill is a procedure; the context it needs lives in documents outside it (separation of concerns). grill-with-docs (ADRs, CONTEXT.md) is the worked example.
    _Why:_ people have heard of skills and get them wrong; strongest demand and clearest misconception.

14. **Evaluation is taught as a concept, not tooling.** _Revised: now part of the Day 2 outlook, not its own theory block._ Ablation thinking: did you read the skill the agent wrote, check what changed, verify the change produced the intended outcome? Model updates can silently change skill behaviour.
    _Why:_ it is the thesis at its sharpest: work relocates to evaluation, and new models create new work.

15. **Moved to outlook only (named, motivated, not performed):** eval harnesses / harness engineering, llm-wiki retrieval, skill evaluation.
    **Moved to Advanced:** grill-with-docs (works on memory/context files; too much for Basics).
    _Revised:_ AGENTS.md / CONTEXT.md are now taught in Day 2 Theory 1 (project context management), with a prepared exercise folder.
    _Why:_ too technical even for a tech-adjacent audience in 3h.

## Agenda by block

Per-day timings: `masterclass-application.md`, question 13.

### Day 1 — Agentic Workflow Basics

| Time      | Slot         | Content                                                                                                                         | YouTube title                               |
| --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| 0:00–0:20 | Opener       | Agenda, expectations, biggest-AI-challenge round, freelancer-with-amnesia setup                                                 | —                                           |
| 0:20–0:50 | Theory 1     | Shared understanding → shared context: requirements engineering as foundation; interactive specification with the AI (grill-me) | From shared understanding to shared context |
| 0:50–1:20 | Hands-on 1   | Own real task: grill session → spec (to-spec)                                                                                   | —                                           |
| 1:20–1:30 | Break        |                                                                                                                                 |                                             |
| 1:30–2:00 | Theory 2     | What context is; session hygiene; handing off between sessions                                                                  | When your next prompt belongs in a new chat |
| 2:00–2:30 | Hands-on 2   | Review the spec in a fresh, parallel chat and feed back. Demo: voice mode, steering via analogies                               | —                                           |
| 2:30–3:00 | Close (flex) | Q&A, check-out, buffer, prep for Day 2                                                                                          | —                                           |

### Day 2 — Agentic Workflow Advanced

| Time      | Slot           | Content                                                                                                     | YouTube title                                |
| --------- | -------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 0:00–0:10 | Re-entry       | Day 1 recap, open questions, agenda                                                                         | —                                            |
| 0:10–0:40 | Theory 1       | Project context management: static vs dynamic context; steering files (AGENTS.md, CONTEXT.md) the AI reads  | not yet titled                               |
| 0:40–1:10 | Hands-on 1     | Vacation planning in a prepared project folder: watch the AI read context and decision documents at runtime | —                                            |
| 1:10–1:20 | Break          |                                                                                                             |                                              |
| 1:20–1:50 | Theory 2       | Skills: procedure vs context, separation of concerns; analysis of a proven skill                            | The one rule that makes an AI skill reusable |
| 1:50–2:20 | Hands-on 2     | Create a skill that interviews (write-a-skill), then check where procedure and context live                 | —                                            |
| 2:20–2:40 | Outlook (flex) | Scaling: knowledge bases for AI, tool integrations, retrieval, systematic skill evaluation                  | not yet titled                               |
| 2:40–3:00 | Close          | Closing round, feedback, Q&A                                                                                | —                                            |

Thesis line, kept for the evaluation material: "The work that starts after the AI finishes."
Former D2 block "How to prevent your AI skills from breaking after the next update" is no longer scheduled; still a candidate video.

## Premises (invalidate here, don't inherit)

- Startup audience is tech-adjacent, not technical.
- Participants watch the Intro videos beforehand. The Basics opener covers those who don't.
- Non-code outputs (deck, page, doc) are producible by non-technical people on their own machines.

## Open

- **Atomic knowledge unit** below the Manuscript (finding vs concept vs both). To emerge from designing the course.
- **llm-wiki mapping** of workshops → Manuscripts → units.
- **Intro block list and titles.** Must be recorded before the paid masterclass.
- **Outlook block title**, and whether it is a video at all.
- **Day 2 exercise folder** (vacation planning): build it and ship it as ZIP before the masterclass.
- **Post-course material** promised in the application: guides, templates, videos.
- **to-spec for non-software tasks.** Its output is software-shaped; Academy may need an adapted variant.
- **Chat-memory features as the non-technical AGENTS.md.** Raised as a possible day-1 outlook item; not decided.
- **YouTube playlist** in canonical order. Parked.

Resolved: Day 2 hands-on is split around theory (mirrors Day 1). Masterclass tooling is Claude Pro (Desktop or CLI).

## Glossary candidates (CONTEXT.md)

amnesiac freelancer · register · floor · theory block · hands-on exercise · re-entry block

## Next actions

1. ~~Submit the masterclass form~~ — final answers in `masterclass-application.md`.
2. Scope and title the Intro blocks; they are prep for 28 Oct and the paid masterclass.
3. Draft Manuscripts for Day 1 blocks first (Academy 16 Nov uses them).
