// Week 3 Field Kit — single source of truth shared by the Sales Enablement
// slides AND the downloadable rep field-kit PDF. Keep entries short and
// teachable. All copy must respect locked terminology rules: BrandNumber
// product names, no FOQA/FDM/ASAP raw acronyms, no "90-day pilot" language,
// ~90% vs ~35% Intelligence Layer headline, locked roadmap dates.

export type DtopStep = "D" | "T" | "O" | "P";

export interface DiscoveryQuestion {
  question: string;
  good: string; // what a good answer sounds like
  redFlag: string; // what a red-flag answer sounds like
}

export interface DiscoveryStep {
  step: DtopStep;
  label: string;
  intent: string;
  questions: DiscoveryQuestion[];
}

export const discoveryQuestionBank: DiscoveryStep[] = [
  {
    step: "D",
    label: "Detect",
    intent: "Find out where their signals actually live and what they can't currently see.",
    questions: [
      {
        question: "When something goes wrong operationally, where is the very first place it's logged?",
        good: "They can name the system AND the team that owns it.",
        redFlag: "It depends, several places, or 'usually email'.",
      },
      {
        question: "Which signals are hardest for you to act on today — regulation, anomalies, change requests, or external influences?",
        good: "They pick one and tell you a recent example.",
        redFlag: "Generic answer with no example — they haven't thought about it.",
      },
      {
        question: "How would you know about a weak signal that hasn't become an event yet?",
        good: "They describe a person or a report, not a system.",
        redFlag: "Silence, or 'we'd find out after the event'.",
      },
    ],
  },
  {
    step: "T",
    label: "Trigger",
    intent: "Expose the gap between signal and action — that's where we sell.",
    questions: [
      {
        question: "When a safety signal lands, what triggers a procedure or training change?",
        good: "A defined committee or workflow, with a name and a cadence.",
        redFlag: "'It's discussed in the next safety meeting' — that's a 30-day gap.",
      },
      {
        question: "How long, on average, from signal to a procedure update reaching the crew?",
        good: "They give you a number and own it.",
        redFlag: "Weeks, months, or 'I'd have to ask'.",
      },
      {
        question: "Who has authority to trigger a change without a meeting?",
        good: "A named role with clear thresholds.",
        redFlag: "Nobody — everything needs a committee.",
      },
    ],
  },
  {
    step: "O",
    label: "Orchestrate",
    intent: "Map the disconnected stack — safety, content, training — and the manual glue between them.",
    questions: [
      {
        question: "Walk me through how a procedure change today reaches the right crew and gets paired with the right training.",
        good: "They describe a clean, owned process end-to-end.",
        redFlag: "Three different tools and someone copy-pasting between them.",
      },
      {
        question: "How many systems does a single change touch before it's live on the device?",
        good: "One or two — they've already consolidated.",
        redFlag: "Four or more, with manual handoffs.",
      },
      {
        question: "When a regulation changes, how do you know which procedures and which crews are affected?",
        good: "A traceability matrix or linked data model.",
        redFlag: "A spreadsheet, or 'our compliance team works it out'.",
      },
    ],
  },
  {
    step: "P",
    label: "Prove",
    intent: "Surface the audit pain — this is the cheapest yes you'll ever get.",
    questions: [
      {
        question: "If a regulator asked for proof your last five safety actions actually closed the loop, how long would that take?",
        good: "Minutes, with a single query.",
        redFlag: "A project — multiple people, multiple systems, days of work.",
      },
      {
        question: "How do you measure whether a training intervention actually changed behaviour?",
        good: "Linked operational data, not completion rates.",
        redFlag: "'Training completion %' — that's a vanity metric.",
      },
      {
        question: "Where does the evidence for your last audit live today?",
        good: "One platform, queryable, owned.",
        redFlag: "A shared drive someone rebuilt the night before.",
      },
    ],
  },
];

export interface PersonaPlay {
  id: string;
  role: string;
  painOneLiner: string;
  onlyTheyCanAnswer: string[];
  metricTheyCareAbout: string;
  landmine: string;
  proofArtifact: string;
}

