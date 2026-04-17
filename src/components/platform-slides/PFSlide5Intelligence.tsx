import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { intelligenceCapabilities } from "@/data/platformPlaybook";
import { Brain, Sparkles, Zap, Database, ArrowDown } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Brain, Sparkles, Zap };

const PFSlide5Intelligence = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="pf-intelligence"
      title="The Intelligence & Orchestration Layer"
      subtitle="Three capabilities. One job: turn operational data into action."
      slideNumber={5}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-2.5 flex items-center gap-2">
          <Database className="h-4 w-4 text-cyan-400 shrink-0" />
          <p className="text-xs text-foreground/80">Reads from the Operational Data Foundation — content, training and safety in one schema.</p>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
          {intelligenceCapabilities.map((cap, i) => {
            const Icon = iconMap[cap.icon];
            return (
              <div key={i} className={`rounded-lg border ${cap.border} ${cap.bg} p-4 flex flex-col gap-3`}>
                <div className="flex items-center justify-between">
                  <Icon className={`h-6 w-6 ${cap.color}`} />
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${cap.border} ${cap.color}`}>{cap.status}</span>
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${cap.color}`}>{cap.name}</h3>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{cap.short}</p>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">{cap.role}</p>
                <ul className="space-y-1 mt-auto">
                  {cap.bullets.map((b, j) => (
                    <li key={j} className="text-[11px] text-foreground/70 flex gap-1.5">
                      <span className={`${cap.color} shrink-0`}>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-primary/30 bg-primary/5 p-2.5 text-center">
          <p className="text-xs text-foreground/90">
            <span className="text-amber-300 font-semibold">Insights</span> decides ·
            <span className="text-amber-300 font-semibold"> CoAnalyst</span> interrogates ·
            <span className="text-violet-300 font-semibold"> Automation</span> acts
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default PFSlide5Intelligence;
