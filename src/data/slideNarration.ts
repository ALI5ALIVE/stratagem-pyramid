export interface SlideNarration {
  slideId: number;
  title: string;
  script: string;
  voiceId: string;
}

// Using "George" voice - professional, clear male narration
const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

export const slideNarrations: SlideNarration[] = [
  {
    slideId: 0,
    title: "Title",
    voiceId: DEFAULT_VOICE_ID,
    script: "Welcome to Comply365's strategic positioning deck. This presentation outlines our transformation from fragmented point tools to an intelligent operational excellence platform. Our focus is becoming the defining platform for aviation operational readiness. Click any section in the agenda to navigate directly, or scroll through to explore our complete strategic vision."
  },
  {
    slideId: 1,
    title: "Strategic Shift",
    voiceId: DEFAULT_VOICE_ID,
    script: "The aviation industry faces a critical operational gap. Signals are scattered across siloed systems with no unified view of risk. Manual coordination slows change through endless handoffs, spreadsheets, and email approvals. Compliance efforts are reactive, not proactive. We're defining a new category: the Operational Excellence and Readiness Platform. Our mission is to connect the dots across your entire operation, from policy to pilot, from manuals to maintenance."
  },
  {
    slideId: 2,
    title: "Before & After",
    voiceId: DEFAULT_VOICE_ID,
    script: "Consider the transformation. Before: fragmented tools creating operational silos, tribal knowledge trapped in individuals, reactive scrambles after issues occur, and limited visibility into true readiness. After: a unified platform connecting all operational data, institutional knowledge captured and accessible, proactive risk identification before issues escalate, and complete visibility across your operation. This is the shift from chaos to clarity, from reactive to predictive."
  },
  {
    slideId: 3,
    title: "Operating Model",
    voiceId: DEFAULT_VOICE_ID,
    script: "Our operating model brings together three critical capabilities. First, content management: your single source of truth for all operational documentation. Second, learning and competency: ensuring every team member has the knowledge they need, when they need it. Third, safety and quality: turning data into actionable insights that prevent issues before they occur. These three pillars work together in a continuous loop, sharing data and insights to create true operational intelligence."
  },
  {
    slideId: 4,
    title: "Platform Capabilities",
    voiceId: DEFAULT_VOICE_ID,
    script: "The Comply365 platform delivers comprehensive capabilities across the operational lifecycle. Real-time document distribution ensures everyone works from current information. Integrated training management tracks competencies and certifications. Safety reporting captures issues and near-misses before they become incidents. Audit management streamlines compliance verification. And our AI-powered analytics layer connects these capabilities, surfacing insights and recommendations that drive continuous improvement."
  },
  {
    slideId: 5,
    title: "Transformation",
    voiceId: DEFAULT_VOICE_ID,
    script: "The operational transformation we enable is profound. Manual processes become automated workflows. Siloed data becomes connected intelligence. Reactive responses become proactive prevention. This isn't just about efficiency—it's about fundamentally changing how aviation organizations operate. The result: safer operations, better compliance, more engaged teams, and measurable cost savings across your organization."
  },
  {
    slideId: 6,
    title: "Readiness Ladder",
    voiceId: DEFAULT_VOICE_ID,
    script: "Our value pyramid illustrates the four levels of operational maturity we enable. At the foundation: compliance assurance, ensuring you meet all regulatory requirements. Building on that: operational efficiency, streamlining processes and reducing waste. Higher still: risk intelligence, predicting and preventing issues before they occur. At the apex: strategic readiness, where operational data drives business decisions and competitive advantage. Each level builds on the previous, creating compounding value."
  },
  {
    slideId: 7,
    title: "Operational Excellence Roadmap",
    voiceId: DEFAULT_VOICE_ID,
    script: "The maturity curve shows the five stages of operational excellence. Stage one: Foundational, establishing basic systems and processes. Stage two: Structured, implementing consistent workflows. Stage three: Integrated, connecting systems and data flows. Stage four: Optimized, using analytics to drive continuous improvement. Stage five: Intelligent, achieving predictive capabilities and autonomous optimization. Most organizations we work with begin at stages one or two. Our platform accelerates the journey to stage four and five, typically in eighteen to twenty-four months."
  },
  {
    slideId: 8,
    title: "Positioning",
    voiceId: DEFAULT_VOICE_ID,
    script: "In the competitive landscape, Comply365 occupies a unique position. While others offer point solutions for documents, training, or safety, we deliver an integrated platform. While legacy providers require heavy IT involvement, we provide cloud-native simplicity. While competitors focus on compliance checking, we enable operational excellence. This positioning—integrated, modern, and outcome-focused—makes Comply365 the natural choice for aviation organizations serious about transformation."
  },
  {
    slideId: 9,
    title: "Customers",
    voiceId: DEFAULT_VOICE_ID,
    script: "Our customers represent the full spectrum of aviation: major airlines, regional carriers, corporate flight departments, and maintenance organizations. They chose Comply365 not just for our technology, but for our deep understanding of aviation operations. The results speak for themselves: reduced compliance incidents, faster document updates, improved training completion rates, and measurable operational improvements. These aren't just software users—they're transformation partners."
  },
  {
    slideId: 10,
    title: "Investors",
    voiceId: DEFAULT_VOICE_ID,
    script: "For investors, Comply365 represents a compelling opportunity. We're addressing a large, underserved market with proven product-market fit. Our platform approach creates significant switching costs and expansion revenue. The aviation industry's increasing regulatory complexity and digital transformation imperative provide strong tailwinds. Our unit economics are attractive, with high gross margins and efficient customer acquisition. This is a category-defining opportunity in a critical industry."
  },
  {
    slideId: 11,
    title: "Category Name",
    voiceId: DEFAULT_VOICE_ID,
    script: "We're not just building a product—we're defining a category. The Operational Excellence and Readiness Platform category captures what we truly deliver: not just compliance tools, but a complete system for operational transformation. This category framing positions us as the leader in a growing market, rather than a participant in a crowded legacy space. Category creation drives premium positioning, attracts top talent, and commands investor attention."
  },
  {
    slideId: 12,
    title: "Messaging House",
    voiceId: DEFAULT_VOICE_ID,
    script: "Our messaging house brings together our complete positioning framework. The foundation: we enable operational excellence in aviation. The pillars: unified platform, operational intelligence, and proactive readiness. The roof: Comply365 is the operational excellence and readiness platform for aviation. Every piece of content, every sales conversation, every product decision aligns to this framework. This is how we win the market and own our category. Thank you for joining us on this journey."
  },
];

export const getSlideNarration = (slideId: number): SlideNarration | undefined => {
  return slideNarrations.find(n => n.slideId === slideId);
};
