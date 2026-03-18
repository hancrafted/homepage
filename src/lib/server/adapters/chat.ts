import type { Locale } from "../../i18n/config";
import type { ChatContextBlock } from "../chat-context";

export type ChatRole = "assistant" | "user";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatStreamParams = {
  locale: Locale;
  messages: ChatMessage[];
  contextBlocks: ChatContextBlock[];
  signal?: AbortSignal;
};

export type ChatAdapter = {
  id: string;
  stream: (params: ChatStreamParams) => AsyncIterable<string>;
};

const adapterCopy = {
  de: {
    intro: "Hier ist eine schnelle, kontextgestützte Antwort basierend auf den hinterlegten Profil- und Quelldokumenten:",
    fallback: "Ich kann Han Ches Coaching-Schwerpunkte, beruflichen Hintergrund, Methoden oder Erfahrungen zusammenfassen.",
    closing: "Wenn du möchtest, kann ich die Antwort als Kurzprofil, Service-Überblick oder Erfahrungszusammenfassung zuschneiden.",
  },
  en: {
    intro: "Here’s a quick context-grounded answer based on Han Che’s profile and source documents:",
    fallback: "I can summarize Han Che’s coaching focus, experience, methods, and background.",
    closing: "If useful, I can tailor the answer into a short bio, service overview, or experience summary.",
  },
  zh: {
    intro: "以下是基于 Han Che 资料页与源文档整理出的快速回答：",
    fallback: "我可以继续总结 Han Che 的辅导方向、职业经历、方法论与背景。",
    closing: "如果你愿意，我还可以把回答整理成简介版、服务版或经历版。",
  },
} as const;

const STREAM_CHUNK_WORDS = 4;
const STREAM_CHUNK_DELAY_MS = 28;

export function createChatAdapter(): ChatAdapter {
  const provider = process.env.AI_CHAT_PROVIDER?.trim().toLowerCase() || "mock";

  switch (provider) {
    case "mock":
    default:
      return createMockChatAdapter(provider);
  }
}

export function createMockChatAdapter(providerId = "mock"): ChatAdapter {
  return {
    id: providerId,
    async *stream(params) {
      const response = buildMockResponse(params);

      for (const chunk of chunkText(response)) {
        if (params.signal?.aborted) {
          break;
        }

        yield chunk;
        await delay(STREAM_CHUNK_DELAY_MS);
      }
    },
  };
}

function buildMockResponse({ locale, messages, contextBlocks }: ChatStreamParams) {
  const copy = adapterCopy[locale];
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const highlightedBlocks = pickHighlightedBlocks(contextBlocks);

  if (!highlightedBlocks.length) {
    return `${copy.intro}\n\n${copy.fallback}\n\n${copy.closing}`;
  }

  const questionLead = latestUserMessage?.content.trim()
    ? locale === "de"
      ? `Zur Frage „${latestUserMessage.content.trim()}“ sind besonders diese Punkte relevant:`
      : locale === "zh"
        ? `针对“${latestUserMessage.content.trim()}”，最相关的信息如下：`
        : `For “${latestUserMessage.content.trim()}”, the most relevant points are:`
    : copy.fallback;

  const blockSummaries = highlightedBlocks
    .map((block) => `• ${block.title}: ${truncate(block.content, 240)} (${block.sourceLabel})`)
    .join("\n");

  return `${copy.intro}\n\n${questionLead}\n${blockSummaries}\n\n${copy.closing}`;
}

function pickHighlightedBlocks(contextBlocks: ChatContextBlock[]) {
  const topDocumentBlock = contextBlocks.find((block) => block.sourceType === "bundled-document");
  const prioritizedBlocks = [contextBlocks[0], topDocumentBlock, ...contextBlocks].filter(Boolean) as ChatContextBlock[];
  const seen = new Set<string>();

  return prioritizedBlocks.filter((block) => {
    const fingerprint = `${block.title}::${block.sourceLabel}::${block.content}`;

    if (seen.has(fingerprint)) {
      return false;
    }

    seen.add(fingerprint);
    return true;
  }).slice(0, 3);
}

function chunkText(text: string) {
  const tokens = text.split(/(\s+)/).filter(Boolean);
  const chunks: string[] = [];

  for (let index = 0; index < tokens.length; index += STREAM_CHUNK_WORDS) {
    chunks.push(tokens.slice(index, index + STREAM_CHUNK_WORDS).join(""));
  }

  return chunks;
}

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  const shortened = text.slice(0, maxLength).trimEnd();
  const lastSpace = shortened.lastIndexOf(" ");

  return `${(lastSpace > maxLength * 0.65 ? shortened.slice(0, lastSpace) : shortened).trimEnd()}…`;
}

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}