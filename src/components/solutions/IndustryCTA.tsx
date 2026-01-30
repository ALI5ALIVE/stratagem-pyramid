import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/comply365-logo-white.png";

interface IndustryCTAProps {
  industry: string;
  headline?: string;
  subhead?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

const IndustryCTA = ({
  industry,
  headline,
  subhead,
  ctaPrimary = "Request a Demo",
  ctaSecondary = "Calculate Your ROI",
}: IndustryCTAProps) => {
  return (
    <>
      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              {headline || `Ready for a connected, intelligent, and predictive platform?`}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {subhead || `See how ${industry.toLowerCase()} leaders are transforming operational performance.`}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 text-base transition-transform hover:scale-105">
                {ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base">
                <Calculator className="w-4 h-4" />
                {ctaSecondary}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Link to="/homepage-mockup">
                <img src={logo} alt="Comply365" className="h-6" />
              </Link>
              <p className="text-sm text-muted-foreground">
                A connected, intelligent, and predictive platform.
              </p>
            </div>
            
            <div className="flex items-center gap-8">
              <Link to="/solutions/airlines" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Airlines</Link>
              <Link to="/solutions/defense" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Defense</Link>
              <Link to="/solutions/rail" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Rail</Link>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © 2025 Comply365. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default IndustryCTA;
