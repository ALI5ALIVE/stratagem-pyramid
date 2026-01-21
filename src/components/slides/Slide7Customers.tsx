import SlideContainer from "./SlideContainer";
import { TrendingUp, TrendingDown, Clock, Shield, Users, BarChart3, CheckCircle2 } from "lucide-react";

const Slide7Customers = () => {
  const kpiCategories = [
    {
      title: "Reliability & Disruption",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-400",
      metrics: [
        { label: "OTP", direction: "up", value: "↑" },
        { label: "Delay mins", direction: "down", value: "↓" },
        { label: "Cancellations", direction: "down", value: "↓" },
        { label: "Recovery time", direction: "down", value: "↓" },
      ],
    },
    {
      title: "Readiness & Execution",
      icon: Clock,
      color: "from-primary to-blue-500",
      textColor: "text-primary",
      metrics: [
        { label: "Time-to-change", direction: "down", value: "↓" },
        { label: "Time-to-competency", direction: "down", value: "↓" },
        { label: "Change adoption", direction: "up", value: "↑" },
      ],
    },
    {
      title: "Governance & Proof",
      icon: Shield,
      color: "from-violet-500 to-purple-500",
      textColor: "text-violet-400",
      metrics: [
        { label: "Audit prep time", direction: "down", value: "↓" },
        { label: "Evidence readiness", direction: "down", value: "↓" },
        { label: "Repeat findings", direction: "down", value: "↓" },
        { label: "Manual reporting", direction: "down", value: "↓" },
      ],
    },
  ];

  const programSteps = [
    "Maturity score benchmarking",
    "Peer comparison analysis",
    "Gap analysis and priorities",
    "Executive-ready 30/60/90 roadmap",
  ];

  return (
    <SlideContainer
      id="slide-7"
      title="What This Means for Customers"
      subtitle="Measurable performance, readiness, and proof"
    >
      {/* Executive Value Proposition */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 rounded-xl p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Executive Value Proposition:</p>
          <p className="text-lg text-foreground leading-relaxed">
            We help leaders <span className="text-primary font-semibold">reduce disruption, protect revenue, and improve customer experience</span> by accelerating the speed and control of operational change across safety, procedures, and training — through one connected, governed platform.
          </p>
        </div>
      </div>

      {/* COO Outcomes Dashboard */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {kpiCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={index}
              className="relative group"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 blur-xl rounded-2xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative bg-card/50 border border-muted-foreground/20 rounded-2xl p-6 h-full hover:border-primary/50 transition-colors">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`font-semibold ${category.textColor}`}>{category.title}</h3>
                </div>

                {/* Gauge visual */}
                <div className="relative h-24 mb-4">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    <defs>
                      <linearGradient id={`gaugeGrad${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--muted))" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" />
                      </linearGradient>
                    </defs>
                    {/* Background arc */}
                    <path
                      d="M 20 80 A 80 80 0 0 1 180 80"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    {/* Progress arc */}
                    <path
                      d="M 20 80 A 80 80 0 0 1 180 80"
                      fill="none"
                      stroke={`url(#gaugeGrad${index})`}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray="251"
                      strokeDashoffset={251 - (251 * (0.6 + index * 0.1))}
                      className="transition-all duration-1000"
                    />
                    {/* Center value */}
                    <text x="100" y="75" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="20" fontWeight="bold">
                      {Math.round((0.6 + index * 0.1) * 100)}%
                    </text>
                    <text x="100" y="90" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">
                      improvement
                    </text>
                  </svg>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2">
                  {category.metrics.map((metric, mIndex) => (
                    <div key={mIndex} className="flex items-center gap-2 text-sm">
                      <span className={metric.direction === 'up' ? 'text-emerald-400' : 'text-primary'}>
                        {metric.value}
                      </span>
                      <span className="text-muted-foreground">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Benchmarking Program */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-card/30 border border-primary/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Benchmarking Program</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Benchmarking turns the platform story into a measurable transformation program:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {programSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide7Customers;
