import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { ShieldAlert, BookOpen, GraduationCap } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const footprints = [
  { label: "S", name: "SafetyManager365 only", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
  { label: "C", name: "ContentManager365 only", color: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
  { label: "T", name: "TrainingManager365 only", color: "border-violet-500/40 bg-violet-500/10 text-violet-300" },
  { label: "S+C", name: "Safety + Content", color: "border-sky-500/40 bg-sky-500/10 text-sky-300" },
  { label: "S+T", name: "Safety + Training", color: "border-sky-500/40 bg-sky-500/10 text-sky-300" },
  { label: "C+T", name: "Content + Training", color: "border-sky-500/40 bg-sky-500/10 text-sky-300" },
  { label: "S+C+T", name: "All three apps", color: "border-primary/50 bg-primary/15 text-primary" },
];

const SEFootprintIntro = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-footprint-intro"
    slideNumber={slideNumber}
    title="Where is the customer today?"
    subtitle="Every Comply365 prospect already owns one, two, or three of the core apps. Your first job is to map the footprint — then sell the loop they can't yet close."
    showHeader
    {...narrationProps}
  >
    <div className="h-full flex flex-col gap-6 max-w-7xl mx-auto px-4 pt-2">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4">
          <ShieldAlert className="h-5 w-5 text-emerald-400 mb-2" />
          <div className="text-xs uppercase tracking-wider text-emerald-300 mb-1">S — Safety</div>
          <div className="text-sm text-foreground">SafetyManager365</div>
        </div>
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
          <BookOpen className="h-5 w-5 text-amber-400 mb-2" />
          <div className="text-xs uppercase tracking-wider text-amber-300 mb-1">C — Content</div>
          <div className="text-sm text-foreground">ContentManager365</div>
        </div>
        <div className="rounded-lg border border-violet-500/40 bg-violet-500/10 p-4">
          <GraduationCap className="h-5 w-5 text-violet-400 mb-2" />
          <div className="text-xs uppercase tracking-wider text-violet-300 mb-1">T — Training</div>
          <div className="text-sm text-foreground">TrainingManager365</div>
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">7 possible footprints</div>
        <div className="grid grid-cols-7 gap-2">
          {footprints.map((f) => (
            <div key={f.label} className={`rounded-lg border ${f.color} p-3 flex flex-col items-center text-center`}>
              <div className="text-base font-bold mb-1">{f.label}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">{f.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-primary/40 bg-primary/10 p-4">
        <div className="text-[10px] uppercase tracking-wider text-primary mb-1">Coach line</div>
        <p className="text-sm text-foreground italic">
          "Your job is never to sell what they already have. It's to sell what they're missing — and the loop they can't close without it."
        </p>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEFootprintIntro;