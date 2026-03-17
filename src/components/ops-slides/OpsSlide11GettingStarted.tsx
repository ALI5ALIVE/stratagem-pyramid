import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Search, TestTube, Rocket, MessageSquare } from "lucide-react";

interface OpsSlide11Props extends SlideNarrationProps {
  slideNumber?: number;
}

const engagementSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    desc: "Half-day workshop to map your current operational landscape, identify high-value use cases, and define your maturity starting point.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/30",
  },
  {
    icon: TestTube,
    step: "02",
    title: "Pilot",
    desc: "90-day proof of value on your top use case — typically hard landing retraining or regulatory change cascade. Measurable outcomes from week one.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Scale",
    desc: "Expand across departments and use cases with a phased roadmap. Each phase builds on proven value — no big-bang required.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
];

const OpsSlide11GettingStarted = ({ slideNumber, ...narrationProps }: OpsSlide11Props) => {
  return (
    <SalesSlideContainer
      id="ops-slide-11"
      title="Getting Started"
      subtitle="Your path to connected operational performance"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col justify-center gap-6 min-h-0">
        {/* Engagement model */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
          {engagementSteps.map((step) => (
            <div key={step.step} className={`p-6 rounded-xl border ${step.border} ${step.bg} flex flex-col h-full`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${step.bg} border ${step.border}`}>
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Step {step.step}</span>
                  <h3 className={`text-xl font-bold ${step.color}`}>{step.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-6 rounded-xl border border-primary/30 bg-primary/5 text-center">
          <MessageSquare className="h-7 w-7 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-display font-bold text-foreground mb-2">
            What does your first use case look like?
          </h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Let's start with a discovery workshop to identify the use case that will
            deliver the most value for your operation — and prove it in 90 days.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide11GettingStarted;
