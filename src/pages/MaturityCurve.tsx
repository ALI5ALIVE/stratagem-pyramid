import MaturityCurveVisualization from "@/components/MaturityCurveVisualization";
import PageNavigation from "@/components/PageNavigation";

const MaturityCurve = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-6 sm:pt-8 pb-4 sm:pb-6 px-4 sm:px-6 text-center">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-2 sm:mb-3">
          Comply365
        </p>
        <PageNavigation />
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display font-bold text-foreground mb-2 sm:mb-3 px-2">
          Operational Reliability &<br />
          <span className="text-gradient-primary">Readiness Maturity Curve</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-xs sm:text-sm px-2">
          Where customers are today, what best practice looks like, and how Comply365 moves them up the curve
        </p>
      </header>

      {/* Main content */}
      <main className="container max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 sm:pb-12 md:pb-16">
        <MaturityCurveVisualization />
      </main>

      {/* Footer */}
      <footer className="py-4 sm:py-6 text-center border-t border-border/50">
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          © 2026 Comply365 · Operational Excellence & Readiness Platform
        </p>
      </footer>
    </div>
  );
};

export default MaturityCurve;
