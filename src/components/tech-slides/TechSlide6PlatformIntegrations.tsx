import { useState } from "react";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Database, BookOpen, Zap, TrendingDown, FileText, CheckCircle2, ChevronRight, ChevronDown, AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const caseStudies = [
  {
    id: "reg-db",
    icon: Database,
    iconColor: "text-primary",
    title: "Regulation Database Integration",
    subtitle: "ContentManager365 ↔ Regulatory Sources",
    status: "In Production",
    statusPhase: "Phase 1: Q1–Q2 2026",
    pain: [
      "Regulatory text copied manually from PDFs into operational manuals",
      "Inconsistencies across manuals when regulations change",
      "Weeks of audit preparation assembling evidence",
      "Growing fleets requiring consistent compliance across bases",
    ],
    flow: {
      detect: "Regulator publishes regulatory change or amendment",
      trigger: "SafetyManager365 stores update and triggers change request to authoring team",
      orchestrate: "ContentManager365 links SOPs to updated regulatory references automatically",
      prove: "TrainingManager365 connects training syllabi to latest SOP revisions — full traceability",
    },
    before: [
      "Evidence assembled manually before audits",
      "Static traceability matrices in spreadsheets",
      "Weeks of preparation for regulatory reviews",
    ],
    after: [
      "Live traceability between regulations and manual references",
      "Visible coverage gaps surfaced automatically",
      "Consistent, auditable evidence generation on demand",
    ],
    value: [
      "Faster authoring cycles",
      "Reduced rework from missed regulatory changes",
      "Fewer audit findings",
      "AI-assisted compliance mapping",
    ],
  },
  {
    id: "tm-cm",
    icon: BookOpen,
    iconColor: "text-accent",
    title: "TrainingManager365 ↔ ContentManager365",
    subtitle: "Training Records ↔ Operational Procedures",
    status: "In Production",
    statusPhase: "Live",
    pain: [
      "No traceability between training records and operational procedures",
      "Disconnected systems requiring manual document uploads",
      "Training content drifts when procedures change",
      "No proof of readiness tied to current document revisions",
    ],
    flow: {
      detect: "Training developer links operational document from ContentManager365",
      trigger: "Trainees and trainers automatically access the latest published version",
      orchestrate: "When the document updates in ContentManager365, linked training content stays current",
      prove: "Procedure changes surface linked training modules — triggering targeted retraining",
    },
    before: [
      "Manual document management across systems",
      "Training impact assessed manually after procedure changes",
      "No proof of readiness tied to document versions",
    ],
    after: [
      "Smart links to latest document revisions",
      "Targeted retraining triggered by crew segment",
      "Audit readiness with direct evidence of training currency",
    ],
    value: [
      "Reduced compliance risk from outdated training",
      "Faster change implementation across operations",
      "Closed-loop learning from incident to retraining",
      "Enhanced investigation quality with linked evidence",
    ],
  },
];

const TechSlide6PlatformIntegrations = ({ slideNumber, ...narrationProps }: Props) => {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  return (
    <SalesSlideContainer
      id="tech-slide-6"
      title="Platform Integration Case Studies"
      subtitle="Live integrations proving the connected platform — regulation traceability and training-content linkage in production today"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex flex-col gap-3 h-full">
        {/* DTOP Legend */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Detect</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
            <TrendingDown className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">Trigger</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <FileText className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-xs font-medium text-cyan-500">Orchestrate</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-medium text-emerald-500">Prove</span>
          </div>
        </div>

        {/* Two-column case studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {caseStudies.map((cs) => {
            const isExpanded = expandedCase === cs.id;
            const Icon = cs.icon;

            return (
              <div
                key={cs.id}
                className={cn(
                  "bg-card/50 backdrop-blur-sm border rounded-xl p-4 cursor-pointer transition-all duration-300 flex flex-col",
                  isExpanded ? "border-primary/30 shadow-lg shadow-primary/10" : "border-border/50 hover:border-primary/30"
                )}
                onClick={() => setExpandedCase(isExpanded ? null : cs.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("w-5 h-5", cs.iconColor)} />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{cs.title}</h3>
                      <p className="text-xs text-muted-foreground">{cs.subtitle}</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] shrink-0">
                    {cs.status}
                  </Badge>
                </div>

                {/* Pain points (collapsed view) */}
                {!isExpanded && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3 h-3 text-destructive" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-destructive">Pain Points</span>
                    </div>
                    <ul className="space-y-0.5">
                      {cs.pain.slice(0, 2).map((p, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="text-destructive/60 mt-0.5">•</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Expanded pain */}
                {isExpanded && (
                  <div className="mb-3 animate-fade-in">
                    <div className="flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3 h-3 text-destructive" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-destructive">Pain Points</span>
                    </div>
                    <ul className="space-y-0.5">
                      {cs.pain.map((p, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="text-destructive/60 mt-0.5">•</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* DTOP Timeline */}
                <div className="space-y-2 flex-1">
                  <div className="relative pl-4 border-l-2 border-primary/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-0.5">Signal Detected</div>
                    <div className="text-xs font-medium text-foreground">{cs.flow.detect}</div>
                  </div>
                  <div className="relative pl-4 border-l-2 border-accent/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-accent" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-0.5">Action Triggered</div>
                    <div className="text-xs font-medium text-foreground">{cs.flow.trigger}</div>
                  </div>
                  <div className="relative pl-4 border-l-2 border-cyan-500/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-cyan-500" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500 mb-0.5">Change Orchestrated</div>
                    <div className="text-xs font-medium text-foreground">{cs.flow.orchestrate}</div>
                  </div>
                  <div className="relative pl-4 border-l-2 border-emerald-500/50">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-emerald-500" />
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500 mb-0.5">Outcome Proven</div>
                    <div className="text-xs font-medium text-foreground">{cs.flow.prove}</div>
                  </div>
                </div>

                {/* Expanded: Before/After + Value */}
                {isExpanded && (
                  <div className="mt-3 space-y-3 animate-fade-in">
                    {/* Before → After */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-2">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-destructive mb-1">Before</div>
                        <ul className="space-y-0.5">
                          {cs.before.map((b, i) => (
                            <li key={i} className="text-[11px] text-muted-foreground">• {b}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-2">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 mb-1">After</div>
                        <ul className="space-y-0.5">
                          {cs.after.map((a, i) => (
                            <li key={i} className="text-[11px] text-muted-foreground">• {a}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Value */}
                    <div className="flex flex-wrap gap-1">
                      {cs.value.map((v, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium">{v}</span>
                      ))}
                    </div>
                  </div>
                )}

                {!isExpanded && (
                  <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                    <span>Click to expand</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-2 shrink-0">
          <p className="text-xs text-center text-foreground">
            <span className="font-semibold text-primary">These are live platform integrations — not roadmap items.</span> Each demonstrates the connected data model that powers the intelligence layer and drives measurable operational performance.
          </p>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide6PlatformIntegrations;
