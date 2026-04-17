// Operational Performance Platform — Master Positioning & Messaging Playbook Data
// The unifying narrative across Core Apps → Data Lake → Intelligence Layer → Mobile Experience → DTOP

export interface PainPoint {
  label: string;
  detail: string;
}

export interface CoreApp {
  name: string;
  short: string;
  role: string;
  feeds: string[];
  icon: string;
  color: string;
  bg: string;
  border: string;
}

export interface IntelligenceCapability {
  name: string;
  short: string;
  role: string;
  bullets: string[];
  icon: string;
  color: string;
  bg: string;
  border: string;
  status: string;
}

export interface ArchitectureLayer {
  number: number;
  title: string;
  tagline: string;
  description: string;
  components: string[];
  color: string;
  bg: string;
  border: string;
}

export interface PlatformUseCase {
  title: string;
  scenario: string;
  question: string;
  icon: string;
  steps: {
    detect: string;
    trigger: string;
    orchestrate: string;
    prove: string;
  };
  outcome: string;
  metric: string;
  capabilities: string[];
}

export interface ValuePillar {
  title: string;
  description: string;
  bullets: string[];
  shift: string;
  icon: string;
  color: string;
}

export interface PlatformPersona {
  role: string;
  careAbout: string;
  openWith: string;
  keyMessage: string;
  sampleQuestion: string;
  color: string;
}

export interface CompetitiveContrast {
  approach: string;
  isUs: boolean;
  data: string;
  intelligence: string;
  action: string;
  delivery: string;
}

// ============================================================
// HERO
// ============================================================
export const heroEyebrow = "The Operational Performance Platform";
export const heroTitle = "One platform. One operating model. One mobile entry point.";
export const heroTagline = "From fragmented operations to closed-loop performance.";
export const heroSubtitle =
  "Comply365 unifies content, training and safety into a single operational data foundation — activated by intelligence and automation, governed by DTOP, delivered through one trusted mobile shell.";
export const statusLabel = "Foundational platform · Live core · Intelligence & orchestration in active delivery";

// ============================================================
// SLIDE 1 — WHY IT EXISTS
// ============================================================
export const whyItExists = {
  headline: "Aviation runs on three operational disciplines. Today they run as three disconnected silos.",
  exposureLabel:
    "Content, Training and Safety hold the data that drives operational performance — but they sit in separate systems, with separate intelligence, separate workflows and separate mobile apps. Nobody owns the loop between detecting a problem and proving it was fixed.",
  problems: [
    {
      label: "Three Disconnected Disciplines",
      detail: "Content, Training and Safety run as parallel systems — each with its own data, its own logic, its own mobile app.",
    },
    {
      label: "Data Without Intelligence",
      detail: "Operational data is captured everywhere and reasoned with nowhere — events, procedures and competence never meet.",
    },
    {
      label: "Insight Without Action",
      detail: "Even when patterns surface, there's no mechanism to trigger procedural updates, training or safety responses.",
    },
    {
      label: "Manual Coordination",
      detail: "Cross-product handoffs (publish → train → assure) still depend on people, email and tickets.",
    },
    {
      label: "Fragmented Frontline UX",
      detail: "Crews juggle three apps a shift — procedures here, training there, safety somewhere else.",
    },
    {
      label: "No Proof of Effect",
      detail: "Auditors and boards ask 'did this fix work?' — airlines can't answer with evidence across the loop.",
    },
  ] as PainPoint[],
};

// ============================================================
// SLIDE 2 — WHAT IT IS (one-liner + transformation shifts)
// ============================================================
export const platformDefinition = {
  oneLiner:
    "The Operational Performance Platform is one connected system: Content, Training and Safety as the operational core, a unified data foundation, an intelligence and orchestration layer, and one trusted mobile entry point — all governed by the DTOP operating model.",
  shifts: [
    { from: "Three disciplines, three systems", to: "One connected platform" },
    { from: "Data trapped in silos", to: "One operational data foundation" },
    { from: "Reports and dashboards", to: "Intelligence, recommendations and automation" },
    { from: "Three mobile apps a shift", to: "One trusted mobile shell" },
    { from: "Compliance theatre", to: "Closed-loop performance (DTOP)" },
  ],
  signatureLine: "Detect → Trigger → Orchestrate → Prove — across every product, every workflow, every shift.",
};

