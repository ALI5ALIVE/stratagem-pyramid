// Regulation Management — Messaging & Positioning Playbook
// Single source of truth for all playbook content

export interface PainPoint {
  headline: string;
  detail: string;
  icon: string;
}

export interface ValuePillar {
  title: string;
  description: string;
  icon: string;
  metrics?: string;
}

export interface UseCase {
  title: string;
  scenario: string;
  outcome: string;
  products: string[];
}

export interface PersonaRelevance {
  role: string;
  careAbout: string;
  message: string;
  color: string;
}

export interface Objection {
  objection: string;
  response: string;
}

export interface RoadmapPhase {
  phase: string;
  timeline: string;
  title: string;
  outcomes: string[];
  color: string;
}

export interface HowItWorksLayer {
  layer: number;
  title: string;
  description: string;
  details: string[];
  color: string;
}

export interface CommercialElement {
  model: string;
  description: string;
  icon: string;
}

export interface DTOPMappingStep {
  step: "D" | "T" | "O" | "P";
  label: string;
  whatHappens: string;
  modules: string[];
  evidence: string;
  color: string;
  bg: string;
  border: string;
  text: string;
}

// ─── DTOP Mapping (canonical for Regulation Management) ──────────────
export const dtopMapping: DTOPMappingStep[] = [
  {
    step: "D",
    label: "Detect",
    whatHappens:
      "Continuous monitoring of EASA, FAA, ICAO and CAA publications. Every change is structured, tagged and ingested into the regulation database in near real time.",
    modules: ["Regulation Management"],
    evidence: "Structured regulation feed — no manual scraping of PDFs",
    color: "sky",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    text: "text-sky-400",
  },
  {
    step: "T",
    label: "Trigger",
    whatHappens:
      "When a regulatory change touches a linked procedure, syllabus or risk assessment, the platform fires an automated impact alert to the right owner.",
    modules: ["Cross-System Intelligence"],
    evidence: "Impact alerts in minutes, not weeks",
    color: "amber",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
  },
  {
    step: "O",
    label: "Orchestrate",
    whatHappens:
      "Updates cascade into ContentManager365, TrainingManager365 and SafetyManager365 — the right people receive the right action with full context.",
    modules: ["ContentManager365", "TrainingManager365", "SafetyManager365"],
    evidence: "One change → coordinated action across every connected module",
    color: "violet",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
  },
  {
    step: "P",
    label: "Prove",
    whatHappens:
      "Real-time compliance dashboards, audit-ready evidence and CoAnalyst impact reports close the loop — from detection to closure.",
    modules: ["CoAnalyst", "Compliance Dashboard"],
    evidence: "Audit-ready trail for every regulatory change",
    color: "emerald",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
  },
];

// ─── Solution Overview ───────────────────────────────────────────────

export const solutionOverview = {
  elevatorPitch:
    "Regulation Management by Comply365 transforms regulatory compliance from a reactive, manual burden into a connected, always-current system of work — delivering structured regulation data at the point of need across safety, content, and training operations.",
  narrativeArc:
    "From System of Record → System of Work → System of Intelligence",
  tagline: "Always Current. Always Connected. Always Compliant.",
  keyInsight:
    "Airlines manage 1,400+ regulations across dozens of authorities. Today this is done with spreadsheets, Access databases, and tribal knowledge. Regulation Management makes this a managed, connected capability — not a manual exercise.",
};

// ─── The Problem Today ───────────────────────────────────────────────

