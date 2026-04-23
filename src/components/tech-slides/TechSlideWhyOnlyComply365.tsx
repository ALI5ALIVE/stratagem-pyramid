import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { competitiveContrast, moatStatements } from "@/data/platformPlaybook";
import { Check } from "lucide-react";
import type { SlideNarrationProps } from "@/types/slideProps";

interface Props extends SlideNarrationProps { slideNumber?: number; }

/**
 * Tech-deck clone of PFSlide11Competitive — sits immediately before the CTA.
 */
const TechSlideWhyOnlyComply365 = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer
    id="tech-slide-why-only-comply365"
    title="Why Only Comply365"
    subtitle="No competitor owns the operational core, the data foundation, the intelligence layer and the mobile shell — let alone the operating model."
    slideNumber={slideNumber}
    {...narrationProps}
  >
    <div className="flex-1 flex flex-col gap-3 min-h-0">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-5 gap-2 p-3 border-b border-border bg-card/50 text-[10px] uppercase tracking-wider text-muted-foreground">
          <div>Approach</div>
          <div>Data</div>
          <div>Intelligence</div>
          <div>Action</div>
          <div>Delivery</div>
        </div>
        {competitiveContrast.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-5 gap-2 p-3 border-b border-border last:border-b-0 ${row.isUs ? "bg-primary/5" : ""}`}
          >
            <div className={`text-xs font-semibold flex items-center gap-1.5 ${row.isUs ? "text-primary" : "text-foreground"}`}>
              {row.isUs && <Check className="h-3.5 w-3.5" />}
              {row.approach}
            </div>
            <div className="text-xs text-muted-foreground">{row.data}</div>
            <div className="text-xs text-muted-foreground">{row.intelligence}</div>
            <div className="text-xs text-muted-foreground">{row.action}</div>
            <div className="text-xs text-muted-foreground">{row.delivery}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {moatStatements.map((s, i) => (
          <div key={i} className="p-3 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/90 leading-relaxed">{s}</p>
          </div>
        ))}
      </div>
    </div>
  </SalesSlideContainer>
);

export default TechSlideWhyOnlyComply365;