import SlideContainer from "@/components/slides/SlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { painPoints } from "@/data/regulationManagementPlaybook";
import { FileSpreadsheet, AlertTriangle, Unlink, Brain, Users, Database } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  FileSpreadsheet, AlertTriangle, Unlink, Brain, Users, Database,
};

const RMSlide2Problem = (props: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="rm-problem"
      title="The Problem Today"
      subtitle="Why manual regulation management is unsustainable"
      slideNumber={2}
      {...props}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {painPoints.map((p) => {
          const Icon = iconMap[p.icon] || Database;
          return (
            <div key={p.headline} className="border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded bg-destructive/10 flex items-center justify-center">
                  <Icon className="h-3.5 w-3.5 text-destructive" />
                </div>
                <span className="text-xs font-semibold text-foreground">{p.headline}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.detail}</p>
            </div>
          );
        })}
      </div>
    </SlideContainer>
  );
};

export default RMSlide2Problem;
