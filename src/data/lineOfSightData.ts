// Line of Sight — From Use Case to Executive Outcome
// Real costed use cases driving computed leading measures and executive lagging metrics

export interface UseCaseInput {
  inputLabel: string;
  unit: string;
  baseline: number;
  min: number;
  max: number;
  step: number;
  costPerEvent: string;
  costMidpoint: number; // midpoint cost in dollars for computation
  annualisationFactor: number; // multiply by this to get annual (e.g. 12 for monthly, 4 for quarterly)
  costComponents: string[];
  severity: string;
  frequency: string;
}

export interface UseCase {
  id: string;
  label: string;
  description: string;
  input: UseCaseInput;
  impactOnMeasures: Record<string, number>; // measure id -> weight
  methodology: string;
}

export interface LeadingMeasure {
  id: string;
  label: string;
  shortLabel: string;
  baselineValue: number;
  unit: string;
  direction: "up" | "down";
}

export interface LaggingMetric {
  id: string;
  label: string;
  baselineValue: number;
  unit: string;
  direction: "up" | "down";
  weights: Record<string, number>; // leading measure id -> weight
}

export interface ExecutiveOutcome {
  id: string;
  stakeholder: "CEO" | "CFO" | "COO";
  icon: string;
  color: string;
  accentColor: string;
  metrics: LaggingMetric[];
}

// ─── Use Cases ────────────────────────────────────────────────────────

