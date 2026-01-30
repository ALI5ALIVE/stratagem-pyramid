import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

interface IndustryHeroProps {
  industry: string;
  headline: string;
  subhead: string;
  scopeLine?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

const IndustryHero = ({
  industry,
  headline,
  subhead,
  scopeLine,
  ctaPrimary = "See the Platform",
  ctaSecondary = "Calculate Your Impact",
}: IndustryHeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative pt-20">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-2 leading-[1.1]">
            {headline}
          </h1>
          
          <p className="text-sm md:text-base text-primary font-medium mb-6">
            {scopeLine || "for Safety, Content, and Training"}
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            {subhead}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="gap-2 text-base transition-transform hover:scale-105">
              {ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base">
              <Play className="w-4 h-4" />
              {ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryHero;
