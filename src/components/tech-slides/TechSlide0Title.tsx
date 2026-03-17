import { SlideNarrationProps } from "@/types/slideProps";
import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { Shield, Plane, Users } from "lucide-react";

const trustStats = [
  { icon: Plane, value: "50+", label: "Airlines Worldwide" },
  { icon: Shield, value: "7/10", label: "Top North American Carriers" },
  { icon: Users, value: "300K+", label: "Operational Users" },
];

const TechSlide0Title = ({ ...narrationProps }: SlideNarrationProps & { slideNumber?: number }) => {
  return (
    <SalesSlideContainer id="tech-slide-0" slideNumber={narrationProps.slideNumber} showHeader={false} {...narrationProps}>
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
      </div>
    </SalesSlideContainer>
  );
};

export default TechSlide0Title;
