import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Brain } from "lucide-react";

interface ExecSlide4IntelligenceProps extends SlideNarrationProps {
  slideNumber?: number;
}

const precisionData = [
  { level: "Level 1 (~50 categories)", coanalyst: 95, generic: 90 },
  { level: "Level 2 (~200 categories)", coanalyst: 93, generic: 75 },
  { level: "Level 3 (~800 categories)", coanalyst: 92, generic: 55 },
  { level: "Level 4–5 (4,000+)", coanalyst: 90, generic: 35 },
];

const ExecSlide4Intelligence = ({
  slideNumber,
  isPlaying,
  isLoading,
  progress,
  hasCompleted,
  onPlay,
  onPause,
  onNextSlide,
}: ExecSlide4IntelligenceProps) => {
  return (
    <SalesSlideContainer
      id="exec-slide-5"
      title="The Intelligence Layer"
      subtitle="Aviation-specific AI that generative AI can't replicate."
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-8 max-w-3xl mx-auto w-full">
        {/* Hero stat */}
        <div className="flex items-center gap-12 justify-center">
          <div className="text-center">
            <p className="text-6xl font-bold text-primary">90%</p>
            <p className="text-sm text-muted-foreground mt-1">CoAnalyst</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-muted-foreground">vs</p>
          </div>
          <div className="text-center">
             <p className="text-6xl font-bold text-destructive/60">35%</p>
            <p className="text-sm text-muted-foreground mt-1">Generative AI</p>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm max-w-lg">
          Accuracy at <span className="text-foreground font-semibold">4,000+ aviation categories</span> across 5 classification levels — where generic AI hallucinates.
        </p>

        {/* Precision breakdown */}
        <div className="w-full rounded-xl border border-border/50 bg-card/50 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">The Precision Gap</h3>
          </div>
          <div className="space-y-3">
            {precisionData.map((row) => (
              <div key={row.level} className="space-y-1.5">
                <p className="text-xs text-muted-foreground">{row.level}</p>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 h-6 bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${row.coanalyst}%` }}
                    >
                      <span className="text-[10px] font-bold text-primary-foreground">{row.coanalyst}%</span>
                    </div>
                  </div>
                  <div className="flex-1 h-6 bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-destructive/40 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${row.generic}%` }}
                    >
                      <span className="text-[10px] font-bold text-foreground/70">{row.generic}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 text-[10px] text-muted-foreground">
                  <span className="flex-1">CoAnalyst</span>
                  <span className="flex-1">Generic AI</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground italic">
          A 7-figure R&D investment since 2023 — ML + LLMs trained on millions of historical aviation reports.
        </p>
      </div>
    </SalesSlideContainer>
  );
};

export default ExecSlide4Intelligence;