export const useCases: UseCase[] = [
  {
    id: "uc1",
    label: "Go-Around Events",
    description:
      "An unplanned aborted landing requiring another approach, increasing fuel burn and network disruption.",
    input: {
      inputLabel: "Go-arounds per month",
      unit: "events",
      baseline: 12,
      min: 0,
      max: 30,
      step: 1,
      costPerEvent: "$5K–$20K per event",
      costMidpoint: 12500,
      annualisationFactor: 12,
      costComponents: [
        "Additional fuel burn",
        "Crew duty-time impact",
        "Knock-on delays",
        "Increased maintenance wear",
      ],
      severity: "Medium",
      frequency: "High",
    },
    impactOnMeasures: { lm1: 0.15, lm3: 0.15, lm4: 0.1 },
    methodology:
      "We reduce go-around frequency through improved crew procedure orchestration and real-time decision support.",
  },
  {
    id: "uc2",
    label: "AOG & Unscheduled Maintenance",
    description:
      "An aircraft unable to operate due to technical, airworthiness, or compliance issues.",
    input: {
      inputLabel: "AOG days per month",
      unit: "days",
      baseline: 8,
      min: 0,
      max: 20,
      step: 1,
      costPerEvent: "$10K–$150K per day",
      costMidpoint: 80000,
      annualisationFactor: 12,
      costComponents: [
        "Lost revenue",
        "Passenger re-accommodation",
        "Recovery logistics",
        "Network disruption",
      ],
      severity: "High",
      frequency: "Medium",
    },
    impactOnMeasures: { lm2: 0.35, lm3: 0.2 },
    methodology:
      "We accelerate recovery by orchestrating cross-functional response — reducing grounding duration and cost impact.",
  },
  {
    id: "uc3",
    label: "Flight Delays & OTP",
    description:
      "Operational delays that reduce schedule reliability and create downstream network impact.",
    input: {
      inputLabel: "Avg delay minutes per day",
      unit: "mins",
      baseline: 45,
      min: 0,
      max: 120,
      step: 1,
      costPerEvent: "$75–$200 per minute",
      costMidpoint: 137.5,
      annualisationFactor: 365,
      costComponents: [
        "Crew overtime",
        "Passenger compensation",
        "Slot penalties",
        "Cascade effects across rotations",
      ],
      severity: "Medium",
      frequency: "Very High",
    },
    impactOnMeasures: { lm2: 0.15, lm3: 0.35, lm6: 0.2 },
    methodology:
      "We reduce delay propagation through connected schedule, crew, and maintenance orchestration.",
  },
  {
    id: "uc4",
    label: "Fuel Performance Degradation",
    description:
      "Operational inefficiencies that increase fuel burn above plan. 1% fuel variance = $5M–$20M+ annually for a Tier 1 carrier.",
    input: {
      inputLabel: "Fuel variance above plan",
      unit: "%",
      baseline: 3.2,
      min: 0,
      max: 8,
      step: 0.1,
      costPerEvent: "1% = $5M–$20M per year",
      costMidpoint: 12500000,
      annualisationFactor: 1, // already annual per %
      costComponents: [
        "Excess burn per sector",
        "Reduced operating margin",
        "Carbon exposure",
        "Competitive cost disadvantage",
      ],
      severity: "Very High",
      frequency: "Continuous",
    },
    impactOnMeasures: { lm1: 0.5, lm4: 0.05 },
    methodology:
      "We connect flight data monitoring to procedure and training orchestration — closing the loop between detection and action.",
  },
  {
    id: "uc5",
    label: "Crew & Passenger Injury",
    description:
      "Injuries occurring in-flight or during ground operations.",
    input: {
      inputLabel: "Injury incidents per quarter",
      unit: "incidents",
      baseline: 4,
      min: 0,
      max: 12,
      step: 1,
      costPerEvent: "$20K–$250K per incident",
      costMidpoint: 135000,
      annualisationFactor: 4,
      costComponents: [
        "Compensation claims",
        "Lost-time productivity",
        "Insurance impact",
        "Legal exposure",
      ],
      severity: "Medium",
      frequency: "Low",
    },
    impactOnMeasures: { lm4: 0.3, lm6: 0.15 },
    methodology:
      "We shift from reactive incident management to proactive risk orchestration — detecting patterns before they cause harm.",
  },
  {
    id: "uc6",
    label: "Regulatory Fines & Findings",
    description:
      "Penalties or enforcement actions resulting from non-compliance.",
    input: {
      inputLabel: "Findings per year",
      unit: "findings",
      baseline: 5,
      min: 0,
      max: 15,
      step: 1,
      costPerEvent: "$50K–$5M per finding",
      costMidpoint: 500000,
      annualisationFactor: 1,
      costComponents: [
        "Direct financial penalties",
        "Audit remediation effort",
        "Legal costs",
        "Increased regulatory oversight",
      ],
      severity: "High",
      frequency: "Low",
    },
    impactOnMeasures: { lm5: 0.4, lm4: 0.1 },
    methodology:
      "We eliminate the gap between regulatory change and operational compliance — with full traceability.",
  },
  {
    id: "uc7",
    label: "Insurance Premium Escalation",
    description:
      "Premium increases driven by safety performance trends and risk profile.",
    input: {
      inputLabel: "Premium increase",
      unit: "%",
      baseline: 6,
      min: 0,
      max: 15,
      step: 0.5,
      costPerEvent: "$1M–$10M per year",
      costMidpoint: 5500000,
      annualisationFactor: 1,
      costComponents: [
        "Higher premiums",
        "Increased deductibles",
        "Claims exposure",
        "Risk rating impact",
      ],
      severity: "High",
      frequency: "Annual",
    },
    impactOnMeasures: { lm5: 0.2, lm4: 0.15 },
    methodology:
      "We make compliance provable by default — shifting from reactive evidence assembly to continuous proof.",
  },
  {
    id: "uc8",
    label: "Baggage & Passenger Misalignment",
    description:
      "Operational failures where baggage and passengers are separated or mishandled.",
    input: {
      inputLabel: "Mishandled bags per 1,000 pax",
      unit: "bags",
      baseline: 8,
      min: 0,
      max: 20,
      step: 0.5,
      costPerEvent: "$100–$350 per bag",
      costMidpoint: 225,
      annualisationFactor: 12,
      costComponents: [
        "Compensation payments",
        "Rehandling logistics",
        "Customer dissatisfaction",
        "Brand impact",
      ],
      severity: "Low",
      frequency: "Very High",
    },
    impactOnMeasures: { lm6: 0.35 },
    methodology:
      "We connect ground operations, crew coordination, and passenger systems to reduce mishandling at source.",
  },
];

// ─── Leading Measures (Computed from Use Cases) ───────────────────────

