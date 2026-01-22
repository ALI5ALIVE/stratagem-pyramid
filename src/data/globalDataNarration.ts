export interface SlideNarration {
  slideId: number;
  title: string;
  script: string;
  voiceId: string;
}

const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"; // George - professional British male

export const globalDataNarrations: SlideNarration[] = [
  {
    slideId: 0,
    title: "Executive Promise",
    script: "Welcome. This deck outlines how GlobalData helps consumer brands achieve category leadership through Connected Intelligence. The core insight is simple: category leadership is no longer defined by scale or data volume. It's defined by how quickly and confidently organizations act on change. Over the next ten slides, we'll explore the growth reality, the intelligence gap, our solution, and the measurable ROI it delivers.",
    voiceId: DEFAULT_VOICE_ID,
  },
  {
    slideId: 1,
    title: "The Growth Reality",
    script: "Markets reward speed and conviction. Consumer behavior shifts faster than insight cycles can track. Innovation and go-to-market windows are shorter and less forgiving. Competitive moves scale faster with fewer assets. Here's the paradox: organizations have more insight than ever, yet less confidence. The real problem isn't data scarcity. It's that insight exists, but it doesn't move the organization together.",
    voiceId: DEFAULT_VOICE_ID,
  },
  {
    slideId: 2,
    title: "The Intelligence Gap",
    script: "Where is growth and leadership lost? In the Intelligence Gap — the delay between real-world change and enterprise action. It exists because signals fragment across tools, teams, and vendors. Leaders debate data instead of committing to direction. And decisions arrive too late to matter. The average decision latency is twelve weeks or more. Organizations consult three to five conflicting data sources per decision. And forty percent of launches miss optimal windows. This gap is where growth stalls, relevance erodes, and leadership is lost.",
    voiceId: DEFAULT_VOICE_ID,
  },
  {
    slideId: 3,
    title: "Before & After",
    script: "Let's visualize the transformation. Before Connected Intelligence: siloed insights, different taxonomies, manual reconciliation, and slow, debated decisions. After Connected Intelligence: a unified system with shared truth, embedded workflows, and confident, fast action. The change is measurable. Decision cycles move from weeks to days — seventy percent faster. Launch success doubles. And total cost of intelligence drops by thirty percent.",
    voiceId: DEFAULT_VOICE_ID,
  },
  {
    slideId: 4,
    title: "The Proposition",
    script: "Connected Intelligence for Consumer Brands is a unified solution that connects market, consumer, competitor, innovation, and commercial intelligence into one trusted system — so organizations move faster, align better, and act with confidence. This replaces tool sprawl, manual reconciliation, and conflicting answers. This is not another dataset or dashboard. This is intelligence designed to drive decisions end-to-end.",
    voiceId: DEFAULT_VOICE_ID,
  },
  {
    slideId: 5,
    title: "Across the Value Chain",
    script: "Connected Intelligence operates across the full value chain. In Strategy and Portfolio: where to play, category prioritization, investment focus. In Innovation and Product: trend discovery, whitespace identification, concept screening. In Brand, Pricing, and Claims: positioning, pricing strategy, claims validation. In Go-to-Market and Sales: channel strategy, launch planning, enablement. And in In-Market Performance: post-launch monitoring, competitive response, portfolio optimization. Every function operates from the same shared truth, so decisions reinforce each other.",
    voiceId: DEFAULT_VOICE_ID,
  },
  {
    slideId: 6,
    title: "Intelligence Maturity Ladder",
    script: "Connected Intelligence does not deliver incremental improvement. As intelligence matures, value compounds. The journey progresses through five stages. Stage one is Fragmented — with multiple tools and manual reconciliation. Stage two is Managed — structured but disconnected silos. Stage three is the Platform Shift — Connected Intelligence with unified governance. Stage four is Optimized Operations with embedded workflows and continuous improvement. Stage five is Predictive and Proactive Leadership — where AI-driven foresight enables decisions before competitors can react. The value logic is simple: alignment enables speed. Speed enables outcomes. Outcomes enable impact. Most organizations sit at stage one or two. Our role is to accelerate them to stage four and five.",
    voiceId: DEFAULT_VOICE_ID,
  },
  {
    slideId: 7,
    title: "Intelligence Maturity Roadmap",
    script: "This roadmap shows the measurable journey from fragmented insight to predictive leadership. Stage one is Fragmented and Reactive — with disconnected tools, no shared taxonomy, and slow decisions. Stage two is Managed but Siloed — better processes but still manual handoffs. Stage three is the Platform Shift — Connected Intelligence establishes unified truth across market, consumer, and commercial domains. Stage four is Optimized Operations — with embedded workflows and faster decisions. Stage five is Predictive and Proactive — where AI-led orchestration delivers category leadership through speed and foresight. Most organizations don't need more data. They need a clear, credible path forward. This is that path.",
    voiceId: DEFAULT_VOICE_ID,
  },
  {
    slideId: 8,
    title: "ROI",
    script: "Return on investment shows up in three places. First, speed to decision: decision cycles shrink from weeks to days — seventy percent faster. Second, better growth outcomes: higher-quality bets, fewer failed launches, and reduced misallocations — two times higher launch success rates. Third, lower cost of intelligence: less duplication, fewer tools, and less manual reconciliation — thirty percent reduction in total cost of ownership. ROI compounds as organizations move up the maturity curve. The sooner you start, the faster value accumulates.",
    voiceId: DEFAULT_VOICE_ID,
  },
  {
    slideId: 9,
    title: "Why GlobalData",
    script: "GlobalData is uniquely built for Connected Intelligence at scale. Three defensible differentiators. First: unmatched proprietary market and consumer data that no competitor can replicate. Second: human analyst expertise at scale, amplified by Ava — our enterprise-grade AI research analyst. Third: a unified taxonomy across all intelligence domains, enabling true connection. Here's the leadership imperative: organizations that close the Intelligence Gap and operate intelligence as a connected system will define the next generation of category leaders. The future belongs to organizations that turn change into decisions — earlier, together, and with conviction.",
    voiceId: DEFAULT_VOICE_ID,
  },
];

export const getGlobalDataNarration = (slideId: number): SlideNarration | undefined => {
  return globalDataNarrations.find((narration) => narration.slideId === slideId);
};
