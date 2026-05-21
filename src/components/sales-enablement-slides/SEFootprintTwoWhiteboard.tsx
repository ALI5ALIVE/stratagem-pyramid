import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, PenLine } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const strokes = [
  { n: 1, color: "text-blue-400", dot: "bg-blue-400", label: "Two lit lanes", say: "They own Safety and Content. Draw both lit, side by side." },
  { n: 2, color: "text-muted-foreground", dot: "bg-muted-foreground", label: "One dark lane", say: "Draw Training as a dotted, empty box — the lane that's still dark." },
  { n: 3, color: "text-amber-400", dot: "bg-amber-400", label: "Half-loop arrow", say: "Detect → Trigger → Orchestrate (procedures only) → ✗ no Training → Prove is partial. The loop is half-closed." },
  { n: 4, color: "text-primary", dot: "bg-primary", label: "Intelligence band", say: "Above the lit lanes, write Intelligence Layer, Insights, Automation — label it 'across two lanes, still confined.'" },
  { n: 5, color: "text-violet-400", dot: "bg-violet-400", label: "Discovery question", say: "Write the question: 'When a procedure changes, how do you know every crew is trained on it before the next shift?'" },
  { n: 6, color: "text-emerald-400", dot: "bg-emerald-400", label: "Circle the missing lane", say: "Circle Training. That circle is the loop-close — and it's almost always the cheapest path to the full DTOP loop." },
];

const SEFootprintTwoWhiteboard = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-footprint-two-whiteboard"
    slideNumber={slideNumber}
    title="Two Apps on a Whiteboard — the half-loop drill"
    subtitle="Safety + Content shown — same six strokes work for any 2-of-3 combination. 90 seconds, end to end."
    showHeader
    {...narrationProps}
  >
    <div className="h-full grid grid-cols-12 gap-5 px-8 pt-4 pb-6 max-w-[1700px] mx-auto">
      <div className="col-span-7 rounded-xl bg-[#f5f1e6] border-4 border-[#3a2a1a] shadow-2xl p-6 relative overflow-hidden">
        <div className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-[#3a2a1a]/60 font-mono">whiteboard · 90 sec</div>
        <svg viewBox="0 0 700 460" className="w-full h-full" style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}>
          {/* Intelligence band */}
          <g>
            <rect x="40" y="20" width="620" height="55" rx="8" fill="#ede9fe" stroke="#6d28d9" strokeWidth="3" />
            <text x="55" y="44" fill="#6d28d9" fontSize="15" fontWeight="700">Intelligence Layer · Insights · Automation</text>
            <text x="55" y="64" fill="#b45309" fontSize="12" fontStyle="italic">across 2 lanes — still confined</text>
          </g>
          {/* Lit Safety */}
          <g>
            <rect x="40" y="90" width="200" height="120" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
            <text x="60" y="125" fill="#2563eb" fontSize="24" fontWeight="700">Safety</text>
            <text x="60" y="150" fill="#1e3a5f" fontSize="13">(LIT)</text>
            <text x="60" y="180" fill="#1e3a5f" fontSize="13">+ intelligence here</text>
          </g>
          {/* Lit Content */}
          <g>
            <rect x="260" y="90" width="200" height="120" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
            <text x="280" y="125" fill="#2563eb" fontSize="24" fontWeight="700">Content</text>
            <text x="280" y="150" fill="#1e3a5f" fontSize="13">(LIT)</text>
            <text x="280" y="180" fill="#1e3a5f" fontSize="13">+ intelligence here</text>
          </g>
          {/* Dark Training */}
          <g>
            <rect x="480" y="90" width="180" height="120" rx="8" fill="none" stroke="#6b7280" strokeWidth="3" strokeDasharray="6 5" />
            <text x="500" y="125" fill="#6b7280" fontSize="24" fontWeight="700">Training</text>
            <text x="500" y="155" fill="#6b7280" fontSize="14" fontStyle="italic">dark lane</text>
            <text x="500" y="180" fill="#6b7280" fontSize="13" fontStyle="italic">no intelligence reach</text>
          </g>
          {/* Half-loop arrow */}
          <g stroke="#f59e0b" strokeWidth="3" fill="none">
            <line x1="60" y1="250" x2="460" y2="250" />
          </g>
          <text x="60" y="240" fill="#b45309" fontSize="13" fontWeight="700">Detect → Trigger → Orchestrate (procedures only)</text>
          <text x="475" y="255" fill="#dc2626" fontSize="20" fontWeight="700">✗</text>
          <text x="60" y="272" fill="#dc2626" fontSize="13" fontStyle="italic">no Training reach → Prove partial</text>
          {/* Discovery question */}
          <g>
            <rect x="40" y="295" width="620" height="65" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <text x="55" y="320" fill="#b45309" fontSize="14" fontWeight="700">Ask:</text>
            <text x="55" y="345" fill="#3a2a1a" fontSize="14" fontStyle="italic">"When a procedure changes, how do you know every crew is trained before the next shift?"</text>
          </g>
          {/* Circle the missing lane */}
          <g stroke="#10b981" strokeWidth="3" fill="none">
            <ellipse cx="570" cy="150" rx="100" ry="75" />
          </g>
          <text x="280" y="385" fill="#047857" fontSize="14" fontWeight="700">Circle = the loop-close (cheapest path)</text>
        </svg>
      </div>
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
          Practice this 3× before your next call. Time-box yourself to <span className="font-bold text-primary">90 seconds</span>.
        </div>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEFootprintTwoWhiteboard;