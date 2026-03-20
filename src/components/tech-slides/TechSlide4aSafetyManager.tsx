import { Shield, AlertTriangle, Search, ClipboardCheck, BookOpen, BarChart3, ArrowRight } from "lucide-react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const capabilities = [
  { icon: AlertTriangle, label: "SMS Event Reporting", desc: "Capture safety events across all operations with structured taxonomy" },
  { icon: Search, label: "Investigation Workflows", desc: "Guided root-cause analysis with evidence attachment and tracking" },
  { icon: BarChart3, label: "Flight Data Analysis", desc: "Automated flight data monitoring with exceedance detection" },
  { icon: ClipboardCheck, label: "Audit Management", desc: "Internal and regulatory audit scheduling, findings, and corrective actions" },
  { icon: BookOpen, label: "Hazard Register", desc: "Centralised hazard identification, assessment, and mitigation tracking" },
  { icon: Shield, label: "Risk Assessment", desc: "Quantitative risk matrices with trend analysis and threshold alerts" },
];

const dataFlow = [
  { step: "Safety Events", desc: "Reports, operational data, audit findings flow in" },
  { step: "Pattern Detection", desc: "CoAnalyst identifies recurring themes across 4,000+ categories" },
  { step: "Risk Prediction", desc: "Proactive alerts surface emerging hazards before incidents" },
  { step: "Corrective Action", desc: "Automated triggers to training, procedures, and management review" },
];

const TechSlide4aSafetyManager = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-4a" title="Safety Manager 365" subtitle="From reactive reporting to predictive safety intelligence" slideNumber={slideNumber} {...narrationProps}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
      {/* Capabilities */}
      <div className="flex flex-col gap-3 justify-center">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400 mb-1">Core Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {capabilities.map((c) => (
            <div key={c.label} className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 flex gap-3 items-start">
              <c.icon className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{c.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CoAnalyst Activation */}
      <div className="flex flex-col justify-center">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-7 h-7 text-red-400" />
            <h3 className="text-lg font-semibold text-red-400">How CoAnalyst Activates Safety Data</h3>
          </div>
          <div className="space-y-3">
            {dataFlow.map((d, i) => (
              <div key={d.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-sm font-bold text-red-400">{i + 1}</div>
                  {i < dataFlow.length - 1 && <ArrowRight className="w-4 h-4 text-red-400/40 rotate-90 mt-1" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{d.step}</p>
                  <p className="text-xs text-muted-foreground">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic">Every safety signal becomes a connected data point — not an isolated report</p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide4aSafetyManager;
