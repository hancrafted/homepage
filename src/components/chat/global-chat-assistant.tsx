"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Locale } from "@/lib/i18n/config";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type GlobalChatAssistantProps = {
  locale: Locale;
};

const chatShellCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    open: string;
    close: string;
    you: string;
    inputLabel: string;
    placeholder: string;
    send: string;
    greeting: string;
    streaming: string;
    idle: string;
    error: string;
    empty: string;
    multilineHint: string;
  }
> = {
  de: {
    title: "KI-Assistent",
    description: "Frage nach Services, Methoden, Erfahrung oder Hintergrund von Han Che.",
    open: "KI-Assistent öffnen",
    close: "KI-Assistent schließen",
    you: "Du",
    inputLabel: "Nachricht an den KI-Assistenten",
    placeholder: "Zum Beispiel: Welche Coaching-Schwerpunkte bietet Han Che an?",
    send: "Senden",
    greeting:
      "Hallo — ich kann Fragen zu Han Ches Services, Methoden, Erfahrung und beruflichem Hintergrund beantworten.",
    streaming: "Der KI-Assistent antwortet gerade.",
    idle: "Der KI-Assistent ist bereit.",
    error: "Die Antwort konnte gerade nicht geladen werden. Bitte versuche es erneut.",
    empty: "Es wurde keine Antwort zurückgegeben. Bitte formuliere die Frage etwas konkreter.",
    multilineHint: "Shift + Enter fügt eine neue Zeile ein.",
  },
  en: {
    title: "AI Assistant",
    description: "Ask about Han Che’s services, methods, experience, or background.",
    open: "Open AI assistant",
    close: "Close AI assistant",
    you: "You",
    inputLabel: "Message the AI assistant",
    placeholder: "For example: What coaching services does Han Che offer?",
    send: "Send",
    greeting:
      "Hi — I can answer questions about Han Che’s services, methods, experience, and professional background.",
    streaming: "The AI assistant is responding.",
    idle: "The AI assistant is ready.",
    error: "The response could not be loaded right now. Please try again.",
    empty: "No response came back. Try asking a slightly more specific question.",
    multilineHint: "Shift + Enter inserts a new line.",
  },
  zh: {
    title: "AI 助手",
    description: "可以询问 Han Che 的服务方向、方法论、经历或职业背景。",
    open: "打开 AI 助手",
    close: "关闭 AI 助手",
    you: "你",
    inputLabel: "发送消息给 AI 助手",
    placeholder: "例如：Han Che 提供哪些创业辅导服务？",
    send: "发送",
    greeting: "你好——我可以回答关于 Han Che 的服务、方法、经历与职业背景的问题。",
    streaming: "AI 助手正在回复。",
    idle: "AI 助手已就绪。",
    error: "当前无法加载回复，请稍后重试。",
    empty: "没有收到回复，请尝试提出更具体的问题。",
    multilineHint: "按 Shift + Enter 可以换行。",
  },
};

