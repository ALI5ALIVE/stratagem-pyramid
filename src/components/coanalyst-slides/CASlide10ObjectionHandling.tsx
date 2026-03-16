import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

const objections = [
  {
    objection: "We can build this ourselves",
    response: "Replicating CoAnalyst requires years of aviation domain R&D, millions of historical reports for model training, specialized ML engineering, taxonomy development, and continuous validation. Most internal builds take 3–5 years and cost significantly more than deploying a proven, production-ready platform.",
  },
  {
    objection: "We already use ChatGPT / Claude",
    response: "Generic AI can summarize text and answer prompted questions. It cannot deliver aviation-specific categorization across thousands of event types, robust hazard detection, cross-report pattern recognition, or control-management insights. Generic AI reads reports — CoAnalyst understands aviation operations.",
  },
  {
    objection: "This is just analytics",
    response: "Analytics tools visualize data you already have. CoAnalyst creates new intelligence by enriching, structuring, and analyzing raw aviation data with domain-trained models — surfacing patterns, hazards, and weakening controls that no dashboard or BI tool can detect.",
  },
  {
    objection: "We already have reporting systems",
    response: "Reporting systems capture and route events. They are workflow tools, not intelligence tools. CoAnalyst sits above reporting systems as an intelligence layer — transforming the data they capture into actionable insights that drive proactive decision-making.",
  },
  {
    objection: "How is this different from AI features in other tools?",
    response: "Most AI features in operational tools are bolt-on assistants: they help process individual reports faster. CoAnalyst is a standalone intelligence platform that analyzes data across domains, detects cross-system patterns, and delivers four levels of intelligence from historical to predictive.",
  },
  {
    objection: "Why do we need a separate product?",
    response: "Because intelligence and workflow are different disciplines. Operational systems execute processes. CoAnalyst generates the intelligence that makes those processes smarter. Separating intelligence from workflow ensures depth, precision, and the ability to analyze across systems — not just within one.",
  },
];

const CASlide10ObjectionHandling = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-objection-handling" title="Objection Handling" subtitle="Strategic responses to common objections" slideNumber={10} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full content-start">
        {objections.map((item, i) => (
          <div key={i} className="bg-card/60 border border-border rounded-xl p-4">
            <p className="text-xs font-bold text-red-400 uppercase tracking-wide mb-2">"{item.objection}"</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.response}</p>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default CASlide10ObjectionHandling;
