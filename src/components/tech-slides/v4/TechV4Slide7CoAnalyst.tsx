import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import {
  ShieldCheck,
  FileText,
  GraduationCap,
  MessageSquare,
  Network,
  Lightbulb,
} from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const apps = [
  {
    name: "SafetyManager365",
    short: "Safety",
    status: "available" as const,
    icon: ShieldCheck,
    color: "text-rose-300",
    border: "border-rose-500/30",
    bg: "bg-rose-500/5",
    headerBg: "bg-rose-500/10",
  },
  {
    name: "ContentManager365",
    short: "Content",
    status: "pending" as const,
    icon: FileText,
    color: "text-blue-300",
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    headerBg: "bg-blue-500/10",
  },
  {
    name: "TrainingManager365",
    short: "Training",
    status: "pending" as const,
    icon: GraduationCap,
    color: "text-emerald-300",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    headerBg: "bg-emerald-500/10",
  },
] as const;

const capabilities = [
  {
    icon: MessageSquare,
    name: "Ask in plain English",
    blurb: "Natural-language questions answered with cited evidence from the application's own data.",
    cells: [
      "\"Which occurrence categories are trending up this quarter — and where?\"",
      "\"Show me every procedure changed in the last 30 days that affects ground ops.\"",
      "\"Which crew are out of recurrency for dangerous goods next month?\"",
    ],
  },
  {
    icon: Network,
    name: "Cross-domain insight & root cause",
    blurb: "Connect the signals already in the application to surface why something is happening — not just what.",
    cells: [
      "Cluster occurrences by causal factor and link them to the source procedure.",
      "Trace where a manual revision needs to cascade into checklists and job aids.",
      "Spot competency gaps that align with rising hazard reports across a fleet.",
    ],
  },
  {
    icon: Lightbulb,
    name: "Cited answer + the single next step",
    blurb: "Every answer comes with sources and one suggested next step the user can take inside the app — not an autonomous workflow.",
    cells: [
      "Answer cites the source occurrences and offers one next step — open the cluster, log a finding, or flag for review.",
      "Answer cites the affected procedures and offers one next step — open the revision, route to the right reviewer, or compare versions.",
      "Answer cites the at-risk crew and offers one next step — open the recurrency list or draft a refresher assignment for a coordinator to confirm.",
    ],
  },
];

const TechV4Slide7CoAnalyst = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-coanalyst"
    title="The Platform · Insights & Intelligence"
    subtitle="The same intelligence layer — expressed inside every core application."
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-3 min-h-0">
      {/* Column header row */}
      <div className="grid grid-cols-[180px_repeat(3,minmax(0,1fr))] gap-2 shrink-0">
        <div /> {/* spacer for capability label column */}
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.name}
              className={`rounded-lg border ${app.border} ${app.headerBg} px-3 py-2 flex items-center gap-2`}
            >
              <Icon className={`h-4 w-4 ${app.color} shrink-0`} />
              <div className="flex flex-col leading-tight flex-1 min-w-0">
                <span className={`text-xs font-bold ${app.color} truncate`}>{app.name}</span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  {app.short}
                </span>
              </div>
              {app.status === "available" ? (
                <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available
                </span>
              ) : (
                <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Coming Soon
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Capability rows */}
      <div className="flex-1 min-h-0 grid grid-rows-3 gap-2">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <div
              key={cap.name}
              className="grid grid-cols-[180px_repeat(3,minmax(0,1fr))] gap-2"
            >
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-xs font-bold text-primary leading-tight">{cap.name}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-snug">{cap.blurb}</p>
              </div>
              {cap.cells.map((cell, i) => (
                <div
                  key={i}
                  className={`rounded-lg border ${apps[i].border} ${apps[i].bg} p-3 flex items-center`}
                >
                  <p className="text-xs text-foreground leading-snug">{cell}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Footer callout */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-2 flex items-center gap-3 shrink-0">
        <Network className="h-4 w-4 text-amber-300 shrink-0" />
        <p className="text-xs text-foreground leading-snug">
          <span className="font-semibold text-amber-300">Combined across all three applications</span>
          <span className="text-muted-foreground">
            {" "}→ the cross-product, plain-English intelligence shown on the previous slide.
          </span>
        </p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechV4Slide7CoAnalyst;
