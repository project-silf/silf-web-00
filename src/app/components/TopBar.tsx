import { ArrowLeft, SlidersHorizontal, Globe, UserPlus } from "lucide-react";
import { useStore } from "../state/store";

const NAV_LABEL: Record<string, string> = {
  souls: "souls", graph: "graph", skills: "skills", corpus: "corpus", chat: "companion", history: "audit",
};

export function TopBar() {
  const { souls, activeSoulId, activeNav, setNav, inviteCollaborator } = useStore();
  const soul = souls.find((s) => s.id === activeSoulId);
  const slug = soul?.name.toLowerCase().replace(/\s+/g, "-") ?? "";

  return (
    <header className="flex items-center gap-2 mb-3">
      <button
        onClick={() => setNav("souls")}
        className="size-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center"
        aria-label="Back to souls"
      >
        <ArrowLeft className="size-4 text-neutral-600" />
      </button>
      <button className="size-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center" aria-label="Filters">
        <SlidersHorizontal className="size-4 text-neutral-600" />
      </button>

      <div className="ml-2 px-3 py-1.5 rounded-full bg-white/70 flex items-center gap-2 text-xs text-neutral-600">
        <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
        Live session
      </div>

      <div className="flex-1 ml-2 px-3 py-1.5 rounded-full bg-white/70 flex items-center gap-2 text-xs text-neutral-500 min-w-0">
        <Globe className="size-3.5 shrink-0" />
        <span className="truncate">silf.app/workspace/northwind/{slug}/{NAV_LABEL[activeNav]}</span>
      </div>

      <button
        onClick={inviteCollaborator}
        className="px-4 py-2 rounded-full bg-neutral-900 text-white text-sm flex items-center gap-2 hover:bg-neutral-800"
      >
        <UserPlus className="size-3.5" />
        Invite collaborator
      </button>
    </header>
  );
}
