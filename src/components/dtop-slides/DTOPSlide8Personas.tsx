import { useState } from "react";
import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { personaMessages } from "@/data/dtopPlaybook";
import { User } from "lucide-react";

const DTOPSlide8Personas = (props: SlideNarrationProps) => {
  const [active, setActive] = useState(0);
  const persona = personaMessages[active];

  return (
    <SlideContainer id="dtop-personas" title="How to Talk About DTOP" subtitle="Persona-specific messaging and discovery questions" slideNumber={8} {...props}>
      <div className="h-full flex gap-4">
        {/* Persona tabs */}
        <div className="flex flex-col gap-1.5 w-48 shrink-0">
          {personaMessages.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-left px-3 py-2 rounded-lg text-xs transition-all border ${
                i === active
                  ? `${p.color} bg-card font-semibold text-foreground`
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {p.role}
            </button>
          ))}
        </div>

        {/* Active persona detail */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">{persona.role}</h3>
          </div>

          <div className="p-3 rounded-lg border border-border bg-card">
            <h5 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">They care about</h5>
            <p className="text-xs text-foreground/80">{persona.careAbout}</p>
          </div>

          <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
            <h5 className="text-[10px] uppercase tracking-wider text-primary mb-1">Open with</h5>
            <p className="text-xs text-foreground/90 italic">"{persona.openWith}"</p>
          </div>

          <div className="p-3 rounded-lg border border-border bg-card">
            <h5 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Key message</h5>
            <p className="text-xs text-foreground/80">{persona.keyMessage}</p>
          </div>

          <div className="p-3 rounded-lg border border-border bg-card flex-1">
            <h5 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Discovery questions</h5>
            <ul className="space-y-1.5">
              {persona.discoveryQuestions.map((q, j) => (
                <li key={j} className="text-[11px] text-foreground/80 flex items-start gap-2">
                  <span className="text-primary font-bold text-[10px] mt-0.5">{j + 1}.</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default DTOPSlide8Personas;
