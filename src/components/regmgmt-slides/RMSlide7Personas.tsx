import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { personaRelevance } from "@/data/regulationManagementPlaybook";
import { User } from "lucide-react";

const RMSlide7Personas = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-personas"
      title="Persona Relevance"
      subtitle="Who buys this and why"
      slideNumber={7}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {personaRelevance.map((p) => (
          <div key={p.role} className="border border-border rounded-lg p-3 flex flex-col" style={{ borderTopColor: p.color, borderTopWidth: 2 }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ backgroundColor: `${p.color}20` }}>
                <User className="h-3.5 w-3.5" style={{ color: p.color }} />
              </div>
              <span className="text-xs font-semibold text-foreground">{p.role}</span>
            </div>
            <div className="mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Care About</span>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{p.careAbout}</p>
            </div>
            <div className="mt-auto border-t border-border pt-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: p.color }}>Message</span>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5 italic">{p.message}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  );
};

export default RMSlide7Personas;
