// Sales Enablement Academy — per-slide STUDY NOTES.
//
// These slides are INTERNAL training material. The one-pager is a study note,
// not a delivery script: a sales rep should be able to read it and leave the
// page genuinely smarter on the topic.
//
// Voice rules respected: BrandNumber names (Comply365, SafetyManager365,
// ContentManager365, TrainingManager365 — no spaces). Approved terminology
// only — Generative AI, Recommended Actions, Operational Data, Intelligence
// Layer. Never FOQA / FDM / ASAP, never legacy "CoAnalyst" in copy.
// All ASCII — sanitiser strips anything outside Latin-1 at render time.

export interface StudyTerm {
  term: string;
  definition: string;
}

export type BeatLabel =
  | "Why this matters"
  | "What's on the slide"
  | "Core message"
  | "The pain"
  | "The value lever"
  | "How to deliver"
  | "Roadmap honesty"
  | "Discovery question"
  | "Transition";

export interface KeyPoint {
  beat: BeatLabel;
  /** Headline takeaway for this beat (≤ ~30 words). */
  point: string;
  /** Supporting bullets — 0–3 lines of detail / verbatim phrasing / nuance. */
  support: string[];
}

export interface SlideOnePager {
  /** The concept defined in one sentence — the thing the rep must own. */
  inOneSentence: string;
  /** Where this sits in the platform story; why a buyer cares. 2-3 sentences. */
  whyItMatters: string;
  /** 3-5 short bullets describing the visual on the slide itself: shapes,
   *  diagrams, columns, numbers, colour story — what the rep is actually
   *  looking at. Optional on STUDY_NOTES entries; supplied via the
   *  WHATS_ON_SLIDE map at the bottom of this file when absent. */
  whatsOnSlide?: string[];
  /** 3-4 concept paragraphs (each ~15-30 words). No paraphrase loops. */
  keyIdeas: string[];
  /** 3-5 glossary entries scoped to this slide. */
  terms: StudyTerm[];
  /** Up to 3 defensible facts (with source where applicable). */
  facts: string[];
  /** Common misconception or forbidden language for this topic. */
  watchOut: string;
  /** Where this slide sits in the wider story (DTOP step, Core App, etc.). */
  connectsTo: string[];
  /** 3 diagnostic questions a rep must answer out loud before moving on. */
  checkYourself: string[];
  /** Single-sentence digest of the narration (auto-derived from script when available). */
  narrationInOneLine?: string;
  /** Narration parsed into 5-part beats (auto-derived from script when available). */
  keyPoints?: KeyPoint[];
}

export type WeekId = "w1" | "w2" | "w3";

// ─── Shared glossary atoms reused across slides ─────────────────────────────
const T = {
  dtop: {
    term: "DTOP",
    definition:
      "Comply365's loop: Detect, Trigger, Orchestrate, Prove. The only loop with both a Detect step and a Prove step.",
  },
  detect: { term: "Detect", definition: "The signals layer. It pulls four signals into one stream: operations, safety, rules, training." },
  trigger: { term: "Trigger", definition: "Turns the signal into the right next action. Every action shows its source." },
  orchestrate: { term: "Orchestrate", definition: "Moves the work through the systems the team already uses. Routing, review, training, device sync." },
  prove: { term: "Prove", definition: "Closes the loop with audit-ready evidence a regulator will accept." },
  operationalData: {
    term: "Operational Data",
    definition:
      "The connected base under the platform. Safety events, procedures, training records and rule changes, all kept in the customer's own tenant.",
  },
  intelligenceLayer: {
    term: "Intelligence Layer",
    definition:
      "Aviation-trained Generative AI. It reads the customer's Operational Data and a 4,000+ aviation knowledge graph. Every answer shows its source.",
  },
  insights: { term: "Insights", definition: "Always-on watcher. It spots patterns and new risk in connected data, with evidence attached to each one." },
  automation: { term: "Automation", definition: "Handles the safe, routine busywork between systems. A human still checks any change to a procedure or training." },
  unifiedMobile: { term: "Unified Mobile", definition: "One app for the crew. Content, training and safety reporting in a single shell. The last mile of DTOP." },
  coreApps: { term: "Core Apps", definition: "The three apps on the Operational Data base: SafetyManager365, ContentManager365, TrainingManager365." },
  recommendedActions: { term: "Recommended Actions", definition: "Ranked next steps, each one with its evidence. The approved word — not 'suggestions'." },
  svs: {
    term: "Strategy & Vision Session",
    definition:
      "A free three-hour session with a fixed agenda. The domain team runs it on the buyer's own operating model. This is the next step we close on.",
  },
  walkthrough: {
    term: "Walkthrough",
    definition: "A focused session on the buyer's highest-cost use case. The approved word — not 'demo' or 'pilot'.",
  },
  lineOfSight: {
    term: "Line-of-Sight",
    definition: "Our model that sizes controllable cost, systemic risk and performance against the buyer's own footprint.",
  },
};

