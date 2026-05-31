// Sample graph dataset — fictional, illustrative only.

export type NodeType = "organization" | "customer" | "employee" | "agent" | "skill" | "corpus";

export type GraphNode = {
  id: string;
  type: NodeType;
  label: string;
  sub?: string;
  level: number;       // 1..5
  trust: number;       // 0..100
  x: number;           // 0..100 (graph viewBox coords)
  y: number;           // 0..100
  size?: number;       // node radius multiplier
};

export type GraphEdge = {
  from: string;
  to: string;
  kind: "feeds" | "uses" | "trained-on" | "owned-by" | "evolved-from" | "talks-to";
};

export type EvolutionStep = {
  version: string;
  date: string;
  summary: string;
  diff: { added: string[]; removed: string[]; changed: string[] };
};

export type TelemetryPoint = { t: string; v: number };

export type LogLine = {
  id: string;
  at: string;
  level: "info" | "warn" | "error" | "success";
  text: string;
};

export type Kudo = {
  id: string;
  from: string;
  to: string;
  reason: string;
  points: number;
  at: string;
};

export type NodeDossier = {
  description: string;
  evolution: EvolutionStep[];
  telemetry: { runs: TelemetryPoint[]; latencyMs: TelemetryPoint[]; quality: TelemetryPoint[] };
  logs: LogLine[];
  kudos: Kudo[];
};

// --- Nodes ---------------------------------------------------------------

export const nodes: GraphNode[] = [
  // Organization (center)
  { id: "org-northwind", type: "organization", label: "Northwind Holdings", sub: "Org Soul", level: 5, trust: 96, x: 50, y: 50, size: 2.2 },

  // Customer souls
  { id: "cus-orion",  type: "customer", label: "Orion Logistics", sub: "18 yr", level: 4, trust: 88, x: 22, y: 26 },
  { id: "cus-helia",  type: "customer", label: "Helia Energy",    sub: "ESG-heavy", level: 3, trust: 82, x: 78, y: 22 },
  { id: "cus-arden",  type: "customer", label: "Arden Pharma",    sub: "Regulated", level: 4, trust: 90, x: 84, y: 60 },

  // Employee souls
  { id: "emp-mentor", type: "employee", label: "Mentor Companion",     sub: "Digital twin",    level: 3, trust: 91, x: 20, y: 72 },
  { id: "emp-analyst",type: "employee", label: "Compliance Analyst",   sub: "MiFID / ESG",     level: 4, trust: 87, x: 42, y: 82 },
  { id: "emp-pm",     type: "employee", label: "Product Steward",      sub: "Roadmap context", level: 2, trust: 78, x: 64, y: 80 },

  // Agents
  { id: "agt-router",   type: "agent", label: "Skill Router",         sub: "Routes intent → skill", level: 4, trust: 92, x: 50, y: 32 },
  { id: "agt-verifier", type: "agent", label: "Source Verifier",      sub: "Cites & audits",        level: 5, trust: 97, x: 36, y: 50 },
  { id: "agt-guard",    type: "agent", label: "Governance Guard",     sub: "Permissions & PII",     level: 5, trust: 99, x: 64, y: 50 },

  // Skills
  { id: "sk-compliance", type: "skill", label: "Compliance Report",      sub: "v4.2 stable",  level: 5, trust: 95, x: 14, y: 46 },
  { id: "sk-esg",        type: "skill", label: "ESG Narrative",          sub: "v2.2 evolved", level: 4, trust: 86, x: 88, y: 38 },
  { id: "sk-onboard",    type: "skill", label: "Onboarding Brief",       sub: "v0.1 born",    level: 1, trust: 60, x: 8,  y: 62 },
  { id: "sk-incident",   type: "skill", label: "Incident Post-mortem",   sub: "v1.4 review",  level: 3, trust: 74, x: 92, y: 68 },

  // Corpus sources
  { id: "cps-confluence", type: "corpus", label: "Confluence",     sub: "12.4k pages",   level: 4, trust: 90, x: 30, y: 8  },
  { id: "cps-sharepoint", type: "corpus", label: "SharePoint",     sub: "48.9k docs",    level: 4, trust: 88, x: 50, y: 6  },
  { id: "cps-teams",      type: "corpus", label: "Teams",          sub: "1.2M messages", level: 3, trust: 80, x: 70, y: 8  },
  { id: "cps-outlook",    type: "corpus", label: "Outlook",        sub: "184k emails",   level: 3, trust: 82, x: 90, y: 12 },
  { id: "cps-mifid",      type: "corpus", label: "MiFID II Corpus",sub: "Regulation",    level: 5, trust: 98, x: 6,  y: 30 },
  { id: "cps-esg",        type: "corpus", label: "ESG Framework",  sub: "Regulation",    level: 5, trust: 96, x: 96, y: 26 },
];

