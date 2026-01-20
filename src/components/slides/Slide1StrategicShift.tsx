import SlideContainer from "./SlideContainer";
import { ArrowRight, AlertTriangle, FileText, GraduationCap, Shield } from "lucide-react";

const Slide1StrategicShift = () => {
  const modernGaps = [
    "Manual coordination across teams (handoffs, spreadsheets, email approvals)",
    "No real-time insight into whether change has been implemented and adopted",
    "Reactive risk handling (issues discovered after disruption, not before)",
    "Procedural drift between documented procedures, training, and actual operations",
    "Duplicated effort and cost across multiple tools and repeated evidence gathering",
  ];

  return (
    <SlideContainer
      id="slide-1"
      title="The Strategic Shift: From 'Compliance Tools' to a New Category"
      subtitle="In mission-critical, regulated operations, disruption and readiness are now board-level outcomes — and fragmented tool stacks can't deliver them."
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Visual: Category Shift */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Old Categories */}
            <div className="flex flex-col gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-lg" />
                <div className="relative bg-card/50 border border-destructive/30 rounded-lg p-4 text-center min-w-[140px]">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-destructive/70" />
                  <span className="text-sm font-medium text-muted-foreground">Safety Tool</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-lg" />
                <div className="relative bg-card/50 border border-destructive/30 rounded-lg p-4 text-center min-w-[140px]">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-destructive/70" />
                  <span className="text-sm font-medium text-muted-foreground">Manuals Tool</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-lg" />
                <div className="relative bg-card/50 border border-destructive/30 rounded-lg p-4 text-center min-w-[140px]">
                  <GraduationCap className="w-8 h-8 mx-auto mb-2 text-destructive/70" />
                  <span className="text-sm font-medium text-muted-foreground">LMS</span>
                </div>
              </div>
              {/* Broken connections */}
              <div className="absolute -right-2 top-1/4 w-8 h-0.5 bg-destructive/50 rotate-45" />
              <div className="absolute -right-2 top-1/2 w-8 h-0.5 bg-destructive/50" />
              <div className="absolute -right-2 top-3/4 w-8 h-0.5 bg-destructive/50 -rotate-45" />
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center py-4 sm:py-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-lg" />
                <ArrowRight className="relative w-12 h-12 text-primary animate-pulse" />
              </div>
            </div>

            {/* New Category */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-xl" />
              <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/50 rounded-xl p-6 text-center min-w-[200px]">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary/40 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-primary" />
                  </div>
                </div>
                <span className="text-base font-bold text-foreground block mb-1">
                  Operational Excellence
                </span>
                <span className="text-sm text-primary font-medium">
                  & Readiness Platform
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content: Why Now */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Why now — the modern operational gap:
            </h3>
            <ul className="space-y-3">
              {modernGaps.map((gap, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                  {gap}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Category we're defining:</p>
            <p className="text-lg font-bold text-primary mb-2">
              Operational Excellence & Readiness Platform
            </p>
            <p className="text-sm text-muted-foreground italic">
              "Connects safety, procedures, and training into a continuous improvement operating system… 
              improving operational excellence, readiness, and customer experience at scale."
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide1StrategicShift;
