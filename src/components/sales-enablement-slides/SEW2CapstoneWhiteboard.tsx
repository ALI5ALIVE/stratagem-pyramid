import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, PenLine, Sparkles } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const beats = [
  {
    n: 1,
    step: "Detect",
    color: "text-blue-400",
    dot: "bg-blue-400",
    capability: "Operational Data + Generative AI",
    say:
      "Day 1 — the platform spots a rising trend of unstable approaches at MAD over the last 14 days. No analyst exported a CSV; the signal surfaced itself.",
  },
  {
    n: 2,
    step: "Trigger",
    color: "text-amber-400",
    dot: "bg-amber-400",
    capability: "Intelligence Layer + Recommendations",
    say:
      "Day 2 — the Intelligence Layer answers \"where should my attention be today?\" with MAD unstable approach, three recommended risk controls, and cited evidence.",
  },
  {
    n: 3,
    step: "Orchestrate",
    color: "text-violet-400",
    dot: "bg-violet-400",
    capability: "Automation + Unified Mobile",
    say:
      "Day 3 — Automation fires the play: draft the OMA revision, open a SafetyManager365 risk-control review, notify training owners. Unified Mobile pushes the revised procedure to crew devices; sync confirmed in 48 hours.",
  },
  {
    n: 4,
    step: "Prove",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
    capability: "Insights & Intelligence",
    say:
      "Day 5 — Insights shows the trend curve flattening and an audit pack ready, cited to every step. The loop is closed and feeds the next Detect.",
  },
];

const legend = [
  { label: "Intelligence Layer", color: "border-amber-500/40 text-amber-300 bg-amber-500/5" },
  { label: "Insights", color: "border-emerald-500/40 text-emerald-300 bg-emerald-500/5" },
  { label: "Recommendations", color: "border-amber-500/40 text-amber-300 bg-amber-500/5" },
  { label: "Automation", color: "border-violet-500/40 text-violet-300 bg-violet-500/5" },
  { label: "Unified Mobile", color: "border-violet-500/40 text-violet-300 bg-violet-500/5" },
];

