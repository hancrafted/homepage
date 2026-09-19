---
type: design-adr
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-18T15:40:00Z
---

# A review searches for correction, not for support

When `review-episode` reaches the web, it looks for a retraction, a corrigendum, or a published
result that disagrees with the claim, and never for a further source that agrees. An agent told
to corroborate finds corroboration: two retellings of one press release come back as two sources,
and the report reads more verified than the Episode is. A search for disagreement cannot flatter
itself the same way — it either finds a correction or reports that it looked.

## Consequences

A claim that survives is reported as `no correction found`, which is not the same as verified, and
the report says so rather than quietly upgrading it. The review can therefore raise the number of
things needing verification and never lower it, which is the intended direction.

The search is bounded to claims carrying a number, a date or a named study, so it does not run on
every sentence. A definition or a link to a glossary gets liveness only.

Whatever the search turns up stays in the report as a suggestion. The skill does not add entries
to `sources[]`, so a correction found here becomes the user's edit to the Episode.

## Premise

That the failure worth engineering against is false confidence rather than missing sources. It
comes from one manual review in which a paragraph passed because it carried many footnotes, and
none of them supported the sentence that was wrong.
