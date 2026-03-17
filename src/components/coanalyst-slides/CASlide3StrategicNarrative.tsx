import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";

const narrativeSteps = [
  {
    phase: "Today",
    text: "Aviation organizations collect thousands of safety and operational reports every year. Analysts process them one by one. Investigations happen after the fact. Insights are fragmented across systems built for compliance, not intelligence.",
    example: null,
  },
  {
    phase: "The Gap",
    text: "Data volumes grow, but analyst capacity doesn't. Reports are filed but patterns go undetected. Controls weaken without visibility. The industry has reporting systems — what it lacks is an intelligence system that works across domains.",
    example: "Today, understanding what happened at a specific airport requires sending a team of people to collect information. They come back whenever they're ready — days, weeks, sometimes months.",
  },
  {
    phase: "The Shift",
    text: "Leading organizations recognize the future isn't about processing more reports faster. It's about transforming data into intelligence that identifies risks before events occur, monitors control effectiveness in real time, and drives proactive decision-making across every operational domain.",
    example: "CoAnalyst surfaces a pattern: increasing reports of aircraft damages on a specific gate. Or detects that unrealistic pilot scheduling is a hazard that could lead to ground delays — before those delays happen.",
  },
  {
    phase: "CoAnalyst",
    text: "CoAnalyst is a standalone aviation data intelligence platform that ingests data across safety, ops, maintenance, training, and crew. It enriches it with aviation-trained AI, detects patterns and hazards, and generates four levels of intelligence — historical, real-time, proactive, and predictive.",
    example: "Ask: 'How did we perform in aircraft damages at this airport, on this gate, over the last four years?' — and get the answer in milliseconds. Or: 'What happened 10 minutes ago at Dubai airport?' — real-time intelligence from any report source.",
  },
  {
    phase: "The Outcome",
    text: "Fewer delays. Fewer damages. Fewer injuries. Stronger operational reliability. Revenue protection. Not because you have better reports — but because you've shifted from critical event management to critical control management.",
    example: null,
  },
];

const CASlide3StrategicNarrative = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-strategic-narrative" title="The Strategic Narrative" subtitle="The intelligence story" slideNumber={3} {...props}>
      <div className="flex flex-col gap-2 h-full justify-center max-w-5xl mx-auto">
        {narrativeSteps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-primary">
                {i + 1}
              </div>
              {i < narrativeSteps.length - 1 && <div className="w-px h-full bg-border mt-1" />}
            </div>
            <div className="pb-2">
              <p className="text-[10px] font-bold text-primary uppercase tracking-wide mb-0.5">{step.phase}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{step.text}</p>
              {step.example && (
                <div className="mt-1.5 bg-primary/5 border border-primary/20 rounded-lg px-3 py-1.5">
                  <p className="text-[10px] text-primary/80 italic leading-relaxed">{step.example}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default CASlide3StrategicNarrative;
