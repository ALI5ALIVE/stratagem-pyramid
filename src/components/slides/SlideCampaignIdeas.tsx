import { 
  AlertTriangle, 
  Workflow, 
  BarChart3, 
  ArrowLeftRight, 
  DollarSign, 
  Brain, 
  Briefcase, 
  ShieldCheck, 
  GraduationCap, 
  Award,
  Target,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface FlagshipCampaign {
  name: string;
  tagline: string;
  keyMessage: string;
  assets: string[];
  successMetric: string;
  icon: React.ElementType;
}

interface SupportingCampaign {
  name: string;
  tagline: string;
  purpose: string;
  icon: React.ElementType;
}

const flagshipCampaigns: FlagshipCampaign[] = [
  {
    name: "Operational Performance Is Broken",
    tagline: "You can't improve performance if safety, procedures, and training don't work as one system.",
    keyMessage: "Create the problem the category exists to solve",
    assets: ["POV Article", "Video", "Board Slide", "Sales Opener"],
    successMetric: "Market talks about performance as a system problem",
    icon: AlertTriangle
  },
  {
    name: "From Signals to Performance",
    tagline: "Detect → Trigger → Orchestrate → Prove",
    keyMessage: "Introduce the operating model that defines the category",
    assets: ["Infographic", "Blog Series", "Sales Deck", "Analyst Brief"],
    successMetric: "Operating model becomes shorthand for improvement",
    icon: Workflow
  },
  {
    name: "The Operational Performance Index",
    tagline: "Where do you stand?",
    keyMessage: "Make the category measurable and real",
    assets: ["Self-Assessment Tool", "Benchmark Report", "Executive Scorecard"],
    successMetric: "Buyers self-identify maturity and want to advance",
    icon: BarChart3
  }
];

const supportingCampaigns: SupportingCampaign[] = [
  {
    name: "From Firefighting to Performance",
    tagline: "Before/After transformation",
    purpose: "Visual & emotional transformation stories",
    icon: ArrowLeftRight
  },
  {
    name: "The Cost of Poor Performance",
    tagline: "Silent profit killers",
    purpose: "Tie category to economic outcomes",
    icon: DollarSign
  },
  {
    name: "AI That Improves Performance",
    tagline: "Not just insight — outcomes",
    purpose: "Differentiate AI story from hype",
    icon: Brain
  },
  {
    name: "COO: Performance = CX",
    tagline: "Operations is the new moat",
    purpose: "COO persona: disruption, trust, revenue",
    icon: Briefcase
  },
  {
    name: "Compliance to Assurance",
    tagline: "Reducing recurrence, closing loop",
    purpose: "Safety/Compliance persona focus",
    icon: ShieldCheck
  },
  {
    name: "Readiness Drives Performance",
    tagline: "Time-to-competency + proof",
    purpose: "Training/Workforce persona focus",
    icon: GraduationCap
  },
  {
    name: "Defining the Category",
    tagline: "Lock externally with analysts",
    purpose: "Gartner, Forrester, influencer relations",
    icon: Award
  }
];

const internalRule = "Every campaign must teach the market what Operational Performance really is, why it's broken today, and why a platform (not a tool) is required to fix it.";

const SlideCampaignIdeas = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
  slideNumber,
}: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="slide-11"
      title="Cementing the Category"
      subtitle="10 campaigns that define Operational Performance in the market"
      variant="dark"
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col h-full gap-3">
        {/* Campaign Hierarchy Strip */}
        <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-lg p-2.5">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Top of Market</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Category education & problem definition</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wide">Mid-Funnel</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Transformation stories & benchmarking</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Bottom-Funnel</span>
              </div>
              <p className="text-[10px] text-muted-foreground">ROI, value justification & close</p>
            </div>
          </div>
        </div>

        {/* Flagship Campaigns Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {flagshipCampaigns.map((campaign, index) => {
            const Icon = campaign.icon;
            return (
              <div 
                key={index}
                className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-3 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground leading-tight">
                      {campaign.name}
                    </h4>
                    <p className="text-xs text-muted-foreground italic mt-1">
                      "{campaign.tagline}"
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-foreground/80 mb-2">
                  {campaign.keyMessage}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {campaign.assets.map((asset, i) => (
                    <span 
                      key={i}
                      className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-muted-foreground border-t border-border/30 pt-2 mt-2">
                  <span className="text-primary">✓</span> {campaign.successMetric}
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Campaigns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-1.5">
          {supportingCampaigns.map((campaign, index) => {
            const Icon = campaign.icon;
            return (
              <div 
                key={index}
                className={cn(
                  "bg-card/40 backdrop-blur-sm border border-border/30 rounded-lg p-3 hover:border-accent/50 transition-colors",
                  index === 6 && "sm:col-span-1"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-[10px] font-medium text-foreground leading-tight truncate">
                    {campaign.name}
                  </span>
                </div>
                <p className="text-[9px] text-muted-foreground italic mb-1 line-clamp-1">
                  "{campaign.tagline}"
                </p>
                <p className="text-[9px] text-foreground/70 line-clamp-2">
                  {campaign.purpose}
                </p>
              </div>
            );
          })}
        </div>

        {/* Internal Rule Banner */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-center mt-auto">
          <p className="text-xs text-foreground/90 italic max-w-4xl mx-auto">
            <span className="text-primary font-semibold">Internal Rule:</span> {internalRule}
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideCampaignIdeas;