export const personaPlaybook: PersonaPlay[] = [
  {
    id: "ceo-coo",
    role: "CEO / COO",
    painOneLiner: "Held accountable for outcomes they can't currently prove or predict.",
    onlyTheyCanAnswer: [
      "What's the one operational risk that would put you on a regulator's front page this year?",
      "If we showed your board a measurable shift from reactive to controlled in twelve months, what would they ask first?",
    ],
    metricTheyCareAbout: "Controllable cost of operational disruption + systemic risk exposure.",
    landmine: "Don't talk features. Don't say 'AI'. Talk operating model, board-readiness, peer benchmarks.",
    proofArtifact: "Executive Pitch 3 — Why Comply365 + Customer Outcomes (550+ airlines).",
  },
  {
    id: "vp-safety",
    role: "VP Safety / Head of SMS",
    painOneLiner: "Drowning in detections, can't prove the loop closed, audit prep is a project.",
    onlyTheyCanAnswer: [
      "What signals do you wish you saw earlier — and what stops you?",
      "How do you trace a safety action to a measurable change in behaviour?",
    ],
    metricTheyCareAbout: "SMS maturity (Level 2/3 → Level 4 predictive) + audit-readiness time.",
    landmine: "Don't say FOQA / FDM / ASAP — say Operational Data and Generative AI. Don't pitch a new SMS; we extend theirs.",
    proofArtifact: "Intelligence Layer slide (~90% vs ~35%) + Regulation Management playbook.",
  },
  {
    id: "vp-ops",
    role: "VP Operations",
    painOneLiner: "Tomorrow's disruption is already brewing in today's signals — nobody can see it in time.",
    onlyTheyCanAnswer: [
      "What disruption pattern keeps repeating that you can't get ahead of?",
      "How does your OCC currently know a procedural change has landed on crew devices?",
    ],
    metricTheyCareAbout: "On-time performance + completion factor + crew-to-device latency.",
    landmine: "Don't talk safety theory. Talk OTP, completion factor, and minutes saved per disruption.",
    proofArtifact: "DTOP whiteboard + Unified Mobile capability slide.",
  },
  {
    id: "training-director",
    role: "Training & L&D Director",
    painOneLiner: "Training assignment is reactive and bulk; nobody proves it changed behaviour.",
    onlyTheyCanAnswer: [
      "When safety data flags a competency gap, how long until the right crew is reassigned the right module?",
      "How do you prove a training intervention actually moved the operational metric?",
    ],
    metricTheyCareAbout: "Targeted training rate + behaviour-change evidence (not completion %).",
    landmine: "Don't pitch an TMS replacement. Pitch closed-loop targeting on top of what they own.",
    proofArtifact: "Capstone whiteboard — one use case, every capability, one DTOP loop.",
  },
  {
    id: "cio-it",
    role: "CIO / IT Director",
    painOneLiner: "Integration sprawl, AI governance, and a board asking 'is our data safe?'.",
    onlyTheyCanAnswer: [
      "Which of your safety, content, training and ops tools is the most painful integration today?",
      "What does your AI governance board need to see before you let a vendor model touch your data?",
    ],
    metricTheyCareAbout: "Integration count reduced + tenant-isolated AI + SSO/SAML + predictable TCO.",
    landmine: "Don't promise model training on their data. Tenant-isolated, domain-tuned, your data stays yours.",
    proofArtifact: "Intelligence Layer vs Generic AI slide + Platform Overview + roadmap dates.",
  },
];

export interface Competitor {
  name: string;
  position: string; // how they position themselves
  stopsAt: DtopStep; // where they stop in DTOP
  reframe: string; // one-sentence Comply365 reframe
  trapQuestion: string; // question to ask the prospect that exposes the gap
}

