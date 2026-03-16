import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

const sections = [
  {
    label: "Hero",
    headline: "Turn Aviation Data into Operational Intelligence",
    copy: "CoAnalyst transforms fragmented safety and operational data into actionable intelligence — helping aviation organizations move from reactive event management to proactive control management.",
    cta: "See CoAnalyst in Action →",
  },
  {
    label: "Value Proposition",
    headline: "Intelligence That Changes How You Operate",
    copy: "Most aviation organizations manage safety and operations reactively. An event happens. A report is filed. Analysts investigate. CoAnalyst changes this model by identifying patterns, detecting hazards, monitoring control effectiveness, and delivering predictive intelligence — before events occur.",
  },
  {
    label: "How It Works",
    headline: "From Data to Intelligence in Five Steps",
    copy: "CoAnalyst ingests aviation data across domains, enriches it with aviation-trained AI (summarization, translation, categorization), detects patterns and hazards at scale, generates four levels of intelligence (historical, real-time, proactive, predictive), and enables proactive control management.",
  },
  {
    label: "Why Not Generic AI",
    headline: "Purpose-Built Beats General-Purpose",
    copy: "Generic AI can summarize text and answer prompted questions. CoAnalyst delivers aviation-specific precision across thousands of event categories, robust hazard detection, cross-report pattern recognition, and control-management insights — built on millions of historic aviation reports with lower hallucination risk.",
  },
  {
    label: "CTA",
    headline: "Ready to Move from Reports to Intelligence?",
    copy: "See how CoAnalyst helps aviation organizations detect risks earlier, manage controls proactively, and protect operational performance.",
    cta: "Request a Demo",
  },
];

const CASlide12WebsiteMessaging = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-website-messaging" title="Website Messaging" subtitle="Ready-to-use copy for homepage and microsite" slideNumber={12} {...props}>
      <div className="flex flex-col gap-3 h-full justify-center max-w-5xl mx-auto w-full">
        {sections.map((section, i) => (
          <div key={i} className="bg-card/60 border border-border rounded-xl p-4 flex items-start gap-4">
            <div className="shrink-0 w-28">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wide">{section.label}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground mb-1">{section.headline}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{section.copy}</p>
              {section.cta && (
                <p className="text-xs text-primary font-semibold mt-2">{section.cta}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default CASlide12WebsiteMessaging;
