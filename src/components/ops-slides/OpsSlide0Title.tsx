import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Signal, Shield, Users } from "lucide-react";

interface OpsSlide0TitleProps extends SlideNarrationProps {
  slideNumber?: number;
}

const trustStats = [
  { icon: Shield, value: "50+", label: "Airlines Worldwide" },
  { icon: Signal, value: "7/10", label: "North American Carriers" },
  { icon: Users, value: "1M+", label: "Frontline Users" },
];

const OpsSlide0Title = ({ slideNumber, ...narrationProps }: OpsSlide0TitleProps) => {
  return (
    <SalesSlideContainer
      id="ops-slide-0"
      slideNumber={slideNumber}
      showHeader={false}
      {...narrationProps}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
        {/* Category line */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">
          <Signal className="h-4 w-4 text-primary" />
          <span className="text-xs uppercase tracking-widest text-primary font-medium">
            The Operational Performance Platform
          </span>
        </div>

        {/* Hero headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] max-w-4xl">
          <span className="title-accent">From Signals</span>
          <br />
          <span className="text-muted-foreground">to Outcomes</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          For Safety, Operations & Training leaders ready to transform
          disconnected operations into predictable, measurable performance.
        </p>

        {/* Trust bar */}
        <div className="flex items-center gap-8 mt-4">
          {trustStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 text-muted-foreground">
              <stat.icon className="h-4 w-4 text-primary/60" />
              <span className="text-lg font-bold text-foreground">{stat.value}</span>
              <span className="text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide0Title;
