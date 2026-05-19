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
    title: "Intelligence & Insights — Use Cases",
    subtitle: "How this shows up per solution and across the platform.",
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
    platform: [
      { body: "\"Show me a correlation between recent safety trends and training deficiencies.\"" },
      { body: "\"How are we performing with the recent updates to the Dangerous Goods manual? Has the resulting training led to fewer incidents?\"" },
      { body: "\"Are we ready for the upcoming Part 145 audit?\"" },
    ],
  },
  automation: {
    title: "Automation — Use Cases",
    subtitle: "Per-solution automation isn't universally available — the value lives at the platform layer.",
    perSolution: null,
    platform: [
      {
        headline: "Trigger Training Updates on Procedure Revision",
        body: "When a new procedure revision is published, notify owners of linked training modules and create a review-and-update task in TrainingManager365.",
        note: "One step in the DTOP cycle.",
      },
      {
        headline: "Trigger Document Updates on Regulation Amendment",
        body: "When a regulation revision is published, draft updated procedures with AI-generated content for document-owner review.",
        note: "Another step in the DTOP cycle.",
      },
      {
        headline: "Trigger Risk Control Review on Deteriorating Training Results",
        body: "When training evaluations fall below a threshold, trigger a SafetyManager365 risk review for the controls linked to that training module.",
      },
    ],
  },
  recommendations: {
    title: "Recommendations & Prescriptive Actions — Use Cases",
    subtitle: "How this shows up per solution and across the platform.",
    perSolution: [
      {
        module: "Safety",
        body: "\"What risk controls would you recommend to mitigate unstable approach at location X?\"",
      },
      {
        module: "Content",
        body: "\"Based on how users search the OMA, what updates would make search faster and easier?\"",
      },
      {
        module: "Training",
        body: "\"What updates would you recommend to our Dangerous Goods training to improve engagement?\"",
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
        <div className={wide ? "lg:col-span-4 flex flex-col gap-3" : "lg:col-span-5 flex flex-col gap-3"}>
          <div className="flex items-center gap-2 shrink-0">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Per Solution</span>
          </div>

          {data.perSolution ? (
            <div className="flex flex-col gap-3 flex-1 auto-rows-fr">
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
      </div>
    </SalesSlideContainer>
  );
};

export default SECapabilityUseCases;