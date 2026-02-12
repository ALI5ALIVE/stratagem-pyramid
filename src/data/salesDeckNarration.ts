export interface SalesNarrationSlide {
  slideId: string;
  text: string;
}

export const salesDeckNarration: SalesNarrationSlide[] = [
  {
    slideId: "sales-slide-0",
    text: "You already know where your risks are. Your Foqua data shows it. Your safety reports confirm it. But knowing and acting are two very different things. What if the moment a signal appeared, the right people were already moving? What if training deployed before the next event, not after? That's the gap we close. Let me show you how.",
  },
  {
    slideId: "sales-slide-1",
    text: "Picture a Monday morning. Foqua flags a hard landing trend at one of your hubs. Safety opens a case. But training won't hear about it until someone sends an email — maybe this week, maybe next. Meanwhile, the same crew flies the same approach, and the trend continues. By the time a training response is scoped, approved, and scheduled, you've lost six weeks. It's not a people problem. Your teams are excellent. It's a wiring problem. The systems that detect, the systems that train, and the systems that prove — they were never connected.",
  },
  {
    slideId: "sales-slide-2",
    text: "This isn't just an efficiency issue anymore — it's an exposure issue. Regulators are evolving. They no longer accept a binder of completed checklists as evidence of competence. They want to see that when a signal was detected, a specific action was taken, and the outcome was measured. Connected evidence, not compliance theatre. Every week your systems stay disconnected, the gap between what you know and what you can prove widens. And your competitors who close that gap first? They're not just safer — they're more reliable, more efficient, and more attractive to regulators and investors alike.",
  },
  {
    slideId: "sales-slide-3",
    text: "Think about how a single signal moves through your operation today. Foqua flags an exceedance. Safety logs it in their system. An email goes to training. Training opens a spreadsheet. Content gets a request three weeks later. And when audit asks for the thread? Someone spends days reconstructing it. Now imagine the alternative. The same signal is detected, and within hours the affected crew are identified, targeted training is assigned, the relevant procedure is verified, and every step is logged automatically. Not because someone chased it — because the system is wired to close the loop.",
  },
  {
    slideId: "sales-slide-4",
    text: "We call this way of working Detect, Trigger, Orchestrate, Prove. It's not a product feature — it's how your teams operate differently. Detect means your operation is always listening — Foqua, Aviation Safety Action Program reports, audit findings, ops data — all feeding one signal engine. Trigger means the right workflow starts automatically, no email chains, no waiting. Orchestrate means training, content, and compliance move together, not in sequence. And Prove means every action is logged as it happens — audit-ready by default, not by effort. This is how you move from reacting to risk, to predicting and preventing it.",
  },
  {
    slideId: "sales-slide-5",
    text: "Let me make this real. A carrier we work with saw a cluster of hard landing events at a specific airport. Foqua detected the trend. The platform identified forty-seven pilots who'd flown that approach in the prior ninety days. Within forty-eight hours, targeted simulator sessions were assigned — not generic recurrent training, but approach-specific scenarios calibrated to the actual conditions. The result? A seventy-eight percent reduction in repeat events within ninety days. No email chains. No spreadsheet tracking. No six-week lag. Signal to outcome, closed. Now imagine applying that same pattern to smoke and fumes reporting, fatigue risk, or MEL procedure compliance. Every operational signal becomes an opportunity to act before it becomes a cost.",
  },
  {
    slideId: "sales-slide-6",
    text: "Every one of those signals has a price tag. A go-around costs between eight and fifteen thousand dollars in fuel alone. An unscheduled maintenance event can ground an aircraft for days. A regulatory finding triggers months of remediation. These aren't abstract numbers — they're line items your CFO tracks, reliability metrics your COO owns, and reputation risks your CEO worries about. What you're seeing here is our Line of Sight model. It traces each use case — hard landings, delays, fuel degradation, injuries — through leading operational measures, all the way up to the executive outcomes that matter. For a mid-size carrier, the total cost avoidance opportunity exceeds forty million dollars annually. And we can build this model with your numbers — your fleet, your routes, your data.",
  },
  {
    slideId: "sales-slide-7",
    text: "Where does your operation sit today? Most airlines we talk to are somewhere in the first two stages — fragmented systems, reactive responses, manual handoffs. That's not a criticism, it's the industry norm. But here's what's changed. The best-in-class carriers are now at Stage Three and accelerating. They've connected safety, content, and training into a single operating rhythm. And the performance gap between Stage Two and Stage Four isn't incremental — it's transformational. The traditional path to operational maturity takes five to seven years. With a connected platform, we've seen carriers reach Stage Five in eighteen to twenty-four months. The question isn't whether to start — it's how quickly you want to get there.",
  },
  {
    slideId: "sales-slide-8",
    text: "Let me translate this into the language your board speaks. Schedule protection: when hard landing trends are caught early, you protect departures and reduce delay minutes. Revenue protection: when fatigue risks are flagged proactively, you avoid the cancellations that cost two hundred thousand dollars each. Cost reduction: when content updates are automated, you eliminate the rework cycles that consume your technical publications team. And customer trust: when compliance gaps close immediately, you maintain the operational reliability that passengers and partners depend on. Every signal, acted on. Every outcome, measured.",
  },
  {
    slideId: "sales-slide-9",
    text: "Three things set Comply three six five apart. First, a connected foundation. Not integrations bolted together, but one version of truth across sixty-five thousand operational data points. Second, embedded intelligence. Our AI is trained on over ten years of aviation operational data — it understands your context because it grew up in your industry, not in a generic machine learning lab. Third, proof by default. Every action logged, every change traced, every decision auditable. You don't prepare for audits — you're always ready. Point solutions manage silos. We close the loop.",
  },
  {
    slideId: "sales-slide-10",
    text: "Your operation generates unique signals every day. Let's make them predictable. In a discovery session, we'll assess where you sit on the maturity journey, identify your highest-impact use cases, and build a custom cost avoidance model using your fleet size, route network, and operational data. Detect. Trigger. Orchestrate. Prove. Your journey to predictable performance starts now.",
  },
];

export const getSalesNarrationBySlideId = (slideId: string): string | undefined => {
  return salesDeckNarration.find((slide) => slide.slideId === slideId)?.text;
};
