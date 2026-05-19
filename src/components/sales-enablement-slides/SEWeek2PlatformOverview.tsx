import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import PlatformArchitectureDiagramV4 from "@/components/platform-slides/PlatformArchitectureDiagramV4";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const blocks = [
  {
    tag: "Core Apps · Foundation",
    title: "SafetyManager365 · ContentManager365 · TrainingManager365",
    desc: "The three operational systems of record.",
    color: "text-blue-400",
    border: "border-blue-500/30 bg-blue-500/5",
  },
  {
    tag: "Intelligence & Orchestration",
    title: "Intelligence Layer · Insights · Automation",
    desc: "Turns the signals already in your operation into prescriptive action.",
    color: "text-amber-400",
    border: "border-amber-500/30 bg-amber-500/5",
  },
  {
    tag: "Unified Mobile",
    title: "One trusted shell for the frontline",
    desc: "Content, Training and Safety in a single app on the device.",
    color: "text-violet-400",
    border: "border-violet-500/30 bg-violet-500/5",
  },
  {
    tag: "DTOP",
    title: "The way of working that wires it all together",
    desc: "Detect → Trigger → Orchestrate → Prove. Covered in Week 1.",
    color: "text-emerald-400",
    border: "border-emerald-500/30 bg-emerald-500/5",
  },
];

const SEWeek2PlatformOverview = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-week-2-overview"
    slideNumber={slideNumber}
    title="The Operational Performance Platform"
    subtitle="One integrated platform. Wired together by DTOP."
    {...narrationProps}
  >
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-0">
      <div className="lg:col-span-3 min-h-0 flex items-center">
        <div className="w-full">
          <PlatformArchitectureDiagramV4 compact />
        </div>
      </div>
      <div className="lg:col-span-2 flex flex-col gap-2 justify-center">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">
          What we'll walk through this week
        </div>
        {blocks.map((b) => (
          <div key={b.tag} className={`rounded-xl border p-3 ${b.border}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider ${b.color}`}>{b.tag}</div>
            <div className="text-sm font-semibold text-foreground mt-0.5">{b.title}</div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{b.desc}</p>
          </div>
        ))}
        <div className="text-[10px] text-muted-foreground/70 italic mt-1">
          Week 2 map · we'll walk each block in turn.
        </div>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEWeek2PlatformOverview;