export const painPoints: PainPoint[] = [
  {
    headline: "Manual, Fragmented Tracking",
    detail:
      "Regulations are tracked in spreadsheets, Access databases, and disconnected tools. No single source of truth exists across the operation.",
    icon: "FileSpreadsheet",
  },
  {
    headline: "Reactive-Only Compliance",
    detail:
      "Airlines only discover regulatory changes when auditors flag gaps — or worse, after an incident. There is no proactive change detection or alerting.",
    icon: "AlertTriangle",
  },
  {
    headline: "No Cross-System Linkage",
    detail:
      "A regulation change in one area (e.g., dangerous goods) has downstream impacts on procedures, training syllabi, and safety reports — but these connections are invisible today.",
    icon: "Unlink",
  },
  {
    headline: "Tribal Knowledge Dependency",
    detail:
      "Compliance expertise lives in the heads of a few senior people. When they leave, the institutional knowledge walks out the door.",
    icon: "Brain",
  },
  {
    headline: "Massive Scale, No Automation",
    detail:
      "At airlines like British Airways, ~1,100 people interact with regulatory content daily. The volume makes manual management unsustainable.",
    icon: "Users",
  },
  {
    headline: "Legacy Infrastructure",
    detail:
      "Existing regulation databases are aging, unsupported, and cannot integrate with modern operational platforms.",
    icon: "Database",
  },
];

// ─── Solution Positioning ────────────────────────────────────────────

export const positioning = {
  role: "Managed Service + Platform Capability",
  audience:
    "Airlines, rail operators, and defense organizations managing complex multi-authority regulatory environments",
  problem:
    "Regulatory compliance is fragmented, manual, and disconnected from the operational systems where compliance is actually delivered",
  uniqueValue:
    "The only solution that delivers structured, always-current regulation data as a managed service AND connects it directly to operational workflows across safety, content, and training",
  statement:
    "For compliance and operations leaders who need always-current regulatory intelligence, Comply365 Regulation Management is the managed compliance service that transforms regulation from a static reference into a connected, living system of work — unlike manual tracking or generic GRC tools, we deliver structured data at the point of need across SafetyManager365, ContentManager365, and TrainingManager365.",
  keyFraming:
    "This is not a 'use case' — it is a self-contained solution with standalone commercial value that also multiplies the value of every other Comply365 module.",
};

// ─── Value Pillars ───────────────────────────────────────────────────

export const valuePillars: ValuePillar[] = [
  {
    title: "Real-Time Compliance Visibility",
    description:
      "Always-current view of regulatory status across every authority, every regulation, every operational area. No more quarterly audits discovering gaps.",
    icon: "Eye",
    metrics: "From quarterly discovery → continuous visibility",
  },
  {
    title: "Connected Cross-System Intelligence",
    description:
      "Regulation changes automatically surface in the systems where they matter — procedures in ContentManager365, training syllabi in TrainingManager365, risk assessments in SafetyManager365.",
    icon: "Network",
    metrics: "One change → automatic cross-platform impact awareness",
  },
  {
    title: "Proactive Change Readiness",
    description:
      "Detect regulatory changes before they become compliance gaps. Automated monitoring, alerting, and impact assessment across your entire regulatory landscape.",
    icon: "Shield",
    metrics: "From reactive gaps → proactive readiness",
  },
  {
    title: "AI-Driven Insights & Automation",
    description:
      "CoAnalyst enables complex regulatory queries, scenario planning, and automated impact analysis that would take teams weeks to perform manually.",
    icon: "Sparkles",
    metrics: "Weeks of analysis → minutes with CoAnalyst",
  },
  {
    title: "Future-Proof Scalable Foundation",
    description:
      "Built on the Comply365 platform with a modern data architecture that scales with your regulatory complexity and supports API-level integration.",
    icon: "Blocks",
    metrics: "Legacy databases → modern, scalable platform",
  },
];

// ─── How It Works ────────────────────────────────────────────────────