export const leadingMeasures: LeadingMeasure[] = [
  {
    id: "lm1",
    label: "Fuel variance above plan",
    shortLabel: "Fuel Variance",
    baselineValue: 3.2,
    unit: "%",
    direction: "down",
  },
  {
    id: "lm2",
    label: "Fleet availability rate",
    shortLabel: "Fleet Availability",
    baselineValue: 91,
    unit: "%",
    direction: "up",
  },
  {
    id: "lm3",
    label: "On-time performance",
    shortLabel: "OTP",
    baselineValue: 78,
    unit: "%",
    direction: "up",
  },
  {
    id: "lm4",
    label: "Safety event recurrence rate",
    shortLabel: "Safety Recurrence",
    baselineValue: 12,
    unit: "%",
    direction: "down",
  },
  {
    id: "lm5",
    label: "Audit & compliance readiness",
    shortLabel: "Audit Readiness",
    baselineValue: 120,
    unit: "hrs",
    direction: "down",
  },
  {
    id: "lm6",
    label: "Passenger experience score",
    shortLabel: "Pax Experience",
    baselineValue: 72,
    unit: "pts",
    direction: "up",
  },
];

// ─── Executive Outcomes (Lagging Metrics) ─────────────────────────────

export const executiveOutcomes: ExecutiveOutcome[] = [
  {
    id: "cfo",
    stakeholder: "CFO",
    icon: "TrendingUp",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
    accentColor: "emerald",
    metrics: [
      {
        id: "fuel-cost-savings",
        label: "Fuel Cost Savings",
        baselineValue: 0,
        unit: "$M",
        direction: "up",
        weights: { lm1: 0.6 },
      },
      {
        id: "irops-cost-avoidance",
        label: "IrOps Cost Avoidance",
        baselineValue: 0,
        unit: "$M",
        direction: "up",
        weights: { lm2: 0.3, lm3: 0.4 },
      },
      {
        id: "insurance-reduction",
        label: "Insurance Premium Reduction",
        baselineValue: 0,
        unit: "$M",
        direction: "up",
        weights: { lm4: 0.3, lm5: 0.3 },
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
        label: "Brand & Reputation",
        baselineValue: 72,
        unit: "pts",
        direction: "up",
        weights: { lm4: 0.3, lm6: 0.4 },
      },
      {
        id: "regulatory-standing",
        label: "Regulatory Standing",
        baselineValue: 85,
        unit: "%",
        direction: "up",
        weights: { lm5: 0.4, lm4: 0.2 },
      },
      {
        id: "revenue-protection",
        label: "Revenue Protection",
        baselineValue: 0,
        unit: "$M",
        direction: "up",
        weights: { lm3: 0.35, lm6: 0.2 },
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
        weights: { lm3: 0.5, lm2: 0.2 },
      },
      {
        id: "fleet-readiness",
        label: "Fleet Readiness",
        baselineValue: 91,
        unit: "%",
        direction: "up",
        weights: { lm2: 0.5 },
      },
      {
        id: "labour-effectiveness",
        label: "Labour Effectiveness",
        baselineValue: 68,
        unit: "%",
        direction: "up",
        weights: { lm3: 0.2, lm4: 0.3 },
      },
    ],
  },
];

// ─── Computation Functions ────────────────────────────────────────────

/**
 * Compute a leading measure value based on use case input reductions.
 * When a use case input decreases from baseline, it improves connected leading measures.
 */
export function computeLeadingMeasure(
  measure: LeadingMeasure,
  useCaseInputValues: Record<string, number>,
  allUseCases: UseCase[]
): number {
  let totalImprovementPct = 0;

  for (const uc of allUseCases) {
    const weight = uc.impactOnMeasures[measure.id];
    if (!weight) continue;

    const current = useCaseInputValues[uc.id] ?? uc.input.baseline;
    const baseline = uc.input.baseline;
    if (baseline === 0) continue;

    const reductionPct = ((baseline - current) / baseline) * 100;
    totalImprovementPct += weight * reductionPct;
  }

  if (measure.direction === "down") {
    // Lower is better (e.g. fuel variance, safety recurrence, audit hours)
    return Math.max(
      0,
      Math.round(
        measure.baselineValue * (1 - totalImprovementPct / 100) * 100
      ) / 100
    );
  }
  // Higher is better (e.g. fleet availability, OTP, pax experience)
  return (
    Math.round(
      measure.baselineValue * (1 + totalImprovementPct / 100) * 100
    ) / 100
  );
}

/**
 * Compute an executive lagging metric from leading measure values.
 */
