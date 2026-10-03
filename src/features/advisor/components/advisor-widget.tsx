"use client";

import { LoaderCircle, Mic, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { LogoMark } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useAdvisor } from "@/providers/advisor-provider";

type Message = { id: number; role: "user" | "assistant"; text: string };

const suggestions = ["When should I harvest my wheat?", "Organic fix for early blight on tomato?", "आज प्याज़ का मंडी भाव क्या है?"];

const greeting: Message = {
  id: 0,
  role: "assistant",
  text: "नमस्ते! I can help with crop care, pests, fertiliser, weather and mandi rates. Ask by voice or text.",
};

/** Floating "Ask Kirshify" assistant. Talks to POST /api/v1/advisor. */
export function AdvisorWidget({ placement = "site" }: { placement?: "site" | "app" }) {
  const { open, toggleAdvisor, closeAdvisor, registerAskHandler } = useAdvisor();
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || pending) return;
    setMessages((m) => [...m, { id: Date.now(), role: "user", text }]);
    setDraft("");
    setPending(true);
    try {
      const res = await fetch("/api/v1/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const json = await res.json();
      const reply = res.ok ? json.data.reply : "Sorry, I couldn't answer that right now. Please try again.";
      setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: reply }]);
    } catch {
      setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: "You seem to be offline. I'll answer once you're connected." }]);
    } finally {
      setPending(false);
    }
  }

  // Buttons elsewhere on the page can open the advisor with a ready-made question.
  const askRef = useRef(ask);
  useEffect(() => {
    askRef.current = ask;
  });
  useEffect(() => registerAskHandler((question) => void askRef.current(question)), [registerAskHandler]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAdvisor();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeAdvisor]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  return (
    <div
      className={cn(
        "fixed right-3 z-50 flex flex-col items-end gap-3 sm:right-6",
        placement === "app" ? "bottom-24 lg:bottom-6" : "bottom-4 sm:bottom-6",
      )}
    >
      {open && (
        <div
          role="dialog"
          aria-label="Kirshify advisor"
          className="flex max-h-[min(560px,calc(100dvh-140px))] w-[min(380px,calc(100vw-24px))] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_64px_rgb(3_20_12/0.3)]"
        >
          <div className="flex items-center gap-3 bg-forest px-4 py-4 text-white">
            <LogoMark tone="dark" />
            <div className="flex flex-1 flex-col">
              <span className="font-extrabold">Kirshify Advisor</span>
              <span className="text-[12.5px] text-on-dark-muted">हिंदी · मराठी · ਪੰਜਾਬੀ · English</span>
            </div>
            <button
              type="button"
              onClick={closeAdvisor}
              aria-label="Close advisor"
              className="inline-flex size-11 items-center justify-center rounded-full bg-forest-600"
            >
              <X className="size-[18px]" />
            </button>
          </div>

          <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-mist p-4" aria-live="polite">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[88%] px-3.5 py-3 text-[14.5px] leading-relaxed",
                  m.role === "user"
                    ? "self-end rounded-2xl rounded-br-md bg-forest text-white"
                    : "self-start rounded-2xl rounded-bl-md bg-white text-ink",
                )}
              >
                {m.text}
              </div>
            ))}
            {pending && (
              <div className="inline-flex items-center gap-2 self-start rounded-2xl bg-white px-3.5 py-3 text-sm text-muted">
                <LoaderCircle className="size-4 animate-spin" /> Thinking…
              </div>
            )}
            {messages.length === 1 && (
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[12.5px] font-extrabold text-muted">Try asking</span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="min-h-11 rounded-2xl border border-line bg-white px-3.5 py-2.5 text-left text-sm font-bold hover:border-forest"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="flex items-center gap-2 border-t border-line-soft py-2.5 pr-2.5 pl-4"
            onSubmit={(e) => {
              e.preventDefault();
              void ask(draft);
            }}
          >
            <label htmlFor="advisor-input" className="sr-only">
              Type your question
            </label>
            <input
              ref={inputRef}
              id="advisor-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your question…"
              className="min-h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-subtle"
              autoComplete="off"
            />
            <button
              type="button"
              aria-label="Voice input (coming soon)"
              title="Voice input coming soon"
              aria-disabled="true"
              className="inline-flex size-11 items-center justify-center rounded-full text-muted"
            >
              <Mic className="size-5" />
            </button>
            <button
              type="submit"
              aria-label="Send question"
              disabled={!draft.trim() || pending}
              className="inline-flex size-11 items-center justify-center rounded-full bg-forest text-white disabled:opacity-40"
            >
              <Send className="size-[18px]" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={toggleAdvisor}
        aria-expanded={open}
        className="inline-flex min-h-15 items-center gap-3 rounded-full bg-ink py-2 pr-5 pl-2 font-extrabold text-white shadow-[0_16px_40px_rgb(3_20_12/0.32)]"
      >
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-leaf text-ink">
          <Mic className="size-[22px]" strokeWidth={2} />
        </span>
        <span className="hidden sm:inline">Ask Kirshify</span>
        <span className="sm:hidden">Ask</span>
      </button>
    </div>
  );
}
