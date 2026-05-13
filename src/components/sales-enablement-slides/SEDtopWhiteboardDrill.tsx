import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, PenLine } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const strokes = [
  { n: 1, color: "text-blue-400", dot: "bg-blue-400", label: "Detect", say: "We start with Detect — the operational signals we listen to." },
  { n: 2, color: "text-amber-400", dot: "bg-amber-400", label: "Trigger", say: "Each signal Triggers the right next action." },
  { n: 3, color: "text-violet-400", dot: "bg-violet-400", label: "Orchestrate", say: "We Orchestrate the work across procedures, training and comms." },
  { n: 4, color: "text-emerald-400", dot: "bg-emerald-400", label: "Prove", say: "And we Prove it closed — auditable, evidence-backed." },
  { n: 5, color: "text-foreground", dot: "bg-foreground/60", label: "Loop arrow", say: "And it loops — every Prove feeds the next Detect." },
  { n: 6, color: "text-blue-300", dot: "bg-blue-300", label: "Six signal chips", say: "These six are the signal sources we listen to." },
];

const signals = ["Safety Reports", "Operational Data", "Maintenance", "Crew Logs", "Regulatory", "Audit"];

const SEDtopWhiteboardDrill = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-slide-dtop-whiteboard"
    slideNumber={slideNumber}
    title="DTOP on a Whiteboard — the 6-stroke drill"
    subtitle="Memorise this sequence. 90 seconds, end to end. Speak each line as you draw it."
    showHeader
    {...narrationProps}
  >
    <div className="h-full grid grid-cols-12 gap-5 px-8 pt-4 pb-6 max-w-[1700px] mx-auto">
      {/* Whiteboard */}
      <div className="col-span-7 rounded-xl bg-[#f5f1e6] border-4 border-[#3a2a1a] shadow-2xl p-6 relative overflow-hidden">
        <div className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-[#3a2a1a]/60 font-mono">whiteboard · 90 sec</div>
        <svg viewBox="0 0 700 460" className="w-full h-full" style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}>
          {/* Detect */}
          <g>
            <rect x="40" y="50" width="240" height="110" rx="8" fill="none" stroke="#2563eb" strokeWidth="4" />
            <text x="60" y="85" fill="#2563eb" fontSize="28" fontWeight="700">1. Detect</text>
            <text x="60" y="115" fill="#1e3a5f" fontSize="16">listen to signals</text>
            <text x="60" y="140" fill="#1e3a5f" fontSize="14" fontStyle="italic">(blue)</text>
          </g>
          {/* arrow → Trigger */}
          <g stroke="#3a2a1a" strokeWidth="3" fill="none">
            <line x1="280" y1="105" x2="410" y2="105" />
            <polyline points="400,98 412,105 400,112" />
          </g>
          {/* Trigger */}
          <g>
            <rect x="420" y="50" width="240" height="110" rx="8" fill="none" stroke="#f59e0b" strokeWidth="4" />
            <text x="440" y="85" fill="#b45309" fontSize="28" fontWeight="700">2. Trigger</text>
            <text x="440" y="115" fill="#3a2a1a" fontSize="16">fire the right action</text>
            <text x="440" y="140" fill="#3a2a1a" fontSize="14" fontStyle="italic">(amber)</text>
          </g>
          {/* arrow ↓ */}
          <g stroke="#3a2a1a" strokeWidth="3" fill="none">
            <line x1="540" y1="170" x2="540" y2="220" />
            <polyline points="533,210 540,222 547,210" />
          </g>
          {/* Orchestrate */}
          <g>
            <rect x="420" y="230" width="240" height="110" rx="8" fill="none" stroke="#8b5cf6" strokeWidth="4" />
            <text x="440" y="265" fill="#6d28d9" fontSize="28" fontWeight="700">3. Orchestrate</text>
            <text x="440" y="295" fill="#3a2a1a" fontSize="16">procedures · training</text>
            <text x="440" y="318" fill="#3a2a1a" fontSize="14" fontStyle="italic">(violet)</text>
          </g>
          {/* arrow ← */}
          <g stroke="#3a2a1a" strokeWidth="3" fill="none">
            <line x1="420" y1="285" x2="290" y2="285" />
            <polyline points="300,278 288,285 300,292" />
          </g>
          {/* Prove */}
          <g>
            <rect x="40" y="230" width="240" height="110" rx="8" fill="none" stroke="#10b981" strokeWidth="4" />
            <text x="60" y="265" fill="#047857" fontSize="28" fontWeight="700">4. Prove</text>
            <text x="60" y="295" fill="#3a2a1a" fontSize="16">auditable evidence</text>
            <text x="60" y="318" fill="#3a2a1a" fontSize="14" fontStyle="italic">(emerald)</text>
          </g>
          {/* loop arrow Prove → Detect (dashed) */}
          <g stroke="#3a2a1a" strokeWidth="2.5" fill="none" strokeDasharray="6 5">
            <path d="M 160 230 C 140 200, 140 180, 160 160" />
            <polyline points="153,168 160,158 168,168" stroke="#3a2a1a" strokeWidth="2.5" fill="none" />
          </g>
          <text x="20" y="200" fill="#3a2a1a" fontSize="13" fontStyle="italic">5. loop</text>
          {/* signal chips below Detect */}
          <text x="40" y="380" fill="#1e3a5f" fontSize="14" fontWeight="700">6. Signals →</text>
          {signals.map((s, i) => (
            <g key={s}>
              <rect x={40 + (i % 3) * 145} y={395 + Math.floor(i / 3) * 32} width="135" height="24" rx="12" fill="none" stroke="#2563eb" strokeWidth="2" />
              <text x={107.5 + (i % 3) * 145} y={412 + Math.floor(i / 3) * 32} fill="#1e3a5f" fontSize="13" textAnchor="middle">{s}</text>
            </g>
          ))}
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
          Practice this 3× before your next call. Time-box yourself to <span className="font-bold text-primary">90 seconds</span>.
        </div>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEDtopWhiteboardDrill;
