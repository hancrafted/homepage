import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  buildIndex,
  describeDrift,
  parseFrontmatter,
  renderIndex,
  resolveIndex,
  run,
  toRow,
  withoutGeneratedAt,
} from './build-wiki-index.mjs';

const roots = [];
const STAMP = '2026-01-01T00:00:00Z';
const LATER = new Date('2027-06-06T06:06:06Z');

const makeRoot = () => {
  const root = mkdtempSync(path.join(tmpdir(), 'wiki-index-'));
  roots.push(root);
  return root;
};
const wikiDirOf = (root) => path.join(root, 'docs', 'llm-wiki');
const land = (root, tier, file, contents) => {
  const dir = path.join(wikiDirOf(root), tier);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, file), contents, 'utf8');
};
const indexOf = (root) => readFileSync(path.join(wikiDirOf(root), 'index.md'), 'utf8');
const silently = (extra) => ({ log: () => {}, warn: () => {}, ...extra });

afterEach(() => {
  while (roots.length > 0) rmSync(roots.pop(), { recursive: true, force: true });
});

const rawDoc = (title, description) => `---
type: Raw
title: ${title}
description: ${description}
resource: 'https://example.com/report'
publisher: Veracode
published: 2025-07-30
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-19T00:00:00Z
---

# ${title}
`;

describe('frontmatter parsing', () => {
  it('reads scalars, nested maps and sequences of maps', () => {
    const parsed = parseFrontmatter(`---
type: Finding
title: What the sources say
sources:
  - resource: docs/llm-wiki/raw/a.md
    title: A
  - resource: docs/llm-wiki/raw/b.pdf
    title: B
generated:
  by: anthropic/claude-opus-5
  at: 2026-09-19T00:00:00Z
---

body
`);
    expect(parsed.type).toBe('Finding');
    expect(parsed.sources).toHaveLength(2);
    expect(parsed.sources[1].resource).toBe('docs/llm-wiki/raw/b.pdf');
    expect(parsed.generated.by).toBe('anthropic/claude-opus-5');
  });

  it('folds a block scalar onto one line', () => {
    const parsed = parseFrontmatter(`---
description: >-
  A folded description
  spread over two lines.
---
`);
    expect(parsed.description).toBe('A folded description spread over two lines.');
  });

  it('returns nothing for a document without frontmatter', () => {
    expect(parseFrontmatter('# Just a heading\n')).toEqual({});
  });
});

describe('rows', () => {
  it('copies the description verbatim and carries the tier metadata', () => {
    const description = 'What the artefact contains and why it was landed, quoted rather than paraphrased.';
    const root = makeRoot();
    land(root, 'raw', 'veracode-2025.md', rawDoc('Veracode 2025', description));

    const output = buildIndex({ wikiDir: wikiDirOf(root), generatedAt: STAMP });

    expect(output).toContain(`- [Veracode 2025](raw/veracode-2025.md) — ${description} (Veracode, 2025)`);
  });

  it('counts the sources of a Finding and dates a Concept', () => {
    expect(
      toRow('findings', {
        file: '2026-01-02-do-models-write-insecure-code.md',
        data: { title: 'Do models write insecure code', description: 'Yes, roughly half the time.', sources: [{}, {}] },
      }),
    ).toBe(
      '- [Do models write insecure code](findings/2026-01-02-do-models-write-insecure-code.md) — Yes, roughly half the time. (2 sources)',
    );
    expect(toRow('findings', { file: 'one.md', data: { title: 'One', description: 'A.', sources: [{}] } })).toContain(
      '(1 source)',
    );
    expect(
      toRow('concepts', {
        file: 'insecure-completion.md',
        data: {
          title: 'Insecure completion',
          description: 'Why models complete code insecurely.',
          verified: { at: '2026-09-19T00:00:00Z' },
          stale_after: '2027-03-19T00:00:00Z',
        },
      }),
    ).toBe(
      '- [Insecure completion](concepts/insecure-completion.md) — Why models complete code insecurely. (verified 2026-09-19, stale after 2027-03-19)',
    );
  });

  it('links the PDF beside a Raw sidecar of the same stem', () => {
    const root = makeRoot();
    land(root, 'raw', 'day-1.md', rawDoc('Day 1', 'The slide deck as delivered.'));
    land(root, 'raw', 'day-1.pdf', '%PDF-1.4');

    expect(buildIndex({ wikiDir: wikiDirOf(root), generatedAt: STAMP })).toContain(
      '- [Day 1](raw/day-1.md) — The slide deck as delivered. (Veracode, 2025) · [PDF](raw/day-1.pdf)',
    );
  });

  it('falls back to the filename when a document carries no title', () => {
    expect(toRow('raw', { file: 'untitled.md', data: {} })).toBe('- [untitled](raw/untitled.md)');
  });
});