// ─── Curated study notes ────────────────────────────────────────────────────
export const STUDY_NOTES: Record<string, SlideOnePager> = {
  // ============= Week 1 · Foundation =============
  "se-slide-0": {
    inOneSentence:
      "A rep at Comply365 sells the first connected operating model in aviation. They do not sell the software underneath.",
    whyItMatters:
      "The whole Academy points to one outcome. The rep can hold an operating-model talk before they show a single feature. Skip the model and the meeting turns into another tool tour, and our edge is gone.",
    keyIdeas: [
      "The platform is the proof. The operating model is the story. DTOP is the loop that makes the story real to a buyer.",
      "The Academy is three weeks. Week 1 Foundation, Week 2 Capabilities, Week 3 Sell & Win. Each week builds on the last. Do not skip.",
      "Every recap slide is a rehearsal, not new content. Read it out loud until it sounds natural before you move on.",
    ],
    terms: [T.dtop, T.coreApps, T.intelligenceLayer, T.svs],
    facts: [
      "Three weeks of study. About 50 slides across Foundation, Capabilities and Sell & Win.",
      "For reps only. Not built to share with customers.",
    ],
    watchOut:
      "Do not pitch features in Week 1. Earn the right to talk product by anchoring on the operating model first.",
    connectsTo: ["Week 1 · Foundation", "Practice Center"],
    checkYourself: [
      "Can I say what 'operating model' means here in one sentence?",
      "Can I name the three weeks and what each one teaches?",
      "Why is DTOP the heart of the story, not the platform diagram?",
    ],
  },

  "se-week-1": {
    inOneSentence:
      "Week 1 gives the rep three tools: a one-line platform pitch, the DTOP loop on a whiteboard, and the four signal sources from memory.",
    whyItMatters:
      "Without these three tools, the talk slides into a feature compare. With them, the rep can run a 20-minute discovery on operating model alone, then earn the right to show capabilities.",
    keyIdeas: [
      "Four bands to learn by heart: Core Apps, Intelligence and Orchestration, Unified Mobile, and DTOP wrapping all three.",
      "Two pictures the rep must draw cold: the platform diagram and the DTOP loop.",
      "The end-of-week recap is a rehearsal. Repeat it until it sounds natural before you open Week 2.",
    ],
    terms: [T.coreApps, T.intelligenceLayer, T.unifiedMobile, T.dtop],
    facts: [
      "Five visible boxes: three Core Apps, one Intelligence Layer, one Unified Mobile. All on the Operational Data base.",
      "DTOP drawing target: 90 seconds, six strokes, in colour.",
    ],
    watchOut: "Do not move into Week 2 until the recap sounds natural without notes.",
    connectsTo: ["Strategic Shift", "DTOP loop", "Signal Sources"],
    checkYourself: [
      "Can I name the four bands in order?",
      "Can I draw DTOP from memory, in colour, in under 90 seconds?",
      "Can I say the one-line platform pitch without reading it?",
    ],
  },

  "se-slide-shift": {
    inOneSentence:
      "Regulators have shifted. The old question was 'did you tick the box?' The new one is 'can you prove the loop closed?'",
    whyItMatters:
      "This is why buyers take the meeting. Their bosses now want proof the fix worked, not just records that it was logged. Their old tools cannot give that proof. It is a tool problem, not a team problem.",
    keyIdeas: [
      "The question used to be 'did you do the training?' Now it is 'did the behaviour change?'",
      "Tools built for records cannot show outcome proof on demand. The gap is in the system, not the team.",
      "The cost the industry can control sits around $25-35B a year (Eurocontrol, IATA, SITA). That is the exposure this shift creates.",
    ],
    terms: [
      { term: "Prescriptive compliance", definition: "Did you do the action? It tests records." },
      { term: "Performance-based oversight", definition: "Did the action work? It tests evidence." },
      T.prove,
    ],
    facts: [
      "Industry exposure: $25-35B in controllable operational cost (Eurocontrol, IATA, SITA).",
      "Major aviation regulators — FAA, EASA, CAA, CASA — are moving to outcome-evidence rules.",
    ],
    watchOut:
      "Do not open with product or AI. Do not list regulators by name. Do not say 'digital transformation'.",
    connectsTo: ["Plain-English Shift", "DTOP · Prove"],
    checkYourself: [
      "Can I land the shift in under 30 seconds without naming a product?",
      "What is the gap between prescriptive compliance and performance-based oversight?",
      "Where does the $25-35B number come from?",
    ],
  },

  "se-plain-english-shift": {
    inOneSentence:
      "Aviation is not short on data. It is short on signals it can act on, and proof the action worked.",
    whyItMatters:
      "This is the plain-English version of the regulator shift. It works in any room, not just compliance. Most operators already feel their stacks are cut off from each other. This slide names that feeling.",
    keyIdeas: [
      "Three stacks today: safety, content, training. Each one runs in its own world.",
      "A signal that lands in one stack rarely reaches the others. A human has to chase it.",
      "The platform joins the three stacks together, with the Intelligence Layer on top.",
    ],
    terms: [T.coreApps, T.intelligenceLayer, T.operationalData],
    facts: [
      "Most operators run 5-7 separate tools across safety, content and training.",
      "Wedge question: which of the three stacks is most cut off today?",
    ],
    watchOut:
      "No off-list ROI numbers here. This is a message slide, not a business case.",
    connectsTo: ["Strategic Shift", "What Is the Platform"],
    checkYourself: [
      "Can I name the three cut-off stacks?",
      "Can I ask the wedge question that comes next?",
      "Why is this a message slide, not a modelling slide?",
    ],
  },

  "se-slide-whatis": {
    inOneSentence:
      "Comply365 is one Operational Performance Platform. Three Core Apps sit on one Operational Data base. The Intelligence Layer sits on top. Unified Mobile is the last mile to the crew.",
    whyItMatters:
      "This picture is the rep's anchor in almost every meeting. Buyers compare us to five-to-seven point tools. This slide moves the talk to one shared base. That base is the only place our edge really shows.",
    keyIdeas: [
      "Order matters. Base first, then Core Apps, then Intelligence Layer on top, then Unified Mobile on the device.",
      "Three Core Apps share one base: SafetyManager365, ContentManager365, TrainingManager365.",
      "The Intelligence Layer thinks across all three apps. Unified Mobile is the last mile to the crew, not a separate app.",
      "Hold back from deep dives. The job here is to land the shape, not the features.",
    ],
    terms: [T.operationalData, T.coreApps, T.intelligenceLayer, T.unifiedMobile, T.dtop],
    facts: [
      "Five visible boxes: 3 Core Apps, 1 Intelligence Layer, 1 Unified Mobile.",
      "One base under all five. That base is our moat.",
    ],
    watchOut: "Do not read the boxes left to right. Start at the base and build up. Say 'one platform' — never 'modules' or 'suite'.",
    connectsTo: ["DTOP loop", "Signal Sources"],
    checkYourself: [
      "Can I draw the five boxes, base first, in under 60 seconds?",
      "Can I name the three Core Apps in BrandNumber format?",
      "Why does the order matter when I walk this diagram?",
    ],
  },

  "se-slide-dtop": {
    inOneSentence:
      "DTOP is the closed loop from signal to proof: Detect, Trigger, Orchestrate, Prove.",
    whyItMatters:
      "DTOP is the operating model, not a feature. It is the only loop with a real Detect step and a real Prove step. Workflow tools have neither. That is why this loop is our edge.",
    keyIdeas: [
      "Detect: pulls four signals into one place — operations, safety, rules, training.",
      "Trigger: turns the signal into the right next action. Cited, not guessed.",
      "Orchestrate: moves the work through the systems already in place. Revision routing, review, training, device sync.",
      "Prove: closes the loop with audit-ready evidence a regulator will accept.",
    ],
    terms: [T.detect, T.trigger, T.orchestrate, T.prove],
    facts: [
      "The only loop on the market with a Detect step and a Prove step.",
      "Point tools cover one of the four signal sources, at best.",
      "Whiteboard colours: D blue, T amber, O violet, P emerald.",
    ],
    watchOut: "Do not pitch DTOP as 'workflow with a fancy name'. Workflow moves tasks. DTOP closes a loop. Never use FOQA, FDM or ASAP.",
    connectsTo: ["Signal Sources", "Whiteboard Drill", "Value Unlocked"],
    checkYourself: [
      "Can I say what D, T, O and P each do in one sentence?",
      "Why is 'workflow' the wrong word for DTOP?",
      "What wedge question do I ask after I draw Detect?",
    ],
  },

  "se-slide-dtop-whiteboard": {
    inOneSentence:
      "The DTOP whiteboard drill: six strokes, 90 seconds, in colour, without looking at the deck.",
    whyItMatters:
      "Drawing the loop earns more trust than the same loop on a slide. The room shifts from 'pitch' to 'working session' the moment the rep picks up the pen. This is the single highest-conviction artefact in the academy.",
    keyIdeas: [
      "Stroke order: D (blue), T (amber), O (violet), P (emerald), closing loop arrow, four signal chips below Detect.",
      "Each stroke has one sentence — the line on the right of the slide is the line you say out loud.",
      "The colour story matches every diagram in the deck — your whiteboard then matches the slides.",
      "Pause after each letter for the buyer to react; the pause after Detect is where discovery starts.",
    ],
    terms: [T.detect, T.trigger, T.orchestrate, T.prove],
    facts: [
      "Target time: 90 seconds, six strokes.",
      "Four signal chips: Regulation, Anomalies, Operational Change Requests, Macro/Geopolitical.",
    ],
    watchOut:
      "Don't draw silently. Don't draw out of order. Don't keep drawing through the pause — that pause IS the discovery.",
    connectsTo: ["DTOP slide", "Whiteboard Runbook"],
    checkYourself: [
      "Can I draw all six strokes in 90 seconds without looking at the deck?",
      "What colour is each DTOP letter?",
      "Why does the colour story matter?",
    ],
  },

  "se-slide-dtop-whiteboard-runbook": {
    inOneSentence:
      "Use the whiteboard the moment a customer says 'show me' or 'I don't get how this connects'.",
    whyItMatters:
      "Knowing the drawing isn't enough — the rep needs the runbook for using it in a live meeting. The pre-line earns the right to draw; the post-question converts the drawing into discovery.",
    keyIdeas: [
      "Pre-line: 'Can I take ninety seconds at the board — it'll save us an hour of slides.' Customers always say yes.",
      "Run: draw the loop, then stop and ask 'which of these four steps breaks first for you today?'",
      "Recover: if you blank, redraw Detect and restart from the signal — it looks deliberate, not lost.",
      "Recover: if they push for technical depth, hand off to the Signals Specialist Playbook.",
    ],
    terms: [T.detect, T.prove],
    facts: [
      "Wedge question: 'which of these four steps is actually closed today with auditable proof?'",
      "Almost no operator can answer 'Prove' honestly — that's the wedge.",
    ],
    watchOut:
      "After you ask the wedge question — shut up. Whoever speaks first loses. Don't fill the silence.",
    connectsTo: ["DTOP Whiteboard Drill", "Signal Sources"],
    checkYourself: [
      "What's the pre-line I use to earn the right to draw?",
      "What's the question I ask after drawing the loop?",
      "What do I do if I blank in the middle of the drill?",
    ],
  },

  "se-slide-signals": {
    inOneSentence:
      "Detect fuses four canonical signal sources — Regulation, Anomalies, Operational Change Requests, and Micro/Macro/Geopolitical Influences — into one stream.",
    whyItMatters:
      "Every prospect will eventually ask 'what data do you actually use?' This slide is the answer. Point solutions cover one of these sources at best; only the platform fuses all four into a single Detect layer.",
    keyIdeas: [
      "Regulation Signals: feeds from rulemakers and authority publications.",
      "Anomalies: operational and safety events — the signal most operators see in dashboards but cannot act on.",
      "Operational Change Requests: internal changes that should trigger procedure or training updates.",
      "Micro, Macro and Geopolitical Influences: contextual signals (fuel, geopolitics, supply chain) that shift risk.",
    ],
    terms: [
      T.detect,
      { term: "Anomalies", definition: "Operational and safety events surfaced in the customer's own data." },
      { term: "Operational Change Requests", definition: "Internal change items that should trigger procedure or training updates." },
    ],
    facts: [
      "Four signal sources fused into one Detect layer — only this platform does all four.",
      "Wedge question: 'which of these four is hardest for you to act on today?' — almost always Anomalies or OCRs.",
    ],
    watchOut: "Don't list the four sources flat. Anchor each to a system the customer already runs. Never use FOQA, FDM or ASAP.",
    connectsTo: ["DTOP · Detect", "Value Unlocked"],
    checkYourself: [
      "Can I name the four signal sources in canonical order?",
      "Can I convert any one of them into a discovery question?",
      "What's the approved language for flight-data signals (not FOQA/FDM)?",
    ],
  },

  "se-slide-value": {
    inOneSentence:
      "Closing the loop on one shared foundation compounds value: faster procedure cycles, lower investigation cost, and audit evidence that assembles itself.",
    whyItMatters:
      "Finance teams have stopped believing point-tool ROI claims because every tool sells in isolation. Platform value is different — it compounds because every workflow shares the same foundation.",
    keyIdeas: [
      "Procedure cycle time falls because Orchestrate is automated end-to-end.",
      "Investigation cost falls because Detect surfaces patterns before they become incidents.",
      "Audit evidence assembles itself because Prove is built into every step.",
      "Pick ONE number that fits the room — safety-led, ops-led, or CFO-led. Don't list every metric.",
    ],
    terms: [T.dtop, T.lineOfSight],
    facts: [
      "Platform value compounds — one shared foundation, closed by DTOP, lifts every workflow on top of it.",
      "Customer-specific value is modelled in Line-of-Sight before any commercial conversation.",
    ],
    watchOut: "Don't use ROI numbers that aren't in the approved proof set. Don't list every metric — pick one for the room.",
    connectsTo: ["DTOP loop", "Maturity Roadmap"],
    checkYourself: [
      "Which number do I use for a safety-led buyer? An ops-led buyer? A CFO-led buyer?",
      "Why does platform value compound while point-tool value adds?",
      "What is Line-of-Sight and when does it come into the conversation?",
    ],
  },

  "se-slide-maturity-roadmap": {
    inOneSentence:
      "Operational performance maturity is a five-stage journey: Fragmented & Reactive, Managed, Connected, Proactive, and Predictive & Self-Healing.",
    whyItMatters:
      "Every prospect already lives somewhere on this curve. The fastest way to make a conversation real is to let them point at where they are — and then sell the next stage, not Stage 5.",
    keyIdeas: [
      "Most operators self-rate at Connected (Stage 3) and operate at Managed (Stage 2). Plant the flag at 1.5.",
      "Each stage compounds on the one below — you cannot leap to Predictive without first being Connected.",
      "Comply365 is the only platform built to walk customers across the entire curve on one connected foundation.",
      "Stage 5 (Predictive & Self-Healing) is the direction of travel, not a feature you can sell today — be honest.",
    ],
    terms: [
      { term: "Fragmented & Reactive", definition: "Stage 1. Point tools, no shared foundation, work driven by incident." },
      { term: "Managed", definition: "Stage 2. Tools in place, processes defined, but stacks still siloed." },
      { term: "Connected", definition: "Stage 3. Foundation linked across safety, content, training." },
      { term: "Proactive", definition: "Stage 4. Insights and Recommended Actions in the loop." },
      { term: "Predictive & Self-Healing", definition: "Stage 5. Direction of travel — Automation closes loops with human-in-the-loop." },
    ],
    facts: [
      "Most operators self-describe at Connected; operate at Managed.",
      "Intelligence Layer outcomes anchor at L4-5 maturity.",
    ],
    watchOut:
      "Don't let the buyer self-rate without pressure-testing. Don't sell Stage 5 — sell the next stage.",
    connectsTo: ["Strategy & Vision Session", "Maturity Whiteboard"],
    checkYourself: [
      "Can I name the five stages in order?",
      "Why is it dangerous to accept 'we're at Connected' at face value?",
      "What's the one question that surfaces the gap between self-rating and reality?",
    ],
  },

  "se-slide-maturity-whiteboard": {
    inOneSentence:
      "Six strokes, ninety seconds: draw the five-stage maturity curve and plant the YOU ARE HERE flag between Fragmented and Managed.",
    whyItMatters:
      "Executives buy when you draw it. Sketching the curve pulls the buyer into the conversation; planting the flag at 1.5 gives them permission to admit where they actually are.",
    keyIdeas: [
      "Stroke order: axes, stages 1-2 flat, flag at 1.5, bend up at Stage 3, climb to Stage 4, cap at Stage 5.",
      "Stage 3 is where you label 'the platform shift'.",
      "Final move: tap the flag, ask 'does that feel about right for where you are today?' Then stop talking.",
    ],
    terms: [
      { term: "The platform shift", definition: "The inflection at Stage 3 — when the operating model becomes possible." },
      { term: "YOU ARE HERE flag", definition: "The honest placement of the buyer between Stage 1 and Stage 2." },
    ],
    facts: [
      "Target: 90 seconds, six strokes, no slides behind you.",
      "Most buyers think they're at Stage 3; honestly they're at 1.5.",
    ],
    watchOut: "Whoever speaks first after the flag question loses. Don't fill the silence with features.",
    connectsTo: ["Maturity Roadmap", "Strategy & Vision Session"],
    checkYourself: [
      "Can I draw the curve in 90 seconds with just six strokes?",
      "Where exactly does the flag go, and why between Stages 1 and 2?",
      "What's the verbatim question after I tap the flag?",
    ],
  },

  "se-slide-recap-m2": {
    inOneSentence:
      "Three rehearsal answers to memorise: What is it? How is it different? What's the one thing to remember?",
    whyItMatters:
      "Every prospect asks these three questions. Stumbling on any one of them costs the room. This slide is a rehearsal, not content — repeat each answer out loud until it sounds natural.",
    keyIdeas: [
      "What is it: the first connected operating platform for safety, content and training.",
      "How is it different: one foundation instead of five-to-seven disconnected tools.",
      "What's the one thing to remember: point solutions can Detect — only Comply365 can Detect, Trigger, Orchestrate, AND Prove.",
    ],
    terms: [T.dtop, T.coreApps],
    facts: [
      "Most operators today run 5-7 disconnected tools across safety, content and training.",
      "Four signal sources at Detect — the answer to 'what data do you use?'",
    ],
    watchOut: "Don't move to Week 2 until all three answers sound natural without notes.",
    connectsTo: ["Week 1 outcomes", "Week 2 · Capabilities"],
    checkYourself: [
      "Can I deliver each of the three answers in one sentence?",
      "What are the four signal sources?",
      "What's the line that makes us defensible vs point solutions?",
    ],
  },

  // ============= Week 2 · Capabilities =============
  "se-week-2": {
    inOneSentence:
      "Week 2 trains the rep to give a 60-second walkthrough of every capability and tell the whole story as one DTOP loop without notes.",
    whyItMatters:
      "Week 2 is the longest week because the walkthrough lives here. The order of slides matches the customer deck exactly; reps who learn the order learn the story.",
    keyIdeas: [
      "One platform, three Core Apps, one Intelligence Layer, one Unified Mobile, all wired by DTOP.",
      "Every capability ties back to a customer outcome AND a step in the DTOP loop. Never tour features flat.",
      "Approved terminology only: Generative AI, Recommended Actions, Operational Data. Never FOQA, FDM, ASAP.",
      "The Week 2 capstone is a 60-second whiteboard: one use case, every capability, one DTOP loop.",
    ],
    terms: [T.intelligenceLayer, T.insights, T.recommendedActions, T.automation, T.unifiedMobile],
    facts: [
      "15 slides in Week 2 — order matches the customer deck.",
      "Capability stack: Intelligence Layer · Insights · Recommendations · Automation · Mobile.",
    ],
    watchOut: "Don't list features. Tie every capability back to a use case and a DTOP step. No raw acronyms.",
    connectsTo: ["Week 1 · Foundation", "Platform Map"],
    checkYourself: [
      "Can I list the 15 slides in the correct order?",
      "What are the five elements of the capability stack?",
      "Which terms are banned in customer-facing conversation?",
    ],
  },

  "se-week-2-overview": {
    inOneSentence:
      "Comply365 is one Operational Performance Platform — three Core Apps, an Intelligence and Orchestration layer, one Unified Mobile shell, all wired by DTOP.",
    whyItMatters:
      "Before drilling into any single capability, the rep needs the whole-platform picture in their head. Without it, each capability sounds like a feature in a list rather than part of one system.",
    keyIdeas: [
      "Point at the diagram in this order: Core Apps · Intelligence Layer on top · Mobile as the frontline shell · DTOP wrapping all.",
      "The differentiation only shows at the foundation — that's why the foundation comes first.",
      "Say 'one platform' — never 'modules' or 'suite'.",
      "Don't use FOQA/FDM/ASAP: say 'flight data signals' and 'crew-reported events'.",
    ],
    terms: [T.operationalData, T.coreApps, T.intelligenceLayer, T.unifiedMobile, T.dtop],
    facts: [
      "Five visible elements: 3 Core Apps · Intelligence Layer · Unified Mobile.",
      "Most prospects today run 5-7 disconnected tools — this slide reframes around one foundation.",
    ],
    watchOut: "Don't say 'modules' or 'suite'. Don't use raw acronyms. Don't dive into any one box.",
    connectsTo: ["Platform Insights & Intelligence", "DTOP"],
    checkYourself: [
      "Can I point at the diagram in the right order, naming each element correctly?",
      "Why does saying 'modules' or 'suite' damage the story?",
      "What's the approved replacement for FOQA, FDM, ASAP?",
    ],
  },

  "se-platform-insights-intelligence": {
    inOneSentence:
      "Any user asks an operational question in plain English; the platform returns a cross-domain answer with Recommended Actions in seconds — grounded in their connected Operational Data and a 4,000+ aviation knowledge graph.",
    whyItMatters:
      "This is the single most powerful capability story in the deck — and the moat. A director's two-week BI exercise collapses into seconds, with answers cited to source. The 90% vs 35% accuracy story lives here.",
    keyIdeas: [
      "Not a chatbot bolted onto a dashboard — a domain-trained Intelligence Layer over connected Operational Data.",
      "Slide example: three stations show DG handling spikes; all three correlate with overdue DG recurrent training; Recommended Actions are generated automatically.",
      "Six stages: plain-English question → connected data → domain knowledge graph → domain-trained reasoning → guardrails/audit trail → cited answer + Recommended Actions.",
      "Tenant isolation + source citations defuse the security objection before it's asked.",
    ],
    terms: [T.intelligenceLayer, T.operationalData, T.recommendedActions],
    facts: [
      "~90% domain accuracy on aviation operational questions at L4-5 maturity vs ~35% for generic AI on the same data.",
      "Knowledge graph: 4,000+ aviation concepts across five maturity levels.",
      "Every answer cited to regulation, procedure and training source.",
    ],
    watchOut:
      "Never call it a chatbot — call it an analyst that lives inside the apps the team already uses. Never use legacy 'CoAnalyst' in user-facing copy.",
    connectsTo: ["Intelligence Layer slide", "Insights", "Automation"],
    checkYourself: [
      "Can I name the 90% vs 35% accuracy headline and where the number comes from?",
      "Can I walk the six stages of the Intelligence Layer in order?",
      "How do I defuse the data-security objection in one sentence?",
    ],
  },

  "se-platform-wide-intelligence-usecases": {
    inOneSentence:
      "Three cross-domain questions only the platform-wide Intelligence Layer can answer: safety-to-training correlation, the Dangerous Goods manual loop, and Part 145 audit readiness.",
    whyItMatters:
      "This is where the Intelligence Layer stops being a feature pitch and becomes a board-level capability. Each card is a real question that today takes weeks of BI tickets — and still comes back ambiguous.",
    keyIdeas: [
      "Card 1 — Safety × Training: joins safety occurrences with competency and recurrency records; surfaces where rising hazard reports overlap with overdue training.",
      "Card 2 — DG Manual Loop: traces a procedure revision through training assignments and back into safety occurrence trends, closing content-change to operational-outcome.",
      "Card 3 — Part 145 Audit Readiness: cross-references audit scope against open findings, procedure currency, training compliance and recent safety signals; flags gaps and recommends actions.",
      "Pick the ONE card that fits the room — Safety-and-Training for a Director of Safety, DG manual for a Head of Training, Part 145 for Quality.",
    ],
    terms: [T.intelligenceLayer, T.recommendedActions],
    facts: [
      "No single Core App can answer these — they require the unified data substrate plus the Intelligence Layer.",
      "Each card maps onto DTOP chips; cited evidence on every answer.",
    ],
    watchOut:
      "Don't walk all three cards. Pick the one that matches the room and walk it end to end.",
    connectsTo: ["Platform Insights & Intelligence", "Intelligence Layer deep-dive"],
    checkYourself: [
      "Can I name the three cards and which persona each one fits?",
      "Why doesn't a single Core App answer these questions today?",
      "What does 'cited evidence on every answer' actually mean in practice?",
    ],
  },

  "se-slide-coanalyst": {
    inOneSentence:
      "One Intelligence Layer, three doorways: live today inside SafetyManager365, coming next inside ContentManager365 and TrainingManager365 — same engine, scoped to the app the user is in.",
    whyItMatters:
      "Once a rep shows the platform-wide intelligence story, every prospect asks 'does it also work inside the app my team already uses?' This slide proves yes, with a three-by-three grid and an honest roadmap.",
    keyIdeas: [
      "Three columns = Core Apps with rollout chips (SafetyManager365 now, Content & Training next).",
      "Three rows = the capability each app gets: ask in plain English, cross-domain insight & root cause, cited answer + single next step.",
      "Honest limitation: in-product, the layer reasons over that app's own data (single-domain). Platform-wide is when it reasons across all three.",
      "Same engine, different scope — this framing defuses the 'is this real or roadmap?' objection.",
    ],
    terms: [T.intelligenceLayer, T.coreApps],
    facts: [
      "SafetyManager365: Intelligence Layer live today.",
      "ContentManager365 + TrainingManager365: sequenced rollout.",
      "Answer arrives where the work happens — never autonomous, always a human-confirmed next step.",
    ],
    watchOut:
      "Don't quote the 90% vs 35% stat here — that lives on the Intelligence Layer vs Generic AI slide. Don't call it a chatbot.",
    connectsTo: ["Platform Insights & Intelligence", "Tiers vs AI"],
    checkYourself: [
      "Can I name what's live today vs sequenced rollout?",
      "What's the honest difference between in-product and platform-wide intelligence?",
      "Why is 'same engine, different scope' the right framing?",
    ],
  },

  "se-slide-coanalyst-usecases": {
    inOneSentence:
      "The same Intelligence Layer that answers board-level questions also clears the day-to-day chores inside each Core App.",
    whyItMatters:
      "Prospects buy capabilities they can picture themselves using on Monday morning. This slide is the Monday-morning picture — one card per Core App, each a spreadsheet job replaced by one prompt.",
    keyIdeas: [
      "Safety: pull safety reports for a tail number, formatted to a lessor's spec, sent on a schedule.",
      "Content: list crew who haven't synched their mobile device in 30 days; pass to fleet captains.",
      "Training: list crew with upcoming training renewals for a base, ready to schedule.",
      "Same engine, two audiences — board and coordinator.",
    ],
    terms: [T.coreApps, T.intelligenceLayer],
    facts: [
      "Today these are spreadsheet jobs that consume a coordinator's week.",
      "Pick the one card that matches the prospect's role and stop talking.",
    ],
    watchOut: "Don't walk all three cards. Pick the one that matches the prospect's day-to-day.",
    connectsTo: ["Intelligence Layer", "Insights"],
    checkYourself: [
      "Can I name one example per Core App from this slide?",
      "Why is 'same engine, two audiences' the framing that wins?",
      "What's the discovery question that comes off this slide?",
    ],
  },

  "se-slide-insights": {
    inOneSentence:
      "Insights watches connected Operational Data continuously, surfaces patterns and emerging risk, and presents what changed with the evidence attached — no action without a human in the loop.",
    whyItMatters:
      "Insights is where the Intelligence Layer stops being reactive and starts surfacing what matters on its own. It earns trust before the platform ever recommends or automates anything — evidence-with-every-insight is the trust currency.",
    keyIdeas: [
      "Continuous watch — pattern detection runs over connected data, not on request.",
      "Every insight carries its evidence; that's the difference between Insights and a dashboard.",
      "Analyst's role shifts from report-builder to decision-maker once the system writes the first draft.",
      "POC vs production distinction: Insights POC H1 2026 (internal prototype only), production rollout H2 2026.",
    ],
    terms: [T.insights, T.operationalData, T.recommendedActions],
    facts: [
      "POC: H1 2026 (internal). Production: H2 2026.",
      "Insights routes a Recommended Action into the loop — not a slide.",
      "Trust currency = evidence attached to every insight.",
    ],
    watchOut: "Don't conflate Insights with dashboards. Don't promise Recommendations on this slide — that's the next capability up.",
    connectsTo: ["Intelligence Layer", "Recommendations Use Cases", "Automation"],
    checkYourself: [
      "Can I name what Insights does that a dashboard cannot — in one sentence?",
      "What are the exact roadmap dates for POC vs production?",
      "Why is evidence-with-every-insight described as 'the trust currency'?",
    ],
  },

  "se-slide-insights-usecases": {
    inOneSentence:
      "Recommendations turn Insights into prioritised next actions, with cited evidence, at both the coordinator level and the executive level.",
    whyItMatters:
      "Recommendations is the capability that draws the most enthusiasm and the most scepticism in the same meeting. Use cases ground both — and honest roadmap framing keeps the conversation credible.",
    keyIdeas: [
      "Per-solution (left column): Safety — recommend risk controls for unstable approach at location X. Content — recommend OMA search updates based on user behaviour. Training — recommend DG training updates to improve engagement.",
      "Platform (right column): where should attention focus today; how successful was our Just Culture campaign; if audited today, where would attention focus.",
      "Every recommendation cites its evidence; every recommendation closes a step in DTOP.",
      "Roadmap: Recommendations & Prescriptive Actions are 2027+. Sell direction, not next quarter.",
    ],
    terms: [T.recommendedActions, T.dtop, T.insights],
    facts: [
      "Roadmap: 2027+ for Recommendations & Prescriptive Actions.",
      "Prioritised list + evidence + DTOP-step closure on every recommendation.",
    ],
    watchOut: "Don't oversell — this is direction-of-travel, not in this quarter's invoice. Be precise about the year.",
    connectsTo: ["Insights", "Automation"],
    checkYourself: [
      "Can I list one per-solution and one platform-level example?",
      "What's the exact roadmap window for Recommendations?",
      "How does this differ from Insights in one sentence?",
    ],
  },

  "se-slide-automation": {
    inOneSentence:
      "Automation closes the loop: once Insights earns trust and Recommendations proves judgement, the platform automates safe deterministic routines — with a human in the loop on anything that changes a procedure or training plan.",
    whyItMatters:
      "Automation is the controlled second step. Customers fear runaway automation; the way you defuse that is to make the guardrails the headline, not the speed.",
    keyIdeas: [
      "Sequence: Insights earns trust → Recommendations proves judgement → Automation closes the loop.",
      "Automated: routing, assignment, notifications, evidence assembly — the deterministic handoffs.",
      "Human-in-the-loop on anything that changes procedure or training. Always.",
      "Roadmap: Automation POC April 2026 (internal); platform-wide rollout H2 2026.",
    ],
    terms: [T.automation, T.orchestrate, T.dtop],
    facts: [
      "Automation POC: April 2026. Platform rollout: H2 2026.",
      "Every automated step leaves auditable evidence behind it.",
      "Best people get hours back; judgement stays with humans.",
    ],
    watchOut: "Don't say automation replaces SMEs. Frame guardrails as the headline, not the speed.",
    connectsTo: ["Insights", "Automation Use Cases", "Unified Mobile"],
    checkYourself: [
      "Can I name the trust sequence (Insights → Recommendations → Automation)?",
      "What are the four kinds of work the platform automates?",
      "How do I defuse the 'runaway automation' fear in one sentence?",
    ],
  },

  "se-slide-automation-usecases": {
    inOneSentence:
      "Platform-layer Automation closes loops across all three Core Apps — only the platform layer can do this; per-solution automation cannot.",
    whyItMatters:
      "Automation is the capability prospects struggle to picture without examples. The real value sits at the platform layer because only the platform layer can close a loop across SafetyManager365, ContentManager365 and TrainingManager365 in one DTOP cycle.",
    keyIdeas: [
      "Card 1: new procedure revision → notify training-module owners + create review-and-update task in TrainingManager365.",
      "Card 2: regulation revision → draft updated procedures with AI-generated content for document-owner review.",
      "Card 3: training evaluations below threshold → trigger SafetyManager365 risk-control review for the linked controls.",
      "Each card = one stroke of the DTOP cycle made automatic, with a human in the loop on the change itself.",
    ],
    terms: [T.automation, T.dtop, T.coreApps],
    facts: [
      "Per-solution automation is NOT universally available — say so up front.",
      "Today these handoffs happen by email, weeks later, with no audit trail.",
    ],
    watchOut: "Don't oversell per-solution automation. The platform-layer cards are where it lands.",
    connectsTo: ["Automation", "Tiers vs Generic AI"],
    checkYourself: [
      "Can I name all three platform-layer cards in order?",
      "Why does platform-layer automation differ from per-solution?",
      "What's the verbatim line about human-in-the-loop?",
    ],
  },

  "se-slide-tiers-vs-ai": {
    inOneSentence:
      "The Intelligence Layer is grounded in aviation Operational Data and the customer's own schema; generic AI is grounded in the public internet. That single difference shows up as ~90% vs ~35% accuracy on the same questions.",
    whyItMatters:
      "This is the defensive slide that wins deals where the prospect is already running a generic-AI pilot. The pilot returned plausible-sounding answers that didn't survive scrutiny; the team is sceptical of anything called AI.",
    keyIdeas: [
      "Grounding difference: aviation operational data + customer schema vs the public internet.",
      "The difference shows in one number — ~90% domain accuracy at L4-5 vs ~35% for generic AI on the same data.",
      "Land the line: 'the difference between a chat assistant and an analyst is whether it knows your operation.'",
      "Don't bash competitors by name — say 'general-purpose tools' or 'chat assistants'.",
    ],
    terms: [T.intelligenceLayer, T.operationalData],
    facts: [
      "~90% domain accuracy at L4-5 maturity vs ~35% for generic AI on the same data.",
      "Benchmark methodology available under NDA in the Strategy & Vision Session.",
      "Customer's Operational Data stays in their tenancy — the layer runs against it, not on it.",
    ],
    watchOut: "Don't name competitors. Say 'general-purpose tools' or 'chat assistants'. Don't say 'our AI is better' — anchor the number.",
    connectsTo: ["Intelligence Layer", "Regulation Management"],
    checkYourself: [
      "Can I anchor the 90% vs 35% headline correctly (aviation domain, L4-5, same data)?",
      "What's the approved language for competitors?",
      "Where does the methodology become available?",
    ],
  },

  "se-slide-regmgmt": {
    inOneSentence:
      "Regulation Management is the cleanest end-to-end demonstration of the full capability stack: Intelligence + Insights + Recommendations + Automation, closed by DTOP.",
    whyItMatters:
      "This is the highest-conviction use case for compliance and quality leaders. When a regulator publishes a change, the platform identifies every affected procedure and training module, drafts redlines for human review, and pushes updates to the right crew with auditable proof of receipt.",
    keyIdeas: [
      "End-to-end flow: regulation change → impact identification → AI-drafted redlines → human review → routed updates → crew receipt with proof.",
      "Weeks of manual work across 4-5 teams compress into days, and the audit trail assembles itself.",
      "Always anchor on a real recent regulatory change relevant to the prospect — that's the difference between a walkthrough and a proof.",
      "Map each step of the use case onto the capability that runs it as you walk.",
    ],
    terms: [T.intelligenceLayer, T.recommendedActions, T.automation, T.dtop],
    facts: [
      "Today: many-week manual exercise across 4-5 teams.",
      "With the platform: weeks compress to days; audit trail self-assembles.",
    ],
    watchOut: "Don't walk a generic example. Anchor on a real recent regulatory change relevant to THIS prospect.",
    connectsTo: ["Intelligence Layer", "Automation", "Unified Mobile"],
    checkYourself: [
      "Can I walk the end-to-end flow naming each capability as I go?",
      "Why is anchoring on a recent regulation change essential?",
      "How do I prove 'audit trail assembles itself' in one sentence?",
    ],
  },

  "se-slide-mobile": {
    inOneSentence:
      "Unified Mobile is one frontline app — content, training and safety reporting in one shell, one login, offline-first — and every tap from the line becomes a signal back into DTOP.",
    whyItMatters:
      "Mobile is where the platform stops being abstract and lands in a crew member's hands. It is the last mile of DTOP, not another EFB reader. When the operations leader is in the room, this slide changes the conversation.",
    keyIdeas: [
      "One shell — content + training + safety reporting — one login, one offline behaviour.",
      "Every tap from the line becomes a signal back into the Detect layer.",
      "Phased rollout: Phase 1 Training screens (H1 2026) → Phase 2 Safety Reporting (H2 2026) → Phase 3 fully unified shell (2027+).",
      "Revision-to-device window: under 48 hours, offline-first, read-receipt and training context attached.",
    ],
    terms: [T.unifiedMobile, T.prove, T.dtop],
    facts: [
      "Phase 1 (Training screens): H1 2026. Phase 2 (Safety Reporting): H2 2026. Phase 3 (full shell): 2027+.",
      "Revision-to-device: under 48 hours, offline-first.",
      "Crews today juggle 3-5 separate apps; adoption suffers.",
    ],
    watchOut: "Don't position as another EFB or reader app. Don't promise the fully unified shell next year — be precise on the phasing.",
    connectsTo: ["DTOP · Prove", "Automation"],
    checkYourself: [
      "Can I quote the exact phase dates without checking?",
      "What's the 48-hour window for, and what else lands with it?",
      "Why does positioning this as 'EFB' break the loop story?",
    ],
  },

  "se-slide-talktrack": {
    inOneSentence:
      "The capability talk track: one plain-English line and one discovery question per capability — five rows, memorised, delivered from memory in a real call.",
    whyItMatters:
      "Most reps walk out of Week 2 able to recognise capabilities but not able to talk through them cold. This slide is the rehearsal page — read it before every call for the first month.",
    keyIdeas: [
      "Five rows: Intelligence Layer · Insights · Recommendations · Automation · Mobile.",
      "Per row: one plain-English line + one discovery question.",
      "Discovery questions are how the rep stops pitching and starts listening.",
      "In a real call the rep delivers the lines from memory, never reads them off the slide.",
    ],
    terms: [T.intelligenceLayer, T.insights, T.recommendedActions, T.automation, T.unifiedMobile],
    facts: [
      "Five capability rows — read out loud daily for the first month.",
      "The discovery question is the unlock; the line is the setup.",
    ],
    watchOut: "This is a study page, not a customer slide. Don't walk a customer through this verbatim.",
    connectsTo: ["Each capability slide", "Capstone Whiteboard"],
    checkYourself: [
      "Can I deliver each of the five lines from memory?",
      "Can I ask the matching discovery question without a prompt?",
      "What's the difference between the line and the question — what role does each play?",
    ],
  },

  "se-w2-capstone-whiteboard": {
    inOneSentence:
      "The Week 2 capstone: one use case, every capability, one DTOP loop — drawn on a whiteboard in 60 seconds without looking at the slide.",
    whyItMatters:
      "This is the proof the rep owns Week 2. If you can tell the Madrid unstable-approach story end-to-end in a minute, you can walk any room through the full capability stack.",
    keyIdeas: [
      "Use case: Madrid unstable-approach trend, closed in five days.",
      "Timeline: Detect day 1 → Trigger day 2 → Orchestrate day 3 → Prove day 5.",
      "Don't list capabilities — let the use case name them.",
      "End on Prove, then pause.",
    ],
    terms: [T.detect, T.trigger, T.orchestrate, T.prove],
    facts: [
      "Target: 60 seconds, one use case, full DTOP loop.",
      "Madrid example is the canonical thread across Week 2 and Week 3.",
    ],
    watchOut: "Don't list capabilities. Let the use case name them. End on Prove and PAUSE.",
    connectsTo: ["DTOP loop", "Week 3 · Sell & Win"],
    checkYourself: [
      "Can I tell the Madrid story end-to-end in 60 seconds?",
      "Can I name the day-by-day DTOP timeline?",
      "Why does the use case name the capabilities, not the other way round?",
    ],
  },

  // ============= Week 3 · Sell & Win =============
  "se-week-3": {
    inOneSentence:
      "Week 3 turns the rep from a presenter into a seller: run a real discovery, handle any objection, book the next step in the room.",
    whyItMatters:
      "By the end of Week 3 the rep can map any account to a footprint pattern, run a discovery that surfaces the wedge in under 20 minutes, and close on the Strategy & Vision Session — not on procurement.",
    keyIdeas: [
      "We say 'walkthrough', not 'demo'. Never 'pilot' — use 'focused use-case session'.",
      "The next step we close on is the Strategy & Vision Session.",
      "Discovery questions are organised by D, T, O, P — pick four before the call.",
      "Footprint patterns: single Core App, two, or all three — same foundation underneath.",
    ],
    terms: [T.svs, T.walkthrough, T.coreApps],
    facts: [
      "Never use 'pilot' — banned term. Use 'focused walkthrough' or 'focused use-case session'.",
      "22 slides in Week 3 — covers footprint, discovery, personas, close.",
    ],
    watchOut: "Never say 'pilot'. Never close on procurement. Close on the Strategy & Vision Session.",
    connectsTo: ["Week 2 Capstone", "Strategy & Vision Session"],
    checkYourself: [
      "What's the approved replacement for 'demo' and 'pilot'?",
      "What's the only next step we close on?",
      "What does the rep need to be able to do by Friday of Week 3?",
    ],
  },

  "se-w3-roadmap-vision-frame": {
    inOneSentence:
      "Open Week 3 every time by drawing the five-stage maturity curve — buyers who agree on the destination first buy bigger and longer.",
    whyItMatters:
      "Skip this frame and the rest of the week collapses into a feature checklist. The curve gives buyers permission to admit they're at 1.5, and that admission unlocks the rest of the session.",
    keyIdeas: [
      "Differentiation: point tools live on one stage; Comply365 walks customers across all five on the same foundation.",
      "Up-sell: each stage compounds on the one below — moving up is the same platform getting deeper, not a re-buy.",
      "Cross-sell: each Core App is a foothold; the curve makes the case for the next app and the Intelligence Layer.",
      "Be honest about Stage 5: Predictive is direction of travel, not a feature you can sell today.",
    ],
    terms: [
      { term: "The platform shift", definition: "The Stage 3 inflection where the operating model becomes possible." },
      T.intelligenceLayer,
      T.svs,
    ],
    facts: [
      "Buyers who agree on the destination first buy bigger and longer.",
      "Most buyers self-rate at Stage 3 because they were sold tools as Stage 3; honestly they're at 1.5.",
    ],
    watchOut: "Don't skip this frame. Don't sell Stage 5. Use approved terminology only.",
    connectsTo: ["Maturity Roadmap", "Whole-Vision Whiteboard"],
    checkYourself: [
      "Can I draw the curve in 90 seconds with one marker?",
      "Why is planting the flag at 1.5 the unlock?",
      "What are the three moves the curve enables (differentiate, up-sell, cross-sell)?",
    ],
  },

  "se-w3-whole-vision-whiteboard": {
    inOneSentence:
      "On one whiteboard, in 90 seconds: every layer of the platform mapped to a DTOP step, with Madrid as the worked example threaded the whole way down.",
    whyItMatters:
      "This is the highest-leverage whiteboard in the academy. It proves to the buyer that every layer is a deal on its own — and stacked, they're the only loop that closes itself.",
    keyIdeas: [
      "Top of the board: Madrid use-case strip with the four DTOP micro-cards (Detect d1, Trigger d2, Orchestrate d3, Prove d5).",
      "Bottom-up, five stages — call each one by number, layer and DTOP role.",
      "Stage 1: Core Apps as foundation. Stage 2: Insights as Detect (blue). Stage 3: Intelligence Layer as Trigger (amber). Stage 4: Automation+Mobile as Orchestrate (violet). Stage 5: Insights as Prove (green).",
      "Close verbatim: 'one foundation, one intelligence, one loop — every layer a deal on its own.'",
    ],
    terms: [T.dtop, T.insights, T.intelligenceLayer, T.automation, T.unifiedMobile],
    facts: [
      "Target: 90 seconds, one marker, top-to-bottom.",
      "Madrid trend: detected day 1, flat by day 5, audit pack one click.",
    ],
    watchOut: "Don't switch use cases mid-flow. Madrid threads top to bottom.",
    connectsTo: ["Roadmap Vision Frame", "DTOP loop"],
    checkYourself: [
      "Can I map each of the five stages to a DTOP role and a colour?",
      "What's the Madrid timeline by day?",
      "What's the verbatim close line?",
    ],
  },

  "se-w3-signals-recap": {
    inOneSentence:
      "Signals are the fuel; DTOP is the engine. Both must be answerable in under a minute, with one anomaly walked end-to-end.",
    whyItMatters:
      "Buyers test the rep on 'what data?' and 'how does it actually close?' This recap is the rep's one-minute answer to both — walked through one anomaly, not listed as capabilities.",
    keyIdeas: [
      "Signals layer: four canonical sources (Regulation, Anomalies, OCRs, Macro/Geopolitical).",
      "DTOP engine: Detect → Trigger → Orchestrate → Prove.",
      "Walk ONE anomaly end-to-end. Don't list capabilities — the use case names them.",
      "Point-solution comparison: they stop at Detect. We do all four.",
    ],
    terms: [T.detect, T.dtop],
    facts: [
      "Four signal sources fused at Detect.",
      "Point tools cover one source at best.",
    ],
    watchOut: "Don't list capabilities. Walk one anomaly end-to-end and let it name them.",
    connectsTo: ["DTOP", "Signal Sources", "Who To Target"],
    checkYourself: [
      "Can I answer 'what data do you use?' in under 30 seconds?",
      "Can I walk one anomaly through all four DTOP steps?",
      "What's the one-line comparison to point solutions?",
    ],
  },

  "se-who-to-target": {
    inOneSentence:
      "Pipeline dies on the wrong accounts. Start where Comply365 already has permission to talk — Tier 1 accounts with one app live and a renewal in 12 months.",
    whyItMatters:
      "Reps default to greenfield prospecting; this slide overrides that instinct. The renewal is the trojan horse — every Tier 1 conversation should anchor on the loop the customer can't yet close.",
    keyIdeas: [
      "Tier 1: one app live, renewal in 12 months. Highest conviction.",
      "Tier 2: customer in adjacent vertical, exec sponsor exists.",
      "Tier 3: cold but on a maturity curve we can defend.",
      "If it isn't Tier 1/2/3 on this slide, deprioritise it.",
    ],
    terms: [T.svs],
    facts: [
      "Tier 1 = renewal trojan horse.",
      "Pipeline dies on accounts that don't match Tier 1/2/3.",
    ],
    watchOut: "Don't chase non-Tier accounts. Be disciplined on the qualification.",
    connectsTo: ["Persona Playbook", "Footprint Intro"],
    checkYourself: [
      "Can I name the three tiers and their qualifying criteria?",
      "What makes a renewal a 'trojan horse'?",
      "Which tier do most successful conversations start in?",
    ],
  },

  "se-footprint-intro": {
    inOneSentence:
      "Almost no conversation is greenfield — map what the customer already owns, then sell the loop they can't yet close.",
    whyItMatters:
      "Reps default to pitching what they know best. This slide enforces a discipline: map the footprint first, then anchor the next purchase to the loop the missing app would close.",
    keyIdeas: [
      "Three footprint patterns exist: single Core App, two, all three.",
      "Each pattern has its own selling motion — same platform, different conversation.",
      "Never sell what they already have. Sell what they're missing and the loop closing it would unlock.",
      "Loop language beats SKU language in every single conversation.",
    ],
    terms: [T.coreApps, T.dtop],
    facts: [
      "Seven distinct footprint scenarios across the three patterns.",
      "Default rep mistake: pitching what's familiar instead of what's missing.",
    ],
    watchOut: "Don't pitch what they already have. Don't sell SKUs — sell the missing loop.",
    connectsTo: ["Footprint Single", "Footprint Two", "Footprint All"],
    checkYourself: [
      "What's the discovery move BEFORE the product pitch?",
      "Why is loop language stronger than SKU language?",
      "How many distinct footprint scenarios should the rep recognise?",
    ],
  },

  "se-footprint-single": {
    inOneSentence:
      "Single-app customers already have the Intelligence Layer, Insights and Automation — they're confined to one lane. Scope is what's gated, not capability.",
    whyItMatters:
      "Never tell single-app customers they get 'nothing intelligent' until they buy more. The truthful framing — 'you have intelligence, but it's confined to one lane' — is what unlocks the next app.",
    keyIdeas: [
      "Intelligence Layer + Insights + Automation already operate inside whatever single app they own.",
      "What's missing: scope. The lane is narrower than the operational problem.",
      "Single-app is a wedge, not a smaller deal. The foundation makes app two and three land in weeks.",
      "Sell the loop the missing app would close, never the SKU.",
    ],
    terms: [T.coreApps, T.intelligenceLayer],
    facts: [
      "Most customers start with one Core App.",
      "Second and third Core Apps land in weeks because the foundation is already in place.",
    ],
    watchOut: "Never claim single-app customers get nothing intelligent. The capability is there — the scope is gated.",
    connectsTo: ["Footprint Single Whiteboard", "Footprint Ladder"],
    checkYourself: [
      "What's actually missing when a customer has only one app — capability or scope?",
      "Why is single-app a wedge rather than a small deal?",
      "What's the honest framing for single-app customers?",
    ],
  },

  "se-footprint-single-whiteboard": {
    inOneSentence:
      "Six strokes: one lit lane, two dark, intelligence band labelled 'confined to this lane', broken DTOP arrow.",
    whyItMatters:
      "The buyer only feels the gap when it's drawn. Words alone don't move single-app customers; the whiteboard does.",
    keyIdeas: [
      "Draw the foundation as a base, three Core App lanes above it — one lit, two dark.",
      "Draw the intelligence band stretching across all three lanes, labelled 'confined to this lane'.",
      "Draw a DTOP arrow that breaks where the dark lanes start.",
      "Discovery question: 'when Safety flags a risk, who owns the procedure and training change?'",
    ],
    terms: [T.dtop, T.coreApps],
    facts: [
      "Six strokes is the target — same as DTOP, same as maturity.",
      "The broken arrow is the visual that converts.",
    ],
    watchOut: "When you write the discovery question — STOP TALKING. The silence is the unlock.",
    connectsTo: ["Footprint Single", "Footprint Two"],
    checkYourself: [
      "Can I draw all six strokes from memory?",
      "What's the verbatim discovery question after the drawing?",
      "What do I do the moment I've finished asking it?",
    ],
  },

  "se-footprint-two": {
    inOneSentence:
      "Two Core Apps = a half-loop. The Intelligence Layer already operates across both — what they're buying with the third app is scope, not new features.",
    whyItMatters:
      "Two-app customers are the highest-velocity cross-sell. The half-loop is the most powerful selling moment in the academy because the buyer can FEEL the gap closing.",
    keyIdeas: [
      "Two apps = intelligence already crosses both lanes; the loop just doesn't close.",
      "Name the missing app by the loop it would close, never by the SKU.",
      "Don't claim intelligence arrives with the third app — they already have it.",
      "Discovery question: 'when a procedure changes, how do you know every crew is trained on it before the next shift?'",
    ],
    terms: [T.coreApps, T.intelligenceLayer, T.dtop],
    facts: [
      "Two-app footprint = a half-loop visible on the whiteboard.",
      "Third app closes the loop; capability is constant, scope expands.",
    ],
    watchOut: "Don't claim intelligence is brand new at this stage — they already have it. The buyer will catch you.",
    connectsTo: ["Footprint Two Whiteboard", "Footprint All"],
    checkYourself: [
      "What's the difference between 'new capability' and 'new scope' in this conversation?",
      "What's the discovery question for two-app customers?",
      "Why is two-app the highest-velocity cross-sell?",
    ],
  },

  "se-footprint-two-whiteboard": {
    inOneSentence:
      "Draw the half-loop: two lit lanes, intelligence band crossing both, DTOP arrow visibly broken at the third lane.",
    whyItMatters:
      "This is the moment the buyer names the missing app themselves. When they say it first, the third app sells itself — no procurement objection.",
    keyIdeas: [
      "Two lit lanes, one dark lane, intelligence band crossing the lit two.",
      "DTOP arrow visibly broken where the third lane should be.",
      "Let the buyer name the missing lane — don't fill it in for them.",
      "Discovery question lands the gap; silence converts it.",
    ],
    terms: [T.dtop, T.coreApps],
    facts: [
      "Highest-leverage drawing in the academy.",
      "Buyer naming the missing lane = the third app sells itself.",
    ],
    watchOut: "Let the buyer name the missing lane. If you say it first, the cross-sell stalls.",
    connectsTo: ["Footprint Two", "Footprint All Whiteboard"],
    checkYourself: [
      "Can I draw the half-loop in six strokes?",
      "What do I do if the buyer doesn't name the missing lane?",
      "Why does buyer-naming convert better than rep-naming?",
    ],
  },

  "se-footprint-all": {
    inOneSentence:
      "Three Core Apps closes the loop. What changes isn't whether intelligence exists — it's the scope it reasons across.",
    whyItMatters:
      "Three-app customers are the reference accounts that close future deals. The right framing — 'you've bought the instruments; the Intelligence Layer is the conductor' — is what unlocks the platform-wide expansion.",
    keyIdeas: [
      "Three apps = full loop; intelligence reasons across all three lanes.",
      "Capability is constant — scope changes. Be precise on this.",
      "Three apps land on one foundation in one rollout — less change than three point tools + integration.",
      "Sell the conductor (Intelligence Layer), not the apps they already have.",
    ],
    terms: [T.intelligenceLayer, T.coreApps, T.dtop],
    facts: [
      "Three apps on one foundation = one rollout, not three.",
      "Less change than buying three point solutions and integrating them later.",
    ],
    watchOut: "Never claim Intelligence is brand new at this stage. Be precise: scope changes, capability doesn't.",
    connectsTo: ["Footprint All Whiteboard", "Footprint Ladder"],
    checkYourself: [
      "What changes when a customer goes from two apps to three?",
      "How do I reframe 'three apps at once' as less change, not more?",
      "What's the 'conductor' analogy and when do I use it?",
    ],
  },

  "se-footprint-all-whiteboard": {
    inOneSentence:
      "Six strokes: three lit lanes, closed DTOP loop, intelligence band reaching across all three.",
    whyItMatters:
      "This is the only drawing that shows the full platform working as one. When you ask the question at the end, whoever speaks first loses — usually the buyer commits to the next step.",
    keyIdeas: [
      "Three lit lanes, closed DTOP loop, intelligence band crossing all three.",
      "Discovery question: 'which decisions in your operation still rely on a human stitching three systems together?'",
      "Stop talking after the question. Silence converts.",
      "Be precise: scope changes, capabilities don't.",
    ],
    terms: [T.dtop, T.intelligenceLayer, T.coreApps],
    facts: [
      "Six strokes, full loop, intelligence band across all lanes.",
      "Closes the footprint trilogy (single → two → all three).",
    ],
    watchOut: "Be precise: scope changes, capabilities don't. Then stop talking.",
    connectsTo: ["Footprint All", "Footprint Ladder"],
    checkYourself: [
      "What's the discovery question after the drawing?",
      "Why does this drawing matter even for accounts that already have all three?",
      "What's the rule about who speaks first after the question?",
    ],
  },

  "se-footprint-ladder": {
    inOneSentence:
      "Platform value compounds, not adds: 1 app ~25%, 2 apps ~55%, 3 apps ~75%, 3 + Intelligence Layer = 100%.",
    whyItMatters:
      "Account reviews and renewals only — never bring this to a first meeting. Customers fixate on what they already paid for; the ladder shows them what they haven't.",
    keyIdeas: [
      "1 app ~25%: foundation in one lane plus capabilities confined to that lane.",
      "2 apps ~55%: half-loop plus capabilities operating across two lanes.",
      "3 apps ~75%: full DTOP loop closes; capabilities reason across all three.",
      "3 apps + Intelligence Layer = 100%: loop closes AND learns; cross-lane reasoning + automated orchestration.",
    ],
    terms: [T.intelligenceLayer, T.dtop, T.lineOfSight],
    facts: [
      "Percentages are directional sales modelling, not contractual commitments — say so out loud if pushed.",
      "Customer-specific value is modelled in Line-of-Sight before any commercial conversation.",
    ],
    watchOut: "Account reviews and renewals only. Never present as 'you're missing X percent' — present as 'here's the loop you can't close yet'.",
    connectsTo: ["Footprint All", "Line-of-Sight"],
    checkYourself: [
      "Can I name each percentage and what it represents?",
      "What's the verbatim disclaimer if a customer pushes on the numbers?",
      "When is it inappropriate to show this ladder?",
    ],
  },

  "se-footprint-playbook": {
    inOneSentence:
      "Three moves, in order: audit the footprint, name the broken loop, anchor the next purchase to closing it.",
    whyItMatters:
      "This is THE playbook of Week 3. Cross-sells stall at procurement because reps go straight to the product pitch and miss the loop framing entirely.",
    keyIdeas: [
      "Move 1 — Audit: three discovery questions to find which of S, C, T they own and where the loop stops.",
      "Move 2 — Name: use their words from Move 1, draw the half-loop, show where it stops + what that costs them.",
      "Move 3 — Anchor: never sell the SKU. Sell the loop the missing app would close.",
      "When the loop is named, the next purchase scopes itself — the customer becomes your champion.",
    ],
    terms: [T.dtop, T.svs],
    facts: [
      "Recite this from memory by Friday — it's the playbook of the section.",
      "Loop language beats SKU language in every single conversation.",
    ],
    watchOut: "Don't go straight to product pitch. That's why cross-sells stall at procurement.",
    connectsTo: ["Footprint Whiteboards", "Discovery to Close"],
    checkYourself: [
      "Can I recite the three moves in order from memory?",
      "Why does loop language outperform SKU language?",
      "What's the customer doing differently when the loop is named?",
    ],
  },

  "se-discovery-to-close": {
    inOneSentence:
      "Three words, one motion: Discover, Walk, Close. Their words become your walkthrough script; the next step is the Strategy & Vision Session.",
    whyItMatters:
      "Disciplined discovery stops the guessing. Most reps over-pitch and lose deals at the close. The motion forces listening before showing.",
    keyIdeas: [
      "Discover: ask, listen, take notes. Their words drive the walkthrough.",
      "Walk: we say 'walkthrough', not 'demo'. Walk them through how DTOP would close THEIR loop.",
      "Close: never on procurement. Always on the Strategy & Vision Session.",
      "Walkthrough = focused session on the prospect's highest-cost use case.",
    ],
    terms: [T.walkthrough, T.svs, T.dtop],
    facts: [
      "Three-word motion: Discover, Walk, Close.",
      "Never use 'demo'. Never use 'pilot'.",
    ],
    watchOut: "Don't over-pitch. Don't close on a procurement step.",
    connectsTo: ["Discovery Call Runbook", "Strategy & Vision Session"],
    checkYourself: [
      "What are the three motions in order?",
      "What's the approved replacement for 'demo'?",
      "What's the only step we close on?",
    ],
  },

  "se-discovery-call-runbook": {
    inOneSentence:
      "The 45-minute discovery call: frame the signals story first, ask one question at a time, shut up and take notes.",
    whyItMatters:
      "A runbook on a second monitor stops the rep from improvising. The opening frame — 'most carriers we work with aren't short on data, they're short on signals they can act on' — earns the right to ask.",
    keyIdeas: [
      "First 5 minutes: frame the signals story. Don't pitch.",
      "Next 30 minutes: ask one question at a time, then shut up.",
      "Last 10 minutes: recap their words, ask what 'good' looks like, book the next step.",
      "If they ask for the deck, counter with a 30-min working session — don't just send the file.",
    ],
    terms: [T.detect, T.svs, T.walkthrough],
    facts: [
      "Runbook lives on the rep's second monitor during the call.",
      "Opening line: 'most carriers we work with aren't short on data — they're short on signals they can act on.'",
    ],
    watchOut: "Don't just send the deck. Counter with a 30-min working session.",
    connectsTo: ["Discovery Question Bank", "Persona Playbook"],
    checkYourself: [
      "What's the opening frame line?",
      "What do I say when they ask for the deck?",
      "How do I time-box the three phases of the call?",
    ],
  },

  "se-discovery-question-bank": {
    inOneSentence:
      "12 discovery questions grouped by D, T, O, P. Red-flag answers map directly to the DTOP step the platform closes.",
    whyItMatters:
      "Discovery questions are the rep's most-used asset. Picking four before the call (one per DTOP step) and asking one at a time builds rhythm — and the silence between questions does the work.",
    keyIdeas: [
      "12 questions: 3 per DTOP step.",
      "Pick four before the call — one per step.",
      "Ask one, shut up, take notes. Move on.",
      "Prove is where the audit pain is loudest — the easiest 'yes' you'll get.",
    ],
    terms: [T.dtop, T.detect, T.prove],
    facts: [
      "12-question bank, 3 per DTOP step.",
      "Prove questions land hardest — leverage them.",
    ],
    watchOut: "Don't ask all 12. Pick four. Then ask one and shut up.",
    connectsTo: ["Discovery Call Runbook", "Footprint Playbook"],
    checkYourself: [
      "How many DTOP steps and how many questions per step?",
      "What's the rule about how many to ask in a call?",
      "Which DTOP step gives the easiest 'yes'?",
    ],
  },

  "se-persona-playbook": {
    inOneSentence:
      "Five rooms, five different conversations, one platform underneath. Mirror the persona's metric in the first five minutes, end with the proof artifact within the hour.",
    whyItMatters:
      "Same demo to different personas loses deals. The persona playbook tells the rep which slide leads, which language to use, which proof to leave behind — for each of five rooms.",
    keyIdeas: [
      "Five personas: Director of Safety, Head of Training, VP Operations, Chief Compliance Officer, IT/Tech.",
      "Each has a different lead-in slide, different metric, different proof artifact.",
      "Pick the persona row before the call. End with the proof artifact within the hour.",
      "Never say FOQA/FDM/ASAP to Safety. Never pitch an SMS replacement — we extend theirs.",
    ],
    terms: [T.svs, T.walkthrough],
    facts: [
      "Five personas, five distinct selling motions.",
      "Proof artifact within the hour = signal the conversation is real.",
    ],
    watchOut: "Don't run the same conversation across personas. Don't use raw acronyms with Safety. Don't pitch SMS replacement.",
    connectsTo: ["Who To Target", "Customer Outcomes"],
    checkYourself: [
      "Can I name the five personas?",
      "What's the lead-in slide and proof artifact for each?",
      "What's the rule about SMS and Safety conversations?",
    ],
  },

  "se-slide-outcomes": {
    inOneSentence:
      "Four customer outcomes in the buyer's language: the schedule holds, revenue holds, costs come down, customers come back.",
    whyItMatters:
      "By this point the buyer has seen architecture, use cases and the loop. The only question left in their head: so what does this actually change? This slide answers in their language, not ours.",
    keyIdeas: [
      "Schedule Protection: hard-landing trend → targeted retraining → fewer AOG events, fewer cancelled rotations.",
      "Revenue Protection: protect operational windows that revenue depends on (slots, contracts).",
      "Cost Reduction: investigation cost down, leakage recovered, audit prep collapsed.",
      "Customer Retention: passenger experience holds because the operation holds.",
    ],
    terms: [T.lineOfSight, T.dtop],
    facts: [
      "Four outcomes — walked in Signal, Action, Result rhythm.",
      "Customer-specific value modelled in Line-of-Sight before commercial conversation.",
    ],
    watchOut: "Never claim a customer outcome you can't defend with a named example (offline).",
    connectsTo: ["Strategy & Vision Session", "Line-of-Sight"],
    checkYourself: [
      "Can I name the four outcomes in order?",
      "Can I narrate each one in Signal-Action-Result rhythm?",
      "Why is the order (schedule → revenue → cost → customers) deliberate?",
    ],
  },

  "se-strategy-vision-session": {
    inOneSentence:
      "The Strategy & Vision Session: three hours, fixed agenda, complimentary, run by the domain team on the buyer's operating model. The next step we close on — not procurement.",
    whyItMatters:
      "This is the meeting that changes the conversation. It is the only next step the rep closes on. It is NOT a workshop, not a demo, not a sales process — and naming what it isn't is half the pitch.",
    keyIdeas: [
      "Three boxes on the whiteboard: their operating model, our domain team, the outcome (clarity). No procurement box.",
      "Run by the domain team, not sales — the same people who built the operating model.",
      "Free, complimentary, pre-scoped. Never scope it in the meeting.",
      "Frame it for the leadership room: 'your leadership is being asked roadmap-level questions — this is the right venue to answer them.'",
    ],
    terms: [T.svs],
    facts: [
      "3 hours, fixed agenda, complimentary.",
      "Run by the domain team — not sales.",
    ],
    watchOut: "Never call it a workshop or a demo. Never scope it in the meeting. Never offer it cold.",
    connectsTo: ["Discovery to Close", "Maturity Roadmap"],
    checkYourself: [
      "What does the SVS specifically NOT include?",
      "Why is it run by the domain team and not sales?",
      "What's the rule about scoping it in the meeting?",
    ],
  },

  "se-w3-capstone": {
    inOneSentence:
      "The 30-day capstone: six moves in order — pick the account, run the call, pick the use case, handle the objection, close, book the Strategy & Vision Session.",
    whyItMatters:
      "This is the rep's self-test for Week 3 and the academy as a whole. If any of the six moves breaks, rehearse it in Practice Center before the next real call.",
    keyIdeas: [
      "Move 1: pick the account (Tier 1/2/3).",
      "Move 2: run the discovery call (45-min runbook).",
      "Move 3: pick the use case from their words.",
      "Move 4-6: handle the objection, close on the SVS, book the session.",
    ],
    terms: [T.svs, T.walkthrough, T.coreApps],
    facts: [
      "Six moves, in order, in 30 days.",
      "Rehearse breaks in Practice Center against the AI buyer.",
    ],
    watchOut: "If any move breaks, don't take the next real call until it's rehearsed.",
    connectsTo: ["Practice Center", "Strategy & Vision Session"],
    checkYourself: [
      "Can I name the six moves in order?",
      "Which move is hardest for me right now?",
      "Where do I rehearse when a move breaks?",
    ],
  },
};

