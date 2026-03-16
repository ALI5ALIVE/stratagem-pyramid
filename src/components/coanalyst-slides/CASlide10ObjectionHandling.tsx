import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

const objections = [
  {
    objection: "We're using Claude / ChatGPT on our own data",
    response: "Generic LLMs can summarize text and answer prompted questions. But at granular aviation categorization (4,000+ categories, 5 levels), they achieve only 30–40% accuracy — and hallucinate. CoAnalyst uses a hybrid AI architecture (ML models + LLMs) trained on millions of historic reports, delivering 90% accuracy. Generic AI does baby things like summarization — when it comes to the real work, it fails.",
  },
  {
    objection: "We can build this ourselves",
    response: "Replicating CoAnalyst requires years of aviation domain R&D (we've invested 7 figures since 2023 and never stop), millions of historical reports for model training, specialized ML engineering, 4,000+ category taxonomy development, and continuous validation. Most internal builds take 3–5 years and cost significantly more than deploying a proven, production-ready platform.",
  },
  {
    objection: "This is just analytics / AI features",
    response: "Analytics tools visualize data you already have. Competitors bolt on basic AI and call it intelligence. CoAnalyst creates new intelligence by enriching, structuring, and analyzing raw aviation data — surfacing patterns, hazards, and weakening controls that no dashboard or bolt-on feature can detect. It's a standalone intelligence platform, not a feature.",
  },
  {
    objection: "Why are you more expensive than competitors?",
    response: "Because CoAnalyst is its own product — a standalone data intelligence platform, not an add-on to safety reporting. You're not paying for AI features within a reporting tool. You're investing in an intelligence layer that analyzes data across all operational domains and delivers predictive capability no competitor offers.",
  },
  {
    objection: "How is this different from AI in other safety tools?",
    response: "Other tools' AI helps process individual reports faster — basic summarization and suggested categories. CoAnalyst is a standalone platform that analyzes data across domains, detects cross-system patterns, and delivers four levels of intelligence from historical to predictive. It's the difference between a spell-checker and an intelligence analyst.",
  },
  {
    objection: "Our current reporting system already works",
    response: "Reporting systems capture and route events — they're workflow tools. CoAnalyst sits above them as an intelligence layer, transforming captured data into insights. Thousands of users at major carriers go into CoAnalyst every day not to process reports, but to get intelligence on their data. It doesn't replace your reporting system — it makes it intelligent.",
  },
];

const CASlide10ObjectionHandling = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-objection-handling" title="Objection Handling" subtitle="Strategic responses to common objections" slideNumber={10} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-full content-start">
        {objections.map((item, i) => (
          <div key={i} className="bg-card/60 border border-border rounded-xl p-3">
            <p className="text-[10px] font-bold text-red-400 uppercase tracking-wide mb-1.5">"{item.objection}"</p>
            <p className="text-[10px] text-muted-foreground leading-relaxed">{item.response}</p>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default CASlide10ObjectionHandling;
