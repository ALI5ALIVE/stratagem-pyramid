import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { BookOpen, Clock, Target } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
  moduleNumber?: number;
  title?: string;
  learningGoal?: string;
  estimatedMinutes?: number;
  upNext?: string[];
}

const SEModuleDivider = ({
  slideNumber,
  moduleNumber = 0,
  title = "",
  learningGoal = "",
  estimatedMinutes,
  upNext = [],
  ...narrationProps
}: Props) => (
  <PitchSlideContainer id={`se-module-${moduleNumber}`} slideNumber={slideNumber} {...narrationProps}>
    <div className="h-full flex flex-col justify-center max-w-5xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-[11px] font-mono uppercase tracking-wider text-primary">
          Module {moduleNumber}
        </div>
        {estimatedMinutes && (
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>~{estimatedMinutes} min</span>
          </div>
        )}
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-6">{title}</h2>

      <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 mb-6 max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-4 w-4 text-emerald-400" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">What you'll learn</span>
        </div>
        <p className="text-base text-foreground leading-relaxed">{learningGoal}</p>
      </div>

      {upNext.length > 0 && (
        <div className="flex items-start gap-2 max-w-3xl">
          <BookOpen className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="flex flex-wrap gap-2">
            {upNext.map((s, i) => (
              <span key={i} className="text-[11px] px-2.5 py-1 rounded border border-border bg-card text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </PitchSlideContainer>
);

export default SEModuleDivider;