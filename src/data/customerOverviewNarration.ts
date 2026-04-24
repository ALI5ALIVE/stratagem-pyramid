// Customer Overview deck — sales-coach speaker notes / TTS scripts.
// Format per slide: PURPOSE → TALK TRACK → PROOF POINT → TRANSITION.
// Read on-screen from the Speaker Notes panel; played as audio via the narration bar.

export interface COSlideNarration {
  slideId: string;
  title: string;
  script: string;
  voiceId: string;
}

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George

export const customerOverviewNarrations: COSlideNarration[] = [
  {
    slideId: "co-slide-0",
    title: "Title",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is the cover. Use it to set tone — calm, confident, customer-led. The line you want to land is simple: in the next fifteen minutes I'll show you how leading carriers turn the operational signals they already have into measurable, predictable performance — without ripping anything out. No architecture diagrams up front. No acronyms. Just your reality, our model, and what the first ninety days look like. Then move to the reality slide.",
  },
  {
    slideId: "co-slide-1",
    title: "The Reality Today",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This slide anchors the conversation in their reality. Walk them through it in the second person — your safety reports, your training records, your procedures. Five to seven separate systems on average. Twelve thousand operational signals a month. Eight thousand of them orphaned — captured but never connected to a procedural or training response. Three weeks of manual evidence gathering for every investigation. The proof point to land: this isn't a people problem, it's a wiring problem. Then bridge: so the question is, what would it look like if those signals actually closed the loop? That's the next slide.",
  },
  {
    slideId: "co-slide-2",
    title: "The Strategic Shift",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Here you frame why this conversation is happening now. Regulators across EASA and the FAA have shifted from prescriptive compliance to performance-based oversight. They no longer just want completed checklists — they want proof that when a signal was detected, the right action followed and the outcome improved. The proof point: the carriers building that loop now will set the standard everyone else gets measured against. Land it as a strategic choice, not a tooling choice. Then bridge: so what does the system that makes that loop possible actually look like? That's the next slide.",
  },
  {
    slideId: "co-slide-3",
    title: "The Platform",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is your one-screen explanation of the Operational Performance Platform. Walk it bottom-up. The foundation is three core apps already in daily use — ContentManager365, TrainingManager365 and SafetyManager365 — sharing one operational data foundation. Above that, the intelligence and orchestration layer — Insights and Recommendations, CoAnalyst, and Automation — turning data into action. Above that, one trusted unified mobile app for the frontline. And wrapping the whole stack: DTOP — Detect, Trigger, Orchestrate, Prove. The proof point: one platform, one operating model, one mobile entry point. Bridge: let me show you what the before-and-after of working this way actually feels like.",
  },
  {
    slideId: "co-slide-4",
    title: "Before vs After",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This is the emotional moment of the deck. Walk the before column first — slowly. A signal is detected. Safety logs it. An email goes to training. Training opens a spreadsheet. Content gets a request three weeks later. Audit asks for the thread, someone spends days reconstructing it. Six weeks from signal to action — if the loop ever closes. Then the after column. Same signal, same teams, same data. Within hours: affected crew identified, targeted training assigned, procedure revised, every step logged. The proof point: same teams, same data, completely different outcome. It's a wiring change, not a people change. Bridge: that's the operating model — let me show you the value it unlocks.",
  },
  {
    slideId: "co-slide-5",
    title: "The Value You Unlock",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Five value pillars — don't read them all. Pick the two most relevant to the buyer in the room. For a COO: schedule protection and continuous compliance. For a CFO: cost avoidance and reduced insurance exposure. For a Head of Safety: risk reduction and proof of effect. The proof point: every shift moves the operation from reactive cost-centre to a measurable performance engine. Bridge: these aren't slogans — let me show you them firing in a real use case.",
  },
  {
    slideId: "co-slide-6",
    title: "Use Cases in Action",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Pick one use case live, based on what they cared most about on the previous slide. Hard landing trend is the safest default — every airline has them and the cost is concrete. Walk Detect, Trigger, Orchestrate, Prove for that case. A trend is detected in the operational data. The platform identifies the affected crew. Targeted simulator training is assigned within forty-eight hours. The repeat rate drops. The proof point: seventy-eight percent reduction in repeat events from a single closed loop. Bridge: and there's a use case airlines almost always under-estimate — regulatory change. Next slide.",
  },
  {
    slideId: "co-slide-regmgmt",
    title: "Use Case — Regulation Management",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Regulation Management is the use case that earns the deck on its own. Today airlines manage well over a thousand regulations from EASA, FAA, ICAO and national authorities — in spreadsheets and tribal knowledge. With Regulation Management, every change is structured, tagged and ingested in near real time, then cascaded automatically into the procedures, training and risk assessments it touches. The proof point: from quarterly discovery to continuous visibility, with audit-ready evidence for every change. Bridge: those are the patterns — what's the actual outcome our customers see? Next slide.",
  },
  {
    slideId: "co-slide-7",
    title: "Customer Outcomes",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This slide is your credibility proof. Don't claim each number applies to them — frame as the spread observed across deployments. Schedule protection — fewer maintenance delays, protected departures. Revenue protection — fewer cancellations from preventable incidents. Cost reduction — eliminated rework cycles in technical publications. Customer trust — operational reliability passengers and partners depend on. The proof point to land: every signal acted on, every outcome measured, every decision auditable. Bridge: so where do you start, and how fast can this become real? Next two slides answer that.",
  },
  {
    slideId: "co-slide-8",
    title: "Your Maturity Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Most airlines sit at stage one or two on this curve — fragmented systems, reactive responses, manual evidence. That's the industry norm, not a criticism. The performance gap from stage two to stage four isn't incremental, it's transformational. Stage three — connected. Stage four — proactive. Stage five — predictive. The proof point: traditional transformation programmes take five to seven years. With this platform, customers reach stage four in twelve to eighteen months. Bridge: so what does the very first ninety days look like? Final slide.",
  },
  {
    slideId: "co-slide-9",
    title: "Your First 90 Days",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Close with the path, not the pitch. Three concrete steps. One — half-day discovery workshop with safety, training and operations leads to map their current signal flow. Two — pick the highest-impact use case and build a custom cost-avoidance model with their fleet numbers. Three — a ninety-day pilot proving measurable value before scaling. The proof point to land: no eighteen-month implementation, no big-bang transformation — just proof, then progress. Then ask for the next meeting. That's the deck.",
  },
];

export const getCustomerOverviewNarration = (
  slideId: string,
): COSlideNarration | undefined =>
  customerOverviewNarrations.find((s) => s.slideId === slideId);
