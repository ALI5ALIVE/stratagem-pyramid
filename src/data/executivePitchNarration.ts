export interface ExecNarrationSlide {
  slideId: string;
  title: string;
  script: string;
  voiceId: string;
}

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George

export const executivePitchNarrations: ExecNarrationSlide[] = [
  {
    slideId: "exec-slide-0",
    title: "Title",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Your operation generates thousands of signals every day. Most never reach the right person in time. In four minutes, I'll show you how leading carriers are turning those signals into predictable operational performance — and what that's worth to your bottom line.",
  },
  {
    slideId: "exec-slide-1",
    title: "The Human-Factor Cost",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Every airline has costs hiding in the gap between what people know and what they do. Go-arounds that weren't prevented because training never saw the safety signal. An aircraft grounded because a compliance gap wasn't flagged. Crew technique variance adding fuel burn that no dashboard catches. These are human-factor costs — the portion of operational spend your people and processes can directly influence. We've modelled eight categories of operational disconnection. The total is significant. But the methodology is the point — we help you identify your biggest human-factor cost driver and show you what even a small improvement is worth.",
  },
  {
    slideId: "exec-slide-2",
    title: "The Shift",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "The industry is shifting from managing compliance to managing performance. Regulators now expect proof that when a signal was detected, the right action followed and the outcome improved. Your competitors who make this shift first don't just get safer — they get more predictable. Fewer disruptions, faster recovery, better crew readiness. For a COO, that's the difference between reacting to yesterday and controlling tomorrow.",
  },
  {
    slideId: "exec-slide-3",
    title: "The New Operating Model",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "We call it Detect, Trigger, Orchestrate, Prove. Detect — your systems listen continuously across flight operational data, safety, and ops data. Trigger — the right workflow fires automatically, no email chains. Orchestrate — training, procedures, and compliance move together, not in sequence. Prove — every action logged, audit-ready by default. One example: a hard landing trend detected Tuesday, affected crews retrained by Thursday, repeat events down seventy-eight percent. That's the loop.",
  },
  {
    slideId: "exec-slide-4",
    title: "The Platform",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This loop is powered by three applications working as one. Safety Manager detects the signals. Content Manager orchestrates the procedural response. Training Manager ensures crew readiness before the next event. And CoAnalyst — our intelligence layer — connects all three, transforming sixty-five thousand monthly data points into decisions you can act on. One platform. One version of truth.",
  },
  {
    slideId: "exec-slide-5",
    title: "Intelligence Layer",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Here's why this matters. Generic AI gives you thirty-five percent accuracy on aviation queries. It can't distinguish a bird strike report from a bird strike trend. CoAnalyst delivers over ninety percent — trained on ten years of aviation operational data. That precision gap is the difference between intelligence that drives action and noise that wastes your safety team's time.",
  },
  {
    slideId: "exec-slide-6",
    title: "Line of Sight",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Every signal connects to an outcome you own. Go-around trends detected and addressed within forty-eight hours — that's schedule protection. Procedure gaps closed before the audit — that's regulatory confidence. Crew retrained before the next rotation — that's operational readiness. The total human-factor cost exposure is significant — and the cost avoidance opportunity runs into the tens of millions. We can model this with your specific numbers. So what makes us the right partner to deliver this?",
  },
  {
    slideId: "exec-slide-7",
    title: "Why Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three things set Comply three six five apart — and they're the reason leading carriers across North America trust us with their operations today. First, a connected foundation. We're not stitching point solutions together. Safety, content, and training share one data model, one version of truth. The largest carriers in North America rely on this every day. Second, embedded intelligence. CoAnalyst wasn't built as a generic AI with an aviation skin. It's been trained from the ground up on ten years of aviation operational data — delivering over ninety percent accuracy where general-purpose tools plateau at thirty-five. That precision is the difference between actionable intelligence and noise. Third, proof by default. Every action is logged automatically. Every change is traced. Every decision is auditable. You don't prepare for regulators — you're always ready. Let's schedule a thirty-minute discovery session to map your operational signals to measurable outcomes — and build a custom cost avoidance model with your numbers.",
  },
];

