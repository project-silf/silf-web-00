import { useState } from "react";
import { GraphCanvas } from "./graph/GraphCanvas";
import { NodeDetail } from "./graph/NodeDetail";
import { nodeTypeMeta, type NodeType, nodes } from "../data/graph";
import { cn } from "./ui/utils";

const ALL_TYPES: NodeType[] = ["organization", "customer", "employee", "agent", "skill", "corpus"];

export function GraphView() {
  const [selectedId, setSelectedId] = useState<string>("org-northwind");
  const [filterTypes, setFilterTypes] = useState<Set<NodeType>>(new Set(ALL_TYPES));

  const toggle = (t: NodeType) => {
    setFilterTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const counts = ALL_TYPES.reduce<Record<NodeType, number>>((acc, t) => {
    acc[t] = nodes.filter((n) => n.type === t).length;
    return acc;
  }, { organization: 0, customer: 0, employee: 0, agent: 0, skill: 0, corpus: 0 });

  return (
    <div className="grid grid-cols-12 gap-3 h-full min-h-0">
      <div className="col-span-8 flex flex-col gap-3 min-h-0">
        {/* Filter strip */}
        <div className="flex items-center gap-2 px-1">
          <p className="text-xs text-neutral-500 mr-1">Show</p>
          {ALL_TYPES.map((t) => {
            const m = nodeTypeMeta[t];
            const on = filterTypes.has(t);
            return (
              <button
                key={t}
                onClick={() => toggle(t)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs flex items-center gap-1.5 border transition-all",
                  on ? "bg-white border-neutral-300" : "bg-neutral-100 border-neutral-200 text-neutral-400 line-through"
                )}
                style={on ? { boxShadow: `inset 0 0 0 1px ${m.ring}` } : undefined}
              >
                <span className="size-2 rounded-full" style={{ background: m.ring }} />
                {m.label}
                <span className="text-[10px] text-neutral-500">{counts[t]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 min-h-0">
          <GraphCanvas
            selectedId={selectedId}
            onSelect={setSelectedId}
            filterTypes={filterTypes}
          />
        </div>
      </div>

      <div className="col-span-4 min-h-0">
        <NodeDetail nodeId={selectedId} />
      </div>
    </div>
  );
}