export function computeMetricValue(
  metric: LaggingMetric,
  leadingValues: Record<string, number>,
  measures: LeadingMeasure[]
): number {
  let totalImprovement = 0;

  for (const [measureId, weight] of Object.entries(metric.weights)) {
    const measure = measures.find((m) => m.id === measureId);
    if (!measure) continue;

    const current = leadingValues[measureId] ?? measure.baselineValue;
    const improvementPct =
      measure.direction === "down"
        ? ((measure.baselineValue - current) / measure.baselineValue) * 100
        : ((current - measure.baselineValue) / measure.baselineValue) * 100;

    totalImprovement += weight * improvementPct;
  }

  if (metric.unit === "$M") {
    // For dollar metrics, compute as a portion of total cost avoidance
    return Math.round(totalImprovement * 0.5 * 10) / 10; // scale factor
  }

  if (metric.direction === "up") {
    return (
      Math.round(
        metric.baselineValue * (1 + totalImprovement / 100) * 10
      ) / 10
    );
  }
  return (
    Math.round(
      metric.baselineValue * (1 - totalImprovement / 100) * 10
    ) / 10
  );
}

// ─── Airline Profile ──────────────────────────────────────────────────

export interface AirlineProfile {
  fleetSize: number;
  annualFuelSpendM: number; // in $M
  dailyDepartures: number;
  annualPassengersM: number; // in millions
  revenuePerFlight: number; // in $
}

export const defaultProfile: AirlineProfile = {
  fleetSize: 50,
  annualFuelSpendM: 500,
  dailyDepartures: 150,
  annualPassengersM: 20,
  revenuePerFlight: 25000,
};

export const airlinePresets: { label: string; profile: AirlineProfile }[] = [
  {
    label: "Regional",
    profile: {
      fleetSize: 25,
      annualFuelSpendM: 120,
      dailyDepartures: 60,
      annualPassengersM: 5,
      revenuePerFlight: 12000,
    },
  },
  {
    label: "Mid-Size",
    profile: {
      fleetSize: 80,
      annualFuelSpendM: 600,
      dailyDepartures: 200,
      annualPassengersM: 30,
      revenuePerFlight: 28000,
    },
  },
  {
    label: "Tier 1",
    profile: {
      fleetSize: 200,
      annualFuelSpendM: 2000,
      dailyDepartures: 500,
      annualPassengersM: 80,
      revenuePerFlight: 35000,
    },
  },
];

/**
 * Scale a use case's cost-per-event based on the airline profile.
 */
export function computeScaledCostMidpoint(
  uc: UseCase,
  profile: AirlineProfile
): number {
  const def = defaultProfile;
  switch (uc.id) {
    case "uc1": // Go-arounds — scales with daily departures
      return uc.input.costMidpoint * (profile.dailyDepartures / def.dailyDepartures);
    case "uc2": // AOG — scales with revenue per flight
      return uc.input.costMidpoint * (profile.revenuePerFlight / def.revenuePerFlight);
    case "uc3": // Delays — scales with daily departures
      return uc.input.costMidpoint * (profile.dailyDepartures / def.dailyDepartures);
    case "uc4": // Fuel — scales directly with annual fuel spend
      return (profile.annualFuelSpendM * 1_000_000) / 100; // 1% of fuel spend
    case "uc5": // Injuries — scales with passengers
      return uc.input.costMidpoint * (profile.annualPassengersM / def.annualPassengersM);
    case "uc6": // Regulatory — relatively fixed
      return uc.input.costMidpoint;
    case "uc7": // Insurance — scales with fleet size
      return uc.input.costMidpoint * (profile.fleetSize / def.fleetSize);
    case "uc8": // Baggage — scales with passengers
      return uc.input.costMidpoint * (profile.annualPassengersM / def.annualPassengersM);
    default:
      return uc.input.costMidpoint;
  }
}

/**
 * Compute annualised cost avoidance for a single use case input reduction.
 */
export function computeUseCaseCostImpact(
  uc: UseCase,
  currentValue: number,
  profile?: AirlineProfile
): number {
  const reduction = uc.input.baseline - currentValue;
  if (reduction <= 0) return 0;
  const midpoint = profile
    ? computeScaledCostMidpoint(uc, profile)
    : uc.input.costMidpoint;
  return reduction * midpoint * uc.input.annualisationFactor;
}
