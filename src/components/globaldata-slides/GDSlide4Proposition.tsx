import GDSlideContainer from "./GDSlideContainer";
import { Database, Users, Target, Lightbulb, DollarSign, XCircle, CheckCircle2 } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

const intelligenceDomains = [
  { icon: Target, label: "Market", color: "from-blue-500 to-cyan-400" },
  { icon: Users, label: "Consumer", color: "from-cyan-400 to-teal-400" },
  { icon: Lightbulb, label: "Competitor", color: "from-teal-400 to-emerald-400" },
  { icon: DollarSign, label: "Innovation", color: "from-emerald-400 to-green-400" },
  { icon: Database, label: "Commercial", color: "from-green-400 to-lime-400" },
];

const replaces = [
  "Tool sprawl across vendors",
  "Manual reconciliation",
  "Conflicting answers",
];

const notThis = [
  "Another dataset",
  "Another dashboard",
  "Another point solution",
];

const GDSlide4Proposition = ({
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
      id="gd-slide-4"
      title="Connected Intelligence for Consumer Brands"
      subtitle="Closing the Intelligence Gap"
      slideNumber={4}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex flex-col gap-5 h-full">
        {/* Central Value Proposition */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 rounded-xl p-6">
          <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed text-center">
            A <span className="text-emerald-400 font-bold">unified solution</span> that connects market, consumer, competitor, innovation, and commercial intelligence into <span className="text-emerald-400 font-bold">one trusted system</span> — so organisations move faster, align better, and act with confidence.
          </p>
        </div>

        {/* Intelligence Domains Hub */}
        <div className="flex-1 grid lg:grid-cols-2 gap-6 items-center">
          {/* Visual Hub */}
          <div className="flex items-center justify-center py-4">
            <div className="relative w-64 h-64">
              {/* Central Hub */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <div className="text-center">
                    <Database className="w-6 h-6 text-white mx-auto mb-1" />
                    <span className="text-[10px] text-white font-semibold">Connected<br/>Intelligence</span>
                  </div>
                </div>
              </div>

              {/* Orbiting Domains */}
              {intelligenceDomains.map((domain, i) => {
                const angle = (i * 72 - 90) * (Math.PI / 180);
                const radius = 100;
                const x = 128 + radius * Math.cos(angle);
                const y = 128 + radius * Math.sin(angle);
                const Icon = domain.icon;

                return (
                  <div
                    key={i}
                    className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card border border-border/50 flex flex-col items-center justify-center hover:border-emerald-500/50 transition-all hover:scale-110"
                    style={{ left: x, top: y }}
                  >
                    <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${domain.color} flex items-center justify-center mb-0.5`}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[9px] text-muted-foreground font-medium">{domain.label}</span>
                  </div>
                );
              })}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {intelligenceDomains.map((_, i) => {
                  const angle = (i * 72 - 90) * (Math.PI / 180);
                  const radius = 100;
                  const x = 128 + radius * Math.cos(angle);
                  const y = 128 + radius * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="128"
                      y1="128"
                      x2={x}
                      y2={y}
                      stroke="url(#lineGrad)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* What it replaces / What it is NOT */}
          <div className="space-y-4">
            {/* What it replaces */}
            <div className="bg-card/50 border border-border/50 rounded-xl p-4">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">What It Replaces</p>
              <div className="space-y-2">
                {replaces.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What it is NOT */}
            <div className="bg-card/50 border border-destructive/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-3">What It Is NOT</p>
              <div className="space-y-2">
                {notThis.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-destructive shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center">
          <p className="text-sm text-foreground">
            This is <span className="font-bold text-emerald-400">intelligence designed to drive decisions end-to-end</span> — not another layer of data.
          </p>
        </div>
      </div>
    </GDSlideContainer>
  );
};

export default GDSlide4Proposition;
