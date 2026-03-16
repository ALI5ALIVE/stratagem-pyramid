import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Crosshair, Users, AlertCircle, Clock, Star, CheckCircle } from "lucide-react";

const framework = [
  { icon: Crosshair, label: "Category", value: "Aviation Data Intelligence" },
  { icon: Users, label: "Audience", value: "Safety leaders, operations leaders, airline executives, transformation teams" },
  { icon: AlertCircle, label: "Problem", value: "Aviation data is fragmented, underutilized, and analyzed reactively — leaving patterns, hazards, and weakening controls invisible until events occur" },
  { icon: Clock, label: "Why Now", value: "Regulatory shift to performance-based oversight, growing data volumes, generic AI creating false confidence, industry moving from compliance to intelligence" },
  { icon: Star, label: "Unique Value", value: "Purpose-built aviation intelligence with domain-trained models, hybrid AI architecture, and millions of historic reports delivering precision that generic AI cannot match" },
  { icon: CheckCircle, label: "Proof Points", value: "60+ language support, thousands of aviation event categories, millions of historic reports in training data, cross-domain analysis across safety, ops, maintenance, training, and crew" },
];

const CASlide4ProductPositioning = (props: SlideNarrationProps) => {
  return (
    <SlideContainer id="ca-product-positioning" title="Product Positioning" subtitle="Sharp, differentiated positioning framework" slideNumber={4} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full">
        <div className="space-y-1.5">
          {framework.map((item, i) => (
            <div key={i} className="bg-card/60 border border-border rounded-lg p-2.5 flex items-start gap-2">
              <item.icon className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-wide mb-0.5">{item.label}</p>
                <p className="text-[11px] text-muted-foreground leading-snug">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wide mb-3">Differentiated Positioning Statement</h3>
            <p className="text-sm text-foreground leading-relaxed font-medium">
              For aviation organizations that need to move beyond reactive reporting,{" "}
              <span className="text-primary">CoAnalyst</span> is the aviation data intelligence platform that transforms fragmented safety and operational data into actionable intelligence — enabling proactive control management, predictive risk identification, and measurable operational performance improvement.
            </p>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Unlike generic AI tools or manual analysis workflows, CoAnalyst delivers aviation-specific precision built on millions of historic reports, a hybrid AI architecture, and deep domain expertise — making it the only intelligence layer purpose-built for aviation operations.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide4ProductPositioning;
