import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { objections, discoveryQuestions, useTerms, avoidTerms } from "@/data/signalsPlaybook";
import { MessageSquare, HelpCircle, Check, X } from "lucide-react";

const SIGSlide10Closing = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="sig-closing"
      title="Talk track, objections & language"
      subtitle="What to say in the room — and what never to say. Use this as a pocket reference before every signal-led conversation."
      slideNumber={10}
      {...props}
    >
      <div className="h-full grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl border border-border bg-card flex-1">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold text-foreground">Top objections</h4>
            </div>
            <div className="space-y-3">
              {objections.slice(0, 3).map((o, i) => (
                <div key={i} className="border-l-2 border-primary/40 pl-3">
                  <p className="text-xs text-muted-foreground italic mb-1">"{o.objection}"</p>
                  <p className="text-xs text-foreground leading-relaxed">{o.reframe}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold text-foreground">Discovery questions</h4>
            </div>
            <ul className="space-y-2">
              {discoveryQuestions.slice(0, 4).map((q, i) => (
                <li key={i} className="text-xs text-foreground leading-relaxed">
                  <span className="text-primary font-medium">{q.audience}:</span>{" "}
                  <span className="text-muted-foreground">{q.question}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Check className="h-4 w-4 text-emerald-400" />
              <h4 className="text-sm font-semibold text-emerald-400">Use these terms</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {useTerms.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <X className="h-4 w-4 text-destructive" />
              <h4 className="text-sm font-semibold text-destructive">Avoid these</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {avoidTerms.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-md bg-destructive/10 border border-destructive/30 text-destructive line-through decoration-destructive/40">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
            <p className="text-xs uppercase tracking-widest text-primary mb-1">The close</p>
            <p className="text-sm text-foreground font-medium leading-relaxed">
              "Your team is already collecting the signals. The question is whether you're acting on them — and whether
              you can prove it. That's what we do."
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SIGSlide10Closing;