// ─── Per-week fallback (used only when a slide has no curated entry) ───────
const WEEK_FALLBACK: Record<WeekId, SlideOnePager> = {
  w1: {
    inOneSentence:
      "This Week 1 slide builds the rep's foundation: the regulator shift, the platform in plain English, and the DTOP loop.",
    whyItMatters:
      "Every Week 1 slide earns the right to the operating-model conversation. Without the foundation, every later pitch sounds like another point tool.",
    keyIdeas: [
      "Anchor every Week 1 idea back to DTOP: Detect, Trigger, Orchestrate, Prove.",
      "Use plain English: one foundation, three Core Apps, intelligence on top, mobile on the device.",
      "End every Week 1 idea on the DTOP loop, not on a feature.",
    ],
    terms: [T.dtop, T.operationalData, T.coreApps],
    facts: [
      "Industry exposure: $25-35B controllable cost (Eurocontrol, IATA, SITA).",
      "Most operators run 5-7 disconnected tools today.",
    ],
    watchOut: "Don't pitch features in Week 1. Earn the right with the operating model first.",
    connectsTo: ["DTOP loop", "Strategic Shift"],
    checkYourself: [
      "Can I tie this slide back to DTOP without naming a feature?",
      "What's the regulator shift in one sentence?",
      "What's the one-sentence platform pitch?",
    ],
  },
  w2: {
    inOneSentence:
      "This Week 2 slide anchors a capability to a DTOP step and a customer use case.",
    whyItMatters:
      "Capabilities only matter when anchored to a use case the customer already owns. Touring features flat loses the room.",
    keyIdeas: [
      "Anchor every capability to a DTOP step.",
      "Anchor every capability to a use case the customer named in discovery.",
      "Use approved terminology only: Generative AI, Recommended Actions, Operational Data.",
    ],
    terms: [T.intelligenceLayer, T.insights, T.automation, T.unifiedMobile],
    facts: [
      "~90% domain vs ~35% generic accuracy on the same questions.",
      "Every answer cited to regulation, procedure and training source.",
    ],
    watchOut: "Don't tour capabilities flat. Anchor each to a use case.",
    connectsTo: ["DTOP loop", "Capability Talk Track"],
    checkYourself: [
      "Which DTOP step does this capability strengthen?",
      "Which customer use case anchors it?",
      "What's the approved language to use here?",
    ],
  },
  w3: {
    inOneSentence:
      "This Week 3 slide moves the conversation toward the Strategy & Vision Session.",
    whyItMatters:
      "Every Week 3 slide is part of the close motion. Don't accept procurement as a next step — always anchor on the SVS.",
    keyIdeas: [
      "Map the buyer to a footprint pattern: single, two, or all three Core Apps.",
      "Use the three differentiators as the anchor: connected data, cited AI, closed loop.",
      "Close on the Strategy & Vision Session.",
    ],
    terms: [T.svs, T.coreApps, T.walkthrough],
    facts: [
      "SVS: 3 hours, complimentary, fixed agenda.",
      "Approved replacement for 'demo' is 'walkthrough'. Never 'pilot'.",
    ],
    watchOut: "Don't close on procurement. Don't say 'pilot' or 'demo'.",
    connectsTo: ["Strategy & Vision Session", "Discovery Playbook"],
    checkYourself: [
      "What's the only next step I close on?",
      "What are the three differentiators?",
      "Which Week 3 footprint pattern does this slide serve?",
    ],
  },
};

