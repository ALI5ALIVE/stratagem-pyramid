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
];

export const difficulties: Array<{ id: Difficulty; label: string; description: string }> = [
  { id: "friendly", label: "Friendly", description: "Curious, asks easy questions, lets you finish." },
  { id: "skeptical", label: "Skeptical", description: "Challenges claims, pushes for proof, interrupts occasionally." },
  { id: "hostile", label: "Hostile", description: "Pressed for time, openly doubtful, tests objection handling hard." },
];