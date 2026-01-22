import GDSlideContainer from "./GDSlideContainer";
import { Database, Users, Layers, Brain, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

const differentiators = [
  { 
    icon: Database, 
    title: "Unmatched Proprietary Data", 
    desc: "Market + Consumer intelligence no competitor can replicate",
    proof: "40+ years of consumer behavior data",
    color: "from-blue-500 to-cyan-400"
  },
  { 
    icon: Users, 
    title: "Human + AI at Scale", 
    desc: "Analyst expertise amplified by Ava, enterprise-grade AI analyst",
    proof: "1,000+ analysts globally",
    color: "from-cyan-400 to-teal-400"
  },
  { 
    icon: Layers, 
    title: "Unified Taxonomy", 
    desc: "Single classification system across all intelligence domains",
    proof: "One truth, not five conflicting ones",
    color: "from-teal-400 to-emerald-400"
  },
];

const closingTruths = [
  { text: "Insight alone does not create advantage", icon: Database },
  { text: "Speed without confidence creates risk", icon: ArrowRight },
  { text: "Connected Intelligence creates leadership", icon: Sparkles },
];

const GDSlide9WhyGlobalData = ({
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
      id="gd-slide-9"
      title="Built for Connected Intelligence at Scale"
      subtitle="Why GlobalData is uniquely positioned to close the Intelligence Gap"
      slideNumber={9}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col gap-5 h-full">
        {/* Three Differentiators */}
        <div className="grid md:grid-cols-3 gap-4">
          {differentiators.map((diff, i) => {
            const Icon = diff.icon;
            return (
              <div 
                key={i}
                className="bg-card/50 border border-border/50 rounded-xl p-5 hover:border-emerald-500/30 transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${diff.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{diff.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{diff.desc}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-border/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-emerald-400 font-medium">{diff.proof}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ava Highlight */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/5 border border-purple-500/30 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-base font-bold text-foreground">Ava</h4>
                <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-[10px] text-purple-400 font-semibold uppercase">
                  Enterprise AI Analyst
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered research analyst that amplifies human expertise — accelerating insight discovery, pattern recognition, and decision support across all intelligence domains.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Close Section */}
        <div className="flex-1 grid lg:grid-cols-2 gap-4 items-center">
          {/* Leadership Imperative */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">Leadership Imperative</p>
            <p className="text-base text-foreground leading-relaxed">
              Organisations that <span className="font-bold text-emerald-400">close the Intelligence Gap</span> and operate intelligence as a <span className="font-bold text-emerald-400">connected system</span> will define the next generation of <span className="font-bold text-emerald-400">category leaders</span>.
            </p>
          </div>

          {/* Three Truths */}
          <div className="space-y-2">
            {closingTruths.map((truth, i) => {
              const Icon = truth.icon;
              return (
                <div 
                  key={i}
                  className="flex items-center gap-3 bg-card/50 border border-border/50 rounded-lg p-3"
                >
                  <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-sm text-foreground">{truth.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Takeaway */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-center">
          <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">Final Takeaway</p>
          <p className="text-lg font-bold text-white leading-relaxed">
            The future belongs to organisations that turn change into decisions — <span className="underline decoration-2">earlier</span>, <span className="underline decoration-2">together</span>, and with <span className="underline decoration-2">conviction</span>.
          </p>
        </div>
      </div>
    </GDSlideContainer>
  );
};

export default GDSlide9WhyGlobalData;