// --- Edges ---------------------------------------------------------------

export const edges: GraphEdge[] = [
  // org → customers / employees
  { from: "org-northwind", to: "cus-orion",   kind: "owned-by" },
  { from: "org-northwind", to: "cus-helia",   kind: "owned-by" },
  { from: "org-northwind", to: "cus-arden",   kind: "owned-by" },
  { from: "org-northwind", to: "emp-mentor",  kind: "owned-by" },
  { from: "org-northwind", to: "emp-analyst", kind: "owned-by" },
  { from: "org-northwind", to: "emp-pm",      kind: "owned-by" },

  // org → agents
  { from: "org-northwind", to: "agt-router",   kind: "uses" },
  { from: "org-northwind", to: "agt-verifier", kind: "uses" },
  { from: "org-northwind", to: "agt-guard",    kind: "uses" },

  // agents ↔ skills
  { from: "agt-router", to: "sk-compliance", kind: "uses" },
  { from: "agt-router", to: "sk-esg",        kind: "uses" },
  { from: "agt-router", to: "sk-onboard",    kind: "uses" },
  { from: "agt-router", to: "sk-incident",   kind: "uses" },

  // corpus feeds → org / skills
  { from: "cps-confluence", to: "org-northwind", kind: "feeds" },
  { from: "cps-sharepoint", to: "org-northwind", kind: "feeds" },
  { from: "cps-teams",      to: "org-northwind", kind: "feeds" },
  { from: "cps-outlook",    to: "org-northwind", kind: "feeds" },
  { from: "cps-mifid",      to: "sk-compliance", kind: "trained-on" },
  { from: "cps-esg",        to: "sk-esg",        kind: "trained-on" },

  // skills ↔ customers (contextual binding)
  { from: "sk-compliance", to: "cus-orion", kind: "uses" },
  { from: "sk-compliance", to: "cus-arden", kind: "uses" },
  { from: "sk-esg",        to: "cus-helia", kind: "uses" },
  { from: "sk-incident",   to: "cus-arden", kind: "uses" },

  // employees → agents (digital twin talks)
  { from: "emp-analyst", to: "agt-router",   kind: "talks-to" },
  { from: "emp-mentor",  to: "agt-verifier", kind: "talks-to" },
  { from: "emp-pm",      to: "agt-router",   kind: "talks-to" },

  // governance over everything sensitive
  { from: "agt-guard", to: "sk-compliance", kind: "uses" },
  { from: "agt-guard", to: "sk-esg",        kind: "uses" },
  { from: "agt-guard", to: "sk-incident",   kind: "uses" },
];

// --- Dossiers (per-node detail) ------------------------------------------

const series = (start: number, deltas: number[]): TelemetryPoint[] =>
  deltas.reduce<TelemetryPoint[]>((acc, d, i) => {
    const prev = acc[i - 1]?.v ?? start;
    acc.push({ t: `d-${deltas.length - i}`, v: Math.max(0, prev + d) });
    return acc;
  }, []);

