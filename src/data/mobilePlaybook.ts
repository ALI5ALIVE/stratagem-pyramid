// Unified Mobile App — Sales Enablement Playbook Data

export interface PainPoint {
  label: string;
  detail: string;
}

export interface HowItWorksStep {
  number: number;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  color: string;
  bg: string;
  border: string;
}

export interface MobileUseCase {
  title: string;
  scenario: string;
  question: string;
  icon: string;
  phase: string;
  steps: {
    ask: string;
    correlate: string;
    insight: string;
    recommend: string;
  };
  outcome: string;
  metric: string;
}

export interface ValuePillar {
  title: string;
  description: string;
  bullets: string[];
  shift: string;
  icon: string;
  color: string;
}

export interface MobilePersona {
  role: string;
  careAbout: string;
  openWith: string;
  keyMessage: string;
  sampleQuestion: string;
  color: string;
}

export interface MobileObjection {
  objection: string;
  response: string;
  reframe: string;
}

export interface CompetitiveContrast {
  approach: string;
  isUs: boolean;
  insight: string;
  speed: string;
  scope: string;
  intelligence: string;
}

// Hero
export const heroEyebrow = "POC — Phased delivery starting Q2 2026";
export const heroTitle = "The Unified Mobile App";
export const heroTagline = "One trusted mobile entry point for the frontline.";
export const heroSubtitle =
  "Content, Training and Safety surfaced inside the Comply365 mobile app crews already use every shift — less context shifting, less cognitive load, one way to deploy.";
export const statusLabel = "Phase 1 WIP · Q2 2026 (Training) · Q4 2026 (Safety) · 2027+ (Fully unified)";

// Slide 1 — Why it exists
export const whyItExists = {
  headline: "Frontline crews shouldn't need three apps to do one shift.",
  exposureLabel:
    "Today crews juggle separate apps for procedures, training and safety reporting. Each is a separate login, a separate UX, a separate deployment — and Training and Safety are used too rarely to ever feel familiar.",
  problems: [
    {
      label: "Context Shifting Between Apps",
      detail: "Crews leave the app they live in to do anything in Training or Safety — friction that breaks the operational flow.",
    },
    {
      label: "High Cognitive Load",
      detail: "Different UIs, navigation patterns and login flows per app — every switch costs focus and time.",
    },
    {
      label: "Infrequent Training & Safety Use",
      detail: "Training and Safety apps are opened rarely, so the UX is never familiar when crews actually need them.",
    },
    {
      label: "Fragmented Mobile Footprint",
      detail: "Three separate apps to design, build, certify, deploy and approve through customer mobile estates.",
    },
    {
      label: "Separate Approvals & Deployments",
      detail: "Each app is its own MDM rollout, IT review and customer approval cycle — multiplying time-to-frontline.",
    },
    {
      label: "No Cross-App Workflow",
      detail: "A new procedure, the training that goes with it, and the safety report that follows live in three disconnected apps.",
    },
  ] as PainPoint[],
};

// Slide 2 — What it is
export const elevatorPitch = {
  oneLiner:
    "The Comply365 iOS app — already in daily use through ContentManager365 — extended to surface TrainingManager365 and SafetyManager365 as embedded mini-apps. One trusted shell, one entry point, one way to deploy.",
  shifts: [
    { from: "Three apps a shift", to: "One app every shift" },
    { from: "Three logins", to: "Single sign-on" },
    { from: "Three deployments", to: "One mobile footprint" },
    { from: "Disconnected UX", to: "Common shell, familiar feel" },
    { from: "Standalone tools", to: "Connected workflows" },
  ],
  exampleQuestion: "Open the app you already use every shift — and find Training and Safety waiting inside.",
  exampleAnswer:
    "The Comply365 mobile app surfaces TrainingManager365 dashboards and SafetyManager365 reporting from the same sidebar as procedures. Crews stay in one trusted shell — Content remains the daily anchor, Training and Safety are one tap away.",
};

