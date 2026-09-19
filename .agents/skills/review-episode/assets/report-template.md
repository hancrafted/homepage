# Review — <episode path>

- **Reviewed:** <path> at <git sha, or "worktree, uncommitted">
- **Format:** <Foundations | Teardown>
- **Checks:** <n> PASS · <n> FINDING · <n> NOT CHECKED

## 1. Whole-document pass

### Frontmatter honoured — <VERDICT>

<One line per field `mh --query` returned: field, then the passage honouring it quoted, or
`unhonoured`. Document-describing fields — `generated`, `verified`, `stale_after`, `status` — are
`read`.>

### Subject domain coverage — <VERDICT>

<The two lists, set against each other. Then each direction: declared and never bound; bound and
never declared. Then which Beats carry which, as information. Then any Subject domain heading
appearing twice inside one Beat.>

### Story Thread traces — <VERDICT>

<Per declared thread, one line per Beat — what it carries there, or `untouched` — and the Beat it
concludes in. No `story_threads:`, no trace.>

### Repeated phrases — <VERDICT>

<Each phrase recurring across Beats. Every instance quoted, each judged against its own Beat.>

### Stated conditions, definitions and counts — <VERDICT>

<All of them in one list, side by side. Agreement is the test, not correctness.>

## 2. Source pass

### Both directions resolve — <VERDICT>

<Footnotes with no `sources[]` entry; entries no footnote cites. Counts both ways.>

### Each footnote against its claim — <VERDICT>

<Per footnote: the claim quoted, and what the source carries. Name the ones that do not meet.>

### Liveness — <VERDICT>

<Per `resource` that is a URL: the status that came back.>

### Falsification — <VERDICT>

<Per claim carrying a number, a date or a named study: the correction found, or `no correction
found` as a fact about the search.>

### Provenance — <VERDICT>

<Per first-hand source: what it is doing that a public source could do instead.>

## 3. Beat pass

### <Beat name>

| Check                          | Verdict |
| ------------------------------ | ------- |
| Present, and in order          |         |
| Citation follows the claim     |         |
| The two limit Beats stay apart |         |
| The hook                       |         |
| The Takeaway                   |         |
| Register                       |         |
| Definitions                    |         |
| The theory/hands-on turn       |         |

<Repeat this block per Beat the Format requires, in Format order. A check the Beat does not owe —
the hook outside `The practice they already run`, the Takeaway outside `What to do` — reads `n/a`.>

## Findings

<Every FINDING above, expanded here. One block each.>

- **What** — <the finding, one line>
- **Where** — <Beat, or frontmatter field>
- **Evidence** — <the passage, quoted verbatim from the file>
- **Rule** — <the document that makes it a rule>
- **Settles it** — <what would close it>

## Not checked

<Every NOT CHECKED above: the check, and why it could not be performed.>

## Not a finding

<Observations with no governing document. Recorded, not counted.>

## Publish bar

<The two tests, quoted verbatim from `docs/steering/product.md`. Left unanswered — the user's to
answer.>
