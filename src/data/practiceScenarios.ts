export type Difficulty = "friendly" | "skeptical" | "hostile";

export interface PracticeScenario {
  id: string;
  deckTitle: string;
  deckRoute: string;
  /** id from src/data/personaProfiles.ts */
  personaId: string;
  /** Friendly buyer label shown in the UI */
  buyerLabel: string;
  /** ElevenLabs voice id used for the buyer */
  voiceId: string;
  /** One-line setup the rep sees */
  setup: string;
  /** Narration source key — file under src/data */
  narrationKey:
    | "executivePitch"
    | "operationalPitch"
    | "technicalPitch"
    | "coanalyst"
    | "customerOverview"
    | "playbook";
  /** Optional playbook id when narrationKey === 'playbook' */
  playbookId?: string;
  /** Sales messages the rep should land — used by scorer */
  keyMessages: string[];
}

// Voice ids from the approved ElevenLabs catalog
const VOICE = {
  george: "JBFqnCBsd6RMkjVDRZzb", // measured exec male
  sarah: "EXAVITQu4vr4xnSDxMaL", // warm female
  brian: "nPczCjzI2devNBz1zQrb", // commanding male
  laura: "FGY2WhTYpPnrIDTdsKH5", // analytical female
  eric: "cjVigY5qzO86Huf0OWal", // technical male
  jessica: "cgSgspJ2msm6clMCkdW9", // engaging female
};

export const practiceScenarios: PracticeScenario[] = [
  {
    id: "exec-medium-cfo",
    deckTitle: "Medium — Executive Pitch",
    deckRoute: "/pitch-executive-3",
    personaId: "ceo-coo",
    buyerLabel: "CFO — cost & ROI lens",
    voiceId: VOICE.brian,
    setup: "Present the Medium Executive Pitch to a CFO who wants hard numbers fast.",
    narrationKey: "executivePitch",
    keyMessages: [
      "Human-factor cost reduction tied to controllable spend",
      "DTOP loop converts signals into measurable outcomes",
      "CoAnalyst ~90% domain accuracy vs ~35% generic AI",
      "Phased delivery — POC then SafetyManager365, ContentManager365, TrainingManager365",
    ],
  },
  {
    id: "exec-medium-ceo",
    deckTitle: "Medium — Executive Pitch",
    deckRoute: "/pitch-executive-3",
    personaId: "ceo-coo",
    buyerLabel: "CEO — strategic & competitive lens",
    voiceId: VOICE.george,
    setup: "Pitch a CEO focused on competitive separation and systemic risk.",
    narrationKey: "executivePitch",
    keyMessages: [
      "Detect → Trigger → Orchestrate → Prove operating model",
      "Predictable operations = revenue protection",
      "Single platform vs point tools",
    ],
  },
  {
    id: "ops-head-of-safety",
    deckTitle: "Operational Pitch",
    deckRoute: "/pitch-operational",
    personaId: "vp-safety",
    buyerLabel: "Head of Safety — daily reality lens",
    voiceId: VOICE.sarah,
    setup: "Walk a Head of Safety through the operational inbox and DTOP scenarios.",
    narrationKey: "operationalPitch",
    keyMessages: [
      "Signals to control, not signals to dashboards",
      "Recommended Actions, not raw alerts",
      "Risk Control, not just risk register",
    ],
  },
  {
    id: "ops-coo",
    deckTitle: "Operational Pitch",
    deckRoute: "/pitch-operational",
    personaId: "vp-ops",
    buyerLabel: "COO — schedule & disruption lens",
    voiceId: VOICE.brian,
    setup: "Pitch the COO on operational predictability and disruption recovery.",
    narrationKey: "operationalPitch",
    keyMessages: [
      "Reduce repeat events with closed-loop training",
      "Audit-ready by default",
    ],
  },
  {
    id: "tech-cio",
    deckTitle: "Long — Technical Deep Dive",
    deckRoute: "/pitch-technical-v4",
    personaId: "cio-it",
    buyerLabel: "CIO — architecture & security lens",
    voiceId: VOICE.eric,
    setup: "Defend the platform architecture and AI governance to a skeptical CIO.",
    narrationKey: "technicalPitch",
    keyMessages: [
      "Domain-tuned CoAnalyst beats generic AI on aviation queries",
      "Operational Data isolation and tenancy",
      "Phased POC → Insights → Automation → Mobile roadmap",
    ],
  },
  {
    id: "coanalyst-data-officer",
    deckTitle: "CoAnalyst Playbook",
    deckRoute: "/coanalyst",
    personaId: "cio-it",
    buyerLabel: "Data Officer — accuracy & governance lens",
    voiceId: VOICE.laura,
    setup: "Pitch CoAnalyst to a Data Officer worried about hallucination and lock-in.",
    narrationKey: "coanalyst",
    keyMessages: [
      "~90% domain accuracy at L4–5 vs ~35% generic AI",
      "Event-to-Control master message",
      "No customer data leaves tenancy",
    ],
  },
  {
    id: "short-customer-overview",
    deckTitle: "Short — Customer Overview",
    deckRoute: "/customer-overview",
    personaId: "vp-ops",
    buyerLabel: "Head of Ops — first 10-minute meeting",
    voiceId: VOICE.jessica,
    setup: "Run the 10-minute first-meeting overview with a curious Head of Ops.",
    narrationKey: "customerOverview",
    keyMessages: [
      "DTOP framing in plain language",
      "Three apps, one platform",
      "Clear next-step ask",
    ],
  },
  {
    id: "playbook-dtop",
    deckTitle: "DTOP Operating Model",
    deckRoute: "/dtop-playbook",
    personaId: "vp-safety",
    buyerLabel: "Head of Safety — operating-model lens",
    voiceId: VOICE.sarah,
    setup: "Teach the DTOP loop and tie each step to a controllable cost.",
    narrationKey: "playbook",
    playbookId: "dtop",
    keyMessages: [
      "D blue · T amber · O violet · P emerald",
      "Detect signals continuously",
      "Prove with audit-ready evidence",
    ],
  },
  {
    id: "playbook-regulation",
    deckTitle: "Regulation Management",
    deckRoute: "/regulation-management",
    personaId: "vp-safety",
    buyerLabel: "Compliance Director — audit pressure",
    voiceId: VOICE.laura,
    setup: "Position Regulation Management as Risk Control, not reactive compliance.",
    narrationKey: "playbook",
    playbookId: "regulation",
    keyMessages: [
      "Risk Control over Risk Assessments",
      "Continuous evidence vs quarterly scramble",
    ],
  },
];

export const difficulties: Array<{ id: Difficulty; label: string; description: string }> = [
  { id: "friendly", label: "Friendly", description: "Curious, asks easy questions, lets you finish." },
  { id: "skeptical", label: "Skeptical", description: "Challenges claims, pushes for proof, interrupts occasionally." },
  { id: "hostile", label: "Hostile", description: "Pressed for time, openly doubtful, tests objection handling hard." },
];