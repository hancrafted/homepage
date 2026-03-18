import { bundledSourceDocuments, getBundledSourceDocumentMarkdown } from "@/content/bundled-source-documents";
import { getSiteContent, sourceDocuments } from "@/content/site-content";
import type { Locale } from "@/lib/i18n/config";

type BuildChatContextParams = {
  locale: Locale;
  question: string;
};

type MarkdownSection = {
  title: string;
  content: string;
};

export type ChatContextBlock = {
  title: string;
  content: string;
  sourceLabel: string;
  sourceType: "bundled-document" | "structured";
  relevanceScore: number;
};

const MAX_BLOCKS = 4;
const MAX_SECTION_LENGTH = 540;
const stopWords = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "can",
  "che",
  "das",
  "der",
  "die",
  "ein",
  "eine",
  "for",
  "from",
  "han",
  "how",
  "ich",
  "ist",
  "mit",
  "oder",
  "the",
  "und",
  "what",
  "wie",
  "with",
]);

export async function buildChatContext({ locale, question }: BuildChatContextParams) {
  const copy = getSiteContent(locale);
  const keywordTokens = tokenize(question);
  const structuredBlocks: ChatContextBlock[] = [
    {
      title: copy.home.hero.title,
      content: [copy.home.hero.description, ...copy.home.hero.proofPoints].join(" "),
      sourceLabel: "Localized site profile",
      sourceType: "structured",
      relevanceScore: 0,
    },
    {
      title: copy.home.services.title,
      content: copy.home.services.items
        .map((service) => `${service.title}: ${service.description} Outcomes: ${service.outcomes.join(" ")}`)
        .join(" "),
      sourceLabel: "Centralized services content",
      sourceType: "structured",
      relevanceScore: 0,
    },
    {
      title: copy.home.methods.title,
      content: copy.home.methods.items
        .map((method) => `${method.title}: ${method.description} ${method.detail}`)
        .join(" "),
      sourceLabel: "Centralized methods content",
      sourceType: "structured",
      relevanceScore: 0,
    },
    {
      title: copy.about.experience.title,
      content: copy.about.experience.items
        .map((item) => `${item.role} at ${item.company} (${item.period}, ${item.location}). ${item.highlights.join(" ")}`)
        .join(" "),
      sourceLabel: "Centralized experience content",
      sourceType: "structured",
      relevanceScore: 0,
    },
    {
      title: copy.about.education.title,
      content: copy.about.education.items
        .map((item) => `${item.degree} at ${item.institution} (${item.period}). ${item.details.join(" ")}`)
        .join(" "),
      sourceLabel: "Centralized education content",
      sourceType: "structured",
      relevanceScore: 0,
    },
    {
      title: copy.about.skills.title,
      content: copy.about.skills.groups.map((group) => `${group.title}: ${group.items.join(", ")}`).join(" "),
      sourceLabel: "Centralized skills content",
      sourceType: "structured",
      relevanceScore: 0,
    },
  ];

  const documentBlocks = await buildDocumentBlocks(keywordTokens);
  const rankedBlocks = [...structuredBlocks, ...documentBlocks]
    .map((block) => ({
      ...block,
      relevanceScore: scoreBlock(block, keywordTokens),
    }))
    .sort((left, right) => right.relevanceScore - left.relevanceScore || left.content.length - right.content.length);

  const selectedBlocks = ensureDocumentGrounding(
    rankedBlocks.filter((block) => block.relevanceScore > 0),
    documentBlocks,
    structuredBlocks,
  );

  return selectedBlocks.length ? selectedBlocks : structuredBlocks.slice(0, 3);
}

export class SourceGroundingUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SourceGroundingUnavailableError";
  }
}

async function buildDocumentBlocks(keywordTokens: string[]) {
  const blocks: ChatContextBlock[] = [];
  const seenFingerprints = new Set<string>();

  assertBundledGroundingIsAvailable();

  for (const document of Object.values(sourceDocuments)) {
    const rawDocument = getBundledSourceDocumentMarkdown(document.id);

    if (!rawDocument) {
      continue;
    }

    const sections = extractMarkdownSections(rawDocument, document.label)
      .map((section) => ({
        title: section.title,
        content: truncate(section.content, MAX_SECTION_LENGTH),
      }))
      .filter((section) => section.content.length > 80)
      .filter((section) => {
        if (!keywordTokens.length) {
          return ["Summary", "Experience", "Education", "Top Skills", "Certifications"].includes(section.title);
        }

        const normalized = `${section.title} ${section.content}`.toLowerCase();
        return keywordTokens.some((token) => normalized.includes(token));
      })
      .slice(0, 4);

    for (const section of sections) {
      const fingerprint = `${section.title}::${section.content}`;

      if (seenFingerprints.has(fingerprint)) {
        continue;
      }

      seenFingerprints.add(fingerprint);
      blocks.push({
        title: section.title,
        content: section.content,
        sourceLabel: document.label,
        sourceType: "bundled-document",
        relevanceScore: 0,
      });
    }
  }

  return blocks;
}

