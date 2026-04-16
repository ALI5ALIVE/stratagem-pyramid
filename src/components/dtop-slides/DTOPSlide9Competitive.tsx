import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { competitorGaps, competitivePositioning } from "@/data/dtopPlaybook";
import { Check, X } from "lucide-react";

const DTOPSlide9Competitive = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="dtop-competitive" title="Why Only Comply365 Can Deliver This" subtitle={competitivePositioning.headline} slideNumber={9} {...props}>
      <div className="h-full flex flex-col gap-4">
        {/* Positioning matrix */}
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-card">
                <th className="text-left p-2.5 text-muted-foreground font-medium">Solution</th>
                {["Detect", "Trigger", "Orchestrate", "Prove"].map((h, i) => (
                  <th key={h} className={`text-center p-2.5 font-semibold ${
                    ["text-blue-400", "text-amber-400", "text-emerald-400", "text-violet-400"][i]
                  }`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitorGaps.map((row, i) => (
                <tr key={i} className={`border-t border-border ${
                  row.competitor.includes("Comply365") ? "bg-primary/5" : ""
                }`}>
                  <td className={`p-2.5 ${row.competitor.includes("Comply365") ? "font-semibold text-primary" : "text-foreground/80"}`}>
                    {row.competitor}
                  </td>
                  {[row.canDetect, row.canTrigger, row.canOrchestrate, row.canProve].map((can, j) => (
                    <td key={j} className="text-center p-2.5">
                      {can ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Moat statements */}
        <div className="grid grid-cols-2 gap-2 flex-1">
          {competitivePositioning.moatStatements.map((s, i) => (
            <div key={i} className="p-3 rounded-lg border border-border bg-card">
              <p className="text-[11px] text-foreground/80 leading-relaxed">{s}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground text-center">{competitivePositioning.explanation}</p>
      </div>
    </SlideContainer>
  );
};

export default DTOPSlide9Competitive;