// Slide 3 — How it works
export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: 1,
    title: "Single Trusted Shell",
    tagline: "The app crews already open every shift",
    description:
      "The existing Comply365 iOS app — battle-tested by ContentManager365 customers in daily operational use — becomes the single mobile shell for the platform.",
    details: [
      "iOS-first (native shell)",
      "Already in daily frontline use",
      "Operationally hardened",
      "One app to certify and deploy",
    ],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  {
    number: 2,
    title: "Single Sign-On",
    tagline: "One identity across the platform",
    description:
      "SSO is required so crews authenticate once and access ContentManager365, TrainingManager365 and SafetyManager365 from inside the same app — no app-hopping for credentials.",
    details: [
      "SSO required (no per-product login)",
      "Customer identity provider integration",
      "Session shared across mini-apps",
      "Standalone apps remain available",
    ],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    number: 3,
    title: "Surfaced Mini-Apps",
    tagline: "Training & Safety inside the shell",
    description:
      "Like Uber or Snap mini-apps, TrainingManager365 and SafetyManager365 are surfaced inside the shell — accessed from the existing sidebar, not as separate downloads.",
    details: [
      "Training Dashboard + Personal File",
      "Safety reporting in the moment",
      "Surfaced from the sidebar",
      "No rebuild — embedded experience",
    ],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    number: 4,
    title: "Connected Workflows",
    tagline: "Procedures, training and safety, joined up",
    description:
      "Over time the mini-apps gain a common UI/UX, unified notifications, and in-app navigation between procedures, training and safety — the foundation of a fully unified mobile experience.",
    details: [
      "Common UI/UX across mini-apps",
      "Unified notifications",
      "In-app navigation procedure ↔ training ↔ safety",
      "In-app suggestions & automation",
    ],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
];

// Slides 4-6 — Use cases
export const useCases: MobileUseCase[] = [
  {
    title: "Training in the Crew's Hand",
    scenario:
      "A cabin crew member finishes a turnaround and needs to check what training is due. Today that means leaving the app they live in, logging in to a separate Training app and re-finding their way around.",
    question: "Phase 1 / Q2 2026 — surface TrainingManager365 inside the app crews already use.",
    icon: "GraduationCap",
    phase: "Phase 1 · Q2 2026 · Work in progress",
    steps: {
      ask: "Today: crew exits the Comply365 app, opens a separate TrainingManager365 app, logs in again, learns a different UX.",
      correlate:
        "Surface: TrainingManager365 Dashboard and Personal File appear in the existing Comply365 sidebar — same shell, same login, same crew.",
      insight:
        "In-context action: crew checks assignments, due dates and personal training record without leaving the app — online-only in initial scope.",
      recommend:
        "Outcome: Training stops being an app crews avoid. It becomes a tab inside the app they already trust — opened far more often, used far more naturally.",
    },
    outcome: "Training moves from 'separate app' to 'tab in the app I already use'",
    metric: "Phase 1 · Q2 2026",
  },
  {
    title: "Safety Reporting in the Moment",
    scenario:
      "A crew member spots an issue worth reporting. Today they note it down and report later — usually from a desktop or a separate app, often after the moment has passed and detail has faded.",
    question: "Phase 2 / Q4 2026 — surface SafetyManager365 reporting inside the same trusted shell.",
    icon: "ShieldCheck",
    phase: "Phase 2 · Q4 2026",
    steps: {
      ask: "Today: occurrence reporting lives in a separate Safety app crews rarely open — friction means reports happen later, with less detail.",
      correlate:
        "Surface: SafetyManager365 reporting is added to the same Comply365 mobile sidebar — one tap from procedures and training, no separate login.",
      insight:
        "In-context action: crew submits an occurrence report in the moment, in the app they're already in, while detail is still fresh.",
      recommend:
        "Outcome: more reports, captured sooner, with richer context — turning safety reporting from an after-the-fact chore into an in-the-moment habit.",
    },
    outcome: "Safety reporting moves from 'after the shift' to 'in the moment'",
    metric: "Phase 2 · Q4 2026",
  },
  {
    title: "Fully Unified Mobile Experience",
    scenario:
      "A new procedure is published. The crew member needs to read it, do the related training, and — if something goes wrong — report it. Today that's three apps, three UIs, three contexts.",
    question: "Phase 3 / 2027+ — one common experience across procedures, training and safety.",
    icon: "Workflow",
    phase: "Phase 3 · 2027 and beyond",
    steps: {
      ask: "Today: the procedure, the training and the safety report live in three disconnected apps with three different UX patterns.",
      correlate:
        "Surface: a common UI/UX across mini-apps, unified notifications, and in-app navigation between procedure ↔ training ↔ safety.",
      insight:
        "In-context action: read a procedure, jump into the linked training, and file a related safety report — without ever leaving the shell.",
      recommend:
        "Outcome: one mobile experience for the frontline. Procedures, training and safety operate as a single connected workflow on the device crews already carry.",
    },
    outcome: "Three apps, three UIs → one connected mobile experience",
    metric: "Phase 3 · 2027+",
  },
];

