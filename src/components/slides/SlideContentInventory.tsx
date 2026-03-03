import { useState } from "react";
import { FileText, Mic, ClipboardCheck, BookOpen, Users, Wrench, BarChart3, Map, Lightbulb } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface ContentCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  count: number;
  explainer: string;
}

const categories: ContentCategory[] = [
  {
    id: "flagship",
    label: "Flagship Report",
    icon: BookOpen,
    color: "text-primary",
    count: 1,
    explainer: "The anchor asset for the year — a 9-chapter report driving awareness and engagement",
  },
  {
    id: "campaign-eguides",
    label: "Campaign eGuides",
    icon: FileText,
    color: "text-amber-400",
    count: 4,
    explainer: "Quarterly whitepapers framing each campaign theme with research, insight and a clear point of view",
  },
  {
    id: "thought-leadership",
    label: "Thought Leadership Articles",
    icon: Lightbulb,
    color: "text-indigo-400",
    count: 6,
    explainer: "Deep-dive articles positioning Comply365 as a category authority across key themes",
  },
  {
    id: "webinars",
    label: "Webinars",
    icon: Mic,
    color: "text-emerald-400",
    count: 4,
    explainer: "Live sessions creating engagement and pipeline around each quarterly theme",
  },
  {
    id: "persona-briefs",
    label: "Persona Briefings",
    icon: Users,
    color: "text-blue-400",
    count: 5,
    explainer: "Role-specific briefs tailored for executive, safety, compliance, training and IT buyers",
  },
  {
    id: "decision-assets",
    label: "Decision Assets",
    icon: ClipboardCheck,
    color: "text-purple-400",
    count: 4,
    explainer: "Practical tools that help buying groups evaluate, score and build internal business cases",
  },
  {
    id: "worksheets",
    label: "Worksheets & Diagnostics",
    icon: Wrench,
    color: "text-orange-400",
    count: 4,
    explainer: "Hands-on templates that drive internal workshops and cross-functional alignment",
  },
  {
    id: "exec-summaries",
    label: "Executive Summaries",
    icon: BarChart3,
    color: "text-rose-400",
    count: 4,
    explainer: "One-page strategic briefs designed for time-poor senior leaders",
  },
  {
    id: "tech-briefs",
    label: "Technical & Governance Briefs",
    icon: FileText,
    color: "text-cyan-400",
    count: 4,
    explainer: "IT and compliance-focused assets covering integration, governance and proof",
  },
  {
    id: "roadmap",
    label: "Year-End Roadmap",
    icon: Map,
    color: "text-yellow-400",
    count: 1,
    explainer: "An end-of-year planning asset helping customers map the next phase of adoption",
  },
];

const totalAssets = categories.reduce((sum, c) => sum + c.count, 0);

