import { Link, useLocation } from "react-router-dom";
import { Pyramid, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const PageNavigation = () => {
  const location = useLocation();
  const isMaturityCurve = location.pathname === "/maturity-curve";

  return (
    <nav className="flex justify-center gap-2 mb-6">
      <Link
        to="/"
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          !isMaturityCurve
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Pyramid className="w-4 h-4" />
        Pyramid View
      </Link>
      <Link
        to="/maturity-curve"
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          isMaturityCurve
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <TrendingUp className="w-4 h-4" />
        Maturity Curve
      </Link>
    </nav>
  );
};

export default PageNavigation;
