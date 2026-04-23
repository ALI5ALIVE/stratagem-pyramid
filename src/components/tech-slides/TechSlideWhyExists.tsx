import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { whyItExists } from "@/data/platformPlaybook";
import { Boxes, Database, Lightbulb, Shuffle, Smartphone, FileQuestion } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const icons = [Boxes, Database, Lightbulb, Shuffle, Smartphone, FileQuestion];

/**
 * "Why It Exists" — 6-problem grid framing the fragmentation problem.
 * Sits before the Platform Snapshot in the Tech Deep Dive deck.
 */
const TechSlideWhyExists = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-why-exists"
    title="Why It Exists"
    subtitle={whyItExists.headline}
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 shrink-0">
        <p className="text-sm text-foreground/80">{whyItExists.exposureLabel}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 flex-1 min-h-0">
        {whyItExists.problems.map((problem, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-destructive/70 shrink-0" />
                <h4 className="text-sm font-semibold text-foreground">{problem.label}</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{problem.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlideWhyExists;