/**
 * Generates docs/llm-wiki/index.md from the frontmatter of the three Knowledge tiers.
 *
 * The index is never hand-edited (information-architecture.md section 7), so every line it
 * carries is copied out of a governed document rather than authored here: a row is a link plus
 * that document's own `description`, verbatim.
 *
 * Run `node scripts/build-wiki-index.mjs` to write it, `--check` to assert it is current.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const GENERATED_BY = 'process:wiki-index';
export const INDEX_TITLE = 'llm-wiki index';
export const INDEX_DESCRIPTION =
  'Every landed artefact, Finding and Concept this repository holds, one row each, with the description the document carries. Read it to find the evidence for a claim before searching the web, and to see whether a subject has been researched here at all.';
const INDEX_LEAD =
  'Generated from the frontmatter of the tiers below by `npm run wiki:index`. Never hand-edited — change a document, then regenerate.';
const MAX_REPORTED_LINES = 12;

/** Tier order is the citation order: Raw is cited by everything, Concept cites everything. */
export const TIERS = [
  { id: 'raw', dir: 'raw', heading: 'Raw', empty: '_No Raw landed yet._' },
  { id: 'findings', dir: 'findings', heading: 'Findings', empty: '_No Findings yet._' },
  { id: 'concepts', dir: 'concepts', heading: 'Concepts', empty: '_No Concepts yet._' },
];

/* ------------------------------------------------------------------ frontmatter (pure) */

const KEY_LINE = /^([A-Za-z_][A-Za-z0-9_.-]*):(?:[ \t]+(.*))?$/;
const indentOf = (line) => line.length - line.trimStart().length;
const isIgnorable = (line) => line.trim() === '' || line.trimStart().startsWith('#');
const isSequenceItem = (line) => line.trimStart() === '-' || line.trimStart().startsWith('- ');
const skipIgnorable = (lines, start) => {
  let i = start;
  while (i < lines.length && isIgnorable(lines[i])) i += 1;
  return i;
};

