export interface OpsNarrationSlide {
  slideId: string;
  title: string;
  script: string;
  voiceId: string;
}

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George

export const operationalPitchNarrations: OpsNarrationSlide[] = [
  {
    slideId: "ops-slide-0",
    title: "Title",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Every signal your operation generates today — every safety report, every training completion, every compliance flag — is an opportunity. An opportunity to act before the next event, not after. To prove performance, not just promise it. Over the next fifteen minutes, I want to show you what it looks like when safety, operations, and training move as one connected system. From signals to outcomes. Let's begin.",
  },
  {
    slideId: "ops-slide-1",
    title: "Your Daily Reality",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Picture your Monday morning. You open your inbox. There's a flight operational data alert about a hard landing trend at one of your hubs. A safety report flagging repeat turbulence injuries on a specific route. A compliance notice about an expiring training qualification for forty-seven crew members. And a maintenance team asking why they weren't told about a procedure change from three weeks ago. Every one of these is urgent. None of them are connected. Your safety team is working in one system. Training in another. Compliance in a third. And the information that could prevent next week's event is trapped in last month's email thread. This isn't a people problem. Your teams are excellent. It's a wiring problem.",
  },
  {
    slideId: "ops-slide-2",
    title: "Cost of Fragmentation",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let me put a number on that wiring problem. Every disconnected handoff has a cost. When a safety signal takes six weeks to reach a training response, the same crew flies the same approach and the trend continues. Each go-around costs eight to twenty-five thousand dollars in fuel alone. An aircraft-on-ground day costs up to half a million dollars. A single regulatory finding can cost between fifty thousand and two million. Add it up across a mid-size fleet, and the annual cost of fragmentation — not failure, just fragmentation — exceeds one hundred and ten million dollars. These aren't hypothetical numbers. They're the compounding cost of systems that were never designed to talk to each other.",
  },
  {
    slideId: "ops-slide-3",
    title: "Before & After",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let me show you the contrast. Today, an operational data signal is detected. Safety logs it. An email goes to training. Training opens a spreadsheet. Content gets a request three weeks later. And when audit asks for the thread, someone spends days reconstructing it. Six weeks from signal to action, if the loop closes at all. Now imagine the alternative. The same signal is detected, and within hours the affected crew are identified, targeted training is assigned, the relevant procedure is verified, and every step is logged automatically. Not because someone chased it — because the system is wired to close the loop. Same teams. Same data. Completely different outcome.",
  },
  {
    slideId: "ops-slide-4",
    title: "DTOP + Platform",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "We call this operating model Detect, Trigger, Orchestrate, Prove. Detect means your operation is always listening — flight operational data, crew safety reports, audit findings, ops data — all feeding one signal engine. Trigger means the right workflow starts automatically. Orchestrate means training, content, and compliance move together, not in sequence. And Prove means every action is logged as it happens. This model is powered by three applications working as one platform. Safety Manager three six five for detection and investigation. Content Manager three six five for procedure management and distribution. Training Manager three six five for qualification and competency tracking. And connecting all three is CoAnalyst — the intelligence layer. It's what transforms sixty-five thousand monthly data points into actionable insight. Let me show you how.",
  },
  {
    slideId: "ops-slide-5",
    title: "Intelligence Engine",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Sitting above those three modules is CoAnalyst — the intelligence layer. It's not a chatbot. It's not a dashboard. It's the engine that transforms your raw operational data into four levels of intelligence. Historical: what happened and why. Reactive: what's happening right now that needs attention. Proactive: what patterns should we be watching before they become events. And predictive: what's likely to happen next based on everything we've seen before. CoAnalyst has been trained on millions of aviation operational reports since twenty twenty-three. It delivers over ninety percent accuracy on domain-specific queries — compared to roughly thirty-five percent from generic AI tools. That precision gap is the difference between intelligence you can trust and noise that wastes your time.",
  },
  {
    slideId: "ops-slide-6",
    title: "Near-Term Use Cases",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let me make this tangible with four use cases you could deploy in the first ninety days. First: hard landing response. Flight operational data detects a trend, CoAnalyst identifies the affected crew, and targeted simulator training deploys within forty-eight hours. Second: regulatory change cascade. A new directive arrives, and every affected procedure, training record, and crew qualification is updated automatically. Third: fatigue risk management. Cross-referencing roster data with safety reports to flag fatigue-related patterns before they become incidents. Fourth: compliance gap closure. Identifying expiring qualifications and triggering retraining before the gap creates exposure. Each of these delivers measurable value within ninety days. Pick one. Prove the model. Then scale.",
  },
  {
    slideId: "ops-slide-7",
    title: "Stepping Stones",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "You don't transform operations overnight. You build momentum through stepping stones. Phase one: connect. Get safety, content, and training data flowing into one platform. Eliminate the manual handoffs. This alone typically reduces investigation time from weeks to days. Phase two: automate. Enable the trigger layer — let the system start workflows when signals appear, not when someone remembers to send an email. Phase three: predict. Activate CoAnalyst's proactive and predictive tiers to identify patterns before they become events. Each phase delivers standalone value. Each builds on the last. And the total time from Phase one to Phase three? Twelve to eighteen months, not the five to seven years that traditional transformation programs take.",
  },
  {
    slideId: "ops-slide-8",
    title: "Maturity Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let me show you where this journey leads. Most airlines we talk to sit at Stage one or two on this maturity curve — fragmented systems, reactive responses, manual evidence collection. That's the industry norm, not a criticism. But the performance gap between Stage two and Stage four isn't incremental. It's transformational. At Stage three, your operation moves from reactive to connected — signals flow automatically and teams work from one version of truth. At Stage four, you're proactive — patterns are identified before events occur, and training deploys preemptively. At Stage five, you're predictive — the system anticipates risks and orchestrates responses before anyone picks up the phone. The carriers reaching Stage five first are setting the standard that everyone else will be measured against.",
  },
  {
    slideId: "ops-slide-9",
    title: "Outcomes",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let me translate this into outcomes your leadership team measures. Schedule protection: when hard landing trends are caught early, you protect departures and reduce delay minutes. Revenue protection: when fatigue risks are flagged proactively, you avoid the cancellations that cost two hundred thousand dollars each. Cost reduction: when content updates are automated, you eliminate the rework cycles that consume your technical publications team. And customer trust: when compliance gaps close immediately, you maintain the operational reliability that passengers and partners depend on. Every signal, acted on. Every outcome, measured. Every decision, auditable. So why are we the right partner to deliver this?",
  },
  {
    slideId: "ops-slide-10",
    title: "Why Comply365",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Three things set Comply three six five apart. First, a connected foundation. We're not stitching point solutions together. Over fifty airlines worldwide run their operations on our platform — including seven of the top ten North American carriers. Over one million frontline users trust this system every day. Second, embedded intelligence. CoAnalyst isn't a bolt-on. It's been built from the ground up on aviation data, delivering the precision that generic AI simply cannot match. Third, proof by default. Every action is logged, every change is traced, every decision is auditable. You don't prepare for regulators. You're always ready.",
  },
  {
    slideId: "ops-slide-11",
    title: "Getting Started",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Here's how we start. A discovery workshop — typically half a day with your safety, training, and operations leads. We'll map your current signal flow, identify the highest-impact use case, and build a custom cost avoidance model using your fleet size and route network. From there, a ninety-day pilot focused on one specific use case — proving measurable value before you scale. No eighteen-month implementation. No big-bang transformation. Just proof, then progress. Your operation generates signals every day. Let's make them predictable. Detect. Trigger. Orchestrate. Prove.",
  },
];

export const getOpsPitchNarration = (slideId: string): OpsNarrationSlide | undefined => {
  return operationalPitchNarrations.find((s) => s.slideId === slideId);
};