// Slide 7 — Value pillars (external + internal)
export const valuePillars: ValuePillar[] = [
  {
    title: "Less Context Shifting",
    description:
      "Crews stay in the app they already trust. Training and Safety stop being detours — they become tabs.",
    bullets: [
      "One app open every shift",
      "Procedures, training and safety in one shell",
      "No app-hopping mid-task",
    ],
    shift: "Three apps a shift → One app every shift",
    icon: "Smartphone",
    color: "text-blue-400",
  },
  {
    title: "Lower Cognitive Load",
    description:
      "One UX, one login, one navigation pattern. Familiarity replaces friction — especially for tools used infrequently.",
    bullets: [
      "Single sign-on across mini-apps",
      "Shared navigation patterns",
      "Familiar shell for infrequent tasks",
    ],
    shift: "Three logins, three UIs → One shell, one sign-on",
    icon: "Layers",
    color: "text-amber-400",
  },
  {
    title: "Design at Scale",
    description:
      "One mobile shell to evolve, theme and certify — instead of three product teams designing in parallel.",
    bullets: [
      "Shared mobile design system",
      "Consistent customer experience",
      "One platform to evolve, not three",
    ],
    shift: "Parallel mobile teams → One shared mobile platform",
    icon: "Layers",
    color: "text-emerald-400",
  },
  {
    title: "Simpler Deployment",
    description:
      "One app to MDM, certify and approve through customer mobile estates — instead of three separate rollouts.",
    bullets: [
      "Single MDM footprint",
      "One IT approval cycle",
      "Faster customer rollout",
    ],
    shift: "Three rollouts → One mobile footprint",
    icon: "ShieldCheck",
    color: "text-violet-400",
  },
  {
    title: "Future Integration Potential",
    description:
      "Foundation for in-app notifications, navigation and automation across procedures, training and safety as a single experience.",
    bullets: [
      "Unified notifications",
      "In-app navigation between mini-apps",
      "Foundation for in-app suggestions & automation",
    ],
    shift: "Standalone tools → Connected mobile workflows",
    icon: "Bell",
    color: "text-rose-400",
  },
];

export const internalValue = {
  headline: "Why this matters for Comply365",
  points: [
    {
      title: "One shell to evolve, not three",
      detail: "A single mobile platform replaces three parallel mobile codebases, design systems and release trains.",
    },
    {
      title: "Lower training & support burden",
      detail: "Crews learn one app — fewer support tickets, faster adoption, less customer-side change management.",
    },
    {
      title: "Simpler customer approval",
      detail: "One mobile app to certify, MDM and approve through customer IT — dramatically less friction at rollout.",
    },
  ],
};

