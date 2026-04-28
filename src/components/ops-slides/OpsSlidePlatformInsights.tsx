import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { ShieldCheck, FileText, GraduationCap, MessageSquare, Sparkles, Network } from "lucide-react";

interface OpsSlidePlatformInsightsProps extends SlideNarrationProps {
  slideNumber?: number;
}

const productSources = [
  { icon: ShieldCheck, name: "SafetyManager365", desc: "Occurrences · Audits · Risk", color: "text-rose-300", border: "border-rose-500/30", bg: "bg-rose-500/5" },
  { icon: FileText, name: "ContentManager365", desc: "Procedures · Manuals", color: "text-blue-300", border: "border-blue-500/30", bg: "bg-blue-500/5" },
  { icon: GraduationCap, name: "TrainingManager365", desc: "Competence · Recurrency", color: "text-emerald-300", border: "border-emerald-500/30", bg: "bg-emerald-500/5" },
];

const exampleQuestions = [
  {
    q: "Which procedures correlate with the most safety occurrences this quarter?",
    a: "Cross-references safety events against procedure ownership and recent revisions.",
  },
  {
    q: "Where do training gaps overlap with rising hazard reports?",
    a: "Joins competency records with safety signals to surface at-risk crew populations.",
  },
  {
    q: "Which manual updates have not yet been reflected in training assignments?",
    a: "Traces procedure cascades into outstanding training actions across fleets.",
  },
];

const OpsSlidePlatformInsights = ({ slideNumber, ...narrationProps }: OpsSlidePlatformInsightsProps) => {
  return (
    <SalesSlideContainer
      id="ops-slide-platform-insights"
      title="Platform Insights & Intelligence"
      subtitle="Ask anything across Safety, Content & Training — in plain English."
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Top: three product sources feeding a unified query box */}
        <div className="grid grid-cols-12 gap-3 items-stretch">
          <div className="col-span-5 grid grid-cols-1 gap-2">
            {productSources.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.name} className={`rounded-lg border ${s.border} ${s.bg} px-3 py-2 flex items-center gap-3`}>
                  <Icon className={`h-5 w-5 ${s.color} shrink-0`} />
                  <div>
                    <div className={`text-sm font-semibold ${s.color}`}>{s.name}</div>
                    <div className="text-[10px] text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-span-2 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <Network className="h-6 w-6 text-primary" />
              <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground text-center leading-tight">
                Unified<br />Data<br />Substrate
              </div>
            </div>
          </div>

          <div className="col-span-5 flex">
            <div className="flex-1 rounded-xl border-2 border-primary/40 bg-primary/5 p-3 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Plain-English Query</span>
              </div>
              <p className="text-sm text-foreground italic leading-snug">
                "Show me where safety signals, procedure changes, and training completion don't line up."
              </p>
              <div className="mt-2 text-[10px] text-muted-foreground border-t border-primary/15 pt-2">
                Powered by taxonomy · knowledge graph · aviation LLMs
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: example cross-product questions */}
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-3">
          {exampleQuestions.map((eq, idx) => (
            <div key={idx} className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300">Example</span>
              </div>
              <p className="text-sm font-semibold text-foreground leading-snug mb-2">{eq.q}</p>
              <p className="text-xs text-muted-foreground leading-snug mt-auto">{eq.a}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground text-center italic">
          Powered by the platform's intelligence layer — independent of any single product line.
        </p>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlidePlatformInsights;
