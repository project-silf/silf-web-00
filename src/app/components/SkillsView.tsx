import {
  Clock,
  FileCheck2,
  Filter,
  Play,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import type { Skill } from "../data/silf";
import { useStore } from "../state/store";
import { cn } from "./ui/utils";

const statusMeta = {
  stable: {
    label: "Stable",
    icon: FileCheck2,
    tone: "bg-neutral-100 text-neutral-700",
  },
  born: {
    label: "Born",
    icon: Sparkles,
    tone: "bg-emerald-100 text-emerald-700",
  },
  evolved: {
    label: "Evolved",
    icon: TrendingUp,
    tone: "bg-amber-100 text-amber-800",
  },
  review: {
    label: "In review",
    icon: Clock,
    tone: "bg-rose-100 text-rose-700",
  },
} as const;

const FILTERS: Array<{ key: "all" | Skill["status"]; label: string }> = [
  { key: "all", label: "All" },
  { key: "born", label: "Born" },
  { key: "evolved", label: "Evolved" },
  { key: "review", label: "In review" },
  { key: "stable", label: "Stable" },
];

export function SkillsView() {
  const { skills, featureSkill, runSkill, featuredSkillId } = useStore();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  const list = skills.filter((s) => filter === "all" || s.status === filter);

  return (
    <div className="h-full bg-white/80 backdrop-blur rounded-3xl border border-white/60 shadow-sm p-5 overflow-y-auto">
      <header className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Workspace
          </p>
          <h2 className="mt-1">Skills library</h2>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="size-3.5 text-neutral-500" />
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "px-3 py-1 rounded-full text-xs",
                filter === f.key
                  ? "bg-neutral-900 text-white"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {list.map((s) => {
          const meta = statusMeta[s.status];
          const Icon = meta.icon;
          const active = s.id === featuredSkillId;
          return (
            <div
              key={s.id}
              className={cn(
                "rounded-2xl border p-4 transition-all bg-white",
                active
                  ? "border-neutral-900 shadow-md"
                  : "border-neutral-100 hover:border-neutral-300",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-neutral-500">{s.domain}</p>
                  <p className="mt-0.5 text-sm">{s.title}</p>
                </div>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs flex items-center gap-1 shrink-0",
                    meta.tone,
                  )}
                >
                  <Icon className="size-3" /> {meta.label}
                </span>
              </div>

              <div className="mt-3 h-2 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-300 to-lime-400 transition-all"
                  style={{ width: `${s.progress}%` }}
                />
              </div>

              <div className="mt-3 flex items-center gap-3 text-xs text-neutral-500">
                <span>{s.version}</span>
                <span>·</span>
                <span>{s.uses.toLocaleString()} runs</span>
                <span className="ml-auto">{s.lastRun}</span>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => featureSkill(s.id)}
                  className="flex-1 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-xs hover:bg-neutral-200"
                >
                  {active ? "Featured" : "Feature"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    featureSkill(s.id);
                    runSkill();
                  }}
                  className="px-3 py-1.5 rounded-full bg-neutral-900 text-white text-xs flex items-center gap-1.5 hover:bg-neutral-800"
                >
                  <Play className="size-3" /> Run
                </button>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <p className="text-sm text-neutral-500">
            No skills match this filter.
          </p>
        )}
      </div>
    </div>
  );
}
