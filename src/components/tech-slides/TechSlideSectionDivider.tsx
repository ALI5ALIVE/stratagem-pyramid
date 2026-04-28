import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { ArrowRight } from "lucide-react";

interface Props extends SlideNarrationProps {
  slideNumber?: number;
  id: string;
  eyebrow: string;
  sectionTitle: string;
  tagline: string;
  upNext: string[];
  accent?: "primary" | "amber" | "emerald" | "violet" | "blue";
}

const accentMap = {
  primary: { text: "text-primary", border: "border-primary/40", bg: "bg-primary/10", chip: "bg-primary/15" },
  amber: { text: "text-amber-300", border: "border-amber-500/40", bg: "bg-amber-500/10", chip: "bg-amber-500/15" },
  emerald: { text: "text-emerald-300", border: "border-emerald-500/40", bg: "bg-emerald-500/10", chip: "bg-emerald-500/15" },
  violet: { text: "text-violet-300", border: "border-violet-500/40", bg: "bg-violet-500/10", chip: "bg-violet-500/15" },
  blue: { text: "text-blue-300", border: "border-blue-500/40", bg: "bg-blue-500/10", chip: "bg-blue-500/15" },
} as const;

const TechSlideSectionDivider = ({
  id,
  slideNumber,
  eyebrow,
  sectionTitle,
  tagline,
  upNext,
  accent = "primary",
  ...narrationProps
}: Props) => {
  const a = accentMap[accent];
  return (
    <SalesSlideContainer id={id} slideNumber={slideNumber} {...narrationProps}>
      <div className="flex-1 flex flex-col justify-center gap-10 max-w-5xl mx-auto w-full">
        <div className="space-y-6">
          <div className={`inline-flex items-center gap-2 rounded-full border ${a.border} ${a.chip} px-4 py-1.5`}>
            <span className={`text-[11px] font-bold uppercase tracking-[0.24em] ${a.text}`}>
              {eyebrow}
            </span>
          </div>
          <h2 className={`font-display text-5xl lg:text-6xl font-bold ${a.text} leading-[1.05]`}>
            {sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{tagline}</p>
        </div>

        <div className={`rounded-xl border ${a.border} ${a.bg} p-5`}>
          <div className="flex items-center gap-2 mb-3">
            <ArrowRight className={`h-4 w-4 ${a.text}`} />
            <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${a.text}`}>Up next</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {upNext.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-md border border-border bg-card/40 px-3 py-1.5 text-sm text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlideSectionDivider;
