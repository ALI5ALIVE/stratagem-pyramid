// Line of Sight — From Use Case to Executive Outcome
// Data definitions for the three-tier cascade

export interface LaggingMetric {
  id: string;
  label: string;
  baselineValue: number;
  unit: string;
  direction: "up" | "down";
  weights: Record<string, number>;
}

export interface ExecutiveOutcome {
  id: string;
  stakeholder: "CEO" | "CFO" | "COO";
  icon: string;
  color: string;
  accentColor: string;
  metrics: LaggingMetric[];
}

export interface LeadingMeasure {
  id: string;
  label: string;
  shortLabel: string;
  baselineValue: number;
  unit: string;
  direction: "down";
  connectedOutcomes: string[];
}

export interface UseCaseInput {
  label: string;
  unit: string;
  baselineValue: number;
  min: number;
  max: number;
  step: number;
}

export interface UseCase {
  id: string;
  label: string;
  description: string;
  connectedMeasures: string[];
  methodology: string;
  input: UseCaseInput;
  impactOnMeasures: Record<string, number>; // leading measure id → weight
}

export const executiveOutcomes: ExecutiveOutcome[] = [
  {
    id: "cfo",
    stakeholder: "CFO",
    icon: "TrendingUp",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
    accentColor: "emerald",
    metrics: [
      {
        id: "cost-reduction",
        label: "Cost Reduction",
        baselineValue: 8,
        unit: "%",
        direction: "up",
        weights: { lm2: 0.3, lm4: 0.25, lm6: 0.2 },
      },
      {
        id: "revenue-protection",
        label: "Revenue Protection",
        baselineValue: 12,
        unit: "$M",
        direction: "up",
        weights: { lm4: 0.35, lm5: 0.25, lm2: 0.15 },
      },
      {
        id: "insurance-savings",
        label: "Insurance Savings",
        baselineValue: 4,
        unit: "%",
        direction: "up",
        weights: { lm2: 0.4, lm5: 0.2, lm6: 0.15 },
      },
    ],
  },
  {
    id: "ceo",
    stakeholder: "CEO",
    icon: "Crown",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    accentColor: "amber",
    metrics: [
      {
        id: "brand-reputation",
        label: "Brand Reputation",
        baselineValue: 72,
        unit: "pts",
        direction: "up",
        weights: { lm2: 0.3, lm3: 0.2, lm5: 0.15 },
      },
      {
        id: "regulatory-standing",
        label: "Regulatory Standing",
        baselineValue: 85,
        unit: "%",
        direction: "up",
        weights: { lm1: 0.25, lm5: 0.35, lm3: 0.15 },
      },
      {
        id: "operational-resilience",
        label: "Operational Resilience",
        baselineValue: 68,
        unit: "%",
        direction: "up",
        weights: { lm1: 0.2, lm3: 0.25, lm4: 0.2 },
      },
    ],
  },
  {
    id: "coo",
    stakeholder: "COO",
    icon: "Settings",
    color: "from-sky-500/20 to-sky-600/10 border-sky-500/30",
    accentColor: "sky",
    metrics: [
      {
        id: "on-time-performance",
        label: "On-Time Performance",
        baselineValue: 78,
        unit: "%",
        direction: "up",
        weights: { lm1: 0.3, lm4: 0.35, lm6: 0.1 },
      },
      {
        id: "fleet-readiness",
        label: "Fleet Readiness",
        baselineValue: 91,
        unit: "%",
        direction: "up",
        weights: { lm4: 0.25, lm1: 0.2, lm6: 0.2 },
      },
      {
        id: "schedule-integrity",
        label: "Schedule Integrity",
        baselineValue: 83,
        unit: "%",
        direction: "up",
        weights: { lm1: 0.3, lm4: 0.2, lm6: 0.25 },
      },
    ],
  },
];

