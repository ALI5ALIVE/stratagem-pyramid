import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { elevatorPitch } from "@/data/insightsPlaybook";
import {
  ArrowRight,
  MessageSquareQuote,
  Sparkles,
  MessageSquare,
  Database,
  Network,
  Brain,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";

interface IRSlide2WhatIsProps extends SlideNarrationProps {
  title?: string;
  subtitle?: string;
  showWorkflow?: boolean;
}

const workflow = [
  {
    icon: MessageSquare,
    label: "Plain-English question",
    desc: "Captured in-app and parsed against the aviation taxonomy.",
    color: "text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
  },
  {
    icon: Database,
    label: "Connected operational data",
    desc: "Safety, content, training & ops pulled into a unified, tenant-isolated context.",
    color: "text-sky-300",
    border: "border-sky-500/30",
    bg: "bg-sky-500/5",
  },
  {
    icon: Network,
    label: "Domain knowledge graph",
    desc: "4,000+ aviation categories at 5 levels link entities, events and procedures.",
    color: "text-violet-300",
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
  },
  {
    icon: Brain,
    label: "Domain-trained reasoning",
    desc: "Aviation ML models guide the LLM — cited evidence, no hallucinated micro-classifications.",
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/5",
  },
  {
    icon: ShieldCheck,
    label: "Guardrails & audit trail",
    desc: "Tenant isolation, source citations, full traceability for every answer.",
    color: "text-emerald-300",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
  },
  {
    icon: Lightbulb,
    label: "Insight + Recommended Action",
    desc: "Plain-English answer plus the next best action, ready to trigger in-app.",
    color: "text-rose-300",
    border: "border-rose-500/30",
    bg: "bg-rose-500/5",
  },
];

const IRSlide2WhatIs = ({ title, subtitle, showWorkflow, ...props }: IRSlide2WhatIsProps) => {
  return (
    <SlideContainer
      id="ir-what"
      title={title ?? "What It Is"}
      subtitle={subtitle ?? "A platform-wide intelligence capability — just by asking"}
      slideNumber={2}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="p-3 rounded-xl border border-primary/30 bg-primary/5 shrink-0">
          <p className="text-sm text-foreground leading-relaxed">{elevatorPitch.oneLiner}</p>
        </div>

        {!showWorkflow && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 flex-shrink-0">
            {elevatorPitch.shifts.map((s, i) => (
              <div key={i} className="p-3 rounded-lg border border-border bg-card flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">From</span>
                <span className="text-xs text-muted-foreground line-through decoration-destructive/60">{s.from}</span>
                <span className="text-[10px] uppercase tracking-wider text-primary">To</span>
                <span className="text-xs font-semibold text-foreground">{s.to}</span>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 shrink-0">
          <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MessageSquareQuote className="h-4 w-4 text-amber-400" />
              <span className="text-[10px] uppercase tracking-wider text-amber-300 font-medium">Ask</span>
            </div>
            <p className="text-base font-display text-foreground leading-snug">
              "{elevatorPitch.exampleQuestion}"
            </p>
          </div>
          <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-medium">Get back</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{elevatorPitch.exampleAnswer}</p>
          </div>
        </div>

        {showWorkflow ? (
          <div className="flex-1 min-h-0 flex flex-col gap-2">
            <div className="flex items-center justify-between shrink-0">
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
                How it works · behind the answer
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-primary font-medium">
                6 stages · seconds end-to-end
              </span>
            </div>
            <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-6 gap-2">
              {workflow.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.label}
                    className={`relative rounded-lg border ${step.border} ${step.bg} p-2.5 flex flex-col`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <Icon className={`h-4 w-4 ${step.color}`} />
                      <span className="text-[9px] font-mono text-muted-foreground">0{i + 1}</span>
                    </div>
                    <span className={`text-[11px] font-bold ${step.color} leading-tight mb-1`}>
                      {step.label}
                    </span>
                    <p className="text-[10px] text-muted-foreground leading-snug">{step.desc}</p>
                    {i < workflow.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/60" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Question</span>
            <ArrowRight className="h-3 w-3" />
            <span>Connected data</span>
            <ArrowRight className="h-3 w-3" />
            <span>Generative AI</span>
            <ArrowRight className="h-3 w-3" />
            <span className="text-primary">Insights + Recommended Actions</span>
          </div>
        )}
      </div>
    </SlideContainer>
  );
};

export default IRSlide2WhatIs;
