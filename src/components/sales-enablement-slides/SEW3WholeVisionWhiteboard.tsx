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
    dot: "bg-sky-400",
    accent: "text-sky-300",
    say:
      "\"On top of that foundation, Insights surfaces the trend the dashboard would have missed — Madrid (MAD) unstable approach shows itself in 14 days. Detect, without an analyst pulling a report.\"",
  },
  {
    n: 3,
    layer: "Intelligence Layer",
    dtop: "powers Trigger",
    dot: "bg-amber-400",
    accent: "text-amber-300",
    say:
      "\"A domain-trained Intelligence Layer sits over it — ~90% accurate on aviation work versus ~35% for generic AI — and turns the trend into Recommended Actions with the regulation, procedure and training cited.\"",
  },
  {
    n: 4,
    layer: "Automation + Unified Mobile",
    dtop: "delivers Orchestrate",
    dot: "bg-violet-400",
    accent: "text-violet-300",
    say:
      "\"Automation runs the play — drafts the OMA revision, opens the review, assigns the training. Unified Mobile lands it on crew devices in 48 hours.\"",
  },
  {
    n: 5,
    layer: "Insights · Prove",
    dtop: "closes Prove",
    dot: "bg-emerald-400",
    accent: "text-emerald-300",
    say:
      "\"Insights then proves the trend flattened — audit pack already cited. One loop, closed.\"",
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
          {/* Use-case header — title strip */}
          <g>
            <rect x="30" y="22" width="640" height="30" rx="8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="50" y="42" fill="#1e3a5f" fontSize="15" fontWeight="700">
              use case · Madrid (MAD) unstable approach trend · closed in 5 days
            </text>
          </g>

          {/* MAD micro-cards — one per DTOP step */}
          <g>
            {/* Detect (blue) */}
            <rect x="30" y="60" width="152" height="58" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            <text x="38" y="76" fill="#2563eb" fontSize="11" fontWeight="700">DETECT · MAD</text>
            <text x="38" y="94" fill="#3a2a1a" fontSize="12">14-day unstable</text>
            <text x="38" y="110" fill="#3a2a1a" fontSize="12">approach trend surfaces</text>

            {/* Trigger (amber) */}
            <rect x="192" y="60" width="152" height="58" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <text x="200" y="76" fill="#b45309" fontSize="11" fontWeight="700">TRIGGER · MAD</text>
            <text x="200" y="94" fill="#3a2a1a" fontSize="12">revise OMA · retrain</text>
            <text x="200" y="110" fill="#3a2a1a" fontSize="12">4 crews · cited</text>

            {/* Orchestrate (violet) */}
            <rect x="354" y="60" width="152" height="58" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
            <text x="362" y="76" fill="#6d28d9" fontSize="11" fontWeight="700">ORCHESTRATE · MAD</text>
            <text x="362" y="94" fill="#3a2a1a" fontSize="12">draft · review · assign</text>
            <text x="362" y="110" fill="#3a2a1a" fontSize="12">pushed to devices · 48h</text>

            {/* Prove (green) */}
            <rect x="516" y="60" width="152" height="58" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
            <text x="524" y="76" fill="#047857" fontSize="11" fontWeight="700">PROVE · MAD</text>
            <text x="524" y="94" fill="#3a2a1a" fontSize="12">trend flat in 5 days</text>
            <text x="524" y="110" fill="#3a2a1a" fontSize="12">audit pack · one click</text>
          </g>

          {/* Connector ticks from MAD cards into DTOP pills below */}
          <g stroke="#3a2a1a" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.5">
            <line x1="106" y1="118" x2="106" y2="132" />
            <line x1="268" y1="118" x2="268" y2="132" />
            <line x1="430" y1="118" x2="430" y2="132" />
            <line x1="592" y1="118" x2="592" y2="132" />
          </g>

          {/* DTOP loop band */}
          <g>
            <rect x="30" y="132" width="640" height="40" rx="8" fill="none" stroke="#3a2a1a" strokeWidth="3" strokeDasharray="6 4" />
            <text x="38" y="156" fill="#3a2a1a" fontSize="14" fontWeight="700">DTOP</text>
            <g>
              <rect x="76" y="140" width="60" height="24" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
              <text x="106" y="157" fill="#1e3a5f" fontSize="13" textAnchor="middle" fontWeight="700">Detect</text>
            </g>
            <g>
              <rect x="238" y="140" width="60" height="24" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
              <text x="268" y="157" fill="#7c2d12" fontSize="13" textAnchor="middle" fontWeight="700">Trigger</text>
            </g>
            <g>
              <rect x="382" y="140" width="96" height="24" rx="12" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
              <text x="430" y="157" fill="#4c1d95" fontSize="13" textAnchor="middle" fontWeight="700">Orchestrate</text>
            </g>
            <g>
              <rect x="562" y="140" width="60" height="24" rx="12" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="592" y="157" fill="#064e3b" fontSize="13" textAnchor="middle" fontWeight="700">Prove</text>
            </g>
          </g>

          {/* Unified Mobile band */}
          <g>
            <rect x="30" y="180" width="640" height="34" rx="8" fill="none" stroke="#8b5cf6" strokeWidth="3" />
            <text x="50" y="202" fill="#4c1d95" fontSize="16" fontWeight="700">Unified Mobile · device-side close of the loop</text>
          </g>

          {/* Intelligence & Orchestration block */}
          <g>
            <rect x="30" y="222" width="640" height="158" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="4" />
            <text x="50" y="244" fill="#7c2d12" fontSize="17" fontWeight="700">Intelligence &amp; Orchestration Layer</text>
            {/* Insights · Detect (blue) */}
            <g>
              <rect x="50" y="256" width="148" height="114" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.5" />
              <text x="62" y="276" fill="#1e3a5f" fontSize="14" fontWeight="700">Insights</text>
              <text x="62" y="291" fill="#2563eb" fontSize="10" fontWeight="700">DETECT</text>
              <text x="62" y="312" fill="#3a2a1a" fontSize="12">trends surface</text>
              <text x="62" y="328" fill="#3a2a1a" fontSize="12">themselves</text>
              <text x="62" y="348" fill="#3a2a1a" fontSize="12">no analyst</text>
              <text x="62" y="364" fill="#3a2a1a" fontSize="12">pulling reports</text>
            </g>
            {/* Intelligence Layer · Trigger (amber) */}
            <g>
              <rect x="206" y="256" width="148" height="114" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="218" y="276" fill="#7c2d12" fontSize="14" fontWeight="700">Intelligence</text>
              <text x="218" y="291" fill="#b45309" fontSize="10" fontWeight="700">TRIGGER</text>
              <text x="218" y="312" fill="#3a2a1a" fontSize="12">~90% vs ~35%</text>
              <text x="218" y="328" fill="#3a2a1a" fontSize="12">cited · reg · proc</text>
              <text x="218" y="348" fill="#3a2a1a" fontSize="12">Recommended</text>
              <text x="218" y="364" fill="#3a2a1a" fontSize="12">Actions</text>
            </g>
            {/* Automation · Orchestrate (violet) */}
            <g>
              <rect x="362" y="256" width="148" height="114" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2.5" />
              <text x="374" y="276" fill="#4c1d95" fontSize="14" fontWeight="700">Automation</text>
              <text x="374" y="291" fill="#6d28d9" fontSize="10" fontWeight="700">ORCHESTRATE</text>
              <text x="374" y="312" fill="#3a2a1a" fontSize="12">runs the play</text>
              <text x="374" y="328" fill="#3a2a1a" fontSize="12">draft · review</text>
              <text x="374" y="348" fill="#3a2a1a" fontSize="12">assign · push</text>
            </g>
            {/* Insights · Prove (green) */}
            <g>
              <rect x="518" y="256" width="132" height="114" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2.5" />
              <text x="530" y="276" fill="#064e3b" fontSize="14" fontWeight="700">Insights</text>
              <text x="530" y="291" fill="#047857" fontSize="10" fontWeight="700">PROVE</text>
              <text x="530" y="312" fill="#3a2a1a" fontSize="12">trend flattened</text>
              <text x="530" y="328" fill="#3a2a1a" fontSize="12">audit pack cited</text>
              <text x="530" y="348" fill="#3a2a1a" fontSize="12">loop closed</text>
            </g>
          </g>

          {/* Core Apps */}
          <g>
            <rect x="30" y="390" width="640" height="86" rx="8" fill="#f5f5f4" stroke="#3a2a1a" strokeWidth="3" />
            <text x="50" y="414" fill="#3a2a1a" fontSize="17" fontWeight="700">Core Apps · one foundation, three systems of record</text>
            <g>
              <rect x="50" y="426" width="190" height="38" rx="6" fill="#fff" stroke="#3a2a1a" strokeWidth="2" />
              <text x="145" y="450" fill="#3a2a1a" fontSize="15" textAnchor="middle" fontWeight="700">SafetyManager365</text>
            </g>
            <g>
              <rect x="250" y="426" width="200" height="38" rx="6" fill="#fff" stroke="#3a2a1a" strokeWidth="2" />
              <text x="350" y="450" fill="#3a2a1a" fontSize="15" textAnchor="middle" fontWeight="700">ContentManager365</text>
            </g>
            <g>
              <rect x="460" y="426" width="200" height="38" rx="6" fill="#fff" stroke="#3a2a1a" strokeWidth="2" />
              <text x="560" y="450" fill="#3a2a1a" fontSize="15" textAnchor="middle" fontWeight="700">TrainingManager365</text>
            </g>
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