export const leadingMeasures: LeadingMeasure[] = [
  {
    id: "lm1",
    label: "Time-to-implement procedure changes",
    shortLabel: "Change Cycle",
    baselineValue: 45,
    unit: "days",
    direction: "down",
    connectedOutcomes: ["ceo", "coo"],
  },
  {
    id: "lm2",
    label: "Recurring safety event rate",
    shortLabel: "Repeat Events",
    baselineValue: 12,
    unit: "%",
    direction: "down",
    connectedOutcomes: ["ceo", "cfo"],
  },
  {
    id: "lm3",
    label: "Training completion gap",
    shortLabel: "Training Gap",
    baselineValue: 18,
    unit: "%",
    direction: "down",
    connectedOutcomes: ["ceo", "coo"],
  },
  {
    id: "lm4",
    label: "Incident response time",
    shortLabel: "Response Time",
    baselineValue: 48,
    unit: "hrs",
    direction: "down",
    connectedOutcomes: ["coo", "cfo"],
  },
  {
    id: "lm5",
    label: "Document currency gap",
    shortLabel: "Doc Currency",
    baselineValue: 15,
    unit: "%",
    direction: "down",
    connectedOutcomes: ["ceo", "cfo"],
  },
  {
    id: "lm6",
    label: "Audit preparation effort",
    shortLabel: "Audit Prep",
    baselineValue: 120,
    unit: "hrs",
    direction: "down",
    connectedOutcomes: ["cfo", "coo"],
  },
];

export const useCases: UseCase[] = [
  {
    id: "uc1",
    label: "Smoke & Fumes Management",
    description:
      "End-to-end response orchestration for smoke and fumes events — from detection through investigation to crew retraining and procedure updates.",
    connectedMeasures: ["lm2", "lm4", "lm6"],
    methodology:
      "We shift your average response time and recurrence rate — moving the performance distribution toward best-case outcomes.",
    input: {
      label: "Smoke/fumes events per month",
      unit: "events",
      baselineValue: 8,
      min: 0,
      max: 20,
      step: 1,
    },
    impactOnMeasures: { lm2: 0.35, lm4: 0.25, lm6: 0.15 },
  },
  {
    id: "uc2",
    label: "Hard Landing Response",
    description:
      "Coordinated hard landing event management linking flight data, maintenance actions, crew debrief, and regulatory reporting.",
    connectedMeasures: ["lm2", "lm4", "lm5"],
    methodology:
      "We reduce worst-case occurrences by ensuring every hard landing triggers the right follow-up — automatically.",
    input: {
      label: "Hard landings per month",
      unit: "events",
      baselineValue: 6,
      min: 0,
      max: 15,
      step: 1,
    },
    impactOnMeasures: { lm2: 0.3, lm4: 0.3, lm5: 0.15 },
  },
  {
    id: "uc3",
    label: "Procedure Change Orchestration",
    description:
      "Governed workflow for procedure updates — from regulatory trigger through drafting, review, publication, and targeted training activation.",
    connectedMeasures: ["lm1", "lm3", "lm5"],
    methodology:
      "We compress the change cycle by connecting the trigger to the outcome — eliminating manual handoffs.",
    input: {
      label: "Procedure changes per quarter",
      unit: "changes",
      baselineValue: 12,
      min: 0,
      max: 30,
      step: 1,
    },
    impactOnMeasures: { lm1: 0.4, lm3: 0.2, lm5: 0.2 },
  },
  {
    id: "uc4",
    label: "Personalised Crew Training",
    description:
      "Role-aware, event-driven training that adapts to individual crew competency gaps and operational signals.",
    connectedMeasures: ["lm3", "lm1"],
    methodology:
      "We shift training from generic scheduling to targeted, signal-driven activation — improving completion and relevance.",
    input: {
      label: "Untrained crew per cycle",
      unit: "crew",
      baselineValue: 45,
      min: 0,
      max: 100,
      step: 1,
    },
    impactOnMeasures: { lm3: 0.45, lm1: 0.15 },
  },
  {
    id: "uc5",
    label: "AOG Response",
    description:
      "Aircraft on Ground response coordination — linking maintenance, crew scheduling, passenger handling, and regulatory notification.",
    connectedMeasures: ["lm4", "lm1", "lm6"],
    methodology:
      "We accelerate recovery by orchestrating cross-functional response — reducing delay minutes and cost impact.",
    input: {
      label: "AOG events per month",
      unit: "events",
      baselineValue: 3,
      min: 0,
      max: 10,
      step: 1,
    },
    impactOnMeasures: { lm4: 0.35, lm1: 0.15, lm6: 0.2 },
  },
  {
    id: "uc6",
    label: "Flight Data Monitoring Actions",
    description:
      "Turning flight data monitoring exceedances into orchestrated follow-up — investigation, training, and procedure review.",
    connectedMeasures: ["lm2", "lm4", "lm5"],
    methodology:
      "We close the loop between detection and action — ensuring every signal drives measurable improvement.",
    input: {
      label: "FOQA exceedances per month",
      unit: "events",
      baselineValue: 15,
      min: 0,
      max: 40,
      step: 1,
    },
    impactOnMeasures: { lm2: 0.25, lm4: 0.2, lm5: 0.25 },
  },
  {
    id: "uc7",
    label: "Regulatory Change Management",
    description:
      "Tracking regulatory amendments and cascading them through affected procedures, training, and compliance evidence.",
    connectedMeasures: ["lm1", "lm5", "lm6"],
    methodology:
      "We eliminate the gap between regulatory change and operational compliance — with full traceability.",
    input: {
      label: "Regulatory changes per quarter",
      unit: "changes",
      baselineValue: 8,
      min: 0,
      max: 20,
      step: 1,
    },
    impactOnMeasures: { lm1: 0.25, lm5: 0.3, lm6: 0.25 },
  },
  {
    id: "uc8",
    label: "Cabin Safety Compliance",
    description:
      "Managing cabin safety procedures, crew qualifications, and equipment checks with audit-ready evidence trails.",
    connectedMeasures: ["lm3", "lm6", "lm2"],
    methodology:
      "We make compliance provable by default — shifting from reactive evidence assembly to continuous proof.",
    input: {
      label: "Outstanding cabin findings",
      unit: "findings",
      baselineValue: 22,
      min: 0,
      max: 50,
      step: 1,
    },
    impactOnMeasures: { lm3: 0.25, lm6: 0.3, lm2: 0.15 },
  },
];

