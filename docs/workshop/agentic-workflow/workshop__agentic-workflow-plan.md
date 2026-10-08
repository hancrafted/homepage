# Agentic-workflow workshop series — plan

Source of truth for the series design and masterclass delivery.
Incorporates the finalized answers from `masterclass-application.md` submitted for the
startup accelerator masterclass (_"Agentic Workflows: Komplexe Aufgaben mit KI meistern"_).

## Summary

Three reusable workshops: Intro, Basics, Advanced.

- **Intro:** Recorded pre-work (2–3 videos, 10–20 min each).
- **Basics:** Live remote, 3h.
- **Advanced:** Live remote, 3h.
- **Paid Masterclass:** Basics (Day 1) + Advanced (Day 2), 2 × 3h remote for startup teams.

**Course Title (Application):** Agentic Workflows: Komplexe Aufgaben mit KI meistern  
**Subtitle:** KI erledigt keine Aufgaben von allein – sie braucht Führung. Lerne, wie du Kontext, Tools und Feedback-Schleifen so aufsetzt, dass KI-Agenten verlässlich liefern.  
**Spine:** AI doesn't remove work, it relocates it from execution to specification and review.  
**Internal Spine:** Context engineering.  
**Audience-facing Name:** Agentic Workflows.

## Target Audience & Problems

### Audience (Application Q6, Q7)

- **Roles:** Founders, Founding Engineers, and core team members in startups. Balanced for both business and technical roles.
- **Prerequisites:** No programming knowledge required; curiosity for systematic workflows and basic tech-affinity suffice. Daily use of ChatGPT, Copilot, or Claude already established.
- **Stage:** Idea phase to early growth phase.

### Core Problems Addressed (Application Q8)

1. **The Context Wall:** AI yields impressive demos on simple queries, but falls far short on complex, multi-step tasks due to context degradation and non-determinism.
2. **The Verification Crisis:** Outputs from complex chats are difficult to inspect and verify, forcing teams to either discard results or accept them blindly with residual risk.
3. **The 10x Plateau:** Teams gain minor speed-ups on routine prompts, but miss out on 5x–10x productivity leverage because systematic workflows, structured context, and compounding methods are missing.

## Core Methodological Pillars (Application Q12, Q15, Q17)

The curriculum grounds agentic workflows in timeless software engineering and project management disciplines, adapted for founders:

1. **Requirements Engineering as a Quality Contract:**
   Transforming vague, implicit goals into unambiguous, testable specifications and acceptance criteria through structured dialogue with AI.
2. **Separation of Concerns:**
   Strict architectural boundary between procedure (the reusable skill) and context (living in versioned project documents like `AGENTS.md` and `CONTEXT.md`).
3. **Design by Contract & Decomposition:**
   Breaking complex initiatives into discrete, independently delegable, and verifiable units with explicit handoffs.
4. **Enabler at the Intersection:**
   Connecting technical depth (engineering principles, prompt/skill architecture) with startup execution reality (pitch decks, product roadmaps, specifications).

## Participant Transformation (Application Q9, Q10, Q11)

- **Before:** Ad-hoc prompting, copying chat snippets, vibe-coding, getting bogged down in endless correction loops, manual post-editing, losing working approaches whenever a chat concludes.
- **After:** Specifying any initiative (pitch deck, product concept, technical plan) in testable steps with AI, locking project context permanently into project files, and steering AI reliably through reusable skills.
- **Concrete Capabilities Gained:**
  1. Interactively formulate a vague task into a testable specification (`grill-me` → `to-spec`).
  2. Master session hygiene: consciously decide what belongs in the current chat vs. a fresh one, and execute clean context handoffs.
  3. Store project context in persistent files (`AGENTS.md`, `CONTEXT.md`) so AI starts fully onboarded in every new session.
  4. Author a custom, reusable AI skill cleanly separating procedure from external context.
- **The Core Aha-Moment:**
  AI shifts work from execution to specification and review: once steered with clean project context and explicit quality criteria, stochastic shots turn into reproducible, dependable results.

## Deliveries

| Date   | Event                                | Audience                | Content           |
| ------ | ------------------------------------ | ----------------------- | ----------------- |
| 23 Oct | Axel workshop, 3h                    | flexible, low stakes    | Intro             |
| 28 Oct | Cyberform Academy presentation       | very non-technical      | Intro             |
| 16 Nov | Academy follow-up, 3–4h              | very non-technical      | Basics            |
| 18 Nov | Masterclass (voluntary, advertising) | startups                | Intro             |
| TBD    | Paid masterclass, 2 × 3h remote      | startups, tech-adjacent | Basics + Advanced |

## Settled Decisions

1. **Scope: human-in-the-loop only.** AI helps one person do a complex task better. Autonomous agents embedded in production products are out.
   _Why:_ not Han's lived experience; not the promise to this audience.

2. **Spine: the work moves to specification and review.** Complex tasks get decomposed into chunks with reviewable artefacts between them.
   _Why:_ holds for every audience, from office worker to founder.

