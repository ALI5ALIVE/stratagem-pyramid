import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Crosshair, Users, AlertCircle, Clock, Star, CheckCircle } from "lucide-react";

const framework = [
  { icon: Crosshair, label: "Category", value: "Aviation Data Intelligence — a standalone analytics product, not an add-on to safety reporting" },
  { icon: Users, label: "Audience", value: "Safety leaders, operations leaders, airline executives, maintenance & engineering, transformation teams" },
  { icon: AlertCircle, label: "Problem", value: "Aviation data is fragmented across domains, analyzed reactively, and current AI tools lack the granular precision needed — achieving only 30–40% accuracy at detailed categorization levels" },
  { icon: Clock, label: "Why Now", value: "Airlines are exploring generic AI (Claude, ChatGPT) on their own data, creating false confidence. Regulatory shift to performance-based oversight demands intelligence, not just compliance" },
  { icon: Star, label: "Unique Value", value: "Hybrid AI architecture (ML models + LLMs) trained on millions of historic reports, achieving 90% accuracy across 4,000+ aviation event categories in 5 classification levels — 3× more precise than any competing model" },
  { icon: CheckCircle, label: "Proof Points", value: "90%+ analyst time savings, 60+ language support, cross-domain analysis (flight safety, flight ops, cabin ops, ground ops, maintenance & engineering), 7-figure ongoing R&D investment since 2023" },
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
              <span className="text-primary">CoAnalyst</span> is the standalone data intelligence platform that transforms fragmented safety and operational data into actionable intelligence — enabling the shift from critical event management to critical control management.
            </p>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Unlike generic AI tools that hallucinate at granular aviation categorization, or competitor bolt-on AI features limited to basic summarization, CoAnalyst delivers aviation-specific precision built on a hybrid AI architecture, millions of historic reports, and continuous R&D — making it the only intelligence layer purpose-built for aviation operations.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default CASlide4ProductPositioning;
