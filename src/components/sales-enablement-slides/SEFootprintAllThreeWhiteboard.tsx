import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, PenLine } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const strokes = [
  { n: 1, color: "text-blue-400", dot: "bg-blue-400", label: "Three lit lanes", say: "Draw all three lit — Safety, Content, Training. The foundation is in place." },
  { n: 2, color: "text-violet-400", dot: "bg-violet-400", label: "Closed DTOP loop", say: "Draw the DTOP arrow as a full loop — Detect, Trigger, Orchestrate, Prove — back to Detect. Every signal can now reach a procedure, a crew, and an audit trail." },
  { n: 3, color: "text-primary", dot: "bg-primary", label: "Intelligence band", say: "Above the loop, draw the intelligence band — Intelligence Layer, Insights, Automation, Mobile. Say: 'this is scope, not new features — they already had these inside their lanes.'" },
  { n: 4, color: "text-amber-400", dot: "bg-amber-400", label: "Cross-lane reach", say: "Draw arrows from the band reaching across all three lanes. The intelligence layer can now reason across the whole loop, not one lane of it." },
  { n: 5, color: "text-emerald-400", dot: "bg-emerald-400", label: "Accuracy callout", say: "Write the headline: ~90% domain accuracy vs ~35% generic AI. That's the conductor in front of the orchestra." },
  { n: 6, color: "text-foreground", dot: "bg-foreground/60", label: "Vision question", say: "Ask: 'Which decisions in your operation still rely on a human stitching three systems together?' Then stop — let them answer." },
];

const SEFootprintAllThreeWhiteboard = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-footprint-all-whiteboard"
    slideNumber={slideNumber}
    title="All Three on a Whiteboard — the platform vision drill"
    subtitle="The loop is closed. Now sell the conductor — the intelligence layer reasoning across every lane. 90 seconds, end to end."
    showHeader
    {...narrationProps}
  >
    <div className="h-full grid grid-cols-12 gap-5 px-8 pt-4 pb-6 max-w-[1700px] mx-auto">
      <div className="col-span-8 rounded-xl bg-[#f5f1e6] border-4 border-[#3a2a1a] shadow-2xl p-3 relative min-h-0 overflow-hidden flex flex-col">
        <svg viewBox="0 0 700 460" preserveAspectRatio="xMidYMin meet" className="w-full h-full flex-1" style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}>
          {/* Intelligence band */}
          <g>
            <rect x="40" y="20" width="620" height="60" rx="8" fill="#ede9fe" stroke="#6d28d9" strokeWidth="3" />
            <text x="55" y="46" fill="#6d28d9" fontSize="17" fontWeight="700">Intelligence Layer · Insights · Automation · Mobile</text>
            <text x="55" y="68" fill="#b45309" fontSize="12" fontStyle="italic">scope, not new features — they already had these inside their lanes</text>
          </g>
          {/* Cross-lane arrows from band */}
          <g stroke="#6d28d9" strokeWidth="2" fill="none" strokeDasharray="4 3">
            <line x1="140" y1="78" x2="140" y2="115" />
            <polyline points="134,108 140,118 146,108" fill="#6d28d9" />
            <line x1="350" y1="78" x2="350" y2="115" />
            <polyline points="344,108 350,118 356,108" fill="#6d28d9" />
            <line x1="560" y1="78" x2="560" y2="115" />
            <polyline points="554,108 560,118 566,108" fill="#6d28d9" />
          </g>
          {/* Three lit lanes */}
          <g>
            <rect x="40" y="120" width="200" height="100" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
            <text x="60" y="155" fill="#2563eb" fontSize="22" fontWeight="700">Safety</text>
            <text x="60" y="185" fill="#1e3a5f" fontSize="13">LIT</text>
          </g>
          <g>
            <rect x="250" y="120" width="200" height="100" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
            <text x="270" y="155" fill="#2563eb" fontSize="22" fontWeight="700">Content</text>
            <text x="270" y="185" fill="#1e3a5f" fontSize="13">LIT</text>
          </g>
          <g>
            <rect x="460" y="120" width="200" height="100" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
            <text x="480" y="155" fill="#2563eb" fontSize="22" fontWeight="700">Training</text>
            <text x="480" y="185" fill="#1e3a5f" fontSize="13">LIT</text>
          </g>
          {/* Closed DTOP loop */}
          <g stroke="#10b981" strokeWidth="3" fill="none">
            <rect x="60" y="245" width="580" height="90" rx="45" />
            <polyline points="630,285 645,290 630,295" fill="#10b981" />
          </g>
          <text x="80" y="278" fill="#047857" fontSize="16" fontWeight="700">Detect →</text>
          <text x="220" y="278" fill="#b45309" fontSize="16" fontWeight="700">Trigger →</text>
          <text x="360" y="278" fill="#6d28d9" fontSize="16" fontWeight="700">Orchestrate →</text>
          <text x="540" y="278" fill="#047857" fontSize="16" fontWeight="700">Prove ↻</text>
          <text x="80" y="320" fill="#3a2a1a" fontSize="13" fontStyle="italic">closed loop · across all three lanes</text>
          {/* Accuracy callout */}
          <g>
            <rect x="40" y="355" width="320" height="60" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <text x="55" y="380" fill="#b45309" fontSize="14" fontWeight="700">~90% domain accuracy</text>
            <text x="55" y="402" fill="#3a2a1a" fontSize="13" fontStyle="italic">vs ~35% generic AI</text>
          </g>
          {/* Vision question */}
          <g>
            <rect x="380" y="355" width="280" height="60" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            <text x="395" y="380" fill="#2563eb" fontSize="13" fontWeight="700">Ask:</text>
            <text x="395" y="402" fill="#1e3a5f" fontSize="12" fontStyle="italic">"Who's stitching the 3 systems together?"</text>
          </g>
        </svg>
      </div>
      <div className="col-span-4 flex flex-col gap-2">
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
          Practice this 3× before your next account review. Time-box yourself to <span className="font-bold text-primary">90 seconds</span>.
        </div>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEFootprintAllThreeWhiteboard;