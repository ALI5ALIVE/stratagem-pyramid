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

/* Asset types with icons for the calendar */
interface CalendarAsset {
  type: string;
  title: string;
  icon: React.ElementType;
  color: string;
}

interface QuarterCalendar {
  label: string;
  theme: string;
  themeColor: string;
  borderColor: string;
  months: string[];
  assets: CalendarAsset[];
}

const quarterCalendar: QuarterCalendar[] = [
  {
    label: "Q1",
    theme: "Build the Foundation",
    themeColor: "text-blue-400",
    borderColor: "border-blue-400/40",
    months: ["Jan", "Feb", "Mar"],
    assets: [
      { type: "eGuide", title: "Build the Foundation", icon: FileText, color: "text-amber-400" },
      { type: "Article", title: "Why operational performance now matters more than ever", icon: Lightbulb, color: "text-indigo-400" },
      { type: "Webinar", title: "Connected foundation for operational performance", icon: Mic, color: "text-emerald-400" },
      { type: "Decision", title: "Operational performance baseline assessment", icon: ClipboardCheck, color: "text-purple-400" },
      { type: "Worksheet", title: "Baseline assessment worksheet", icon: Wrench, color: "text-orange-400" },
      { type: "Exec Brief", title: "Foundation executive note", icon: BarChart3, color: "text-rose-400" },
      { type: "Tech Brief", title: "IT and governance brief", icon: FileText, color: "text-cyan-400" },
    ],
  },
  {
    label: "Q2",
    theme: "Signal to Action",
    themeColor: "text-amber-400",
    borderColor: "border-amber-400/40",
    months: ["Apr", "May", "Jun"],
    assets: [
      { type: "eGuide", title: "Signal to Action", icon: FileText, color: "text-amber-400" },
      { type: "Article", title: "How high-performing teams close the signal-to-action gap", icon: Lightbulb, color: "text-indigo-400" },
      { type: "Article", title: "The hidden cost of operational lag", icon: Lightbulb, color: "text-indigo-400" },
      { type: "Webinar", title: "Closing the gap between signal and action", icon: Mic, color: "text-emerald-400" },
      { type: "Decision", title: "Signal-to-action gap diagnostic", icon: ClipboardCheck, color: "text-purple-400" },
      { type: "Worksheet", title: "Action design worksheet", icon: Wrench, color: "text-orange-400" },
      { type: "Exec Brief", title: "Signal-to-action executive brief", icon: BarChart3, color: "text-rose-400" },
      { type: "Tech Brief", title: "Compliance action flow briefing", icon: FileText, color: "text-cyan-400" },
    ],
  },
  {
    label: "Q3",
    theme: "Continuous Readiness",
    themeColor: "text-emerald-400",
    borderColor: "border-emerald-400/40",
    months: ["Jul", "Aug", "Sep"],
    assets: [
      { type: "eGuide", title: "Continuous Readiness", icon: FileText, color: "text-amber-400" },
      { type: "Article", title: "Why readiness must be continuous, not periodic", icon: Lightbulb, color: "text-indigo-400" },
      { type: "Article", title: "Connecting training, compliance and operational change", icon: Lightbulb, color: "text-indigo-400" },
      { type: "Webinar", title: "Building continuous readiness across functions", icon: Mic, color: "text-emerald-400" },
      { type: "Decision", title: "Readiness scorecard & workshop pack", icon: ClipboardCheck, color: "text-purple-400" },
      { type: "Worksheet", title: "Cross-functional workshop template", icon: Wrench, color: "text-orange-400" },
      { type: "Exec Brief", title: "Readiness as performance protection", icon: BarChart3, color: "text-rose-400" },
      { type: "Tech Brief", title: "Readiness maturity article", icon: FileText, color: "text-cyan-400" },
    ],
  },
  {
    label: "Q4",
    theme: "Prove at Scale",
    themeColor: "text-purple-400",
    borderColor: "border-purple-400/40",
    months: ["Oct", "Nov", "Dec"],
    assets: [
      { type: "eGuide", title: "Prove at Scale", icon: FileText, color: "text-amber-400" },
      { type: "Article", title: "How to prove operational progress without reporting burden", icon: Lightbulb, color: "text-indigo-400" },
      { type: "Webinar", title: "Proving operational progress without reporting burden", icon: Mic, color: "text-emerald-400" },
      { type: "Decision", title: "Operational performance business case pack", icon: ClipboardCheck, color: "text-purple-400" },
      { type: "Worksheet", title: "Expansion business case template", icon: Wrench, color: "text-orange-400" },
      { type: "Exec Brief", title: "Executive decision brief", icon: BarChart3, color: "text-rose-400" },
      { type: "Tech Brief", title: "IT and compliance technical proof brief", icon: FileText, color: "text-cyan-400" },
    ],
  },
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
  const [activeQuarter, setActiveQuarter] = useState(0);
  const q = quarterCalendar[activeQuarter];

  return (
    <SlideContainer
      id="slide-content-inventory"
      title="Content Production Inventory"
      subtitle={`${totalAssets} assets across ${categories.length} categories — strategic, practical, persona-ready`}
      slideNumber={15}
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

        {/* Right: Interactive calendar view */}
        <div className="col-span-8 flex flex-col gap-2">
          {/* Quarter selector — calendar-style header */}
          <div className="flex items-stretch gap-0 rounded-lg overflow-hidden border border-border/50">
            {quarterCalendar.map((qc, i) => (
              <button
                key={qc.label}
                onClick={() => setActiveQuarter(i)}
                className={cn(
                  "flex-1 flex flex-col items-center py-2 transition-all duration-200 cursor-pointer border-r last:border-r-0 border-border/30",
                  activeQuarter === i
                    ? "bg-card"
                    : "bg-card/20 hover:bg-card/40"
                )}
              >
                <span className={cn("text-sm font-bold", activeQuarter === i ? qc.themeColor : "text-muted-foreground")}>{qc.label}</span>
                <span className="text-[9px] text-muted-foreground">{qc.months.join(" · ")}</span>
              </button>
            ))}
          </div>

          {/* Active quarter — calendar grid */}
          <div className={cn("flex-1 bg-card/60 border rounded-lg p-4 flex flex-col", q.borderColor)}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className={cn("text-lg font-bold", q.themeColor)}>{q.label}</span>
              <span className="text-sm font-semibold text-foreground">{q.theme}</span>
              <div className="ml-auto flex gap-1">
                {q.months.map((m) => (
                  <span key={m} className="text-[10px] bg-muted/50 text-muted-foreground px-2 py-0.5 rounded font-mono">{m}</span>
                ))}
              </div>
            </div>

            {/* Asset rows — calendar-style */}
            <div className="flex-1 grid grid-cols-3 gap-x-3 gap-y-2 content-start">
              {q.assets.map((asset, j) => {
                const AssetIcon = asset.icon;
                /* Distribute across 3 "month" columns */
                const col = j % 3;
                return (
                  <div
                    key={j}
                    className="bg-background/60 border border-border/30 rounded-lg p-2.5 flex items-start gap-2 hover:border-primary/30 transition-colors"
                    style={{ gridColumn: col + 1 }}
                  >
                    <AssetIcon className={cn("w-3.5 h-3.5 shrink-0 mt-0.5", asset.color)} />
                    <div className="min-w-0">
                      <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">{asset.type}</span>
                      <p className="text-[10px] text-foreground/90 leading-snug">{asset.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Derivatives note */}
            <div className="mt-auto pt-2 border-t border-border/20">
              <p className="text-[9px] text-muted-foreground italic leading-snug">
                All assets supplied with supporting derivatives as appropriate (e.g. social posts, landing pages, emails, nurture sequences etc.)
              </p>
            </div>
          </div>

          {/* Always-on bar */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-2 flex items-start gap-2">
            <BookOpen className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-foreground/80 leading-snug">
              <span className="font-semibold text-primary">Always-on:</span> Flagship Report, 5 Persona Briefings, 6 Thought Leadership Articles and Year-End Roadmap run across all quarters
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideContentInventory;
