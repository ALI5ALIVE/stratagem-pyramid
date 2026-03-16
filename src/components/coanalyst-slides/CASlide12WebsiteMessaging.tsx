import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

const sections = [
  {
    label: "Hero",
    headline: "Activate Your Aviation Data. Intelligence for Safety, Operations, and Beyond.",
    copy: "CoAnalyst is a standalone data intelligence platform that transforms fragmented safety and operational data into actionable intelligence — enabling aviation organizations to move from critical event management to critical control management.",
    cta: "See CoAnalyst in Action →",
  },
  {
    label: "Value Prop",
    headline: "Intelligence That Changes How You Operate",
    copy: "Most aviation organizations manage safety reactively. An event happens. A report is filed. Analysts investigate. CoAnalyst changes this model — identifying patterns, detecting hazards, monitoring control effectiveness, and delivering predictive intelligence across flight safety, flight ops, cabin ops, ground ops, and maintenance & engineering.",
  },
  {
    label: "How It Works",
    headline: "From Data to Intelligence",
    copy: "CoAnalyst ingests aviation data across domains, enriches it with aviation-trained AI (summarization, translation in 60+ languages, categorization across 4,000+ event types), detects patterns and hazards at scale, generates four levels of intelligence (historical, real-time, proactive, predictive), and activates your operational systems with enriched data quality.",
  },
  {
    label: "Differentiator",
    headline: "Purpose-Built Beats General-Purpose",
    copy: "Generic AI achieves 30–40% accuracy at granular aviation categorization and hallucinates. CoAnalyst's hybrid AI architecture — domain-trained ML models combined with LLMs — delivers 90% accuracy across 4,000+ categories, built on millions of historic aviation reports and continuous R&D since 2023.",
  },
  {
    label: "CTA",
    headline: "Ready to Move from Events to Controls?",
    copy: "See how leading airlines use CoAnalyst to detect risks earlier, manage controls proactively, and protect operational performance — with intelligence that no generic AI can match.",
    cta: "Request a Demo",
  },
];

const CASlide12WebsiteMessaging = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-website-messaging" title="Website Messaging" subtitle="Ready-to-use copy for the CoAnalyst standalone microsite" slideNumber={12} {...props}>
      <div className="flex flex-col gap-2 h-full justify-center max-w-5xl mx-auto w-full">
        {sections.map((section, i) => (
          <div key={i} className="bg-card/60 border border-border rounded-xl p-3 flex items-start gap-3">
            <div className="shrink-0 w-24">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wide">{section.label}</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-foreground mb-0.5">{section.headline}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{section.copy}</p>
              {section.cta && (
                <p className="text-[10px] text-primary font-semibold mt-1.5">{section.cta}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default CASlide12WebsiteMessaging;
