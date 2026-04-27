import { Link } from "react-router-dom";
import SlideContainer from "./SlideContainer";
import complyLogo from "@/assets/comply365-logo-white.png";
import { Button } from "@/components/ui/button";
import {
  Shield,
  FileText,
  GraduationCap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const pillars = [
  {
    title: "Safety",
    icon: Shield,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    title: "Content",
    icon: FileText,
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
  },
  {
    title: "Training",
    icon: GraduationCap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
];

const SlidePlatformExperience = ({ slideNumber }: { slideNumber?: number } = {}) => {
  return (
    <SlideContainer 
      id="slide-13" 
      variant="dark"
      title="The Homepage Experience"
      subtitle="See how messaging translates to the website"
      slideNumber={15}
    >

      <div className="flex flex-col items-center justify-center flex-1 max-w-4xl mx-auto">
        {/* Thumbnail Preview */}
        <div className="w-full bg-card border border-border rounded-xl overflow-hidden shadow-2xl mb-8">
          {/* Browser Chrome */}
          <div className="bg-muted/50 border-b border-border px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-background/50 border border-border/50 rounded px-4 py-1 text-xs text-muted-foreground">
                comply365.com
              </div>
            </div>
          </div>

          {/* Mini Preview Content */}
          <div className="p-8 bg-gradient-to-b from-primary/5 to-background">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <img src={complyLogo} alt="Comply365" className="h-5 w-auto" />
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-muted-foreground">Platform</span>
                <span className="text-[10px] text-muted-foreground">Solutions</span>
                <span className="text-[10px] text-muted-foreground">Customers</span>
                <div className="px-2 py-0.5 bg-primary rounded text-[10px] text-primary-foreground">Demo</div>
              </div>
            </div>

            {/* Hero Preview */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-display font-bold text-foreground mb-1">
                The Operational Performance Platform
              </h2>
              <p className="text-xs text-primary font-medium mb-3">
                for Safety, Content, and Training
              </p>
              <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
                Connect safety, content, and training into an intelligent operating platform.{" "}
                <span className="text-foreground font-medium">Turn signals into orchestrated change and measurable outcomes.</span>
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="px-3 py-1 bg-primary rounded text-xs text-primary-foreground">See the Platform</div>
                <div className="px-3 py-1 border border-border rounded text-xs text-foreground">Calculate Your Impact</div>
              </div>
            </div>

            {/* Three Pillars Preview */}
            <div className="flex items-center justify-center gap-4">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className={`${pillar.bgColor} rounded-lg px-4 py-2 flex items-center gap-2`}
                  >
                    <Icon className={`w-4 h-4 ${pillar.color}`} />
                    <span className={`text-xs font-medium ${pillar.color}`}>{pillar.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Description & CTA */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6 max-w-xl">
            This slide links to a <span className="text-foreground font-medium">full-length, scrollable website mockup</span> demonstrating 
            how the Operational Performance Platform messaging applies across hero, problem statement, 
            solution pillars, DTOP model, case studies, and more.
          </p>
          
          <Link to="/homepage-mockup">
            <Button size="lg" className="gap-2">
              View Full Homepage Mockup
              <ExternalLink className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlidePlatformExperience;