const SEW2CapstoneWhiteboard = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-w2-capstone-whiteboard"
    slideNumber={slideNumber}
    title="W2 Capstone — One Use Case, Every Capability, One DTOP Loop"
    subtitle="Unstable approach trend at MAD · closed in 5 days, end-to-end · drill this until you can recite it in 60 seconds."
    showHeader
    {...narrationProps}
  >
    <div className="h-full grid grid-cols-12 gap-5 px-8 pt-4 pb-6 max-w-[1700px] mx-auto">
      {/* Whiteboard */}
      <div className="col-span-7 rounded-xl bg-[#f5f1e6] border-4 border-[#3a2a1a] shadow-2xl p-6 relative overflow-hidden">
        <div className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-[#3a2a1a]/60 font-mono">
          whiteboard · one use case · 5 days
        </div>
        <div className="absolute top-2 right-3 text-[10px] uppercase tracking-widest text-[#3a2a1a]/60 font-mono flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> every W2 capability
        </div>
        <svg
          viewBox="0 0 700 460"
          className="w-full h-full"
          style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}
        >
          {/* DETECT */}
          <g>
            <rect x="30" y="50" width="300" height="150" rx="8" fill="none" stroke="#2563eb" strokeWidth="4" />
            <text x="50" y="82" fill="#2563eb" fontSize="24" fontWeight="700">1. Detect</text>
            <text x="50" y="112" fill="#1e3a5f" fontSize="16">unstable approach trend</text>
            <text x="50" y="134" fill="#1e3a5f" fontSize="16">spotted at MAD · 14 days</text>
            <rect x="50" y="150" width="240" height="32" rx="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <text x="170" y="172" fill="#1e3a5f" fontSize="13" textAnchor="middle" fontWeight="700">
              Op Data + Generative AI
            </text>
          </g>
          {/* arrow → Trigger */}
          <g stroke="#3a2a1a" strokeWidth="3" fill="none">
            <line x1="330" y1="125" x2="370" y2="125" />
            <polyline points="360,118 372,125 360,132" />
          </g>
          {/* TRIGGER */}
          <g>
            <rect x="370" y="50" width="300" height="150" rx="8" fill="none" stroke="#f59e0b" strokeWidth="4" />
            <text x="390" y="82" fill="#b45309" fontSize="24" fontWeight="700">2. Trigger</text>
            <text x="390" y="112" fill="#3a2a1a" fontSize="16">"where's my attention</text>
            <text x="390" y="134" fill="#3a2a1a" fontSize="16">today?" → 3 risk controls</text>
            <rect x="390" y="150" width="260" height="32" rx="16" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="520" y="172" fill="#7c2d12" fontSize="13" textAnchor="middle" fontWeight="700">
              Intelligence Layer + Recommendations
            </text>
          </g>
          {/* arrow ↓ */}
          <g stroke="#3a2a1a" strokeWidth="3" fill="none">
            <line x1="520" y1="210" x2="520" y2="240" />
            <polyline points="513,230 520,242 527,230" />
          </g>
          {/* ORCHESTRATE */}
          <g>
            <rect x="370" y="250" width="300" height="170" rx="8" fill="none" stroke="#8b5cf6" strokeWidth="4" />
            <text x="390" y="282" fill="#6d28d9" fontSize="24" fontWeight="700">3. Orchestrate</text>
            <text x="390" y="312" fill="#3a2a1a" fontSize="15">• draft OMA revision</text>
            <text x="390" y="334" fill="#3a2a1a" fontSize="15">• open SM365 risk review</text>
            <text x="390" y="356" fill="#3a2a1a" fontSize="15">• push to crew · 48h sync</text>
            <rect x="390" y="372" width="260" height="32" rx="16" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="520" y="394" fill="#4c1d95" fontSize="13" textAnchor="middle" fontWeight="700">
              Automation + Unified Mobile
            </text>
          </g>
          {/* arrow ← */}
          <g stroke="#3a2a1a" strokeWidth="3" fill="none">
            <line x1="370" y1="335" x2="340" y2="335" />
            <polyline points="350,328 338,335 350,342" />
          </g>
          {/* PROVE */}
          <g>
            <rect x="30" y="250" width="300" height="170" rx="8" fill="none" stroke="#10b981" strokeWidth="4" />
            <text x="50" y="282" fill="#047857" fontSize="24" fontWeight="700">4. Prove</text>
            <text x="50" y="312" fill="#3a2a1a" fontSize="15">trend curve flattens 38%</text>
            <text x="50" y="334" fill="#3a2a1a" fontSize="15">audit pack, cited end-to-end</text>
            <text x="50" y="356" fill="#3a2a1a" fontSize="14" fontStyle="italic">"closed — by Day 5"</text>
            <rect x="50" y="372" width="240" height="32" rx="16" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
            <text x="170" y="394" fill="#064e3b" fontSize="13" textAnchor="middle" fontWeight="700">
              Insights & Intelligence
            </text>
          </g>
          {/* loop arrow Prove → Detect (dashed) */}
          <g stroke="#3a2a1a" strokeWidth="2.5" fill="none" strokeDasharray="6 5">
            <path d="M 150 250 C 130 225, 130 215, 150 200" />
            <polyline points="143,208 150,198 158,208" stroke="#3a2a1a" strokeWidth="2.5" fill="none" />
          </g>
          <text x="10" y="230" fill="#3a2a1a" fontSize="13" fontStyle="italic">loop</text>
        </svg>
      </div>

      {/* Story script + capability legend */}
      <div className="col-span-5 flex flex-col gap-2 min-h-0">
        <div className="text-[10px] uppercase tracking-widest text-primary flex items-center gap-2">
          <PenLine className="h-3 w-3" /> Say-it script · 60 seconds end-to-end
        </div>
        <div className="flex flex-col gap-2">
          {beats.map((b) => (
            <div key={b.n} className="flex items-start gap-3 p-2.5 rounded-lg border border-border bg-card/60">
              <div
                className={`shrink-0 w-7 h-7 rounded-full ${b.dot} text-background font-bold flex items-center justify-center text-sm`}
              >
                {b.n}
              </div>
              <div className="min-w-0">
                <div className={`text-xs font-semibold ${b.color} uppercase tracking-wider`}>
                  {b.step} · <span className="opacity-80">{b.capability}</span>
                </div>
                <p className="text-sm text-foreground leading-snug">"{b.say}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Capability legend */}
        <div className="mt-1">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
            Every W2 capability accounted for
          </div>
          <div className="flex flex-wrap gap-1.5">
            {legend.map((l) => (
              <span
                key={l.label}
                className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border ${l.color}`}
              >
                {l.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs text-foreground">
          <Clock className="h-3.5 w-3.5 text-primary" />
          Drill this 3× — it's the Week 2 capstone. One use case, every capability, one DTOP loop.
        </div>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEW2CapstoneWhiteboard;