function assertBundledGroundingIsAvailable() {
  const missingDocuments = Object.entries(sourceDocuments)
    .filter(([documentId]) => !bundledSourceDocuments[documentId as keyof typeof bundledSourceDocuments]?.markdown.trim())
    .map(([, document]) => `${document.label} (${document.repositoryPath})`);

  if (missingDocuments.length) {
    throw new SourceGroundingUnavailableError(
      `Bundled source grounding is unavailable for: ${missingDocuments.join(", ")}.`,
    );
  }
}

function ensureDocumentGrounding(
  rankedPositiveBlocks: ChatContextBlock[],
  documentBlocks: ChatContextBlock[],
  structuredBlocks: ChatContextBlock[],
) {
  const selected = rankedPositiveBlocks.slice(0, MAX_BLOCKS);
  const topDocumentBlock = rankedPositiveBlocks.find((block) => block.sourceType === "bundled-document") ?? documentBlocks[0];

  if (!selected.length) {
    const fallback = [structuredBlocks[0], topDocumentBlock, structuredBlocks[1]].filter(Boolean) as ChatContextBlock[];
    return dedupeBlocks(fallback).slice(0, 3);
  }

  if (topDocumentBlock && !selected.some((block) => isSameBlock(block, topDocumentBlock))) {
    if (selected.length < MAX_BLOCKS) {
      selected.push(topDocumentBlock);
    } else {
      selected[selected.length - 1] = topDocumentBlock;
    }
  }

  return dedupeBlocks(selected);
}

function dedupeBlocks(blocks: ChatContextBlock[]) {
  const seen = new Set<string>();

  return blocks.filter((block) => {
    const fingerprint = `${block.title}::${block.sourceLabel}::${block.content}`;

    if (seen.has(fingerprint)) {
      return false;
    }

    seen.add(fingerprint);
    return true;
  });
}

function isSameBlock(left: ChatContextBlock, right: ChatContextBlock) {
  return left.title === right.title && left.sourceLabel === right.sourceLabel && left.content === right.content;
}

function extractMarkdownSections(markdown: string, fallbackTitle: string) {
  const lines = markdown.split(/\r?\n/);
  const sections: MarkdownSection[] = [];
  let currentTitle = fallbackTitle;
  let currentLines: string[] = [];

  for (const line of lines) {
    const headingMatch = /^(#{2,3})\s+(.+)$/.exec(line.trim());

    if (headingMatch) {
      pushSection(sections, currentTitle, currentLines);
      currentTitle = headingMatch[2].trim();
      currentLines = [];
      continue;
    }

    currentLines.push(line);
  }

  pushSection(sections, currentTitle, currentLines);
  return sections;
}

function pushSection(sections: MarkdownSection[], title: string, lines: string[]) {
  const content = sanitizeMarkdown(lines.join("\n"));

  if (!content) {
    return;
  }

  sections.push({ title, content });
}

function sanitizeMarkdown(markdown: string) {
  return markdown
    .replace(/\[cite_start\]/g, "")
    .replace(/\[cite:[^\]]+\]/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\r?\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string) {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function scoreBlock(block: Pick<ChatContextBlock, "title" | "content">, keywordTokens: string[]) {
  if (!keywordTokens.length) {
    return 1;
  }

  const title = block.title.toLowerCase();
  const content = block.content.toLowerCase();

  return keywordTokens.reduce((score, token) => {
    const titleMatches = countOccurrences(title, token);
    const contentMatches = countOccurrences(content, token);
    return score + titleMatches * 4 + contentMatches;
  }, 0);
}

function countOccurrences(text: string, token: string) {
  if (!token) {
    return 0;
  }

  let count = 0;
  let cursor = 0;

  while (cursor >= 0) {
    cursor = text.indexOf(token, cursor);

    if (cursor === -1) {
      break;
    }

    count += 1;
    cursor += token.length;
  }

  return count;
}

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  const shortened = text.slice(0, maxLength).trimEnd();
  const lastSpace = shortened.lastIndexOf(" ");
  return `${(lastSpace > maxLength * 0.65 ? shortened.slice(0, lastSpace) : shortened).trimEnd()}…`;
}