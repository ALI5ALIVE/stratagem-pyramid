import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

const narrativeSteps = [
  { phase: "Today", text: "Aviation organizations collect thousands of safety and operational reports every year. Analysts process them one by one. Investigations happen after the fact. Insights are fragmented across systems that were built for compliance, not intelligence." },
  { phase: "The Gap", text: "Data volumes grow, but analyst capacity doesn't. Reports are filed but patterns go undetected. Controls weaken without visibility. The industry has reporting systems — what it lacks is an intelligence system." },
  { phase: "The Shift", text: "Leading organizations are recognizing that the future of aviation safety and performance isn't about processing more reports faster. It's about transforming data into intelligence that identifies risks before events occur, monitors control effectiveness in real time, and drives proactive decision-making." },
  { phase: "CoAnalyst", text: "CoAnalyst is built for this shift. It is a purpose-built aviation data intelligence platform that ingests data across domains, enriches it with aviation-trained AI, detects patterns and hazards, and generates the intelligence organizations need to move from reactive event management to proactive control management." },
  { phase: "The Outcome", text: "Fewer delays. Fewer damages. Fewer injuries. Stronger operational reliability. Better efficiency. Revenue protection. Not because you have better reports — but because you have better intelligence." },
];

const CASlide3StrategicNarrative = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-strategic-narrative" title="The Strategic Narrative" subtitle="The category-creation story" slideNumber={3} {...props}>
      <div className="flex flex-col gap-3 h-full justify-center max-w-5xl mx-auto">
        {narrativeSteps.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary">
                {i + 1}
              </div>
              {i < narrativeSteps.length - 1 && <div className="w-px h-full bg-border mt-1" />}
            </div>
            <div className="pb-3">
              <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{step.phase}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default CASlide3StrategicNarrative;