// ─── Narration parser ───────────────────────────────────────────────────────
// Splits a teaching narration script (5-part Coach Script Standard) into
// ordered key points. Source of truth is salesEnablementNarration.ts; this
// function never alters wording, only segments and labels it.

const BEAT_ORDER: BeatLabel[] = [
  "Why this matters",
  "What's on the slide",
  "Core message",
  "The pain",
  "The value lever",
  "How to deliver",
  "Roadmap honesty",
  "Discovery question",
  "Transition",
];

const BEAT_MARKERS: Array<{ beat: BeatLabel; re: RegExp; strip?: RegExp }> = [
  {
    beat: "Why this matters",
    re: /^(why this (slide|drill|matters|is|exists|stretch|page)|this is the (single )?most important|this slide matters|here is what|open week|this slide is)/i,
    strip: /^(why this (slide|drill|matters|is|exists|stretch|page)[^.:,]*[:.,]\s*)/i,
  },
  {
    beat: "What's on the slide",
    re: /^(what is on the slide|what's on the slide|on the slide|the slide (shows|opens|has))/i,
    strip: /^((what(\s+is|'s)?\s+on the slide|on the slide|the slide (shows|opens|has))[^.:,]*[:.,—-]\s*)/i,
  },
  {
    beat: "Core message",
    re: /^(the core message|core message|core line[,:]?\s*verbatim|core line[,:]?)/i,
    strip: /^((the )?core message[^.:]*[:.]\s*|core line[,:]?\s*verbatim[.,]?\s*|core line[,:]?\s*)/i,
  },
  {
    beat: "The pain",
    re: /^(the pain|pain you|pain it|pain this addresses|pain addressed)/i,
    strip: /^((the )?pain[^.:]*[:.]\s*)/i,
  },
  {
    beat: "The value lever",
    re: /^(the value lever|value lever|the value|value you)/i,
    strip: /^((the )?value( lever)?[^.:]*[:.]\s*)/i,
  },
  {
    beat: "How to deliver",
    re: /^(how to deliver|delivery tip|when you deliver|deliver each|deliver it|deliver this|to deliver|setup[:.]|run[:.]|recover[:.]|pre-line|emphasise|always frame|do not say|don't say|never call|never quote)/i,
    strip: /^(how to deliver( it)?[^.:,]*[:.,—-]\s*|delivery tip[^.:,]*[:.,—-]\s*|when you deliver[^.,]*,\s*|setup[:.]\s*|run[:.]\s*|recover[:.]\s*)/i,
  },
  {
    beat: "Roadmap honesty",
    re: /^(be precise (on|and phased) (the )?roadmap|the honest limitation|honestly|be honest|do not promise|don't promise|the poc|poc[- ]versus[- ]production|phase \d|h1 2026|h2 2026)/i,
    strip: /^(be precise (on|and phased) (the )?roadmap[^.:,]*[:.,—-]\s*|the honest limitation[^.:,]*[:.,—-]\s*|be honest[^.:,]*[:.,—-]\s*)/i,
  },
  {
    beat: "Discovery question",
    re: /^(discovery question|the discovery question|ask (this|one) (good )?(discovery )?question|then ask)/i,
    strip: /^((the )?discovery question[^.:,]*[:.,—-]\s*|ask (this|one) (good )?(discovery )?question[^.:,]*[:.,—-]\s*|then ask[^.:,]*[:.,—-]\s*)/i,
  },
  {
    beat: "Transition",
    re: /^(transition|next slide|next we|next:|next,|now we|hand straight|hand off|then we|once you|that is|that's the)/i,
    strip: /^(transition[^.:,]*[:.,—-]\s*|next slide[,:]?\s*|next[,:]?\s*)/i,
  },
];

const classify = (sentence: string): BeatLabel | null => {
  for (const m of BEAT_MARKERS) {
    if (m.re.test(sentence)) return m.beat;
  }
  return null;
};

const stripBeatPrefix = (sentence: string, beat: BeatLabel): string => {
  for (const m of BEAT_MARKERS) {
    if (m.beat === beat && m.strip) {
      const out = sentence.replace(m.strip, "");
      // Capitalise leading character after strip.
      return out.charAt(0).toUpperCase() + out.slice(1);
    }
  }
  return sentence;
};

const splitSentences = (script: string): string[] =>
  script
    .trim()
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z'"(])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

export const buildKeyPointsFromScript = (
  script: string,
): { narrationInOneLine: string; keyPoints: KeyPoint[] } => {
  const sentences = splitSentences(script);
  const buckets: Record<BeatLabel, string[]> = {
    "Why this matters": [],
    "What's on the slide": [],
    "Core message": [],
    "The pain": [],
    "The value lever": [],
    "How to deliver": [],
    "Roadmap honesty": [],
    "Discovery question": [],
    "Transition": [],
  };
  let current: BeatLabel = "Why this matters";
  for (const sent of sentences) {
    const c = classify(sent);
    if (c) current = c;
    buckets[current].push(sent);
  }

  const keyPoints: KeyPoint[] = [];
  for (const beat of BEAT_ORDER) {
    const list = buckets[beat];
    if (!list.length) continue;
    const head = stripBeatPrefix(list[0], beat).trim();
    if (!head) continue;
    // Keep ALL supporting sentences — no truncation. The renderer chooses
    // how many to display based on available page space.
    const support = list.slice(1).map((s) => s.trim());
    keyPoints.push({ beat, point: head, support });
  }

  // narrationInOneLine: prefer Core message head; else first sentence overall.
  let oneLine =
    (buckets["Core message"][0] && stripBeatPrefix(buckets["Core message"][0], "Core message")) ||
    sentences[0] ||
    "";
  oneLine = oneLine.trim();
  if (oneLine.length > 240) {
    oneLine = oneLine.slice(0, 237).replace(/\s+\S*$/, "") + "...";
  }

  return { narrationInOneLine: oneLine, keyPoints };
};

export const buildStudyNote = (
  slideId: string,
  weekId: WeekId,
  script?: string,
): SlideOnePager => {
  const base = STUDY_NOTES[slideId] ?? WEEK_FALLBACK[weekId];
  const whatsOnSlide =
    base.whatsOnSlide ?? WHATS_ON_SLIDE[slideId] ?? WEEK_WHATS_ON[weekId];
  const merged: SlideOnePager = { ...base, whatsOnSlide };
  if (script) {
    // Narration extracts live ONLY in their own fields — they must never
    // overwrite curated study material (this was the bug that made the
    // PDF feel like paraphrased narration).
    const derived = buildKeyPointsFromScript(script);
    merged.narrationInOneLine = derived.narrationInOneLine;
    merged.keyPoints = derived.keyPoints;
  }
  return merged;
};

// Glossary helper — collect every unique term across a week, ordered A-Z.
export const collectWeekGlossary = (slideIds: string[]): StudyTerm[] => {
  const seen = new Set<string>();
  const out: StudyTerm[] = [];
  for (const id of slideIds) {
    const note = STUDY_NOTES[id];
    if (!note) continue;
    for (const t of note.terms) {
      const k = t.term.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(t);
    }
  }
  return out.sort((a, b) => a.term.localeCompare(b.term));
};

// ─── WHAT'S ON THE SLIDE ─────────────────────────────────────────────────────
// One short bullet list per slide describing what the rep is visually looking
// at. Read as: shapes / numbers / columns / colour story on screen. Keep each
// bullet under ~80 chars so it fits the PDF "What's on the slide" column.
export const WHATS_ON_SLIDE: Record<string, string[]> = {
  // ── Week 1 · Foundation ────────────────────────────────────────────────────
  "se-slide-0": [
    "Academy cover: three-week journey panel (Foundation, Capabilities, Sell & Win).",
    "Comply365 wordmark, badge of authorship for rep-facing use only.",
    "Top-line outcome: 'sell the operating model, not the software'.",
  ],
  "se-week-1": [
    "Week banner with 'Foundation' tag and the W1 slide-count.",
    "Three artefacts called out: one-sentence pitch, DTOP loop, four signal sources.",
    "Capability-band map: Core Apps · Intelligence & Orchestration · Mobile · DTOP.",
  ],
  "se-slide-shift": [
    "Before/after split: 'Did you tick the box?' versus 'Can you prove the loop closed?'.",
    "Industry exposure stat in headline size: $25-35B controllable cost.",
    "Source stack chip: Eurocontrol · IATA · SITA.",
  ],
  "se-plain-english-shift": [
    "Three silo columns labelled Safety, Content, Training — each in its own box.",
    "Disconnected signals shown as broken arrows between the three stacks.",
    "Platform overlay on top with the Intelligence Layer label.",
  ],
  "se-slide-whatis": [
    "Five visible boxes: 3 Core Apps row, Intelligence Layer band above, Unified Mobile shell.",
    "One Operational Data foundation drawn underneath all five.",
    "DTOP wrapper arrow around the whole stack.",
  ],
  "se-slide-dtop": [
    "Four DTOP stages in colour order: D blue · T amber · O violet · P emerald.",
    "Closed-loop arrow returning Prove back to Detect.",
    "Four signal chips feeding Detect (Regulation, Anomalies, OCRs, Macro/Geopolitical).",
  ],
  "se-slide-dtop-whiteboard": [
    "Marker-drawing reference of the DTOP loop, six strokes called out by number.",
    "Stroke colours match the DTOP slide (D blue → T amber → O violet → P emerald).",
    "Sentence-per-stage callout on the right of the diagram.",
  ],
  "se-slide-dtop-whiteboard-runbook": [
    "Three-column runbook: Pre-line · Run · Recover.",
    "Verbatim phrases the rep speaks aloud during the drill.",
    "Wedge question quoted in pull-quote treatment after the diagram.",
  ],
  "se-slide-signals": [
    "Four signal-source cards in canonical order with a one-line definition under each.",
    "Detect layer chip pulling all four sources into one stream.",
    "Wedge question called out below the four cards.",
  ],
  "se-slide-value": [
    "Three outcome columns: procedure cycle time, investigation cost, audit evidence.",
    "Persona chips above each column (Safety / Ops / CFO) — pick one for the room.",
    "Line-of-Sight callout linking to the customer-specific value model.",
  ],
  "se-slide-maturity-roadmap": [
    "Five-stage curve climbing left-to-right: Fragmented → Managed → Connected → Proactive → Predictive.",
    "Stage 3 inflection labelled 'the platform shift'.",
    "Comply365 trajectory line walking the full curve on one foundation.",
  ],
  "se-slide-maturity-whiteboard": [
    "Marker-drawing reference of the maturity curve with the six strokes numbered.",
    "'YOU ARE HERE' flag planted between Stage 1 and Stage 2.",
    "Stage-3 inflection circled as 'the platform shift'.",
  ],
  "se-slide-recap-m2": [
    "Three Q&A rehearsal cards: What is it? · How is it different? · One thing to remember.",
    "Each card holds the verbatim answer in bold for read-aloud rehearsal.",
    "Week 1 → Week 2 progress chevron at the bottom.",
  ],

  // ── Week 2 · Capabilities ──────────────────────────────────────────────────
  "se-week-2": [
    "Week banner with 'Capabilities' tag and the 15-slide running order.",
    "Capability stack callout: Intelligence Layer · Insights · Recommendations · Automation · Mobile.",
    "Approved-terminology chip strip (Generative AI, Recommended Actions, Operational Data).",
  ],
  "se-week-2-overview": [
    "The full platform diagram: 3 Core Apps, Intelligence Layer band, Unified Mobile shell.",
    "Operational Data foundation underneath all five.",
    "DTOP wrapper arrow around the whole platform.",
  ],
  "se-platform-insights-intelligence": [
    "Worked example: three station bars showing DG handling spikes correlated to overdue DG training.",
    "Six-stage Intelligence Layer pipeline (question → data → graph → reasoning → guardrails → cited answer).",
    "90% vs 35% accuracy comparison and tenant-isolation security chip.",
  ],
  "se-platform-wide-intelligence-usecases": [
    "Three use-case cards: Safety × Training, DG Manual Loop, Part 145 Audit Readiness.",
    "Each card maps onto DTOP chips with cited-evidence badges.",
    "Persona tag on each card (Safety / Training / Quality) so the rep picks ONE for the room.",
  ],
  "se-slide-coanalyst": [
    "Three-by-three grid: columns are Core Apps, rows are the capability each gets.",
    "Rollout chips: SafetyManager365 'Live today', Content & Training 'Next'.",
    "Footer line: 'same engine, different scope'.",
  ],
  "se-slide-coanalyst-usecases": [
    "Three day-to-day cards, one per Core App (Safety / Content / Training).",
    "Each card frames a spreadsheet chore replaced by a single plain-English prompt.",
    "'Same engine, two audiences' tagline anchoring board-level and coordinator value.",
  ],
  "se-slide-insights": [
    "Continuous-watch diagram: data substrate → pattern detection → evidence-attached insight card.",
    "Sample insight card with cited sources stacked beneath it.",
    "Roadmap chip: POC H1 2026 · Production H2 2026.",
  ],
  "se-slide-insights-usecases": [
    "Two columns: Per-solution (Safety/Content/Training) and Platform-level recommendation examples.",
    "Cited-evidence badge on every recommendation card.",
    "Roadmap honesty chip: Recommendations & Prescriptive Actions 2027+.",
  ],
  "se-slide-automation": [
    "Trust sequence shown left-to-right: Insights → Recommendations → Automation.",
    "Four bands of automated work (routing, assignment, notifications, evidence assembly).",
    "Human-in-the-loop chip on procedure/training changes; roadmap chip POC April 2026 / H2 2026 rollout.",
  ],
  "se-slide-automation-usecases": [
    "Three platform-layer cards, each closing a DTOP loop across all three Core Apps.",
    "Today vs With-platform comparison (email-and-weeks vs automatic-with-audit).",
    "Human-in-the-loop badge on every card.",
  ],
  "se-slide-tiers-vs-ai": [
    "Two columns side by side: Intelligence Layer (aviation-grounded) vs Generic AI (internet-grounded).",
    "Headline gauge: ~90% domain accuracy at L4-5 vs ~35% generic, on the same data.",
    "Methodology footnote chip (available under NDA in the SVS).",
  ],
  "se-slide-regmgmt": [
    "End-to-end flow strip: regulation change → impact ID → AI redlines → human review → routed updates → crew receipt.",
    "Each step badged with the capability that runs it (Intelligence / Insights / Recommendations / Automation).",
    "Today vs With-platform timeline: many weeks across 4-5 teams compresses to days.",
  ],
  "se-slide-mobile": [
    "One frontline-shell mock: content, training, safety reporting tabs in a single app.",
    "Phased rollout strip: Phase 1 Training H1 2026 · Phase 2 Safety H2 2026 · Phase 3 unified 2027+.",
    "<48 hour revision-to-device chip with offline-first badge.",
  ],
  "se-slide-talktrack": [
    "Five rows — one per capability — with two columns: plain-English line · discovery question.",
    "Rows in the same order as the customer deck (Intelligence → Insights → Recommendations → Automation → Mobile).",
    "Rehearsal label at the top: 'study page, not a customer slide'.",
  ],
  "se-w2-capstone-whiteboard": [
    "Madrid use-case timeline strip: Detect d1 · Trigger d2 · Orchestrate d3 · Prove d5.",
    "Capability badges land on each day to show the loop assembling itself.",
    "60-second target with one marker callout.",
  ],

  // ── Week 3 · Sell & Win ────────────────────────────────────────────────────
  "se-week-3": [
    "Week banner with 'Sell & Win' tag and the 22-slide running order.",
    "Three-move close motion called out: Discover · Walk · Close.",
    "Approved-language chip strip: walkthrough, focused session — never 'demo' or 'pilot'.",
  ],
  "se-w3-roadmap-vision-frame": [
    "Maturity curve redrawn for the Week 3 opening, with stage labels.",
    "Three callouts on the curve: differentiate · up-sell · cross-sell.",
    "Honesty chip on Stage 5: direction of travel, not a feature for sale today.",
  ],
  "se-w3-whole-vision-whiteboard": [
    "Top strip: Madrid use case with four DTOP micro-cards (D d1, T d2, O d3, P d5).",
    "Bottom-up five-stage stack mapping each platform layer to a DTOP role and colour.",
    "Closing verbatim line: 'one foundation, one intelligence, one loop'.",
  ],
  "se-w3-signals-recap": [
    "Signals layer above the DTOP engine, both drawn one-minute style.",
    "One anomaly walked end-to-end through Detect → Trigger → Orchestrate → Prove.",
    "Point-solution comparison line: 'they stop at Detect — we do all four'.",
  ],
  "se-who-to-target": [
    "Three tier blocks stacked: Tier 1 (highest conviction) → Tier 2 → Tier 3.",
    "Qualifying criteria called out per tier (app live, renewal window, sponsor).",
    "Renewal 'trojan horse' label on the Tier 1 block.",
  ],
  "se-footprint-intro": [
    "Three footprint pattern cards: single app · two apps · all three apps.",
    "Same foundation drawn under every card — different conversation above it.",
    "Loop language vs SKU language pull-quote.",
  ],
  "se-footprint-single": [
    "One lit lane and two dark lanes drawn above a shared foundation.",
    "Intelligence Layer band drawn across only the lit lane, labelled 'confined to this lane'.",
    "Broken DTOP arrow where the dark lanes start.",
  ],
  "se-footprint-single-whiteboard": [
    "Marker-drawing reference: one lit lane, two dark, intelligence band, broken DTOP arrow.",
    "Six numbered strokes called out beside the diagram.",
    "Verbatim discovery question quoted below the diagram.",
  ],
  "se-footprint-two": [
    "Two lit lanes, one dark lane drawn above the shared foundation.",
    "Intelligence Layer band drawn across both lit lanes — labelled 'already crossing'.",
    "Half-loop DTOP arrow that visibly breaks at the dark lane.",
  ],
  "se-footprint-two-whiteboard": [
    "Marker-drawing reference of the half-loop with the missing lane shown empty.",
    "Six numbered strokes called out beside the diagram.",
    "Discovery question + 'STOP TALKING' coaching cue beneath the drawing.",
  ],
  "se-footprint-all": [
    "Three lit lanes above the foundation, intelligence band spanning all three.",
    "Closed DTOP loop drawn around the stack.",
    "'Conductor vs instruments' analogy called out beside the diagram.",
  ],
  "se-footprint-all-whiteboard": [
    "Marker-drawing reference of the full closed loop, three lit lanes, intelligence band.",
    "Six numbered strokes called out beside the diagram.",
    "Discovery question quoted below with the 'whoever speaks first loses' coaching cue.",
  ],
  "se-footprint-ladder": [
    "Four ladder rungs ascending: 1 app ~25% → 2 apps ~55% → 3 apps ~75% → 3 + Intelligence Layer 100%.",
    "Directional-modelling disclaimer chip at the bottom.",
    "Account-review/renewal usage badge (never use cold).",
  ],
  "se-footprint-playbook": [
    "Three numbered moves stacked: Audit · Name · Anchor.",
    "Per move: discovery question on the left, coaching note on the right.",
    "Loop-language vs SKU-language reminder strip at the foot.",
  ],
  "se-discovery-to-close": [
    "Three-word motion banner: Discover · Walk · Close.",
    "Time-box guidance under each word (listen / show / close on SVS).",
    "Banned-language strip: never 'demo', never 'pilot'.",
  ],
  "se-discovery-call-runbook": [
    "45-minute call broken into three time-boxes: 5 min frame · 30 min ask · 10 min recap.",
    "Opening-line pull-quote on signals not data.",
    "Counter-offer script for 'just send the deck' requests.",
  ],
  "se-discovery-question-bank": [
    "Four DTOP columns (D / T / O / P), three questions in each column.",
    "Red-flag answer chips on the right of each question.",
    "Coaching note: pick four (one per step), ask one at a time.",
  ],
  "se-persona-playbook": [
    "Five persona rows: Director of Safety, Head of Training, VP Operations, Chief Compliance Officer, IT/Tech.",
    "Columns per row: lead-in slide · mirror metric · proof artifact.",
    "Language warnings strip (no FOQA/FDM/ASAP with Safety; never pitch SMS replacement).",
  ],
  "se-slide-outcomes": [
    "Four outcome blocks in buyer language: Schedule · Revenue · Cost · Customers.",
    "Each block told in Signal → Action → Result rhythm.",
    "Line-of-Sight callout linking to customer-specific modelling.",
  ],
  "se-strategy-vision-session": [
    "Three boxes on a whiteboard: their operating model · our domain team · outcome (clarity).",
    "Format chip: 3 hours · fixed agenda · complimentary · run by domain team.",
    "What-it-isn't strip: not a workshop, not a demo, not a sales process.",
  ],
  "se-w3-capstone": [
    "Six numbered moves stacked: pick account · run call · pick use case · handle objection · close · book SVS.",
    "60-second self-test footer.",
    "Practice Center handoff badge for any move that breaks.",
  ],
};

export const WEEK_WHATS_ON: Record<WeekId, string[]> = {
  w1: [
    "Week 1 slide — anchored on the operating model, not on product features.",
    "Expect a foundation visual: capability bands, DTOP loop, or the maturity curve.",
    "Read every diagram as 'one foundation, three Core Apps, intelligence on top'.",
  ],
  w2: [
    "Week 2 slide — one capability tied to a DTOP step and a customer use case.",
    "Expect a capability diagram, a worked example or a roadmap honesty chip.",
    "Approved terminology only: Generative AI, Recommended Actions, Operational Data.",
  ],
  w3: [
    "Week 3 slide — part of the close motion toward the Strategy & Vision Session.",
    "Expect a footprint diagram, a discovery aid, or a persona/outcome map.",
    "Loop language beats SKU language — read every diagram for the broken loop.",
  ],
};
