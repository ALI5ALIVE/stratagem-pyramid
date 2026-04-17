import { useState } from "react";
import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { personas } from "@/data/insightsPlaybook";
import { User, MessageSquareQuote } from "lucide-react";

const IRSlide8Personas = (props: SlideNarrationProps) => {
  const [active, setActive] = useState(0);
  const persona = personas[active];

  return (
    <SlideContainer
      id="ir-personas"
      title="How to Talk About It"
      subtitle="Persona-tuned messaging for the four conversations that matter"
      slideNumber={8}
      {...props}
    >
      <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="lg:col-span-1 flex flex-col gap-2">
          {personas.map((p, i) => (
            <button
              key={p.role}
              onClick={() => setActive(i)}
              className={`p-3 rounded-lg border text-left transition-colors ${
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

        <div className={`lg:col-span-3 p-4 rounded-lg border ${persona.color} bg-card flex flex-col gap-3`}>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">They care about</p>
            <p className="text-sm text-foreground/90">{persona.careAbout}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Open with</p>
            <p className="text-sm text-foreground italic">"{persona.openWith}"</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Key message</p>
            <p className="text-sm text-foreground/90 leading-relaxed">{persona.keyMessage}</p>
          </div>
          <div className="mt-auto p-3 rounded-md border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-start gap-2">
              <MessageSquareQuote className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-amber-300 mb-1">Sample question they'd ask</p>
                <p className="text-sm font-display text-foreground">"{persona.sampleQuestion}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default IRSlide8Personas;
