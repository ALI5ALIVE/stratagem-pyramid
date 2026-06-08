import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { ShieldCheck, FileText, GraduationCap, Workflow, Sparkles, Layers } from "lucide-react";

type Capability = "intelligence" | "automation" | "recommendations";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
  capability: Capability;
}

interface SolutionCard {
  module: "Safety" | "Content" | "Training";
  body: string;
}

interface PlatformCard {
  headline?: string;
  body: string;
  note?: string;
}

interface CapabilityData {
  title: string;
  subtitle: string;
  perSolution: SolutionCard[] | null; // null => Automation "not applicable"
  platform: PlatformCard[];
}

const DATA: Record<Capability, CapabilityData> = {
  intelligence: {
    title: "Intelligence & Insights — Per-Solution Use Cases",
    subtitle: "Day-to-day chores Intelligence & Insights removes inside each Core App.",
    perSolution: [
      {
        module: "Safety",
        body: "Create a list of safety reports associated with a specific aircraft to send to the lessor for their safety records — formatted to the lessor's requirements and sent electronically on a schedule.",
      },
      {
        module: "Content",
        body: "Create a list of flight crew who haven't synched their mobile devices in the past 30 days — passed to fleet captains for follow-up and compliance.",
      },
      {
        module: "Training",
        body: "Create a list of crew with upcoming training renewals for a specific base, to schedule classroom training.",
      },
    ],
    platform: [],
  },
  automation: {
    title: "Automation — Use Cases",
    subtitle: "Per-solution automation isn't universally available — the value lives at the platform layer.",
    perSolution: null,
    platform: [
      {
        headline: "Trigger Training Updates on Procedure Revision",
        body: "When a new revision of a procedure is published, send a notification to owners of linked training modules to inform them of the revision. Create a task in TrainingManager365 to perform a review and carry out updates.",
        note: "One step in the DTOP cycle.",
      },
      {
        headline: "Trigger Document Updates on Regulation Amendment",
        body: "When a new revision of a regulation is published, trigger a new draft of related procedures with AI-generated content updates — which in turn triggers a document-owner review.",
        note: "Another step in the DTOP cycle.",
      },
      {
        headline: "Trigger Risk Control Review on Deteriorating Training Results",
        body: "When training evaluations fall below a pre-determined threshold, trigger a risk review in SafetyManager365 for the risk controls linked to the associated training module.",
      },
    ],
  },
  recommendations: {
    title: "Platform Recommendations — Use Cases",
    subtitle: "How this shows up per solution and across the platform.",
    perSolution: [
      {
        module: "Safety",
        body: "\"What risk controls would you recommend to mitigate against unstable approach at location X?\"",
      },
      {
        module: "Content",
        body: "\"Based on how users are searching our OMA, what updates do you recommend to make search quicker and easier?\"",
      },
      {
        module: "Training",
        body: "\"What updates would you recommend to our Dangerous Goods training to improve engagement statistics?\"",
      },
    ],
    platform: [
      {
        headline: "\"Where should my attention be focused today?\"",
        body: "Identifies key and emerging risk patterns and recommends actions.",
      },
      {
        headline: "\"How successful was our Just Culture campaign?\"",
        body: "Measures outcomes vs. intended benefits, identifies improvement patterns, and recommends next actions.",
      },
      {
        headline: "\"If we were audited today, where would attention focus?\"",
        body: "Identifies areas of concern and proposes rectification and preventative action.",
      },
    ],
  },
};

const moduleStyle = {
  Safety: { icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  Content: { icon: FileText, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  Training: { icon: GraduationCap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
} as const;

const SECapabilityUseCases = ({ slideNumber, capability, ...narrationProps }: Props) => {
  const data = DATA[capability];
  const wide = data.perSolution === null;
  const showPlatform = data.platform.length > 0;
  const perSolutionSpan = !showPlatform
    ? "lg:col-span-12"
    : wide
      ? "lg:col-span-4"
      : "lg:col-span-5";

  return (
    <SalesSlideContainer
      id={`se-slide-${capability}-usecases`}
      title={data.title}
      subtitle={data.subtitle}
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* PER SOLUTION */}
        <div className={`${perSolutionSpan} flex flex-col gap-3`}>
          <div className="flex items-center gap-2 shrink-0">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Per Solution</span>
          </div>

          {data.perSolution ? (
            <div className={`${showPlatform ? "flex flex-col" : "grid grid-cols-1 lg:grid-cols-3"} gap-3 flex-1 auto-rows-fr`}>
              {data.perSolution.map((card) => {
                const s = moduleStyle[card.module];
                const Icon = s.icon;
                return (
                  <div
                    key={card.module}
                    className={`rounded-xl border ${s.border} ${s.bg} p-4 flex-1 flex flex-col`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-4 w-4 ${s.color}`} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${s.color}`}>
                        {card.module}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{card.body}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-muted/10 p-5 flex-1 flex flex-col justify-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">Not universally available.</span> Automation is delivered
                at the platform layer, where it can close the loop across SafetyManager365, ContentManager365 and
                TrainingManager365 in a single DTOP cycle.
              </p>
            </div>
          )}
        </div>

        {/* PLATFORM */}
        {showPlatform && (
        <div className={wide ? "lg:col-span-8 flex flex-col gap-3" : "lg:col-span-7 flex flex-col gap-3"}>
          <div className="flex items-center gap-2 shrink-0">
            {capability === "automation" ? (
              <Workflow className="h-4 w-4 text-primary" />
            ) : (
              <Sparkles className="h-4 w-4 text-primary" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Platform</span>
          </div>

          <div className="flex flex-col gap-3 flex-1 auto-rows-fr">
            {data.platform.map((card, i) => (
              <div
                key={i}
                className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex-1 flex gap-3 items-start"
              >
                <div className="shrink-0 w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary">
                  {i + 1}
                </div>
                <div className="min-w-0 flex flex-col gap-1">
                  {card.headline && (
                    <p className="text-sm font-semibold text-foreground leading-snug">{card.headline}</p>
                  )}
                  <p className="text-sm text-foreground leading-relaxed">{card.body}</p>
                  {card.note && (
                    <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                      {card.note}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </SalesSlideContainer>
  );
};

export default SECapabilityUseCases;