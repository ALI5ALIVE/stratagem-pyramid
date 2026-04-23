export interface TechNarrationSlide {
  slideId: string;
  title: string;
  script: string;
  voiceId: string;
}

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George

export const technicalPitchNarrations: TechNarrationSlide[] = [
  {
    slideId: "tech-divider-core",
    title: "Layer 1 · Core Operational Apps",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "We're now entering Layer 1 of the platform — the Core Operational Apps. ContentManager365, TrainingManager365 and SafetyManager365. These are the systems of record that emit every operational event the rest of the platform reasons over.",
  },
  {
    slideId: "tech-divider-data",
    title: "Layer 2 · Operational Data Foundation",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Layer 2 — the Operational Data Foundation. One unified data lake, one shared aviation taxonomy, an operational knowledge graph and domain-trained LLMs. This is the substrate every layer above depends on.",
  },
  {
    slideId: "tech-divider-intelligence",
    title: "Layer 3 · Intelligence & Orchestration",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Layer 3 — Intelligence and Orchestration. This is where data becomes action. Three capabilities: Insights and Intelligence, Recommendations and Prescriptive Actions, and Automation. Together they turn the data foundation into operational outcomes.",
  },
  {
    slideId: "tech-divider-mobile",
    title: "Layer 4 · Unified Mobile",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Layer 4 — the Unified Mobile Experience. One trusted shell for the frontline. Procedures, Training and Safety in a single app crews already use every shift.",
  },
  {
    slideId: "tech-divider-dtop",
    title: "Layer 5 · DTOP — System of Work",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Layer 5 — DTOP. Detect, Trigger, Orchestrate, Prove. The operating model that wraps every layer below it and turns intelligence into measurable, auditable outcomes.",
  },
  {
    slideId: "tech-divider-journey-maturity",
    title: "The Journey Ahead · Maturity Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Now to the journey ahead. The next slide shows the maturity roadmap — where customers are today, and how Comply365 moves them from fragmented and reactive to predictive and proactive, typically inside twelve to eighteen months.",
  },
  {
    slideId: "tech-divider-journey-2026",
    title: "The Journey Ahead · 2026 Use Case Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "And the journey continues with the 2026 use case roadmap — a phased delivery plan where each phase builds on proven value, layering capability without disrupting operations.",
  },
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
      "Safety Manager is your investigation and assurance engine — from initial report through corrective action and closure. It ingests FOQA, ASAP, LOSA, and audit data. Here's where Insights and Intelligence activates this. Instead of your analysts manually reviewing hundreds of reports, the platform processes them in real time. It identifies clusters — a series of hard landings at a specific airport — and cross-references with weather, crew rosters, and procedure versions. Weeks of manual correlation compressed to hours, at ninety percent accuracy on domain-specific patterns. Your safety team stops chasing data and starts acting on intelligence.",
  },
  {
    slideId: "tech-slide-4b",
    title: "Content Manager 365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Content Manager is the procedural backbone — authoring, distribution, version control, and electronic acknowledgment across all operational documents. Insights and Intelligence transforms regulatory change management. When a new airworthiness directive arrives, it maps against your procedure library, identifies every affected document, flags sections needing revision, and queues updates for the right subject matter expert. Then it tracks the cascade — every affected crew member receives the updated version and acknowledges it. Four to six weeks of manual effort compressed to days. For your documentation team, that's the difference between reactive firefighting and controlled change management.",
  },
  {
    slideId: "tech-slide-4c",
    title: "Training Manager 365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Training Manager handles the competency lifecycle — qualification, recurrent training, checking events, and revalidation across every crew member. The platform's activation here is powerful. Instead of generic recurrent cycles, it analyses individual operational data — FOQA trends, route exposure, safety report history — and recommends targeted interventions specific to each crew member's risk profile. When a hard landing cluster is detected at a specific airport, Insights and Intelligence identifies the forty-seven pilots who've flown that approach and assigns approach-specific simulator scenarios within forty-eight hours. Not generic training. Targeted, evidence-based crew development.",
  },
  {
    slideId: "tech-slide-data-foundation",
    title: "Operational Data Foundation",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is the architectural keystone — and the slide most platforms can't draw. ContentManager365, TrainingManager365 and SafetyManager365 each emit structured events into a single operational data foundation. Three capabilities make that foundation intelligent. First — a unified aviation taxonomy. Four thousand categories across five levels, aligned to ICAO and IATA, applied consistently in every product. Second — an operational knowledge graph. Procedures, training records, safety events, people and aircraft modelled as connected entities. A safety event traces to the procedure version, the affected crew and their training record in a single hop. Third — custom aviation LLM models. Domain-trained, not domain-prompted. Fine-tuned on millions of aviation reports since twenty twenty-three, with specialist models for classification, extraction and summarisation — ninety percent accuracy at level four to five, where generic AI sits at thirty-five. All of it customer-owned, tenant-isolated, with real-time event propagation and open APIs. Taxonomy gives shared language. The graph gives shared context. Custom LLMs give shared understanding. Without this foundation, intelligence has nothing to reason over. Every other layer in the platform depends on this one.",
  },
  {
    slideId: "tech-slide-coanalyst",
    title: "Insights & Intelligence",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Insights and Intelligence is the conversational intelligence layer of the Operational Performance Platform. Master message: from reports to intelligence, from events to control. It's a hybrid AI architecture — domain-trained ML models for the heavy lifting, an LLM augmentation layer for natural-language interaction, and continuous learning that keeps both improving. Domain models are trained on millions of aviation reports since twenty twenty-three, delivering ninety percent accuracy at four thousand categories — where generic AI collapses to thirty-five. The LLM layer handles plain-English questions, summarisation and sixty-plus languages, but it's guardrailed by the domain models so you don't get aviation-critical hallucination. And it's tenant-isolated — your data never crosses customer boundaries.",
  },
  {
    slideId: "tech-slide-insights",
    title: "Recommendations & Prescriptive Actions",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Insights and Intelligence answers questions. Recommendations and Prescriptive Actions go a step further — surfacing the questions you should be asking and the next move you should make. Three capabilities. Pattern detection: cross-domain correlation that links training gaps to safety events to procedural ambiguity. Recommended actions: every insight comes paired with a concrete next step and a traceable reasoning trail. Trend and foresight: continuous, exploratory analysis that turns reactive reporting into proactive risk identification. Worked example: a COO asks, are dangerous goods incidents linked to training gaps? Sixty seconds later: three hub stations correlate with overdue DG recurrent training. Targeted retraining for one hundred and eighty ground crew, expedite SOP republish, audit pack generated. Question to evidence-backed action plan in under a minute.",
  },
  {
    slideId: "tech-slide-automation",
    title: "Automation",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "If insights surface what to do, automation actually does it — reliably, repeatably, with an audit trail. One automation layer across the platform, not one per product. Triggers fire from native events, webhooks, schedules, or third-party tools like Outlook and Teams. The orchestration layer routes them through reusable, no-code workflows. Guardrails by design — versioned, observable, testable, with human-in-the-loop approval gates wherever you need them. Every execution is logged. Worked example: a procedure publishes in ContentManager365. The workflow auto-assigns training in TrainingManager365 to the affected roles, opens a SafetyManager365 compliance checkpoint, notifies the team in Teams. Zero manual handoffs. Zero custom code. Publish to train to assure runs as one connected flow.",
  },
  {
    slideId: "tech-slide-tiers-vs-ai",
    title: "Intelligence Tiers vs Generic AI",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Four intelligence tiers, each compounding on the last. Historical — query past data in plain English. Reactive — real-time alerts on threshold breach. Proactive — pattern detection before incidents. Predictive — probabilistic risk modelling. Most carriers start at tier one and reach tier three within twelve months. And here's why generic AI cannot get you there. At level one — fifty occurrence types — generic AI is roughly comparable. At level two and three, hundreds of categories, generic AI drops to sixty percent. At level four and five — the cause and root cause, thousands of categories — generic AI collapses to thirty to forty percent. Insights and Intelligence holds ninety. The real-world risk: generic AI calls a repeated bird strike a one-off — missing the cluster pattern that signals a runway hazard trend.",
  },
  {
    slideId: "tech-slide-mobile",
    title: "Unified Mobile",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three apps a shift becomes one app every shift. The Comply365 mobile app — already in daily frontline use through ContentManager365 — becomes the single shell for the platform. Procedures live there today. Training arrives in phase one, second quarter twenty twenty-six. Safety reporting in phase two, fourth quarter twenty twenty-six. Single sign-on across every mini-app. Unified notifications. One MDM footprint, one certification cycle, one approval through customer mobile estates — instead of three. The infrequent tools — training and safety — stop being unfamiliar detours and become tabs inside the app crews already trust.",
  },
  {
    slideId: "tech-slide-5",
    title: "DTOP Operating Model",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "DTOP is the operating model that wraps everything we've built. Detect — operational signals are ingested in real time across content, training, safety and external sources. Trigger — when criteria are met, the right workflow fires automatically, no emails, no manual handoffs. Orchestrate — safety investigation, procedure update and training assignment move in parallel, not in sequence. Prove — every action logged automatically, audit-ready by default. This is the mechanism that closes the loop. Intelligence without workflow is just dashboards. DTOP turns intelligence into operational outcomes your teams can measure — and prove.",
  },
  {
    slideId: "tech-slide-use-cases",
    title: "Use Cases",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three domains, same architecture. Safety: hard landing trends, crew injuries, regulatory exposure — each follows the same Detect, Trigger, Orchestrate, Prove loop with costed outcomes. Operations: AOG events, ground delays, fuel performance — connecting operational data with training and content to drive measurable cost avoidance. Financial: insurance premiums and revenue protection — the carriers building connected evidence trails are seeing material reductions in hull and liability premiums. Different signal, different domain — exactly the same DTOP pattern. Use the tabs to walk a customer through the cases most relevant to their pain point.",
  },
  {
    slideId: "tech-slide-13",
    title: "Line of Sight",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Every capability we've shown — current and future — connects to outcomes your board measures. That's the Line of Sight model. Three tiers. Tier three: operational events — go-arounds, delays, injuries, findings. The signals your teams manage daily. Tier two: leading measures — investigation closure rates, training response times, compliance gaps. The levers you control. Tier one: lagging outcomes — schedule reliability, CASM, regulatory standing, insurance costs. The numbers your board measures. When your CFO asks why premiums changed, you trace it through compliance closure rates to specific regulatory responses. Every signal measured. Every outcome traceable.",
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
      "Beyond the use cases we've covered, three capabilities are in active development. Predictive maintenance correlation — connecting safety intelligence with maintenance planning to predict component failures before disruption. Cross-carrier benchmarking — anonymised intelligence sharing across customers, enabling performance benchmarking against industry peers. Regulatory submission automation — generating audit-ready evidence packages automatically on regulator request. Each extends the intelligence layer while maintaining the connected architecture. The platform gets smarter with every carrier, every signal, every closed loop.",
  },
  {
    slideId: "tech-slide-why-comply",
    title: "Outcomes & Why Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Measured outcomes from carriers running on the platform today. Seventy-eight percent reduction in repeat events. Signal-to-coordinated-response compressed from six weeks to forty-eight hours. Directive to crew acknowledgement in five days. Ninety percent domain accuracy where generic AI sits at thirty-five. Three things make those outcomes possible. Connected foundation — one data model, three core apps, one intelligence layer. Domain-trained intelligence — Insights and Intelligence built on aviation data since twenty twenty-three, not a generic AI with an aviation wrapper. Proof by design — every action logged automatically, the audit trail is a byproduct, not a report. Point solutions manage silos. Generic AI creates noise. We close the loop.",
  },
  {
    slideId: "tech-slide-18",
    title: "Partnership",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three phases. Technical discovery — one to two days mapping your data architecture and integration points. Ninety-day proof of value — deploying against your highest-impact use case with full platform activation. Measurable outcomes in the first quarter. Then enterprise rollout — full DTOP activation across all modules. Average time to full deployment: six to nine months. Your architecture is unique. Let's design the right approach together.",
  },
];

export const getTechPitchNarration = (slideId: string): TechNarrationSlide | undefined => {
  return technicalPitchNarrations.find((s) => s.slideId === slideId);
};
