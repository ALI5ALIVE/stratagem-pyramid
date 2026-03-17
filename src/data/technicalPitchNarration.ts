export interface TechNarrationSlide {
  slideId: string;
  title: string;
  script: string;
  voiceId: string;
}

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George

export const technicalPitchNarrations: TechNarrationSlide[] = [
  {
    slideId: "tech-slide-0",
    title: "Title",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Over the next thirty minutes, I'm going to take you inside the architecture of the Operational Performance Platform. Not the marketing story — the engineering story. How three applications, one intelligence layer, and a connected data model turn fragmented operational signals into measurable, provable outcomes. If you're evaluating build versus buy, or comparing us to generic AI tools and point solutions, this is the session that answers those questions. Let's go deep.",
  },
  {
    slideId: "tech-slide-1",
    title: "Strategic Shift",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "The aviation industry is in the middle of a fundamental shift. Regulators are moving from prescriptive compliance — checking boxes and filing reports — to performance-based oversight. They want evidence that when a signal was detected, a specific action was taken, and the outcome was measured. This isn't future state. ICAO's Annex nineteen, EASA's management system requirements, and the FAA's Safety Management System mandate are all driving this direction. The carriers who build the infrastructure to demonstrate connected evidence — from signal to action to outcome — will set the standard. Everyone else will spend years catching up.",
  },
  {
    slideId: "tech-slide-2",
    title: "Industry Challenge",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Here's the technical challenge. The average airline operates between five and fifteen disconnected systems across safety, training, and content management. Safety data lives in one database. Training records in another. Procedure documents in a third. Crew scheduling in a fourth. Each system was built to solve a specific problem. None were designed to talk to each other. The result is an operational architecture where a safety signal detected in system A takes six weeks to produce a training response in system B — if the loop closes at all. And when an auditor asks for the evidence thread, someone spends days manually reconstructing it across spreadsheets and email chains.",
  },
  {
    slideId: "tech-slide-3",
    title: "Before & After",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let me make the architecture contrast clear. In the current state, a Foqua exceedance is detected. Safety logs it in their system. Sends an email to training. Training opens a spreadsheet to scope the response. Content receives a request weeks later. The evidence trail is scattered across four systems and dozens of email threads. In the connected state, the same exceedance is detected. The platform automatically identifies the affected crew, assigns targeted training, verifies the relevant procedure version, and logs every step — all within forty-eight hours. Same data sources. Same teams. Fundamentally different architecture. The difference is the wiring between the systems, not the systems themselves.",
  },
  {
    slideId: "tech-slide-4",
    title: "The Platform",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "The platform consists of three core applications that share a single data model. Safety Manager three six five handles hazard identification, risk assessment, investigation management, and safety assurance — processing reports from Foqua, Aviation Safety Action Program, voluntary reporting, and audit systems. Content Manager three six five manages the full document lifecycle — authoring, version control, distribution, and acknowledgment tracking for over ten thousand procedure documents per carrier. Training Manager three six five provides competency management, curriculum assignment, learning delivery, and qualification tracking across all crew and ground personnel. These aren't integrations. They're one platform with one shared data layer. Over sixty-five thousand data points flow through this ecosystem every month.",
  },
  {
    slideId: "tech-slide-4a",
    title: "Safety Manager 365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let me go deeper on Safety Manager. At its core, it's your investigation and assurance engine — managing the full lifecycle from initial report through investigation, corrective action, and closure. It ingests data from Foqua flight data monitoring, Aviation Safety Action Program voluntary reports, line operations safety audits, and internal audit programmes. Now here's where CoAnalyst activates this data. Instead of your safety analysts manually reviewing hundreds of reports to spot trends, CoAnalyst processes them in real time. It identifies clusters — like a series of hard landings at a specific airport — and cross-references them with weather data, crew rosters, and procedure versions. What used to take your team weeks of manual correlation now happens in hours, with ninety percent accuracy on domain-specific pattern recognition.",
  },
  {
    slideId: "tech-slide-4b",
    title: "Content Manager 365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Content Manager is the procedural backbone of the platform. It manages the full authoring and distribution lifecycle for operational manuals, standard operating procedures, regulatory bulletins, and training materials. Version control, change tracking, and electronic acknowledgment are built in. Where CoAnalyst transforms this module is in regulatory change management. When a new airworthiness directive arrives, CoAnalyst maps it against your existing procedure library, identifies every affected document, flags the specific sections that need revision, and queues the update for the right subject matter expert. It then tracks the cascade — ensuring every affected crew member receives the updated version and acknowledges it. A process that typically takes four to six weeks of manual effort compresses to days.",
  },
  {
    slideId: "tech-slide-4c",
    title: "Training Manager 365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Training Manager handles the complete competency lifecycle — from initial qualification through recurrent training, checking events, and revalidation. It tracks regulatory requirements, airline-specific standards, and individual crew member progress across every qualification they hold. CoAnalyst's activation here is powerful. Instead of generic recurrent training cycles, CoAnalyst analyses an individual crew member's operational data — their Foqua trends, their route exposure, their safety report history — and recommends targeted training interventions specific to their risk profile. When a hard landing cluster is detected at a specific airport, CoAnalyst doesn't just flag the trend — it identifies the forty-seven pilots who've flown that approach and assigns approach-specific simulator scenarios within forty-eight hours.",
  },
  {
    slideId: "tech-slide-7",
    title: "CoAnalyst Intelligence",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Now let me explain the intelligence layer in detail. CoAnalyst is a hybrid AI architecture — it's not one model doing everything. It combines specialised language models trained on aviation operational data, retrieval-augmented generation for real-time context grounding, structured reasoning engines for compliance logic, and pattern detection algorithms for trend identification. It's been trained on millions of historical aviation reports since twenty twenty-three, with continuous fine-tuning on real operational data. The result is a system that understands the difference between a bird strike report and a bird strike trend, between a procedure change and a procedure gap, between a training completion and a competency validation. This domain specificity is what delivers ninety percent accuracy where generic tools plateau at thirty-five.",
  },
  {
    slideId: "tech-slide-8",
    title: "Intelligence Tiers",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "CoAnalyst operates across four intelligence tiers. Tier one is Historical — querying and summarising past data. What happened with bird strike reports in the last quarter? How many hard landings occurred at this airport over the past year? Tier two is Reactive — real-time monitoring and alerts. A cluster of fatigue-related reports just crossed the threshold for this base. Tier three is Proactive — pattern detection and hazard identification. Based on seasonal weather patterns and historical data, we're seeing elevated risk for this route during the next two months. And Tier four is Predictive — likelihood assessments and forward-looking risk models. Given current trends, there's a seventy-three percent probability of a regulatory finding in this area within the next ninety days. Each tier builds on the last, and the value compounds as the system ingests more of your operational data.",
  },
  {
    slideId: "tech-slide-5",
    title: "DTOP Architecture",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Now let me connect the intelligence layer to the operational workflow. This is the Detect, Trigger, Orchestrate, Prove architecture. Detect is powered by the platform's signal engine — ingesting data from Foqua, Aviation Safety Action Program, audit systems, and operations data. Over sixty-five thousand signals per month flow through this layer. Trigger is the automation engine — when a signal meets defined criteria, the right workflow starts automatically. No email chains. No manual handoffs. Orchestrate coordinates the response across all three modules — safety investigation, content update, and training assignment move in parallel, not in sequence. And Prove is the evidence engine — every action, every decision, every change is logged automatically, creating an audit-ready evidence trail by default. This is the mechanism that turns intelligence into operational outcomes.",
  },
  {
    slideId: "tech-slide-10",
    title: "Safety Use Cases",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let me walk through three safety-specific use cases in detail. First: hard landing trend response. Foqua detects a cluster of firm landings at a specific airport. CoAnalyst identifies the contributing factors — runway configuration, weather patterns, approach procedures — and cross-references with crew rosters. Within forty-eight hours, the affected crew receive targeted simulator training with approach-specific scenarios. Result: seventy-eight percent reduction in repeat events within ninety days. Second: smoke and fumes investigation. A cluster of cabin air quality reports triggers CoAnalyst's pattern detection. It identifies commonalities across aircraft type, route, and maintenance history, then automatically flags the maintenance team with a correlated analysis. Third: turbulence injury prevention. Cross-referencing turbulence encounter data with cabin crew injury reports to identify routes and altitudes with elevated risk profiles.",
  },
  {
    slideId: "tech-slide-11",
    title: "Ops Use Cases",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three operational use cases. First: regulatory change cascade. When a new airworthiness directive arrives, CoAnalyst maps it against your procedure library, identifies every affected document and crew qualification, and orchestrates the update — from content revision through crew acknowledgment and retraining. Typical compression: from six weeks to five days. Second: fatigue risk management. Integrating roster data, flight duty period calculations, and voluntary fatigue reports to create a real-time fatigue risk picture. CoAnalyst flags individual crew members and specific pairings where cumulative fatigue scores exceed threshold values — before the next assignment, not after the next incident. Third: ground handling incident reduction. Correlating ramp safety reports with equipment type, time of day, seasonal patterns, and individual handler training records to identify targeted intervention opportunities.",
  },
  {
    slideId: "tech-slide-12",
    title: "Financial Use Cases",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Two financial use cases that translate directly to the P and L. First: fuel variance optimisation. A one percent fuel variance across a mid-size fleet represents five to twenty million dollars annually. CoAnalyst identifies the specific routes, aircraft, and crew members contributing to excess fuel burn by correlating Foqua data with flight planning, weather, and training records. Targeted training interventions on the highest-variance segments deliver measurable fuel savings within ninety days. Second: insurance premium optimisation. Aviation insurers are increasingly sophisticated in their risk assessment. Airlines that can demonstrate connected safety intelligence — not just a binder of completed training records, but a live evidence trail from signal to action to outcome — are seeing material premium reductions. One carrier reported a fifteen percent reduction in hull and liability premiums after demonstrating their connected evidence model.",
  },
  {
    slideId: "tech-slide-13",
    title: "Line of Sight",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Every use case we've just discussed connects to an executive outcome through what we call the Line of Sight model. It works in three tiers. Tier three: operational events — go-arounds, delays, injuries, regulatory findings. These are the signals your teams manage daily. Tier two: leading measures — investigation closure rates, training response times, compliance gap ratios. These are the operational levers your middle management controls. Tier one: lagging outcomes — schedule reliability, cost per available seat mile, regulatory standing, insurance costs. These are the numbers your board measures. The Line of Sight model connects them. When your CFO asks why insurance premiums changed, you can trace it back through compliance gap closure rates to specific regulatory change responses. Every signal, measured. Every outcome, traceable.",
  },
  {
    slideId: "tech-slide-14",
    title: "Maturity Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "The maturity roadmap shows five stages of operational evolution. Stage one: fragmented — disconnected systems, reactive responses, manual evidence collection. This is where most airlines sit today. Stage two: connected — data flows between systems, but workflows are still manual. Stage three: automated — trigger-based workflows reduce response times from weeks to days. Stage four: proactive — CoAnalyst's pattern detection identifies risks before events occur. Stage five: predictive — forward-looking models anticipate risks and orchestrate preemptive responses. The traditional transformation path takes five to seven years. With a connected platform and the right implementation approach, we've seen carriers reach Stage four in twelve to eighteen months. The compounding value is significant — each stage builds on the data and workflows established in the previous stage.",
  },
  {
    slideId: "tech-slide-15",
    title: "2026 Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Looking ahead to twenty twenty-six, three capabilities are in active development. First: predictive maintenance correlation — connecting CoAnalyst's safety intelligence with maintenance planning to predict component failures before they cause disruption. Second: cross-carrier benchmarking — anonymised operational intelligence sharing across our fifty-plus airline customer base, enabling carriers to benchmark their safety and operational performance against industry peers. Third: regulatory submission automation — generating regulatory-ready evidence packages automatically when a regulator requests audit documentation. Each of these capabilities extends the platform's intelligence layer while maintaining the connected architecture that makes Detect, Trigger, Orchestrate, Prove possible.",
  },
  {
    slideId: "tech-slide-16",
    title: "Outcomes",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let me summarise the measurable outcomes across the use cases we've discussed. Safety: seventy-eight percent reduction in repeat safety events through targeted intervention. Speed: investigation and response times compressed from six weeks to forty-eight hours. Compliance: regulatory change cascade from directive to crew acknowledgment in five days instead of six weeks. Financial: total cost avoidance opportunity exceeding forty million dollars annually for a mid-size carrier. Precision: ninety percent accuracy on domain-specific intelligence versus thirty-five percent for generic AI. These aren't aspirational targets. They're measured outcomes from carriers running on the platform today.",
  },
  {
    slideId: "tech-slide-17",
    title: "Why Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three architectural differentiators. First: a connected foundation — not integrations, but one data model shared across three applications and one intelligence layer. Over fifty airlines worldwide trust this platform, including seven of the top ten North American carriers and over one million frontline users. Second: domain-trained intelligence — CoAnalyst isn't a generic AI with an aviation wrapper. It's been built from the ground up on aviation operational data, with a seven-figure R and D investment and continuous training on real operational reports since twenty twenty-three. Third: proof by design — every action, decision, and change is logged automatically. The evidence trail isn't a report you generate — it's a byproduct of how the system operates. Point solutions manage silos. Generic AI creates noise. We close the loop.",
  },
  {
    slideId: "tech-slide-18",
    title: "Partnership",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "We don't do big-bang implementations. We build partnerships. Phase one is a technical discovery — typically one to two days with your IT, safety, and training teams. We'll map your current data architecture, identify integration points, and design the deployment topology. Phase two is a ninety-day proof of value — deploying the platform against your highest-impact use case with full CoAnalyst activation. Measurable outcomes within the first quarter. Phase three is enterprise rollout — scaling across all modules and activating the complete Detect, Trigger, Orchestrate, Prove model. The average time to full operational deployment is six to nine months. Your architecture is unique. Let's design the right approach together.",
  },
];

export const getTechPitchNarration = (slideId: string): TechNarrationSlide | undefined => {
  return technicalPitchNarrations.find((s) => s.slideId === slideId);
};
