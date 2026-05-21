import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { BookCheck, AlertTriangle, GitBranch, Globe2, Radio } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const sources = [
  {
    name: "Regulation Signals",
    icon: BookCheck,
    tone: "sky",
    example: "EASA Part-FCL amendment published",
  },
  {
    name: "Anomalies",
    icon: AlertTriangle,
    tone: "amber",
    example: "Crew duty-time anomaly trending up",
    active: true,
  },
  {
    name: "Operational Change",
    icon: GitBranch,
    tone: "violet",
    example: "New base opening · roster re-baseline",
  },
  {
    name: "Macro / Geopolitical",
    icon: Globe2,
    tone: "emerald",
    example: "Airspace closure forces re-route",
  },
];

const tone: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  sky: { text: "text-sky-300", bg: "bg-sky-500/10", border: "border-sky-500/40", dot: "bg-sky-400" },
  amber: { text: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/40", dot: "bg-amber-400" },
  violet: { text: "text-violet-300", bg: "bg-violet-500/10", border: "border-violet-500/40", dot: "bg-violet-400" },
  emerald: { text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/40", dot: "bg-emerald-400" },
};

const steps = [
  {
    letter: "D",
    name: "Detect",
    color: "blue",
    capability: "Operational Data + Insights",
    line: "Duty-time anomaly surfaces across two bases — no analyst pulled a report.",
  },
  {
    letter: "T",
    name: "Trigger",
    color: "amber",
    capability: "Intelligence Layer + Recommendations",
    line: "Three recommended controls with cited evidence — roster reshape, fatigue brief, training nudge.",
  },
  {
    letter: "O",
    name: "Orchestrate",
    color: "violet",
    capability: "Automation + Unified Mobile",
    line: "Roster updated, brief drafted, training assigned, pushed to crew devices — sync confirmed.",
  },
  {
    letter: "P",
    name: "Prove",
    color: "emerald",
    capability: "Insights",
    line: "Anomaly flat in 7 days. Audit pack one click. Loop closed.",
  },
];

const stepTone: Record<string, { text: string; ring: string; bg: string; border: string }> = {
  blue: { text: "text-blue-300", ring: "ring-blue-400/60", bg: "bg-blue-500/10", border: "border-blue-500/40" },
  amber: { text: "text-amber-300", ring: "ring-amber-400/60", bg: "bg-amber-500/10", border: "border-amber-500/40" },
  violet: { text: "text-violet-300", ring: "ring-violet-400/60", bg: "bg-violet-500/10", border: "border-violet-500/40" },
  emerald: { text: "text-emerald-300", ring: "ring-emerald-400/60", bg: "bg-emerald-500/10", border: "border-emerald-500/40" },
};

const SEW3SignalsRecap = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-w3-signals-recap"
    slideNumber={slideNumber}
    title="Recap — Signals are the fuel; DTOP is the engine"
    subtitle="Four signal sources feed Detect. Watch one anomaly flow Detect → Trigger → Orchestrate → Prove."
    showHeader
    {...narrationProps}
  >
    <style>{`
      @keyframes se-signal-travel {
        0%   { left: 2%;  opacity: 0; }
        8%   { opacity: 1; }
        25%  { left: 26%; }
        50%  { left: 50%; }
        75%  { left: 74%; }
        92%  { left: 96%; opacity: 1; }
        100% { left: 96%; opacity: 0; }
      }
      @keyframes se-step-pulse {
        0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        50%      { transform: scale(1.06); box-shadow: 0 0 24px 4px currentColor; }
      }
      .se-signal-dot { animation: se-signal-travel 12s ease-in-out infinite; }
      .se-step-d { animation: se-step-pulse 12s ease-in-out infinite; animation-delay: 0s; }
      .se-step-t { animation: se-step-pulse 12s ease-in-out infinite; animation-delay: 3s; }
      .se-step-o { animation: se-step-pulse 12s ease-in-out infinite; animation-delay: 6s; }
      .se-step-p { animation: se-step-pulse 12s ease-in-out infinite; animation-delay: 9s; }
      @keyframes se-anomaly-ping {
        0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.6); }
        50%      { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
      }
      .se-anomaly-ping { animation: se-anomaly-ping 2.4s ease-out infinite; }
    `}</style>

    <div className="h-full flex flex-col gap-4 max-w-[1700px] mx-auto px-8 pt-2 pb-6">
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Left: four signal sources */}
        <div className="col-span-4 flex flex-col gap-2">
          <div className="text-[11px] uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
            <Radio className="h-3.5 w-3.5" /> Four signal sources feed Detect
          </div>
          <div className="grid grid-cols-1 gap-2 flex-1">
            {sources.map((s) => {
              const Icon = s.icon;
              const t = tone[s.tone];
              return (
                <div
                  key={s.name}
                  className={`p-2.5 rounded-lg border ${t.border} ${t.bg} flex items-start gap-2.5 relative ${
                    s.active ? "ring-1 ring-amber-400/60" : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <Icon className={`h-4 w-4 ${t.text}`} />
                    {s.active && (
                      <span className="se-anomaly-ping absolute -inset-1 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[12px] font-semibold ${t.text} leading-tight`}>{s.name}</div>
                    <p className="text-[10.5px] text-foreground/75 leading-snug">{s.example}</p>
                  </div>
                  {s.active && (
                    <span className="text-[9px] uppercase tracking-wider font-bold text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/40 bg-amber-500/15 shrink-0">
                      Live
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="p-2.5 rounded-md border border-border/40 bg-card/40 text-[10.5px] text-foreground/75 leading-snug">
            <span className="text-foreground font-semibold">Rep frame:</span> "A signal is anything that should change
            what your team does next. We pull from all four worlds — and route them through the same loop."
          </div>
        </div>

        {/* Right: animated DTOP lane */}
        <div className="col-span-8 flex flex-col gap-3">
          <div className="text-[11px] uppercase tracking-wider text-foreground/70 font-semibold">
            One signal · end-to-end · crew duty-time anomaly
          </div>

          {/* Lane with traveling signal */}
          <div className="relative h-20 rounded-xl border border-border/40 bg-card/30 px-4">
            {/* track */}
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-blue-400/40 via-amber-400/40 via-violet-400/40 to-emerald-400/40 rounded-full" />
            {/* 4 station markers */}
            {steps.map((st, i) => {
              const t = stepTone[st.color];
              const pulseClass = ["se-step-d", "se-step-t", "se-step-o", "se-step-p"][i];
              return (
                <div
                  key={st.letter}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${12 + i * 26}%` }}
                >
                  <div
                    className={`${pulseClass} ${t.text} h-10 w-10 rounded-full border-2 ${t.border} ${t.bg} flex items-center justify-center font-bold text-sm`}
                  >
                    {st.letter}
                  </div>
                </div>
              );
            })}
            {/* traveling signal dot */}
            <div
              className="se-signal-dot absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: "2%" }}
            >
              <div className="relative">
                <div className="h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_16px_4px_rgba(252,211,77,0.7)]" />
                <div className="absolute -inset-2 rounded-full border border-amber-300/40 animate-ping" />
              </div>
            </div>
          </div>

          {/* Four step cards */}
          <div className="grid grid-cols-4 gap-2.5 flex-1 min-h-0">
            {steps.map((st) => {
              const t = stepTone[st.color];
              return (
                <div
                  key={st.letter}
                  className={`p-3 rounded-lg border ${t.border} ${t.bg} flex flex-col gap-1.5`}
                >
                  <div className={`text-[10px] uppercase tracking-wider font-bold ${t.text}`}>
                    {st.letter} · {st.name}
                  </div>
                  <div className="text-[10.5px] font-semibold text-foreground/85 leading-tight">
                    {st.capability}
                  </div>
                  <p className="text-[11px] text-foreground/80 leading-snug flex-1">{st.line}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rep talk track */}
      <div className="p-3 rounded-xl border border-primary/30 bg-primary/5">
        <div className="text-[10.5px] uppercase tracking-wider text-primary font-semibold mb-1.5">
          Rep talk track · say it like this
        </div>
        <p className="text-[12.5px] text-foreground/90 italic leading-snug">
          "Your team already has the signals — they're just scattered. We pull regulation, anomalies, operational
          change and the world outside into one loop. When a crew duty-time anomaly spikes, the platform Detects it,
          Triggers three recommended controls, Orchestrates the roster and training changes to crew devices, and
          Proves it flat seven days later. Same loop, every signal, every time."
        </p>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEW3SignalsRecap;