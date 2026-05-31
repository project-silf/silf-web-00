import { Paperclip, Plus, Send, Sparkles } from "lucide-react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../data/silf";
import { useStore } from "../state/store";
import { cn } from "./ui/utils";

export function CompanionChat({ full = false }: { full?: boolean }) {
  const { chat, sendChat } = useStore();
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chat.length === 0) return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat.length]);

  const submit = () => {
    if (!text.trim()) return;
    sendChat(text);
    setText("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl bg-white border border-white/60 shadow-sm p-4 flex flex-col gap-3",
        full ? "h-full" : "min-h-[320px]",
      )}
    >
      <header className="flex items-center gap-2">
        <Sparkles className="size-4 text-emerald-600" />
        <h3 className="text-sm">AI Companion</h3>
        <span className="ml-auto text-xs text-neutral-400">
          {chat.length} messages
        </span>
      </header>

      <p className="text-xs text-neutral-500">
        Talking to your digital twin + connected Souls. Replies are traceable.
      </p>

      <div
        ref={scrollRef}
        className={cn(
          "flex flex-col gap-2.5 overflow-y-auto",
          full ? "flex-1" : "max-h-[320px]",
        )}
      >
        {chat.map((m) => (
          <Bubble key={m.id} msg={m} />
        ))}
      </div>

      <div className="mt-1 rounded-2xl border border-neutral-200 flex items-center px-2 py-1.5 gap-1">
        <button
          type="button"
          className="size-8 rounded-full hover:bg-neutral-100 flex items-center justify-center"
        >
          <Plus className="size-4 text-neutral-500" />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKey}
          placeholder="Ask the companion…"
          className="flex-1 bg-transparent outline-none text-sm px-1"
        />
        <button
          type="button"
          className="size-8 rounded-full hover:bg-neutral-100 flex items-center justify-center"
        >
          <Paperclip className="size-4 text-neutral-500" />
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={!text.trim()}
          className="size-8 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 disabled:opacity-40"
        >
          <Send className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: ChatMessage }) {
  const mine = msg.author === "you";
  return (
    <div className={cn("flex", mine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
          mine
            ? "bg-neutral-900 text-white rounded-br-sm"
            : msg.author === "agent"
              ? "bg-amber-50 text-neutral-800 border border-amber-100 rounded-bl-sm"
              : "bg-neutral-100 text-neutral-800 rounded-bl-sm",
        )}
      >
        {msg.authorLabel && !mine && (
          <p className="text-[10px] uppercase tracking-wider opacity-70 mb-0.5">
            {msg.authorLabel}
          </p>
        )}
        <p>{msg.text}</p>
        <p
          className={cn(
            "mt-1 text-[10px]",
            mine ? "text-neutral-400" : "text-neutral-500",
          )}
        >
          {msg.time}
        </p>
      </div>
    </div>
  );
}
