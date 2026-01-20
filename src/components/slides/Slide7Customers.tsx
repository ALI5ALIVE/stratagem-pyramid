import { useState } from "react";
import SlideContainer from "./SlideContainer";
import { 
  TrendingUp, Clock, Shield, BarChart3, 
  AlertTriangle, FileText, GraduationCap
} from "lucide-react";

const Slide7Customers = () => {
  const [activePersona, setActivePersona] = useState<string>("safety");

  const personas = [
    {
      id: "safety",
      title: "Head of Safety",
      icon: AlertTriangle,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      valueProp: "Reduce risk and recurrence by turning safety signals into controlled operational change",
      painPoints: [
        "Safety events handled in isolation, not connected to procedures or training",
        "Investigations close but root causes recur",
        "Evidence assembled manually for audits",
      ],
      outcomes: [
        { label: "Faster investigations", metric: "↓ 40% cycle time" },
        { label: "Reduced repeat events", metric: "↓ 50% recurrence" },
        { label: "Evidence by default", metric: "100% audit-ready" },
      ],
    },
    {
      id: "compliance",
      title: "Head of Compliance",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      valueProp: "Improve audit readiness, governance and regulatory confidence",
      painPoints: [
        "Procedure changes aren't tracked end-to-end",
        "Training compliance disconnected from procedure updates",
        "Audit prep takes weeks of manual effort",
      ],
      outcomes: [
        { label: "Audit prep time", metric: "↓ 30%" },
        { label: "Evidence readiness", metric: "↑ Always current" },
        { label: "Findings reduction", metric: "↓ 25% year-over-year" },
      ],
    },
    {
      id: "training",
      title: "Head of Training",
      icon: GraduationCap,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      valueProp: "Increase workforce readiness by linking training to real operational risk and change",
      painPoints: [
        "Training triggered by schedule, not operational need",
        "No visibility into whether training drives behavior change",
        "Competency data siloed from safety and compliance",
      ],
      outcomes: [
        { label: "Time-to-competency", metric: "↓ 35%" },
        { label: "Training readiness", metric: "↑ Real-time visibility" },
        { label: "Procedural deviations", metric: "↓ 40%" },
      ],
    },
  ];

  const kpiCategories = [
    {
      title: "Reliability",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      metrics: [
        { label: "On-Time Performance", value: "↑ 15%" },
        { label: "Delay Minutes", value: "↓ 40%" },
        { label: "Disruption Recovery", value: "↓ 60%" },
      ],
    },
    {
      title: "Readiness",
      icon: Clock,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      metrics: [
        { label: "Time-to-Change", value: "↓ 60%" },
        { label: "Time-to-Competency", value: "↓ 35%" },
        { label: "Training Currency", value: "↑ 98%" },
      ],
    },
    {
      title: "Governance",
      icon: Shield,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/30",
      metrics: [
        { label: "Audit Prep Time", value: "↓ 30%" },
        { label: "Manual Reporting", value: "↓ 70%" },
        { label: "Finding Recurrence", value: "↓ 50%" },
      ],
    },
  ];

  const reliabilityIndex = [
    { dimension: "Detection & Insight", description: "Capture signals earlier" },
    { dimension: "Action & Orchestration", description: "Coordinate response" },
    { dimension: "Readiness & Execution", description: "Enable front-line" },
    { dimension: "Governance & Proof", description: "Demonstrate compliance" },
  ];

  const selectedPersona = personas.find(p => p.id === activePersona) || personas[0];

  return (
    <SlideContainer
      id="slide-7"
      title="What This Means for Customers"
      subtitle="Measurable performance, readiness, and proof"
    >
      {/* Persona Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {personas.map((persona) => {
            const Icon = persona.icon;
            const isActive = activePersona === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setActivePersona(persona.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? `${persona.bgColor} ${persona.color} border ${persona.borderColor}` 
                    : 'bg-card/30 text-muted-foreground border border-muted/30 hover:border-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                {persona.title}
              </button>
            );
          })}
        </div>

        {/* Selected Persona Details */}
        <div className={`${selectedPersona.bgColor} border ${selectedPersona.borderColor} rounded-2xl p-6`}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Value Prop + Pain Points */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${selectedPersona.bgColor} border ${selectedPersona.borderColor} flex items-center justify-center`}>
                  <selectedPersona.icon className={`w-6 h-6 ${selectedPersona.color}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${selectedPersona.color}`}>{selectedPersona.title}</h3>
                  <p className="text-xs text-muted-foreground">Primary Value</p>
                </div>
              </div>

              <p className="text-sm text-foreground font-medium mb-4 p-3 bg-card/30 rounded-lg border border-muted/30">
                "{selectedPersona.valueProp}"
              </p>

              <h4 className="text-sm font-semibold text-foreground mb-2">Pain Points Addressed:</h4>
              <ul className="space-y-2">
                {selectedPersona.painPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedPersona.color.replace('text-', 'bg-')} mt-1.5 shrink-0`} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Outcomes */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Measurable Outcomes:</h4>
              <div className="space-y-3">
                {selectedPersona.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-card/30 rounded-lg border border-muted/30">
                    <span className="text-sm text-foreground">{outcome.label}</span>
                    <span className={`text-sm font-bold ${selectedPersona.color}`}>{outcome.metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground text-center mb-6">KPI Impact Dashboard</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {kpiCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className={`${category.bgColor} border ${category.borderColor} rounded-xl p-5`}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon className={`w-5 h-5 ${category.color}`} />
                  <h4 className={`font-semibold ${category.color}`}>{category.title}</h4>
                </div>
                <div className="space-y-2">
                  {category.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className={`font-bold ${metric.value.startsWith('↑') ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reliability & Readiness Index */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">Reliability & Readiness Index</h3>
        </div>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Four dimensions that drive operational excellence measurement
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {reliabilityIndex.map((item, index) => (
            <div key={index} className="text-center p-3 bg-card/30 rounded-lg border border-muted/30">
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{index + 1}</span>
              </div>
              <h4 className="text-xs font-semibold text-foreground mb-1">{item.dimension}</h4>
              <p className="text-[10px] text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide7Customers;