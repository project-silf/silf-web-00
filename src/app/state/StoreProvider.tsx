import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  chat as seedChat,
  keyPoints as seedKeyPoints,
  skills as seedSkills,
  souls as seedSouls,
} from "../data/silf";
import type { AuditEntry, NavKey } from "./store";
import { StoreCtx, now, uid } from "./store";

const COMPANION_REPLIES = [
  "Got it — I'll route that through the active Soul and capture the trace.",
  "Cross-checking against the customer corpus before drafting.",
  "I'll flag this for human approval — looks adjacent to a known exception.",
  "Reusing skill v4.2; the evolved v4.3 is still in review.",
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [souls] = useState(seedSouls);
  const [skills, setSkills] = useState(seedSkills);
  const [keyPoints, setKeyPoints] = useState(seedKeyPoints);
  const [chat, setChat] = useState(seedChat);
  const [audit, setAudit] = useState<AuditEntry[]>([
    { id: uid(), at: "09:40", soulId: souls[1].id, soulName: souls[1].name, text: "Session opened", level: "info" },
  ]);

  const [activeNav, setActiveNav] = useState<NavKey>("souls");
  const [activeSoulId, setActiveSoulId] = useState<string>(souls[1].id);
  const [featuredSkillId, setFeaturedSkillId] = useState<string>(skills[0].id);

  const activeSoul = souls.find((s) => s.id === activeSoulId) ?? souls[0];

  const pushAudit = useCallback(
    (text: string, level: AuditEntry["level"] = "info") => {
      setAudit((prev) => [
        { id: uid(), at: now(), soulId: activeSoulId, soulName: activeSoul.name, text, level },
        ...prev,
      ]);
    },
    [activeSoulId, activeSoul.name]
  );

  const selectSoul = useCallback(
    (id: string) => {
      setActiveSoulId(id);
      const s = souls.find((x) => x.id === id);
      if (s) {
        setAudit((prev) => [
          { id: uid(), at: now(), soulId: id, soulName: s.name, text: `Switched to ${s.name}`, level: "info" },
          ...prev,
        ]);
      }
    },
    [souls]
  );

  const featureSkill = useCallback(
    (id: string) => {
      setFeaturedSkillId(id);
      const s = skills.find((x) => x.id === id);
      if (s) pushAudit(`Selected skill "${s.title}"`);
    },
    [skills, pushAudit]
  );

  const toggleKeyPoint = useCallback((id: string) => {
    setKeyPoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
    );
  }, []);

  const runSkill = useCallback(() => {
    const featured = skills.find((s) => s.id === featuredSkillId);
    if (!featured) return;
    setSkills((prev) =>
      prev.map((s) =>
        s.id === featuredSkillId
          ? { ...s, progress: Math.min(100, s.progress + 12), uses: s.uses + 1 }
          : s
      )
    );
    setKeyPoints((prev) => {
      const next = [...prev];
      const idx = next.findIndex((p) => !p.done);
      if (idx >= 0) next[idx] = { ...next[idx], done: true };
      return next;
    });
    pushAudit(`Ran "${featured.title}"`, "success");
  }, [skills, featuredSkillId, pushAudit]);

  const sendForApproval = useCallback(() => {
    pushAudit("Sent run to human approval", "warn");
  }, [pushAudit]);

  const sendChat = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t) return;
      const mine = { id: uid(), author: "you" as const, text: t, time: now() };
      setChat((prev) => [...prev, mine]);
      pushAudit(`Asked companion: "${t.slice(0, 48)}${t.length > 48 ? "…" : ""}"`);
      setTimeout(() => {
        const reply = COMPANION_REPLIES[Math.floor(Math.random() * COMPANION_REPLIES.length)];
        setChat((prev) => [
          ...prev,
          {
            id: uid(),
            author: "companion",
            authorLabel: "Companion",
            text: reply,
            time: now(),
          },
        ]);
      }, 650);
    },
    [pushAudit]
  );

  const inviteCollaborator = useCallback(() => {
    pushAudit("Invited a collaborator to this session");
  }, [pushAudit]);

  const value = useMemo(
    () => ({
      souls, skills, keyPoints, chat, audit,
      activeNav, activeSoulId, featuredSkillId,
      setNav: setActiveNav,
      selectSoul, featureSkill, toggleKeyPoint,
      runSkill, sendForApproval, sendChat, inviteCollaborator,
    }),
    [souls, skills, keyPoints, chat, audit, activeNav, activeSoulId, featuredSkillId,
     selectSoul, featureSkill, toggleKeyPoint, runSkill, sendForApproval, sendChat, inviteCollaborator]
  );

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}