3. **Grounding analogy: the LLM is a highly capable, knowledgeable freelancer with amnesia.**
   You onboard it, give it context, and scope work to reviewable sizes, as a staff engineer or manager would.
   Consequences to land: natural language is ambiguous, output is non-deterministic, the freelancer is fallible, so you review its work.
   _Why:_ amnesia makes context the actual job; management skills transfer directly.

4. **Concentric structure.** Constant spine; each concept has a depth and a floor (the earliest workshop where it is fully taught). Above its floor a concept appears only by analogy.

5. **Audience register is a second axis**, independent of depth: very non-technical (Academy) vs. tech-adjacent (startups).

6. **Theory blocks: self-contained, 10–25 min, each backed by a Manuscript.** Each must stand alone as a YouTube video. No Episode layer.
   _Test applied during design:_ a block does exactly one idea. Anything extra moves elsewhere (e.g. definition of agentic workflows moved out of block D1-1 into Intro).

7. **Hands-on exercises are separate units.** Attached live; recordable later as "how I'd solve it" videos, never live.

8. **Intro is recorded and becomes pre-work.** 2–3 theory blocks of 10–20 min, watched before Basics. Carries the definition of agentic workflows and the full freelancer analogy.
   Basics still opens with a short freelancer setup so the day stands alone.

9. **Day template (3h remote ≈ 2h real content).**
   Mirrored architecture across both days with two alternating theory and hands-on pairs:
   - Arrival / Opener / Re-entry (10–20 min)
   - Theory 1 (30 min)
   - Hands-on 1 (30 min)
   - Break (10 min)
   - Theory 2 (30 min)
   - Hands-on 2 (30 min)
   - Close / Flex Buffer / Outlook (20–30 min)
     _Why:_ Han's experience from remote workshops; alternating theory and application prevents cognitive fatigue and anchors each concept immediately in practice.

10. **Never end on hands-on.** The last block is theory/outlook, and it is the flex buffer: scoped so it can be cut short without stranding participants.
    _Why:_ ending on unfinished hands-on leaves people frustrated; an outlook leaves them with a sense of gain.

11. **Tooling & Platform.**
    - _Paid Masterclass:_ Participants bring Claude Pro (Claude Desktop for non-technical founders, CLI for developers; alternatively Codex or Antigravity).
    - _Basics portability:_ Basics remains fully executable in ChatGPT / Microsoft Copilot by pasting skill prompts directly into chat, allowing delivery to audiences without Claude (e.g. Academy).
    - _Day 2 materials:_ Prepared exercise folder distributed as a ZIP file before the session.

12. **Basics stops at the spec, on purpose.** No live implementation. Day 1 ends on a reviewed spec: the review runs in a fresh, parallel chat and feeds back.
    _Why:_ implement, to-spec, and to-tickets are software-engineering-shaped; machine setups vary; no remote debugging. Ending on "can you review this spec?" makes the thesis physical.

13. **Advanced is anchored on skills.**
    Principle: a skill is a procedure; the context it needs lives in documents outside it (separation of concerns). `grill-with-docs` (referencing ADRs, `CONTEXT.md`) is the worked example.
    _Why:_ people have heard of skills and get them wrong; strongest demand and clearest misconception.

14. **Evaluation is taught as a concept, not tooling.** Part of the Day 2 outlook, not a separate theory block. Ablation thinking: did you read the skill the agent wrote, check what changed, verify the change produced the intended outcome? Model updates can silently change skill behaviour.
    _Why:_ it is the thesis at its sharpest: work relocates to evaluation, and new models create new work.

15. **Moved to outlook only (named, motivated, not performed):** eval harnesses / harness engineering, llm-wiki retrieval, skill evaluation.
    **Moved to Advanced:** `grill-with-docs` (works on memory/context files; too much for Basics).
    `AGENTS.md` / `CONTEXT.md` are taught in Day 2 Theory 1 (project context management), with a prepared exercise folder.
    _Why:_ too technical even for a tech-adjacent audience in 3h.

## Agenda by block

Timings and blocks aligned with `masterclass-application.md` (Question 13).

### Day 1 — Agentic Workflow Basics (3:00 h)

| Time        | Slot                | Content                                                                                                                           | YouTube title                               |
| ----------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| 0:00 – 0:20 | Opener (20 min)     | Begrüßung, Agenda, Erwartungen; Blitzlicht zur größten KI-Herausforderung; Mindset: KI als Freelancer mit Amnesia einarbeiten.    | —                                           |
| 0:20 – 0:50 | Theory 1 (30 min)   | Shared understanding → shared context: Requirements Engineering als Fundament; interaktives Spezifizieren im Dialog (`grill-me`). | From shared understanding to shared context |
| 0:50 – 1:20 | Hands-on 1 (30 min) | Eigene komplexe Aufgabe spezifizieren: Reale Aufgabe im geführten Dialog durchdenken und in Spezifikation überführen (`to-spec`). | —                                           |
| 1:20 – 1:30 | Break (10 min)      | Pause                                                                                                                             | —                                           |
| 1:30 – 2:00 | Theory 2 (30 min)   | Was Kontext ist; Session-Hygiene; saubere Übergabe zwischen Sitzungen.                                                            | When your next prompt belongs in a new chat |
| 2:00 – 2:30 | Hands-on 2 (30 min) | Spezifikation in neuer, paralleler Konversation prüfen und Feedback zurückführen. Demo: Sprachmodus & Steuerung über Analogien.   | —                                           |
| 2:30 – 3:00 | Close (30 min)      | Q&A, Checkout, Puffer, Vorbereitung auf Tag 2.                                                                                    | —                                           |

