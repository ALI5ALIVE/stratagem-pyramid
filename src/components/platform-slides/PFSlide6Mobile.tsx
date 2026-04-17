import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { mobileExperience } from "@/data/platformPlaybook";
import { Smartphone, KeyRound, Layers, Workflow } from "lucide-react";

const pillarIcons = [Smartphone, KeyRound, Layers, Workflow];

const PFSlide6Mobile = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="pf-mobile"
      title="The Unified Mobile Experience"
      subtitle={mobileExperience.headline}
      slideNumber={6}
      {...props}
    >
      <div className="h-full flex flex-col gap-3">
        <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-4">
          <p className="text-sm text-foreground/85 leading-relaxed">{mobileExperience.description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-1">
          {mobileExperience.pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <div key={i} className="rounded-lg border border-border bg-card p-3 flex flex-col gap-2">
                <Icon className="h-5 w-5 text-violet-400" />
                <h4 className="text-xs font-semibold text-foreground">{p.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{p.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Phased delivery</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {mobileExperience.phases.map((p, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded border border-violet-500/20 bg-violet-500/5">
                <span className="text-xs font-bold text-violet-300 shrink-0">{p.phase}</span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[11px] text-foreground/80">{p.when}</span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[11px] text-foreground/70 truncate">{p.what}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default PFSlide6Mobile;
