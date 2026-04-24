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
      "Three core applications sharing a single data model. Safety Manager three six five handles hazard identification, risk assessment, investigation, and safety assurance — ingesting flight operational data, crew safety reports, voluntary reports, and audit data. Content Manager three six five manages the full document lifecycle — authoring, version control, distribution, and acknowledgment for over ten thousand procedures per carrier. Training Manager three six five provides competency management, curriculum assignment, and qualification tracking across all personnel. These aren't integrations bolted together. They're one platform, one shared data layer. Over sixty-five thousand data points flow through this ecosystem every month. That connected foundation is what makes everything else possible.",
  },
  {
    slideId: "tech-slide-4a",
    title: "Safety Manager 365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Safety Manager three six five is your investigation and assurance engine — from initial report through corrective action and closure. It ingests flight operational data, crew safety reports, line operations safety audits, and audit data. Here's where Insights and Intelligence activates this. Instead of your analysts manually reviewing hundreds of reports, the platform processes them in real time. It identifies clusters — a series of hard landings at a specific airport — and cross-references with weather, crew rosters, and procedure versions. Weeks of manual correlation compressed to hours, at around ninety percent accuracy on domain-specific patterns — versus around thirty-five percent for generic AI. Your safety team stops chasing data and starts acting on intelligence.",
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
      "Training Manager three six five handles the competency lifecycle — qualification, recurrent training, checking events, and revalidation across every crew member. The platform's activation here is powerful. Instead of generic recurrent cycles, it analyses individual operational data — flight operational data trends, route exposure, safety report history — and recommends targeted interventions specific to each crew member's risk profile. When a hard landing cluster is detected at a specific airport, Insights and Intelligence identifies the forty-seven pilots who've flown that approach and assigns approach-specific simulator scenarios within forty-eight hours. Not generic training. Targeted, evidence-based crew development.",
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
      "Here's the phased delivery plan — each phase builds on proven value, layering capability without disrupting operations. First half of twenty twenty-six — in production and quick wins. Training Modules now linked to Documents, Regulation Database replatforming proof of concept complete, Automation proof of concept complete, and Platform-wide Insights and Recommendations proof of concept complete — all on the Operational Data Foundation and the Intelligence and Orchestration Layer. In progress for H1 — Regulation Database integration with ContentManager365, and surfacing Training screens inside the Comply iOS Mobile app. Second half of twenty twenty-six — connected operations. Standardising UI fonts and colours across the unified experience, completing the Regulation Database replatforming, surfacing Safety Reporting in the Comply iOS Mobile app, and kicking off Platform-wide Automation and Business Intelligence proofs of concept. Twenty twenty-seven and beyond — intelligent operations. Next phase Regulation Management integration — sync compliance mappings, TrainingManager365 integration, automation triggers. Roll out of Platform-wide Automation and Platform-wide Business Intelligence. Full unification of the mobile experience. Contextual document viewing from TrainingManager365. And roll out of Platform-wide Insights and Recommendations. The proof point: every milestone is anchored to a layer of the platform — foundation, intelligence, mobile — so the architecture compounds with every release.",
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
  // ----- Additional v4 deck IDs (sales-coach speaker notes) -----
  {
    slideId: "tech-slide-opener",
    title: "Hero — Operational Performance Platform",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is your cover. Set tone — calm, technical, evidence-led. The line you want to land in thirty seconds: this is the Operational Performance Platform — one connected system for content, training and safety, with the intelligence layer to turn signals into proven outcomes. Then move to the strategic shift slide.",
  },
  {
    slideId: "tech-slide-why-exists",
    title: "Why It Exists",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Anchor the why. Aviation runs on three operational disciplines — content, training and safety — and today they run as three disconnected silos. Data without intelligence. Insight without action. No proof of effect. The proof point to land: nobody owns the loop between detecting a problem and proving it was fixed. That's the gap this platform exists to close. Bridge: here's the platform in one screen.",
  },
  {
    slideId: "tech-slide-3b-platform-snapshot",
    title: "Platform Snapshot",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Use this slide to plant a mental map before the architecture deep-dive. One platform, four bands. Foundation — three core apps on one operational data foundation. Intelligence and orchestration — CoAnalyst, Insights, Automation. Mobile — one trusted shell. Operating model — DTOP. The proof point: one platform, one operating model, one mobile entry point. Bridge: now let me walk each layer in turn.",
  },
  {
    slideId: "tech-slide-4",
    title: "Platform Overview",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is the platform overview. Bottom-up. Foundation — ContentManager365, TrainingManager365, SafetyManager365 sharing one operational data foundation. Above — intelligence and orchestration. Above that — one trusted unified mobile shell. Wrapping the whole stack — DTOP. The proof point: this isn't integrations bolted together — it's one platform, one shared data layer. Bridge: let's start at the foundation. Next divider — Core Apps.",
  },
  {
    slideId: "tech-slide-use-cases",
    title: "Use Cases",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three domains, same architecture. Safety — hard landing trends, crew injuries, regulatory exposure. Operations — AOG events, ground delays, fuel performance. Financial — insurance premiums, revenue protection. Each follows the same Detect, Trigger, Orchestrate, Prove pattern with costed outcomes. The proof point: different signal, different domain, exactly the same pattern. Use the tabs to walk through the cases most relevant to your customer's pain.",
  },
  {
    slideId: "tech-slide-6",
    title: "Platform Integrations",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is your integration credibility slide. The platform connects natively to the systems airlines already run — identity providers, Outlook, Teams, customer data sources, regulatory feeds and existing operational tooling. Native connectors, not bespoke integrations. The proof point: integrations land in days using configuration, not months of custom development. Bridge: let me show you the use case that earns the deck on its own — Regulation Management.",
  },
  {
    slideId: "tech-slide-regulation",
    title: "Regulation Management",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Regulation Management is the use case airlines almost always under-estimate. Today they manage well over a thousand regulations from EASA, FAA, ICAO and national authorities — in spreadsheets and tribal knowledge. With Regulation Management, every change is structured, tagged and ingested in near real time, then cascaded automatically into the procedures, training and risk assessments it touches. The proof point: from quarterly discovery to continuous visibility, with audit-ready evidence for every change. Bridge: now let me put numbers behind all of this — the Line of Sight calculator.",
  },
  {
    slideId: "tech-slide-calculator",
    title: "Line of Sight Calculator",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Use this calculator live, with their numbers if you can get them. The Line of Sight model connects tier-three operational events — go-arounds, AOG days, delays, mishandled bags, regulatory findings — through tier-two leading measures to tier-one executive lagging metrics. Each use case is sourced from EUROCONTROL, IATA, A4A, SITA, WTW and Flight Safety Foundation. The proof point: every dollar of cost avoidance is traceable back to the operational event and platform mechanism that prevented it. Bridge: so what does the journey ahead look like? Next divider.",
  },
  {
    slideId: "tech-slide-why-comply",
    title: "Why Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three things set us apart. First — connected foundation. Not point solutions stitched together. One data model, three core apps, one intelligence layer. Five hundred and fifty plus airlines worldwide, around two and a half million users, six continents. Second — embedded intelligence. CoAnalyst built from the ground up on aviation data since twenty twenty-three — around ninety percent accuracy where generic AI plateaus at thirty-five. Third — proof by default. Every action logged automatically, every change traced, every decision auditable. The proof point: you don't prepare for regulators — you're always ready. Bridge: there's one final slide on why only Comply365 can deliver this end-to-end.",
  },
  {
    slideId: "tech-slide-why-only-comply365",
    title: "Why Only Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is your moat slide. No combination of point solutions delivers Detect, Trigger, Orchestrate, Prove because they don't share a common data model. Generic AI tools can summarise reports — they can't reason across operational domains because they don't sit on a connected data foundation. Bespoke per-product automation can't share workflows or governance. The proof point to land: only Comply365 owns all three core disciplines, the data foundation, the intelligence layer and the daily-use mobile shell — under one operating model. Bridge: so what's the next step? Final slide.",
  },
  {
    slideId: "tech-slide-cta",
    title: "CTA — Find Out More",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Close with the path, not the pitch. Three concrete next steps. One — half-day technical discovery to map their data architecture and integration points. Two — a ninety-day proof of value against their highest-impact use case with full platform activation, measurable outcomes in the first quarter. Three — enterprise rollout, full DTOP activation across all modules within six to nine months. Then ask for the discovery workshop. That's the deck.",
  },
];

export const getTechPitchNarration = (slideId: string): TechNarrationSlide | undefined => {
  return technicalPitchNarrations.find((s) => s.slideId === slideId);
};
