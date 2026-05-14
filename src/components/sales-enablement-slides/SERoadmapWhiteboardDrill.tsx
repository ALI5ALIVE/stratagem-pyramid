import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, PenLine } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const strokes = [
  { n: 1, color: "text-foreground", dot: "bg-foreground/60", label: "Axes", say: "Draw two axes — value goes up, time / maturity goes right." },
  { n: 2, color: "text-red-400", dot: "bg-red-400", label: "Stages 1–2 + flag", say: "Draw stages 1 and 2 flat, then plant a 'YOU ARE HERE' flag between Fragmented and Managed — that's where most ops actually live today." },
  { n: 3, color: "text-teal-400", dot: "bg-teal-400", label: "Inflection at Stage 3", say: "At stage 3 draw the curve bending up — this is the platform shift, where lessons start to flow between safety, training and comms." },
  { n: 4, color: "text-violet-400", dot: "bg-violet-400", label: "Stage 4", say: "Continue up to stage 4 — AI-assisted: weak-signal detection, prioritised interventions, faster decisions." },
  { n: 5, color: "text-amber-400", dot: "bg-amber-400", label: "Stage 5", say: "Cap the curve at stage 5 — Predictive: prevent the event before it happens." },
  { n: 6, color: "text-blue-300", dot: "bg-blue-300", label: "Tap the flag again", say: "Tap the flag — your job in the next 12 months isn't stage 5. It's getting from here, across the platform shift, to stage 3. Then ask: 'does that feel about right for where you are today?' — and shut up." },
];

const SERoadmapWhiteboardDrill = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-slide-maturity-whiteboard"
    slideNumber={slideNumber}
    title="Operational Performance Roadmap — on a Whiteboard"
    subtitle="6 strokes, 90 seconds. Draw the curve, plant the flag, sell the next stage — not stage 5."
    showHeader
    {...narrationProps}
  >
    <div className="h-full grid grid-cols-12 gap-5 px-8 pt-4 pb-6 max-w-[1700px] mx-auto">
      {/* Whiteboard */}
      <div className="col-span-7 rounded-xl bg-[#f5f1e6] border-4 border-[#3a2a1a] shadow-2xl p-6 relative overflow-hidden">
        <div className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-[#3a2a1a]/60 font-mono">whiteboard · 90 sec · the vision sale</div>
        <svg viewBox="0 0 700 460" className="w-full h-full" style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}>
          {/* Axes */}
          <g stroke="#3a2a1a" strokeWidth="3" fill="none">
            <line x1="60" y1="60" x2="60" y2="400" />
            <line x1="60" y1="400" x2="670" y2="400" />
            <polyline points="53,72 60,58 67,72" />
            <polyline points="660,393 672,400 660,407" />
          </g>
          <text x="20" y="220" fill="#3a2a1a" fontSize="14" fontStyle="italic" transform="rotate(-90, 30, 220)">value / capability</text>
          <text x="320" y="430" fill="#3a2a1a" fontSize="14" fontStyle="italic">time / maturity</text>

          {/* Hockey-stick curve through 5 stages */}
          <path
            d="M 110 360 Q 180 358, 220 350 Q 290 340, 330 300 Q 400 220, 470 150 Q 540 90, 610 70"
            stroke="#3a2a1a"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Stage 1 — Fragmented (red) */}
          <circle cx="110" cy="360" r="10" fill="#dc2626" />
          <text x="78" y="388" fill="#dc2626" fontSize="18" fontWeight="700">1. Fragmented</text>

          {/* Stage 2 — Managed (blue) */}
          <circle cx="220" cy="350" r="10" fill="#2563eb" />
          <text x="190" y="378" fill="#2563eb" fontSize="18" fontWeight="700">2. Managed</text>

          {/* YOU ARE HERE flag — between stage 1 and stage 2 */}
          <g>
            <line x1="165" y1="355" x2="165" y2="245" stroke="#b45309" strokeWidth="2.5" strokeDasharray="5 4" />
            <polygon points="165,245 255,245 245,260 255,275 165,275" fill="#fde68a" stroke="#b45309" strokeWidth="2.5" />
            <text x="172" y="262" fill="#7c2d12" fontSize="14" fontWeight="700">YOU ARE HERE</text>
            <text x="172" y="290" fill="#7c2d12" fontSize="12" fontStyle="italic">for most buyers</text>
            <circle cx="165" cy="355" r="5" fill="#b45309" />
          </g>

          {/* Stage 3 — Connected (teal) + INFLECTION marker */}
          <circle cx="330" cy="300" r="11" fill="#0d9488" />
          <text x="298" y="328" fill="#0d9488" fontSize="18" fontWeight="700">3. Connected</text>
          <g>
            <rect x="345" y="200" width="180" height="40" rx="6" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeDasharray="6 5" />
            <text x="355" y="218" fill="#0d9488" fontSize="14" fontWeight="700">INFLECTION ·</text>
            <text x="355" y="234" fill="#0d9488" fontSize="14" fontWeight="700">PLATFORM SHIFT</text>
            <line x1="345" y1="240" x2="335" y2="295" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 4" />
          </g>

          {/* Stage 4 — Intelligent (violet) */}
          <circle cx="470" cy="150" r="11" fill="#8b5cf6" />
          <text x="438" y="138" fill="#6d28d9" fontSize="18" fontWeight="700">4. Intelligent</text>

          {/* Stage 5 — Predictive (amber) */}
          <circle cx="610" cy="70" r="12" fill="#f59e0b" />
          <text x="528" y="58" fill="#b45309" fontSize="18" fontWeight="700">5. Predictive</text>
        </svg>
      </div>

      {/* Stroke script */}
      <div className="col-span-5 flex flex-col gap-2">
        <div className="text-[10px] uppercase tracking-widest text-primary flex items-center gap-2">
          <PenLine className="h-3 w-3" /> Stroke script · say it as you draw it
        </div>
        <div className="flex flex-col gap-2">
          {strokes.map((s) => (
            <div key={s.n} className="flex items-start gap-3 p-2.5 rounded-lg border border-border bg-card/60">
              <div className={`shrink-0 w-7 h-7 rounded-full ${s.dot} text-background font-bold flex items-center justify-center text-sm`}>{s.n}</div>
              <div className="min-w-0">
                <div className={`text-xs font-semibold ${s.color} uppercase tracking-wider`}>{s.label}</div>
                <p className="text-sm text-foreground leading-snug">"{s.say}"</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs text-foreground">
          <Clock className="h-3.5 w-3.5 text-primary" />
          Practice 3× · time-box to <span className="font-bold text-primary">90 seconds</span> · this is the vision sale.
        </div>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SERoadmapWhiteboardDrill;