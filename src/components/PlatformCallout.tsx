import { Zap } from "lucide-react";

const PlatformCallout = () => {
  return (
    <div className="platform-callout">
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-pyramid-operational flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h4 className="text-sm font-display font-semibold text-foreground mb-1">
            Platform Advantage
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Point solutions improve silos. Platforms improve outcomes. 
            <span className="text-foreground font-medium"> Comply365 closes the loop from signal → change → readiness → proof.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlatformCallout;
