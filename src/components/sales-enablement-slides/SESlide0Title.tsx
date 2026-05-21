import PitchSlideContainer from "@/components/shared/PitchSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { GraduationCap, TrendingUp, Layers, Workflow } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
  slideCount?: number;
  onJumpToWeek?: (weekId: string) => void;
}

const weeks = [
  {
    num: 1,
    weekId: "se-week-1",
    title: "Foundation",
    desc: "The market shift & plain-English pitch",
    covers: "Modules 1–2",
    icon: TrendingUp,
    accent: "text-sky-400 border-sky-500/40 bg-sky-500/10",
  },
  {
    num: 2,
    weekId: "se-week-2",
    title: "Capabilities",
    desc: "How the platform fits together",
    covers: "Module 3",
    icon: Layers,
    accent: "text-violet-400 border-violet-500/40 bg-violet-500/10",
  },
  {
    num: 3,
    weekId: "se-week-3",
    title: "Sell & Win",
    desc: "Discovery → walkthrough → close, use cases, objections",
    covers: "Modules 4–6",
    icon: Workflow,
    accent: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  },
];

const SESlide0Title = ({ slideNumber, slideCount, onJumpToWeek, ...narrationProps }: Props) => (
  <PitchSlideContainer id="se-title" slideNumber={slideNumber} {...narrationProps}>
    <div className="h-full flex flex-col justify-center max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="px-3 py-1 rounded-full border border-primary/40 bg-primary/10 flex items-center gap-2">
          <GraduationCap className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-primary">Sales Enablement Training</span>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {slideCount ? `${slideCount} slides · ` : ""}3 weeks · ~50 min
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight mb-3">
        Selling the Operational <br />Performance Platform
      </h1>
      <p className="text-base text-muted-foreground max-w-2xl mb-8">
        A guided walkthrough for new reps, structured as three weeks of study. By the end you'll be able to explain the platform on a discovery call — in plain English, without jargon.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {weeks.map((w) => {
          const Icon = w.icon;
          return (
            <button
              key={w.num}
              type="button"
              onClick={() => onJumpToWeek?.(w.weekId)}
              className={`p-4 rounded-lg border ${w.accent} flex flex-col gap-2 text-left cursor-pointer transition-all hover:brightness-125 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60`}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-mono opacity-70">WEEK {w.num}</span>
              </div>
              <div className="text-base font-semibold text-foreground">{w.title}</div>
              <div className="text-xs text-muted-foreground leading-snug">{w.desc}</div>
              <div className="text-[10px] text-foreground/60 mt-auto pt-2 border-t border-border/40">{w.covers}</div>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground/70 italic mt-6">
        Click a week to jump in · ↓ / Space to advance · ↑ to go back · Sidebar for jump-to-slide
      </p>
    </div>
  </PitchSlideContainer>
);

export default SESlide0Title;