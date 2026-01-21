import SlideContainer from "./SlideContainer";
import { TrendingUp, Clock, Shield, BarChart3, CheckCircle2 } from "lucide-react";

const Slide7Customers = () => {
  const kpiCategories = [
    {
      title: "Reliability & Disruption",
      icon: TrendingUp,
      color: "bg-emerald-500",
      borderColor: "border-emerald-500/30",
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
      color: "bg-primary",
      borderColor: "border-primary/30",
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
      color: "bg-violet-500",
      borderColor: "border-violet-500/30",
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
      subtitle="Measurable outcomes: reliability, readiness, and audit-ready proof"
      slideNumber={7}
    >
      {/* Executive Value Proposition */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-card border border-primary/30 rounded-lg p-5 text-center">
          <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Executive Value Proposition:</p>
          <p className="text-base text-foreground leading-relaxed">
            We help leaders <span className="text-primary font-semibold">reduce disruption, protect revenue, and improve customer experience</span> by accelerating the speed and control of operational change across safety, procedures, and training — through one connected, governed platform.
          </p>
        </div>
      </div>

      {/* COO Outcomes Dashboard */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {kpiCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={index}
              className={`relative bg-card border ${category.borderColor} rounded-xl p-5 overflow-visible`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg ${category.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className={`text-sm font-semibold ${category.textColor}`}>{category.title}</h3>
              </div>

              {/* Gauge visual */}
              <div className="h-32 mb-3">
                <svg viewBox="0 0 200 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id={`gauge${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--muted))" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" />
                    </linearGradient>
                  </defs>
                  {/* Background arc */}
                  <path
                    d="M 20 95 A 80 80 0 0 1 180 95"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Progress arc */}
                  <path
                    d="M 20 95 A 80 80 0 0 1 180 95"
                    fill="none"
                    stroke={`url(#gauge${index})`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * (0.6 + index * 0.1))}
                    className="transition-all duration-1000"
                  />
                  {/* Center value */}
                  <text x="100" y="88" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="18" fontWeight="bold">
                    {Math.round((0.6 + index * 0.1) * 100)}%
                  </text>
                  <text x="100" y="102" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="9">
                    improvement
                  </text>
                </svg>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-1.5">
                {category.metrics.map((metric, mIndex) => (
                  <div key={mIndex} className="flex items-center gap-2 text-xs">
                    <span className={metric.direction === 'up' ? 'text-emerald-400' : 'text-primary'}>
                      {metric.value}
                    </span>
                    <span className="text-muted-foreground">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Benchmarking Program */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-card border border-primary/30 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Benchmarking Program</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Benchmarking turns the platform story into a measurable transformation program:
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {programSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs text-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default Slide7Customers;
