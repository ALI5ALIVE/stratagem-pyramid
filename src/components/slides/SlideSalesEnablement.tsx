import { ShoppingCart, FileText, Users, BarChart3, MessageSquare, Briefcase, ChevronRight } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

const enablementAssets = [
  {
    label: "Quarterly Sales Narratives",
    description: "Consistent outcome-led story for each quarter's theme",
    icon: MessageSquare,
    color: "text-blue-400",
    quarterly: true,
  },
  {
    label: "Persona One-Pagers",
    description: "Tailored briefs for executive, safety, compliance, training and IT audiences",
    icon: Users,
    color: "text-amber-400",
    quarterly: false,
  },
  {
    label: "DTOP-to-KPI Mapping Sheet",
    description: "Links the operating model directly to measurable business outcomes",
    icon: BarChart3,
    color: "text-emerald-400",
    quarterly: false,
  },
  {
    label: "Signals-to-Outcomes Explainer",
    description: "Shows how detection becomes coordinated action and proof",
    icon: FileText,
    color: "text-purple-400",
    quarterly: false,
  },
  {
    label: "Objection Handling Guide",
    description: "Addresses concerns around fragmentation, readiness and proof",
    icon: MessageSquare,
    color: "text-rose-400",
    quarterly: false,
  },
  {
    label: "Business Case Support Pack",
    description: "Structured materials for later-stage investment conversations",
    icon: Briefcase,
    color: "text-primary",
    quarterly: false,
  },
];

const conversationShifts = [
  { from: "Feature-led product discussion", to: "Outcome-led commercial conversation" },
  { from: "Why the status quo is limiting performance", to: "How DTOP changes the operating model" },
  { from: "How signals improve action", to: "How readiness becomes measurable" },
  { from: "How proof supports investment", to: "How to scale with confidence" },
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
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold px-1">Enablement Assets</p>
            <div className="space-y-2 flex-1">
              {enablementAssets.map((asset) => {
                const Icon = asset.icon;
                return (
                  <div key={asset.label} className="bg-card/60 border border-border/40 rounded-lg px-4 py-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-card/80 border border-border/30 flex items-center justify-center shrink-0">
                      <Icon className={cn("w-4 h-4", asset.color)} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">{asset.label}</span>
                        {asset.quarterly && (
                          <span className="text-[8px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full font-semibold">QUARTERLY</span>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">{asset.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Conversation shifts */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold px-1">Conversation Shifts</p>
            <div className="bg-card/60 border border-border/50 rounded-xl p-5 flex-1 flex flex-col">
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
                The programme should make it easier for sales teams to explain:
              </p>
              <div className="space-y-3 flex-1">
                {conversationShifts.map((shift, i) => (
                  <div key={i} className="bg-background/50 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-[11px] text-foreground/80 leading-snug">{shift.from}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <ChevronRight className="w-3 h-3 text-rose-400 shrink-0" />
                      <span className="text-[11px] text-foreground font-medium leading-snug">{shift.to}</span>
                    </div>
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