// Slide 8 — Personas
export const personas: MobilePersona[] = [
  {
    role: "Flight / Cabin Crew",
    careAbout: "Speed, simplicity, and not having to remember three apps mid-shift",
    openWith:
      "You already live in the Comply365 app every shift. Imagine your training and your safety reporting just being there — same app, same login.",
    keyMessage:
      "One trusted app for procedures, training and safety reporting — no app-hopping, no extra logins, no relearning a new UX every time.",
    sampleQuestion: "How often do you actually open the standalone Training or Safety app today?",
    color: "border-blue-500/30",
  },
  {
    role: "Head of Operations",
    careAbout: "Operational adoption, time-on-task and frontline efficiency",
    openWith:
      "Your crews already open one Comply365 app every shift. Adding training and safety inside it is the lowest-friction way to drive adoption.",
    keyMessage:
      "Surfacing Training and Safety inside the daily-use shell removes the biggest barrier to adoption — friction. Crews use what's in front of them.",
    sampleQuestion: "Where in your shift today is a crew member forced to leave the app they're working in?",
    color: "border-emerald-500/30",
  },
  {
    role: "Head of Training",
    careAbout: "Crew engagement with training, completion rates and recency",
    openWith:
      "Training only works if crews open it. Putting TrainingManager365 inside the app they already use changes that.",
    keyMessage:
      "TrainingManager365 Dashboard and Personal File appear in the same sidebar as procedures — making training a routine tap, not an occasional detour.",
    sampleQuestion: "How would completion behaviour change if training lived inside the app crews open every shift?",
    color: "border-amber-500/30",
  },
  {
    role: "Head of Safety",
    careAbout: "Reporting volume, timeliness and quality",
    openWith:
      "If reporting takes a separate app, it happens later — or not at all. In-the-moment reporting needs to live where the work lives.",
    keyMessage:
      "SafetyManager365 reporting surfaced inside the operational shell turns occurrence reporting into an in-the-moment habit — more reports, captured sooner, with richer context.",
    sampleQuestion: "How much of your reporting volume is lost to friction between event and report?",
    color: "border-violet-500/30",
  },
  {
    role: "IT / Mobility Lead",
    careAbout: "MDM footprint, app certification, identity and rollout effort",
    openWith:
      "One app to certify, one MDM rollout, one identity integration — instead of three.",
    keyMessage:
      "A single iOS shell with SSO collapses the mobile footprint to one app — simpler MDM, simpler approval, simpler operational support.",
    sampleQuestion: "What's the real cost of approving and deploying three separate Comply365 apps across your estate?",
    color: "border-rose-500/30",
  },
];

// Slide 9 — Why only Comply365
export const competitiveContrast: CompetitiveContrast[] = [
  {
    approach: "Standalone Training app",
    isUs: false,
    insight: "Used rarely",
    speed: "Separate login & UX",
    scope: "Training only",
    intelligence: "No procedure or safety context",
  },
  {
    approach: "Standalone Safety app",
    isUs: false,
    insight: "Opened after the moment",
    speed: "Separate deployment",
    scope: "Safety only",
    intelligence: "Disconnected from training & procedures",
  },
  {
    approach: "Generic MDM / web wrapper",
    isUs: false,
    insight: "Browser-grade UX",
    speed: "Generic shell, not operational",
    scope: "Anything, but nothing well",
    intelligence: "No platform context",
  },
  {
    approach: "Comply365 Unified Mobile App",
    isUs: true,
    insight: "Lives in the daily-use shell",
    speed: "One login, one footprint",
    scope: "Content + Training + Safety",
    intelligence: "Connected platform context",
  },
];

export const moatStatements = [
  "Only Comply365 has a mobile shell crews already open every shift — extending it is fundamentally different from launching a new app.",
  "ContentManager365 is the daily anchor; Training and Safety inherit the trust, the login and the UX patterns that already work.",
  "One iOS shell to certify, MDM and approve — collapsing three customer rollouts into one.",
  "A foundation for unified notifications, in-app navigation and in-app automation across procedures, training and safety.",
];

