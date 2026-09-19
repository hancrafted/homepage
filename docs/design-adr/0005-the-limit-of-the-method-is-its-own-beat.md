---
type: design-adr
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-18T13:07:35Z
---

# The limit of the method is its own Beat

Both Formats ended their argument with one Beat, `Where the analogy breaks down`, and it was
carrying two different limits: where the method stops applying, and where the analogy stops
mapping. They are now two Beats, the method's limit first.

The beat name asked for one thing and the Beat did two, so whichever limit the author found
harder to write disappeared under a heading claiming otherwise. In
`docs/episodes/backward-chaining/episode.md` the Beat ran three paragraphs, two of them about
the method — backward chaining needs a stable outcome to plan back from, and forward
exploration is correct where no goal exists yet — and one about the analogy. The method's
limits were the resolution of the misconception raised earlier in that Episode, which is
load-bearing content smuggled in under a heading about something else.

The split is decided by citation, not by naming. The two method paragraphs cite
`backward-chaining-wiki` and `reverse-planning-park`; the analogy paragraph cites nothing and
correctly so, because an analogy is the author's own and demanding a source for it pushes the
next author toward a borrowed analogy the audience has never stood inside. `episode-format.md`
assigns citation obligation per Beat, so one Beat cannot be both fact-stating and exempt.
Renaming the Beat to cover limits generally, or keeping one Beat and requiring both limits
explicitly, would both have forced a per-paragraph exception into the one rule that is
currently checkable by reading footnote markers under a `##`.

This became harder to live with once the analogy was decoupled from the Subject domains. The
analogy may come from anywhere the audience can stand inside while the method is shown working
in fields of practice, so the two objects fail for two unrelated reasons — the analogy stops
mapping, the method stops applying.

## Consequences

Both Formats take the same two Beats under the same names. In a Teardown the correction is the
method, so the limit of the correction sits under `Where the method stops applying` and the
Format that carried three kinds of limit in one Beat now carries two Beats, not three.

`episode-format.md` stopped listing exempt Beats. Citation follows the claim: a Beat asserting
something about the world cites it, a Beat stating the analogy or recommending an action has no
source to key to. A list of two exempt Beats would have had to become a list of three here, and
would go stale again at the next skeleton change — silently, because an author reads the count
and trusts it.

The analogy limit now sits directly before `What to do`, which reaches back to the analogy, so
the analogy runs to the end of the Episode without a fact-stating Beat between its last two
appearances.

## Premise

A Format asset is where an author reads what a Beat owes, and an author writes what the heading
asks for. That is the whole reason for the split: no check can notice a Beat that quietly
absorbed a second job. If review ever reads Beats rather than counting them, one Beat with both
limits required would have been cheaper.
