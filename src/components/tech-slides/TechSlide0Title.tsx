import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Shield, Plane, Users } from "lucide-react";

interface TechSlide0TitleProps extends SlideNarrationProps {
  slideNumber?: number;
  onNavigateToSlide?: (index: number) => void;
}

const trustStats = [
  { icon: Plane, value: "50+", label: "Airlines Worldwide" },
  { icon: Shield, value: "7/10", label: "Top North American Carriers" },
  { icon: Users, value: "300K+", label: "Operational Users" },
];

const tocItems = [
  { num: 1, label: "Strategic Shift" },
  { num: 2, label: "Industry Challenge" },
  { num: 3, label: "Before & After" },
  { num: 4, label: "The Platform" },
  { num: 5, label: "DTOP Architecture" },
  { num: 6, label: "Capabilities" },
  { num: 7, label: "CoAnalyst Intelligence" },
  { num: 8, label: "Intelligence Tiers" },
  { num: 9, label: "vs Generic AI" },
  { num: 10, label: "Safety Use Cases" },
  { num: 11, label: "Ops Use Cases" },
  { num: 12, label: "Financial Use Cases" },
  { num: 13, label: "Line of Sight" },
  { num: 14, label: "Maturity Roadmap" },
  { num: 15, label: "2026 Roadmap" },
  { num: 16, label: "Outcomes" },
  { num: 17, label: "Why Comply365" },
  { num: 18, label: "Partnership" },
];

const TechSlide0Title = ({ slideNumber, onNavigateToSlide, ...narrationProps }: TechSlide0TitleProps) => {
  return (
    <SalesSlideContainer id="tech-slide-0" slideNumber={slideNumber} showHeader={false} {...narrationProps}>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">The Complete Platform Story</span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight max-w-4xl">
          Operational Performance<br />
          <span className="text-primary">Platform</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          The technical deep-dive: architecture, intelligence, every use case costed, and your roadmap to predictable, measurable, provable operations.
        </p>

        {/* Trust stats */}
        <div className="flex items-center gap-8 mt-2">
          {trustStats.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <s.icon className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Interactive TOC grid */}
        <div className="grid grid-cols-6 gap-2 mt-4 max-w-4xl w-full">
          {tocItems.map((item) => (
            <button
              key={item.num}
              onClick={() => onNavigateToSlide?.(item.num)}
              className="p-2 rounded-lg border border-muted/20 bg-muted/5 hover:bg-primary/10 hover:border-primary/30 transition-all text-left group"
            >
              <span className="text-[10px] text-primary font-bold">{String(item.num).padStart(2, "0")}</span>
              <p className="text-[10px] text-muted-foreground group-hover:text-foreground leading-tight mt-0.5">{item.label}</p>
            </button>
          ))}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide0Title;
