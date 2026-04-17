// Platform-wide Insights & Recommendations — Sales Enablement Playbook Data

export interface PainPoint {
  label: string;
  detail: string;
}

export interface HowItWorksStep {
  number: number;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  color: string;
  bg: string;
  border: string;
}

export interface InsightsUseCase {
  title: string;
  scenario: string;
  question: string;
  icon: string;
  steps: {
    ask: string;
    correlate: string;
    insight: string;
    recommend: string;
  };
  outcome: string;
  metric: string;
}

export interface ValuePillar {
  title: string;
  description: string;
  bullets: string[];
  shift: string;
  icon: string;
  color: string;
}

export interface InsightsPersona {
  role: string;
  careAbout: string;
  openWith: string;
  keyMessage: string;
  sampleQuestion: string;
  color: string;
}

export interface InsightsObjection {
  objection: string;
  response: string;
  reframe: string;
}

export interface CompetitiveContrast {
  approach: string;
  isUs: boolean;
  insight: string;
  speed: string;
  scope: string;
  intelligence: string;
}

// Hero
export const heroEyebrow = "POC — Foundation for the Comply365 Intelligence Layer";
export const heroTitle = "Platform-wide Insights & Recommendations";
export const heroTagline = "From data to intelligence — just by asking.";
export const heroSubtitle =
  "Turn fragmented operational data into real-time intelligence by asking questions in plain English.";
export const statusLabel = "Work in progress · Targeted completion Q2 2026";

// Slide 1 — Why it exists
export const whyItExists = {
  headline: "Operational data is everywhere. Intelligence is nowhere.",
  exposureLabel:
    "Airlines hold the data they need to prevent the next incident — but it lives in disconnected systems that can't reason together.",
  problems: [
    {
      label: "Fragmented Data",
      detail: "Safety, training, content and compliance data sit in separate systems with no shared context.",
    },
    {
      label: "Manual Reporting",
      detail: "Insight depends on BI specialists, static dashboards and weeks of waiting for the right report.",
    },
    {
      label: "Siloed Insight",
      detail: "No one can ask a single question that spans incidents, training records and procedures.",
    },
    {
      label: "Reactive Compliance",
      detail: "Gaps surface during audits — not before. Findings drive change instead of foresight.",
    },
    {
      label: "Cross-domain Blind Spots",
      detail: "Patterns linking training gaps to safety events stay hidden because no system reasons across domains.",
    },
    {
      label: "Slow Investigations",
      detail: "Connecting an incident to procedures, training and external context takes days, not minutes.",
    },
  ] as PainPoint[],
};

// Slide 2 — What it is
export const elevatorPitch = {
  oneLiner:
    "A platform-wide intelligence capability that lets any user ask operational questions in plain English and instantly receive insights, correlations and recommended actions across Safety, Training, Content and Compliance.",
  shifts: [
    { from: "Reports", to: "Real-time insights" },
    { from: "Siloed data", to: "Connected intelligence" },
    { from: "Hindsight", to: "Foresight" },
    { from: "Manual analysis", to: "AI-driven recommendations" },
    { from: "Complexity", to: "Just ask a question" },
  ],
  exampleQuestion: "Are dangerous goods incidents linked to training gaps?",
  exampleAnswer:
    "Instant cross-domain insight: 3 stations show DG handling spikes — all three correlate with overdue DG recurrent training. Recommended actions generated.",
};

// Slide 3 — How it works
export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: 1,
    title: "Unified Data Lake",
    tagline: "Bring operational data together",
    description:
      "A central store that combines Safety, Training, Content, Compliance and external regulatory sources into one queryable view.",
    details: [
      "Internal product data models",
      "Sample procedures (PII-stripped)",
      "Regulatory sources (ICAO, IATA DG)",
      "External operational context",
    ],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  {
    number: 2,
    title: "Natural Language Question",
    tagline: "Ask, don't build a report",
    description:
      "A simple interface lets any user — typically a COO, Head of Safety or Compliance Lead — ask operational questions in plain English.",
    details: [
      "No BI tools required",
      "No data specialists needed",
      "Optimised for operational personas",
      "Works on the data they already trust",
    ],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    number: 3,
    title: "AI Insight Engine",
    tagline: "Reason across every domain",
    description:
      "Generative AI analyses the connected dataset, surfaces patterns no single dashboard would catch and explains the reasoning.",
    details: [
      "Cross-domain correlation",
      "Pattern detection",
      "Traceable reasoning",
      "Continuous, exploratory analysis",
    ],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    number: 4,
    title: "Insights + Recommended Actions",
    tagline: "Insight that closes the loop",
    description:
      "Every answer comes with cross-domain correlations and Recommended Actions — training interventions, procedure updates or compliance reviews.",
    details: [
      "Targeted training interventions",
      "Procedure update suggestions",
      "Compliance review triggers",
      "Audit-ready reasoning trail",
    ],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
];

