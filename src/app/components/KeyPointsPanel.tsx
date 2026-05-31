import { Check, Circle, Edit3, Send } from "lucide-react";
import { useStore } from "../state/store";

export function KeyPointsPanel() {
  const {
    keyPoints,
    toggleKeyPoint,
    sendForApproval,
    skills,
    featuredSkillId,
    souls,
    activeSoulId,
  } = useStore();
  const skill = skills.find((s) => s.id === featuredSkillId);
  const soul = souls.find((s) => s.id === activeSoulId);

  return (
    <div className="rounded-3xl bg-white border border-white/60 shadow-sm p-4 flex flex-col gap-3">
      <header className="flex items-center justify-between">
        <h3 className="text-sm">Run Trace</h3>
        <button
          type="button"
          className="size-7 rounded-full hover:bg-neutral-100 flex items-center justify-center"
        >
          <Edit3 className="size-3.5 text-neutral-500" />
        </button>
      </header>

      <p className="text-xs text-neutral-500">
        {skill?.title ?? "—"} · {soul?.name ?? "—"}
      </p>

      <ul className="flex flex-col gap-1">
        {keyPoints.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => toggleKeyPoint(p.id)}
              className="w-full flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-neutral-50 text-left"
            >
              <span
                className={p.done ? "text-emerald-600" : "text-neutral-300"}
              >
                {p.done ? (
                  <Check className="size-4" />
                ) : (
                  <Circle className="size-4" />
                )}
              </span>
              <span
                className={`flex-1 text-sm ${p.done ? "text-neutral-400 line-through" : "text-neutral-700"}`}
              >
                {p.text}
              </span>
              <span className="text-xs text-neutral-400">{p.time}</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={sendForApproval}
        className="mt-1 w-full rounded-full bg-neutral-900 text-white py-2 text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-[.99]"
      >
        <Send className="size-3.5" />
        Send for human approval
      </button>
    </div>
  );
}