export const competitiveCheatSheet: Competitor[] = [
  {
    name: "Standalone SMS (Ideagen / Coruson / IQSMS)",
    position: "We are the safety system of record.",
    stopsAt: "D",
    reframe: "Great at Detect. Stops there — no Trigger into content or training, no Prove across the loop.",
    trapQuestion: "When your SMS flags a pattern, what automatically updates in your manuals and training?",
  },
  {
    name: "Web Manuals / legacy Comply365 content",
    position: "We are the content system of record.",
    stopsAt: "O",
    reframe: "Strong at Orchestrate-content. No native Detect, no Trigger from operational signals, no Prove of behaviour change.",
    trapQuestion: "How does your content system know which procedure to revise when a safety signal lands?",
  },
  {
    name: "Vistair",
    position: "Document management for aviation.",
    stopsAt: "O",
    reframe: "Documents only. Doesn't unify safety + training, no intelligence layer, no proof of loop closure.",
    trapQuestion: "When a regulation changes, how do you trace it to affected procedures, affected crews, and the training they need?",
  },
  {
    name: "TMS-only (FlightLogger, Cornerstone, in-house)",
    position: "We are the training system of record.",
    stopsAt: "O",
    reframe: "Assigns training. Doesn't know which training to assign from operational data, and can't prove it changed behaviour.",
    trapQuestion: "How does your TMS decide who needs retraining when a safety pattern emerges?",
  },
  {
    name: "Generic AI / ChatGPT / Copilot",
    position: "Universal AI assistant.",
    stopsAt: "T",
    reframe: "~35% domain accuracy on aviation tasks vs our ~90% at Levels 4–5. Hallucinates regulation context. No platform behind it.",
    trapQuestion: "Who is accountable when generic AI hallucinates a regulation citation in your manual?",
  },
  {
    name: "Build-our-own / SI consultancy",
    position: "We'll integrate what you already have.",
    stopsAt: "O",
    reframe: "Years to build, owned by you forever. We ship the connected operating model and 550+ airlines already validated it.",
    trapQuestion: "What's your team's three-year cost to build and maintain this versus consuming it as a platform?",
  },
];

export interface DealStage {
  from: string;
  to: string;
  goal: string;
  bringNext: string;
  scriptedLine: string;
}

export const dealStageLanguage: DealStage[] = [
  {
    from: "First call",
    to: "Working session",
    goal: "Earn 60 minutes with the right two people in the room.",
    bringNext: "Their VP Safety + the person who owns content or training.",
    scriptedLine:
      "Based on what you've described, the highest-value next step is a 60-minute working session with you and [name] where we walk your highest-cost use case through the loop. Can we put that on the calendar this side of [date]?",
  },
  {
    from: "Working session",
    to: "Focused use-case session",
    goal: "Lock the one use case and the Prove milestone.",
    bringNext: "An operational owner who has the data and can sign off on the milestone.",
    scriptedLine:
      "Let's anchor on one use case — the one that hurts most. We'll bring a focused walkthrough on your data shape, and you'll see the loop close end-to-end. What's the one use case you'd put first?",
  },
  {
    from: "Focused use-case session",
    to: "Executive readout",
    goal: "Get exec sponsorship and align on the outcome story.",
    bringNext: "Your champion + their COO or VP Ops, plus a finance contact.",
    scriptedLine:
      "The board question is 'what does this change in twelve months?' — let's frame the readout around the measurable shift, not the feature list. Who from your exec team needs to be in that room?",
  },
  {
    from: "Executive readout",
    to: "Commercial scoping",
    goal: "Align on outcome, milestone, commercial shape and timing.",
    bringNext: "Procurement, plus IT/security for the governance pre-work.",
    scriptedLine:
      "We have alignment on the outcome — let's now scope commercially against that outcome, not against a feature checklist. Can we get procurement and security in the same room next?",
  },
];

export interface ExpandedObjection {
  objection: string;
  acknowledge: string;
  reframe: string;
  bridge: string;
  proofArtifact: string;
}

