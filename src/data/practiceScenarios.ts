export type Difficulty = "friendly" | "skeptical" | "hostile";

export interface PracticeScenario {
  id: string;
  deckTitle: string;
  deckRoute: string;
  /** id from src/data/personaProfiles.ts */
  personaId: string;
  /** Friendly buyer label shown in the UI */
  buyerLabel: string;
  /** Short lens shown under the buyer label */
  lens: string;
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
  /** Suggested default difficulty for this buyer */
  defaultDifficulty?: Difficulty;
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

const DECK = {
  title: "Medium — Executive Pitch",
  route: "/pitch-executive-3",
  narrationKey: "executivePitch" as const,
};

export const practiceScenarios: PracticeScenario[] = [
  {
    id: "exec-medium-ceo-coo",
    deckTitle: DECK.title,
    deckRoute: DECK.route,
    personaId: "ceo-coo",
    buyerLabel: "CEO / COO",
    lens: "Strategic, revenue & systemic risk",
    voiceId: VOICE.george,
    setup: "Pitch a CEO/COO focused on competitive separation, revenue protection and quantified ROI.",
    narrationKey: DECK.narrationKey,
    defaultDifficulty: "skeptical",
    keyMessages: [
      "Detect → Trigger → Orchestrate → Prove operating model",
      "Predictable operations = revenue protection",
      "Single platform vs point tools — competitive moat",
      "Measurable ROI within 12 months — board-ready business case",
      "550+ airlines — proven, not experimental",
    ],
  },
  {
    id: "exec-medium-vp-safety",
    deckTitle: DECK.title,
    deckRoute: DECK.route,
    personaId: "vp-safety",
    buyerLabel: "VP Safety",
    lens: "Risk, SMS maturity & audit readiness",
    voiceId: VOICE.laura,
    setup: "Pitch a VP Safety focused on hazard intelligence, SMS maturity and audit readiness.",
    narrationKey: DECK.narrationKey,
    defaultDifficulty: "skeptical",
    keyMessages: [
      "From reactive investigation to proactive hazard intelligence",
      "SMS maturity — Level 2/3 to Level 4 predictive",
      "Audit-ready evidence in hours, not weeks",
      "CoAnalyst ~90% domain accuracy vs ~35% generic AI",
      "Aviation-trained, ICAO taxonomy native — not generic AI",
    ],
  },
  {
    id: "exec-medium-vp-ops",
    deckTitle: DECK.title,
    deckRoute: DECK.route,
    personaId: "vp-ops",
    buyerLabel: "VP Operations",
    lens: "OTP, disruption & crew workflow",
    voiceId: VOICE.brian,
    setup: "Pitch a time-pressed VP Ops who wants to know how this prevents tomorrow's disruption.",
    narrationKey: DECK.narrationKey,
    defaultDifficulty: "hostile",
    keyMessages: [
      "Predict and prevent cascading disruptions before they hit OTP",
      "Real-time, OCC-grade visibility across safety, ops, training",
      "Works alongside existing OCC and crew systems — no rip-and-replace",
      "DTOP loop turns signals into orchestrated action",
      "Quantified OTP and completion-factor improvement",
    ],
  },
  {
    id: "exec-medium-training",
    deckTitle: DECK.title,
    deckRoute: DECK.route,
    personaId: "training-director",
    buyerLabel: "Training & L&D Director",
    lens: "Adoption, competency & closed-loop training",
    voiceId: VOICE.jessica,
    setup: "Pitch a Training Director who cares about competency, adoption and closing the safety→training loop.",
    narrationKey: DECK.narrationKey,
    defaultDifficulty: "friendly",
    keyMessages: [
      "Hazard detected today triggers procedure update and crew retraining tomorrow",
      "TrainingManager365 — competency-based, evidence-backed",
      "Unified Mobile — one trusted shell crews already use",
      "Closed-loop proof of training effectiveness, not just completion",
    ],
  },
  {
    id: "exec-medium-cio",
    deckTitle: DECK.title,
    deckRoute: DECK.route,
    personaId: "cio-it",
    buyerLabel: "CIO / IT Director",
    lens: "Integration, identity & security",
    voiceId: VOICE.eric,
    setup: "Pitch a CIO who needs integration, identity, security and a credible total cost story.",
    narrationKey: DECK.narrationKey,
    defaultDifficulty: "skeptical",
    keyMessages: [
      "Single platform reduces integration sprawl vs point tools",
      "Tenant-isolated AI — your data stays yours",
      "Open APIs, SSO/SAML, role-based access",
      "Phased POC → SafetyManager365 / ContentManager365 / TrainingManager365",
      "Predictable TCO — replaces or rationalises existing tools",
    ],
  },
];

export const difficulties: Array<{ id: Difficulty; label: string; description: string }> = [
  { id: "friendly", label: "Friendly", description: "Curious, asks easy questions, lets you finish." },
  { id: "skeptical", label: "Skeptical", description: "Challenges claims, pushes for proof, interrupts occasionally." },
  { id: "hostile", label: "Hostile", description: "Pressed for time, openly doubtful, tests objection handling hard." },
];