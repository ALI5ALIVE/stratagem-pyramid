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
  platformMechanism: string; // DTOP chain: Detect -> Trigger -> Orchestrate -> Prove
  pointSolutionGap: string; // What point solutions miss vs connected platform
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
      costPerEvent: "$5K–$25K per event",
      costMidpoint: 15000,
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
      "We reduce go-around frequency by connecting FOQA trend detection to procedure updates and targeted crew training — closing the loop between what's detected and what's trained.",
    platformMechanism: "Detect (FOQA exceedance trends) → Trigger (procedure review) → Orchestrate (targeted sim training for high-risk crews) → Prove (reduced recurrence rate)",
    pointSolutionGap: "A standalone safety tool detects the trend. A standalone TMS delivers training. Only the connected platform ensures the right crews get the right training based on the specific procedural gap identified.",
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
      costPerEvent: "$100K–$500K per day",
      costMidpoint: 300000,
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
      "We reduce unscheduled groundings by ensuring maintenance procedures reflect latest airworthiness directives, engineers are trained on current MEL/CDL changes, and compliance gaps are detected before they ground aircraft.",
    platformMechanism: "Detect (AD/SB compliance gap or recurring MEL item) → Trigger (procedure and job card update) → Orchestrate (engineer competency verification) → Prove (airworthiness compliance evidence)",
    pointSolutionGap: "A content system publishes the updated procedure. A TMS tracks who completed training. Only the connected platform verifies the procedure was updated, the right engineers were trained, and the compliance evidence is audit-ready — before the aircraft is grounded.",
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
      costPerEvent: "$80–$200 per minute",
      costMidpoint: 140,
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
      "We reduce procedural and training-driven delays by ensuring ground handling, turnaround, and dispatch procedures are current, crew are trained on latest SOPs, and deviations trigger corrective action automatically.",
    platformMechanism: "Detect (delay root cause analysis reveals procedural non-compliance) → Trigger (SOP update for ground ops) → Orchestrate (crew briefing and training update) → Prove (reduced recurrence of same-cause delays)",
    pointSolutionGap: "An OTP dashboard shows you're late. Only the connected platform traces delay causes back to procedural gaps, triggers the right SOP update, retrains affected crews, and proves the fix worked.",
  },
  {
    id: "uc4",
    label: "Human-Factor Fuel Variance",
    description:
      "The portion of excess fuel burn attributable to procedural non-compliance, crew technique variance, and preventable go-arounds — the human-factor costs controllable through training and procedure orchestration.",
    input: {
      inputLabel: "Human-factor fuel variance above plan",
      unit: "%",
      baseline: 3.2,
      min: 0,
      max: 8,
      step: 0.1,
      costPerEvent: "1% human-factor variance = $800K–$3M per year",
      costMidpoint: 2000000,
      annualisationFactor: 1, // already annual per %
      costComponents: [
        "Procedural non-compliance burn",
        "Crew technique variance",
        "Go-around fuel impact",
        "Unstabilised approach excess burn",
      ],
      severity: "High",
      frequency: "Continuous",
    },
    impactOnMeasures: { lm1: 0.5, lm4: 0.05 },
    methodology:
      "We connect flight data monitoring to procedure and training orchestration — closing the loop between detection and action on the human-factor portion of fuel variance.",
    platformMechanism: "Detect (flight data exceedance or fuel trend) → Trigger (procedure review for affected phases) → Orchestrate (targeted pilot training on fuel-efficient procedures) → Prove (measurable fuel variance reduction)",
    pointSolutionGap: "A flight data tool detects the trend. A TMS delivers generic training. Only the connected platform links the specific exceedance to the specific procedure to the specific crew — and proves it worked.",
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
      "We reduce injury recurrence by connecting safety reports to root-cause analysis, triggering procedure updates and targeted crew training — with full evidentiary proof of the corrective action cycle.",
    platformMechanism: "Detect (ASAP/injury report pattern) → Trigger (hazard assessment and procedure review) → Orchestrate (crew safety briefing and competency check) → Prove (corrective action closure with audit trail)",
    pointSolutionGap: "A safety tool logs the incident. Only the connected platform ensures the corrective action flows through to updated procedures, verified crew training, and documented proof of closure.",
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
      costPerEvent: "$50K–$2M per finding",
      costMidpoint: 400000,
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
      "We eliminate the gap between regulatory change and operational compliance by automatically triggering procedure updates, retraining affected personnel, and generating audit-ready evidence of implementation.",
    platformMechanism: "Detect (regulatory change or audit finding) → Trigger (affected procedure identification) → Orchestrate (content update, training assignment, acknowledgement tracking) → Prove (complete implementation evidence for regulator)",
    pointSolutionGap: "A compliance tracker flags the change. Only the connected platform cascades it through every affected procedure, retrains every affected person, and proves it to the regulator — automatically.",
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
      "We reduce premium escalation by providing insurers with continuous, auditable proof of safety management effectiveness — not just incident data, but evidence of corrective action closure and training compliance.",
    platformMechanism: "Detect (claims trend or risk indicator) → Trigger (safety programme review) → Orchestrate (enhanced training and procedure controls) → Prove (portfolio of evidence for underwriter review)",
    pointSolutionGap: "Insurers see incident counts from any safety tool. Only the connected platform shows them the closed loop: what you detected, what you changed, who you retrained, and that it worked.",
  },
  {
    id: "uc8",
    label: "Baggage & Passenger Misalignment",
    description:
      "Operational failures where baggage and passengers are separated or mishandled.",
    input: {
      inputLabel: "Mishandled bags (thousands per month)",
      unit: "K bags",
      baseline: 10.8,
      min: 0,
      max: 30,
      step: 0.5,
      costPerEvent: "$100–$350 per bag (≈6.5/1,000 pax for 20M pax/yr carrier)",
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
      "We reduce mishandling by ensuring ground handling procedures are current, ramp crews are trained on latest processes, and deviations detected through operational reports trigger targeted retraining.",
    platformMechanism: "Detect (mishandling trend in operational reports) → Trigger (ground handling SOP review) → Orchestrate (ramp crew training on updated procedures) → Prove (reduced mishandling rate with training completion evidence)",
    pointSolutionGap: "A baggage tracking system tells you bags are lost. Only the connected platform traces it to a procedural or training gap and closes the loop.",
  },
];