export const expandedObjections: ExpandedObjection[] = [
  {
    objection: "We already have an SMS.",
    acknowledge: "Good — that's the right foundation.",
    reframe: "Your SMS is strong at Detect. The gap is what happens between a detection and a procedure or training change actually reaching the crew.",
    bridge: "Want a focused walkthrough on how DTOP starts where your SMS stops?",
    proofArtifact: "DTOP whiteboard + Intelligence Layer slide.",
  },
  {
    objection: "We have Vistair / legacy Comply365 for content.",
    acknowledge: "Understood — content distribution is solved.",
    reframe: "Documents move; the loop doesn't close. There's no Trigger from operational signals and no Prove that the change altered behaviour.",
    bridge: "Can I show you the same content flow, but wired to live safety signals?",
    proofArtifact: "Platform Overview + ContentManager365 capability slide.",
  },
  {
    objection: "AI is not allowed by our security team.",
    acknowledge: "Sensible — most operators are in that position.",
    reframe: "Our Intelligence Layer is tenant-isolated, aviation-tuned, and does not train on your data. The operating model also works rules-only — AI amplifies it, isn't required.",
    bridge: "Want a 20-minute walkthrough with your security lead on the governance model?",
    proofArtifact: "Intelligence Layer vs Generic AI slide + tenant isolation diagram.",
  },
  {
    objection: "Our regulators won't approve this.",
    acknowledge: "Fair — regulator alignment is non-negotiable.",
    reframe: "550+ airlines on 6 continents already run on this platform, including under EASA, FAA, CAA and TCCA regimes. The platform generates the audit evidence regulators are now asking for.",
    bridge: "Want a focused walkthrough on the regulation-management use case, with named precedents?",
    proofArtifact: "Regulation Management playbook + Customer Outcomes slide.",
  },
  {
    objection: "We just bought a training management system.",
    acknowledge: "Understood — and we're not asking you to replace it.",
    reframe: "Your TMS executes training. The gap is upstream — knowing which training to assign from operational signals and proving it changed behaviour.",
    bridge: "Want to see how the loop closes on top of the TMS you already own?",
    proofArtifact: "Capstone whiteboard + Recommendations use cases.",
  },
  {
    objection: "Budget is locked for this year.",
    acknowledge: "Real — budget cycles don't move for vendors.",
    reframe: "The goal of the next conversation isn't a purchase — it's locking the use case and the measurable outcome so you're ready when the cycle opens.",
    bridge: "Can we use the rest of this year to scope the use case so you can move on day one of the next cycle?",
    proofArtifact: "Executive Pitch 3 + Deal-Stage Next-Step language sheet.",
  },
  {
    objection: "We tried something like this two years ago and it failed.",
    acknowledge: "Genuinely appreciate you saying that — most fail because they sold a product, not an operating model.",
    reframe: "The reason this works is the operating model — DTOP — wrapped around the platform. Tools without the loop always stall at Orchestrate.",
    bridge: "Want to walk through what stalled it, and where DTOP closes that specific gap?",
    proofArtifact: "DTOP whiteboard runbook + Customer Outcomes.",
  },
  {
    objection: "We're a small operator — this is overkill.",
    acknowledge: "Fair — scale matters in how we deploy.",
    reframe: "The platform scales down. Start with a single use case, single app footprint, and the same DTOP loop — the value lever is the same; the deployment is sized to you.",
    bridge: "Want a focused walkthrough on the one use case that would matter most to your operation?",
    proofArtifact: "Footprint One-App whiteboard + Value Ladder.",
  },
];

export interface UseCaseCheatRow {
  name: string;
  plain: string;
  question: string;
  listenFor: string;
  dtop: DtopStep;
  proof: string;
}

export const useCaseCheatSheetRows: UseCaseCheatRow[] = [
  {
    name: "Safety signal → procedure update",
    plain: "A weak safety signal triggers an Intelligence Layer recommendation, the manual updates, and the change reaches the crew on next login.",
    question: "When a safety signal lands, how long until the relevant procedure actually changes?",
    listenFor: "'It goes to the safety committee', 'next quarterly review', 'we discuss it'.",
    dtop: "T",
    proof: "DTOP whiteboard + Intelligence Layer slide.",
  },
  {
    name: "Regulation change → targeted training",
    plain: "A new regulatory rule maps to affected procedures, generates a training module, and assigns it to the right crew — not the whole fleet.",
    question: "How do you trace a regulation change to the people who actually need retraining?",
    listenFor: "'Everyone does the annual refresh', 'compliance team builds a matrix'.",
    dtop: "O",
    proof: "Regulation Management playbook + Capstone whiteboard.",
  },
  {
    name: "Fatigue trend → roster intervention",
    plain: "Operational Data surfaces a fatigue pattern early; Intelligence Layer recommends roster adjustments before it becomes a safety event.",
    question: "What signals would you want to see before a fatigue trend turned into an incident?",
    listenFor: "'Our fatigue reports are monthly', 'rosters are fixed 28 days out'.",
    dtop: "D",
    proof: "Signal Sources slide + Intelligence Layer use cases.",
  },
  {
    name: "Ops disruption → crew comms",
    plain: "A live disruption triggers targeted notifications and the right procedural content on the crew's mobile, not a broadcast email.",
    question: "How does today's irregular-ops comms reach the specific crews affected — and how do you prove they read it?",
    listenFor: "'Group email', 'WhatsApp', 'crew should check the portal'.",
    dtop: "O",
    proof: "Unified Mobile capability + DTOP runbook.",
  },
  {
    name: "Audit prep → continuous proof",
    plain: "Every loop is logged. Audit becomes a query, not a project — proof of control already exists.",
    question: "If a regulator asked for proof your last 5 safety actions closed the loop, how many people would that involve?",
    listenFor: "'It's a project', 'we'd pull a team together', 'a few weeks'.",
    dtop: "P",
    proof: "Insights slide + Customer Outcomes.",
  },
  {
    name: "Anomaly cluster → procedure + training change",
    plain: "Repeated minor anomalies cluster into a pattern; Intelligence Layer flags it, recommends a procedure revision, and pushes targeted training in the same loop.",
    question: "How do you currently catch the second or third minor anomaly before it becomes a serious event?",
    listenFor: "'We rely on the reporting culture', 'our analyst spots it monthly'.",
    dtop: "D",
    proof: "Capstone whiteboard + Recommendations use cases.",
  },
  {
    name: "New aircraft type → procedure + training rollout",
    plain: "A fleet change triggers procedure rewrite, targeted training assignment, and a Prove milestone — orchestrated as one loop, not three projects.",
    question: "Last fleet change — how many systems did your team have to touch to get crews ready?",
    listenFor: "'Four or five', 'a multi-month programme', 'we built a tracker'.",
    dtop: "O",
    proof: "Capability Cheat Sheet + Footprint All-Three whiteboard.",
  },
];

