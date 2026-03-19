import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

const objections = [
  {
    objection: "Our AI policy restricts external AI software",
    response: "Customer data is never used to train public AI models (OpenAI, Microsoft, or any third party). CoAnalyst operates within a secure, isolated AI pipeline — customer data is visible only to that customer, never shared across clients, and never leaves the controlled environment. We provide full transparency on our AI data architecture and infrastructure guarantees.",
  },
  {
    objection: "Our safety team is building their own AI models",
    response: "CoAnalyst complements internal AI projects, it doesn't compete with them. Every modern software platform embeds AI capabilities — CoAnalyst is the aviation-specific intelligence layer your internal team shouldn't have to rebuild. We've invested seven figures in domain-specific training across 4,000+ categories, and ship new AI capabilities weekly. Your data science team's time is better spent on problems unique to your operation.",
  },
  {
    objection: "We're using Claude / ChatGPT on our own data",
    response: "Generic LLMs achieve only 30–40% accuracy at granular aviation categorization (4,000+ categories, 5 levels) and hallucinate. CoAnalyst uses a hybrid AI architecture (ML models + LLMs) trained on millions of historic reports, delivering 90% accuracy. Generic AI does summarization — for the real work, it fails.",
  },
  {
    objection: "We can build this ourselves",
    response: "Replicating CoAnalyst requires years of aviation domain R&D (7-figure investment since 2023), millions of historical reports for model training, specialized ML engineering, 4,000+ category taxonomy, and continuous validation. Most internal builds take 3–5 years and cost significantly more than deploying a proven platform.",
  },
  {
    objection: "This is just analytics / AI features",
    response: "Analytics tools visualize data you already have. CoAnalyst creates new intelligence by enriching, structuring, and analyzing raw aviation data — surfacing patterns, hazards, and weakening controls that no dashboard or bolt-on feature can detect. It's a standalone intelligence platform, not a feature.",
  },
  {
    objection: "Why are you more expensive than competitors?",
    response: "CoAnalyst is a standalone data intelligence platform, not an add-on to safety reporting. You're investing in an intelligence layer that analyzes data across all operational domains and delivers predictive capability no competitor offers.",
  },
  {
    objection: "How is this different from AI in other safety tools?",
    response: "Other tools' AI helps process individual reports faster — basic summarization and suggested categories. CoAnalyst analyzes data across domains, detects cross-system patterns, and delivers four levels of intelligence from historical to predictive. It's the difference between a spell-checker and an intelligence analyst.",
  },
  {
    objection: "Our current reporting system already works",
    response: "Reporting systems capture and route events — they're workflow tools. CoAnalyst sits above them as an intelligence layer, transforming captured data into insights. It doesn't replace your reporting system — it makes it intelligent.",
  },
];

const CASlide10ObjectionHandling = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-objection-handling" title="Objection Handling" subtitle="Strategic responses to common objections" slideNumber={10} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 h-full content-start">
        {objections.map((item, i) => (
          <div key={i} className="bg-card/60 border border-border rounded-xl p-2.5">
            <p className="text-[9px] font-bold text-red-400 uppercase tracking-wide mb-1">"{item.objection}"</p>
            <p className="text-[9px] text-muted-foreground leading-relaxed">{item.response}</p>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default CASlide10ObjectionHandling;
