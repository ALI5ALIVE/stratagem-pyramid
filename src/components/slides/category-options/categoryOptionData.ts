// SUPERSEDED — these category-naming explorations ("Operational Excellence",
// "Operational Orchestration", "Operational Performance", "Operational Assurance")
// are NOT used in any active customer-facing deck. The canonical platform name
// is the "Operational Performance Platform" — see src/data/platformPlaybook.ts.
// This file is retained for internal historical reference only.
import { LucideIcon, Link, Zap, CheckCircle2, Brain, Layers } from "lucide-react";

// Type definitions
export interface CategoryOption {
  name: string;
  definition: string;
  narrativeSpine: string[];
}

export interface PointOfView {
  marketShift: string;
  coreProblem: string;
  opportunity: string;
}

export interface Pillar {
  icon: LucideIcon;
  title: string;
  tagline: string;
}

export interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CategorySlideData {
  category: CategoryOption;
  pointOfView: PointOfView;
  pillars: Pillar[];
  pros: string[];
  cons: string[];
  executiveRationale: string;
  categoryPromise: string;
}

// Shared Platform Capabilities (same across all 4)
export const platformCapabilities: Capability[] = [
  {
    icon: Layers,
    title: "Shared Data & Governance",
    description: "Shared models, taxonomies, and knowledge maps across safety, content, and training."
  },
  {
    icon: Zap,
    title: "Integrated Automation",
    description: "Threshold-driven, role-aware workflows with configurable orchestration."
  },
  {
    icon: Brain,
    title: "Embedded Intelligence",
    description: "Transparent, explainable AI embedded into workflows that evolves with usage."
  }
];

// Pillar icons (shared structure)
export const pillarIcons = {
  connectedFoundation: Link,
  continuousImprovement: Zap,
  proofAtScale: CheckCircle2,
  aiAccelerator: Brain
};

// ====================
// EXCELLENCE DATA
// ====================
export const excellenceData: CategorySlideData = {
  category: {
    name: "Operational Excellence Platform",
    definition: "A platform that instills a culture of continuous improvement across safety, content, and training — embedding excellence into daily operations.",
    narrativeSpine: ["Aspire", "Embed", "Sustain", "Excel"]
  },
  pointOfView: {
    marketShift: "Excellence is no longer optional — it's the foundation of competitive advantage in regulated industries.",
    coreProblem: "Point solutions focus on tasks, not culture. They can't instill the mindset shift needed for sustainable excellence.",
    opportunity: "A platform that makes excellence systematic, measurable, and embedded into every workflow."
  },
  pillars: [
    { icon: Link, title: "Connected Foundation", tagline: "Unite the system of excellence" },
    { icon: Zap, title: "Continuous Improvement", tagline: "Make improvement a daily habit" },
    { icon: CheckCircle2, title: "Proof at Scale", tagline: "Evidence that excellence is real" },
    { icon: Brain, title: "AI Accelerator", tagline: "AI identifies improvement opportunities" }
  ],
  pros: [
    "Executive resonance — \"Excellence\" is CEO/Board-level language",
    "Cultural transformation narrative — supports change management",
    "Differentiates from tactical tool vendors",
    "Aligns with Lean/Six Sigma methodologies many ops teams already use"
  ],
  cons: [
    "\"Excellence\" is subjective — hard to measure directly",
    "Competes with consulting firms (McKinsey, BCG) for mindshare",
    "May feel aspirational vs. actionable to IT/Ops buyers",
    "Lacks specificity — could mean anything"
  ],
  executiveRationale: "Use 'Operational Excellence Platform' when the conversation is about culture change, strategic transformation, or board-level operational strategy. This frame works best when the buyer is thinking about long-term competitive advantage, not immediate operational fixes.",
  categoryPromise: "Make operational excellence systematic, sustainable, and provable."
};

