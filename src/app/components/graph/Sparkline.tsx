import type { TelemetryPoint } from "../../data/graph";

type Props = {
  label: string;
  unit?: string;
  data: TelemetryPoint[];
  tone?: "emerald" | "amber" | "sky";
};

const stroke = {
  emerald: "#059669",
  amber: "#d97706",
  sky: "#0284c7",
};

const fill = {
  emerald: "rgba(5,150,105,0.12)",
  amber: "rgba(217,119,6,0.12)",
  sky: "rgba(2,132,199,0.12)",
};

export function Sparkline({ label, unit, data, tone = "emerald" }: Props) {
  const min = Math.min(...data.map((d) => d.v));
  const max = Math.max(...data.map((d) => d.v));
  const range = max - min || 1;

  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.v - min) / range) * 100;
    return [x, y] as const;
  });

  const line = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`)
    .join(" ");
  const area = `${line} L100,100 L0,100 Z`;
  const last = data[data.length - 1].v;

  return (
    <div className="rounded-2xl bg-white border border-neutral-100 p-3">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-xs text-neutral-500">{label}</p>
        <p className="text-sm text-neutral-900">
          {last}
          {unit ? (
            <span className="text-xs text-neutral-500 ml-0.5">{unit}</span>
          ) : null}
        </p>
      </div>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-12"
      >
        <path d={area} fill={fill[tone]} />
        <path
          d={line}
          fill="none"
          stroke={stroke[tone]}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
