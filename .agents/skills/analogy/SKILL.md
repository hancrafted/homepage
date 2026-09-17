---
name: analogy
description: 'Rate the last analogy, or take a better one.'
disable-model-invocation: true
---

`docs/tmp/analogy.md` collects rated analogies from grilling rounds. This skill writes that list and reads it back.

The **target** is the most recent `Analogy` block in the conversation, whether it opened the session or sat inside a question. Only a labelled block is a target; a figurative sentence in prose is not. With no block in reach, say so and stop.

## Route on the argument

| Argument                                        | Go to                                                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `save good`, `save bad`                         | [Save](#save)                                                                                    |
| `pick`                                          | [Pick](#pick)                                                                                    |
| `pick new`                                      | [Pick new](#pick-new)                                                                            |
| `list`                                          | [List](#list)                                                                                    |
| empty, or a verdict that is not `good` or `bad` | Ask which was meant. The verdict is the user's to give, so it is asked for rather than inferred. |

## Save

The write runs in a subagent, so the grilling round stays clear of it. You already hold everything the entry needs, so assemble the payload and dispatch one general-purpose subagent with:

- **verdict** — `good` or `bad`
- **the block** — verbatim, blockquote and label intact
- **subject** — the vehicle the analogy reaches for, two to five words, no verb: `trades on a building site`
- **grounds** — the hard concept the analogy made graspable, which outlives the decision
- **covered** — the decision the block was serving
- **reason** — the user's free text after the command; when they gave none, the reason you infer, marked `(inferred)`
- **saved** — today's date, plus the round or ticket title and question number, or `ad hoc` when the session has neither

Tell the subagent to:

1. Create `docs/tmp/analogy.md` from `assets/analogy.md` when it is absent.
2. Append one entry shaped by `assets/entry.md` at the end of `## Good` or `## Bad`, matching the verdict.
3. Run `npx prettier --write docs/tmp/analogy.md`, which the push gate checks.
4. Report one line: verdict and subject.

Done when the subagent reports the entry appended and the file formatted. Relay its line and nothing more.

## Pick

Read `docs/tmp/analogy.md` here, in thread. Match the decision in hand against each entry's `Grounds:` first and its `Covered:` second, and return the best-fitting entry from `## Good` verbatim, with one line on why it fits the decision.

Done when one entry is returned, or the file is reported absent or its `## Good` empty.

## Pick new

Write a fresh analogy for the decision in hand; when a block is already on the table, that is the block being replaced.

Take the register from the `## Good` entries. With none of them — or no file — take it from `docs/agents/grilling-format.md`, which fixes what an analogy in this repo is for. Return one `Analogy` block, then name where the register came from.

## List

Print the entry subjects grouped under their verdict, nothing else.

## Limits

- Duplicates stand. The same analogy rated twice is two entries.
- Past roughly thirty entries, move `pick` and `pick new` into a subagent: the corpus read starts costing the round more than the hop it saves.
- Experimental. `docs/tmp/` is not a layer in `docs/steering/information-architecture.md`, and the third test there — is there a run behind it? — is unpassed. If the list steers no better analogies, delete it along with this skill.
