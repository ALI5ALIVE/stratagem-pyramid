import { useState } from "react";
import SlideContainer from "./SlideContainer";
import { ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";

const Slide5MaturityCurve = () => {
  const [activeStage, setActiveStage] = useState(3);

  const stages = [
    { x: 50, y: 280, label: "Stage 5", sublabel: "Fragmented" },
    { x: 130, y: 260, label: "Stage 4", sublabel: "Managed" },
    { x: 220, y: 200, label: "Stage 3", sublabel: "Connected" },
    { x: 330, y: 100, label: "Stage 2", sublabel: "Continuous" },
    { x: 430, y: 40, label: "Stage 1", sublabel: "Predictive" },
  ];

  const stageDetails = [
    {
      stage: 5,
      headline: "Fragmented & Reactive",
      howItWorks: "Disconnected tools, manual coordination, reactive audits. Evidence assembled late, often only for audits.",
      toProgress: "Stabilise processes inside silos. Establish departmental ownership and basic documentation.",
      valueCheckpoint: "Baseline established — ready to connect",
    },
    {
      stage: 4,
      headline: "Managed Compliance",
      howItWorks: "Strong departmental systems, structured but disconnected. Compliance managed within silos, limited cross-functional execution.",
      toProgress: "Connect systems under shared governance. Establish common taxonomies and traceability.",
      valueCheckpoint: "Silos structured — ready to unify",
    },
    {
      stage: 3,
      headline: "Connected Governance",
      howItWorks: "Unified platform foundation with shared taxonomies. Single source of truth with role-based access and approvals.",
      toProgress: "Activate cross-functional workflows. Enable signals to trigger orchestrated actions.",
      valueCheckpoint: "Foundation unified — ready for automation",
    },
    {
      stage: 2,
      headline: "Continuous Improvement",
      howItWorks: "Signals trigger orchestrated action with evidence by default. Closed-loop execution across safety, procedures, and training.",
      toProgress: "Embed AI with governance. Enable predictive detection and assisted drafting.",
      valueCheckpoint: "Loops closed — ready for intelligence",
    },
    {
      stage: 1,
      headline: "Predictive & Agentic",
      howItWorks: "AI detects weak signals, recommends interventions, assists drafting. Exception-led oversight replaces checkbox compliance.",
      toProgress: "Sustain with governed autonomy, transparency, and continuous optimisation.",
      valueCheckpoint: "Intelligence embedded — continuous optimisation",
    },
  ];

  const selectedStage = stageDetails.find(s => s.stage === activeStage) || stageDetails[2];

  return (
    <SlideContainer
      id="slide-5"
      title="The Maturity Curve"
      subtitle="A progression framework from reactive compliance to predictive excellence"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Curve Visualization */}
        <div className="relative bg-card/20 rounded-2xl p-4 border border-muted/30">
          <svg viewBox="0 0 500 320" className="w-full">
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--destructive))" />
                <stop offset="40%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <filter id="curveGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines */}
            <g stroke="hsl(var(--muted-foreground))" strokeOpacity="0.1" strokeWidth="1">
              <line x1="40" y1="40" x2="40" y2="290" />
              <line x1="40" y1="290" x2="470" y2="290" />
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="40" y1={290 - i * 62.5} x2="470" y2={290 - i * 62.5} strokeDasharray="4,4" />
              ))}
            </g>

            {/* Axis labels */}
            <text x="250" y="315" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
              Maturity Stage →
            </text>
            <text x="15" y="165" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11" transform="rotate(-90, 15, 165)">
              Value & Impact →
            </text>

            {/* Hockey stick curve */}
            <path
              d="M 50 280 Q 80 275, 130 260 Q 180 240, 220 200 Q 280 140, 330 100 Q 380 60, 430 40"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#curveGlow)"
            />

            {/* Stage markers */}
            {stages.map((stage, index) => {
              const stageNum = 5 - index;
              const isActive = activeStage === stageNum;
              
              return (
                <g
                  key={stageNum}
                  onClick={() => setActiveStage(stageNum)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={stage.x}
                    cy={stage.y}
                    r={isActive ? 16 : 12}
                    fill={isActive ? "hsl(var(--primary))" : "hsl(var(--card))"}
                    stroke={isActive ? "white" : "hsl(var(--muted-foreground))"}
                    strokeWidth={isActive ? 3 : 1.5}
                    filter={isActive ? "url(#curveGlow)" : "none"}
                    className="transition-all duration-300"
                  />
                  <text
                    x={stage.x}
                    y={stage.y + 4}
                    textAnchor="middle"
                    fill={isActive ? "white" : "hsl(var(--muted-foreground))"}
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {stageNum}
                  </text>
                  <text
                    x={stage.x}
                    y={stage.y + 30}
                    textAnchor="middle"
                    fill="hsl(var(--muted-foreground))"
                    fontSize="9"
                  >
                    {stage.sublabel}
                  </text>
                </g>
              );
            })}

            {/* Value proof checkpoints - dashed lines between stages */}
            {stages.slice(0, -1).map((stage, index) => {
              const nextStage = stages[index + 1];
              return (
                <line
                  key={index}
                  x1={stage.x + 15}
                  y1={stage.y - 5}
                  x2={nextStage.x - 15}
                  y2={nextStage.y + 5}
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  opacity="0.4"
                />
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-gradient-to-r from-destructive via-primary to-emerald-500" />
              <span>Value Acceleration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-t-2 border-dashed border-primary" />
              <span>Value Checkpoints</span>
            </div>
          </div>
        </div>

        {/* Stage Details */}
        <div className="space-y-6">
          {/* Selected Stage Info */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-lg font-bold text-white">{selectedStage.stage}</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Stage {selectedStage.stage}</p>
                <h3 className="text-xl font-bold text-primary">{selectedStage.headline}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">How it works:</h4>
                <p className="text-sm text-muted-foreground">{selectedStage.howItWorks}</p>
              </div>

              <div className="bg-card/30 rounded-lg p-4 border border-muted/30">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  To progress:
                </h4>
                <p className="text-sm text-muted-foreground">{selectedStage.toProgress}</p>
              </div>

              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-sm text-emerald-400 font-medium">{selectedStage.valueCheckpoint}</p>
              </div>
            </div>
          </div>

          {/* Stage Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Stage Progression:</h3>
            <div className="space-y-2">
              {stageDetails.slice().reverse().map((stage, index) => {
                const isActive = activeStage === stage.stage;
                const showArrow = index < stageDetails.length - 1;
                
                return (
                  <div key={stage.stage}>
                    <button
                      onClick={() => setActiveStage(stage.stage)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary/20 border border-primary/50' 
                          : 'bg-card/20 border border-muted/30 hover:border-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isActive ? 'bg-primary text-white' : 'bg-muted/30 text-muted-foreground'
                          }`}>
                            {stage.stage}
                          </span>
                          <span className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}>
                            {stage.headline}
                          </span>
                        </div>
                        {showArrow && (
                          <ArrowRight className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground/50'}`} />
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* How to use the model */}
      <div className="mt-8 bg-card/30 border border-muted/30 rounded-xl p-5">
        <h3 className="text-base font-semibold text-foreground mb-4 text-center">How to Use the Model</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: 1, text: "Identify current stage (today)" },
            { step: 2, text: "Agree next target stage (near-term)" },
            { step: 3, text: "Prioritise workflows + governance required to move up" },
            { step: 4, text: "Prove progress with Value Proof metrics at each stage" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center shrink-0">
                {item.step}
              </span>
              <span className="text-sm text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide5MaturityCurve;