export const getExecPitchNarration = (slideId: string): ExecNarrationSlide | undefined => {
  return executivePitchNarrations.find((s) => s.slideId === slideId);
};

// ---------------------------------------------------------------------------
// Medium Executive Pitch (Exec 3) — sales-coach speaker notes / TTS scripts
// PURPOSE → TALK TRACK → PROOF POINT → TRANSITION on every slide.
// ---------------------------------------------------------------------------
export const exec3PitchNarrations: ExecNarrationSlide[] = [
  {
    slideId: "exec3-slide-0",
    title: "Title",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is the cover. Set tone — confident, executive, performance-focused. The line you want to land in thirty seconds: in the next thirty minutes I'll show you the architecture leading carriers are using to turn operational signals into measurable performance — DTOP, the four-layer platform, and the intelligence layer that makes it real. Then move to the strategic shift slide.",
  },
  {
    slideId: "exec3-slide-1",
    title: "Strategic Shift",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Frame the why-now. The industry is shifting from prescriptive compliance to performance-based oversight. Regulators no longer just want completed checklists — they want proof that when a signal was detected, the right action followed and the outcome improved. The proof point: the carriers building the loop now will set the standard everyone else gets measured against. Bridge: so what does today actually look like inside an airline? Next slide.",
  },
  {
    slideId: "exec3-slide-2",
    title: "Industry Challenge",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is your reality check. Twelve thousand operational signals a month. Eight thousand orphaned — captured but never connected to a procedural or training response. Three-week investigations. Same events recurring because nobody closed the loop. The proof point to land: this isn't a people problem, it's an architecture problem. Bridge: let me show you the platform that closes that loop.",
  },
  {
    slideId: "exec3-slide-platform",
    title: "The Platform",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "One screen, bottom-up. Foundation — three core apps, ContentManager365, TrainingManager365, SafetyManager365, sharing one operational data foundation. Above — intelligence and orchestration. Above that — one trusted unified mobile shell. Wrapping the whole stack — DTOP. The proof point: one platform, one operating model, one mobile entry point. Bridge: let's start at the foundation and work up. Next divider — Core Apps.",
  },
  {
    slideId: "exec3-divider-core",
    title: "Layer divider — Core Apps",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Quick reset. We're now in the foundation layer — the three core apps. These are the systems of record that emit every operational event the rest of the platform reasons over. ContentManager365 for procedures and manuals. TrainingManager365 for competency. SafetyManager365 for occurrences and audits. The proof point: these aren't integrated — they're one platform, one shared data layer. Bridge: let's start with safety.",
  },
  {
    slideId: "exec3-slide-4a",
    title: "SafetyManager365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "SafetyManager365 is the investigation and assurance engine. From initial report to corrective action and closure. It ingests flight operational data, crew safety reports and audit findings. With the intelligence layer activated, your analysts stop manually reviewing hundreds of reports — patterns are surfaced in real time, cross-referenced with weather, crew rosters and procedure versions. The proof point: weeks of manual correlation compressed to hours, at around ninety percent accuracy on domain-specific patterns versus around thirty-five percent for generic AI. Bridge: signals are nothing without the procedures they update — next, ContentManager365.",
  },
  {
    slideId: "exec3-slide-4b",
    title: "ContentManager365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "ContentManager365 is the procedural backbone — authoring, distribution, version control and electronic acknowledgement across every operational document. With the intelligence layer, regulatory change management transforms. A new directive arrives. The platform maps it against your procedure library, identifies every affected document, queues updates for the right SME, then tracks the cascade — every affected crew member receives the updated version and acknowledges it. The proof point: four to six weeks of manual effort compressed to days. Bridge: a procedure isn't real until the right people are trained on it — next, TrainingManager365.",
  },
  {
    slideId: "exec3-slide-4c",
    title: "TrainingManager365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "TrainingManager365 handles the competency lifecycle — qualification, recurrent training, checking events and revalidation. The activation here is powerful. Instead of generic recurrent cycles, it analyses individual operational data — exposure, route, safety report history — and recommends targeted interventions specific to each crew member. The proof point: when a hard landing cluster is detected, the platform identifies the affected pilots and assigns approach-specific simulator scenarios within forty-eight hours. Targeted, not generic. Bridge: that's the foundation. Now the layer that makes it intelligent. Next divider — Intelligence and Orchestration.",
  },
  {
    slideId: "exec3-divider-intelligence",
    title: "Layer divider — Intelligence & Orchestration",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Reset. We're now in the intelligence and orchestration layer. Three capabilities — Automation for cross-product workflows, Insights and Recommendations for proactive direction, and CoAnalyst for natural-language deep dive with prescriptive next steps. Together they turn operational data into action. Bridge: let's start with Automation.",
  },
  {
    slideId: "exec3-slide-automation",
    title: "Automation",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Automation is one orchestration layer across the platform — not one per product. Triggers fire from native events, webhooks, schedules or third-party tools. Reusable, no-code workflows. Versioned, observable, with human-in-the-loop gates wherever you need them. The proof point: a procedure publishes in ContentManager365, the workflow auto-assigns training, opens a SafetyManager365 compliance checkpoint and notifies the team — zero manual handoffs. Bridge: automation runs the plays — Insights surfaces which plays to run. Next slide.",
  },
  {
    slideId: "exec3-slide-insights",
    title: "Insights & Recommendations",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Insights and Recommendations turns plain-English questions into evidence-backed action plans. Pattern detection across silos. Recommended Actions paired with traceable reasoning. Continuous, exploratory analysis. The worked example to land: a COO asks, are dangerous goods incidents linked to training gaps? Sixty seconds later: three hub stations correlate with overdue DG recurrent training. The proof point: question to action plan in under a minute. Bridge: insights surface what to ask — CoAnalyst answers in plain English with prescriptive next steps. Next slide.",
  },
  {
    slideId: "exec3-slide-coanalyst",
    title: "CoAnalyst",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "CoAnalyst is the conversational intelligence layer of the Operational Performance Platform. Master message — from reports to intelligence, from events to control. It's a hybrid AI architecture — domain-trained models for the heavy lifting, an LLM augmentation layer for natural-language interaction, with continuous learning. Trained on millions of aviation reports since twenty twenty-three. The proof point: around ninety percent accuracy at deep classification — Level 4 to 5 — versus around thirty-five percent for generic AI. Bridge: this is why generic AI alone can't replace this — let me show you the precision gap. Next slide.",
  },
  {
    slideId: "exec3-slide-tiers-vs-ai",
    title: "CoAnalyst vs Generic AI",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is the slide that ends the build-or-buy debate. At Level 1 — fifty occurrence types — generic AI is roughly comparable. At Level 2 to 3, hundreds of categories, generic AI drops to around sixty percent. At Level 4 to 5 — the cause and root cause — generic AI collapses to thirty to forty percent. CoAnalyst holds around ninety. The proof point: generic AI calls a repeated bird strike a one-off — missing the cluster pattern that signals a runway hazard trend. Bridge: the platform reaches the frontline through one trusted shell. Next divider — Mobile.",
  },
  {
    slideId: "exec3-divider-mobile",
    title: "Layer divider — Unified Mobile",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Quick reset. We're now in the unified mobile layer — one trusted shell for the frontline. Procedures, training and safety inside the app crews already use every shift. Bridge: here's how it lands.",
  },
  {
    slideId: "exec3-slide-mobile",
    title: "Unified Mobile",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three apps a shift becomes one app every shift. The Comply365 mobile app — already in daily frontline use through ContentManager365 — becomes the single shell for the platform. Procedures live there today. TrainingManager365 arrives in Q2 2026. SafetyManager365 reporting in Q4 2026. Single sign-on. Unified notifications. One MDM footprint, one approval cycle through customer mobile estates. The proof point: the infrequent tools — training and safety — stop being unfamiliar detours and become tabs inside the app crews already trust. Bridge: foundation, intelligence, mobile — they all need an operating model that closes the loop. Next divider — DTOP.",
  },
  {
    slideId: "exec3-divider-dtop",
    title: "Layer divider — DTOP",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Final layer reset. DTOP is the operating model that wraps everything we've shown — Detect, Trigger, Orchestrate, Prove. Bridge: here's how it works.",
  },
  {
    slideId: "exec3-slide-dtop",
    title: "DTOP — System of Work",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "DTOP is the operating model. Detect — operational signals ingested in real time across content, training, safety and external sources. Trigger — when criteria are met, the right workflow fires automatically. Orchestrate — safety investigation, procedure update and training assignment move in parallel, not in sequence. Prove — every action logged automatically, audit-ready by default. The proof point: intelligence without workflow is just dashboards. DTOP turns intelligence into operational outcomes you can measure and prove. Bridge: that's the model — let me show you the before-and-after of working this way.",
  },
  {
    slideId: "exec3-slide-transformation",
    title: "The Transformation",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Walk the before column slowly — six weeks from signal to action, manual handoffs, days reconstructing the audit thread. Then the after — same teams, same data, signal to closed loop in hours. The proof point to land: same teams, same data, completely different outcome. It's a wiring change, not a people change. Bridge: this isn't theory — let me show you the use cases firing today.",
  },
  {
    slideId: "exec3-slide-usecases",
    title: "Use Cases in Action",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three domains, same architecture. Safety — hard landing trends, crew injuries, regulatory exposure. Operations — AOG events, ground delays, fuel performance. Financial — insurance premiums, revenue protection. Each follows the same Detect, Trigger, Orchestrate, Prove pattern with costed outcomes. Pick the case that matches what they cared most about earlier in the conversation. The proof point to land: different signal, different domain, exactly the same pattern. Bridge: so where does this journey lead — that's the maturity roadmap.",
  },
  {
    slideId: "exec3-slide-maturity",
    title: "Maturity Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Five stages. Fragmented — disconnected systems, reactive. Connected — data flows, workflows still manual. Automated — trigger-based workflows cut response from weeks to days. Proactive — pattern detection identifies risks before events. Predictive — forward-looking models orchestrate preemptive responses. The proof point: the traditional path takes five to seven years. With this platform, customers reach stage four in twelve to eighteen months. Bridge: those are the stages — let me show you the outcomes that come with them.",
  },
  {
    slideId: "exec3-slide-outcomes",
    title: "Customer Outcomes",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "These are the four outcome buckets your board cares about. Schedule protection. Revenue protection. Cost reduction. Customer trust. Frame each as the spread observed across customer deployments — not as a guarantee. The proof point: every signal acted on, every outcome measured, every decision auditable. Bridge: so why are we the right partner to deliver this? Final slide.",
  },
  {
    slideId: "exec3-slide-why",
    title: "Why Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three things set us apart. First — connected foundation. Not point solutions stitched together. One data model, three core apps, one intelligence layer. Five hundred and fifty plus airlines worldwide, around two and a half million users, six continents. Second — embedded intelligence. CoAnalyst built from the ground up on aviation data since twenty twenty-three — around ninety percent accuracy where generic AI plateaus at thirty-five. Third — proof by default. Every action logged, every change traced, every decision auditable. The proof point to land: you don't prepare for regulators — you're always ready. Then ask for the next meeting — a half-day discovery workshop with their safety, training and operations leads.",
  },
];

export const getExec3PitchNarration = (slideId: string): ExecNarrationSlide | undefined => {
  return exec3PitchNarrations.find((s) => s.slideId === slideId);
};
