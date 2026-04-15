import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { roadmapPhases, talkingPoints, discoveryQuestions } from "@/data/regulationManagementPlaybook";
import { Rocket, MessageSquare, HelpCircle } from "lucide-react";

const phaseColors = [
  { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", bullet: "bg-blue-400" },
  { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", bullet: "bg-emerald-400" },
  { border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400", bullet: "bg-violet-400" },
];

const RMSlide10Roadmap = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-roadmap"
      title="Roadmap & Talking Points"
      subtitle="Phased delivery and conversation starters"
      slideNumber={10}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {/* Left — Roadmap */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2 mb-1">
            <Rocket className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Phased Roadmap</span>
          </div>
          {roadmapPhases.map((phase, i) => {
            const c = phaseColors[i];
            return (
              <div key={phase.phase} className={`border ${c.border} rounded-lg p-3`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase ${c.text}`}>{phase.phase}</span>
                  <span className="text-[10px] text-muted-foreground">{phase.timeline}</span>
                </div>
                <span className="text-xs font-semibold text-foreground">{phase.title}</span>
                <div className="mt-1.5 space-y-0.5">
                  {phase.outcomes.map((o, j) => (
                    <div key={j} className="flex items-start gap-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${c.bullet} mt-1.5 shrink-0`} />
                      <span className="text-[10px] text-muted-foreground">{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right — Talking Points & Discovery */}
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Key Talking Points</span>
            </div>
            <div className="space-y-1">
              {talkingPoints.slice(0, 4).map((t, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="text-[10px] text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Discovery Questions</span>
            </div>
            <div className="space-y-1">
              {discoveryQuestions.slice(0, 5).map((q, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-[10px] text-accent font-bold shrink-0">{i + 1}.</span>
                  <span className="text-[10px] text-muted-foreground">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default RMSlide10Roadmap;