// Slides 4-6 — Use cases
export const useCases: InsightsUseCase[] = [
  {
    title: "Dangerous Goods Risk Query",
    scenario: "A COO suspects DG handling issues are growing but doesn't know why.",
    question: "Are dangerous goods incidents linked to training gaps?",
    icon: "AlertTriangle",
    steps: {
      ask: "COO types the question into the natural language interface — no report build, no BI request, no waiting.",
      correlate:
        "The engine joins safety events, DG training completion, station rosters and procedure versions across the unified dataset.",
      insight:
        "3 hub stations show a DG handling spike — all three also have the highest rate of overdue DG recurrent training and an outdated DG SOP version.",
      recommend:
        "Recommended Actions: targeted DG retraining for 180 ground crew at affected stations, expedite SOP republish, audit prep package generated.",
    },
    outcome: "From hunch to evidence-backed action plan in under a minute",
    metric: "<60 seconds",
  },
  {
    title: "Audit Readiness Gap Detection",
    scenario:
      "Compliance team needs to know whether the operation is exposed against IATA DG before the next regulator visit.",
    question: "Where am I non-compliant against IATA DG today?",
    icon: "FileCheck",
    steps: {
      ask: "Compliance Lead asks the question against the live unified dataset — not a static quarterly report.",
      correlate:
        "Operational procedures, training records and recent safety events are mapped against the current IATA DG and ICAO frameworks.",
      insight:
        "12 procedural gaps and 4 training shortfalls are surfaced — each linked back to the specific clause they fail and the population affected.",
      recommend:
        "Recommended Actions: prioritised remediation list with traceable reasoning that can be handed straight to auditors.",
    },
    outcome: "Gaps surface before findings, not after",
    metric: "12 gaps caught pre-audit",
  },
  {
    title: "Faster Investigations",
    scenario: "An incident has just occurred and the safety team needs full context — fast.",
    question: "Show me everything related to this incident across the platform.",
    icon: "Search",
    steps: {
      ask: "Safety Investigator pastes the event reference and asks for the full operational picture.",
      correlate:
        "The engine pulls relevant procedures, training records for the crew involved, prior similar events and external context (weather, NOTAMs).",
      insight:
        "A single narrative is generated linking the event to a known procedure ambiguity and a training module that under-emphasises the scenario.",
      recommend:
        "Recommended Actions: procedure clarification, targeted retraining cohort and a reasoning trail ready for the investigation report.",
    },
    outcome: "Days of investigation work compressed into minutes of reasoning",
    metric: "Days → minutes",
  },
];

// Slide 7 — Value pillars (external + internal)
export const valuePillars: ValuePillar[] = [
  {
    title: "Data → Intelligence, Instantly",
    description:
      "Convert platform-wide operational data into immediate, queryable intelligence — without BI tools or data specialists.",
    bullets: [
      "Plain-English questions across every domain",
      "Insights returned in seconds, not weeks",
      "No report-building bottleneck",
    ],
    shift: "Reports → Real-time insights",
    icon: "Sparkles",
    color: "text-blue-400",
  },
  {
    title: "Break Operational Silos",
    description:
      "Reason across Safety, Training, Content, Compliance and external regulatory inputs in a single answer.",
    bullets: [
      "Cross-functional visibility by default",
      "One question spans every data domain",
      "Native to a connected platform",
    ],
    shift: "Siloed data → Connected intelligence",
    icon: "Network",
    color: "text-amber-400",
  },
  {
    title: "Proactive Risk Identification",
    description:
      "Detect emerging cross-domain patterns — like training gaps driving safety events — before they escalate.",
    bullets: [
      "Cross-domain pattern detection",
      "Surface risks before they're incidents",
      "Data-driven decision support",
    ],
    shift: "Hindsight → Foresight",
    icon: "ShieldAlert",
    color: "text-emerald-400",
  },
  {
    title: "Compliance & Audit Readiness",
    description:
      "Continuously align operational data with regulatory frameworks like IATA DG and ICAO — and explain the reasoning.",
    bullets: [
      "Gap detection before findings",
      "Traceable reasoning behind every recommendation",
      "Always-on regulator confidence",
    ],
    shift: "Reactive compliance → Continuous compliance",
    icon: "ClipboardCheck",
    color: "text-violet-400",
  },
  {
    title: "Targeted Operational Action",
    description:
      "Every insight is paired with Recommended Actions — training, procedure or compliance — focused where impact is greatest.",
    bullets: [
      "Targeted training interventions",
      "Procedure update suggestions",
      "Less wasted effort, more measurable outcome",
    ],
    shift: "Manual analysis → AI-driven recommendations",
    icon: "Target",
    color: "text-rose-400",
  },
];