export interface ReadinessDay {
  day: string;
  focus: string;
  outcome: string;
}

export const thirtyDayCalendar: ReadinessDay[] = [
  {
    day: "Days 1–7 · Read",
    focus: "Read the Enablement deck end-to-end. Re-listen to each narration once. Then read Executive Pitch 3 alongside it — every Enablement slide teaches an Exec Pitch slide.",
    outcome: "Can give the one-sentence platform pitch and walk the DTOP loop on a whiteboard without notes.",
  },
  {
    day: "Days 8–14 · Shadow",
    focus: "Sit on two live calls. One discovery, one walkthrough. Listen for the discovery questions. Note objections that came up and how they were handled.",
    outcome: "Can match each call moment to a slide in this academy and name the persona in the room.",
  },
  {
    day: "Days 15–21 · Practice",
    focus: "Run three Practice Center sessions: one VP Safety, one VP Ops, one CIO. Use the Acknowledge → Reframe → Bridge pattern on every objection. Score yourself.",
    outcome: "Can handle the top 8 objections without thinking and book the next step on every session.",
  },
  {
    day: "Days 22–30 · Lead",
    focus: "Lead a real discovery call. Use the Discovery-Call Runbook. End with the scripted next-step line from the Deal-Stage sheet. Debrief with your manager.",
    outcome: "First focused use-case session booked, with the right two people in the room.",
  },
];

export const stepColor: Record<DtopStep, string> = {
  D: "text-sky-300 border-sky-500/40 bg-sky-500/10",
  T: "text-amber-300 border-amber-500/40 bg-amber-500/10",
  O: "text-violet-300 border-violet-500/40 bg-violet-500/10",
  P: "text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
};

export const stepName: Record<DtopStep, string> = {
  D: "Detect",
  T: "Trigger",
  O: "Orchestrate",
  P: "Prove",
};

// ---------------------------------------------------------------------------
// Who-to-Target — high-propensity accounts, anchored on existing Comply365
// footprint. The easiest, fastest, highest-win-rate motion is expanding
// inside customers who already trust one of the apps.
// ---------------------------------------------------------------------------

export interface PropensityTier {
  tier: string; // "Tier 1"
  label: string; // headline label
  who: string; // who qualifies
  why: string; // why they're high-propensity
  talkTrack: string; // how to open the conversation
  nextStep: string; // what to put on the table
  accent: "emerald" | "sky" | "violet";
}

