import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { AlertTriangle, EyeOff, Clock } from "lucide-react";

const painPoints = [
  { icon: EyeOff, label: "Unread reports", stat: "12,000+", caption: "Hazard reports sitting in SMS databases — never read, never actioned." },
  { icon: Clock, label: "Time-to-act", stat: "Weeks", caption: "Between a signal appearing and an operator doing something about it." },
  { icon: AlertTriangle, label: "Repeat events", stat: "70% recurring", caption: "Most incidents had precursor signals nobody connected." },
];

const SIGSlide1WhyMatters = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="sig-why"
      title="Why signals matter"
      subtitle="Operators are drowning in data — but starving for signal. The next event is almost always hiding in last quarter's reports."
      slideNumber={1}
      {...props}
    >
      <div className="h-full flex flex-col gap-6">
        <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5">
          <p className="text-base text-foreground leading-relaxed">
            Aviation has entered the <span className="text-amber-400 font-semibold">signal age</span>. Every flight, every report,
            every manual change, every training session emits operational data. The winners aren't the operators with the most
            data — they're the ones who turn that data into <span className="text-primary font-semibold">signals they can act on</span>.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 flex-1">
          {painPoints.map((p) => (
            <div key={p.label} className="p-5 rounded-xl border border-border bg-card flex flex-col">
              <p.icon className="h-6 w-6 text-amber-400 mb-3" />
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{p.label}</p>
              <p className="text-3xl font-display font-bold text-foreground mb-2">{p.stat}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.caption}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
          <p className="text-sm text-foreground">
            <span className="text-primary font-semibold">The shift:</span>{" "}
            event management → signal management → <span className="text-primary font-semibold">control management</span>.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SIGSlide1WhyMatters;