import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import DeepDiveLink from "@/components/shared/DeepDiveLink";
import {
  solutionOverview,
  painPoints,
  valuePillars,
  positioning,
  dtopMapping,
} from "@/data/regulationManagementPlaybook";
import {
  FileSpreadsheet,
  AlertTriangle,
  Unlink,
  Eye,
  Network,
  Shield,
} from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const problemIcons = [FileSpreadsheet, AlertTriangle, Unlink];
const pillarIcons = [Eye, Network, Shield];

/**
 * Single-slide summary of the Regulation Management solution.
 * Replaces the 6 cloned RM slides in the Tech Deep Dive and links out
 * to the full Regulation Management Playbook via DeepDiveLink.
 */
const TechSlideRegulationSummary = ({ slideNumber, ...narrationProps }: Props) => {
  const problems = painPoints.slice(0, 2);
  const pillars = valuePillars.slice(0, 2);

  return (
    <SalesSlideContainer
      id="tech-slide-regulation"
      title="Regulation Management"
      subtitle={solutionOverview.tagline}
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        {/* Top banner — elevator pitch + narrative arc */}
        <div className="p-3 rounded-xl border border-primary/30 bg-primary/5 shrink-0">
          <p className="text-sm text-foreground/90 leading-relaxed">
            {solutionOverview.elevatorPitch}
          </p>
          <p className="text-xs font-semibold text-primary mt-2 tracking-wide uppercase">
            {solutionOverview.narrativeArc}
          </p>
        </div>

        {/* DTOP strip — RM as a first-class expression of the operating model */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 shrink-0">
          {dtopMapping.map((s) => (
            <div
              key={s.step}
              className={`border ${s.border} ${s.bg} rounded-lg p-2 flex gap-2 items-start`}
            >
              <div
                className={`h-7 w-7 rounded-md ${s.border} border flex items-center justify-center shrink-0`}
              >
                <span className={`text-sm font-bold ${s.text}`}>{s.step}</span>
              </div>
              <div className="min-w-0">
                <h4 className={`text-[11px] font-bold uppercase tracking-wider ${s.text}`}>
                  {s.label}
                </h4>
                <p className="text-[10px] text-foreground/80 leading-snug mt-0.5">
                  {s.whatHappens.split(/\.\s/)[0]}.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column: Problem | Value Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-0">
          {/* The Problem */}
          <div className="flex flex-col gap-2 min-h-0">
            <h3 className="text-xs font-bold text-destructive uppercase tracking-wider">
              The Problem Today
            </h3>
            <div className="flex flex-col gap-2 flex-1">
              {problems.map((p, i) => {
                const Icon = problemIcons[i];
                return (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg border border-destructive/30 bg-destructive/5 flex gap-2.5"
                  >
                    <Icon className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-foreground">
                        {p.headline}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                        {p.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Value Pillars */}
          <div className="flex flex-col gap-2 min-h-0">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
              The Three Value Pillars
            </h3>
            <div className="flex flex-col gap-2 flex-1">
              {pillars.map((p, i) => {
                const Icon = pillarIcons[i];
                return (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg border border-primary/30 bg-card"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary shrink-0" />
                      <h4 className="text-sm font-semibold text-foreground">
                        {p.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug mt-1">
                      {p.description}
                    </p>
                    {p.metrics && (
                      <p className="text-[11px] font-semibold text-primary mt-1.5">
                        {p.metrics}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer — key framing + deep-dive link */}
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/50 shrink-0">
          <p className="text-xs text-muted-foreground italic flex-1 min-w-0">
            {positioning.keyFraming}
          </p>
          <DeepDiveLink
            to="/regulation-management"
            label="Regulation Management Playbook"
            returnLabel="Back to Tech Deep Dive"
          />
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlideRegulationSummary;