export const dossiers: Record<string, NodeDossier> = {
  "sk-compliance": {
    description:
      "Generates a regulatory compliance report against the bound Customer Soul. Honors policy overlays from Governance Guard.",
    evolution: [
      {
        version: "v4.2", date: "May 2026",
        summary: "Tightened citation routing; added MiFID II §17 exception handling.",
        diff: {
          added:   ["MiFID §17 exception handler", "Cite-by-paragraph mode"],
          removed: ["Legacy footnote renderer"],
          changed: ["Tone overlay weight 0.6 → 0.8"],
        },
      },
      {
        version: "v4.1", date: "Mar 2026",
        summary: "Customer Soul awareness for tone & terminology.",
        diff: {
          added:   ["Customer Soul binding"],
          removed: [],
          changed: ["Section ordering driven by Soul preferences"],
        },
      },
      {
        version: "v4.0", date: "Jan 2026",
        summary: "Rewrote pipeline around the knowledge graph.",
        diff: {
          added:   ["Graph traversal for evidence"],
          removed: ["Flat keyword retrieval"],
          changed: ["Skill scaffolding extracted to shared module"],
        },
      },
    ],
    telemetry: {
      runs:      series(8,   [2, -1, 3, 5, 4, 6, 8, 7, 9, 12]),
      latencyMs: series(820, [-20, 10, -40, -30, 25, -50, -10, -20, -40, -30]),
      quality:   series(72,  [2, 1, 3, 2, 1, 4, 2, 3, 1, 2]),
    },
    logs: [
      { id: "l1", at: "09:42", level: "success", text: "Run #318 completed in 712 ms" },
      { id: "l2", at: "09:38", level: "info",    text: "Bound to Orion Customer Soul" },
      { id: "l3", at: "09:30", level: "warn",    text: "Source Verifier flagged 1 stale citation" },
      { id: "l4", at: "09:12", level: "success", text: "Policy overlay applied (Governance Guard)" },
    ],
    kudos: [
      { id: "k1", from: "Compliance Analyst", to: "Compliance Report skill", reason: "Caught a MiFID §17 edge case", points: 25, at: "yesterday" },
      { id: "k2", from: "Mentor Companion",   to: "Compliance Report skill", reason: "Reused for 3 customers this week", points: 15, at: "2d" },
    ],
  },
  "sk-esg": {
    description: "Drafts an ESG narrative grounded in the customer corpus and regulatory framework.",
    evolution: [
      { version: "v2.2", date: "May 2026", summary: "Evolved: scope-3 emissions handling.", diff: { added: ["Scope-3 estimator"], removed: [], changed: ["Section weighting"] } },
      { version: "v2.1", date: "Apr 2026", summary: "Tone alignment per Customer Soul.",     diff: { added: [], removed: [], changed: ["Tone overlay"] } },
    ],
    telemetry: {
      runs:      series(3, [1, 2, 1, 3, 2, 4, 3, 2, 5, 4]),
      latencyMs: series(940, [10, -20, -5, -30, 15, -10, -20, 5, -15, -20]),
      quality:   series(64, [1, 2, 1, 2, 1, 3, 1, 2, 2, 1]),
    },
    logs: [
      { id: "e1", at: "08:54", level: "success", text: "Run #142 completed" },
      { id: "e2", at: "08:50", level: "info",    text: "Trained-on edge refreshed: ESG Framework v2026.2" },
    ],
    kudos: [
      { id: "ek1", from: "Helia Energy Soul", to: "ESG Narrative skill", reason: "Best fit for scope-3 disclosure", points: 20, at: "1w" },
    ],
  },
  "agt-verifier": {
    description: "Cross-checks every claim against cited sources. Refuses to ship a draft without a source map.",
    evolution: [
      { version: "v3.0", date: "May 2026", summary: "Added per-claim confidence intervals.", diff: { added: ["Confidence intervals"], removed: [], changed: ["Source map format"] } },
    ],
    telemetry: {
      runs:      series(40, [5, 8, 6, 10, 7, 9, 12, 11, 14, 13]),
      latencyMs: series(110, [-5, 2, -3, -8, 4, -2, -6, 1, -4, -5]),
      quality:   series(91, [1, 0, 1, 1, 2, 0, 1, 1, 0, 1]),
    },
    logs: [
      { id: "v1", at: "09:43", level: "warn",    text: "Stale citation rejected on Run #318" },
      { id: "v2", at: "09:20", level: "success", text: "Audited 142 claims, 0 unsourced" },
    ],
    kudos: [
      { id: "vk1", from: "Governance Guard", to: "Source Verifier", reason: "Zero unsourced claims this week", points: 30, at: "today" },
    ],
  },
  "cus-orion": {
    description: "Customer Soul for Orion Logistics. 18-year relationship, freight-heavy operations.",
    evolution: [
      { version: "soul.5", date: "May 2026", summary: "Absorbed 2026 contracts addendum.", diff: { added: ["2026 addendum"], removed: [], changed: ["Service-level vocabulary"] } },
    ],
    telemetry: {
      runs:      series(12, [2, 1, 3, 1, 2, 4, 3, 5, 4, 6]),
      latencyMs: series(0,  [0,0,0,0,0,0,0,0,0,0]),
      quality:   series(84, [0, 1, 1, 0, 2, 1, 0, 1, 1, 1]),
    },
    logs: [
      { id: "o1", at: "09:38", level: "info",    text: "Bound to Compliance Report skill" },
      { id: "o2", at: "08:00", level: "success", text: "Corpus sync: +14 new contract pages" },
    ],
    kudos: [
      { id: "ok1", from: "Compliance Analyst", to: "Orion Soul", reason: "Pre-empted a 3-year-old exception", points: 10, at: "today" },
    ],
  },
  "org-northwind": {
    description: "Northwind Holdings — the Organization Soul. Operational DNA: policies, tone, processes, compliance posture.",
    evolution: [
      { version: "soul.12", date: "May 2026", summary: "Adopted 2026 ESG policy.",       diff: { added: ["ESG 2026 policy"], removed: [], changed: ["Tone guide"] } },
      { version: "soul.11", date: "Apr 2026", summary: "Org-wide MiFID II refresh.",     diff: { added: [], removed: [], changed: ["Compliance scaffolding"] } },
    ],
    telemetry: {
      runs:      series(120, [10, 12, 14, 11, 16, 18, 15, 20, 22, 24]),
      latencyMs: series(0,   [0,0,0,0,0,0,0,0,0,0]),
      quality:   series(88,  [1, 0, 1, 1, 2, 0, 1, 1, 1, 0]),
    },
    logs: [
      { id: "n1", at: "09:40", level: "success", text: "Session opened for org" },
      { id: "n2", at: "09:00", level: "info",    text: "Daily graph refresh complete (+412 nodes)" },
    ],
    kudos: [
      { id: "nk1", from: "Mentor Companion", to: "Northwind Org Soul", reason: "Onboarded 4 new employees this week", points: 40, at: "today" },
    ],
  },
};

