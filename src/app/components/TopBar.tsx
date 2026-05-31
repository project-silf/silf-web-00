import { ArrowLeft, Globe, SlidersHorizontal, UserPlus } from "lucide-react";
import { useStore } from "../state/store";

const NAV_LABEL: Record<string, string> = {
  souls: "souls",
  graph: "graph",
  skills: "skills",
  corpus: "corpus",
  chat: "companion",
  history: "audit",
};

export function TopBar() {
  const { souls, activeSoulId, activeNav, setNav, inviteCollaborator } =
    useStore();
  const soul = souls.find((s) => s.id === activeSoulId);
  const slug = soul?.name.toLowerCase().replace(/\s+/g, "-") ?? "";

  return (
    <header className="flex items-center gap-2 mb-3 min-w-0">
      <button
        type="button"
        onClick={() => setNav("souls")}
        className="size-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center"
        aria-label="Back to souls"
      >
        <ArrowLeft className="size-4 text-neutral-600" />
      </button>
      <button
        type="button"
        className="size-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center"
        aria-label="Filters"
      >
        <SlidersHorizontal className="size-4 text-neutral-600" />
      </button>

      <div className="hidden sm:flex ml-2 px-3 py-1.5 rounded-full bg-white/70 items-center gap-2 text-xs text-neutral-600">
        <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
        Live session
      </div>

      <div className="flex-1 ml-2 px-3 py-1.5 rounded-full bg-white/70 flex items-center gap-2 text-xs text-neutral-500 min-w-0">
        <Globe className="size-3.5 shrink-0" />
        <span className="truncate">
          silf.app/workspace/northwind/{slug}/{NAV_LABEL[activeNav]}
        </span>
      </div>

      <button
        type="button"
        onClick={inviteCollaborator}
        className="px-3 sm:px-4 py-2 rounded-full bg-neutral-900 text-white text-sm flex items-center gap-2 hover:bg-neutral-800 shrink-0"
      >
        <UserPlus className="size-3.5" />
        <span className="hidden sm:inline">Invite collaborator</span>
        <span className="sm:hidden">Invite</span>
      </button>
    </header>
  );
}
