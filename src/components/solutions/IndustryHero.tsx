import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/comply365-logo-white.png";

interface IndustryHeroProps {
  industry: string;
  headline: string;
  subhead: string;
  badgeText?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

const IndustryHero = ({
  industry,
  headline,
  subhead,
  badgeText,
  ctaPrimary = "See the Platform",
  ctaSecondary = "Calculate Your Impact",
}: IndustryHeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 py-6">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/homepage-mockup">
            <img src={logo} alt="Comply365" className="h-8" />
          </Link>
          <div className="flex items-center gap-8">
            <Link to="/solutions/airlines" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Airlines</Link>
            <Link to="/solutions/defense" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Defense</Link>
            <Link to="/solutions/rail" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Rail</Link>
            <Button variant="outline" size="sm">Request Demo</Button>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-6 relative pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-primary/30 text-primary bg-primary/5">
            {badgeText || `For ${industry}`}
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-[1.1]">
            {headline}
          </h1>
          
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