export function GlobalChatAssistant({ locale }: GlobalChatAssistantProps) {
  const copy = chatShellCopy[locale];
  const initialMessages = useMemo<ChatMessage[]>(
    () => [
      {
        id: "welcome",
        role: "assistant",
        content: copy.greeting,
      },
    ],
    [copy.greeting],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setMessages(initialMessages);
    setDraft("");
    setErrorMessage(null);
    setIsStreaming(false);
  }, [initialMessages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !isOpen) {
        return;
      }

      setIsOpen(false);
      fabRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(
    () => () => {
      abortControllerRef.current?.abort();
    },
    [],
  );

  async function handleSubmit() {
    const content = draft.trim();

    if (!content || isStreaming) {
      return;
    }

    setIsOpen(true);
    setDraft("");
    setErrorMessage(null);

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content,
    };
    const assistantMessageId = createMessageId();
    const nextMessages: ChatMessage[] = [
      ...messages,
      userMessage,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      },
    ];

    setMessages(nextMessages);
    setIsStreaming(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale,
          messages: nextMessages
            .filter((message) => message.role === "user" || message.content.trim().length > 0)
            .map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        }),
        signal: abortController.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(await extractApiErrorMessage(response, copy.error));
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        accumulated += decoder.decode(value, { stream: true });
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  content: accumulated,
                }
              : message,
          ),
        );
      }

      accumulated += decoder.decode();
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                content: accumulated.trim() || copy.empty,
              }
            : message,
        ),
      );
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      const errorMessage = error instanceof Error && error.message ? error.message : copy.error;
      setErrorMessage(errorMessage);
      setMessages((currentMessages) =>
        currentMessages.map((chatMessage) =>
          chatMessage.id === assistantMessageId
            ? {
                ...chatMessage,
                content: errorMessage,
              }
            : chatMessage,
        ),
      );
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }

  function handleToggle() {
    setIsOpen((current) => !current);
  }

  function handleTextareaKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[60] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <p className="sr-only" role="status" aria-live="polite">
        {errorMessage ?? (isStreaming ? copy.streaming : copy.idle)}
      </p>

      {isOpen ? (
        <section
          aria-describedby="global-chat-description"
          aria-labelledby="global-chat-title"
          id="global-chat-panel"
          className="pointer-events-auto w-[min(26rem,calc(100vw-2rem))] rounded-[1.75rem] border bg-[var(--color-bg)] shadow-[var(--shadow-header)]"
          role="dialog"
        >
          <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
            <div className="space-y-1">
              <h2 id="global-chat-title" className="text-lg font-semibold tracking-tight text-[var(--color-fg)]">
                {copy.title}
              </h2>
              <p id="global-chat-description" className="text-sm leading-6 text-[var(--color-muted)]">
                {copy.description}
              </p>
            </div>

            <button
              aria-label={copy.close}
              className="ghost-control min-h-10 px-3"
              onClick={() => {
                setIsOpen(false);
                fabRef.current?.focus();
              }}
              type="button"
            >
              ×
            </button>
          </div>

          <div className="max-h-[24rem] space-y-3 overflow-y-auto px-5 py-4">
            {messages.map((message) => {
              const isAssistant = message.role === "assistant";

              return (
                <article
                  key={message.id}
                  className={isAssistant
                    ? "max-w-[92%] rounded-[1.25rem] border bg-[var(--color-surface)] px-4 py-3 text-sm leading-7 text-[var(--color-fg)]"
                    : "ml-auto max-w-[92%] rounded-[1.25rem] bg-[var(--color-accent)] px-4 py-3 text-sm leading-7 text-white"
                  }
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
                    {isAssistant ? copy.title : copy.you}
                  </p>
                  <p className="whitespace-pre-wrap">{message.content || copy.streaming}</p>
                </article>
              );
            })}
            <div ref={endRef} />
          </div>

          <form
            className="space-y-3 border-t px-5 py-4"
            onSubmit={(event) => {
              event.preventDefault();
              void handleSubmit();
            }}
          >
            <label className="sr-only" htmlFor="global-chat-input">
              {copy.inputLabel}
            </label>
            <textarea
              id="global-chat-input"
              className="min-h-28 w-full resize-none rounded-[1.25rem] border bg-[var(--color-bg)] px-4 py-3 text-sm leading-7 text-[var(--color-fg)]"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleTextareaKeyDown}
              placeholder={copy.placeholder}
              ref={inputRef}
              rows={3}
              value={draft}
            />

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs leading-5 text-[var(--color-muted)]">{copy.multilineHint}</p>
              <button className="primary-cta min-w-24" disabled={isStreaming || draft.trim().length === 0} type="submit">
                {isStreaming ? "…" : copy.send}
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <button
        aria-controls="global-chat-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? copy.close : copy.open}
        className="primary-cta pointer-events-auto min-h-14 gap-3 px-5 shadow-[var(--shadow-header)]"
        onClick={handleToggle}
        ref={fabRef}
        type="button"
      >
        <span aria-hidden="true" className="text-lg leading-none">
          ✦
        </span>
        <span>{copy.title}</span>
      </button>
    </div>
  );
}

function createMessageId() {
  return `message-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function extractApiErrorMessage(response: Response, fallbackMessage: string) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const payload = (await response.json()) as { error?: string };
    return payload.error || fallbackMessage;
  }

  const text = await response.text();
  return text || fallbackMessage;
}