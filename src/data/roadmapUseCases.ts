// Roadmap Use Cases — single source of truth for the dedicated Use Case Roadmap deck.
// Aligned with mem://product/roadmap-dates and the canonical 2026 Use Case Roadmap.

export type RoadmapStatus = "done" | "in-progress" | "planned";
export type RoadmapPhase = "h1-2026" | "h2-2026" | "2027-plus";
export type PlatformLayer =
  | "Operational Data Foundation"
  | "Intelligence & Orchestration Layer"
  | "Unified Mobile Experience"
  | "Unified Experience";

export interface RoadmapUseCase {
  id: string;
  slideNumber: number; // 1-based position within the use-case body of the deck
  title: string;
  oneLiner: string;
  status: RoadmapStatus;
  phase: RoadmapPhase;
  layer: PlatformLayer;
  problemToday: string;
  whatWereDelivering: string[];
  dtop: {
    detect: string;
    trigger: string;
    orchestrate: string;
    prove: string;
  };
  customerOutcomes: string[];
  modules: string[]; // BrandNumber names — e.g. "ContentManager365"
}

export const phaseMeta: Record<
  RoadmapPhase,
  { label: string; window: string; theme: string; color: string; bg: string; border: string }
> = {
  "h1-2026": {
    label: "H1 2026",
    window: "Jan – Jun 2026",
    theme: "In Production & Quick Wins",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/30",
  },
  "h2-2026": {
    label: "H2 2026",
    window: "Jul – Dec 2026",
    theme: "Connected Operations",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
  },
  "2027-plus": {
    label: "2027+",
    window: "2027 onwards",
    theme: "Intelligent Operations",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
};

export const statusMeta: Record<RoadmapStatus, { label: string; icon: string; color: string }> = {
  done: { label: "Done", icon: "✅", color: "text-emerald-400" },
  "in-progress": { label: "In Progress", icon: "🔄", color: "text-amber-400" },
  planned: { label: "Planned", icon: "📋", color: "text-sky-400" },
};

export const roadmapUseCases: RoadmapUseCase[] = [
  // ──────────────── H1 2026 — Done ────────────────
  {
    id: "training-doc-linking",
    slideNumber: 1,
    title: "Link Training Modules to Documents",
    oneLiner: "Every training module traceably tied to the source procedure or regulation.",
    status: "done",
    phase: "h1-2026",
    layer: "Operational Data Foundation",
    problemToday:
      "Training and documentation live in separate systems. When a procedure changes, training sits stale and auditors cannot prove that the people doing the work were trained on the current version.",
    whatWereDelivering: [
      "Bidirectional links between TrainingManager365 modules and ContentManager365 documents",
      "Change-aware references that flag training when a linked document is revised",
      "A unified evidence trail joining 'who is trained' with 'what is current'",
    ],
    dtop: {
      detect: "Document revision committed in ContentManager365",
      trigger: "Linked training modules flagged as 'review required'",
      orchestrate: "Training owner notified, scope of impact surfaced across affected roles",
      prove: "Single audit view: current document version + qualified population",
    },
    customerOutcomes: [
      "Eliminates the gap between procedure changes and training currency",
      "Cuts audit prep on training-to-document traceability from days to minutes",
      "Raises confidence that the workforce is trained on what is actually in force",
    ],
    modules: ["TrainingManager365", "ContentManager365"],
  },
  {
    id: "regdb-replatform-poc",
    slideNumber: 2,
    title: "Regulation Database Replatforming — POC",
    oneLiner: "Modern regulation substrate proven and ready to scale.",
    status: "done",
    phase: "h1-2026",
    layer: "Operational Data Foundation",
    problemToday:
      "The legacy regulation store is hard to query, slow to update, and disconnected from the operational systems that consume it.",
    whatWereDelivering: [
      "A modern, structured regulation database designed for cross-platform consumption",
      "Validated ingestion, versioning and traceability against representative authorities",
      "Foundation for live integration with ContentManager365 and downstream automation",
    ],
    dtop: {
      detect: "Authority publishes a regulatory update",
      trigger: "Change captured, classified and versioned in the new database",
      orchestrate: "Impacted documents and controls identified for downstream review",
      prove: "Lineage from regulation → control → document → training is queryable end-to-end",
    },
    customerOutcomes: [
      "Removes the regulation database as a bottleneck for the wider platform",
      "Unlocks faster, evidence-backed compliance change management",
      "Sets the stage for automated regulatory impact analysis",
    ],
    modules: ["ContentManager365", "Regulation Management"],
  },
  {
    id: "automation-poc",
    slideNumber: 3,
    title: "Automation Engine — POC",
    oneLiner: "Proven that platform events can drive deterministic, auditable actions.",
    status: "done",
    phase: "h1-2026",
    layer: "Intelligence & Orchestration Layer",
    problemToday:
      "Operational follow-up is manual: a signal arrives, somebody has to read it, route it, and chase the action. Time and accountability leak.",
    whatWereDelivering: [
      "An automation runtime that listens to platform events across the core apps",
      "Rule-based and policy-aware actions (notify, assign, route, escalate)",
      "Full audit trail of every triggered action and its outcome",
    ],
    dtop: {
      detect: "Platform event emitted by SafetyManager365 / ContentManager365 / TrainingManager365",
      trigger: "Automation policy matched against event signature",
      orchestrate: "Action executed against the right system and routed to the right owner",
      prove: "Every triggered action logged with outcome and time-to-action",
    },
    customerOutcomes: [
      "Validates the automation pattern that scales across the platform",
      "Replaces invisible manual steps with visible, governed workflow",
      "Gives operations a measurable lever on cycle time",
    ],
    modules: ["SafetyManager365", "ContentManager365", "TrainingManager365"],
  },
  {
    id: "insights-poc",
    slideNumber: 4,
    title: "Platform-wide Insights & Recommendations — POC",
    oneLiner: "From dashboards to recommended next actions, grounded in operational data.",
    status: "done",
    phase: "h1-2026",
    layer: "Intelligence & Orchestration Layer",
    problemToday:
      "Leaders see lagging dashboards. By the time a trend is visible, the cost has already been paid and the window to act has closed.",
    whatWereDelivering: [
      "Cross-module signal correlation across Safety, Content and Training data",
      "Recommended actions surfaced with the evidence behind them",
      "Validated against real operational scenarios with customer-grade accuracy",
    ],
    dtop: {
      detect: "Patterns surfaced across SafetyManager365, ContentManager365 and TrainingManager365",
      trigger: "Recommendation generated when a pattern crosses a defined threshold",
      orchestrate: "Recommended action presented to the accountable role with context",
      prove: "Recommendation, decision and outcome retained as evidence",
    },
    customerOutcomes: [
      "Shifts leaders from reactive reporting to proactive recommendation",
      "Cuts the time between a leading signal and a decision",
      "Establishes the baseline for platform-wide intelligence at scale",
    ],
    modules: ["SafetyManager365", "ContentManager365", "TrainingManager365"],
  },
  // ──────────────── H1 2026 — In Progress ────────────────
  {
    id: "regdb-cm365-integration",
    slideNumber: 5,
    title: "Regulation Database ↔ ContentManager365 Integration",
    oneLiner: "Live regulatory change flowing directly into the document estate.",
    status: "in-progress",
    phase: "h1-2026",
    layer: "Operational Data Foundation",
    problemToday:
      "Regulatory change still requires manual cross-referencing into the document library. Impact analysis is slow, partial and easy to contest.",
    whatWereDelivering: [
      "Bidirectional integration between the new Regulation Database and ContentManager365",
      "Automatic surfacing of impacted documents when a regulation changes",
      "Versioned, evidence-backed compliance traceability",
    ],
    dtop: {
      detect: "Regulation change detected in the Regulation Database",
      trigger: "Linked documents flagged for compliance review",
      orchestrate: "Authoring teams routed the right scope, with regulatory context attached",
      prove: "End-to-end lineage from regulatory clause to revised document",
    },
    customerOutcomes: [
      "Compresses regulatory impact analysis from weeks to days",
      "Removes guesswork from compliance scoping",
      "Gives regulators a defensible, query-able evidence chain",
    ],
    modules: ["ContentManager365", "Regulation Management"],
  },
  {
    id: "training-mobile",
    slideNumber: 6,
    title: "Training in the Comply iOS Mobile App",
    oneLiner: "Bringing TrainingManager365 into the unified mobile shell for the frontline.",
    status: "in-progress",
    phase: "h1-2026",
    layer: "Unified Mobile Experience",
    problemToday:
      "Frontline crews juggle multiple apps for procedures, training and reporting. Context is lost between tools and adoption suffers.",
    whatWereDelivering: [
      "Native training screens inside the existing Comply iOS mobile app",
      "Single sign-on and shared identity with documents and safety reporting",
      "Consistent navigation and offline behaviour across modules",
    ],
    dtop: {
      detect: "Training assignment created in TrainingManager365",
      trigger: "Module surfaced to the right user on their existing mobile shell",
      orchestrate: "Completion synced back into TrainingManager365 with device context",
      prove: "Training currency visible alongside document and safety activity for the same user",
    },
    customerOutcomes: [
      "Removes a separate training app from the frontline workflow",
      "Increases training completion through reduced friction",
      "Lays the foundation for one trusted shell on every device",
    ],
    modules: ["TrainingManager365", "Unified Mobile"],
  },
  // ──────────────── H2 2026 ────────────────
  {
    id: "ui-standardisation",
    slideNumber: 7,
    title: "Standardise UI Fonts, Colors & Patterns",
    oneLiner: "One platform, one experience — across every module and surface.",
    status: "in-progress",
    phase: "h2-2026",
    layer: "Unified Experience",
    problemToday:
      "Each module evolved with its own visual language. Users feel the seams when they cross module boundaries, and training overhead grows.",
    whatWereDelivering: [
      "A shared design system applied consistently across all platform modules",
      "Unified typography, color, iconography and interaction patterns",
      "A noticeable lift in perceived quality and ease of use",
    ],
    dtop: {
      detect: "Inconsistencies inventoried across all module surfaces",
      trigger: "Design tokens and components rolled into each module's release train",
      orchestrate: "Phased delivery with no disruption to in-flight customer work",
      prove: "Single look-and-feel verified across SafetyManager365, ContentManager365, TrainingManager365",
    },
    customerOutcomes: [
      "Reduces user training and change-management cost",
      "Reinforces the platform story — one product, not three",
      "Sets the visual baseline for everything we ship next",
    ],
    modules: ["SafetyManager365", "ContentManager365", "TrainingManager365"],
  },
  {
    id: "regdb-replatform-rollout",
    slideNumber: 8,
    title: "Regulation Database Replatforming — Rollout",
    oneLiner: "Production rollout of the modern regulation substrate.",
    status: "in-progress",
    phase: "h2-2026",
    layer: "Operational Data Foundation",
    problemToday:
      "The POC proved the model. Customers still depend on the legacy store, which throttles regulatory velocity and integration ambition.",
    whatWereDelivering: [
      "Migration from the legacy regulation store to the new platform-grade database",
      "Performance, query and integration improvements across consuming modules",
      "Hardened operational tooling for ongoing regulatory ingestion",
    ],
    dtop: {
      detect: "Regulatory authority publishes an update",
      trigger: "Update flows into the live regulation substrate at production scale",
      orchestrate: "Connected modules consume the change in real time",
      prove: "Regulatory throughput and freshness measured against the legacy baseline",
    },
    customerOutcomes: [
      "Materially faster regulatory updates in customer environments",
      "Removes a long-standing platform constraint",
      "Unlocks the next wave of regulation-driven automation",
    ],
    modules: ["Regulation Management", "ContentManager365"],
  },
  {
    id: "safety-mobile",
    slideNumber: 9,
    title: "Safety Reporting in the Comply iOS Mobile App",
    oneLiner: "Capture safety events in the moment, on the same device, in the same shell.",
    status: "in-progress",
    phase: "h2-2026",
    layer: "Unified Mobile Experience",
    problemToday:
      "Safety reports are filed late or not at all because the workflow lives in a separate tool. The richest signals are lost closest to the event.",
    whatWereDelivering: [
      "Native safety reporting screens inside the unified Comply iOS app",
      "Context-aware capture (role, location, linked procedure) with offline support",
      "Direct flow into SafetyManager365 with full chain of evidence",
    ],
    dtop: {
      detect: "Frontline user observes and reports a safety event on device",
      trigger: "Report ingested and classified by SafetyManager365",
      orchestrate: "Routed to the right investigator with linked procedure and training context",
      prove: "Time-to-report and signal richness measurably improved",
    },
    customerOutcomes: [
      "More events captured, captured faster, captured with better context",
      "Stronger signal quality feeding Insights & Automation",
      "One mobile shell now covers procedures, training and safety",
    ],
    modules: ["SafetyManager365", "Unified Mobile"],
  },
  {
    id: "automation-platform-poc",
    slideNumber: 10,
    title: "Platform-wide Automation — POC",
    oneLiner: "Extending the proven automation pattern across every module's events.",
    status: "planned",
    phase: "h2-2026",
    layer: "Intelligence & Orchestration Layer",
    problemToday:
      "Automation today is targeted. Many high-value cross-module workflows remain manual because no single owner can wire them up.",
    whatWereDelivering: [
      "An automation POC spanning Safety, Content, Training and Regulation events",
      "Cross-module policies that orchestrate end-to-end workflows",
      "Validation of governance, observability and rollback at platform scale",
    ],
    dtop: {
      detect: "Events from any module observed by the platform automation runtime",
      trigger: "Cross-module policies match and fire deterministically",
      orchestrate: "Workflow executes across SafetyManager365, ContentManager365 and TrainingManager365",
      prove: "Every action traceable, reversible and reportable",
    },
    customerOutcomes: [
      "Removes manual hand-offs between modules",
      "Proves the path to platform-wide rollout in 2027+",
      "Creates the operational backbone for connected operations",
    ],
    modules: ["SafetyManager365", "ContentManager365", "TrainingManager365", "Regulation Management"],
  },
  {
    id: "bi-platform-poc",
    slideNumber: 11,
    title: "Platform-wide Business Intelligence — POC",
    oneLiner: "One trusted view of operational performance across the whole platform.",
    status: "planned",
    phase: "h2-2026",
    layer: "Intelligence & Orchestration Layer",
    problemToday:
      "Reporting is module-by-module. Leaders stitch numbers together in spreadsheets and lose the connections that matter most.",
    whatWereDelivering: [
      "A platform-wide BI POC with a unified data model across modules",
      "Pre-built operational performance views and self-serve exploration",
      "Validation of governance, refresh and access at customer scale",
    ],
    dtop: {
      detect: "Operational data from every module landed in the unified model",
      trigger: "Cross-module measures recomputed on a defined cadence",
      orchestrate: "Views delivered to leaders with drill-down to the source events",
      prove: "Single number, single source of truth — auditable back to the event",
    },
    customerOutcomes: [
      "Ends the spreadsheet stitching exercise",
      "Gives leaders a single, defensible view of operational performance",
      "De-risks the 2027+ platform-wide BI rollout",
    ],
    modules: ["SafetyManager365", "ContentManager365", "TrainingManager365"],
  },
  // ──────────────── 2027+ ────────────────
  {
    id: "regmgmt-next-phase",
    slideNumber: 12,
    title: "Next-Phase Regulation Management Integration",
    oneLiner: "Compliance mappings, TM365 integration and automation triggers, end-to-end.",
    status: "planned",
    phase: "2027-plus",
    layer: "Operational Data Foundation",
    problemToday:
      "Regulation, content and training are linked but not yet orchestrated. Compliance change still requires human glue across systems.",
    whatWereDelivering: [
      "Synchronised compliance mappings across regulation, document and training",
      "Direct integration with TrainingManager365 for regulation-driven training change",
      "Regulation events as first-class triggers in the platform automation engine",
    ],
    dtop: {
      detect: "Regulation change detected in the live regulation substrate",
      trigger: "Linked controls, documents and training all flagged simultaneously",
      orchestrate: "Automation routes work to the right owners with regulatory context",
      prove: "End-to-end compliance lineage from clause to qualified workforce",
    },
    customerOutcomes: [
      "Closes the loop from regulation to trained workforce",
      "Removes the last manual seams in compliance change",
      "Makes regulation-driven operations a platform capability, not a project",
    ],
    modules: ["Regulation Management", "ContentManager365", "TrainingManager365"],
  },
  {
    id: "automation-platform-rollout",
    slideNumber: 13,
    title: "Platform-wide Automation — Rollout",
    oneLiner: "Production rollout of cross-module automation at customer scale.",
    status: "planned",
    phase: "2027-plus",
    layer: "Intelligence & Orchestration Layer",
    problemToday:
      "Even with strong modules and good intent, work still drags because nothing moves it forward automatically once an event lands.",
    whatWereDelivering: [
      "General availability of the platform automation engine",
      "Curated catalogue of high-value, cross-module automations",
      "Customer-facing tooling to author, govern and observe automations",
    ],
    dtop: {
      detect: "Any platform event, from any module",
      trigger: "Policies match and fire deterministically at production scale",
      orchestrate: "Work executed across the right modules, owners and systems",
      prove: "Every automated action measured for cycle-time and outcome",
    },
    customerOutcomes: [
      "Compresses operational cycle time across the customer's portfolio",
      "Replaces invisible manual effort with governed, measurable workflow",
      "Turns the platform into the system of work, not just the system of record",
    ],
    modules: ["SafetyManager365", "ContentManager365", "TrainingManager365", "Regulation Management"],
  },
  {
    id: "bi-platform-rollout",
    slideNumber: 14,
    title: "Platform-wide Business Intelligence — Rollout",
    oneLiner: "BI as a native platform capability, not a downstream consumer.",
    status: "planned",
    phase: "2027-plus",
    layer: "Intelligence & Orchestration Layer",
    problemToday:
      "BI sits outside the platform today. Leaders pay for the round-trip in time, trust and effort.",
    whatWereDelivering: [
      "Platform-native BI built on the unified operational data model",
      "Out-of-the-box and customer-extensible operational performance views",
      "Production-grade governance, performance and access control",
    ],
    dtop: {
      detect: "Continuous operational data from every module",
      trigger: "Measures and views refreshed on a defined cadence",
      orchestrate: "Insights delivered to the right roles, in their workflow",
      prove: "Single, trusted operational performance view across the enterprise",
    },
    customerOutcomes: [
      "Removes the BI round-trip from the leadership cadence",
      "Strengthens the case for the platform as the operational system of truth",
      "Feeds Recommendations and Automation with shared, trusted measures",
    ],
    modules: ["SafetyManager365", "ContentManager365", "TrainingManager365"],
  },
  {
    id: "mobile-unified",
    slideNumber: 15,
    title: "Unification of the Mobile Experience",
    oneLiner: "One trusted shell on every device — procedures, training, safety and beyond.",
    status: "planned",
    phase: "2027-plus",
    layer: "Unified Mobile Experience",
    problemToday:
      "The frontline still meets the platform through more than one app. Each one is a tax on adoption and a friction on signal capture.",
    whatWereDelivering: [
      "A fully unified mobile shell consolidating all frontline experiences",
      "Consistent identity, navigation and offline behaviour across modules",
      "A single place to ship new frontline capability",
    ],
    dtop: {
      detect: "Frontline activity captured against the right context, on one device",
      trigger: "Module-appropriate workflows initiated from a single shell",
      orchestrate: "Work flows back into the right system of record without context loss",
      prove: "Unified mobile usage and signal richness measurable across the workforce",
    },
    customerOutcomes: [
      "Eliminates the multi-app tax on the frontline",
      "Maximises signal capture and operational data quality",
      "Becomes the long-term delivery channel for the platform on the edge",
    ],
    modules: ["Unified Mobile", "SafetyManager365", "ContentManager365", "TrainingManager365"],
  },
  {
    id: "contextual-doc-tm365",
    slideNumber: 16,
    title: "Contextual Document Viewing from TrainingManager365",
    oneLiner: "The right procedure, surfaced in the moment of training.",
    status: "planned",
    phase: "2027-plus",
    layer: "Operational Data Foundation",
    problemToday:
      "Trainees learn against static content. The live, controlled procedure they will actually use lives somewhere else, in a different tool.",
    whatWereDelivering: [
      "In-context document viewing from inside TrainingManager365",
      "Always-current, version-controlled procedures rendered alongside training",
      "Bidirectional traceability with ContentManager365",
    ],
    dtop: {
      detect: "Trainee opens a module linked to a controlled procedure",
      trigger: "Live procedure rendered in context, at the correct version",
      orchestrate: "Reading and acknowledgement captured against the same training event",
      prove: "Training and document evidence stitched together for audit",
    },
    customerOutcomes: [
      "Closes the gap between learning and the live procedure",
      "Strengthens compliance evidence with cross-module context",
      "Reinforces the platform story: one source of truth for content",
    ],
    modules: ["TrainingManager365", "ContentManager365"],
  },
  {
    id: "insights-platform-rollout",
    slideNumber: 17,
    title: "Platform-wide Insights & Recommendations — Rollout",
    oneLiner: "Recommendations as a platform capability, embedded everywhere decisions are made.",
    status: "planned",
    phase: "2027-plus",
    layer: "Intelligence & Orchestration Layer",
    problemToday:
      "Insights live in dashboards leaders have to go and find. The recommendation, when it exists, is decoupled from the moment of decision.",
    whatWereDelivering: [
      "General availability of platform-wide Insights & Recommendations",
      "Recommended actions surfaced in the workflow, with the evidence behind them",
      "Continuous learning loop powered by the unified data model",
    ],
    dtop: {
      detect: "Patterns surfaced across every module on the platform",
      trigger: "Recommendation generated and routed to the accountable role in context",
      orchestrate: "Action initiated directly — often via the platform automation engine",
      prove: "Decision, action and outcome logged as the next round of training data",
    },
    customerOutcomes: [
      "Embeds intelligence in the workflow, not in a separate tool",
      "Compounds the value of every other capability on the roadmap",
      "Completes the move from system of record to system of intelligence",
    ],
    modules: ["SafetyManager365", "ContentManager365", "TrainingManager365"],
  },
];

export const phaseOrder: RoadmapPhase[] = ["h1-2026", "h2-2026", "2027-plus"];

export const useCasesByPhase = (phase: RoadmapPhase) =>
  roadmapUseCases.filter((uc) => uc.phase === phase);