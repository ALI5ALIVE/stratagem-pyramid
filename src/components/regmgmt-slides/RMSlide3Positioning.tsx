import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { positioning } from "@/data/regulationManagementPlaybook";
import { Target, Users, AlertCircle, Sparkles, Quote } from "lucide-react";

const framework = [
  { icon: Target, label: "Role", value: positioning.role },
  { icon: Users, label: "Audience", value: positioning.audience },
  { icon: AlertCircle, label: "Problem", value: positioning.problem },
  { icon: Sparkles, label: "Unique Value", value: positioning.uniqueValue },
];

const RMSlide3Positioning = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-positioning"
      title="Solution Positioning"
      subtitle="How we frame Regulation Management in the market"
      slideNumber={3}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full">
        <div className="md:col-span-3 grid grid-cols-2 gap-3">
          {framework.map((f) => (
            <div key={f.label} className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <f.icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{f.label}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.value}</p>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 border border-primary/30 bg-primary/5 rounded-lg p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <Quote className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Positioning Statement</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed italic">{positioning.statement}</p>
          <p className="text-xs text-primary font-medium mt-3">{positioning.keyFraming}</p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default RMSlide3Positioning;
