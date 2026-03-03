import { ShoppingCart, FileText, Users, BarChart3, MessageSquare, Briefcase, Radio, ChevronRight } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

const enablementAssets = [
  {
    label: "Quarterly Sales Narrative Sheets",
    description: "Consistent outcome-led story for each quarter's theme",
    icon: MessageSquare,
    color: "text-blue-400",
  },
  {
    label: "Persona One-Pagers",
    description: "Tailored briefs for executive, safety, compliance, training, and IT audiences",
    icon: Users,
    color: "text-amber-400",
  },
  {
    label: "DTOP-to-KPI Mapping Sheet",
    description: "Links the operating model directly to measurable business outcomes",
    icon: BarChart3,
    color: "text-emerald-400",
  },
  {
    label: "Signals-to-Outcomes Explainer",
    description: "Shows how detection becomes coordinated action and proof",
    icon: Radio,
    color: "text-purple-400",
  },
  {
    label: "Objection Handling Guide",
    description: "Addresses concerns around fragmentation, readiness, and proof",
    icon: MessageSquare,
    color: "text-rose-400",
  },
  {
    label: "Business Case Support Materials",
    description: "Structured materials for later-stage investment or expansion conversations",
    icon: Briefcase,
    color: "text-primary",
  },
];

const conversationShifts = [
  { label: "Why the status quo is limiting performance" },
  { label: "How DTOP changes the operating model" },
  { label: "How signals improve action and accountability" },
  { label: "How readiness becomes more measurable" },
  { label: "How proof supports investment or expansion" },
];

const SlideSalesEnablement = ({
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
      id="slide-sales-enablement"
      title="Sales Enablement Strategy"
      subtitle="From feature-led discussion to outcome-led commercial conversation"
      slideNumber={6}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-4 h-full overflow-hidden">
        {/* Hero statement */}
        <div className="bg-rose-400/10 border border-rose-400/30 rounded-xl px-6 py-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-5 h-5 text-rose-400" />
            <p className="text-[10px] text-rose-400 uppercase tracking-widest font-semibold">Bottom-of-Funnel Support</p>
          </div>
          <p className="text-sm text-foreground leading-relaxed font-medium max-w-4xl">
            Sales enablement content should help frontline teams move from feature-led product discussion 
            to outcome-led commercial conversations — making it easier to explain why the status quo limits 
            performance and how connected operations change the outcome.
          </p>
        </div>

        {/* Two columns */}
        <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
          {/* Enablement assets */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold px-1">Recommended Enablement Content</p>
            <div className="space-y-2 flex-1">
              {enablementAssets.map((asset) => {
                const Icon = asset.icon;
                return (
                  <div key={asset.label} className="bg-card/60 border border-border/40 rounded-lg px-4 py-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-card/80 border border-border/30 flex items-center justify-center shrink-0">
                      <Icon className={cn("w-4 h-4", asset.color)} />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold text-foreground">{asset.label}</span>
                      <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">{asset.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What it should make easier */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold px-1">What It Should Make Easier to Explain</p>
            <div className="bg-card/60 border border-border/50 rounded-xl p-5 flex-1 flex flex-col">
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
                The programme should make it easier for sales teams to explain:
              </p>
              <div className="space-y-3 flex-1">
                {conversationShifts.map((shift, i) => (
                  <div key={i} className="bg-background/50 rounded-lg px-4 py-3 flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="text-[11px] text-foreground font-medium leading-snug">{shift.label}</span>
                  </div>
                ))}
              </div>

              {/* Pipeline note */}
              <div className="mt-auto pt-3 border-t border-border/30">
                <p className="text-[10px] text-foreground/70 leading-relaxed italic">
                  This is where the programme ties most directly back to pipeline progression — 
                  connecting market-level thought leadership to deal-level commercial momentum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideSalesEnablement;
