import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { TrendingUp, Clock, DollarSign, Heart, ArrowRight, Activity, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import type { SlideNarrationProps } from "@/types/slideProps";

interface CustomerOutcomesSlideProps extends SlideNarrationProps {
  slideNumber?: number;
}

const valueOutcomes = [
  {
    title: "Schedule Protection",
    subtitle: "Fewer disruptions, faster recovery",
    icon: Clock,
    color: "bg-primary",
    borderColor: "border-primary/30",
    bgColor: "bg-primary/5",
    textColor: "text-primary",
    example: {
      signal: "Hard landing trend detected in operational data",
      action: "Targeted pilot retraining deployed",
      result: "Fewer maintenance delays, protected departures",
    },
  },
  {
    title: "Revenue Protection",
    subtitle: "Protect the schedule, protect the revenue",
    icon: TrendingUp,
    color: "bg-emerald-500",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/5",
    textColor: "text-emerald-400",
    example: {
      signal: "Smoke & fumes cluster at regional hub",
      action: "De-icing procedure revised, ground crew retrained",
      result: "92% fewer incidents, schedule maintained",
    },
  },
  {
    title: "Cost Savings",
    subtitle: "Less wear, fewer claims, less rework",
    icon: DollarSign,
    color: "bg-amber-500",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/5",
    textColor: "text-amber-400",
    example: {
      signal: "Training gaps identified via performance data",
      action: "Personalized competency modules assigned",
      result: "Reduced tire wear, fewer landing gear repairs",
    },
  },
  {
    title: "Customer Loyalty",
    subtitle: "Trust through consistent operations",
    icon: Heart,
    color: "bg-violet-500",
    borderColor: "border-violet-500/30",
    bgColor: "bg-violet-500/5",
    textColor: "text-violet-400",
    example: {
      signal: "Procedure confusion pattern detected",
      action: "SOP rewritten with clarity, crew retrained",
      result: "Zero incidents, on-time performance maintained",
    },
  },
];

const CustomerOutcomesSlide = ({
  slideNumber,
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
  onPrevSlide,
}: CustomerOutcomesSlideProps) => {
  const slideId = `customer-outcomes-${slideNumber ?? 0}`;

  return (
    <PitchSlideContainer
      id={slideId}
      title="What This Means for Customers"
      subtitle="Connecting safety signals to measurable business outcomes"
      slideNumber={slideNumber}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
      onPrevSlide={onPrevSlide}
    >
      {/* Executive Value Proposition */}
      <div className="max-w-4xl mx-auto mb-4">
        <div className="bg-card border border-primary/30 rounded-lg p-4 text-center">
          <p className="text-base text-foreground leading-relaxed">
            Connect <span className="text-primary font-semibold">safety signals to business outcomes</span>: 
            protected schedules, protected revenue, lower costs, and loyal customers.
          </p>
        </div>
      </div>

      {/* Cost Center to Revenue Generation */}
      <div className="max-w-3xl mx-auto mb-4">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 text-center p-2 rounded-lg bg-muted/30 border border-muted">
              <DollarSign className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Cost Center</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">Reactive • Siloed</p>
            </div>
            <ArrowRight className="w-4 h-4 text-primary shrink-0" />
            <div className="flex-1 text-center p-2 rounded-lg bg-primary/10 border border-primary/30">
              <Activity className="w-4 h-4 mx-auto text-primary mb-1" />
              <p className="text-[10px] font-semibold text-primary uppercase tracking-wide">Operational Performance</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">Connected • Proactive</p>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="flex-1 text-center p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <TrendingUp className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
              <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide">Revenue Driver</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">Protected • Growing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Four Value Outcome Boxes */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {valueOutcomes.map((outcome, index) => {
          const Icon = outcome.icon;
          return (
            <div key={index} className={`bg-card border ${outcome.borderColor} rounded-xl p-4 ${outcome.bgColor}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg ${outcome.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${outcome.textColor}`}>{outcome.title}</h3>
                  <p className="text-[10px] text-muted-foreground">{outcome.subtitle}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase font-medium text-amber-500 tracking-wide">Signal</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">{outcome.example.signal}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase font-medium text-primary tracking-wide">Action</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">{outcome.example.action}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase font-medium text-emerald-500 tracking-wide">Result</p>
                    <p className="text-[10px] text-foreground font-medium leading-tight">{outcome.example.result}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Platform ROI CTA */}
      <div className="max-w-3xl mx-auto">
        <Link to="/line-of-sight" className="block">
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-lg p-4 flex items-center gap-4 hover:from-primary/30 hover:to-primary/10 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Learn More about the Platform ROI</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Explore the Interactive Calculator to model cost avoidance with your airline's numbers
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </PitchSlideContainer>
  );
};

export default CustomerOutcomesSlide;
