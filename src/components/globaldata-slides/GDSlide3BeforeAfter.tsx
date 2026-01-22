import GDSlideContainer from "./GDSlideContainer";
import { Layers, MessageSquareWarning, Clock, Zap, Database, CheckCircle2, ArrowRight, AlertTriangle, TrendingUp } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

const beforeItems = [
  { icon: Layers, label: "Siloed insights", desc: "Fragmented across tools" },
  { icon: MessageSquareWarning, label: "Different taxonomies", desc: "No common language" },
  { icon: Clock, label: "Manual reconciliation", desc: "Time-consuming alignment" },
  { icon: AlertTriangle, label: "Slow, debated decisions", desc: "Analysis paralysis" },
];

const afterItems = [
  { icon: Database, label: "Unified system", desc: "One connected platform" },
  { icon: CheckCircle2, label: "Shared truth", desc: "Single taxonomy" },
  { icon: Zap, label: "Embedded workflows", desc: "Automated orchestration" },
  { icon: TrendingUp, label: "Confident, fast action", desc: "Aligned decisions" },
];

const metrics = [
  { before: "Weeks", after: "Days", label: "Decision cycles", improvement: "70% faster" },
  { before: "Reactive", after: "Proactive", label: "Launch approach", improvement: "2x success" },
  { before: "Sprawl", after: "Unified", label: "Tool landscape", improvement: "30% lower TCO" },
];

const GDSlide3BeforeAfter = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  return (
    <GDSlideContainer
      id="gd-slide-3"
      title="From Fragmented Insight to Connected Decisions"
      subtitle="The transformation that closes the Intelligence Gap"
      slideNumber={3}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col gap-4 h-full">
        {/* Main Before/After Grid */}
        <div className="grid lg:grid-cols-2 gap-4 flex-1">
          {/* Before Column */}
          <div className="relative">
            <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-destructive/20 border border-destructive/30 rounded text-[10px] font-semibold text-destructive uppercase tracking-wider z-10">
              Before: Fragmented Intelligence
            </div>
            <div className="bg-card/30 border border-destructive/20 rounded-xl p-4 pt-6 h-full">
              <div className="grid gap-3">
                {beforeItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning indicators */}
              <div className="mt-4 pt-4 border-t border-destructive/20 grid grid-cols-2 gap-2">
                <div className="bg-destructive/10 rounded-lg p-2 text-center">
                  <p className="text-xs font-medium text-destructive">12+ weeks</p>
                  <p className="text-[10px] text-muted-foreground">to decision</p>
                </div>
                <div className="bg-destructive/10 rounded-lg p-2 text-center">
                  <p className="text-xs font-medium text-destructive">3-5 sources</p>
                  <p className="text-[10px] text-muted-foreground">to reconcile</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transformation Arrow - Center */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-12 h-12 rounded-full bg-primary border-2 border-sky-400 shadow-lg shadow-primary/30 flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* After Column */}
          <div className="relative">
            <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-primary/20 border border-primary/30 rounded text-[10px] font-semibold text-primary uppercase tracking-wider z-10">
              After: Connected Intelligence
            </div>
            <div className="bg-card/30 border border-primary/20 rounded-xl p-4 pt-6 h-full">
              <div className="grid gap-3">
                {afterItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Success indicators */}
              <div className="mt-4 pt-4 border-t border-primary/20 grid grid-cols-2 gap-2">
                <div className="bg-primary/10 rounded-lg p-2 text-center">
                  <p className="text-xs font-medium text-primary">Days</p>
                  <p className="text-[10px] text-muted-foreground">to decision</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-2 text-center">
                  <p className="text-xs font-medium text-primary">1 source</p>
                  <p className="text-[10px] text-muted-foreground">of truth</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Banner */}
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xs text-destructive line-through">{metric.before}</span>
                  <ArrowRight className="w-3 h-3 text-primary" />
                  <span className="text-xs text-primary font-semibold">{metric.after}</span>
                </div>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-sm font-bold text-primary mt-1">{metric.improvement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GDSlideContainer>
  );
};

export default GDSlide3BeforeAfter;