// Fallback dossier so any node click renders something useful.
export function dossierFor(id: string): NodeDossier {
  return (
    dossiers[id] ?? {
      description: "Sample SILF entity. Connect more sources to enrich its dossier.",
      evolution: [
        { version: "v0.1", date: "Today", summary: "Seeded from sample data.", diff: { added: ["Initial scaffold"], removed: [], changed: [] } },
      ],
      telemetry: {
        runs:      series(1, [0, 1, 0, 1, 0, 1, 2, 1, 2, 1]),
        latencyMs: series(500, [10, -5, 0, -10, 5, -5, 0, -10, 0, -5]),
        quality:   series(70,  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1]),
      },
      logs: [
        { id: "g1", at: "09:00", level: "info", text: "Node added to the graph" },
      ],
      kudos: [],
    }
  );
}

export const nodeTypeMeta: Record<NodeType, { color: string; bg: string; ring: string; label: string }> = {
  organization: { color: "#0f172a", bg: "#fef3c7", ring: "#fcd34d", label: "Organization Soul" },
  customer:     { color: "#9a3412", bg: "#ffedd5", ring: "#fdba74", label: "Customer Soul" },
  employee:     { color: "#3730a3", bg: "#e0e7ff", ring: "#a5b4fc", label: "Employee Soul" },
  agent:        { color: "#065f46", bg: "#d1fae5", ring: "#6ee7b7", label: "Agent" },
  skill:        { color: "#7c2d12", bg: "#fee2e2", ring: "#fca5a5", label: "Skill" },
  corpus:       { color: "#1e3a8a", bg: "#dbeafe", ring: "#93c5fd", label: "Corpus" },
};
