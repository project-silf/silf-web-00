// Lightweight in-memory store using React state + context.
// Centralizes mutations so every panel can drive every other panel.

import { createContext, useContext } from "react";
import type {
  ChatMessage,
  KeyPoint,
  Skill,
  Soul,
} from "../data/silf";

export type NavKey = "souls" | "graph" | "skills" | "corpus" | "chat" | "history";

export type AuditEntry = {
  id: string;
  at: string;       // HH:MM
  soulId: string;
  soulName: string;
  text: string;
  level: "info" | "success" | "warn";
};

export type State = {
  souls: Soul[];
  skills: Skill[];
  keyPoints: KeyPoint[];
  chat: ChatMessage[];
  audit: AuditEntry[];

  activeNav: NavKey;
  activeSoulId: string;
  featuredSkillId: string;
};

export type Actions = {
  setNav: (k: NavKey) => void;
  selectSoul: (id: string) => void;
  featureSkill: (id: string) => void;
  toggleKeyPoint: (id: string) => void;
  runSkill: () => void;
  sendForApproval: () => void;
  sendChat: (text: string) => void;
  inviteCollaborator: () => void;
};

export const StoreCtx = createContext<(State & Actions) | null>(null);

export function useStore() {
  const v = useContext(StoreCtx);
  if (!v) throw new Error("StoreCtx not mounted");
  return v;
}

export const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const uid = () => Math.random().toString(36).slice(2, 9);
