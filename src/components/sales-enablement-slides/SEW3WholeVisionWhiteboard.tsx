import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { PenLine, Sparkles, Layers } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
  id?: string;
  title?: string;
  subtitle?: string;
}

const beats = [
  {
    n: 1,
    layer: "Core Apps",
    dtop: "starts at Detect",
    dot: "bg-slate-400",
    accent: "text-slate-300",
    say:
      "\"Today your safety, content and training live in three separate tools that don't talk. We unify them on one foundation — SafetyManager365, ContentManager365, TrainingManager365 — so a signal in one is visible to all three.\"",
  },
  {
    n: 2,
    layer: "Insights",
    dtop: "powers Detect",
    dot: "bg-emerald-400",
    accent: "text-emerald-300",
    say:
      "\"On top of that foundation, Insights surfaces the trend the dashboard would have missed — the unstable approach trend at Madrid (MAD) shows itself in 14 days, not after the incident.\"",
  },
  {
    n: 3,
    layer: "Intelligence Layer",
    dtop: "owns Trigger",
    dot: "bg-amber-400",
    accent: "text-amber-300",
    say:
      "\"Then a domain-trained intelligence sits over it — roughly ninety percent accurate on aviation work versus around thirty-five percent for generic AI — so the answer cites the regulation, the procedure and the training, not a guess.\"",
  },
  {
    n: 4,
    layer: "Recommendations & Prescriptive Actions",
    dtop: "closes Trigger",
    dot: "bg-amber-400",
    accent: "text-amber-300",
    say:
      "\"It doesn't just summarise — it tells your team exactly what to do next, with cited evidence and the risk control already drafted. Recommended Actions, not another dashboard.\"",
  },
  {
    n: 5,
    layer: "Automation + Unified Mobile",
    dtop: "delivers Orchestrate & Prove",
    dot: "bg-violet-400",
    accent: "text-violet-300",
    say:
      "\"Automation runs the play — drafts the OMA revision, opens the review, assigns the training. Unified Mobile lands it on crew devices in 48 hours. Insights then proves the trend flattened — audit pack already cited. One loop, closed.\"",
  },
];