// ─── Source Citations ─────────────────────────────────────────────────

export const sourceCitations: Record<string, string> = {
  uc1: "Flight Safety Foundation Go-Around Safety Forum 2024; IATA Fuel Efficiency Gap Analysis; EUROCONTROL delay cost reference values v4.1",
  uc2: "Oliver Wyman MRO Survey 2024; IATA Airline Maintenance Cost Report FY2023; industry AOG cost range $100K–$500K/day including lost revenue and recovery",
  uc3: "EUROCONTROL Standard Inputs for Cost-Benefit Analysis; A4A (Airlines for America) US Carrier Delay Costs 2024 — $100.76/min average",
  uc4: "IATA Global Outlook for Air Transport 2024; human-factor variance range 2–5% per Boeing Fuel Conservation Strategies; scaled to carrier annual fuel spend",
  uc5: "FAA Cabin Safety Injury Database; Bureau of Labor Statistics aviation sector workplace injury costs 2023; airline liability and workers' compensation benchmarks",
  uc6: "DOT/FAA Civil Penalty Guidelines 2024; EASA enforcement actions public register",
  uc7: "Willis Towers Watson (WTW) Airline Insurance Market Renewal Outlook Q4 2025; premium range scaled to fleet size and claims history",
  uc8: "SITA Baggage IT Insights 2024 (6.3/1,000 pax global average); IATA Resolution 753 baggage tracking benchmarks",
  lm2: "IATA Maintenance Cost Report FY2023; fleet availability distinct from dispatch reliability",
  lm3: "Cirium On-Time Performance Review 2024",
};

// ─── Methodology Note ────────────────────────────────────────────────

export const methodologyNote =
  "Cost estimates are illustrative and based on published industry benchmarks. Actual exposure varies by fleet composition, route network, and operational maturity. All figures are annualised and represent the addressable cost envelope — not total P&L impact. Sources include EUROCONTROL, IATA, A4A, SITA, WTW, Flight Safety Foundation, FAA, and Oliver Wyman.";

export const defaultProfileCitation =
  "Default profile approximates a mid-size carrier operating 50 narrowbody-equivalent aircraft (~150 daily departures, ~20M annual passengers). Benchmarks: A4A industry averages 2024, ICAO Air Transport Statistics 2024.";

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
    // For dollar metrics, scale improvement percentage to a reasonable dollar figure
    // totalImprovement is a weighted percentage; convert to $M assuming each % point ≈ $0.3M
    return Math.round(totalImprovement * 0.3 * 10) / 10;
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