/**
 * Compute a leading measure's current value based on use case input adjustments.
 * When a use case input decreases from baseline, it improves connected leading measures.
 */
export function computeLeadingMeasureValue(
  measure: LeadingMeasure,
  ucInputValues: Record<string, number>
): number {
  let totalImprovementPct = 0;

  for (const uc of useCases) {
    const weight = uc.impactOnMeasures[measure.id];
    if (!weight) continue;

    const current = ucInputValues[uc.id] ?? uc.input.baselineValue;
    const improvementPct =
      ((uc.input.baselineValue - current) / uc.input.baselineValue) * 100;
    totalImprovementPct += weight * improvementPct;
  }

  // Leading measures go down when improved
  const newValue = measure.baselineValue * (1 - totalImprovementPct / 100);
  return Math.round(Math.max(0, newValue) * 10) / 10;
}

/**
 * Compute a lagging metric's current value based on leading measure values.
 */
export function computeMetricValue(
  metric: LaggingMetric,
  measureValues: Record<string, number>,
  measures: LeadingMeasure[]
): number {
  let totalImprovement = 0;

  for (const [measureId, weight] of Object.entries(metric.weights)) {
    const measure = measures.find((m) => m.id === measureId);
    if (!measure) continue;

    const current = measureValues[measureId] ?? measure.baselineValue;
    const improvementPct =
      ((measure.baselineValue - current) / measure.baselineValue) * 100;
    totalImprovement += weight * improvementPct;
  }

  if (metric.direction === "up") {
    return Math.round(metric.baselineValue * (1 + totalImprovement / 100) * 10) / 10;
  }
  return Math.round(metric.baselineValue * (1 - totalImprovement / 100) * 10) / 10;
}
