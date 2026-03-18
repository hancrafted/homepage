import { ChatHttpError, createChatCompletionStream, type ChatRequestBody } from "../../src/lib/server/chat-service";

type LambdaFunctionUrlEvent = {
  body?: string | null;
  isBase64Encoded?: boolean;
  requestContext?: {
    http?: {
      method?: string;
    };
  };
};

type LambdaResponseStream = NodeJS.WritableStream & {
  setContentType: (contentType: string) => void;
  write: (chunk: string | Uint8Array) => boolean;
  end: (chunk?: string) => void;
};

type HttpResponseMetadata = {
  statusCode: number;
  headers?: Record<string, string>;
};

declare const awslambda: {
  streamifyResponse: <TEvent>(
    handler: (event: TEvent, responseStream: LambdaResponseStream, context: unknown) => Promise<void>,
  ) => (event: TEvent, context: unknown) => Promise<void>;
  HttpResponseStream: {
    from: (responseStream: LambdaResponseStream, metadata: HttpResponseMetadata) => LambdaResponseStream;
  };
};

export const handler = awslambda.streamifyResponse<LambdaFunctionUrlEvent>(async (event, responseStream) => {
  const method = event.requestContext?.http?.method || "POST";

  if (method !== "POST") {
    writeJson(responseStream, 405, { error: "Method not allowed. Only POST is supported." });
    return;
  }

  const requestBody = readRequestBody(event);

  let body: ChatRequestBody;

  try {
    body = requestBody ? (JSON.parse(requestBody) as ChatRequestBody) : {};
  } catch {
    writeJson(responseStream, 400, { error: "Invalid JSON payload." });
    return;
  }

  try {
    const { adapterId, stream } = await createChatCompletionStream(body);
    const httpStream = awslambda.HttpResponseStream.from(responseStream, {
      statusCode: 200,
      headers: {
        "Cache-Control": "no-store, no-transform",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Chat-Adapter": adapterId,
      },
    });

    for await (const chunk of stream) {
      httpStream.write(chunk);
    }

    httpStream.end();
  } catch (error) {
    if (error instanceof ChatHttpError) {
      writeJson(responseStream, error.status, { error: error.message });
      return;
    }

    throw error;
  }
});

function readRequestBody(event: LambdaFunctionUrlEvent) {
  if (!event.body) {
    return "";
  }

  return event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
}

function writeJson(responseStream: LambdaResponseStream, statusCode: number, payload: Record<string, string>) {
  const httpStream = awslambda.HttpResponseStream.from(responseStream, {
    statusCode,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  httpStream.write(JSON.stringify(payload));
  httpStream.end();
}