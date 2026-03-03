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
    id: "campaign-guides",
    label: "Campaign Guides",
    icon: Map,
    color: "text-amber-400",
    count: 4,
    explainer: "Quarterly guides that frame each campaign theme for demand and sales teams",
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

/* Quarter breakdown for the right panel */
interface QuarterContent {
  label: string;
  theme: string;
  color: string;
  assets: string[];
}

const quarters: QuarterContent[] = [
  {
    label: "Q1",
    theme: "Build the Foundation",
    color: "text-blue-400",
    assets: [
      "Campaign guide: Build the Foundation",
      "Webinar: Connected foundation for operational performance",
      "Decision asset: Operational performance baseline assessment",
      "Worksheet: Baseline assessment worksheet",
      "Executive summary: Foundation executive note",
      "Technical brief: IT and governance brief",
    ],
  },
  {
    label: "Q2",
    theme: "Signal to Action",
    color: "text-amber-400",
    assets: [
      "Campaign guide: Signal to Action",
      "Webinar: Closing the gap between signal and action",
      "Decision asset: Signal-to-action gap diagnostic",
      "Worksheet: Action design worksheet",
      "Executive summary: Signal-to-action executive brief",
      "Technical brief: Compliance action flow briefing",
    ],
  },
  {
    label: "Q3",
    theme: "Continuous Readiness",
    color: "text-emerald-400",
    assets: [
      "Campaign guide: Continuous Readiness",
      "Webinar: Building continuous readiness across functions",
      "Decision asset: Readiness scorecard & workshop pack",
      "Worksheet: Cross-functional workshop template",
      "Executive summary: Readiness as performance protection",
      "Technical brief: Readiness maturity article",
    ],
  },
  {
    label: "Q4",
    theme: "Prove at Scale",
    color: "text-purple-400",
    assets: [
      "Campaign guide: Prove at Scale",
      "Webinar: Proving operational progress without reporting burden",
      "Decision asset: Operational performance business case pack",
      "Worksheet: Expansion business case template",
      "Executive summary: Executive decision brief",
      "Technical brief: IT and compliance technical proof brief",
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
        <div className="col-span-5 flex flex-col gap-1.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="flex items-start gap-2.5 px-3 py-1.5 rounded-lg bg-card/30 border border-border/30"
              >
                <Icon className={cn("w-4 h-4 shrink-0 mt-0.5", cat.color)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{cat.label}</span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">{cat.count}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">{cat.explainer}</p>
                </div>
              </div>
            );
          })}

          {/* Total bar */}
          <div className="mt-auto pt-2 border-t border-border/30 flex items-center justify-between px-3">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Total annual assets</span>
            <span className="text-base font-bold text-primary">{totalAssets}</span>
          </div>
        </div>

        {/* Right: Quarterly breakdown */}
        <div className="col-span-7 flex flex-col gap-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold px-1">Quarterly Production Schedule</p>
          <div className="grid grid-cols-2 gap-2 flex-1 content-start">
            {quarters.map((q) => (
              <div key={q.label} className="bg-card/60 border border-border/50 rounded-lg p-3 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn("text-sm font-bold", q.color)}>{q.label}</span>
                  <span className="text-[11px] text-foreground font-semibold">{q.theme}</span>
                </div>
                <div className="space-y-1 flex-1">
                  {q.assets.map((asset, j) => (
                    <div key={j} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0 mt-1.5" />
                      <span className="text-[10px] text-foreground/80 leading-snug">{asset}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Always-on assets note */}
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
