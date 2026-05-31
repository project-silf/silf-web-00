import { Clock, FileCheck2, Play, Sparkles, TrendingUp } from "lucide-react";
import type { Skill } from "../data/silf";
import { useStore } from "../state/store";
import { cn } from "./ui/utils";

const statusMeta: Record<
  Skill["status"],
  { label: string; icon: typeof Sparkles; tone: string }
> = {
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
};

export function SkillsList() {
  const { skills, featuredSkillId, featureSkill, runSkill } = useStore();
  const featured = skills.find((s) => s.id === featuredSkillId) ?? skills[0];
  const rest = skills.filter((s) => s.id !== featured.id);

  return (
    <div className="flex flex-col gap-3">
      <FeaturedSkill skill={featured} onRun={runSkill} />
      {rest.map((s) => (
        <SkillRow key={s.id} skill={s} onSelect={() => featureSkill(s.id)} />
      ))}
    </div>
  );
}

function FeaturedSkill({ skill, onRun }: { skill: Skill; onRun: () => void }) {
  const meta = statusMeta[skill.status];
  const Icon = meta.icon;
  return (
    <div className="rounded-2xl bg-white border border-neutral-100 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-neutral-500">{skill.domain}</p>
          <p className="mt-0.5 text-sm">{skill.title}</p>
          <p className="mt-1 text-xs text-neutral-500">
            Last run: {skill.lastRun}
          </p>
        </div>
        <div className="text-right">
          <p className="text-neutral-900">{skill.progress}%</p>
          <p className="text-xs text-neutral-500">{skill.version}</p>
        </div>
      </div>
      <div className="mt-3 h-2 rounded-full bg-neutral-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-300 to-lime-400 transition-all"
          style={{ width: `${skill.progress}%` }}
        />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-xs flex items-center gap-1",
            meta.tone,
          )}
        >
          <Icon className="size-3" /> {meta.label}
        </span>
        <span className="text-xs text-neutral-500">
          {skill.uses.toLocaleString()} runs
        </span>
        <button
          type="button"
          onClick={onRun}
          className="ml-auto px-3 py-1 rounded-full bg-neutral-900 text-white text-xs flex items-center gap-1.5 hover:bg-neutral-800"
        >
          <Play className="size-3" /> Run
        </button>
      </div>
    </div>
  );
}

function SkillRow({ skill, onSelect }: { skill: Skill; onSelect: () => void }) {
  const meta = statusMeta[skill.status];
  const Icon = meta.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      className="text-left rounded-2xl bg-white border border-neutral-100 p-3.5 flex items-center gap-3 hover:border-neutral-300 transition-colors"
    >
      <div className="size-9 rounded-xl bg-neutral-50 flex items-center justify-center">
        <Icon className="size-4 text-neutral-600" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm">{skill.title}</p>
          <span
            className={cn("px-1.5 py-0.5 rounded-full text-[10px]", meta.tone)}
          >
            {meta.label}
          </span>
        </div>
        <div className="mt-1.5 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
          <div
            className="h-full bg-neutral-300 transition-all"
            style={{ width: `${skill.progress}%` }}
          />
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm text-neutral-700">{skill.progress.toFixed(0)}%</p>
        <p className="text-xs text-neutral-400">{skill.version}</p>
      </div>
    </button>
  );
}
