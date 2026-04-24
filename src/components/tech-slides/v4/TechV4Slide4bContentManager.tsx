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

const TechV4Slide4bContentManager = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-4b" title="Core Operational Apps — ContentManager365 + CoAuthor" subtitle="Next Gen Operational Content Management — from manual revisions to intelligent document orchestration" slideNumber={slideNumber} {...narrationProps}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0 items-stretch">
      <div className="flex flex-col gap-3 h-full">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 shrink-0">Core Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 auto-rows-fr flex-1">
          {capabilities.map((c) => (
            <div key={c.label} className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 flex gap-3 items-start h-full">
              <c.icon className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground">{c.label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <h3 className="text-base font-bold text-blue-400">CoAuthor — AI-Powered Content Intelligence</h3>
          </div>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {dataFlow.map((d, i) => (
              <div key={d.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">{i + 1}</div>
                  {i < dataFlow.length - 1 && <ArrowRight className="w-4 h-4 text-blue-400/40 rotate-90 mt-1" />}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-bold text-foreground">{d.step}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic text-center shrink-0">CoAuthor turns every regulatory change into a ready-to-review revision — not just a notification</p>
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechV4Slide4bContentManager;