export const howItWorksLayers: HowItWorksLayer[] = [
  {
    layer: 1,
    title: "Managed Service — Regulation Data Assurance",
    description:
      "Comply365 maintains a curated, structured database of regulations relevant to your operation. We manage the data ingestion, structuring, tagging, and currency — so you don't have to.",
    details: [
      "Multi-authority regulation sourcing (EASA, FAA, ICAO, CAA, national authorities)",
      "Structured data model with tagged sections, applicability, and cross-references",
      "Continuous monitoring and update cycle — regulations are always current",
      "Quality assurance layer ensuring accuracy and completeness",
    ],
    color: "hsl(var(--primary))",
  },
  {
    layer: 2,
    title: "Platform Integration — Data at Point of Need",
    description:
      "Structured regulation data flows directly into the Comply365 modules where compliance is actually delivered — not as a separate reference, but as a connected, living data source.",
    details: [
      "ContentManager365: Regulations linked to procedures, manuals, and operational documents",
      "TrainingManager365: Regulatory requirements mapped to training syllabi and qualification records",
      "SafetyManager365: Regulations connected to risk assessments, audit findings, and corrective actions",
      "API access for integration with third-party systems",
    ],
    color: "hsl(var(--accent))",
  },
  {
    layer: 3,
    title: "Intelligence Layer — CoAnalyst Queries & Scenario Planning",
    description:
      "CoAnalyst sits on top of the structured regulation data to enable natural-language queries, complex cross-referencing, and 'what-if' scenario planning.",
    details: [
      "\"Show me all EASA regulations impacting our dangerous goods procedures\"",
      "\"What training requirements change if we add a new aircraft type?\"",
      "\"Which procedures need updating based on the latest CAA amendment?\"",
      "Scenario planning: \"If regulation X changes, what is the downstream impact across our operation?\"",
    ],
    color: "hsl(var(--comply-teal))",
  },
];

// ─── Use Cases ───────────────────────────────────────────────────────

export const useCases: UseCase[] = [
  {
    title: "Connected Compliance",
    scenario:
      "A procedure owner needs to verify that a specific operating procedure aligns with the latest EASA regulation. Today they manually cross-reference multiple documents.",
    outcome:
      "With Regulation Management, the regulation is linked directly to the procedure in ContentManager365. Any change triggers an automated review flag.",
    products: ["ContentManager365", "Regulation Management"],
  },
  {
    title: "Real-Time Regulatory Readiness",
    scenario:
      "An audit is scheduled for next month. The compliance team spends weeks manually checking that all procedures, training records, and safety reports reflect current regulations.",
    outcome:
      "A single dashboard shows real-time compliance status across all regulations, with gap identification and remediation tracking.",
    products: ["SafetyManager365", "Regulation Management"],
  },
  {
    title: "Regulatory Change Management",
    scenario:
      "EASA publishes an amendment to dangerous goods regulations. The airline needs to identify every impacted procedure, training syllabus, and risk assessment.",
    outcome:
      "The platform automatically maps the change across ContentManager365, TrainingManager365, and SafetyManager365 — showing every downstream impact in minutes.",
    products: ["ContentManager365", "TrainingManager365", "SafetyManager365"],
  },
  {
    title: "AI-Driven Regulatory Insights",
    scenario:
      "A Head of Compliance wants to understand the cumulative impact of all regulatory changes in the past 12 months on their dangerous goods operation.",
    outcome:
      "CoAnalyst processes the query across the structured regulation database and returns a comprehensive impact report with linked procedures and training gaps.",
    products: ["CoAnalyst", "Regulation Management"],
  },
  {
    title: "Scenario Planning & Future Readiness",
    scenario:
      "The airline is evaluating adding a new aircraft type to its fleet. Leadership needs to understand the full regulatory impact — new certifications, procedure updates, training requirements.",
    outcome:
      "CoAnalyst models the scenario against the full regulation database, producing a readiness plan with estimated effort and timeline.",
    products: ["CoAnalyst", "TrainingManager365", "ContentManager365"],
  },
  {
    title: "Executive-Level Assurance",
    scenario:
      "The COO / Accountable Manager (Form 4 Holder) needs confidence that the operation is compliant ahead of a board meeting.",
    outcome:
      "An executive compliance dashboard provides real-time assurance across all regulatory domains, with drill-down into any flagged gaps.",
    products: ["SafetyManager365", "Regulation Management"],
  },
];

// ─── Persona Relevance ───────────────────────────────────────────────