const SEW3WholeVisionWhiteboard = ({
  slideNumber,
  id = "se-w3-whole-vision-whiteboard",
  title = "Sell the Whole Vision — One Whiteboard",
  subtitle = "Draw the stack bottom-up. Anchor it to one use case. One line per layer. 90 seconds, one marker — the whole platform vision on a board.",
  ...narrationProps
}: Props) => (
  <PitchSlideContainer
    id={id}
    slideNumber={slideNumber}
    title={title}
    subtitle={subtitle}
    showHeader
    {...narrationProps}
  >
    <div className="h-full grid grid-cols-12 gap-5 px-8 pt-4 pb-6 max-w-[1700px] mx-auto">
      {/* Whiteboard */}
      <div className="col-span-7 rounded-xl bg-[#f5f1e6] border-4 border-[#3a2a1a] shadow-2xl p-6 relative overflow-hidden">
        <div className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-[#3a2a1a]/60 font-mono">
          whiteboard · whole vision · build bottom-up
        </div>
        <div className="absolute top-2 right-3 text-[10px] uppercase tracking-widest text-[#3a2a1a]/60 font-mono flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> one marker · 90 seconds
        </div>
        <svg
          viewBox="0 0 700 500"
          className="w-full h-full"
          style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}
        >
          {/* DTOP loop band — top */}
          <g>
            <rect x="30" y="30" width="640" height="46" rx="8" fill="none" stroke="#3a2a1a" strokeWidth="3" strokeDasharray="6 4" />
            <text x="50" y="58" fill="#3a2a1a" fontSize="20" fontWeight="700">DTOP loop</text>
            <g>
              <rect x="220" y="38" width="80" height="30" rx="15" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
              <text x="260" y="58" fill="#1e3a5f" fontSize="16" textAnchor="middle" fontWeight="700">Detect</text>
            </g>
            <g>
              <rect x="320" y="38" width="80" height="30" rx="15" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
              <text x="360" y="58" fill="#7c2d12" fontSize="16" textAnchor="middle" fontWeight="700">Trigger</text>
            </g>
            <g>
              <rect x="420" y="38" width="110" height="30" rx="15" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
              <text x="475" y="58" fill="#4c1d95" fontSize="16" textAnchor="middle" fontWeight="700">Orchestrate</text>
            </g>
            <g>
              <rect x="550" y="38" width="80" height="30" rx="15" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="590" y="58" fill="#064e3b" fontSize="16" textAnchor="middle" fontWeight="700">Prove</text>
            </g>
          </g>

          {/* Unified Mobile band */}
          <g>
            <rect x="30" y="86" width="640" height="40" rx="8" fill="none" stroke="#8b5cf6" strokeWidth="3" />
            <text x="50" y="112" fill="#4c1d95" fontSize="18" fontWeight="700">Unified Mobile · device-side close of the loop</text>
          </g>

          {/* Intelligence & Orchestration block */}
          <g>
            <rect x="30" y="136" width="640" height="156" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="4" />
            <text x="50" y="162" fill="#7c2d12" fontSize="20" fontWeight="700">Intelligence &amp; Orchestration Layer</text>
            {/* Insights */}
            <g>
              <rect x="50" y="176" width="190" height="100" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2.5" />
              <text x="65" y="200" fill="#047857" fontSize="17" fontWeight="700">Insights</text>
              <text x="65" y="222" fill="#3a2a1a" fontSize="13">trends surface</text>
              <text x="65" y="240" fill="#3a2a1a" fontSize="13">themselves — no</text>
              <text x="65" y="258" fill="#3a2a1a" fontSize="13">CSV export needed</text>
            </g>
            {/* Intelligence Layer */}
            <g>
              <rect x="250" y="176" width="190" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="265" y="200" fill="#7c2d12" fontSize="17" fontWeight="700">Intelligence</text>
              <text x="265" y="222" fill="#3a2a1a" fontSize="13">domain-trained</text>
              <text x="265" y="240" fill="#3a2a1a" fontSize="13">~90% vs ~35%</text>
              <text x="265" y="258" fill="#3a2a1a" fontSize="13">generic · cited</text>
            </g>
            {/* Recommendations & Prescriptive Actions */}
            <g>
              <rect x="450" y="176" width="200" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="465" y="200" fill="#7c2d12" fontSize="17" fontWeight="700">Recommendations</text>
              <text x="465" y="218" fill="#7c2d12" fontSize="14" fontWeight="700">+ Prescriptive Actions</text>
              <text x="465" y="240" fill="#3a2a1a" fontSize="13">tells your team</text>
              <text x="465" y="258" fill="#3a2a1a" fontSize="13">what to do next</text>
            </g>
          </g>

          {/* Automation band (sits inside Orchestrate flow) */}
          <g>
            <rect x="30" y="302" width="640" height="42" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="3" />
            <text x="50" y="328" fill="#4c1d95" fontSize="18" fontWeight="700">Automation · runs the play · draft · review · assign · push</text>
          </g>

          {/* Core Apps */}
          <g>
            <rect x="30" y="354" width="640" height="86" rx="8" fill="#f5f5f4" stroke="#3a2a1a" strokeWidth="3" />
            <text x="50" y="378" fill="#3a2a1a" fontSize="18" fontWeight="700">Core Apps · one foundation, three systems of record</text>
            <g>
              <rect x="50" y="390" width="190" height="38" rx="6" fill="#fff" stroke="#3a2a1a" strokeWidth="2" />
              <text x="145" y="414" fill="#3a2a1a" fontSize="15" textAnchor="middle" fontWeight="700">SafetyManager365</text>
            </g>
            <g>
              <rect x="250" y="390" width="200" height="38" rx="6" fill="#fff" stroke="#3a2a1a" strokeWidth="2" />
              <text x="350" y="414" fill="#3a2a1a" fontSize="15" textAnchor="middle" fontWeight="700">ContentManager365</text>
            </g>
            <g>
              <rect x="460" y="390" width="200" height="38" rx="6" fill="#fff" stroke="#3a2a1a" strokeWidth="2" />
              <text x="560" y="414" fill="#3a2a1a" fontSize="15" textAnchor="middle" fontWeight="700">TrainingManager365</text>
            </g>
          </g>

          {/* Use-case strip */}
          <g>
            <rect x="30" y="452" width="640" height="36" rx="8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="50" y="476" fill="#1e3a5f" fontSize="15" fontWeight="700">
              use case · Madrid (MAD) unstable approach trend · closed in 5 days
            </text>
          </g>
        </svg>
      </div>

      {/* Say-it script + close */}
      <div className="col-span-5 flex flex-col gap-2 min-h-0">
        <div className="text-[10px] uppercase tracking-widest text-primary flex items-center gap-2">
          <PenLine className="h-3 w-3" /> Say-it script · one line per layer
        </div>
        <div className="flex flex-col gap-1.5">
          {beats.map((b) => (
            <div key={b.n} className="flex items-start gap-3 p-2.5 rounded-lg border border-border bg-card/60">
              <div
                className={`shrink-0 w-7 h-7 rounded-full ${b.dot} text-background font-bold flex items-center justify-center text-sm`}
              >
                {b.n}
              </div>
              <div className="min-w-0">
                <div className={`text-xs font-semibold ${b.accent} uppercase tracking-wider`}>
                  {b.layer} · <span className="opacity-80">{b.dtop}</span>
                </div>
                <p className="text-[13px] text-foreground leading-snug">{b.say}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-start gap-2 px-3 py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-xs text-foreground">
          <Layers className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>
            <span className="font-semibold">Close:</span> "That's the whole vision — start with one app, the stack lifts the rest as you grow. One foundation, one intelligence, one loop."
          </span>
        </div>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEW3WholeVisionWhiteboard;