export const propensityTiers: PropensityTier[] = [
  {
    tier: "Tier 1",
    label: "One app live · renewal in <12 months",
    who: "Single-app customer (SafetyManager365, ContentManager365 or TrainingManager365) with a renewal window inside the next 12 months.",
    why: "Highest propensity. They already trust the brand. The renewal is the trojan horse — lift the conversation out of price and into platform.",
    talkTrack:
      "Reframe the renewal as a strategic review. Don't lead with pricing — lead with where they are on the Operational Performance Roadmap.",
    nextStep: "Offer the 3-hour Strategy & Vision Session as the renewal conversation.",
    accent: "emerald",
  },
  {
    tier: "Tier 2",
    label: "Two apps live · already proved value twice",
    who: "Customers running two of the three Core Apps — they've already crossed the integration trust threshold.",
    why: "They've proved value twice. The third app plus the Intelligence Layer is the unlock — and they're pre-qualified on procurement.",
    talkTrack:
      "Show what the third app + platform-wide intelligence opens up. Anchor on a cross-domain use case only the full footprint can answer.",
    nextStep: "Walkthrough on one cross-domain use case, then book the Strategy & Vision Session with their exec sponsor.",
    accent: "sky",
  },
  {
    tier: "Tier 3",
    label: "Strategic / multi-BU customer",
    who: "Multi-business-unit or multi-region customer already on the platform — the kind of account where the board is asking about AI and operational performance.",
    why: "The story they need is the roadmap, not the next feature. They're the natural home for the Operational Performance Roadmap conversation.",
    talkTrack:
      "Lead with the roadmap and the vision. Position the 3-hour session as a peer-level strategy workshop with their leadership team.",
    nextStep: "Book the Strategy & Vision Session as a joint exec workshop — bring our AE + SE, they bring exec + ops + IT.",
    accent: "violet",
  },
];

export const tier1Signals: string[] = [
  "Renewal date inside the next 12 months",
  "Named exec sponsor on the account",
  "Recent audit finding, incident or regulator chatter",
  "Visible mobile or training gap in their day-to-day requests",
  "No AI vendor locked in for operational data yet",
];

export const whoNotToChaseFirst: string[] = [
  "Cold prospects with no Comply365 footprint",
  "RFPs we didn't shape",
  "Single-app POCs against an entrenched incumbent",
];

// ---------------------------------------------------------------------------
// Strategy & Vision Session — complimentary 3-hour workshop. Fixed agenda
// reps can put on the table without scoping.
// ---------------------------------------------------------------------------

export interface AgendaBlock {
  time: string;
  title: string;
  detail: string;
  isBreak?: boolean;
}

export const visionSessionAgenda: AgendaBlock[] = [
  {
    time: "0:00 – 0:20",
    title: "Where the industry is going",
    detail: "The shift from prescriptive compliance to performance-based oversight. DTOP in plain English.",
  },
  {
    time: "0:20 – 0:50",
    title: "The platform story",
    detail: "One platform, three Core Apps, one Intelligence Layer, one Unified Mobile — wired together by DTOP.",
  },
  {
    time: "0:50 – 1:25",
    title: "Capabilities deep-dive",
    detail: "Tailored to their current footprint. Insights, Recommendations, Automation — anchored on their data shape.",
  },
  {
    time: "1:25 – 1:35",
    title: "Break",
    detail: "Coffee. Informal questions. The room usually starts opening up here.",
    isBreak: true,
  },
  {
    time: "1:35 – 2:05",
    title: "Operational Performance Roadmap",
    detail: "Where they are today on the L1→L5 curve. What L4 predictive looks like for their operation.",
  },
  {
    time: "2:05 – 2:45",
    title: "Their DTOP loop, end-to-end",
    detail: "One of their real use cases walked Detect → Trigger → Orchestrate → Prove on a whiteboard.",
  },
  {
    time: "2:45 – 3:00",
    title: "Agreed next step",
    detail: "Scope the focused use-case session, name the exec sponsor, lock the date.",
  },
];

export const visionSessionAttendees: string[] = [
  "Exec sponsor (CEO / COO)",
  "VP Safety or Head of SMS",
  "VP Operations",
  "Training & L&D lead",
  "IT / Data lead",
  "Comply365 AE + SE",
];

export const visionSessionLeaveBehind: string[] = [
  "One-page Operational Performance maturity snapshot",
  "Candidate first DTOP use case",
  "90-day 'what's possible' view",
];

export const visionSessionRepTalkTrack: { step: string; line: string }[] = [
  {
    step: "Acknowledge",
    line: "Totally hear you on [the day-to-day request] — we'll get that handled in parallel.",
  },
  {
    step: "Reframe",
    line: "The bigger question your leadership is being asked is where you'll be on operational performance in twelve months — and that one doesn't get answered in a ticket.",
  },
  {
    step: "Propose",
    line: "We run a complimentary 3-hour Strategy & Vision Session for that — fixed agenda, on-site or virtual, your team plus ours. Want me to send the agenda and propose two dates?",
  },
];