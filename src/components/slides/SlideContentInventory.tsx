import { BookOpen, FileText, Lightbulb, Mic, ClipboardCheck, Users, Wrench, ShoppingCart, Mail, Share2 } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

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
  { type: "Flagship Report Chapter", icon: BookOpen, color: "text-primary", q1: 1, q2: 1, q3: 1, q4: 1 },
  { type: "Campaign Guide", icon: FileText, color: "text-amber-400", q1: 1, q2: 1, q3: 1, q4: 1 },
  { type: "Webinar", icon: Mic, color: "text-emerald-400", q1: 1, q2: 1, q3: 1, q4: 1 },
  { type: "Decision Asset", icon: ClipboardCheck, color: "text-purple-400", q1: 1, q2: 1, q3: 1, q4: 1 },
  { type: "Education Briefs", icon: Users, color: "text-blue-400", q1: 2, q2: 2, q3: 2, q4: 2 },
  { type: "Thought Leadership Articles", icon: Lightbulb, color: "text-indigo-400", q1: 6, q2: 6, q3: 6, q4: 6 },
  { type: "Practical Tools", icon: Wrench, color: "text-orange-400", q1: 3, q2: 3, q3: 3, q4: 3 },
  { type: "Nurture Content", icon: Mail, color: "text-cyan-400", q1: 1, q2: 1, q3: 1, q4: 1 },
  { type: "Social Content", icon: Share2, color: "text-pink-400", q1: 1, q2: 1, q3: 1, q4: 1 },
  { type: "Sales Enablement", icon: ShoppingCart, color: "text-rose-400", q1: 12, q2: 4, q3: 4, q4: 4 },
];

const quarterMeta = [
  { label: "Q1", theme: "Build the Foundation", months: "Apr–Jun", color: "text-blue-400", borderColor: "border-blue-400" },
  { label: "Q2", theme: "Signals to Action", months: "Jul–Sep", color: "text-amber-400", borderColor: "border-amber-400" },
  { label: "Q3", theme: "Continuous Readiness", months: "Oct–Dec", color: "text-emerald-400", borderColor: "border-emerald-400" },
  { label: "Q4", theme: "Prove at Scale", months: "Jan–Mar", color: "text-purple-400", borderColor: "border-purple-400" },
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
  const qTotals = [0, 1, 2, 3].map((qi) => {
    const qKey = `q${qi + 1}` as keyof AssetRow;
    return assetRows.reduce((sum, r) => sum + (r[qKey] as number), 0);
  });
  const totalAssets = qTotals.reduce((a, b) => a + b, 0);

  return (
    <SlideContainer
      id="slide-content-inventory"
      title="Content Production Inventory"
      subtitle={`${totalAssets} assets across the year — Q1: ${qTotals[0]} · Q2: ${qTotals[1]} · Q3: ${qTotals[2]} · Q4: ${qTotals[3]}`}
      slideNumber={6}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-3 h-full overflow-hidden">
        {/* Quarterly production table */}
        <div className="flex-1 bg-card/60 border border-border/50 rounded-lg overflow-hidden flex flex-col">
          {/* Header */}
          <div className="grid grid-cols-[1fr_repeat(4,90px)] border-b border-border/40">
            <div className="px-3 py-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Asset Type</span>
            </div>
            {quarterMeta.map((qm) => (
              <div key={qm.label} className="px-2 py-2 text-center border-l border-border/30">
                <span className={cn("text-xs font-bold", qm.color)}>{qm.label}</span>
                <p className="text-xs text-muted-foreground leading-tight">{qm.months}</p>
                <p className="text-xs text-muted-foreground/70 leading-tight mt-0.5">{qm.theme}</p>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {assetRows.map((row) => {
            const RowIcon = row.icon;
            const counts = [row.q1, row.q2, row.q3, row.q4];
            return (
              <div key={row.type} className="grid grid-cols-[1fr_repeat(4,90px)] border-b border-border/20 last:border-b-0 hover:bg-card/80 transition-colors">
                <div className="px-3 py-2 flex items-center gap-2">
                  <RowIcon className={cn("w-3.5 h-3.5 shrink-0", row.color)} />
                  <span className="text-xs font-semibold text-foreground">{row.type}</span>
                </div>
                {counts.map((c, i) => (
                  <div key={i} className="px-2 py-2 flex items-center justify-center border-l border-border/20">
                    {c > 0 ? (
                      <span className="text-sm font-bold text-primary">{c}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground/40">—</span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}

          {/* Totals */}
          <div className="grid grid-cols-[1fr_repeat(4,90px)] border-t border-border/40 bg-primary/5">
            <div className="px-3 py-2">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">Quarterly Total</span>
            </div>
            {qTotals.map((total, qi) => (
              <div key={qi} className="px-2 py-2 flex items-center justify-center border-l border-border/20">
                <span className="text-sm font-bold text-primary">{total}</span>
              </div>
            ))}
          </div>

          {/* Derivatives note */}
          <div className="bg-primary/10 border-t border-primary/30 px-4 py-2.5">
            <p className="text-xs text-foreground font-medium leading-snug">
              All primary assets supplied with supporting derivatives as appropriate (social posts, landing pages, emails, nurture sequences).
            </p>
          </div>
        </div>

        {/* Budget + delivery */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card/60 border border-border/40 rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Monthly Budget</p>
            <p className="text-lg font-bold text-primary">£7,000</p>
            <p className="text-xs text-muted-foreground mt-1">Focused, modular, disciplined</p>
          </div>
          <div className="bg-card/60 border border-border/40 rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Monthly Mix</p>
            <div className="space-y-1 mt-1">
              {[
                "1 core asset in development",
                "Supporting derivative assets",
                "1 thought leadership stream",
                "1 buyer or sales support piece",
                "Design & editorial refinement",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  <span className="text-xs text-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card/60 border border-border/40 rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Delivery Model</p>
            <p className="text-xs text-foreground/70 leading-relaxed">
              Content created efficiently, then improved through review and iteration until 
              clear, commercially sharp, and reusable. Every asset must have a clear purpose, 
              audience, and role in the journey before production begins.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideContentInventory;
