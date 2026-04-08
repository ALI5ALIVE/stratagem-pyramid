import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CASlide6HowItWorks from "@/components/coanalyst-slides/CASlide6HowItWorks";
import CASlide8VsGenericAI from "@/components/coanalyst-slides/CASlide8VsGenericAI";

const CoAnalystPreview = () => {
  return (
    <div className="h-screen w-full bg-background text-foreground overflow-y-auto snap-y snap-mandatory">
      <Link
        to="/pitch-executive-2"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-card/90 backdrop-blur-sm border border-border/50 text-sm font-medium text-foreground hover:bg-card transition-colors shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Executive Pitch
      </Link>

      <div className="snap-start min-h-screen">
        <CASlide6HowItWorks />
      </div>
      <div className="snap-start min-h-screen">
        <CASlide8VsGenericAI />
      </div>
    </div>
  );
};

export default CoAnalystPreview;
