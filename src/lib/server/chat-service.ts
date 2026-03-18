import { isLocale, type Locale } from "../i18n/config";

import { createChatAdapter, type ChatMessage } from "./adapters/chat";
import { buildChatContext, SourceGroundingUnavailableError } from "./chat-context";

export type ChatRequestBody = {
  locale?: string;
  messages?: ChatMessage[];
};

export type ChatCompletionStream = {
  adapterId: string;
  locale: Locale;
  stream: AsyncIterable<string>;
};

export class ChatHttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ChatHttpError";
    this.status = status;
  }
}

export async function createChatCompletionStream(
  body: ChatRequestBody,
  signal?: AbortSignal,
): Promise<ChatCompletionStream> {
  const requestedLocale = body.locale ?? "";

  if (!isLocale(requestedLocale)) {
    throw new ChatHttpError(400, "Unsupported locale.");
  }

  if (!isValidMessageList(body.messages)) {
    throw new ChatHttpError(400, "A chat history with user/assistant messages is required.");
  }

  const locale = requestedLocale;
  const sanitizedMessages = body.messages
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }))
    .filter((message) => message.content.length > 0);
  const latestUserMessage = [...sanitizedMessages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    throw new ChatHttpError(400, "At least one user message is required.");
  }

  try {
    const contextBlocks = await buildChatContext({
      locale,
      question: latestUserMessage.content,
    });
    const adapter = createChatAdapter();

    return {
      adapterId: adapter.id,
      locale,
      stream: adapter.stream({
        locale,
        messages: sanitizedMessages,
        contextBlocks,
        signal,
      }),
    };
  } catch (error) {
    if (error instanceof SourceGroundingUnavailableError) {
      throw new ChatHttpError(
        503,
        "Chat grounding is unavailable because the bundled source corpus could not be loaded. Check src/content/bundled-source-documents.ts.",
      );
    }

    throw error;
  }
}

function isValidMessageList(messages: ChatRequestBody["messages"]): messages is ChatMessage[] {
  return Array.isArray(messages)
    && messages.every(
      (message) =>
        Boolean(message)
        && (message.role === "assistant" || message.role === "user")
        && typeof message.content === "string",
    );
}