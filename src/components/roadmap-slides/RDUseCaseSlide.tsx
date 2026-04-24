import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { RoadmapUseCase, phaseMeta, statusMeta } from "@/data/roadmapUseCases";
import { CheckCircle2, AlertTriangle, Wrench, Sparkles } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
  id: string;
  useCase: RoadmapUseCase;
}

const dtopSteps = [
  { key: "detect", letter: "D", label: "Detect", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30", dot: "bg-sky-400" },
  { key: "trigger", letter: "T", label: "Trigger", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30", dot: "bg-amber-400" },
  { key: "orchestrate", letter: "O", label: "Orchestrate", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", dot: "bg-purple-400" },
  { key: "prove", letter: "P", label: "Prove", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30", dot: "bg-emerald-400" },
] as const;

const RDUseCaseSlide = ({ slideNumber, id, useCase, ...narrationProps }: Props) => {
  const phase = phaseMeta[useCase.phase];
  const status = statusMeta[useCase.status];

  return (
    <SalesSlideContainer id={id} showHeader={false} slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Header */}
        <div className="space-y-2 shrink-0">
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider">
            <span className={`px-2 py-0.5 rounded-full border ${phase.border} ${phase.bg} ${phase.color} font-semibold`}>
              {phase.label} · {phase.theme}
            </span>
            <span className="px-2 py-0.5 rounded-full border border-border/40 bg-muted/20 text-muted-foreground">
              {useCase.layer}
            </span>
            <span className={`px-2 py-0.5 rounded-full border border-border/40 bg-muted/20 ${status.color} font-semibold`}>
              {status.icon} {status.label}
            </span>
            <span className="text-muted-foreground/70">
              Use case {useCase.slideNumber}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight">
            <span className="title-accent">{useCase.title}</span>
          </h2>
          <p className="text-base text-primary max-w-4xl leading-snug">{useCase.oneLiner}</p>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0 auto-rows-fr">
          {/* Problem today */}
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-3.5 flex flex-col gap-2 min-h-0">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                Problem today
              </span>
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">{useCase.problemToday}</p>
          </div>

          {/* What we're delivering */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-3.5 flex flex-col gap-2 min-h-0">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-primary" />
              <span className="text-[11px] uppercase tracking-wider text-primary font-semibold">
                What we are delivering
              </span>
            </div>
            <ul className="space-y-1.5">
              {useCase.whatWereDelivering.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/85 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer outcomes */}
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-3.5 flex flex-col gap-2 min-h-0">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                Customer outcomes
              </span>
            </div>
            <ul className="space-y-1.5">
              {useCase.customerOutcomes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/85 leading-snug">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DTOP strip */}
        <div className="rounded-xl border border-border/40 bg-muted/10 p-3 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              DTOP — How it flows
            </span>
            <span className="text-[11px] text-muted-foreground/70">
              Modules: {useCase.modules.join(" · ")}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {dtopSteps.map((step) => (
              <div key={step.key} className={`rounded-lg border ${step.border} ${step.bg} p-2.5 flex flex-col gap-1`}>
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-md ${step.dot} text-background text-[11px] font-bold flex items-center justify-center`}>
                    {step.letter}
                  </span>
                  <span className={`text-[11px] uppercase tracking-wider font-semibold ${step.color}`}>
                    {step.label}
                  </span>
                </div>
                <p className="text-xs text-foreground/85 leading-snug">
                  {useCase.dtop[step.key as keyof typeof useCase.dtop]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default RDUseCaseSlide;