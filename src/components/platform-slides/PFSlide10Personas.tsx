import { useState } from "react";
import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { personas } from "@/data/platformPlaybook";
import { User, MessageSquareQuote } from "lucide-react";

const PFSlide10Personas = (props: SlideNarrationProps) => {
  const [active, setActive] = useState(0);
  const persona = personas[active];

  return (
    <SlideContainer
      id="pf-personas"
      title="How to Talk About It"
      subtitle="Persona-tailored openers for the master platform conversation."
      slideNumber={10}
      {...props}
    >
      <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          {personas.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`p-3 rounded-lg border text-left transition-all ${
                i === active ? `${p.color} bg-card` : "border-border bg-card/50 hover:bg-card"
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">{p.role}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{p.careAbout}</p>
            </button>
          ))}
        </div>

        <div className="md:col-span-2 flex flex-col gap-3">
          <div className="p-3 rounded-lg border border-border bg-card">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Cares about</p>
            <p className="text-sm text-foreground">{persona.careAbout}</p>
          </div>
          <div className="p-3 rounded-lg border border-blue-500/30 bg-blue-500/5">
            <p className="text-[10px] uppercase tracking-wider text-blue-300 mb-1">Open with</p>
            <p className="text-sm text-foreground font-display">"{persona.openWith}"</p>
          </div>
          <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-primary mb-1">Key message</p>
            <p className="text-sm text-foreground leading-relaxed">{persona.keyMessage}</p>
          </div>
          <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 flex items-start gap-2">
            <MessageSquareQuote className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-amber-300 mb-1">Discovery question</p>
              <p className="text-sm text-foreground">{persona.sampleQuestion}</p>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default PFSlide10Personas;
