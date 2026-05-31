// Sample SILF data — no real customer / employee names.
// All entities are illustrative only.

export type SoulKind = "organization" | "customer" | "employee";

export type Soul = {
  id: string;
  kind: SoulKind;
  name: string;
  subtitle: string;
  initials: string;
  accent: string; // tailwind gradient stops
  graphNodes: number;
  graphEdges: number;
  skills: number;
  lastSync: string;
  trust: number; // 0..100
};

export type Skill = {
  id: string;
  title: string;
  domain: string;
  status: "stable" | "born" | "evolved" | "review";
  version: string;
  progress: number; // 0..100
  lastRun: string;
  uses: number;
};

export type ChatMessage = {
  id: string;
  author: "you" | "companion" | "agent";
  authorLabel?: string;
  text: string;
  time: string;
};

export type KeyPoint = {
  id: string;
  text: string;
  time: string;
  done: boolean;
};

export const souls: Soul[] = [
  {
    id: "org-northwind",
    kind: "organization",
    name: "Northwind Holdings",
    subtitle: "Organization Soul · Operational DNA",
    initials: "NH",
    accent: "from-emerald-200 via-lime-100 to-amber-100",
    graphNodes: 184_220,
    graphEdges: 921_004,
    skills: 312,
    lastSync: "2 min ago",
    trust: 96,
  },
  {
    id: "cus-orion",
    kind: "customer",
    name: "Orion Logistics",
    subtitle: "Customer Soul · 18 yr relationship",
    initials: "OL",
    accent: "from-amber-200 via-orange-100 to-rose-100",
    graphNodes: 24_801,
    graphEdges: 132_440,
    skills: 47,
    lastSync: "12 min ago",
    trust: 88,
  },
  {
    id: "cus-helia",
    kind: "customer",
    name: "Helia Energy",
    subtitle: "Customer Soul · ESG-heavy account",
    initials: "HE",
    accent: "from-sky-100 via-emerald-100 to-lime-100",
    graphNodes: 11_204,
    graphEdges: 58_900,
    skills: 29,
    lastSync: "1 h ago",
    trust: 82,
  },
  {
    id: "emp-mentor",
    kind: "employee",
    name: "Mentor Companion",
    subtitle: "Employee Soul · Digital Twin",
    initials: "MC",
    accent: "from-violet-200 via-fuchsia-100 to-rose-100",
    graphNodes: 6_402,
    graphEdges: 18_770,
    skills: 21,
    lastSync: "live",
    trust: 91,
  },
  {
    id: "emp-analyst",
    kind: "employee",
    name: "Compliance Analyst",
    subtitle: "Employee Soul · MiFID / ESG focus",
    initials: "CA",
    accent: "from-emerald-200 via-teal-100 to-sky-100",
    graphNodes: 4_018,
    graphEdges: 11_201,
    skills: 14,
    lastSync: "live",
    trust: 87,
  },
];

export const skills: Skill[] = [
  {
    id: "sk-compliance",
    title: "Generate Compliance Report",
    domain: "Regulatory · MiFID II",
    status: "stable",
    version: "v4.2",
    progress: 100,
    lastRun: "yesterday, 09:30",
    uses: 318,
  },
  {
    id: "sk-esg",
    title: "Draft ESG Narrative",
    domain: "Sustainability",
    status: "evolved",
    version: "v2.1 → v2.2",
    progress: 64,
    lastRun: "this morning",
    uses: 142,
  },
  {
    id: "sk-onboard",
    title: "Customer Onboarding Brief",
    domain: "Sales Enablement",
    status: "born",
    version: "v0.1",
    progress: 22,
    lastRun: "3 runs so far",
    uses: 3,
  },
  {
    id: "sk-incident",
    title: "Incident Post-mortem",
    domain: "Ops · SRE",
    status: "review",
    version: "v1.4",
    progress: 78,
    lastRun: "pending approval",
    uses: 56,
  },
  {
    id: "sk-quarterly",
    title: "Quarterly Account Review",
    domain: "Client Success",
    status: "stable",
    version: "v3.0",
    progress: 100,
    lastRun: "last week",
    uses: 204,
  },
];

export const keyPoints: KeyPoint[] = [
  {
    id: "k1",
    text: "Pull customer corpus & last 4 reports",
    time: "00:42",
    done: true,
  },
  { id: "k2", text: "Apply Orion know-how overlay", time: "01:15", done: true },
  {
    id: "k3",
    text: "Cross-check MiFID II clauses",
    time: "02:08",
    done: false,
  },
  {
    id: "k4",
    text: "Draft narrative in customer tone",
    time: "03:50",
    done: false,
  },
  { id: "k5", text: "Route to human approval", time: "—", done: false },
];

export const chat: ChatMessage[] = [
  {
    id: "m1",
    author: "companion",
    authorLabel: "Companion",
    text: "I've connected the Orion Customer Soul. Want me to reuse the v4.2 compliance skill or test the evolved v4.3 draft?",
    time: "09:41",
  },
  {
    id: "m2",
    author: "you",
    text: "Use v4.3 but mark the run for review.",
    time: "09:42",
  },
  {
    id: "m3",
    author: "agent",
    authorLabel: "Orion Soul",
    text: "Heads-up: last quarter we flagged 3 ESG exceptions. I'll surface them in the draft.",
    time: "09:42",
  },
];
