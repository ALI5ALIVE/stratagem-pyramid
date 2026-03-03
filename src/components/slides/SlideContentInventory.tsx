import { useState } from "react";
import { FileText, Mic, ClipboardCheck, BookOpen, Users, Wrench, BarChart3, Map } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface ContentCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  count: number;
  cadence: string;
  items: string[];
}

const categories: ContentCategory[] = [
  {
    id: "flagship",
    label: "Flagship Report",
    icon: BookOpen,
    color: "text-primary",
    count: 1,
    cadence: "Annual",
    items: [
      "Flying High Report — 9-chapter anchor asset covering foundation, signals, readiness, proof and AI",
    ],
  },
  {
    id: "campaign-guides",
    label: "Campaign Guides",
    icon: Map,
    color: "text-amber-400",
    count: 4,
    cadence: "Quarterly",
    items: [
      "Q1 — Build the Foundation",
      "Q2 — Signal to Action",
      "Q3 — Continuous Readiness",
      "Q4 — Prove at Scale",
    ],
  },
  {
    id: "webinars",
    label: "Webinars",
    icon: Mic,
    color: "text-emerald-400",
    count: 4,
    cadence: "Quarterly",
    items: [
      "Q1 — Connected foundation for operational performance",
      "Q2 — Closing the gap between signal and action",
      "Q3 — Building continuous readiness across functions",
      "Q4 — Proving operational progress without reporting burden",
    ],
  },
  {
    id: "persona-briefs",
    label: "Persona Briefings",
    icon: Users,
    color: "text-blue-400",
    count: 5,
    cadence: "Reused quarterly",
    items: [
      "Executive briefing template",
      "Safety leader briefing template",
      "Compliance leader briefing template",
      "Training leader guide template",
      "IT / governance brief template",
    ],
  },
  {
    id: "decision-assets",
    label: "Decision Assets",
    icon: ClipboardCheck,
    color: "text-purple-400",
    count: 4,
    cadence: "Quarterly",
    items: [
      "Q1 — Operational performance baseline assessment",
      "Q2 — Signal-to-action gap diagnostic",
      "Q3 — Readiness scorecard & workshop pack",
      "Q4 — Operational performance business case pack",
    ],
  },
  {
    id: "worksheets",
    label: "Worksheets & Diagnostics",
    icon: Wrench,
    color: "text-orange-400",
    count: 4,
    cadence: "Quarterly",
    items: [
      "Q1 — Baseline assessment worksheet",
      "Q2 — Action design worksheet",
      "Q3 — Cross-functional workshop template",
      "Q4 — Expansion business case template",
    ],
  },
  {
    id: "exec-summaries",
    label: "Executive Summaries",
    icon: BarChart3,
    color: "text-rose-400",
    count: 4,
    cadence: "Quarterly",
    items: [
      "Q1 — Foundation executive note",
      "Q2 — Signal-to-action executive brief",
      "Q3 — Readiness as performance protection",
      "Q4 — Executive decision brief",
    ],
  },
  {
    id: "tech-briefs",
    label: "Technical & Governance Briefs",
    icon: FileText,
    color: "text-cyan-400",
    count: 4,
    cadence: "Quarterly",
    items: [
      "Q1 — IT and governance brief",
      "Q2 — Compliance action flow briefing",
      "Q3 — Readiness maturity article",
      "Q4 — IT and compliance technical proof brief",
    ],
  },
  {
    id: "roadmap",
    label: "Year-End Roadmap",
    icon: Map,
    color: "text-yellow-400",
    count: 1,
    cadence: "Annual",
    items: [
      "End-of-year planning asset — roadmap template for the next phase",
    ],
  },
];

const totalAssets = categories.reduce((sum, c) => sum + c.count, 0);

const SlideContentInventory = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <SlideContainer
      id="slide-content-inventory"
      title="Content Production Inventory"
      subtitle={`${totalAssets} assets across 9 categories — strategic, practical, persona-ready`}
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
        {/* Left: Category grid */}
        <div className="col-span-5 flex flex-col gap-2">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = activeCategory === i;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? null : i)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-200 cursor-pointer text-left",
                  isActive
                    ? "bg-card border-primary/50 scale-[1.01]"
                    : "bg-card/30 border-border/30 hover:border-border/60 hover:bg-card/50"
                )}
              >
                <Icon className={cn("w-4 h-4 shrink-0", cat.color)} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-foreground">{cat.label}</div>
                  <div className="text-[10px] text-muted-foreground">{cat.cadence}</div>
                </div>
                <div className={cn(
                  "text-sm font-bold px-2 py-0.5 rounded-full",
                  isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {cat.count}
                </div>
              </button>
            );
          })}

          {/* Total bar */}
          <div className="mt-auto pt-2 border-t border-border/30 flex items-center justify-between px-3">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Total annual assets</span>
            <span className="text-base font-bold text-primary">{totalAssets}</span>
          </div>
        </div>

        {/* Right: Detail panel */}
        <div className="col-span-7 flex flex-col">
          {activeCategory !== null ? (
            <div className="flex-1 bg-card/60 border border-border/50 rounded-lg p-5 flex flex-col">
              {(() => {
                const cat = categories[activeCategory];
                const Icon = cat.icon;
                return (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className={cn("w-5 h-5", cat.color)} />
                      <h3 className="text-base font-bold text-foreground">{cat.label}</h3>
                      <span className="ml-auto text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                        {cat.cadence} · {cat.count} asset{cat.count > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="space-y-2 flex-1">
                      {cat.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-3 bg-background/50 rounded-lg p-3">
                          <span className="text-primary/60 font-mono text-[11px] mt-0.5 shrink-0">{j + 1}.</span>
                          <span className="text-[12px] text-foreground/90 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            /* Default: summary view */
            <div className="flex-1 bg-card/60 border border-border/50 rounded-lg p-5 flex flex-col">
              <h3 className="text-base font-bold text-foreground mb-3">Annual Content Engine</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Select a category to explore individual assets. The full inventory is designed to be strategic enough for leadership, practical enough for operational teams, structured for buying group progression, and consistent with the operational performance messaging framework.
              </p>

              <div className="grid grid-cols-3 gap-2 flex-1 content-start">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div key={cat.id} className="bg-background/50 rounded-lg p-3 flex flex-col items-center text-center gap-1.5">
                      <Icon className={cn("w-5 h-5", cat.color)} />
                      <span className="text-primary text-lg font-bold">{cat.count}</span>
                      <span className="text-[10px] text-muted-foreground leading-tight">{cat.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Principles */}
              <div className="mt-auto pt-3 border-t border-border/30 grid grid-cols-2 gap-2">
                {[
                  "Strategic enough for leadership",
                  "Practical enough for operational teams",
                  "Structured for buying group progression",
                  "Consistent with messaging framework",
                ].map((p, i) => (
                  <div key={i} className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideContentInventory;
