import { ChatHttpError, createChatCompletionStream, type ChatRequestBody } from "@/lib/server/chat-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const encoder = new TextEncoder();

export async function POST(request: Request) {
  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  try {
    const { adapterId, stream: chatStream } = await createChatCompletionStream(body, request.signal);

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of chatStream) {
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
        "X-Chat-Adapter": adapterId,
      },
    });
  } catch (error) {
    if (error instanceof ChatHttpError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    throw error;
  }
}