describe('ordering', () => {
  it('orders rows by filename, not by directory order', () => {
    const root = makeRoot();
    land(root, 'raw', 'charlie.md', rawDoc('Charlie', 'Third.'));
    land(root, 'raw', 'alpha.md', rawDoc('Alpha', 'First.'));
    land(root, 'raw', 'bravo.md', rawDoc('Bravo', 'Second.'));

    const output = buildIndex({ wikiDir: wikiDirOf(root), generatedAt: STAMP });

    expect(output.indexOf('raw/alpha.md')).toBeLessThan(output.indexOf('raw/bravo.md'));
    expect(output.indexOf('raw/bravo.md')).toBeLessThan(output.indexOf('raw/charlie.md'));
  });

  it('produces byte-identical output for the same tree', () => {
    const root = makeRoot();
    land(root, 'raw', 'alpha.md', rawDoc('Alpha', 'First.'));
    land(root, 'findings', '2026-01-01-question.md', '---\ntype: Finding\ntitle: Q\ndescription: An answer.\n---\n');

    expect(buildIndex({ wikiDir: wikiDirOf(root), generatedAt: STAMP })).toBe(
      buildIndex({ wikiDir: wikiDirOf(root), generatedAt: STAMP }),
    );
  });
});

describe('empty and missing tiers', () => {
  it('emits every heading with an empty line when no tier directory exists', () => {
    const root = makeRoot();
    mkdirSync(wikiDirOf(root), { recursive: true });

    const output = buildIndex({ wikiDir: wikiDirOf(root), generatedAt: STAMP });

    expect(output).toContain('## Raw\n\n_No Raw landed yet._');
    expect(output).toContain('## Findings\n\n_No Findings yet._');
    expect(output).toContain('## Concepts\n\n_No Concepts yet._');
  });

  it('ignores nested directories and non-markdown files, leaving the section empty', () => {
    const root = makeRoot();
    land(root, 'raw/5-day-agents-vibecoding', 'Day_1.md', rawDoc('Day 1', 'Nested, so ungoverned.'));
    land(root, 'raw/5-day-agents-vibecoding', 'Day_1.pdf', '%PDF-1.4');
    land(root, 'raw', 'notes.txt', 'not markdown');

    const output = buildIndex({ wikiDir: wikiDirOf(root), generatedAt: STAMP });

    expect(output).toContain('## Raw\n\n_No Raw landed yet._');
    expect(output).not.toContain('Day_1');
  });

  it('writes three empty sections when the wiki has no tiers at all', () => {
    const root = makeRoot();

    expect(run(silently({ root, now: new Date(STAMP) }))).toBe(0);
    expect(indexOf(root)).toBe(renderIndex({ rows: { raw: [], findings: [], concepts: [] }, generatedAt: STAMP }));
  });
  it('writes the empty index without throwing', () => {
    const root = makeRoot();
    mkdirSync(wikiDirOf(root), { recursive: true });

    expect(run(silently({ root }))).toBe(0);
    expect(indexOf(root)).toContain('_No Concepts yet._');
  });
});

