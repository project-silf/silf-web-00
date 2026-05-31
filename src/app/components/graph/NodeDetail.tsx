import { useState } from "react";
import { Award, GitBranch, Activity, ScrollText, Sparkles, ChevronRight, Minus, Plus, Pencil } from "lucide-react";
import { dossierFor, nodes, nodeTypeMeta, edges } from "../../data/graph";
import { Sparkline } from "./Sparkline";
import { cn } from "../ui/utils";

type Tab = "overview" | "evolution" | "telemetry" | "logs" | "kudos";

const TABS: Array<{ key: Tab; label: string; icon: typeof Sparkles }> = [
  { key: "overview",  label: "Overview",  icon: Sparkles },
  { key: "evolution", label: "Evolution", icon: GitBranch },
  { key: "telemetry", label: "Telemetry", icon: Activity },
  { key: "logs",      label: "Logs",      icon: ScrollText },
  { key: "kudos",     label: "Kudos",     icon: Award },
];

export function NodeDetail({ nodeId }: { nodeId: string }) {
  const node = nodes.find((n) => n.id === nodeId) ?? nodes[0];
  const dossier = dossierFor(node.id);
  const meta = nodeTypeMeta[node.type];
  const [tab, setTab] = useState<Tab>("overview");

  const neighbors = edges
    .filter((e) => e.from === node.id || e.to === node.id)
    .map((e) => ({
      otherId: e.from === node.id ? e.to : e.from,
      kind: e.kind,
      dir: e.from === node.id ? "→" : "←",
    }));

  return (
    <div className="h-full bg-white/85 backdrop-blur rounded-3xl border border-white/60 shadow-sm flex flex-col overflow-hidden">
      <header className="p-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div
            className="size-10 rounded-xl flex items-center justify-center text-sm"
            style={{ background: meta.bg, color: meta.color, boxShadow: `inset 0 0 0 1px ${meta.ring}` }}
          >
            {node.label.slice(0, 1)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wider" style={{ color: meta.color }}>
              {meta.label}
            </p>
            <p className="text-sm truncate">{node.label}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-neutral-500">Trust</p>
            <p className="text-sm">{node.trust}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
          <span>Level</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 w-5 rounded-full",
                  i < node.level ? "bg-neutral-900" : "bg-neutral-200"
                )}
              />
            ))}
          </div>
          <span className="ml-auto">{node.sub}</span>
        </div>
      </header>

      {/* Tabs */}
      <nav className="px-3 pt-3 flex gap-1 border-b border-neutral-100">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "px-3 py-1.5 text-xs flex items-center gap-1.5 rounded-t-lg border-b-2 -mb-px",
              tab === key
                ? "border-neutral-900 text-neutral-900"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            )}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "overview" && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-neutral-700">{dossier.description}</p>

            <section>
              <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                Connections · {neighbors.length}
              </h4>
              <ul className="flex flex-col gap-1.5">
                {neighbors.map((c, i) => {
                  const other = nodes.find((n) => n.id === c.otherId);
                  if (!other) return null;
                  const m = nodeTypeMeta[other.type];
                  return (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="size-2 rounded-full" style={{ background: m.ring }} />
                      <span className="text-neutral-500 text-xs">{c.dir}</span>
                      <span className="text-neutral-800 truncate flex-1">{other.label}</span>
                      <span className="text-[10px] text-neutral-500 px-1.5 py-0.5 rounded-full bg-neutral-100">
                        {c.kind}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        )}

        {tab === "evolution" && (
          <ol className="relative border-l border-neutral-200 pl-4 flex flex-col gap-4">
            {dossier.evolution.map((step, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[1.4rem] top-1 size-3 rounded-full bg-white border-2 border-neutral-900" />
                <div className="flex items-baseline gap-2">
                  <p className="text-sm">{step.version}</p>
                  <p className="text-xs text-neutral-500">{step.date}</p>
                </div>
                <p className="mt-0.5 text-sm text-neutral-700">{step.summary}</p>
                <div className="mt-2 grid grid-cols-1 gap-1 text-xs">
                  {step.diff.added.map((x, j) => (
                    <DiffLine key={`a${j}`} icon={<Plus className="size-3" />} tone="emerald" text={x} />
                  ))}
                  {step.diff.changed.map((x, j) => (
                    <DiffLine key={`c${j}`} icon={<Pencil className="size-3" />} tone="amber" text={x} />
                  ))}
                  {step.diff.removed.map((x, j) => (
                    <DiffLine key={`r${j}`} icon={<Minus className="size-3" />} tone="rose" text={x} />
                  ))}
                </div>
              </li>
            ))}
          </ol>
        )}

        {tab === "telemetry" && (
          <div className="grid grid-cols-1 gap-3">
            <Sparkline label="Runs (per day)"    data={dossier.telemetry.runs}      tone="emerald" />
            <Sparkline label="Latency"           data={dossier.telemetry.latencyMs} unit=" ms" tone="sky" />
            <Sparkline label="Quality score"     data={dossier.telemetry.quality}   unit="%" tone="amber" />
          </div>
        )}

        {tab === "logs" && (
          <ul className="flex flex-col gap-1.5">
            {dossier.logs.map((l) => (
              <li key={l.id} className="flex items-center gap-2 text-sm rounded-xl px-2 py-1.5 hover:bg-neutral-50">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    l.level === "success" && "bg-emerald-500",
                    l.level === "info"    && "bg-neutral-400",
                    l.level === "warn"    && "bg-amber-500",
                    l.level === "error"   && "bg-rose-500"
                  )}
                />
                <span className="text-xs text-neutral-400 w-12 shrink-0">{l.at}</span>
                <span className="text-neutral-700 truncate">{l.text}</span>
              </li>
            ))}
          </ul>
        )}

        {tab === "kudos" && (
          <div className="flex flex-col gap-2">
            {dossier.kudos.length === 0 && (
              <p className="text-sm text-neutral-500">No kudos yet. Use this entity to earn some.</p>
            )}
            {dossier.kudos.map((k) => (
              <div key={k.id} className="rounded-2xl border border-neutral-100 bg-white p-3 flex items-center gap-3">
                <div className="size-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Award className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="text-neutral-900">{k.from}</span>
                    <ChevronRight className="inline size-3 mx-1 text-neutral-400" />
                    <span className="text-neutral-700">{k.to}</span>
                  </p>
                  <p className="text-xs text-neutral-500">{k.reason}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm text-amber-700">+{k.points}</p>
                  <p className="text-[10px] text-neutral-400">{k.at}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DiffLine({ icon, tone, text }: { icon: React.ReactNode; tone: "emerald" | "amber" | "rose"; text: string }) {
  const cls = {
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-100",
    amber:   "bg-amber-50 text-amber-800 border-amber-100",
    rose:    "bg-rose-50 text-rose-800 border-rose-100",
  }[tone];
  return (
    <div className={cn("rounded-md border px-2 py-1 flex items-center gap-1.5", cls)}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}
