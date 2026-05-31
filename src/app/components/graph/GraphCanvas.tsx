import { useMemo, useState } from "react";
import {
  edges,
  type GraphNode,
  type NodeType,
  nodes,
  nodeTypeMeta,
} from "../../data/graph";

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
  filterTypes: Set<NodeType>;
};

const EDGE_TONE: Record<string, string> = {
  feeds: "#93c5fd",
  uses: "#cbd5e1",
  "trained-on": "#fdba74",
  "owned-by": "#fde68a",
  "evolved-from": "#a5b4fc",
  "talks-to": "#6ee7b7",
};

export function GraphCanvas({ selectedId, onSelect, filterTypes }: Props) {
  const [hoverId, setHoverId] = useState<string | null>(null);

  const visibleNodes = useMemo(
    () => nodes.filter((n) => filterTypes.has(n.type)),
    [filterTypes],
  );
  const visibleIds = useMemo(
    () => new Set(visibleNodes.map((n) => n.id)),
    [visibleNodes],
  );
  const visibleEdges = useMemo(
    () => edges.filter((e) => visibleIds.has(e.from) && visibleIds.has(e.to)),
    [visibleIds],
  );

  const focusedNeighbors = useMemo(() => {
    const id = hoverId ?? selectedId;
    if (!id) return new Set<string>();
    const s = new Set<string>([id]);
    for (const e of edges) {
      if (e.from === id) s.add(e.to);
      if (e.to === id) s.add(e.from);
    }
    return s;
  }, [hoverId, selectedId]);

  const focusId = hoverId ?? selectedId;

  const byId = (id: string): GraphNode | undefined =>
    visibleNodes.find((n) => n.id === id);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50 border border-white/60">
      {/* Legend */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[60%]">
        {(Object.keys(nodeTypeMeta) as NodeType[]).map((t) => {
          const m = nodeTypeMeta[t];
          const on = filterTypes.has(t);
          return (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1 bg-white/80 backdrop-blur"
              style={{ opacity: on ? 1 : 0.4 }}
            >
              <span
                className="size-2 rounded-full"
                style={{ background: m.ring }}
              />
              {m.label}
            </span>
          );
        })}
      </div>

      <svg
        role="img"
        aria-label="Knowledge graph"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        {/* Edges */}
        {visibleEdges.map((e) => {
          const a = byId(e.from);
          const b = byId(e.to);
          if (!a || !b) return null;
          const isFocused = focusId
            ? e.from === focusId || e.to === focusId
            : false;
          return (
            <line
              key={`${e.from}-${e.to}-${e.kind}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={EDGE_TONE[e.kind] ?? "#cbd5e1"}
              strokeWidth={isFocused ? 0.5 : 0.18}
              strokeOpacity={focusId && !isFocused ? 0.15 : 0.7}
            />
          );
        })}

        {/* Nodes */}
        {visibleNodes.map((n) => {
          const m = nodeTypeMeta[n.type];
          const r = 2 + (n.size ?? 1);
          const dim = focusId ? !focusedNeighbors.has(n.id) : false;
          const isSel = n.id === selectedId;
          return (
            <g
              key={n.id}
              role="button"
              tabIndex={0}
              aria-label={`Select ${n.label}`}
              transform={`translate(${n.x},${n.y})`}
              onMouseEnter={() => setHoverId(n.id)}
              onMouseLeave={() => setHoverId(null)}
              onClick={() => onSelect(n.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(n.id);
                }
              }}
              style={{
                cursor: "pointer",
                opacity: dim ? 0.25 : 1,
                transition: "opacity .15s",
              }}
            >
              <circle
                r={r + 1.4}
                fill={m.ring}
                fillOpacity={isSel ? 0.9 : 0.35}
              />
              <circle
                r={r}
                fill={m.bg}
                stroke={m.color}
                strokeWidth={isSel ? 0.5 : 0.25}
              />
              {n.type === "organization" && (
                <circle r={r * 0.45} fill={m.color} fillOpacity={0.8} />
              )}
              <text
                y={r + 2.2}
                textAnchor="middle"
                fontSize="1.7"
                fontWeight={isSel ? 700 : 500}
                fill="#0f172a"
                style={{ pointerEvents: "none" }}
              >
                {n.label}
              </text>
              <text
                y={r + 4.2}
                textAnchor="middle"
                fontSize="1.3"
                fill="#64748b"
                style={{ pointerEvents: "none" }}
              >
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Footer hint */}
      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur text-[10px] text-neutral-600">
        Click a node — hover to inspect connections
      </div>
    </div>
  );
}