export const internalValue = {
  headline: "Why this matters for Comply365",
  points: [
    {
      title: "Brings the platform vision to life",
      detail: "A tangible demonstration of connected data, cross-product intelligence and AI-driven insights.",
    },
    {
      title: "System of record → System of intelligence",
      detail: "A differentiated market narrative that elevates value beyond workflow and compliance tooling.",
    },
    {
      title: "Foundation for future AI products",
      detail: "Predictive risk detection, automated compliance monitoring and the next evolution of CoAnalyst.",
    },
  ],
};

// Slide 8 — Personas
export const personas: InsightsPersona[] = [
  {
    role: "COO",
    careAbout: "Operational risk posture, cost of fragmentation and executive visibility",
    openWith:
      "You already own the data that would tell you where your next incident is coming from — it just doesn't talk to itself yet.",
    keyMessage:
      "Ask one question and get an evidence-backed answer that spans Safety, Training and Compliance — without a single report request.",
    sampleQuestion: "Where is operational risk increasing fastest across the network?",
    color: "border-blue-500/30",
  },
  {
    role: "Head of Safety",
    careAbout: "Cross-domain pattern detection and turning signals into action",
    openWith:
      "Your SMS captures the events. But which of them are actually linked to a training gap or an outdated procedure?",
    keyMessage:
      "Insights & Recommendations finds the cross-domain patterns your SMS alone can't see — and pairs them with targeted Recommended Actions.",
    sampleQuestion: "Which safety events correlate with overdue or weak training?",
    color: "border-emerald-500/30",
  },
  {
    role: "Compliance Lead",
    careAbout: "Audit readiness, regulatory alignment and explainable reasoning",
    openWith:
      "By the time a finding lands, the gap has already existed for months. The data to spot it earlier is already in your platform.",
    keyMessage:
      "Continuously map operational reality against IATA DG, ICAO and your own frameworks — with a traceable reasoning trail for every gap surfaced.",
    sampleQuestion: "Where am I non-compliant against IATA DG right now?",
    color: "border-violet-500/30",
  },
  {
    role: "CIO / IT Director",
    careAbout: "Data architecture, AI risk and avoiding more point tools",
    openWith:
      "You don't need another BI stack. You need the data you already trust to answer questions in plain English.",
    keyMessage:
      "A unified operational data layer with Generative AI on top — built into the platform you already run, not bolted on as a new system.",
    sampleQuestion: "How do we deliver AI insights without standing up another data platform?",
    color: "border-amber-500/30",
  },
];

// Slide 9 — Why only Comply365
export const competitiveContrast: CompetitiveContrast[] = [
  {
    approach: "Static BI dashboards",
    isUs: false,
    insight: "Predefined views only",
    speed: "Weeks to change",
    scope: "Single domain",
    intelligence: "None",
  },
  {
    approach: "Generic AI chat tools",
    isUs: false,
    insight: "No operational context",
    speed: "Instant but blind",
    scope: "No platform data",
    intelligence: "Generic",
  },
  {
    approach: "Point safety / LMS analytics",
    isUs: false,
    insight: "Domain-specific only",
    speed: "Reactive reports",
    scope: "One product",
    intelligence: "Limited",
  },
  {
    approach: "Comply365 Insights & Recommendations",
    isUs: true,
    insight: "Cross-domain reasoning",
    speed: "Real-time, ask-anything",
    scope: "Whole platform + external",
    intelligence: "Generative AI on connected data",
  },
];

