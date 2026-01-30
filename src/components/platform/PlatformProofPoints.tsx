import { Plane, Train, Shield, Users, Clock, CheckCircle2 } from "lucide-react";

const industries = [
  { icon: Plane, label: "Commercial Aviation", stat: "50+ airlines" },
  { icon: Train, label: "Rail Operations", stat: "Major operators" },
  { icon: Shield, label: "Defense & Government", stat: "Classified programs" },
];

const metrics = [
  { value: "1M+", label: "Frontline workers supported", icon: Users },
  { value: "99.9%", label: "Platform uptime", icon: Clock },
  { value: "Zero", label: "Repeat audit findings", icon: CheckCircle2 },
];

const PlatformProofPoints = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted Across Industries
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From commercial aviation to defense, organizations trust Comply365 to transform 
            operational performance.
          </p>
        </div>

        {/* Industry Trust Bar */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div 
                key={index}
                className="bg-card border border-border/50 rounded-xl p-6 text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{industry.label}</h3>
                <p className="text-sm text-primary font-medium">{industry.stat}</p>
              </div>
            );
          })}
        </div>

        {/* Metrics */}
        <div className="bg-card border border-primary/20 rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                  <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                  <p className="text-muted-foreground">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-card border border-border/50 rounded-xl p-8 text-center">
            <div className="text-4xl text-primary/20 mb-4">"</div>
            <p className="text-lg text-foreground italic mb-4">
              Comply365 helped us transform compliance from a cost center into a competitive advantage. 
              We now respond to safety events 10x faster with full audit trails.
            </p>
            <p className="text-sm text-muted-foreground">
              — VP Safety, Major North American Airline
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformProofPoints;
