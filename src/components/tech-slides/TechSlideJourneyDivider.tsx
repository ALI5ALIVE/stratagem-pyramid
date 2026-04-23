import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export type JourneyStage = "today" | "near" | "long";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
  id: string;
  title: string;
  tagline: string;
  activeStage: JourneyStage;
  upNext: string[];
}

const stages: { key: JourneyStage; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "near", label: "Near term" },
  { key: "long", label: "Long term" },
];

const TechSlideJourneyDivider = ({
  id,
  slideNumber,
  title,
  tagline,
  activeStage,
  upNext,
  ...narrationProps
}: Props) => {
  return (
    <SalesSlideContainer
      id={id}
      slideNumber={slideNumber}
      showHeader={false}
      {...narrationProps}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center flex-1 min-h-0">
        {/* Left: eyebrow + title + tagline + up next */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            The Journey Ahead
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {tagline}
          </p>
          <div className="mt-2">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-2">
              Up next in this section
            </div>
            <ul className="space-y-1.5">
              {upNext.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground/90">
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: horizontal stepper Today → Near term → Long term */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-1 text-right">
            Where we're going
          </div>
          <div className="flex items-center justify-between gap-2">
            {stages.map((s, i) => {
              const isActive = s.key === activeStage;
              return (
                <div key={s.key} className="flex items-center gap-2 flex-1">
                  <div
                    className={cn(
                      "flex-1 rounded-lg border px-3 py-3 text-center transition-all",
                      isActive
                        ? "bg-primary/10 border-primary/50 ring-1 ring-primary/30"
                        : "bg-muted/5 border-muted/15 opacity-40"
                    )}
                  >
                    <div className={cn("text-xs font-semibold", isActive ? "text-primary" : "text-muted-foreground")}>
                      {s.label}
                    </div>
                  </div>
                  {i < stages.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlideJourneyDivider;