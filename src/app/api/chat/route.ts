import { createChatAdapter, type ChatMessage } from "@/lib/server/adapters/chat";
import { buildChatContext, SourceGroundingUnavailableError } from "@/lib/server/chat-context";
import { isLocale } from "@/lib/i18n/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatRequestBody = {
  locale?: string;
  messages?: ChatMessage[];
};

const encoder = new TextEncoder();

export async function POST(request: Request) {
  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const requestedLocale = body.locale ?? "";

  if (!isLocale(requestedLocale)) {
    return Response.json({ error: "Unsupported locale." }, { status: 400 });
  }

  const locale = requestedLocale;

  if (!isValidMessageList(body.messages)) {
    return Response.json({ error: "A chat history with user/assistant messages is required." }, { status: 400 });
  }

  const sanitizedMessages = body.messages
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }))
    .filter((message) => message.content.length > 0);
  const latestUserMessage = [...sanitizedMessages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    return Response.json({ error: "At least one user message is required." }, { status: 400 });
  }

  let contextBlocks: Awaited<ReturnType<typeof buildChatContext>>;

  try {
    contextBlocks = await buildChatContext({
      locale,
      question: latestUserMessage.content,
    });
  } catch (error) {
    if (error instanceof SourceGroundingUnavailableError) {
      return Response.json(
        {
          error:
            "Chat grounding is unavailable because the bundled source corpus could not be loaded. Check src/content/bundled-source-documents.ts.",
        },
        { status: 503 },
      );
    }

    throw error;
  }

  const adapter = createChatAdapter();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of adapter.stream({
          locale,
          messages: sanitizedMessages,
          contextBlocks,
          signal: request.signal,
        })) {
          if (request.signal.aborted) {
            break;
          }

          controller.enqueue(encoder.encode(chunk));
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-store, no-transform",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Chat-Adapter": adapter.id,
    },
  });
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