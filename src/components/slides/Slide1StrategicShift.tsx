import SlideContainer from "./SlideContainer";
import { ArrowRight, AlertTriangle, FileText, GraduationCap, Shield } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

const Slide1StrategicShift = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const modernGaps = [
    "Signals scattered across siloed systems — no unified view of operational risk",
    "No automated trigger when a procedure, training, or safety gap is detected",
    "Manual coordination slows change — handoffs, spreadsheets, email approvals",
    "Procedural drift between what's documented, trained, and actually done",
    "Audit evidence gathered reactively — duplicated effort, incomplete proof",
  ];

  return (
    <SlideContainer
      id="slide-1"
      title="The Strategic Shift"
      subtitle="From fragmented point tools to a connected, intelligent, and predictive platform"
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-start">
        {/* Visual: Category Shift */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            {/* Old Categories */}
            <div className="flex flex-col gap-4">
              <div className="relative">
                <div className="relative bg-card border border-destructive/40 rounded-lg p-5 text-center min-w-[160px]">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-destructive" />
                  <span className="text-sm font-medium text-muted-foreground">Safety Tool</span>
                </div>
              </div>
              <div className="relative">
                <div className="relative bg-card border border-destructive/40 rounded-lg p-5 text-center min-w-[160px]">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-destructive" />
                  <span className="text-sm font-medium text-muted-foreground">Manuals Tool</span>
                </div>
              </div>
              <div className="relative">
                <div className="relative bg-card border border-destructive/40 rounded-lg p-5 text-center min-w-[160px]">
                  <GraduationCap className="w-8 h-8 mx-auto mb-2 text-destructive" />
                  <span className="text-sm font-medium text-muted-foreground">TMS</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center py-4 sm:py-0">
              <div className="relative">
                <ArrowRight className="relative w-12 h-12 text-primary" />
              </div>
            </div>

            {/* New Category */}
            <div className="relative">
              <div className="relative bg-primary/10 border-2 border-primary rounded-xl p-8 text-center min-w-[220px]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary/40 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-primary" />
                  </div>
                </div>
                <span className="text-lg font-bold text-foreground block mb-1">
                  Operational Performance
                </span>
                <span className="text-sm text-primary font-medium">
                  Platform
                </span>
                <span className="text-xs text-muted-foreground mt-2 block">
                  for Safety, Content, and Training
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content: Why Now */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              The operational gap point tools can't close:
            </h3>
            <ul className="space-y-3">
              {modernGaps.map((gap, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {gap}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-5">
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Category we're defining:</p>
            <p className="text-xl font-bold text-foreground mb-2">
              Operational Performance Platform
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              A connected, intelligent, and predictive platform that turns signals into 
              orchestrated change and measurable outcomes.
            </p>
            <p className="text-xs text-foreground/80 italic border-t border-primary/20 pt-3">
              Unlike point solutions that manage safety, content, or training in isolation, 
              Comply365 connects all three into one governed platform.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide1StrategicShift;
