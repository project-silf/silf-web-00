import { CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { useStore } from "../state/store";
import { cn } from "./ui/utils";

const levelMeta = {
  info:    { Icon: Info,           tone: "text-neutral-500 bg-neutral-100" },
  success: { Icon: CheckCircle2,   tone: "text-emerald-700 bg-emerald-100" },
  warn:    { Icon: AlertTriangle,  tone: "text-amber-700 bg-amber-100" },
} as const;

export function AuditView() {
  const { audit } = useStore();
  return (
    <div className="h-full bg-white/80 backdrop-blur rounded-3xl border border-white/60 shadow-sm p-5 overflow-y-auto">
      <header className="mb-4">
        <p className="text-xs uppercase tracking-wider text-neutral-500">Governance</p>
        <h2 className="mt-1">Audit trail</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Every interaction is captured: who asked, which Soul answered, which sources were used.
        </p>
      </header>

      <ol className="flex flex-col gap-2">
        {audit.map((e) => {
          const m = levelMeta[e.level];
          const Icon = m.Icon;
          return (
            <li key={e.id} className="rounded-2xl bg-white border border-neutral-100 p-3 flex items-center gap-3">
              <span className={cn("size-8 rounded-xl flex items-center justify-center", m.tone)}>
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-neutral-800">{e.text}</p>
                <p className="text-xs text-neutral-500">{e.soulName}</p>
              </div>
              <span className="text-xs text-neutral-400 shrink-0">{e.at}</span>
            </li>
          );
        })}
        {audit.length === 0 && (
          <li className="text-sm text-neutral-500">No activity yet.</li>
        )}
      </ol>
    </div>
  );
}