export const personaRelevance: PersonaRelevance[] = [
  {
    role: "Procedure Owners / Department Heads",
    careAbout:
      "Ensuring their procedures reflect current regulations without manually checking every amendment",
    message:
      "Regulation Management links regulations directly to your procedures — so you always know you're current, without the manual cross-referencing.",
    color: "hsl(217, 91%, 60%)",
  },
  {
    role: "Auditors / Quality Managers",
    careAbout:
      "Demonstrable, real-time compliance status for internal and external audits",
    message:
      "Move from weeks of pre-audit preparation to always-on compliance visibility. Every regulation, every procedure, every status — in one connected view.",
    color: "hsl(142, 71%, 45%)",
  },
  {
    role: "Training Managers / L&D Directors",
    careAbout:
      "Regulatory requirements automatically mapped to training syllabi and qualification tracking",
    message:
      "When a regulation changes, TrainingManager365 immediately flags the training impact — no more discovering gaps after the fact.",
    color: "hsl(262, 83%, 58%)",
  },
  {
    role: "COO / Accountable Manager (Form 4 Holder)",
    careAbout:
      "Board-level assurance that the operation is fully compliant across all regulatory domains",
    message:
      "Real-time executive compliance dashboards give you the confidence to sign off — backed by connected data, not best-guess reports.",
    color: "hsl(25, 95%, 53%)",
  },
  {
    role: "Head of Compliance / Regulatory Affairs",
    careAbout:
      "Managing 1,400+ regulations across multiple authorities without spreadsheets and tribal knowledge",
    message:
      "Regulation Management replaces your fragmented tracking with a managed, structured, always-current regulatory intelligence service.",
    color: "hsl(190, 95%, 39%)",
  },
];

// ─── Commercial Model ────────────────────────────────────────────────

export const commercialModel: CommercialElement[] = [
  {
    model: "Subscription Per Regulation Set",
    description:
      "Priced per authority/regulation set (e.g., EASA Part-OPS, FAA Part 121). Airlines subscribe to the regulation sets relevant to their operation.",
    icon: "Receipt",
  },
  {
    model: "Standalone Solution Value",
    description:
      "Regulation Management delivers value even without other Comply365 modules. Airlines can subscribe for the managed data service alone — with an API for integration into existing systems.",
    icon: "Package",
  },
  {
    model: "Cross-Platform Multiplier",
    description:
      "Value multiplies when connected to SafetyManager365, ContentManager365, and TrainingManager365. Each connected module unlocks new use cases (connected compliance, automated training impact, etc.).",
    icon: "Layers",
  },
  {
    model: "API / Data-Only Option",
    description:
      "For airlines that want the structured regulation data without the full Comply365 platform — an API-only tier provides data access for integration into third-party systems.",
    icon: "Code",
  },
];

// ─── Objection Handling ──────────────────────────────────────────────

export const objections: Objection[] = [
  {
    objection: "It's too much effort to migrate from our current system",
    response:
      "Regulation Management is a managed service — we handle the data migration, structuring, and ongoing maintenance. Your team doesn't build or maintain the regulation database. We onboard you with a phased approach starting with your highest-priority regulation sets.",
  },
  {
    objection: "We're a small operation — we don't manage that many regulations",
    response:
      "Even smaller operators manage hundreds of regulations across multiple authorities. The value isn't just in volume — it's in the connections. When a regulation changes, do you know every procedure, training record, and risk assessment it impacts? That's where Regulation Management delivers.",
  },
  {
    objection: "We just need the data, not the full platform",
    response:
      "That's exactly why we offer an API/data-only tier. You get structured, always-current regulation data without requiring the full Comply365 platform. And when you're ready to connect it to your operational workflows, the integration is already built.",
  },
  {
    objection: "We already have a GRC tool that handles this",
    response:
      "GRC tools manage governance frameworks — they don't deliver structured regulation data at the point of operational need. Regulation Management connects regulations to the actual procedures, training, and safety systems where compliance is delivered. It complements your GRC, not competes with it.",
  },
  {
    objection: "How do we know the regulation data is accurate and current?",
    response:
      "This is a managed service with a dedicated regulation data assurance team. We monitor regulatory sources continuously, structure the data with quality controls, and guarantee currency. This is our core competency — not a side feature.",
  },
  {
    objection: "Our compliance team has the expertise — we don't need external help",
    response:
      "Your compliance experts are invaluable — but their knowledge is often undocumented and siloed. Regulation Management doesn't replace their expertise — it structures and connects it across your operation so it's accessible, scalable, and not dependent on individual people.",
  },
  {
    objection: "We can build this ourselves with AI tools",
    response:
      "Generative AI can summarize regulations, but it can't guarantee accuracy, maintain cross-system linkages, or provide the structured data model needed for operational compliance. Our managed service combines AI capability with domain expertise and data assurance — something a DIY approach can't replicate at scale.",
  },
];

