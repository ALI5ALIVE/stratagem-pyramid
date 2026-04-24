import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { GraduationCap, TrendingUp, Layers, Workflow, Trophy, Sparkles, Target } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
}

const modules = [
  { num: 1, title: "The Market Shift", desc: "Why this exists", icon: TrendingUp, accent: "text-sky-400 border-sky-500/40 bg-sky-500/10" },
  { num: 2, title: "What It Is", desc: "Plain-English pitch", icon: Sparkles, accent: "text-violet-400 border-violet-500/40 bg-violet-500/10" },
  { num: 3, title: "The Capabilities", desc: "How it fits together", icon: Layers, accent: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
  { num: 4, title: "How We Sell It", desc: "Discovery → demo → close", icon: Workflow, accent: "text-amber-400 border-amber-500/40 bg-amber-500/10" },
  { num: 5, title: "Use Cases & DTOP", desc: "Value through Detect→Prove", icon: Target, accent: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10" },
  { num: 6, title: "Why We Win", desc: "Objections & next steps", icon: Trophy, accent: "text-rose-400 border-rose-500/40 bg-rose-500/10" },
];

const SESlide0Title = ({ slideNumber, ...narrationProps }: Props) => (
  <PitchSlideContainer id="se-title" slideNumber={slideNumber} {...narrationProps}>
    <div className="h-full flex flex-col justify-center max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="px-3 py-1 rounded-full border border-primary/40 bg-primary/10 flex items-center gap-2">
          <GraduationCap className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-primary">Sales Enablement Training</span>
        </div>
        <span className="text-[11px] text-muted-foreground">31 slides · ~50 min</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight mb-3">
        Selling the Operational <br />Performance Platform
      </h1>
      <p className="text-base text-muted-foreground max-w-2xl mb-8">
        A guided walkthrough for new reps. By the end you'll be able to explain the platform on a discovery call — in plain English, without jargon.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.num} className={`p-3 rounded-lg border ${m.accent} flex flex-col gap-1.5`}>
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4" />
                <span className="text-[10px] font-mono opacity-70">M{m.num}</span>
              </div>
              <div className="text-xs font-semibold text-foreground">{m.title}</div>
              <div className="text-[10px] text-muted-foreground leading-snug">{m.desc}</div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground/70 italic mt-6">
        Use ↓ / Space to advance · ↑ to go back · Sidebar for jump-to-slide
      </p>
    </div>
  </PitchSlideContainer>
);

export default SESlide0Title;