// ====================
// ORCHESTRATION DATA
// ====================
export const orchestrationData: CategorySlideData = {
  category: {
    name: "Operational Orchestration Platform",
    definition: "A platform that coordinates workflows across safety, content, and training — turning fragmented processes into orchestrated execution.",
    narrativeSpine: ["Connect", "Coordinate", "Execute", "Verify"]
  },
  pointOfView: {
    marketShift: "Operations are increasingly complex. Success depends on coordination, not just individual tool performance.",
    coreProblem: "Siloed systems create handoff gaps, delays, and errors. No one owns the orchestration layer.",
    opportunity: "A platform that owns the coordination layer and ensures every process flows seamlessly."
  },
  pillars: [
    { icon: Link, title: "Connected Foundation", tagline: "Single source of truth for workflows" },
    { icon: Zap, title: "Continuous Improvement", tagline: "Orchestrate change across systems" },
    { icon: CheckCircle2, title: "Proof at Scale", tagline: "Verify every step completed" },
    { icon: Brain, title: "AI Accelerator", tagline: "AI optimizes orchestration paths" }
  ],
  pros: [
    "Clear technical differentiation — \"Orchestration\" is a defined market (iPaaS, BPM)",
    "Appeals to IT leaders and process owners",
    "Action-oriented language — emphasizes execution",
    "Positions platform as the \"coordination layer\""
  ],
  cons: [
    "Technical/IT language — may not resonate with C-suite",
    "Risks being categorized as middleware/iPaaS",
    "\"Orchestration\" implies complexity — may intimidate smaller ops teams",
    "Less emotional — purely functional positioning"
  ],
  executiveRationale: "Use 'Operational Orchestration Platform' when the buyer is focused on process efficiency, system integration, and workflow coordination. This frame works best with IT leaders, process owners, and organizations struggling with tool sprawl.",
  categoryPromise: "Orchestrate every operational workflow from signal to proof."
};

// ====================
// PERFORMANCE DATA
// ====================
export const performanceData: CategorySlideData = {
  category: {
    name: "Operational Performance Platform",
    definition: "A platform that drives measurable operational outcomes across safety, content, and training — connecting inputs to performance metrics.",
    narrativeSpine: ["Detect", "Drive", "Measure", "Improve"]
  },
  pointOfView: {
    marketShift: "Operations is now measured by outcomes, not activities. COOs are accountable for performance metrics, not tool adoption.",
    coreProblem: "Current tools track activities but can't prove their impact on actual operational performance.",
    opportunity: "A platform that connects operational activities to measurable performance outcomes."
  },
  pillars: [
    { icon: Link, title: "Connected Foundation", tagline: "Performance data in one place" },
    { icon: Zap, title: "Continuous Improvement", tagline: "Drive performance improvements" },
    { icon: CheckCircle2, title: "Proof at Scale", tagline: "Measure what matters" },
    { icon: Brain, title: "AI Accelerator", tagline: "AI predicts performance issues" }
  ],
  pros: [
    "Outcome-focused — speaks COO/CFO language",
    "Measurable and defensible (KPIs, metrics, ROI)",
    "Aligns with business value conversations",
    "Clear differentiation from activity-tracking tools"
  ],
  cons: [
    "Competes with BI/Analytics vendors for positioning",
    "May be perceived as \"just dashboards\"",
    "\"Performance\" without \"Readiness\" loses training/competency scope",
    "Less differentiated in crowded \"performance\" market"
  ],
  executiveRationale: "Use 'Operational Performance Platform' when the conversation is about ROI, measurable outcomes, and accountability. This frame works best with COOs, CFOs, and buyers who need to justify investment with hard metrics.",
  categoryPromise: "Turn every operational activity into measurable performance."
};

// ====================
// ASSURANCE DATA
// ====================
export const assuranceData: CategorySlideData = {
  category: {
    name: "Operational Assurance Platform",
    definition: "A platform that provides confidence in operational compliance, governance, and audit-readiness across safety, content, and training.",
    narrativeSpine: ["Govern", "Control", "Verify", "Assure"]
  },
  pointOfView: {
    marketShift: "Regulatory scrutiny is intensifying. Organizations need continuous assurance, not point-in-time audits.",
    coreProblem: "Current compliance tools are reactive and siloed. They prove compliance after the fact, not in real-time.",
    opportunity: "A platform that provides continuous assurance and audit-readiness by default."
  },
  pillars: [
    { icon: Link, title: "Connected Foundation", tagline: "Unified compliance record" },
    { icon: Zap, title: "Continuous Improvement", tagline: "Controlled change with audit trails" },
    { icon: CheckCircle2, title: "Proof at Scale", tagline: "Always audit-ready" },
    { icon: Brain, title: "AI Accelerator", tagline: "AI flags compliance risks early" }
  ],
  pros: [
    "Strong regulatory/compliance resonance",
    "Appeals to risk, legal, and compliance buyers",
    "\"Assurance\" implies trust and confidence",
    "Clear differentiation in regulated industries"
  ],
  cons: [
    "Backward-looking perception — focuses on proof, not improvement",
    "May pigeonhole platform as \"compliance tool\"",
    "Less appealing to forward-looking COOs focused on growth",
    "\"Assurance\" sounds like audit, not operations"
  ],
  executiveRationale: "Use 'Operational Assurance Platform' when the buyer's primary concern is regulatory compliance, audit preparation, or risk management. This frame works best with compliance officers, legal teams, and organizations facing regulatory pressure.",
  categoryPromise: "Deliver continuous assurance and audit-ready proof by default."
};