/* Quarterly inventory — counts per asset type */
interface AssetRow {
  type: string;
  icon: React.ElementType;
  color: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

const assetRows: AssetRow[] = [
  { type: "Flagship Report", icon: BookOpen, color: "text-primary", q1: 1, q2: 0, q3: 0, q4: 0 },
  { type: "Campaign eGuide", icon: FileText, color: "text-amber-400", q1: 1, q2: 1, q3: 1, q4: 1 },
  { type: "Thought Leadership Articles", icon: Lightbulb, color: "text-indigo-400", q1: 6, q2: 6, q3: 6, q4: 6 },
  { type: "Webinar", icon: Mic, color: "text-emerald-400", q1: 1, q2: 1, q3: 1, q4: 1 },
  { type: "Persona Briefings", icon: Users, color: "text-blue-400", q1: 5, q2: 0, q3: 0, q4: 0 },
  { type: "Decision Asset", icon: ClipboardCheck, color: "text-purple-400", q1: 1, q2: 1, q3: 1, q4: 1 },
  { type: "Worksheet / Diagnostic", icon: Wrench, color: "text-orange-400", q1: 1, q2: 1, q3: 1, q4: 1 },
  { type: "Executive Summary", icon: BarChart3, color: "text-rose-400", q1: 1, q2: 1, q3: 1, q4: 1 },
  { type: "Technical / Governance Brief", icon: FileText, color: "text-cyan-400", q1: 1, q2: 1, q3: 1, q4: 1 },
];

const quarterMeta = [
  { label: "Q1", theme: "Build the Foundation", months: "Apr · May · Jun", color: "text-blue-400", borderColor: "border-blue-400" },
  { label: "Q2", theme: "Signal to Action", months: "Jul · Aug · Sep", color: "text-amber-400", borderColor: "border-amber-400" },
  { label: "Q3", theme: "Continuous Readiness", months: "Oct · Nov · Dec", color: "text-emerald-400", borderColor: "border-emerald-400" },
  { label: "Q4", theme: "Prove at Scale", months: "Jan · Feb · Mar", color: "text-purple-400", borderColor: "border-purple-400" },
];

const SlideContentInventory = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="slide-content-inventory"
      title="Content Production Inventory"
      subtitle={`${totalAssets} assets across ${categories.length} categories — strategic, practical, persona-ready`}
      slideNumber={5}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 grid grid-cols-12 gap-4 h-full overflow-hidden">
        {/* Left: Category list with explainers */}
        <div className="col-span-4 flex flex-col gap-1.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="flex items-start gap-2 px-2.5 py-1.5 rounded-lg bg-card/30 border border-border/30"
              >
                <Icon className={cn("w-3.5 h-3.5 shrink-0 mt-0.5", cat.color)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-foreground">{cat.label}</span>
                    <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">{cat.count}</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-snug mt-0.5">{cat.explainer}</p>
                </div>
              </div>
            );
          })}
          <div className="mt-auto pt-2 border-t border-border/30 flex items-center justify-between px-2.5">
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">Total annual assets</span>
            <span className="text-sm font-bold text-primary">{totalAssets}</span>
          </div>
        </div>

        {/* Right: Quarterly inventory table */}
        <div className="col-span-8 flex flex-col gap-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold px-1">Quarterly Production Schedule</p>

          {/* Table */}
          <div className="flex-1 bg-card/60 border border-border/50 rounded-lg overflow-hidden flex flex-col">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_repeat(4,80px)] border-b border-border/40">
              <div className="px-3 py-2">
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">Asset Type</span>
              </div>
              {quarterMeta.map((qm) => (
                <div key={qm.label} className="px-2 py-2 text-center border-l border-border/30">
                  <span className={cn("text-xs font-bold", qm.color)}>{qm.label}</span>
                  <p className="text-[8px] text-muted-foreground leading-tight">{qm.months}</p>
                  <p className="text-[8px] text-muted-foreground/70 leading-tight mt-0.5">{qm.theme}</p>
                </div>
              ))}
            </div>

            {/* Data rows */}
            {assetRows.map((row) => {
              const RowIcon = row.icon;
              const counts = [row.q1, row.q2, row.q3, row.q4];
              return (
                <div key={row.type} className="grid grid-cols-[1fr_repeat(4,80px)] border-b border-border/20 last:border-b-0 hover:bg-card/80 transition-colors">
                  <div className="px-3 py-2 flex items-center gap-2">
                    <RowIcon className={cn("w-3.5 h-3.5 shrink-0", row.color)} />
                    <span className="text-[10px] font-semibold text-foreground">{row.type}</span>
                  </div>
                  {counts.map((c, i) => (
                    <div key={i} className="px-2 py-2 flex items-center justify-center border-l border-border/20">
                      {c > 0 ? (
                        <span className="text-sm font-bold text-primary">{c}</span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground/40">—</span>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}

            {/* Totals row */}
            <div className="grid grid-cols-[1fr_repeat(4,80px)] border-t border-border/40 bg-primary/5">
              <div className="px-3 py-2">
                <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">Quarterly Total</span>
              </div>
              {[0, 1, 2, 3].map((qi) => {
                const qKey = `q${qi + 1}` as keyof AssetRow;
                const total = assetRows.reduce((sum, r) => sum + (r[qKey] as number), 0);
                return (
                  <div key={qi} className="px-2 py-2 flex items-center justify-center border-l border-border/20">
                    <span className="text-sm font-bold text-primary">{total}</span>
                  </div>
                );
              })}
            </div>

            {/* Derivatives note — prominent, inside the table */}
            <div className="bg-primary/10 border-t border-primary/30 px-4 py-2.5">
              <p className="text-[10px] text-foreground font-medium leading-snug">
                All assets supplied with supporting derivatives as appropriate (e.g. social posts, landing pages, emails, nurture sequences etc.)
              </p>
            </div>
          </div>

          {/* Always-on note */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-1.5 flex items-start gap-2">
            <BookOpen className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <p className="text-[9px] text-foreground/80 leading-snug">
              <span className="font-semibold text-primary">Always-on:</span> Flagship Report and Year-End Roadmap run across all quarters
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideContentInventory;
