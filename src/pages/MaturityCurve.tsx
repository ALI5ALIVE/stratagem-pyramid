import MaturityCurveVisualization from "@/components/MaturityCurveVisualization";
import PageNavigation from "@/components/PageNavigation";

const MaturityCurve = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-8 pb-6 px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">
          Comply365
        </p>
        <PageNavigation />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-3">
          Operational Reliability &<br />
          <span className="text-gradient-primary">Readiness Maturity Curve</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
          Where customers are today, what best practice looks like, and how Comply365 moves them up the curve
        </p>
      </header>

      {/* Main content */}
      <main className="container max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <MaturityCurveVisualization />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          © 2026 Comply365 · Operational Reliability & Readiness Platform
        </p>
      </footer>
    </div>
  );
};

export default MaturityCurve;
