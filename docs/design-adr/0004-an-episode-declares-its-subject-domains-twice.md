---
type: design-adr
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-18T13:07:35Z
---

# An Episode declares its Subject domains twice

An Episode's Subject domains could have been one thing: a `subject_domains:` list in frontmatter, or `###` headings in the body. They are both, and the two are required to be equal.

Frontmatter cannot carry a position at passage granularity. A list says which Subject domains the Episode covers and nothing about where the coverage sits, so a Subject domain declared and never argued reads exactly like one argued at length. Headings carry position and say nothing about the whole: a Beat that skips a Subject domain looks like a Beat that had no business carrying it. The failure that produced this decision — `The explanation` running project management and then jumping to AI, skipping the acceptance-testing link that made the AI case legible — is invisible to either mechanism alone and falls out of the pair.

Three mechanisms were weighed. HTML comments, extending the marker the format used for the theory/hands-on boundary, were rejected twice over: `markdown-harness.config.yaml` is `frontmatter: rules:` and nothing else, so an in-body comment layer is unenforceable by anything in the repository, and the boundary marker itself turned out to be a duplicate of a frontmatter field rather than a precedent worth extending. Deferring resolution to a renderer was rejected because there is no `src/`. Frontmatter alone was rejected because it cannot say where.

So the body carries structure through its own structure — headings, blockquote markers, numbered lists — never through a layer laid over it. Marker and content are then the same object and cannot drift apart. This extends `0001-episode-is-prose-under-a-declared-spine`, which refused a `beats:` key and let the `##` headings be authoritative. The difference is that Subject domains need the set as well as the positions, and a set is what frontmatter is for.

## Consequences

A `###` heading carries the Subject domain's label alone — `### Project management`, not `### Subject: project management`. The term names the concept and the frontmatter key; it never appears in a heading. Kebab-casing the whole heading is the derivation: `### Project management` yields `project-management`, which must appear in `subject_domains:`. A title beside the label would need a separator to parse and a convention to kebab-case around.

A Beat is a prose lede, then `###` headings where the material is Subject-domain-specific
and none where it is not. Markdown headings do not close, so prose after a `###` belongs to
that Subject domain; material belonging to no Subject domain goes in the lede or goes. The
headings are optional per Beat and complete across the Episode: an entry in `subject_domains:`
means at least one Beat binds it, while no Beat owes a heading to every Subject domain. A
Beat with nothing Subject-domain-specific to say is all lede, and writing one heading per
domain there would be coverage theatre — the same claim restated under labels.

The equality is unchecked. The harness reads the Episode's frontmatter keys but not its body, and the body half is recorded as an issue. Until that lands, whatever writes the Episode reports the two sides against each other at hand-back — which specifies the check by running it by hand first.

## Premise

`###` headings are worth their cost before anything can check them, and are worth it on
whichever Beats carry Subject-domain-specific material rather than uniformly. The coverage gap that prompted this was in `The explanation`, not in the case list, so restricting headings to `Shown working` would have left the observed failure undetectable. If body-checking never arrives, the headings are structure maintained for a reader who could have inferred it from the prose.

Optionality is the half of this that rests on an author's judgement: a Beat that should have
carried a heading and did not is indistinguishable from a Beat with nothing domain-specific to
say. The Episode-level equality is what still catches the overclaim, and it catches it only
once, at the Episode's edge.
