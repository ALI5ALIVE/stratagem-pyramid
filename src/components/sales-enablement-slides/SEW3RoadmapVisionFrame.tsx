import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Sparkles, TrendingUp, Layers } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const motions = [
  {
    icon: Sparkles,
    color: "text-blue-300",
    border: "border-blue-400/40",
    bg: "bg-blue-500/10",
    label: "Differentiate",
    body: "Only platform that runs the entire curve on one connected foundation — closed by DTOP. Point tools live on one stage; we move customers across all five.",
  },
  {
    icon: TrendingUp,
    color: "text-amber-300",
    border: "border-amber-400/40",
    bg: "bg-amber-500/10",
    label: "Up-sell",
    body: "Every stage compounds on the one below. Moving up the curve is the same platform getting deeper — Insights, Recommendations, Automation, Unified Mobile — not a re-buy.",
  },
  {
    icon: Layers,
    color: "text-violet-300",
    border: "border-violet-400/40",
    bg: "bg-violet-500/10",
    label: "Cross-sell",
    body: "Each Core App is a foothold. The curve makes the case for the next app and the Intelligence Layer — because a connected stage needs a connected footprint.",
  },
];

const SEW3RoadmapVisionFrame = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer
    id="se-w3-roadmap-vision-frame"
    slideNumber={slideNumber}
    title="Frame the Journey — Sell the Vision"
    subtitle="Before you sell capabilities, sell the curve. This is how you differentiate, up-sell and cross-sell."
    showHeader
    {...narrationProps}
  >
    <div className="h-full min-h-0 grid grid-cols-12 gap-4 px-8 pt-2 pb-2 max-w-[1700px] mx-auto">
      {/* Whiteboard — visual parity with W1 drill */}
      <div className="col-span-7 rounded-xl bg-[#f5f1e6] border-4 border-[#3a2a1a] shadow-2xl p-6 relative overflow-hidden">
        <div className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-[#3a2a1a]/60 font-mono">
          whiteboard · the journey · agree the destination before you debate features
        </div>
        <svg viewBox="0 0 700 460" className="w-full h-full" style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}>
          <g stroke="#3a2a1a" strokeWidth="3" fill="none">
            <line x1="60" y1="60" x2="60" y2="400" />
            <line x1="60" y1="400" x2="670" y2="400" />
            <polyline points="53,72 60,58 67,72" />
            <polyline points="660,393 672,400 660,407" />
          </g>
          <text x="20" y="220" fill="#3a2a1a" fontSize="14" fontStyle="italic" transform="rotate(-90, 30, 220)">value / capability</text>
          <text x="320" y="430" fill="#3a2a1a" fontSize="14" fontStyle="italic">time / maturity</text>

          <path
            d="M 110 360 Q 180 358, 220 350 Q 290 340, 330 300 Q 400 220, 470 150 Q 540 90, 610 70"
            stroke="#3a2a1a"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          <circle cx="110" cy="360" r="10" fill="#dc2626" />
          <text x="78" y="388" fill="#dc2626" fontSize="18" fontWeight="700">1. Fragmented</text>

          <circle cx="220" cy="350" r="10" fill="#2563eb" />
          <text x="190" y="378" fill="#2563eb" fontSize="18" fontWeight="700">2. Managed</text>

          <g>
            <line x1="165" y1="355" x2="165" y2="240" stroke="#b45309" strokeWidth="2.5" strokeDasharray="5 4" />
            <polygon points="165,240 310,240 300,270 310,300 165,300" fill="#fde68a" stroke="#b45309" strokeWidth="2.5" />
            <text x="172" y="262" fill="#7c2d12" fontSize="14" fontWeight="700">YOU ARE HERE</text>
            <text x="172" y="288" fill="#7c2d12" fontSize="12" fontStyle="italic">most buyers, honestly</text>
            <circle cx="165" cy="355" r="5" fill="#b45309" />
          </g>

          <circle cx="330" cy="300" r="11" fill="#0d9488" />
          <text x="298" y="328" fill="#0d9488" fontSize="18" fontWeight="700">3. Connected</text>
          <g>
            <rect x="345" y="200" width="200" height="40" rx="6" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeDasharray="6 5" />
            <text x="355" y="218" fill="#0d9488" fontSize="14" fontWeight="700">PLATFORM SHIFT ·</text>
            <text x="355" y="234" fill="#0d9488" fontSize="14" fontWeight="700">WHERE WE WIN</text>
            <line x1="345" y1="240" x2="335" y2="295" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 4" />
          </g>

          <circle cx="470" cy="150" r="11" fill="#8b5cf6" />
          <text x="438" y="138" fill="#6d28d9" fontSize="18" fontWeight="700">4. Intelligent</text>

          <circle cx="610" cy="70" r="12" fill="#f59e0b" />
          <text x="528" y="58" fill="#b45309" fontSize="18" fontWeight="700">5. Predictive</text>
        </svg>
      </div>

      {/* Selling-motion panel */}
      <div className="col-span-5 flex flex-col gap-2 min-h-0 overflow-hidden">
        <div className="text-[10px] uppercase tracking-widest text-primary">
          The selling motion · one curve, three moves
        </div>
        <div className="flex flex-col gap-2 min-h-0">
          {motions.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className={`p-3 rounded-lg border ${m.border} ${m.bg}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`h-4 w-4 ${m.color}`} />
                  <div className={`text-xs font-bold uppercase tracking-wider ${m.color}`}>{m.label}</div>
                </div>
                <p className="text-xs text-foreground leading-snug">{m.body}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-auto px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-[11px] text-foreground leading-snug">
          <span className="font-bold text-primary">Say it out loud:</span> "We give you the tools and the mechanism to walk this curve — that's what the rest of this session covers."
        </div>
      </div>
    </div>
  </PitchSlideContainer>
);

export default SEW3RoadmapVisionFrame;