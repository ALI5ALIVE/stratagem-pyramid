// Signals 101 — Sales Enablement Playbook Data

export const heroTagline =
  "What signals are, why they matter, and how Comply365 turns them into operational control.";

export interface SignalLifecycleStep {
  letter: string;
  label: string;
  tagline: string;
  description: string;
  example: string;
  color: string;
  bg: string;
  border: string;
}

export const signalLifecycle: SignalLifecycleStep[] = [
  {
    letter: "D",
    label: "Detect",
    tagline: "See the signal",
    description: "Surface meaningful change from operational data — across safety reports, ops events, content, and training.",
    example: "Three unstabilised approaches at the same airport in 30 days.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  {
    letter: "T",
    label: "Trigger",
    tagline: "Decide it matters",
    description: "Apply rules and AI judgement to separate noise from signal — and route to the right people.",
    example: "Threshold breached → fleet captain + safety lead notified with context.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    letter: "O",
    label: "Orchestrate",
    tagline: "Take action",
    description: "Drive the response across systems — manuals, training, comms, and tasks — automatically.",
    example: "Update approach briefing in the manual, push targeted recurrent training.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
  {
    letter: "P",
    label: "Prove",
    tagline: "Show control",
    description: "Capture evidence the action happened, the signal closed, and risk reduced — ready for the regulator.",
    example: "Audit pack: signal → action → acknowledged → outcome trend.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
];

export interface SignalSource {
  domain: string;
  examples: string[];
  color: "sky" | "violet" | "emerald" | "amber";
}

export const signalSources: SignalSource[] = [
  {
    domain: "Operations",
    examples: ["Disruption patterns", "Crew duty pressure", "Diversion clusters", "OCC chatter"],
    color: "sky",
  },
  {
    domain: "Content",
    examples: ["Outdated procedures", "Unread bulletins", "Conflicting manual versions", "Reg change drift"],
    color: "violet",
  },
  {
    domain: "Safety",
    examples: ["Repeat hazard reports", "Precursor events", "Threshold exceedances", "Trend reversals"],
    color: "emerald",
  },
  {
    domain: "Training",
    examples: ["Competency dips", "Recurrent failures", "Skill decay patterns", "Check-ride trends"],
    color: "amber",
  },
];

export interface SignalContrast {
  term: string;
  what: string;
  problem: string;
}

export const signalVsOthers: SignalContrast[] = [
  {
    term: "Event",
    what: "Something that happened.",
    problem: "Backward-looking. You only learn after the fact.",
  },
  {
    term: "Alert",
    what: "A rule fired.",
    problem: "Brittle. Drowns the team in noise; misses what's new.",
  },
  {
    term: "Metric",
    what: "A number on a dashboard.",
    problem: "Lagging. Tells you the score, not what to do.",
  },
  {
    term: "Signal",
    what: "A pattern that warrants action.",
    problem: "Forward-looking. Connects evidence to decision to action.",
  },
];

export interface StrengthExample {
  type: "Weak" | "Strong";
  example: string;
  whyMatters: string;
}

export const strongVsWeak: StrengthExample[] = [
  {
    type: "Weak",
    example: "A single hazard report mentioning a new ground-handling procedure.",
    whyMatters: "Easy to dismiss. But weak signals are precursors — they're where the next event is hiding.",
  },
  {
    type: "Weak",
    example: "Two pilots flag the same wording in a manual as confusing.",
    whyMatters: "Latent risk in the document. Catch it now, not after an incident.",
  },
  {
    type: "Strong",
    example: "A threshold exceedance on a safety KPI three months running.",
    whyMatters: "Trend, not noise. Demands an orchestrated response and audit trail.",
  },
  {
    type: "Strong",
    example: "Regulator publishes a rule change affecting an approved manual.",
    whyMatters: "Compliance clock starts. The platform turns it into tasked, tracked, proven action.",
  },
];

export interface SignalUseCase {
  title: string;
  domain: string;
  signal: string;
  withoutPlatform: string;
  withPlatform: string[];
  outcome: string;
  color: string;
  bg: string;
  border: string;
}

export const useCases: SignalUseCase[] = [
  {
    title: "The 12,000 unread signals",
    domain: "Safety",
    signal: "Years of hazard reports sitting in a SMS database — unread, unclassified, unactioned.",
    withoutPlatform:
      "Backlog grows. Themes are missed. The next event is in last year's reports — but no one had the time to read them.",
    withPlatform: [
      "Intelligence Layer classifies and clusters reports with ~90% domain accuracy.",
      "DTOP triggers themes that breach thresholds, routes to the right owner.",
      "Action and outcome captured as evidence for the regulator.",
    ],
    outcome: "Backlog becomes a signal stream. Weak signals get attention before they become events.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    title: "OCC noise → next-best-action",
    domain: "Operations",
    signal: "OCC sees a cluster of disruptions on a single fleet at one base over a long weekend.",
    withoutPlatform:
      "Crews react in real time. Pattern is only obvious in Monday's debrief. Same cluster repeats next month.",
    withPlatform: [
      "Detect the cluster while it's forming, not after.",
      "Trigger a recommended action: reposition crew, brief duty manager, flag training gap.",
      "Prove it: every recommendation logged, every response tracked.",
    ],
    outcome: "OCC stops fighting fires and starts shaping the day. The signal becomes a decision.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
  },
  {
    title: "When a signal changes the manual",
    domain: "Content",
    signal: "Repeat reports flag the same paragraph in an approved procedure as ambiguous.",
    withoutPlatform:
      "The manual stays as-is until an audit or incident forces a change. Risk lives in the document.",
    withPlatform: [
      "Detect the convergence across reports and operational data.",
      "Trigger a content review with the exact paragraph, evidence, and context.",
      "Orchestrate the rev: re-issue, push to crew, capture acknowledgement.",
    ],
    outcome: "The manual responds to operational reality — and so does the audit trail.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
];

export interface SignalObjection {
  objection: string;
  response: string;
  reframe: string;
}

export const objections: SignalObjection[] = [
  {
    objection: "Isn't a signal just an alert with a new label?",
    response:
      "Alerts fire on rules you wrote yesterday. Signals are patterns the system finds — including the ones you didn't think to look for. Intelligence Layer (~90% domain accuracy vs ~35% generic) reads operational language, not just thresholds.",
    reframe: "Alerts tell you a rule fired. Signals tell you something is changing.",
  },
  {
    objection: "We already have dashboards. Why do we need this?",
    response:
      "Dashboards report. They don't act. The platform closes the loop: detect → trigger → orchestrate → prove. Every signal becomes a tracked action with an audit trail.",
    reframe: "Dashboards measure performance. Signals drive performance.",
  },
  {
    objection: "Our SMS already collects reports. Isn't that enough?",
    response:
      "Collecting is easy. Acting at scale is the hard part. Most operators have thousands of reports they'll never read. We turn the backlog into prioritised, classified, actionable signals — with proof of closure.",
    reframe: "Storing reports isn't safety management. Acting on signals is.",
  },
  {
    objection: "Generic AI can do this for us.",
    response:
      "Generic AI hits ~35% accuracy on aviation operational data. Intelligence Layer is purpose-built — ~90% at L4–5 — because it's trained on the same operational language your team uses. Accuracy is the difference between a signal and noise.",
    reframe: "You can't build operational control on a 35% reading of your data.",
  },
];

export interface DiscoveryQuestion {
  audience: string;
  question: string;
}

export const discoveryQuestions: DiscoveryQuestion[] = [
  { audience: "Head of Safety", question: "How many open hazard reports do you have right now — and who reads them?" },
  { audience: "Head of Ops", question: "When was the last time the OCC saw a pattern forming before it became a disruption?" },
  { audience: "Head of Content", question: "How long does a procedure stay wrong after the operation has already changed?" },
  { audience: "Head of Training", question: "Where does your recurrent training come from — competency data, or last year's syllabus?" },
  { audience: "CIO / CTO", question: "How much of your operational data is actually being acted on, end-to-end, with proof?" },
];

export const useTerms = [
  "signals",
  "control",
  "operational performance",
  "Systems of Record",
  "Intelligence Layer",
  "DTOP",
  "Generative AI",
  "Recommended Actions",
  "Operational Data",
];

export const avoidTerms = [
  "FOQA",
  "FDM",
  "ASAP",
  "AI copilot",
  "single pane of glass",
  "unqualified ROI claims",
];
