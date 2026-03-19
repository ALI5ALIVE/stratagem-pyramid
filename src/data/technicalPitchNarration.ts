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
      "In the next twelve minutes, I'll take you inside the platform architecture — how three applications, one intelligence layer, and a connected data model turn fragmented operational signals into measurable outcomes. This is the engineering story. Let's go.",
  },
  {
    slideId: "tech-slide-1",
    title: "Strategic Shift",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "The industry is shifting from prescriptive compliance to performance-based oversight. Regulators don't just want completed checklists — they want evidence. When a signal was detected, what action was taken, and did the outcome improve? ICAO Annex nineteen, EASA management system requirements, the FAA SMS mandate — all driving the same direction. For your teams, this changes everything. It's no longer enough to close the investigation. You need to prove the loop — from detection through intervention to measured improvement. The carriers building that infrastructure now will set the standard.",
  },
  {
    slideId: "tech-slide-2",
    title: "Industry Challenge",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Here's the problem you're managing. Five to fifteen disconnected systems across safety, training, and content. Safety data in one database, training records in another, procedures in a third. Each system was built to solve one problem — none were designed to connect. The result: a safety signal detected in system A takes six weeks to produce a training response in system B — if it happens at all. When an auditor asks for the evidence thread, your team spends days reconstructing it across spreadsheets and email. That's not a process problem. It's an architecture problem.",
  },
  {
    slideId: "tech-slide-3",
    title: "Before & After",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let me make the contrast tangible. Today: a FOQA exceedance is detected. Safety logs it, emails training. Training opens a spreadsheet. Content receives a request weeks later. Evidence scattered across four systems. In the connected model: the same exceedance is detected. The platform identifies affected crew, assigns targeted training, verifies procedure versions, and logs every step — within forty-eight hours. Same data sources. Same teams. The difference isn't the people or the systems. It's the wiring between them. That's what we fix.",
  },
  {
    slideId: "tech-slide-4",
    title: "The Platform",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three core applications sharing a single data model. Safety Manager handles hazard identification, risk assessment, investigation, and safety assurance — ingesting FOQA, ASAP, voluntary reports, and audit data. Content Manager manages the full document lifecycle — authoring, version control, distribution, and acknowledgment for over ten thousand procedures per carrier. Training Manager provides competency management, curriculum assignment, and qualification tracking across all personnel. These aren't integrations bolted together. They're one platform, one shared data layer. Over sixty-five thousand data points flow through this ecosystem every month. That connected foundation is what makes everything else possible.",
  },
  {
    slideId: "tech-slide-4a",
    title: "Safety Manager 365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Safety Manager is your investigation and assurance engine — from initial report through corrective action and closure. It ingests FOQA, ASAP, LOSA, and audit data. Here's where CoAnalyst activates this. Instead of your analysts manually reviewing hundreds of reports, CoAnalyst processes them in real time. It identifies clusters — a series of hard landings at a specific airport — and cross-references with weather, crew rosters, and procedure versions. Weeks of manual correlation compressed to hours, at ninety percent accuracy on domain-specific patterns. Your safety team stops chasing data and starts acting on intelligence.",
  },
  {
    slideId: "tech-slide-4b",
    title: "Content Manager 365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Content Manager is the procedural backbone — authoring, distribution, version control, and electronic acknowledgment across all operational documents. CoAnalyst transforms regulatory change management. When a new airworthiness directive arrives, it maps against your procedure library, identifies every affected document, flags sections needing revision, and queues updates for the right subject matter expert. Then it tracks the cascade — every affected crew member receives the updated version and acknowledges it. Four to six weeks of manual effort compressed to days. For your documentation team, that's the difference between reactive firefighting and controlled change management.",
  },
  {
    slideId: "tech-slide-4c",
    title: "Training Manager 365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Training Manager handles the competency lifecycle — qualification, recurrent training, checking events, and revalidation across every crew member. CoAnalyst's activation here is powerful. Instead of generic recurrent cycles, it analyses individual operational data — FOQA trends, route exposure, safety report history — and recommends targeted interventions specific to each crew member's risk profile. When a hard landing cluster is detected at a specific airport, CoAnalyst identifies the forty-seven pilots who've flown that approach and assigns approach-specific simulator scenarios within forty-eight hours. Not generic training. Targeted, evidence-based crew development.",
  },
  {
    slideId: "tech-slide-7",
    title: "CoAnalyst Intelligence",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "CoAnalyst is a hybrid AI architecture — not one model doing everything. Specialised language models trained on aviation data. Retrieval-augmented generation for real-time context. Structured reasoning for compliance logic. Pattern detection for trend identification. Trained on millions of historical aviation reports since twenty twenty-three, continuously fine-tuned on real operational data. The result: a system that distinguishes a bird strike report from a bird strike trend, a procedure change from a procedure gap, a training completion from a competency validation. That domain specificity delivers ninety percent accuracy where generic AI plateaus at thirty-five.",
  },
  {
    slideId: "tech-slide-8",
    title: "Intelligence Tiers",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Four intelligence tiers, each building on the last. Historical — querying past data. How many hard landings at this airport over twelve months? Reactive — real-time monitoring. A fatigue report cluster just crossed threshold at this base. Proactive — pattern detection. Seasonal weather data suggests elevated risk on this route for the next sixty days. Predictive — forward-looking models. Seventy-three percent probability of a regulatory finding in this area within ninety days. Each tier compounds as the system ingests more of your operational data. Most carriers start at tier one and reach tier three within twelve months.",
  },
  {
    slideId: "tech-slide-5",
    title: "DTOP Architecture",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Now connecting intelligence to workflow. Detect, Trigger, Orchestrate, Prove. Detect — the signal engine ingests FOQA, ASAP, audit, and ops data. Sixty-five thousand signals monthly. Trigger — when criteria are met, the right workflow fires automatically. No emails, no manual handoffs. Orchestrate — safety investigation, content update, and training assignment move in parallel, not sequence. Prove — every action logged automatically, audit-ready by default. This is the mechanism that closes the loop. Intelligence without workflow is just dashboards. DTOP turns intelligence into operational outcomes your teams can measure.",
  },
  {
    slideId: "tech-slide-10",
    title: "Safety Use Cases",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three safety use cases. Hard landing trend response: FOQA detects a cluster at a specific airport. CoAnalyst identifies contributing factors, cross-references crew rosters. Affected crew receive targeted simulator training within forty-eight hours. Result: seventy-eight percent reduction in repeat events within ninety days. Smoke and fumes investigation: cabin air quality report clusters trigger pattern detection across aircraft type, route, and maintenance history — automatically flagging maintenance with correlated analysis. Turbulence injury prevention: cross-referencing encounter data with cabin crew injuries to identify high-risk routes and altitudes. Each case follows the same DTOP loop. Different signal, same architecture.",
  },
  {
    slideId: "tech-slide-11",
    title: "Ops Use Cases",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three operational use cases. Regulatory change cascade: new airworthiness directive arrives, CoAnalyst maps it against procedures and crew qualifications, orchestrates the update from revision through acknowledgment and retraining. Six weeks compressed to five days. Fatigue risk management: integrating roster data, duty period calculations, and voluntary fatigue reports into a real-time risk picture. CoAnalyst flags crew members where cumulative fatigue exceeds threshold — before the next assignment, not after the next incident. Ground handling incident reduction: correlating ramp reports with equipment, time of day, seasonal patterns, and handler training records for targeted interventions.",
  },
  {
    slideId: "tech-slide-12",
    title: "Financial Use Cases",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Two cases that hit the P and L directly. Fuel variance: one percent across a mid-size fleet equals five to twenty million annually. CoAnalyst identifies specific routes, aircraft, and crew contributing to excess burn — correlating FOQA with flight planning, weather, and training records. Targeted interventions deliver measurable savings within ninety days. Insurance premiums: carriers demonstrating connected safety intelligence — live evidence trails, not binders — are seeing material reductions. One carrier achieved fifteen percent reduction in hull and liability premiums. These aren't operational metrics. They're financial outcomes your CFO measures.",
  },
  {
    slideId: "tech-slide-13",
    title: "Line of Sight",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Every use case connects to executive outcomes through the Line of Sight model. Three tiers. Tier three: operational events — go-arounds, delays, injuries, findings. The signals your teams manage daily. Tier two: leading measures — investigation closure rates, training response times, compliance gaps. The levers you control. Tier one: lagging outcomes — schedule reliability, CASM, regulatory standing, insurance costs. The numbers your board measures. When your CFO asks why premiums changed, you trace it through compliance closure rates to specific regulatory responses. Every signal measured. Every outcome traceable.",
  },
  {
    slideId: "tech-slide-14",
    title: "Maturity Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Five stages of operational maturity. Fragmented — disconnected systems, reactive responses. This is where most airlines sit. Connected — data flows, but workflows remain manual. Automated — trigger-based workflows cut response times from weeks to days. Proactive — pattern detection identifies risks before events occur. Predictive — forward-looking models orchestrate preemptive responses. The traditional path takes five to seven years. With this platform, carriers reach stage four in twelve to eighteen months. Each stage builds on the data and workflows from the previous — the value compounds.",
  },
  {
    slideId: "tech-slide-15",
    title: "2026 Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three capabilities in active development. Predictive maintenance correlation — connecting safety intelligence with maintenance planning to predict component failures before disruption. Cross-carrier benchmarking — anonymised intelligence sharing across fifty-plus airline customers, enabling performance benchmarking against industry peers. Regulatory submission automation — generating audit-ready evidence packages automatically on regulator request. Each extends the intelligence layer while maintaining the connected architecture. The platform gets smarter with every carrier, every signal, every closed loop.",
  },
  {
    slideId: "tech-slide-16",
    title: "Outcomes",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Measurable outcomes across everything we've discussed. Safety: seventy-eight percent reduction in repeat events. Speed: six weeks compressed to forty-eight hours. Compliance: directive to crew acknowledgment in five days. Financial: cost avoidance exceeding forty million annually for a mid-size carrier. Precision: ninety percent domain accuracy versus thirty-five for generic AI. These aren't projections. They're measured outcomes from carriers running on the platform today. The evidence model we just described — that's how we prove it.",
  },
  {
    slideId: "tech-slide-17",
    title: "Why Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three differentiators. Connected foundation — one data model, three applications, one intelligence layer. Fifty-plus airlines, seven of the top ten North American carriers, over one million frontline users. Domain-trained intelligence — CoAnalyst built from the ground up on aviation data, continuously trained since twenty twenty-three. Not a generic AI with an aviation wrapper. Proof by design — every action logged automatically. The evidence trail is a byproduct, not a report. Point solutions manage silos. Generic AI creates noise. We close the loop.",
  },
  {
    slideId: "tech-slide-18",
    title: "Partnership",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three phases. Technical discovery — one to two days mapping your data architecture and integration points. Ninety-day proof of value — deploying against your highest-impact use case with full CoAnalyst activation. Measurable outcomes in the first quarter. Then enterprise rollout — full DTOP activation across all modules. Average time to full deployment: six to nine months. Your architecture is unique. Let's design the right approach together.",
  },
];

export const getTechPitchNarration = (slideId: string): TechNarrationSlide | undefined => {
  return technicalPitchNarrations.find((s) => s.slideId === slideId);
};
