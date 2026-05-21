import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, PenLine } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const strokes = [
  { n: 1, color: "text-blue-400", dot: "bg-blue-400", label: "Lit lane", say: "They own Safety. Draw it lit — that's the lane that works today." },
  { n: 2, color: "text-muted-foreground", dot: "bg-muted-foreground", label: "Dark lanes", say: "Now draw Content and Training as dotted, empty boxes — those are the dark lanes." },
  { n: 3, color: "text-primary", dot: "bg-primary", label: "Confined intelligence", say: "Inside Safety, write Intelligence Layer, Insights, Automation — and label it 'confined to this lane.'" },
  { n: 4, color: "text-amber-400", dot: "bg-amber-400", label: "Broken loop", say: "Draw the DTOP arrow. It dies at Orchestrate — there's nowhere for the procedure or the training change to land." },
  { n: 5, color: "text-violet-400", dot: "bg-violet-400", label: "Discovery question", say: "Write the question: 'When Safety flags a risk, who owns the procedure and training change?'" },
  { n: 6, color: "text-emerald-400", dot: "bg-emerald-400", label: "Circle the gap", say: "Circle the dark lanes. That circle is the sale — close one of them, and the loop starts to close." },
];

const SEFootprintSingleWhiteboard = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-footprint-single-whiteboard"
    slideNumber={slideNumber}
    title="One App on a Whiteboard — the missing-loop drill"
    subtitle="Safety only is the example — same six strokes work for Content-only or Training-only. 90 seconds, end to end."
    showHeader
    {...narrationProps}
  >
    <div className="h-full grid grid-cols-12 gap-5 px-8 pt-4 pb-6 max-w-[1700px] mx-auto">
      <div className="col-span-7 rounded-xl bg-[#f5f1e6] border-4 border-[#3a2a1a] shadow-2xl p-6 relative overflow-hidden">
        <div className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-[#3a2a1a]/60 font-mono">whiteboard · 90 sec</div>
        <svg viewBox="0 0 700 460" className="w-full h-full" style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}>
          {/* Lit Safety lane */}
          <g>
            <rect x="40" y="50" width="200" height="175" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
            <text x="60" y="85" fill="#2563eb" fontSize="26" fontWeight="700">Safety</text>
            <text x="60" y="110" fill="#1e3a5f" fontSize="14">(LIT — they own this)</text>
            <text x="60" y="145" fill="#1e3a5f" fontSize="13">+ Intelligence Layer</text>
            <text x="60" y="165" fill="#1e3a5f" fontSize="13">+ Insights</text>
            <text x="60" y="185" fill="#1e3a5f" fontSize="13">+ Automation</text>
            <text x="60" y="215" fill="#b45309" fontSize="11" fontStyle="italic">confined to this lane</text>
          </g>
          {/* Dark Content lane */}
          <g>
            <rect x="260" y="50" width="200" height="100" rx="8" fill="none" stroke="#6b7280" strokeWidth="3" strokeDasharray="6 5" />
            <text x="280" y="85" fill="#6b7280" fontSize="24" fontWeight="700">Content</text>
            <text x="280" y="115" fill="#6b7280" fontSize="14" fontStyle="italic">dark lane</text>
          </g>
          {/* Dark Training lane */}
          <g>
            <rect x="480" y="50" width="180" height="100" rx="8" fill="none" stroke="#6b7280" strokeWidth="3" strokeDasharray="6 5" />
            <text x="500" y="85" fill="#6b7280" fontSize="24" fontWeight="700">Training</text>
            <text x="500" y="115" fill="#6b7280" fontSize="14" fontStyle="italic">dark lane</text>
          </g>
          {/* Broken DTOP arrow */}
          <g stroke="#f59e0b" strokeWidth="3" fill="none">
            <line x1="260" y1="240" x2="430" y2="240" />
            <polyline points="420,233 432,240 420,247" />
          </g>
          <text x="280" y="232" fill="#b45309" fontSize="14" fontWeight="700">Detect → Trigger →</text>
          <text x="280" y="270" fill="#dc2626" fontSize="20" fontWeight="700">✗</text>
          <text x="305" y="268" fill="#dc2626" fontSize="13" fontStyle="italic">Orchestrate has nowhere to go</text>
          {/* Discovery question */}
          <g>
            <rect x="40" y="295" width="620" height="60" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <text x="55" y="325" fill="#b45309" fontSize="14" fontWeight="700">Ask:</text>
            <text x="55" y="345" fill="#3a2a1a" fontSize="15" fontStyle="italic">"When Safety flags a risk, who owns the procedure and training change?"</text>
          </g>
          {/* Circle the gap */}
          <g stroke="#10b981" strokeWidth="3" fill="none">
            <ellipse cx="465" cy="100" rx="220" ry="70" />
          </g>
          <text x="300" y="380" fill="#047857" fontSize="14" fontWeight="700">Circle = the sale (close one dark lane)</text>
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

export default SEFootprintSingleWhiteboard;