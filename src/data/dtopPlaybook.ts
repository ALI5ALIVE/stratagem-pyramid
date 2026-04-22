// DTOP Operating Model — Sales Enablement Playbook Data

export interface DTOPStep {
  letter: string;
  label: string;
  tagline: string;
  description: string;
  dataSources: string[];
  actions: string[];
  outputs: string[];
  color: string;
  bg: string;
  border: string;
}

export interface DTOPUseCase {
  title: string;
  scenario: string;
  icon: string;
  steps: {
    detect: string;
    trigger: string;
    orchestrate: string;
    prove: string;
  };
  outcome: string;
  metric: string;
}

export interface ValueCategory {
  title: string;
  description: string;
  metrics: string[];
  icon: string;
  color: string;
}

export interface PersonaMessage {
  role: string;
  careAbout: string;
  openWith: string;
  keyMessage: string;
  discoveryQuestions: string[];
  color: string;
}

export interface DTOPObjection {
  objection: string;
  response: string;
  reframe: string;
}

export interface CompetitorGap {
  competitor: string;
  canDetect: boolean;
  canTrigger: boolean;
  canOrchestrate: boolean;
  canProve: boolean;
}

export const heroTagline = "The only closed-loop operating model in aviation";
export const heroSubtitle = "Detect → Trigger → Orchestrate → Prove";

export const whyDTOPExists = {
  headline: "Point solutions detect problems. Nobody closes the loop.",
  industryExposure: "$25–35B",
  exposureLabel: "Annual addressable cost across global commercial aviation from fragmented safety, content & training systems",
  industryExposureCitation:
    "Derived from Line of Sight benchmarks: EUROCONTROL Standard Inputs v4.1, A4A US Carrier Delay Costs 2024, IATA Global Outlook 2024, Oliver Wyman MRO Survey 2024, WTW Airline Insurance Q4 2025, SITA Baggage IT Insights 2024, Flight Safety Foundation Go-Around Forum 2024.",
  industryExposureMethodology:
    "Per-carrier addressable envelope (~$30M for a 50-aircraft narrowbody operator) scaled to the global commercial fleet of ~28K aircraft. Represents controllable cost — not total P&L impact. Range reflects sensitivity to fleet mix, region, and baseline maturity.",
  problems: [
    { label: "Siloed Safety Systems", detail: "SMS tools capture events but can't trigger procedural or training responses" },
    { label: "Disconnected Content", detail: "Manual distribution with no link to the incidents that demand updates" },
    { label: "Reactive Training", detail: "Calendar-based recurrency with no connection to operational performance data" },
    { label: "No Proof of Effect", detail: "Auditors ask 'did this fix work?' — airlines can't answer with evidence" },
    { label: "Accountability Gap", detail: "Between detecting a risk and proving it was resolved, nothing is tracked" },
    { label: "Compliance Theatre", detail: "Tick-box exercises replace genuine continuous improvement" },
  ],
};

export const dtopSteps: DTOPStep[] = [
  {
    letter: "D",
    label: "Detect",
    tagline: "From noise to signal",
    description: "Continuously monitor operational data streams to surface safety signals, regulatory changes, and performance anomalies before they become incidents.",
    dataSources: ["Safety reports (ASR/ASAP)", "Flight data (FOQA/FDM)", "Audit findings", "Regulatory bulletins (EASA/FAA)", "Training assessment scores", "Crew feedback"],
    actions: ["Pattern recognition across event types", "Threshold monitoring and anomaly detection", "Regulatory change impact scanning", "Cross-domain correlation"],
    outputs: ["Prioritised risk signals", "Regulatory change alerts", "Performance trend indicators"],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  {
    letter: "T",
    label: "Trigger",
    tagline: "From signal to action plan",
    description: "Automatically initiate the right response workflow when a signal crosses a defined threshold — linking the detection to specific procedural, content, or training actions.",
    dataSources: ["Risk scoring thresholds", "Regulatory applicability rules", "Competency gap analysis", "SOP revision triggers"],
    actions: ["Auto-generate review tasks", "Flag affected procedures for revision", "Identify impacted crew populations", "Create compliance action items"],
    outputs: ["Assigned action workflows", "Procedure revision requests", "Targeted training assignments", "Compliance task queues"],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    letter: "O",
    label: "Orchestrate",
    tagline: "From plan to coordinated execution",
    description: "Execute the response across Safety, Content, and Training modules simultaneously — ensuring procedures are updated, distributed, acknowledged, and crew are retrained on the right content at the right time.",
    dataSources: ["Content authoring workflows", "Distribution & acknowledgment tracking", "LMS assignment engine", "Crew scheduling integration"],
    actions: ["Revise and publish updated procedures", "Push targeted content to affected crews", "Assign scenario-specific training modules", "Track acknowledgment and completion"],
    outputs: ["Updated SOPs in crew hands", "Training completion records", "Acknowledgment confirmations", "Distribution audit trail"],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    letter: "P",
    label: "Prove",
    tagline: "From action to auditable evidence",
    description: "Close the loop by measuring the effect of every intervention and generating auditable evidence that connects the original signal to the outcome — proving continuous improvement to regulators and leadership.",
    dataSources: ["Post-intervention performance data", "Repeat incident rates", "Training effectiveness scores", "Audit readiness dashboards"],
    actions: ["Compare pre/post intervention metrics", "Generate compliance evidence packages", "Measure training transfer effectiveness", "Update risk scoring models"],
    outputs: ["Measurable risk reduction evidence", "Regulatory compliance proof", "ROI documentation", "Continuous improvement baseline"],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
];

export const useCases: DTOPUseCase[] = [
  {
    title: "Dangerous Goods Incident Response",
    scenario: "A pattern of dangerous goods handling errors is detected across three hub stations over 60 days.",
    icon: "AlertTriangle",
    steps: {
      detect: "SafetyManager365 identifies a 3x spike in DG handling reports at hubs LHR, FRA, and DXB — pattern flagged as systemic, not isolated.",
      trigger: "Threshold breach auto-triggers: procedure review for DG handling SOP, targeted retraining for ground crews at affected stations, and audit preparation task.",
      orchestrate: "ContentManager365 publishes revised DG procedures → pushed to 450 affected ground crew via mobile. TrainingManager365 assigns scenario-based DG module with 14-day completion deadline.",
      prove: "60-day post-intervention review shows 72% reduction in DG handling reports. Evidence package generated for regulator showing signal → response → outcome chain.",
    },
    outcome: "From systemic DG risk to auditable resolution in under 90 days",
    metric: "72% incident reduction",
  },
  {
    title: "Regulatory Change Management",
    scenario: "EASA publishes a new Safety Directive requiring changes to cabin crew emergency procedures within 90 days.",
    icon: "FileCheck",
    steps: {
      detect: "Regulatory monitoring surfaces the new EASA directive. Impact analysis identifies 12 affected SOPs and 3,200 cabin crew requiring updated training.",
      trigger: "Compliance task automatically generated: SOP revision workflow initiated, training curriculum update flagged, compliance deadline tracker activated.",
      orchestrate: "Revised emergency procedures authored, reviewed, and published in 15 days. Updated training module deployed to all 3,200 cabin crew. Acknowledgment tracking activated with escalation for non-completion.",
      prove: "100% procedure distribution confirmed. 98.5% training completion achieved 30 days before deadline. Audit-ready compliance package generated showing full traceability from directive to crew competency.",
    },
    outcome: "Full regulatory compliance achieved 30 days ahead of deadline",
    metric: "98.5% completion rate",
  },
  {
    title: "Training Effectiveness Loop",
    scenario: "Recurring crew performance issues in unstable approach procedures are identified across quarterly check data.",
    icon: "GraduationCap",
    steps: {
      detect: "Training assessment data reveals a 15% failure rate on unstable approach scenarios — 3x higher than fleet average. Pattern persists across two consecutive quarters.",
      trigger: "Competency gap triggers targeted intervention: enhanced training module assigned to underperforming cohort, procedure clarity review initiated for approach SOPs.",
      orchestrate: "Redesigned unstable approach training module with updated scenarios deployed to 280 pilots. Simplified approach procedure quick-reference card published and pushed to EFBs.",
      prove: "Next quarter assessment shows failure rate dropped from 15% to 4%. Flight data confirms 40% reduction in unstable approach events fleet-wide. Evidence links training intervention to operational improvement.",
    },
    outcome: "Training directly linked to measurable operational improvement",
    metric: "73% failure rate reduction",
  },
];

export const valueCategories: ValueCategory[] = [
  {
    title: "Risk Reduction",
    description: "Turn reactive incident management into proactive risk prevention through early signal detection and coordinated response.",
    metrics: ["40-60% reduction in repeat incidents", "3x faster response to safety signals", "Systemic pattern identification vs isolated event tracking"],
    icon: "Shield",
    color: "text-blue-400",
  },
  {
    title: "Operational Efficiency",
    description: "Eliminate the manual coordination burden that consumes safety, training, and compliance teams today.",
    metrics: ["70% reduction in manual coordination effort", "50% faster procedure revision cycles", "Automated workflow vs email chains and spreadsheets"],
    icon: "Zap",
    color: "text-amber-400",
  },
  {
    title: "Continuous Compliance",
    description: "Move from audit preparation panic to always-ready compliance with automatic evidence generation.",
    metrics: ["90% reduction in audit preparation time", "100% traceability from signal to outcome", "Real-time compliance posture dashboards"],
    icon: "CheckCircle",
    color: "text-emerald-400",
  },
  {
    title: "Performance Improvement",
    description: "Close the loop between training interventions and operational outcomes — proving what works and what doesn't.",
    metrics: ["Measurable training-to-performance correlation", "Data-driven curriculum optimization", "Evidence-based continuous improvement cycle"],
    icon: "TrendingUp",
    color: "text-violet-400",
  },
];

export const personaMessages: PersonaMessage[] = [
  {
    role: "CEO / COO",
    careAbout: "Enterprise risk, regulatory standing, and operational cost",
    openWith: "Today you're paying for three separate systems that don't talk to each other. The gap between detecting a safety signal and proving you fixed it is where risk lives.",
    keyMessage: "DTOP gives you a single operating model that turns every operational signal into auditable proof of improvement — reducing enterprise risk while lowering the cost of compliance.",
    discoveryQuestions: [
      "When was the last time a regulator asked you to prove that a corrective action actually worked?",
      "How do you currently measure the ROI of your safety investments?",
      "What keeps you up at night about your operational risk posture?",
    ],
    color: "border-blue-500/30",
  },
  {
    role: "VP Safety / Head of Safety",
    careAbout: "Investigation closure rates, SMS effectiveness, and audit readiness",
    openWith: "Your SMS captures events brilliantly — but how many of those events actually result in a coordinated procedural and training response?",
    keyMessage: "DTOP connects your safety data to the content and training systems that execute the fix — so every signal gets a response, and every response generates proof.",
    discoveryQuestions: [
      "What percentage of your safety recommendations result in verified procedural changes?",
      "How do you currently track whether a corrective action reduced the original risk?",
      "How much time does your team spend preparing for regulatory audits?",
    ],
    color: "border-emerald-500/30",
  },
  {
    role: "Head of Training / Chief Pilot",
    careAbout: "Training effectiveness, competency gaps, and crew readiness",
    openWith: "You're investing millions in training — but can you prove which programs actually improve operational performance?",
    keyMessage: "DTOP links your training outcomes directly to operational data — so you can see which interventions work, target training where it's needed most, and prove the impact to leadership.",
    discoveryQuestions: [
      "Can you currently correlate training completion with operational performance improvement?",
      "How do you identify which crews need targeted intervention vs calendar-based recurrency?",
      "What would it mean to prove that a training change reduced incidents by 40%?",
    ],
    color: "border-amber-500/30",
  },
  {
    role: "IT Director / CTO",
    careAbout: "Integration complexity, data architecture, and vendor consolidation",
    openWith: "You're maintaining integrations between 5-7 point solutions that were never designed to share data. Every new requirement means another integration project.",
    keyMessage: "DTOP runs on a unified platform that already connects Safety, Content, and Training data — eliminating point-to-point integrations and providing a single operational data model.",
    discoveryQuestions: [
      "How many separate systems does your safety and training ecosystem currently involve?",
      "What's the annual cost of maintaining integrations between these systems?",
      "How would a single platform with native data connectivity change your architecture?",
    ],
    color: "border-violet-500/30",
  },
];

export const competitorGaps: CompetitorGap[] = [
  { competitor: "Traditional SMS (e.g., IQSMS, Intelex)", canDetect: true, canTrigger: false, canOrchestrate: false, canProve: false },
  { competitor: "Generic LMS (e.g., SAP SuccessFactors)", canDetect: false, canTrigger: false, canOrchestrate: false, canProve: false },
  { competitor: "Document Management (e.g., SharePoint)", canDetect: false, canTrigger: false, canOrchestrate: false, canProve: false },
  { competitor: "Flight Data Analytics (e.g., GE FDM)", canDetect: true, canTrigger: false, canOrchestrate: false, canProve: false },
  { competitor: "Comply365 with DTOP", canDetect: true, canTrigger: true, canOrchestrate: true, canProve: true },
];

export const competitivePositioning = {
  headline: "Point solutions solve one step. Only Comply365 closes the loop.",
  explanation: "DTOP requires native connectivity between Safety, Content, and Training data. No combination of point solutions can deliver the Trigger → Orchestrate → Prove chain because they don't share a common data model.",
  moatStatements: [
    "Detect without Trigger = a report that sits in a queue",
    "Trigger without Orchestrate = an action plan with no execution engine",
    "Orchestrate without Prove = effort with no measurable outcome",
    "Only the full D→T→O→P chain creates a closed-loop continuous improvement cycle",
  ],
};

export const objections: DTOPObjection[] = [
  {
    objection: "We already have an SMS that handles safety management",
    response: "Your SMS is excellent at Detect. But can it automatically trigger a procedure revision and targeted retraining when a pattern emerges? DTOP starts where your SMS stops — turning detections into orchestrated responses with auditable proof.",
    reframe: "SMS is the foundation. DTOP is what makes that foundation actionable.",
  },
  {
    objection: "Our LMS already handles training assignment and tracking",
    response: "Your LMS assigns and tracks training — but does it know which training to assign based on operational safety data? DTOP connects your safety signals directly to your training system, so interventions are targeted and measurable.",
    reframe: "Your LMS executes training. DTOP tells it which training matters and proves it worked.",
  },
  {
    objection: "We use SharePoint/Confluence for document management",
    response: "SharePoint stores and distributes documents. But it can't trigger a procedure revision based on a safety event, track whether the right crews received the update, or prove the revision reduced the original risk. DTOP connects content to the operational context.",
    reframe: "Document management stores content. DTOP makes content respond to operations.",
  },
  {
    objection: "We're not ready for AI — we need basics first",
    response: "DTOP doesn't require AI. It's an operating model that works with rules-based automation today. CoAnalyst AI enhances it by finding patterns humans miss — but the core D→T→O→P workflow delivers value from day one with threshold-based triggers.",
    reframe: "Start with the operating model. AI amplifies it later — it's not a prerequisite.",
  },
  {
    objection: "This sounds expensive and complex to implement",
    response: "DTOP runs on the Comply365 platform you may already use for content distribution. It's not a new system — it's a new operating model that activates connections already built into the platform. Most airlines start with a single use case in 90 days.",
    reframe: "It's not a new platform. It's a new way of using the platform you already trust.",
  },
];

export const talkingPoints = [
  "DTOP is the only closed-loop operating model that connects detection to proof in aviation.",
  "Point solutions detect. Only Comply365 can detect, trigger a coordinated response, orchestrate execution across safety, content, and training, and prove the outcome.",
  "Every airline has a gap between 'we found a problem' and 'we can prove we fixed it'. DTOP closes that gap.",
  "DTOP doesn't require AI to start delivering value. It works with rules-based automation today. CoAnalyst AI amplifies it.",
  "The typical airline spends 70% of safety team time on coordination that DTOP automates.",
  "Regulators are moving from 'show me your SMS' to 'show me your SMS actually worked'. DTOP generates that evidence automatically.",
];

export const elevatorPitch = "Comply365's DTOP operating model is the only closed-loop system in aviation that turns operational signals into coordinated action and auditable proof — connecting safety, content, and training into a continuous improvement cycle that no combination of point solutions can replicate.";

export const nextSteps = [
  { step: "Discovery Call", description: "30-minute assessment of current operational gaps and DTOP applicability", timeline: "Week 1" },
  { step: "DTOP Workshop", description: "Half-day interactive session mapping DTOP to the airline's specific use cases", timeline: "Week 2-3" },
  { step: "90-Day Pilot", description: "Single use case implementation proving the full D→T→O→P cycle with measurable outcomes", timeline: "Month 2-4" },
];
