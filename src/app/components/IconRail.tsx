import {
  Bell,
  BookOpenText,
  Boxes,
  History,
  MessagesSquare,
  Settings,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { type NavKey, useStore } from "../state/store";
import { cn } from "./ui/utils";

const items: Array<{ key: NavKey; icon: typeof Sparkles; label: string }> = [
  { key: "souls", icon: Users, label: "Souls" },
  { key: "graph", icon: Share2, label: "Graph" },
  { key: "skills", icon: Boxes, label: "Skills" },
  { key: "corpus", icon: BookOpenText, label: "Corpus" },
  { key: "chat", icon: MessagesSquare, label: "Companion" },
  { key: "history", icon: History, label: "Audit" },
];

export function IconRail() {
  const { activeNav, setNav } = useStore();
  return (
    <aside className="flex flex-col items-center gap-2 py-4 px-2 w-14 bg-white/40 backdrop-blur-sm border-r border-white/60 rounded-3xl">
      <div className="size-9 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2">
        <Sparkles className="size-4 text-emerald-600" />
      </div>
      {items.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          type="button"
          aria-label={label}
          title={label}
          onClick={() => setNav(key)}
          className={cn(
            "size-10 rounded-xl flex items-center justify-center transition-colors",
            activeNav === key
              ? "bg-neutral-900 text-white shadow-md"
              : "bg-white/70 text-neutral-600 hover:bg-white",
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
      <div className="flex-1" />
      <button
        type="button"
        aria-label="Notifications"
        className="size-10 rounded-xl bg-white/70 text-neutral-600 hover:bg-white flex items-center justify-center"
      >
        <Bell className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Settings"
        className="size-10 rounded-xl bg-white/70 text-neutral-600 hover:bg-white flex items-center justify-center"
      >
        <Settings className="size-4" />
      </button>
    </aside>
  );
}