describe('generated.at', () => {
  it('is kept when nothing but the timestamp would have changed', () => {
    const root = makeRoot();
    land(root, 'raw', 'alpha.md', rawDoc('Alpha', 'First.'));
    run(silently({ root, now: new Date('2026-01-01T00:00:00Z') }));
    const first = indexOf(root);

    expect(run(silently({ root, now: LATER }))).toBe(0);
    expect(indexOf(root)).toBe(first);
    expect(first).toContain('  at: 2026-01-01T00:00:00Z');
  });

  it('advances only when the rest of the content differs', () => {
    const root = makeRoot();
    land(root, 'raw', 'alpha.md', rawDoc('Alpha', 'First.'));
    run(silently({ root, now: new Date('2026-01-01T00:00:00Z') }));

    land(root, 'raw', 'bravo.md', rawDoc('Bravo', 'Second.'));
    run(silently({ root, now: LATER }));

    expect(indexOf(root)).toContain('  at: 2027-06-06T06:06:06Z');
    expect(indexOf(root)).toContain('raw/bravo.md');
  });

  it('is elided before two renderings are compared', () => {
    const rows = { raw: [], findings: [], concepts: [] };
    const early = renderIndex({ rows, generatedAt: '2026-01-01T00:00:00Z' });
    const late = renderIndex({ rows, generatedAt: '2030-01-01T00:00:00Z' });

    expect(early).not.toBe(late);
    expect(withoutGeneratedAt(early)).toBe(withoutGeneratedAt(late));
    expect(resolveIndex({ existing: early, candidate: late })).toEqual({ content: early, changed: false });
    expect(resolveIndex({ existing: null, candidate: late })).toEqual({ content: late, changed: true });
  });
});

describe('--check', () => {
  it('exits 0 when the file on disk matches what would be generated', () => {
    const root = makeRoot();
    land(root, 'raw', 'alpha.md', rawDoc('Alpha', 'First.'));
    run(silently({ root }));

    expect(run(silently({ root, check: true, now: LATER }))).toBe(0);
  });

  it('exits 1 and names what drifted when the file is stale', () => {
    const root = makeRoot();
    land(root, 'raw', 'alpha.md', rawDoc('Alpha', 'First.'));
    run(silently({ root }));
    land(root, 'raw', 'bravo.md', rawDoc('Bravo', 'Second.'));
    const warnings = [];

    const code = run({ root, check: true, log: () => {}, warn: (message) => warnings.push(message) });

    expect(code).toBe(1);
    expect(warnings.join('\n')).toContain('is out of date');
    expect(warnings.join('\n')).toContain('raw/bravo.md');
    expect(warnings.join('\n')).not.toContain('at:');
    expect(indexOf(root)).not.toContain('raw/bravo.md');
  });

  it('exits 1 when the index has never been written', () => {
    const root = makeRoot();
    mkdirSync(wikiDirOf(root), { recursive: true });
    const warnings = [];

    expect(run({ root, check: true, log: () => {}, warn: (message) => warnings.push(message) })).toBe(1);
    expect(warnings.join('\n')).toContain('is missing');
  });

  it('names the lines that drifted, in both directions', () => {
    const report = describeDrift({ label: 'docs/llm-wiki/index.md', expected: 'a\nb\n', actual: 'a\nc\n' });

    expect(report).toContain('docs/llm-wiki/index.md is out of date.');
    expect(report).toContain('missing from the file:\n    b');
    expect(report).toContain('on disk but no longer generated:\n    c');
    expect(report).not.toContain('    a');
  });

  it('does not report the timestamp as drift', () => {
    const early = renderIndex({ rows: { raw: ['- [A](raw/a.md)'] }, generatedAt: '2026-01-01T00:00:00Z' });
    const late = renderIndex({
      rows: { raw: ['- [A](raw/a.md)', '- [B](raw/b.md)'] },
      generatedAt: '2030-01-01T00:00:00Z',
    });

    const report = describeDrift({ label: 'index.md', expected: late, actual: early });

    expect(report).toContain('- [B](raw/b.md)');
    expect(report).not.toContain('at:');
  });
});