const parseScalar = (raw) => {
  const value = raw.trim();
  if (value.length > 1 && value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replace(/''/g, "'");
  if (value.length > 1 && value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1).replace(/\\"/g, '"');
  return value;
};

/** Collects the indented lines under a `>`/`|` header, or the continuation of a plain scalar. */
const collectIndented = (lines, start, indent) => {
  const collected = [];
  let i = start;
  while (i < lines.length && (lines[i].trim() === '' || indentOf(lines[i]) > indent)) {
    collected.push(lines[i].trim());
    i += 1;
  }
  while (collected.length > 0 && collected.at(-1) === '') collected.pop();
  return { collected, next: i };
};

const parseBlockScalar = (lines, start, indent, header) => {
  const { collected, next } = collectIndented(lines, start + 1, indent);
  const separator = header.startsWith('|') ? '\n' : ' ';
  return { value: collected.join(separator).trim(), next };
};

const parseFlowSequence = (raw) => raw.slice(1, -1).split(',').map(parseScalar).filter(Boolean);

const parseSequence = (lines, start, indent) => {
  const items = [];
  let i = start;
  while (i < lines.length) {
    if (isIgnorable(lines[i])) {
      i += 1;
      continue;
    }
    if (indentOf(lines[i]) !== indent || !isSequenceItem(lines[i])) break;
    const content = lines[i].trimStart().slice(2);
    if (!KEY_LINE.test(content.trim())) {
      items.push(parseScalar(content));
      i += 1;
      continue;
    }
    const patched = [...lines];
    patched[i] = ' '.repeat(indent + 2) + content;
    const parsed = parseMapping(patched, i, indent + 2);
    items.push(parsed.value);
    i = parsed.next;
  }
  return { value: items, next: i };
};

const parseValue = (lines, index, indent, raw) => {
  if (raw !== undefined && raw.trim() !== '') {
    const value = raw.trim();
    if (value.startsWith('>') || value.startsWith('|')) return parseBlockScalar(lines, index, indent, value);
    if (value.startsWith('[') && value.endsWith(']')) return { value: parseFlowSequence(value), next: index + 1 };
    return { value: parseScalar(value), next: index + 1 };
  }
  const child = skipIgnorable(lines, index + 1);
  if (child >= lines.length) return { value: '', next: index + 1 };
  const childIndent = indentOf(lines[child]);
  if (childIndent > indent) return parseBlock(lines, child, childIndent);
  if (childIndent === indent && isSequenceItem(lines[child])) return parseSequence(lines, child, indent);
  return { value: '', next: index + 1 };
};

const parseMapping = (lines, start, indent) => {
  const result = {};
  let i = start;
  while (i < lines.length) {
    if (isIgnorable(lines[i])) {
      i += 1;
      continue;
    }
    if (indentOf(lines[i]) < indent) break;
    const match = KEY_LINE.exec(lines[i].trim());
    if (match === null) {
      i += 1;
      continue;
    }
    const parsed = parseValue(lines, i, indent, match[2]);
    result[match[1]] = parsed.value;
    i = parsed.next;
  }
  return { value: result, next: i };
};

const parseBlock = (lines, start, indent) => {
  const first = skipIgnorable(lines, start);
  if (first >= lines.length) return { value: {}, next: first };
  if (isSequenceItem(lines[first])) return parseSequence(lines, first, indent);
  if (KEY_LINE.test(lines[first].trim())) return parseMapping(lines, first, indent);
  const { collected, next } = collectIndented(lines, first, indent - 1);
  return { value: collected.join(' ').trim(), next };
};

/**
 * Reads the YAML subset the harness rules actually use: scalars, nested maps, block scalars and
 * sequences of either. Anything richer is not frontmatter this repository writes.
 */
export const parseFrontmatter = (text) => {
  const normalised = text.replace(/\r\n/g, '\n');
  if (!normalised.startsWith('---\n')) return {};
  const end = normalised.indexOf('\n---', 3);
  if (end === -1) return {};
  const block = normalised.slice(4, end + 1).split('\n');
  const parsed = parseBlock(block, 0, 0).value;
  return typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
};

const field = (data, dotted) => dotted.split('.').reduce((node, key) => (node == null ? undefined : node[key]), data);
const text = (value) => (typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '');
const datePart = (value) => (/^\d{4}-\d{2}-\d{2}/.test(text(value)) ? text(value).slice(0, 10) : '');
const year = (value) => (/^\d{4}/.test(text(value)) ? text(value).slice(0, 4) : '');

/* ------------------------------------------------------------------ rendering (pure) */

const metaFor = (tierId, data) => {
  if (tierId === 'raw') return [text(data.publisher), year(data.published)].filter(Boolean);
  if (tierId === 'findings') {
    const count = Array.isArray(data.sources) ? data.sources.length : 0;
    return count > 0 ? [`${count} ${count === 1 ? 'source' : 'sources'}`] : [];
  }
  const verified = datePart(field(data, 'verified.at'));
  const stale = datePart(data.stale_after);
  return [verified && `verified ${verified}`, stale && `stale after ${stale}`].filter(Boolean);
};

/** One row: the link, the document's own description verbatim, then whatever the tier carries. */
export const toRow = (tierId, entry) => {
  const tier = TIERS.find((candidate) => candidate.id === tierId);
  const data = entry.data ?? {};
  const label = text(data.title) || entry.file.replace(/\.md$/, '');
  const parts = [`- [${label}](${tier.dir}/${entry.file})`];
  const description = text(data.description);
  if (description) parts.push(`— ${description}`);
  const meta = metaFor(tierId, data);
  if (meta.length > 0) parts.push(`(${meta.join(', ')})`);
  if (entry.pdf) parts.push(`· [PDF](${tier.dir}/${entry.pdf})`);
  return parts.join(' ');
};

export const renderIndex = ({ rows, generatedAt }) => {
  const lines = [
    '---',
    'type: index',
    `title: ${INDEX_TITLE}`,
    `description: ${INDEX_DESCRIPTION}`,
    'generated:',
    `  by: ${GENERATED_BY}`,
    `  at: ${generatedAt}`,
    '---',
    '',
    `# ${INDEX_TITLE}`,
    '',
    INDEX_LEAD,
  ];
  for (const tier of TIERS) {
    const tierRows = rows[tier.id] ?? [];
    lines.push('', `## ${tier.heading}`, '', ...(tierRows.length > 0 ? tierRows : [tier.empty]));
  }
  return `${lines.join('\n')}\n`;
};

const GENERATED_AT_LINE = /^ {2}at: .*$/m;

/** The timestamp is elided so a run that changed nothing does not advance it. */
export const withoutGeneratedAt = (markdown) => markdown.replace(GENERATED_AT_LINE, '  at: <elided>');

export const resolveIndex = ({ existing, candidate }) => {
  if (existing === null || existing === undefined) return { content: candidate, changed: true };
  if (withoutGeneratedAt(existing) === withoutGeneratedAt(candidate)) return { content: existing, changed: false };
  return { content: candidate, changed: true };
};

/** Blank lines and the elided timestamp carry no information, so neither is reported. */
const meaningfulLines = (markdown) =>
  withoutGeneratedAt(markdown)
    .split('\n')
    .filter((line) => line.trim() !== '');

/** Multiset difference: the lines of `source` that `other` does not also carry. */
const linesMissingFrom = (source, other) => {
  const remaining = [...other];
  return source.filter((line) => {
    const at = remaining.indexOf(line);
    if (at === -1) return true;
    remaining.splice(at, 1);
    return false;
  });
};

const listing = (heading, lines) => {
  if (lines.length === 0) return [];
  const shown = lines.slice(0, MAX_REPORTED_LINES).map((line) => `    ${line}`);
  const rest = lines.length - shown.length;
  return [`  ${heading}`, ...shown, ...(rest > 0 ? [`    …and ${rest} more`] : [])];
};

export const describeDrift = ({ label, expected, actual }) => {
  if (actual === null || actual === undefined) return `${label} is missing. Run \`npm run wiki:index\` to create it.`;
  const expectedLines = meaningfulLines(expected);
  const actualLines = meaningfulLines(actual);
  const absent = listing('missing from the file:', linesMissingFrom(expectedLines, actualLines));
  const surplus = listing('on disk but no longer generated:', linesMissingFrom(actualLines, expectedLines));
  const body =
    absent.length + surplus.length > 0 ? [...absent, ...surplus] : ['  the same lines, in a different order'];
  return [`${label} is out of date.`, ...body, 'Run `npm run wiki:index` to regenerate.'].join('\n');
};

export const toStamp = (date) => `${date.toISOString().slice(0, 19)}Z`;

/* ------------------------------------------------------------------ filesystem */

/** Flat, one level, `.md` only: the harness's folder selectors do not recurse either. */
export const readTier = (wikiDir, tier) => {
  const dir = path.join(wikiDir, tier.dir);
  if (!existsSync(dir)) return [];
  const names = readdirSync(dir, { withFileTypes: true })
    .filter((item) => item.isFile())
    .map((item) => item.name);
  const pdfs = new Set(names.filter((name) => name.endsWith('.pdf')));
  return names
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map((file) => {
      const pdf = `${file.slice(0, -3)}.pdf`;
      const entry = { file, data: parseFrontmatter(readFileSync(path.join(dir, file), 'utf8')) };
      return tier.id === 'raw' && pdfs.has(pdf) ? { ...entry, pdf } : entry;
    });
};

export const buildIndex = ({ wikiDir, generatedAt }) => {
  const rows = Object.fromEntries(
    TIERS.map((tier) => [tier.id, readTier(wikiDir, tier).map((entry) => toRow(tier.id, entry))]),
  );
  return renderIndex({ rows, generatedAt });
};

export const run = ({ root = REPO_ROOT, check = false, now = new Date(), log = console.log, warn = console.error }) => {
  const wikiDir = path.join(root, 'docs', 'llm-wiki');
  const indexPath = path.join(wikiDir, 'index.md');
  const label = path.relative(root, indexPath) || indexPath;
  const existing = existsSync(indexPath) ? readFileSync(indexPath, 'utf8') : null;
  const { content, changed } = resolveIndex({
    existing,
    candidate: buildIndex({ wikiDir, generatedAt: toStamp(now) }),
  });
  if (!changed) {
    log(`${label} is up to date.`);
    return 0;
  }
  if (check) {
    warn(describeDrift({ label, expected: content, actual: existing }));
    return 1;
  }
  mkdirSync(wikiDir, { recursive: true });
  writeFileSync(indexPath, content, 'utf8');
  log(`${label} ${existing === null ? 'created' : 'updated'}.`);
  return 0;
};

const invokedDirectly =
  process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  process.exitCode = run({ check: process.argv.includes('--check') });
}