export const competitiveExplanation =
  "Standalone Training and Safety apps lose to friction — they're opened too rarely to ever feel familiar. A web wrapper has no operational shell to extend. Only Comply365 already lives in the crew's hand every shift.";

// Slide 10 — Objections
export const objections: MobileObjection[] = [
  {
    objection: "Will the standalone Training and Safety apps go away?",
    response:
      "No — standalone apps remain available. The unified app is an additional, lower-friction entry point for customers who run ContentManager365 alongside TrainingManager365 or SafetyManager365.",
    reframe: "Additive, not a replacement. Standalone apps remain.",
  },
  {
    objection: "What about Android?",
    response:
      "Phase 1 is iOS-first because that's where the operational shell already lives in daily frontline use. Android is on the roadmap as the unified experience matures.",
    reframe: "iOS-first because that's where crews already are. Android follows.",
  },
  {
    objection: "Do we need SSO?",
    response:
      "Yes — SSO is required so crews authenticate once and move between mini-apps without re-logging in. It's also what makes the experience feel like one app, not three.",
    reframe: "SSO is the difference between one app and three apps in a trench coat.",
  },
  {
    objection: "Will the UI/UX be fully consistent on day one?",
    response:
      "Honestly, no. Phase 1 surfaces Training inside the existing shell with its current UX. A common UI/UX across mini-apps is the Phase 3 goal — we're being explicit about the journey.",
    reframe: "Phased delivery. We're honest about where day one lands and where we're going.",
  },
  {
    objection: "Is this real today?",
    response:
      "Phase 1 (Training inside the app) is targeted for Q2 2026 and is in active development. Phase 2 (Safety) is Q4 2026. Full unification is 2027+. We're sharing it now so customers can shape it.",
    reframe: "Phased, forward-looking, customer-shaped.",
  },
];

// Slide 11 — Closing
export const positioningLine = "From three apps a shift → one app every shift.";

export const elevatorClosePitch =
  "Comply365 is unifying the mobile experience for frontline workers. The app crews already open every shift — used today for procedures via ContentManager365 — is being extended to surface Training and Safety as embedded mini-apps. One trusted shell, one login, one mobile footprint. Less context shifting. Less cognitive load. One way to deploy.";

export const talkingPoints = [
  "Anchor on the shell that already exists — Comply365 is the only vendor with a mobile app crews open every shift.",
  "Lead with the frontline outcome: less context shifting, less cognitive load, more in-the-moment use of training and safety.",
  "Be explicit about phasing — Phase 1 Q2 2026 (Training, WIP), Phase 2 Q4 2026 (Safety), Phase 3 2027+ (fully unified).",
  "Be honest about constraints up front: iOS-first, SSO required, standalone apps still exist, UI/UX not fully aligned in early phases.",
  "Position as additive — standalone apps remain. The unified app is a lower-friction entry point for customers running ContentManager365 alongside TrainingManager365 or SafetyManager365.",
];

export const discoveryQuestions = [
  "How often do your crews actually open the standalone Training or Safety app in a given week?",
  "Where in a shift today is a crew member forced to leave the app they're working in to do something operational?",
  "What does it cost your IT team to MDM, certify and approve three separate mobile apps across your estate?",
  "If safety reporting happened in-the-moment instead of after the shift, what would change about your reporting volume and quality?",
];

export const nextSteps = [
  {
    step: "Demo Phase 1",
    description: "Walk through the mobile shell with TrainingManager365 surfaced from the sidebar — the Q2 2026 target.",
    timeline: "45 minutes",
  },
  {
    step: "Mobility Workshop",
    description: "Map your crews' current app-switching pain points and identify the highest-friction handoffs to collapse first.",
    timeline: "Half-day",
  },
  {
    step: "Design Partner Program",
    description: "Shape Phase 1 (Q2 2026) and Phase 2 (Q4 2026) as a co-design partner for the unified mobile experience.",
    timeline: "Q1–Q4 2026",
  },
];
