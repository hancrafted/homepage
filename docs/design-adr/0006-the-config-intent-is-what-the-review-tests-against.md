---
type: design-adr
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-18T15:40:00Z
---

# The config intent is what the review tests against

The fields in `markdown-harness.config.yaml` that describe an Episode's content — `format`,
`subject_domains`, `thesis`, `analogy`, `story_threads`, `description`, `tags`,
`theory_hands_on_boundary` — now carry an `intent` written as a test the body must satisfy,
rather than only as the reason the field exists. `review-episode` reads them with
`npx mh --query` and carries no list of its own, so a rule changes in one place and the writer's
violation message and the reviewer's check change with it. The alternative was a checklist inside
the review skill, which is how the first draft of this review died: five rules moved underneath
it and the checklist did not follow.

## Consequences

An `intent` now has two readers. It was already the sentence a writer meets at the moment of
failure, since the authoring guide says an intent travels back with every violation the rule
reports; it is now also the sentence a reviewer tests against. Writing one means satisfying both,
which is why each states the test and leaves the reasoning to the document that owns it.

The harness does not run these tests. `mh --check` still validates presence and format only, so
an intent stating something the tool cannot enforce is deliberate rather than a gap — the enforcer
is a skill, and the config is where the rule is written down once.

Content fields are declared `presence: optional` where the Format leaves them optional, so adding
them turned no existing Episode red. `description` is the exception and is required, because the
index copies it and an Episode without one is undiscoverable.

## Premise

That the fields worth reviewing are the fields worth governing. A content field nobody wants in
the config is a field the review cannot see, and it would go back to being restated in the skill.
