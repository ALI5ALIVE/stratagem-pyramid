import { useState } from "react";
import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { personas } from "@/data/automationPlaybook";
import { User, MessageSquareQuote } from "lucide-react";

const AUSlide8Personas = (props: SlideNarrationProps) => {
  const [active, setActive] = useState(0);
  const persona = personas[active];

  return (
    <SlideContainer
      id="au-personas"
      title="How to Talk About It"
      subtitle="Persona-led messaging — open with what they actually care about"
      slideNumber={8}
      {...props}
    >
      <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="lg:col-span-1 flex flex-col gap-2">
          {personas.map((p, i) => (
            <button
              key={p.role}
              onClick={() => setActive(i)}
              className={`p-3 rounded-lg border text-left transition-all ${
                i === active
                  ? `${p.color} bg-card`
                  : "border-border bg-card/50 hover:bg-card"
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">{p.role}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="p-3 rounded-lg border border-border bg-card">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">
              What they care about
            </p>
            <p className="text-sm text-foreground">{persona.careAbout}</p>
          </div>
          <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
            <p className="text-[10px] uppercase tracking-wider text-amber-300 mb-1 font-medium">Open with</p>
            <p className="text-sm text-foreground italic">"{persona.openWith}"</p>
          </div>
          <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
            <p className="text-[10px] uppercase tracking-wider text-primary mb-1 font-medium">Key message</p>
            <p className="text-sm text-foreground">{persona.keyMessage}</p>
          </div>
          <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
            <p className="text-[10px] uppercase tracking-wider text-emerald-300 mb-1 font-medium flex items-center gap-1.5">
              <MessageSquareQuote className="h-3.5 w-3.5" />
              Sample question they'd ask
            </p>
            <p className="text-sm text-foreground font-display">"{persona.sampleQuestion}"</p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default AUSlide8Personas;
