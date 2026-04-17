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
  { step: "Recommended Action", desc: "Automated triggers to training, procedures, and management review" },
];

const TechSlide4aSafetyManager = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-4a" title="SafetyManager365" subtitle="Advanced Safety, Quality, and Risk Management — from reactive reporting to predictive safety intelligence" slideNumber={slideNumber} {...narrationProps}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0 items-stretch">
      <div className="flex flex-col gap-3 h-full">
        <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 shrink-0">Core Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 auto-rows-fr flex-1">
          {capabilities.map((c) => (
            <div key={c.label} className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 flex gap-3 items-start h-full">
              <c.icon className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground">{c.label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <Shield className="w-6 h-6 text-red-400" />
            <h3 className="text-base font-bold text-red-400">How CoAnalyst Activates Safety Data</h3>
          </div>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {dataFlow.map((d, i) => (
              <div key={d.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-sm font-bold text-red-400">{i + 1}</div>
                  {i < dataFlow.length - 1 && <ArrowRight className="w-4 h-4 text-red-400/40 rotate-90 mt-1" />}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-bold text-foreground">{d.step}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic text-center shrink-0">Every safety signal becomes a connected data point — not an isolated report</p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide4aSafetyManager;
