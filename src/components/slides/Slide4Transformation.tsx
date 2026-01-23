import SlideContainer from "./SlideContainer";
import { ArrowRight, AlertTriangle, Zap, DollarSign, TrendingUp, Lock, Unlock, ClipboardCheck, Target, Clock, Lightbulb, Shield, Users } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

const beforeItems = [
  { icon: AlertTriangle, label: "Reactive", desc: "Risk handling" },
  { icon: DollarSign, label: "Cost Center", desc: "Compliance burden" },
  { icon: Lock, label: "Data Locked", desc: "Siloed systems" },
  { icon: ClipboardCheck, label: "Firefighting", desc: "Manual coordination" },
];

const afterItems = [
  { icon: Zap, label: "Proactive", desc: "Detection & prevention" },
  { icon: TrendingUp, label: "Value Driver", desc: "Competitive advantage" },
  { icon: Unlock, label: "Data Unlocked", desc: "Connected insights" },
  { icon: Target, label: "Strategic", desc: "Improvement focus" },
];

const possibilities = [
  { 
    icon: Lightbulb, 
    title: "Earlier Detection", 
    desc: "AI detects weak signals before disruptions",
    metric: "70%",
    metricLabel: "faster"
  },
  { 
    icon: Clock, 
    title: "Faster Cycles", 
    desc: "60% reduction in time-to-change",
    metric: "60%",
    metricLabel: "faster"
  },
  { 
    icon: Shield, 
    title: "Proof by Default", 
    desc: "Audit evidence generated automatically",
    metric: "100%",
    metricLabel: "coverage"
  },
  { 
    icon: Users, 
    title: "Exception-led", 
    desc: "Humans govern, AI handles routine",
    metric: "10x",
    metricLabel: "leverage"
  },
];

const Slide4Transformation = ({
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
      id="slide-5"
      title="The Transformation"
      subtitle="From cost center to competitive advantage"
      slideNumber={5}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="h-full flex flex-col gap-3">
        {/* Main comparison section */}
        <div className="flex-1 grid lg:grid-cols-2 gap-4 items-start">
          {/* Before/After Comparison */}
          <div className="flex flex-col gap-3 relative">
            <div className="grid grid-cols-2 gap-3">
              {/* Before Column */}
              <div className="relative">
                <div className="absolute -top-2.5 left-2 px-1.5 py-0.5 bg-destructive/20 border border-destructive/30 rounded text-[9px] font-semibold text-destructive uppercase tracking-wider">
                  Point Tools
                </div>
                <div className="bg-card/30 border border-destructive/20 rounded-lg p-2.5 pt-4 space-y-2">
                  {beforeItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 group">
                      <div className="w-6 h-6 rounded-md bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                        <item.icon className="w-3 h-3 text-destructive" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">{item.label}</div>
                        <div className="text-[9px] text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow - centered between columns */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex">
                <div className="w-14 h-14 rounded-full bg-primary border-2 border-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)] flex items-center justify-center animate-pulse">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* After Column */}
              <div className="relative">
                <div className="absolute -top-2.5 left-2 px-1.5 py-0.5 bg-primary/20 border border-primary/30 rounded text-[9px] font-semibold text-primary uppercase tracking-wider">
                  Platform
                </div>
                <div className="bg-card/30 border border-primary/20 rounded-lg p-2.5 pt-4 space-y-2">
                  {afterItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 group">
                      <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <item.icon className="w-3 h-3 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">{item.label}</div>
                        <div className="text-[9px] text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Allocation Shift */}
            <div className="bg-card/40 border border-border/50 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-2">
                <Clock className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Time Allocation Shift
                </span>
              </div>
              
              <div className="space-y-2">
                {/* Before Bar */}
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] text-muted-foreground">Before</span>
                  </div>
                  <div className="h-5 rounded-md overflow-hidden flex">
                    <div className="h-full flex items-center justify-center bg-destructive" style={{ width: '60%' }}>
                      <span className="text-[8px] font-semibold text-white">Coordination 60%</span>
                    </div>
                    <div className="h-full flex items-center justify-center bg-accent" style={{ width: '30%' }}>
                      <span className="text-[8px] font-semibold text-white">Admin 30%</span>
                    </div>
                    <div className="h-full flex items-center justify-center bg-primary" style={{ width: '10%' }}>
                      <span className="text-[8px] font-semibold text-white">10%</span>
                    </div>
                  </div>
                </div>

                {/* After Bar */}
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] text-muted-foreground">After</span>
                  </div>
                  <div className="h-5 rounded-md overflow-hidden flex">
                    <div className="h-full flex items-center justify-center bg-destructive" style={{ width: '10%' }}>
                      <span className="text-[8px] font-semibold text-white">10%</span>
                    </div>
                    <div className="h-full flex items-center justify-center bg-accent" style={{ width: '20%' }}>
                      <span className="text-[8px] font-semibold text-white">20%</span>
                    </div>
                    <div className="h-full flex items-center justify-center bg-primary" style={{ width: '70%' }}>
                      <span className="text-[8px] font-semibold text-white">Improvement 70%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-center gap-3 text-[9px]">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-destructive" />
                  <span className="text-muted-foreground">Coordination</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-accent" />
                  <span className="text-muted-foreground">Administration</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-primary" />
                  <span className="text-muted-foreground">Improvement</span>
                </div>
              </div>
            </div>
          </div>

          {/* New Possibilities */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                New Possibilities Unlocked
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {possibilities.map((item, i) => (
                <div 
                  key={i}
                  className="group bg-card/40 border border-border/50 hover:border-primary/30 rounded-lg p-2.5 transition-all duration-300"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">{item.title}</div>
                      <div className="text-[9px] text-muted-foreground leading-tight">{item.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-primary">{item.metric}</span>
                    <span className="text-[9px] text-muted-foreground">{item.metricLabel}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cultural Shift Quote */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-2.5">
              <div className="flex items-start gap-2">
                <div className="text-xl text-primary/30">"</div>
                <div>
                  <p className="text-xs text-foreground italic leading-snug">
                    Point solutions manage silos.<br />
                    <span className="text-primary font-semibold not-italic">Comply365 closes the loop.</span>
                  </p>
                  <div className="mt-1 text-[9px] text-muted-foreground">
                    From compliance burden → Operational performance as competitive advantage
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide4Transformation;
