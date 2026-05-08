import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Database, Brain, Workflow } from "lucide-react";

const pillars = [
  {
    icon: Database,
    title: "Three Systems of Record",
    point: "Safety, Content & Training",
    body: "Operational data lives in one connected fabric — not silos. Signals can be detected across domains because the data is already joined.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
  },
  {
    icon: Brain,
    title: "CoAnalyst",
    point: "~90% domain accuracy vs ~35% generic AI",
    body: "Purpose-built intelligence that reads aviation operational language. The difference between detecting a signal and missing it is accuracy.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
  {
    icon: Workflow,
    title: "DTOP",
    point: "Detect → Trigger → Orchestrate → Prove",
    body: "The operating model that closes the loop. Every signal becomes a tracked action and an audit-ready record of control.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
];

const SIGSlide9WhyComply365 = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="sig-why-us"
      title="Why Comply365 owns this story"
      subtitle="Other vendors collect data or score it. Only Comply365 turns signals into provable operational control."
      slideNumber={9}
      {...props}
    >
      <div className="h-full flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-4 flex-1">
          {pillars.map((p) => (
            <div key={p.title} className={`p-5 rounded-xl border ${p.border} ${p.bg} flex flex-col`}>
              <p.icon className={`h-7 w-7 ${p.color} mb-3`} />
              <h4 className={`text-lg font-semibold ${p.color} mb-1`}>{p.title}</h4>
              <p className="text-xs text-foreground/80 mb-3 font-medium">{p.point}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="text-primary font-semibold">Master message:</span> we're not selling another dashboard.
            We're selling the operating model that turns operational signals into board-ready, audit-ready,{" "}
            <span className="text-primary font-semibold">provable control</span>.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SIGSlide9WhyComply365;