// ─── Balanced Scorecard Perspectives ──────────────────────────────────

export interface ScorecardKPI {
  id: string;
  label: string;
  baselineValue: number;
  unit: string;
  direction: "up" | "down";
  weights: Record<string, number>; // leading measure id -> weight
  /** Optional: directly linked use case input for raw metric display */
  directUseCaseId?: string;
}

export interface ScorecardPerspective {
  id: string;
  title: string;
  objective: string;
  color: string; // tailwind border color class
  accentHsl: string; // HSL for fills
  icon: string;
  kpis: ScorecardKPI[];
}

export const balancedScorecardPerspectives: ScorecardPerspective[] = [
  {
    id: "financial",
    title: "Financial",
    objective: "Reduce operating cost per ASK and protect revenue",
    color: "border-emerald-500",
    accentHsl: "160 84% 39%",
    icon: "TrendingUp",
    kpis: [
      {
        id: "bsc-fuel-savings",
        label: "Fuel Cost Savings",
        baselineValue: 0,
        unit: "$M",
        direction: "up",
        weights: { lm1: 0.6 },
      },
      {
        id: "bsc-irops-avoidance",
        label: "IrOps Cost Avoidance",
        baselineValue: 0,
        unit: "$M",
        direction: "up",
        weights: { lm2: 0.3, lm3: 0.4 },
      },
      {
        id: "bsc-insurance-savings",
        label: "Insurance Savings",
        baselineValue: 0,
        unit: "$M",
        direction: "up",
        weights: { lm4: 0.3, lm5: 0.3 },
      },
    ],
  },
  {
    id: "customer",
    title: "Customer",
    objective: "Improve schedule reliability and passenger experience",
    color: "border-blue-500",
    accentHsl: "217 100% 50%",
    icon: "Users",
    kpis: [
      {
        id: "bsc-otp",
        label: "On-Time Performance",
        baselineValue: 78,
        unit: "%",
        direction: "up",
        weights: { lm3: 0.5, lm2: 0.2 },
      },
      {
        id: "bsc-pax-score",
        label: "Pax Experience Score",
        baselineValue: 72,
        unit: "pts",
        direction: "up",
        weights: { lm6: 0.4, lm4: 0.2 },
      },
      {
        id: "bsc-bag-rate",
        label: "Mishandled Baggage",
        baselineValue: 6.5,
        unit: "/1000",
        direction: "down",
        weights: { lm6: 0.35 },
        directUseCaseId: "uc8",
      },
    ],
  },
  {
    id: "internal",
    title: "Internal Processes",
    objective: "Increase fleet utilisation, reduce safety recurrence, accelerate compliance",
    color: "border-amber-500",
    accentHsl: "38 92% 50%",
    icon: "Settings",
    kpis: [
      {
        id: "bsc-fleet-avail",
        label: "Fleet Availability",
        baselineValue: 91,
        unit: "%",
        direction: "up",
        weights: { lm2: 0.5 },
      },
      {
        id: "bsc-safety-recur",
        label: "Safety Recurrence Rate",
        baselineValue: 12,
        unit: "%",
        direction: "down",
        weights: { lm4: 0.5 },
      },
      {
        id: "bsc-audit-ready",
        label: "Audit Readiness",
        baselineValue: 120,
        unit: "hrs",
        direction: "down",
        weights: { lm5: 0.5 },
      },
    ],
  },
  {
    id: "learning",
    title: "Learning & Growth",
    objective: "Shift from reactive to predictive operations, close the detect-to-action loop",
    color: "border-purple-500",
    accentHsl: "270 70% 55%",
    icon: "Lightbulb",
    kpis: [
      {
        id: "bsc-fuel-var",
        label: "Fuel Variance",
        baselineValue: 3.2,
        unit: "%",
        direction: "down",
        weights: { lm1: 0.5 },
      },
      {
        id: "bsc-reg-standing",
        label: "Regulatory Standing",
        baselineValue: 85,
        unit: "%",
        direction: "up",
        weights: { lm5: 0.4, lm4: 0.2 },
      },
    ],
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
