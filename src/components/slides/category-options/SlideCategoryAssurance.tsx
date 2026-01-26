import SlideContainer from "../SlideContainer";
import { ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";
import { assuranceData, platformCapabilities } from "./categoryOptionData";

const SlideCategoryAssurance = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const { category, pointOfView, pillars, pros, cons, executiveRationale, categoryPromise } = assuranceData;

  return (
    <SlideContainer
      id="slide-16"
      title="Category Option: Assurance"
      subtitle="Compliance, governance & proof positioning"
      variant="dark"
      slideNumber={16}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-full">
        {/* Left Column: House Structure */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          
          {/* Rooftop: Category Position */}
          <div className="relative">
            <div 
              className="bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 border border-primary/40 rounded-lg p-4 min-h-[100px]"
              style={{
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)"
              }}
            >
              <div className="pt-10 pb-2 text-center px-8">
                <div className="text-[10px] uppercase tracking-widest text-primary/80 mb-1">Category Position</div>
                <h3 className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                  {category.name}
                </h3>
              </div>
            </div>
          </div>

          {/* Category Definition Box */}
          <div className="bg-card/60 border border-border/50 rounded-lg p-3 -mt-2">
            <p className="text-xs text-muted-foreground leading-relaxed text-center">
              {category.definition}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              {category.narrativeSpine.map((step, i) => (
                <div key={step} className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-primary">{step}</span>
                  {i < category.narrativeSpine.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* POV Section */}
          <div className="bg-card/40 border border-border/30 rounded-lg p-3">
            <div className="text-xs uppercase tracking-widest text-accent/80 mb-2">Point of View</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <div className="text-[10px] font-medium text-muted-foreground uppercase">Market Shift</div>
                <p className="text-[11px] text-foreground/80 leading-tight">{pointOfView.marketShift}</p>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-medium text-muted-foreground uppercase">Core Problem</div>
                <p className="text-[11px] text-foreground/80 leading-tight">{pointOfView.coreProblem}</p>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-medium text-muted-foreground uppercase">Opportunity</div>
                <p className="text-[11px] text-foreground/80 leading-tight">{pointOfView.opportunity}</p>
              </div>
            </div>
          </div>

          {/* Four Pillars */}
          <div className="grid grid-cols-4 gap-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.title}
                  className="bg-gradient-to-b from-card/80 to-card/40 border border-border/50 rounded-lg p-2 text-center"
                >
                  <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon className="w-3 h-3 text-primary" />
                  </div>
                  <div className="text-[10px] font-bold text-foreground leading-tight">{pillar.title}</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{pillar.tagline}</div>
                </div>
              );
            })}
          </div>

          {/* Platform Capabilities Foundation */}
          <div className="bg-muted/30 border-t-2 border-primary/50 rounded-b-lg p-3">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 text-center">Platform Capabilities</div>
            <div className="grid grid-cols-3 gap-2">
              {platformCapabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.title} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-foreground">{cap.title}</div>
                      <div className="text-[9px] text-muted-foreground leading-tight">{cap.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Pros, Cons & Rationale */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          
          {/* Pros */}
          <div className="bg-card/60 border border-border/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-xs uppercase tracking-widest text-green-500 font-semibold">Pros</span>
            </div>
            <ul className="space-y-1.5">
              {pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/80">
                  <CheckCircle2 className="w-3 h-3 text-green-500/70 flex-shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-card/60 border border-border/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">Cons</span>
            </div>
            <ul className="space-y-1.5">
              {cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/80">
                  <XCircle className="w-3 h-3 text-red-500/70 flex-shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Executive Rationale */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-3 flex-1">
            <div className="text-[10px] uppercase tracking-wider text-primary/80 mb-2">Executive Rationale</div>
            <p className="text-xs text-foreground/90 leading-relaxed italic">
              "{executiveRationale}"
            </p>
          </div>

          {/* Category Promise */}
          <div className="bg-card/80 border border-accent/40 rounded-lg p-3 text-center">
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground/60 mb-1">Category Promise</div>
            <p className="text-sm font-semibold text-foreground">
              "{categoryPromise}"
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideCategoryAssurance;
