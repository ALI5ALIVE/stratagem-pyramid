import { FileText, BookOpen, GitBranch, Scale, Send, FolderOpen, ArrowRight, Sparkles } from "lucide-react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const capabilities = [
  { icon: FileText, label: "Procedure Authoring", desc: "Structured document creation with approval workflows and version control" },
  { icon: GitBranch, label: "Revision Cascades", desc: "One change triggers automatic updates across all affected documents" },
  { icon: Scale, label: "Regulatory Change Impact", desc: "Map regulatory updates to affected procedures, training, and operations" },
  { icon: Send, label: "Multi-Format Distribution", desc: "Push content to crews via EFB, mobile, web — with read acknowledgement" },
  { icon: BookOpen, label: "Manual Management", desc: "Complete manual lifecycle from draft through retirement with audit trail" },
  { icon: FolderOpen, label: "Document Control", desc: "Centralised library with access controls, retention policies, and search" },
];

const dataFlow = [
  { step: "Regulatory Analysis", desc: "Analyzes regulatory changes and identifies impacted manual sections" },
  { step: "Smart Revisions", desc: "Proposes revised language, ready to merge and route for approval" },
  { step: "Impact Cascades", desc: "Identifies all downstream impacts across manuals and SOPs" },
  { step: "Audit-Ready Output", desc: "Policies and procedures become clearer, safer, and always audit-ready" },
];

const TechSlide4bContentManager = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-4b" title="Content Manager 365" subtitle="From manual revisions to intelligent document orchestration" slideNumber={slideNumber} {...narrationProps}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
      <div className="flex flex-col gap-3 justify-center">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-1">Core Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {capabilities.map((c) => (
            <div key={c.label} className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 flex gap-3 items-start">
              <c.icon className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{c.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-7 h-7 text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-400">How CoAnalyst Activates Content Data</h3>
          </div>
          <div className="space-y-3">
            {dataFlow.map((d, i) => (
              <div key={d.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">{i + 1}</div>
                  {i < dataFlow.length - 1 && <ArrowRight className="w-4 h-4 text-blue-400/40 rotate-90 mt-1" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{d.step}</p>
                  <p className="text-xs text-muted-foreground">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic">Every procedure change becomes an intelligence event — not just a revision number</p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlide4bContentManager;
