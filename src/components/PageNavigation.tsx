import { Link, useLocation } from "react-router-dom";
import { Pyramid, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const PageNavigation = () => {
  const location = useLocation();
  const isMaturityCurve = location.pathname === "/maturity-curve";

  return (
    <nav className="flex justify-center gap-1 sm:gap-2 mb-4 sm:mb-6">
      <Link
        to="/"
        className={cn(
          "flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200",
          !isMaturityCurve
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Pyramid className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">Pyramid</span>
        <span className="xs:hidden">Pyramid</span>
      </Link>
      <Link
        to="/maturity-curve"
        className={cn(
          "flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200",
          isMaturityCurve
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">Maturity</span>
        <span className="xs:hidden">Curve</span>
      </Link>
    </nav>
  );
};

export default PageNavigation;
