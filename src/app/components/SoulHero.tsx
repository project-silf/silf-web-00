import { Download, Maximize2, Play, ShieldCheck, X } from "lucide-react";
import type { Soul } from "../data/silf";
import { useStore } from "../state/store";
import { cn } from "./ui/utils";

export function SoulHero({ soul }: { soul: Soul }) {
  const { runSkill, setNav } = useStore();
  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/60 shadow-sm">
      <div className={cn("absolute inset-0 bg-gradient-to-br", soul.accent)} />
      <KnowledgeGraphSVG />

      <div className="absolute top-3 left-3 flex gap-2 z-10">
        <RoundBtn label="Download">
          <Download className="size-3.5" />
        </RoundBtn>
        <RoundBtn label="Expand">
          <Maximize2 className="size-3.5" />
        </RoundBtn>
      </div>
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur text-xs flex items-center gap-1.5">
          <ShieldCheck className="size-3 text-emerald-600" />
          Trust {soul.trust}
        </span>
        <RoundBtn label="Close">
          <X className="size-3.5" />
        </RoundBtn>
      </div>

      <div className="relative aspect-[16/9] flex flex-col justify-end p-6 z-[5]">
        <p className="text-xs uppercase tracking-wider text-neutral-700">
          {soul.subtitle}
        </p>
        <h1 className="mt-1 text-neutral-900">{soul.name}</h1>
        <p className="mt-2 max-w-md text-sm text-neutral-800/80">
          A living knowledge graph of {soul.graphNodes.toLocaleString()} nodes
          and {soul.graphEdges.toLocaleString()} relationships powering{" "}
          {soul.skills} skills.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={runSkill}
            className="px-4 py-2 rounded-full bg-neutral-900 text-white text-sm flex items-center gap-2 hover:bg-neutral-800 active:scale-[.98]"
          >
            <Play className="size-3.5" />
            Run skill
          </button>
          <button
            type="button"
            onClick={() => setNav("skills")}
            className="px-4 py-2 rounded-full bg-white/80 backdrop-blur text-sm text-neutral-800 hover:bg-white"
          >
            Explore skills
          </button>
        </div>
      </div>
    </div>
  );
}

function RoundBtn({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="size-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white"
    >
      {children}
    </button>
  );
}

function KnowledgeGraphSVG() {
  const nodes = [
    [15, 30],
    [28, 18],
    [42, 35],
    [55, 22],
    [70, 40],
    [82, 25],
    [22, 55],
    [38, 65],
    [58, 60],
    [75, 70],
    [88, 58],
  ] as const;
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5],
    [2, 6],
    [6, 7],
    [4, 8],
    [7, 8],
    [8, 9],
    [9, 10],
    [5, 10],
  ];
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      viewBox="0 0 100 80"
      preserveAspectRatio="none"
    >
      {edges.map(([a, b]) => (
        <line
          key={`edge-${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="0.15"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={`node-${x}-${y}`}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 0.9 : 0.55}
          fill="white"
          fillOpacity="0.9"
        />
      ))}
    </svg>
  );
}
