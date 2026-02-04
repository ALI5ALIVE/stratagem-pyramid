export interface SalesNarrationSlide {
  slideId: string;
  text: string;
}

export const salesDeckNarration: SalesNarrationSlide[] = [
  {
    slideId: "sales-slide-0",
    text: "Today, we're not presenting a product. We're defining a category. The Operational Performance Platform—a connected, intelligent, and predictive system that turns safety, content, and training signals into orchestrated change and measurable outcomes.",
  },
  {
    slideId: "sales-slide-1",
    text: "Here's the reality every aviation operator faces: Point tools can't close the loop. Safety signals are scattered across systems. Content updates require manual coordination. Training completions don't connect back to the events that triggered them. The result? Procedural drift, audit scrambles, and signals that never become action. Sound familiar?",
  },
  {
    slideId: "sales-slide-2",
    text: "The cost of fragmentation is measurable. Twelve thousand safety signals scattered monthly with no automated triggers. Eight thousand orphaned content items waiting for manual review. Three weeks on average to complete an investigation. And months of preparation for every audit cycle. Regulators expect connection. Operations demand speed. Point tools can't deliver either.",
  },
  {
    slideId: "sales-slide-3",
    text: "There's a better way. The transformation from fragmentation to connected operations is dramatic. Before: scattered data, manual handoffs, reactive responses, and audit scrambles. After: a connected platform, automated triggers, proactive action, and continuous proof. The results speak for themselves: on-time performance up three point two percent, ninety-four percent readiness scores, and audit prep reduced from months to two hours.",
  },
  {
    slideId: "sales-slide-4",
    text: "The platform operates through four connected stages. Detect: surface signals from safety, content, and training data. Trigger: automatically initiate the right workflows. Orchestrate: coordinate the response across training, content, and compliance. Prove: document every action for audit-ready evidence. Signals become outcomes—by default.",
  },
  {
    slideId: "sales-slide-5",
    text: "Here's what closing the loop looks like in practice. A hard landing trend is detected through Flight Ops Quality Assurance data. The platform automatically identifies forty-seven affected pilots. Targeted simulator training is deployed—not mass retraining, but precision intervention. Training completion is logged, and the trend is monitored. The result? A seventy-eight percent reduction in repeat events within ninety days.",
  },
  {
    slideId: "sales-slide-6",
    text: "Your operational performance journey follows a clear roadmap. From Fragmented—where point tools and manual processes dominate—through Managed, Connected, Intelligent, and finally Predictive operations. Traditional approaches take five to seven years to reach predictive maturity. With Comply three six five, you can accelerate that journey to eighteen to twenty-four months.",
  },
  {
    slideId: "sales-slide-7",
    text: "The value manifests across four pillars. Schedule Protection: hard landing trends become targeted retraining, protecting departures. Revenue Protection: fatigue risks become proactive scheduling, avoiding cancellations. Cost Savings: procedure discrepancies become automated updates, reducing rework. Customer Loyalty: compliance gaps become immediate remediation, maintaining trust. Every signal becomes action. Every action becomes measurable value.",
  },
  {
    slideId: "sales-slide-8",
    text: "Point solutions manage silos. We close the loop. Three things set Comply three six five apart. First, a Connected Foundation—one version of truth across safety, content, and training. Second, Embedded Intelligence—AI that's trusted because it's integrated from the ground up, not bolted on. Third, Proof by Default—audit-ready evidence, always, with every action documented automatically. Our promise: make operational performance predictable, measurable, and provable.",
  },
  {
    slideId: "sales-slide-9",
    text: "Let's build your roadmap. Schedule a discovery session and we'll map your current maturity, identify your highest-impact opportunities, and design your path to predictive operations. Detect. Trigger. Orchestrate. Prove. Your journey starts now.",
  },
];

export const getSalesNarrationBySlideId = (slideId: string): string | undefined => {
  return salesDeckNarration.find((slide) => slide.slideId === slideId)?.text;
};
