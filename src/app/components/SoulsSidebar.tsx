import { Building2, ChevronRight, UserRound, Users } from "lucide-react";
import type { Soul } from "../data/silf";
import { useStore } from "../state/store";
import { cn } from "./ui/utils";

const kindIcon = {
  organization: Building2,
  customer: Users,
  employee: UserRound,
} as const;

export function SoulsSidebar() {
  const { souls, activeSoulId, selectSoul } = useStore();

  const groups: Array<{ label: string; kind: Soul["kind"] }> = [
    { label: "Organization", kind: "organization" },
    { label: "Customers", kind: "customer" },
    { label: "Employees", kind: "employee" },
  ];

  return (
    <div className="w-full h-full bg-white/80 backdrop-blur rounded-3xl p-4 shadow-sm border border-white/60 flex flex-col gap-5 overflow-hidden">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Workspace
          </p>
          <h2 className="mt-1">Living Souls</h2>
        </div>
        <button
          type="button"
          className="size-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center"
        >
          <ChevronRight className="size-3.5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto flex flex-col gap-5 pr-1">
        {groups.map((g) => {
          const Icon = kindIcon[g.kind];
          const list = souls.filter((s) => s.kind === g.kind);
          return (
            <section key={g.kind}>
              <div className="flex items-center gap-2 mb-2 text-xs text-neutral-500">
                <Icon className="size-3.5" />
                <span>{g.label}</span>
                <span className="ml-auto">{list.length}</span>
              </div>
              <ul className="flex flex-col gap-2">
                {list.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => selectSoul(s.id)}
                      className={cn(
                        "w-full text-left rounded-2xl p-2.5 flex items-center gap-3 transition-all border",
                        activeSoulId === s.id
                          ? "bg-neutral-900 text-white border-neutral-900 shadow-md"
                          : "bg-white border-neutral-100 hover:border-neutral-300",
                      )}
                    >
                      <div
                        className={cn(
                          "size-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-neutral-800 shrink-0",
                          s.accent,
                        )}
                      >
                        <span className="text-xs">{s.initials}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{s.name}</p>
                        <p
                          className={cn(
                            "truncate text-xs",
                            activeSoulId === s.id
                              ? "text-neutral-300"
                              : "text-neutral-500",
                          )}
                        >
                          {s.skills} skills · sync {s.lastSync}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