export const moatStatements = [
  "Only Comply365 owns a connected foundation across Safety, Content, Training and Compliance — the prerequisite for cross-domain reasoning.",
  "Insights are explainable: every recommendation can be traced back to the data that produced it.",
  "Built into the platform you already run — not a separate BI stack to integrate, govern and secure.",
  "A foundational step toward the Comply365 Intelligence Layer — predictive risk, automated compliance, AI copilots.",
];

export const competitiveExplanation =
  "Static dashboards and generic AI assistants can't reason across operational domains because they don't sit on a connected operational data model. Insights & Recommendations does — that's the moat.";

// Slide 10 — Objections
export const objections: InsightsObjection[] = [
  {
    objection: "We already have BI dashboards.",
    response:
      "Dashboards answer the questions you knew to ask in advance. Insights & Recommendations answers the ones you didn't — across domains, in plain English, in seconds.",
    reframe: "Dashboards are static. Intelligence is exploratory.",
  },
  {
    objection: "We're nervous about AI making operational decisions.",
    response:
      "It doesn't. It surfaces insights and Recommended Actions with traceable reasoning — humans stay in the loop. Every recommendation can be explained back to the data that produced it.",
    reframe: "Generative AI proposes. People decide. The reasoning is always auditable.",
  },
  {
    objection: "Our data isn't clean enough for this.",
    response:
      "The POC is built around the operational data already in the Comply365 platform — the data you already trust for safety, training and compliance. We start where the data is good.",
    reframe: "Start with the data that already runs your operation. Expand from there.",
  },
  {
    objection: "How is this different from CoAnalyst?",
    response:
      "CoAnalyst is the persona-facing intelligence layer for Safety, Content and Training. Insights & Recommendations proves the platform-wide reasoning capability that powers it — the foundation of the Comply365 Intelligence Layer.",
    reframe: "Same intelligence vision. Insights & Recommendations is the platform-wide engine underneath.",
  },
  {
    objection: "Is this real today?",
    response:
      "It's a working POC with a live demonstration environment, targeted for completion in Q2 2026. We're sharing the direction now so customers can shape it — and so it lands as a capability they helped design.",
    reframe: "Forward-looking, demonstrable today, shaped by the customers it serves.",
  },
];

// Slide 11 — Closing
export const positioningLine = "From reports → real-time insights.";

export const elevatorClosePitch =
  "Comply365 is becoming the system of intelligence for safety-critical operations. Insights & Recommendations is the proof: ask a question in plain English, get an evidence-backed answer across Safety, Training, Content and Compliance — with Recommended Actions ready to deploy.";

export const talkingPoints = [
  "Position as a foundational step toward the Comply365 Intelligence Layer — not a standalone BI tool.",
  "Lead with the question, not the technology. The COO question 'Are DG incidents linked to training gaps?' is the proof.",
  "Anchor on the five shifts: reports → insights, siloed → connected, hindsight → foresight, manual → AI-driven, complexity → simplicity.",
  "Be explicit about status: this is a POC, targeted for Q2 2026 completion. Position as forward-looking and shape-able.",
  "Reasoning is traceable. Every Recommended Action can be explained back to the data — that matters in safety-critical operations.",
];

export const discoveryQuestions = [
  "If you could ask one question of all your operational data today, what would it be — and how long would it take to get an answer?",
  "Where does the lag between detecting a risk and acting on it currently live in your organisation?",
  "How much of your safety, training and compliance reporting is built once, then forgotten?",
  "When was the last time a regulator finding surfaced a pattern your team could have seen earlier in your own data?",
];

export const nextSteps = [
  {
    step: "Live Demo",
    description: "Walk a customer through a working demonstration of natural-language operational intelligence.",
    timeline: "60 minutes",
  },
  {
    step: "Discovery Workshop",
    description: "Identify the 3 questions a COO, Head of Safety and Compliance Lead would ask first.",
    timeline: "Half-day",
  },
  {
    step: "Design Partner Program",
    description: "Shape the Q2 2026 release as a co-design partner for the Intelligence Layer.",
    timeline: "Q2 2026",
  },
];