### Day 2 — Agentic Workflow Advanced (3:00 h)

| Time        | Slot                   | Content                                                                                                                                          | YouTube title                                                  |
| ----------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| 0:00 – 0:10 | Re-entry (10 min)      | Rückblick auf Tag 1, offene Fragen klären, Agenda-Überblick.                                                                                     | —                                                              |
| 0:10 – 0:40 | Theory 1 (30 min)      | Projekt-Kontextmanagement: Statischer vs. dynamischer Kontext; Steuerungsdateien (`AGENTS.md`, `CONTEXT.md`), die die KI zur Laufzeit liest.     | How project context management multiplies your AI productivity |
| 0:40 – 1:10 | Hands-on 1 (30 min)    | Urlaubsplanung mit Projektkontext: Im vorbereiteten Projektordner erleben, wie KI auf Kontext- und Entscheidungsdokumente zugreift.              | —                                                              |
| 1:10 – 1:20 | Break (10 min)         | Pause                                                                                                                                            | —                                                              |
| 1:20 – 1:50 | Theory 2 (30 min)      | Skills: Trennung von Prozedere und Kontext (Separation of Concerns); Analyse eines bewährten Skills (`grill-with-docs`).                         | The one rule that makes an AI skill reusable                   |
| 1:50 – 2:20 | Hands-on 2 (30 min)    | Eigenen Skill erstellen und analysieren (`write-a-skill`): Skill aus Aufgabe bauen, der interviewt, und prüfen, wo Prozedere und Kontext liegen. | —                                                              |
| 2:20 – 2:40 | Outlook (flex, 20 min) | Skalierung: Wissensdatenbanken für KI (llm-wiki), Tool-Integrationen, Retrieval und systematische Evaluierung von Skills (Ablation thinking).    | Scaling agentic workflows: context, tools, and evaluation      |
| 2:40 – 3:00 | Close (20 min)         | Abschlussrunde, Feedback und Q&A.                                                                                                                | —                                                              |

Thesis line for evaluation material: _"The work that starts after the AI finishes."_  
Former D2 block _"How to prevent your AI skills from breaking after the next update"_ is no longer scheduled; remains a candidate video.

## Prerequisites & Participant Prep (Application Q14)

- **Real Challenge:** Participants bring an active, complex task from their startup daily business.
- **Tooling:** Active Claude Pro subscription ready:
  - Claude Desktop for non-technical founders.
  - CLI for developers (or supported CLI tool with subscription such as Codex or Antigravity).
- **Exercise Files:** Day 2 prepared exercise folder (vacation planning) distributed prior to the course as a ZIP archive.
- **Intro Videos:** Watch short intro videos in advance.
- **Post-Course Deliverables (Application Q16):** Follow-up guides, templates, and video walkthroughs to integrate workflows into team operations.

## Premises (invalidate here, don't inherit)

- Startup audience is tech-adjacent, not technical.
- Participants watch the Intro videos beforehand. The Basics opener covers those who don't.
- Non-code outputs (deck, page, doc) are producible by non-technical people on their own machines.

## Open

- **Atomic knowledge unit** below the Manuscript (finding vs. concept vs. both). To emerge from designing the course.
- **llm-wiki mapping** of workshops → Manuscripts → units.
- **Intro block list and titles.** Must be recorded before the paid masterclass.
- **Day 2 exercise folder** (vacation planning): build it and ship it as ZIP before the masterclass.
- **Post-course material** promised in the application: guides, templates, videos.
- **to-spec for non-software tasks.** Its output is software-shaped; Academy may need an adapted variant.
- **Chat-memory features as the non-technical AGENTS.md.** Raised as a possible day-1 outlook item; not decided.
- **YouTube playlist** in canonical order. Parked.

## Glossary candidates (CONTEXT.md)

amnesiac freelancer · register · floor · theory block · hands-on exercise · re-entry block

## Next actions

1. ~~Submit the masterclass form~~ — final answers in `masterclass-application.md`.
2. Prepare Day 2 exercise folder (vacation planning) and package as ZIP.
3. Scope and title the Intro blocks; they are prep for 28 Oct and the paid masterclass.
4. Draft Manuscripts for Day 1 blocks first (Academy 16 Nov uses them).
5. Compile post-course templates and guides.
