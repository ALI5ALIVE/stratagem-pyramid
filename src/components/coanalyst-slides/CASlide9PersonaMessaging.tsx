import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Shield, Plane, Wrench, Briefcase, Lightbulb } from "lucide-react";
import { useState } from "react";

const personas = [
  {
    icon: Shield, title: "Safety Leaders", color: "text-emerald-400", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/30",
    cares: "Regulatory compliance, hazard visibility, investigation efficiency, proactive safety culture",
    helps: "Moves safety management from reactive investigation to proactive control monitoring with aviation-specific precision",
    message: "CoAnalyst transforms your safety data into intelligence that identifies hazards, monitors control effectiveness, and enables proactive safety management — not just faster report processing.",
  },
  {
    icon: Plane, title: "Operations Leaders", color: "text-blue-400", bgColor: "bg-blue-400/10", borderColor: "border-blue-400/30",
    cares: "On-time performance, dispatch reliability, operational disruption reduction, schedule integrity",
    helps: "Detects operational patterns and correlations that prevent delays and disruptions before they cascade",
    message: "CoAnalyst gives you intelligence across your operation — connecting safety, training, and maintenance data to identify the patterns behind delays, disruptions, and reliability issues.",
  },
  {
    icon: Wrench, title: "Maintenance & Engineering", color: "text-orange-400", bgColor: "bg-orange-400/10", borderColor: "border-orange-400/30",
    cares: "Fleet reliability, defect trends, component performance, maintenance efficiency",
    helps: "Surfaces cross-domain patterns linking maintenance events to safety and operational outcomes",
    message: "CoAnalyst connects maintenance data with safety and operational intelligence to reveal defect trends, component risks, and reliability patterns that single-system analysis misses.",
  },
  {
    icon: Briefcase, title: "Airline Executives", color: "text-violet-400", bgColor: "bg-violet-400/10", borderColor: "border-violet-400/30",
    cares: "Revenue protection, cost reduction, regulatory standing, operational performance, competitive advantage",
    helps: "Connects operational intelligence directly to business outcomes — fewer delays, damages, and injuries protect revenue",
    message: "CoAnalyst is the intelligence layer that connects safety and operational data to business performance — reducing costs, protecting revenue, and strengthening your competitive position.",
  },
  {
    icon: Lightbulb, title: "Innovation & Transformation", color: "text-cyan-400", bgColor: "bg-cyan-400/10", borderColor: "border-cyan-400/30",
    cares: "Digital transformation, AI adoption, data strategy, measurable ROI from technology investment",
    helps: "Delivers production-ready aviation AI without the multi-year R&D investment of building in-house",
    message: "CoAnalyst delivers aviation-specific AI intelligence that's production-ready — no multi-year build, no generic AI compromises. Purpose-built intelligence you can deploy and measure.",
  },
];

const CASlide9PersonaMessaging = (props: SlideNarrationProps) => {
  const [active, setActive] = useState(0);
  const p = personas[active];

  return (
    <SlideContainer id="ca-persona-messaging" title="Persona Messaging" subtitle="Tailored messaging for key stakeholders" slideNumber={9} {...props}>
      <div className="flex flex-col h-full gap-4">
        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {personas.map((persona, i) => (
            <button key={i} onClick={() => setActive(i)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${i === active ? `${persona.bgColor} ${persona.borderColor} ${persona.color}` : "bg-card/40 border-border text-muted-foreground hover:text-foreground"}`}>
              <persona.icon className="w-3.5 h-3.5" />
              {persona.title}
            </button>
          ))}
        </div>

        {/* Active persona detail */}
        <div className={`${p.bgColor} ${p.borderColor} border rounded-xl p-6 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6`}>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">What They Care About</p>
            <p className="text-sm text-foreground leading-relaxed">{p.cares}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">What CoAnalyst Helps Them Achieve</p>
            <p className="text-sm text-foreground leading-relaxed">{p.helps}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Persona Message</p>
            <p className="text-sm text-foreground leading-relaxed font-medium">{p.message}</p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide9PersonaMessaging;
