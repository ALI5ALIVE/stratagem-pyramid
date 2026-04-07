export interface ExecNarration2Slide {
  slideId: string;
  title: string;
  script: string;
  voiceId: string;
}

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

export const executivePitch2Narrations: ExecNarration2Slide[] = [
  {
    slideId: "exec2-slide-0",
    title: "Title",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "What if every signal your operation generates actually reached the right person, at the right time, before the next event? Today, most don't. In the next four minutes, I'm going to show you exactly how leading carriers are closing that gap — and what it means for your bottom line.",
  },
  {
    slideId: "exec2-slide-1",
    title: "Before",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Here's the reality most airlines live with today. Safety data sits in one system. Procedures live in another. Training operates in a third. None of them talk to each other. Your safety team spots a trend on Monday — but the training team won't hear about it until someone sends an email, writes a report, or raises it in a meeting two weeks later. Meanwhile, the same event keeps happening. Go-arounds that could have been prevented. Aircraft grounded because a compliance gap wasn't flagged in time. The cost of this disconnection isn't theoretical — it's hiding in every repeated incident, every audit scramble, every hour your best people spend chasing information instead of acting on it.",
  },
  {
    slideId: "exec2-slide-2",
    title: "After",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Now picture this instead. The same three domains — safety, content, and training — but now they share one data model, one version of truth. A hard landing trend detected on Tuesday automatically triggers a procedure review on Wednesday and targeted crew retraining by Thursday. The repeat rate drops seventy-eight percent. That's not a vision statement. That's what happens when you connect the loop. The shift from fragmented to connected isn't just an efficiency play — it's the difference between managing yesterday's problems and preventing tomorrow's.",
  },
  {
    slideId: "exec2-slide-3",
    title: "DTOP Operating Model",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "We call this rhythm Detect, Trigger, Orchestrate, Prove. Detect — your systems listen continuously across flight data, safety reports, and operational signals. Trigger — the right workflow fires automatically, no email chains, no waiting for someone to connect the dots. Orchestrate — training, procedures, and compliance move together in parallel, not in a slow sequence. And Prove — every action is logged, every change is traced, audit-ready by default. This isn't a framework on a whiteboard. It's a living loop that runs continuously across your entire operation.",
  },
  {
    slideId: "exec2-slide-4",
    title: "The Platform",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "This loop is powered by three purpose-built applications working as one platform. SafetyManager365 detects the signals — surfacing trends, risks, and patterns your teams would otherwise miss. ContentManager365 orchestrates the response — ensuring the right procedures reach the right people at the right time. TrainingManager365 closes the loop — delivering targeted training before the next event, not after the next audit finding. And connecting all three is CoAnalyst, our aviation intelligence engine, transforming over sixty-five thousand monthly data points into decisions you can act on. One platform. One version of truth. No gaps.",
  },
  {
    slideId: "exec2-slide-5",
    title: "Use Cases in Action",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Let me make this real. A smoke and fumes cluster is detected across three aircraft types. Within forty-eight hours, the affected procedures are updated, maintenance is alerted, and crew receive targeted guidance — before the next flight. A hydraulic switch error causes confusion in the cockpit. The platform identifies the pattern, flags the procedural ambiguity, and pushes a clarified procedure to every affected crew member within days, not months. A pilot struggles with approaches at a specific high-altitude airport. Instead of generic retraining, the platform delivers scenario-based training tailored to that exact challenge. These aren't hypotheticals. These are the kinds of outcomes a connected platform delivers every week.",
  },
  {
    slideId: "exec2-slide-6",
    title: "The Transformation",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "What we're really talking about is a transformation in how your operation works. Today, most of your team's time goes to firefighting — reacting to events after they happen, chasing data across systems, preparing for audits at the last minute. In the connected model, that balance shifts. Prevention replaces reaction. Insight replaces intuition. Your safety and training teams stop being cost centres and become strategic performance engines. And here's what matters — the cultural shift is just as important as the technical one. When people trust the data and the platform, they make better decisions faster.",
  },
  {
    slideId: "exec2-slide-7",
    title: "Performance Ladder",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "We think about operational maturity as a ladder with five stages. At the bottom, you're fragmented — data exists but it's trapped in silos. Then reactive — you can see problems but only after they've happened. Connected — your systems start sharing data and triggering workflows automatically. Proactive — you're preventing events before they occur. And at the top, predictive — your platform anticipates risks and recommends actions before anyone asks. Most carriers today are at stage one or two. The good news? Every rung on this ladder delivers measurable value. You don't need to reach the top to see returns — you just need to start climbing.",
  },
  {
    slideId: "exec2-slide-8",
    title: "Intelligence Journey",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "Now, a word about intelligence. Generic AI tools give you about thirty-five percent accuracy on aviation-specific queries. They can't tell the difference between a bird strike report and a bird strike trend. CoAnalyst delivers over ninety percent accuracy — because it's been trained from the ground up on a decade of aviation operational data. That precision gap is everything. It's the difference between intelligence that drives action and noise that wastes your safety team's time. This isn't AI for the sake of AI. It's aviation intelligence, purpose-built to make your operation smarter every day.",
  },
  {
    slideId: "exec2-slide-9",
    title: "Maturity Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "And this journey doesn't require a big bang transformation. We've designed it as a phased roadmap. Phase one delivers quick wins — better safety reporting, streamlined compliance, immediate visibility. Phase two connects the loop — automated workflows, cross-domain intelligence, measurable risk reduction. Phase three takes you to predictive — anticipating events, optimizing crew performance, proving value to your board with hard numbers. Each phase proves its value before you commit to the next. No cliff edges. No leap of faith. Just steady, demonstrable progress.",
  },
  {
    slideId: "exec2-slide-10",
    title: "Customer Outcomes",
    voiceId: DEFAULT_VOICE_ID,
    script:
      "So what does all of this add up to? Schedule protection — fewer disruptions, faster recovery, more predictable operations. Revenue protection — reduced fuel waste from technique variance, fewer groundings, lower insurance exposure. Cost avoidance — the human-factor costs hiding in your operation today can be identified, quantified, and systematically reduced. And regulatory confidence — not preparing for audits, but being audit-ready every single day. Every signal in your operation connects to an outcome your board cares about. Let's schedule a thirty-minute discovery session to map your specific signals to measurable outcomes — and build a cost avoidance model with your numbers.",
  },
];

export const getExecPitch2Narration = (slideId: string): ExecNarration2Slide | undefined =>
  executivePitch2Narrations.find((s) => s.slideId === slideId);