// ─── Phased Roadmap ──────────────────────────────────────────────────

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    timeline: "Q2 2026 — POC",
    title: "Proof of Concept",
    outcomes: [
      "Partner airline identified and onboarded",
      "Core regulation set structured and loaded (e.g., EASA Part-OPS)",
      "Basic cross-referencing to ContentManager365 procedures demonstrated",
      "CoAnalyst natural-language queries validated against regulation data",
      "Commercial model validated with partner feedback",
    ],
    color: "hsl(var(--primary))",
  },
  {
    phase: "Phase 2",
    timeline: "2027 — Production",
    title: "Production Release",
    outcomes: [
      "Multi-authority regulation coverage (EASA, FAA, ICAO, national authorities)",
      "Full integration with ContentManager365, TrainingManager365, SafetyManager365",
      "Automated regulatory change detection and impact alerting",
      "Executive compliance dashboards",
      "Subscription commercial model live",
    ],
    color: "hsl(var(--accent))",
  },
  {
    phase: "Phase 3",
    timeline: "2027+ — Cross-Platform Entity",
    title: "Regulation as a Platform Entity",
    outcomes: [
      "Regulation becomes a first-class entity across the entire Comply365 platform",
      "API marketplace for third-party integrations",
      "Advanced CoAnalyst scenario planning and predictive compliance",
      "Multi-industry expansion (rail, defense, energy)",
      "Regulation-as-a-Service offering for the broader market",
    ],
    color: "hsl(var(--comply-teal))",
  },
];

// ─── Talking Points & Discovery Questions ────────────────────────────

export const talkingPoints: string[] = [
  "Regulation isn't a reference exercise — it's the foundation of every operational decision you make.",
  "Today you're managing 1,400+ regulations in spreadsheets. What happens when your compliance lead retires?",
  "A regulation change in dangerous goods impacts procedures, training, and safety reports — but those connections are invisible in your current tools.",
  "This isn't another GRC tool. This is structured regulatory intelligence delivered at the point of operational need.",
  "We manage the regulation data so your compliance team can focus on compliance — not data entry.",
  "Every Comply365 module gets smarter when connected to always-current regulation data.",
];

export const discoveryQuestions: string[] = [
  "How do you currently track and manage regulatory changes across your operation?",
  "When a regulation changes, how do you identify every impacted procedure, training requirement, and safety process?",
  "How long does it take your team to prepare for a regulatory audit? What does that preparation look like?",
  "How many people in your organization interact with regulatory content on a daily basis?",
  "What happens to your compliance capability when key people leave or retire?",
  "Have you ever discovered a compliance gap after an audit rather than before? What was the impact?",
  "How do you currently connect regulatory requirements to your training syllabi and qualification tracking?",
  "If a new aircraft type enters your fleet, how do you map all the regulatory implications?",
  "What would it mean for your operation to have real-time compliance visibility across every regulatory domain?",
  "Are you using any tools today specifically for regulation management — or is it spreadsheets and institutional knowledge?",
];
