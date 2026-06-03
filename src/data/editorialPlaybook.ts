// Canonical messaging playbook for the Editorial Suite.
// This is the single source of truth for the 5-beat spine, DTOP, proof,
// differentiators, terminology rules and persona arcs. Briefs snapshot this
// at approval time so generated assets remain on-message.

export const SPINE_BEATS = [
  {
    id: "shift",
    label: "The Shift",
    purpose: "Name the change in operational performance. From reactive to predictive.",
  },
  {
    id: "platform",
    label: "The Platform",
    purpose: "Comply365, SafetyManager365, ContentManager365 as one operational platform.",
  },
  {
    id: "loop",
    label: "The Loop (DTOP)",
    purpose: "Detect → Trigger → Orchestrate → Prove. The operating model.",
  },
  {
    id: "proof",
    label: "The Proof",
    purpose: "~90% domain accuracy at L4–L5 vs ~35% generic AI. Customer outcomes.",
  },
  {
    id: "differentiators",
    label: "The Differentiators",
    purpose: "Domain intelligence · Operational data · Closed-loop control.",
  },
] as const;

export const DIFFERENTIATORS = [
  "Domain intelligence built for regulated operations (~90% accuracy at L4–5 vs ~35% generic).",
  "Operational data fabric — every action, signal, regulation in one place.",
  "Closed-loop control — DTOP turns signals into proven outcomes, not dashboards.",
];

export const PROOF_POINTS = [
  "~90% domain accuracy at L4–L5 vs ~35% generic AI.",
  "DTOP: Detect → Trigger → Orchestrate → Prove operating model.",
  "$25–35B industry exposure to operational underperformance (Eurocontrol, IATA, SITA).",
  "Single platform: Comply365 + SafetyManager365 + ContentManager365.",
  "Defensible customer footprint across aviation, defense, rail.",
];

export const PERSONAS = {
  exec: {
    label: "Executive (CIO / COO / CSO)",
    tone: "Boardroom-ready. Quantified. Outcomes-first. No jargon.",
    arc: "Cost of inaction → Operating model shift → Proof → Decision.",
  },
  ops: {
    label: "Operational leader (Director of Ops / Safety / Quality)",
    tone: "Practical. Day-in-the-life. Friction → relief.",
    arc: "The inbox today → The loop tomorrow → Evidence → Pilot.",
  },
  tech: {
    label: "Technical buyer (CTO / Head of Platform / Architect)",
    tone: "Architecture-first. Honest about trade-offs. Integration-led.",
    arc: "Data fabric → Intelligence layer → Control loop → Security/scale.",
  },
} as const;

export const TERMINOLOGY = {
  approved: [
    "Generative AI",
    "Recommended Actions",
    "Operational Data",
    "DTOP operating model",
    "Intelligence Layer",
  ],
  forbidden: [
    "FOQA", "FDM", "ASAP",
    "CoAnalyst (in customer-facing copy)",
    "CoAuthor / CoTrainer (in customer-facing copy)",
    "Spaces in product names (Comply 365, Safety Manager 365)",
  ],
};

export const ASSET_TYPES = [
  { id: "long_form", label: "Long-form (blog, white paper, eBook)", target: "1,200–2,500 words, markdown" },
  { id: "social", label: "Social (LinkedIn post, thread, carousel)", target: "≤1,300 chars, scroll-stopping hook" },
  { id: "enablement", label: "Sales enablement (one-pager, battle card, email)", target: "Structured sections, scannable" },
  { id: "script", label: "Video / webinar / deck script", target: "Scene-by-scene with timing" },
] as const;

export const CHANNELS = [
  "blog", "linkedin", "x", "newsletter", "webinar", "podcast",
  "one-pager", "email-sequence", "battle-card", "deck", "video", "ebook",
];

export const QUARTERS = ["Q1", "Q2", "Q3", "Q4"] as const;

export const STATUSES = [
  { id: "idea", label: "Idea", color: "bg-slate-500" },
  { id: "brief", label: "Brief", color: "bg-blue-500" },
  { id: "draft", label: "Draft", color: "bg-amber-500" },
  { id: "review", label: "Review", color: "bg-violet-500" },
  { id: "final", label: "Final", color: "bg-emerald-500" },
] as const;

export type Persona = keyof typeof PERSONAS;
export type AssetTypeId = (typeof ASSET_TYPES)[number]["id"];
export type StatusId = (typeof STATUSES)[number]["id"];
export type QuarterId = (typeof QUARTERS)[number];

export function buildPlaybookSnapshot() {
  return {
    spine: SPINE_BEATS,
    differentiators: DIFFERENTIATORS,
    proof_points: PROOF_POINTS,
    personas: PERSONAS,
    terminology: TERMINOLOGY,
    snapshot_at: new Date().toISOString(),
    version: "1.1.0",
  };
}