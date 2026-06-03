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

// Customer-led quarter themes lifted from the Content Strategy slide.
// These anchor every brief so the calendar reads as one narrative arc
// for the customer buying group, not a product feature tour.
export const QUARTER_THEMES = {
  Q1: {
    label: "Q1",
    theme: "Build the Foundation",
    subtitle: "Apr · May · Jun",
    quarterMessage: "You cannot raise performance on fragmented foundations.",
    narrative:
      "Performance breaks down when safety, compliance, training, content, and IT improve separately. Before organisations can improve how they act, they need a connected foundation built on shared visibility, governance, and accountability.",
    messageTerritory: [
      "The market is still managing performance in silos",
      "Fragmented systems reduce control and slow progress",
      "Connected foundations are the first step to better performance",
    ],
    dtopRole:
      "Introduce Detect as the need to see what matters clearly. Set up Trigger, Orchestrate, Prove by showing why disconnected systems weaken the whole performance model.",
    forbiddenHere: [
      "Leading with DTOP, the Intelligence Layer, or 90/35 — those are Q2.",
      "Naming our product first. Always name the customer pain first.",
    ],
  },
  Q2: {
    label: "Q2",
    theme: "From Signals to Action",
    subtitle: "Jul · Aug · Sep",
    quarterMessage: "Performance improves when signals lead to action, not delay.",
    narrative:
      "Operational performance is shaped by what happens after something important is identified. The real challenge is not visibility — it is how quickly and consistently teams trigger response, coordinate action, and close the gap between issue and follow-through.",
    messageTerritory: [
      "Visibility alone does not improve performance",
      "Signals create value when ownership is clear",
      "Coordinated response reduces lag and strengthens control",
    ],
    dtopRole:
      "DTOP enters fully: Detect what matters → Trigger the right response → Orchestrate cross-functional action → begin to Prove through follow-through.",
    forbiddenHere: [
      "Treating DTOP as an acronym education exercise. Earn it through the signal-to-action pain.",
    ],
  },
  Q3: {
    label: "Q3",
    theme: "Make Readiness Continuous",
    subtitle: "Oct · Nov · Dec",
    quarterMessage: "Readiness is not an event. It is a condition of performance.",
    narrative:
      "Readiness should not be a periodic push or a completion exercise. It is an ongoing performance capability built when training, compliance, and operational change work together inside a connected model.",
    messageTerritory: [
      "Readiness goes beyond training completion",
      "Continuous readiness improves predictability and control",
      "Role-based alignment strengthens performance across teams",
    ],
    dtopRole:
      "Emphasise the back half of DTOP: stronger Orchestrate across functions, clearer Prove through role-based readiness and consistency over time.",
    forbiddenHere: [
      "Framing readiness as a training-team problem. It is cross-functional.",
    ],
  },
  Q4: {
    label: "Q4",
    theme: "Prove Performance at Scale",
    subtitle: "Jan · Feb · Mar",
    quarterMessage: "Performance only scales when progress can be proved.",
    narrative:
      "Performance improvement only scales when organisations can prove progress, readiness, and control across teams and regions. Leaders need more than activity reporting — they need evidence that supports confident decisions.",
    messageTerritory: [
      "Proof matters more than reporting volume",
      "Standardisation strengthens confidence at scale",
      "Visibility, readiness, and evidence support investment and expansion",
    ],
    dtopRole:
      "Completes the DTOP story by focusing on Prove as measurable, repeatable, and scalable. The operating model becomes evidence, confidence, and wider rollout potential.",
    forbiddenHere: [
      "Activity-volume framing (dashboards, report counts). Lead with evidence, ROI, expansion.",
    ],
  },
} as const;

export type QuarterTheme = (typeof QUARTER_THEMES)[keyof typeof QUARTER_THEMES];

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
    quarter_themes: QUARTER_THEMES,
    snapshot_at: new Date().toISOString(),
    version: "2.0.0",
  };
}