// ============================================================
// SLIDE 3 — ARCHITECTURE (5 layers, used by the diagram)
// ============================================================
export const architectureLayers: ArchitectureLayer[] = [
  {
    number: 1,
    title: "Core Operational Apps",
    tagline: "The system of record for content, training and safety",
    description:
      "ContentManager365, TrainingManager365 and SafetyManager365 run the operational disciplines and feed structured data into the platform.",
    components: ["ContentManager365", "TrainingManager365", "SafetyManager365"],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  {
    number: 2,
    title: "Operational Data Foundation",
    tagline: "One unified data lake",
    description:
      "Procedures, training records, occurrence data and operational events flow into a single, governed data foundation — the substrate every other layer reasons over.",
    components: ["Unified data lake", "Cross-product schema", "Governed access", "Customer-owned data"],
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
  },
  {
    number: 3,
    title: "Intelligence & Orchestration Layer",
    tagline: "CoAnalyst · Insights & Recommendations · Automation",
    description:
      "Three intelligence capabilities turn operational data into action: CoAnalyst for plain-English questions, Insights & Recommendations for proactive direction, and Automation for cross-product workflows.",
    components: ["CoAnalyst", "Insights & Recommendations", "Automation & Orchestration"],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    number: 4,
    title: "Unified Mobile Experience",
    tagline: "One trusted shell for the frontline",
    description:
      "The Comply365 mobile app — already in daily use — surfaces Content, Training and Safety as embedded mini-apps. One login, one footprint, one place crews already trust.",
    components: ["iOS shell (in daily use)", "SSO across mini-apps", "Procedures · Training · Safety", "Unified notifications"],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
  {
    number: 5,
    title: "DTOP Operating Model",
    tagline: "Detect → Trigger → Orchestrate → Prove",
    description:
      "The closed-loop operating model that wraps everything above. Every signal is detected, triggers the right response, orchestrates cross-product action, and proves the outcome.",
    components: ["Detect signals", "Trigger response", "Orchestrate action", "Prove outcome"],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
];

// ============================================================
// SLIDE 4 — CORE APPS (what feeds the foundation)
// ============================================================
export const coreApps: CoreApp[] = [
  {
    name: "ContentManager365",
    short: "Content",
    role: "The system of record for procedures, manuals and operational documentation.",
    feeds: ["Procedure publishes", "Revision history", "Role-targeted distribution", "Acknowledgement events"],
    icon: "FileText",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  {
    name: "TrainingManager365",
    short: "Training",
    role: "The system of record for competence — assignments, completions and recurrency.",
    feeds: ["Course assignments", "Completion records", "Competency data", "Recurrency status"],
    icon: "GraduationCap",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    name: "SafetyManager365",
    short: "Safety",
    role: "The system of record for occurrences, audits and operational risk.",
    feeds: ["Occurrence reports", "Audit findings", "Risk assessments", "Investigation outcomes"],
    icon: "ShieldCheck",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
  },
];

// ============================================================
// SLIDE 5 — INTELLIGENCE LAYER (the three capabilities)
// ============================================================
export const intelligenceCapabilities: IntelligenceCapability[] = [
  {
    name: "CoAnalyst",
    short: "Ask anything",
    role: "Plain-English questions across the operational data foundation — answered in seconds with cited evidence.",
    bullets: [
      "Aviation-trained AI (>90% accuracy)",
      "Cross-product correlation",
      "Cited, auditable answers",
      "60+ languages",
    ],
    icon: "Brain",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    status: "Live · CoAnalyst Playbook",
  },
  {
    name: "Insights & Recommendations",
    short: "Proactive direction",
    role: "Surfaces patterns, risks and recommended actions across content, training and safety — before they become incidents.",
    bullets: [
      "Pattern detection across silos",
      "Recommended Actions",
      "Operational Data context",
      "Closes the gap between report and action",
    ],
    icon: "Sparkles",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    status: "POC · Targeted Q2 2026",
  },
  {
    name: "Automation & Orchestration",
    short: "Acts in the loop",
    role: "Embedded orchestration that turns events into cross-product workflows and connects to Outlook, Teams and customer systems.",
    bullets: [
      "Event-driven cross-product workflows",
      "No-code / low-code orchestration",
      "Reusable native connectors",
      "Configurable per customer",
    ],
    icon: "Zap",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    status: "POC · Targeted April 2026",
  },
];

// ============================================================
// SLIDE 6 — UNIFIED MOBILE (delivery surface)
// ============================================================
export const mobileExperience = {
  headline: "One mobile shell. Three mini-apps. Zero context switching.",
  description:
    "The Comply365 mobile app — already in daily operational use through ContentManager365 — is being extended to surface TrainingManager365 and SafetyManager365 as embedded mini-apps. The frontline gets one trusted entry point for procedures, training and safety reporting.",
  pillars: [
    { title: "One Shell", detail: "The app crews already open every shift becomes the entry point for the whole platform." },
    { title: "One Sign-On", detail: "SSO across mini-apps — no app-hopping for credentials." },
    { title: "One Footprint", detail: "One mobile app to certify, MDM and approve — instead of three." },
    { title: "Connected Workflows", detail: "Procedures, training and safety move from three apps to one connected experience." },
  ],
  phases: [
    { phase: "Phase 1", when: "Q2 2026", what: "TrainingManager365 surfaced inside the shell" },
    { phase: "Phase 2", when: "Q4 2026", what: "SafetyManager365 reporting in the shell" },
    { phase: "Phase 3", when: "2027+", what: "Fully unified mobile experience" },
  ],
};

// ============================================================
// SLIDE 7 — DTOP OPERATING MODEL (the loop)
// ============================================================
export const dtopModel = {
  headline: "DTOP is the operating model that closes the loop.",
  description:
    "Every other layer — core apps, data foundation, intelligence, mobile — is wired into the same closed-loop operating model: Detect → Trigger → Orchestrate → Prove. It's how Comply365 turns events into outcomes.",
  steps: [
    {
      letter: "D",
      label: "Detect",
      tagline: "See the signal",
      detail: "Insights & Recommendations and CoAnalyst surface the signal across content, training and safety data.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
    },
    {
      letter: "T",
      label: "Trigger",
      tagline: "Decide the response",
      detail: "Recommended Actions and orchestration rules determine the right response — procedural, training or safety.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    },
    {
      letter: "O",
      label: "Orchestrate",
      tagline: "Run it across products",
      detail: "Automation runs the workflow across ContentManager365, TrainingManager365, SafetyManager365 and third-party tools.",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
    },
    {
      letter: "P",
      label: "Prove",
      tagline: "Evidence the outcome",
      detail: "The platform records what was detected, what was done, by whom, when — providing audit-grade proof of effect.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
  ],
};

// ============================================================
// SLIDE 8 — END-TO-END USE CASE (everything firing together)
// ============================================================
export const flagshipUseCase: PlatformUseCase = {
  title: "A new procedure goes live — the whole platform responds.",
  scenario:
    "A safety occurrence in SafetyManager365 reveals a gap in a published procedure. In a fragmented world, this becomes weeks of manual coordination across three teams. On the Operational Performance Platform, it becomes one closed loop.",
  question: "How does one signal turn into one outcome — across content, training, safety and the frontline?",
  icon: "Workflow",
  steps: {
    detect:
      "Insights & Recommendations correlates the SafetyManager365 occurrence with related procedure usage in ContentManager365 and competence data in TrainingManager365 — surfacing the gap proactively.",
    trigger:
      "CoAnalyst lets the safety team interrogate the pattern in plain English. A Recommended Action is raised: revise the procedure, re-train the affected roles, log a compliance checkpoint.",
    orchestrate:
      "Automation runs the workflow: ContentManager365 publishes the revised procedure, TrainingManager365 assigns the updated module to the affected roles, SafetyManager365 opens the compliance checkpoint, Teams notifies the operational owners.",
    prove:
      "On the Unified Mobile App, crew see the new procedure, complete the training and acknowledge in one trusted shell. The platform records the full chain — detection, decision, action, completion — as audit-grade evidence.",
  },
  outcome: "One signal → one closed loop → one auditable outcome",
  metric: "Weeks of coordination → hours of orchestration",
  capabilities: ["Insights", "CoAnalyst", "Automation", "Core Apps", "Unified Mobile", "DTOP"],
};

// ============================================================
// SLIDE 9 — VALUE PILLARS
// ============================================================
export const valuePillars: ValuePillar[] = [
  {
    title: "One Connected Platform",
    description:
      "Content, Training and Safety run as one operational system — not three. Cross-product workflows replace cross-team tickets.",
    bullets: [
      "Single operational data foundation",
      "Cross-product workflows out of the box",
      "Closed-loop publish → train → assure",
    ],
    shift: "Three disciplines, three systems → One connected platform",
    icon: "Boxes",
    color: "text-blue-400",
  },
  {
    title: "Intelligence That Acts",
    description:
      "CoAnalyst, Insights & Recommendations and Automation turn operational data into action — not just dashboards.",
    bullets: [
      "Ask anything in plain English",
      "Recommended Actions across silos",
      "Workflows execute, not just suggest",
    ],
    shift: "Reports & dashboards → Intelligence that takes action",
    icon: "Brain",
    color: "text-amber-400",
  },
  {
    title: "One Trusted Mobile Entry Point",
    description:
      "The app crews already use every shift becomes the home for procedures, training and safety. Less context shifting, less cognitive load.",
    bullets: [
      "One shell, one sign-on, one footprint",
      "Training and Safety where crews already are",
      "In-the-moment safety reporting",
    ],
    shift: "Three apps a shift → One app every shift",
    icon: "Smartphone",
    color: "text-violet-400",
  },
  {
    title: "Closed-Loop Performance (DTOP)",
    description:
      "Every signal detected becomes a triggered response, an orchestrated action and a proven outcome — with a full audit trail.",
    bullets: [
      "Detect signals across the platform",
      "Trigger and orchestrate cross-product action",
      "Prove the outcome with audit-grade evidence",
    ],
    shift: "Compliance theatre → Closed-loop operational performance",
    icon: "Repeat",
    color: "text-emerald-400",
  },
  {
    title: "Future-Ready Foundation",
    description:
      "A modern data foundation, an embedded intelligence layer, an embedded orchestration engine and a unified mobile shell — built to evolve.",
    bullets: [
      "Customer-owned data foundation",
      "Plug-in intelligence and AI capabilities",
      "Configurable, not custom-coded",
    ],
    shift: "Static product suite → Future-ready operational platform",
    icon: "Sparkles",
    color: "text-cyan-400",
  },
];

// ============================================================
// SLIDE 10 — PERSONAS
// ============================================================
export const personas: PlatformPersona[] = [
  {
    role: "CEO / COO",
    careAbout: "Operational performance, regulatory standing, total cost of ownership across the operation",
    openWith:
      "You don't have a content problem, a training problem and a safety problem. You have one operational performance problem — and it needs one platform.",
    keyMessage:
      "The Operational Performance Platform replaces three disconnected disciplines with one connected system — closing the loop from signal to proven outcome under the DTOP operating model.",
    sampleQuestion: "How much of your operational risk lives in the gaps between content, training and safety today?",
    color: "border-blue-500/30",
  },
  {
    role: "Head of Safety",
    careAbout: "Reporting volume and quality, evidence of action, regulator-ready proof",
    openWith:
      "You can detect signals today. The platform closes the loop — trigger, orchestrate and prove the response.",
    keyMessage:
      "Insights & Recommendations surface the pattern, Automation runs the response across content and training, and DTOP gives you an audit-grade record of the outcome.",
    sampleQuestion: "When a safety event reveals a procedure gap, how long does it take you to prove the gap is closed?",
    color: "border-rose-500/30",
  },
  {
    role: "Head of Training",
    careAbout: "Competence accuracy, time-to-competent, evidence of effect",
    openWith:
      "Training shouldn't be calendar-driven. It should be event-driven by what's actually happening in the operation.",
    keyMessage:
      "Training assignments fire automatically from procedure publishes and safety findings — and crews see them in the app they already use every shift.",
    sampleQuestion: "How much of your training is reacting to operational signals — and how much is just running on a calendar?",
    color: "border-emerald-500/30",
  },
  {
    role: "Head of Operations",
    careAbout: "Frontline efficiency, closed-loop processes, real cost of fragmentation",
    openWith:
      "Your crews open three apps a shift. Your back office runs three workflows for one outcome. The platform collapses both.",
    keyMessage:
      "One mobile entry point for the frontline, one orchestration layer for the back office, one operating model for everyone — Detect, Trigger, Orchestrate, Prove.",
    sampleQuestion: "Where in your operation are people still stitching together what the platform should be running?",
    color: "border-violet-500/30",
  },
  {
    role: "CIO / CTO",
    careAbout: "Architecture, data ownership, integration risk, total cost of ownership",
    openWith:
      "You're being asked to integrate three vendors and stand up your own intelligence layer. There's a connected alternative.",
    keyMessage:
      "One operational data foundation, one embedded intelligence layer, one orchestration engine, one mobile shell — all governed, all customer-owned, all configurable.",
    sampleQuestion: "What would it take to retire the integration tax between content, training and safety in your estate?",
    color: "border-cyan-500/30",
  },
];

// ============================================================
// SLIDE 11 — COMPETITIVE / WHY ONLY COMPLY365
// ============================================================
export const competitiveContrast: CompetitiveContrast[] = [
  {
    approach: "Best-of-breed point solutions",
    isUs: false,
    data: "Trapped in each silo",
    intelligence: "Per-product dashboards",
    action: "Manual hand-offs",
    delivery: "App per discipline",
  },
  {
    approach: "Generic AI / iPaaS bolt-ons",
    isUs: false,
    data: "External, ungoverned",
    intelligence: "No domain context",
    action: "Disconnected from product",
    delivery: "Web wrappers",
  },
  {
    approach: "In-house build",
    isUs: false,
    data: "Years to consolidate",
    intelligence: "Generic, not aviation-trained",
    action: "Custom code per workflow",
    delivery: "No mobile shell",
  },
  {
    approach: "Comply365 Operational Performance Platform",
    isUs: true,
    data: "One unified foundation",
    intelligence: "CoAnalyst · Insights · Automation",
    action: "DTOP closes the loop",
    delivery: "One trusted mobile shell",
  },
];

export const moatStatements = [
  "Only Comply365 owns the three core operational disciplines — Content, Training and Safety — as the system of record.",
  "One operational data foundation gives the intelligence layer something no point solution or generic AI can replicate.",
  "An embedded intelligence and orchestration layer means action happens inside the platform, not in a separate iPaaS or BI tool.",
  "A mobile shell already in daily frontline use — extended, not invented — collapses the rollout barrier no competitor can match.",
  "DTOP is the only closed-loop operating model that wires all of it together with audit-grade proof.",
];

// ============================================================
// SLIDE 12 — CLOSING
// ============================================================
export const positioningLine = "From three disconnected disciplines → one operational performance platform.";

export const elevatorClosePitch =
  "Comply365 is the Operational Performance Platform for aviation. We own the operational core — Content, Training and Safety — as one connected system on a unified data foundation. CoAnalyst, Insights & Recommendations and Automation turn that data into intelligence and action. The Unified Mobile App delivers it to the frontline in the shell they already trust. DTOP — Detect, Trigger, Orchestrate, Prove — is the operating model that closes the loop. One platform. One operating model. One mobile entry point.";

export const talkingPoints = [
  "Lead with the architecture: Core Apps → Data Foundation → Intelligence & Orchestration → Mobile → DTOP.",
  "Position as one platform replacing three disciplines — not a new product alongside what's already there.",
  "Anchor on the closed loop: every signal becomes a triggered, orchestrated, proven outcome.",
  "Be specific about status: core apps are live; intelligence and orchestration are in active POC delivery; mobile is phased Q2 2026 onward.",
  "Stress the moat: only Comply365 has all three core disciplines, the data foundation, the intelligence layer and the daily-use mobile shell — under one operating model.",
];

export const discoveryQuestions = [
  "Where in your operation today is a signal detected in one system but answered in another — and how long does that loop take?",
  "How much of your operational risk lives in the seams between content, training and safety?",
  "If your frontline opened one app instead of three, what would change about adoption, reporting and competence?",
  "What would it take to prove — to a regulator or a board — that every operational signal led to a measured outcome?",
];

export const nextSteps = [
  {
    step: "Platform Walkthrough",
    description: "End-to-end demo of the Operational Performance Platform — Core Apps, Data Foundation, Intelligence, Mobile and DTOP in one flow.",
    timeline: "60 minutes",
  },
  {
    step: "Loop-Closing Workshop",
    description: "Map your top operational risks to the DTOP loop and identify the highest-value signals to close end-to-end.",
    timeline: "Half-day",
  },
  {
    step: "Design Partner Program",
    description: "Co-shape the intelligence, automation and unified mobile roadmap — Q2 2026 through 2027.",
    timeline: "Q1 2026 onward",
  },
];
