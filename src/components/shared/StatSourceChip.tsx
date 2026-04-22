import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface StatSourceChipProps {
  source: string;
  methodology?: string;
  label?: string;
  className?: string;
}

/**
 * Small inline citation chip. Shows an Info icon that opens a Popover
 * with the source text and optional methodology note. Use next to any
 * statistic that needs a defensible reference.
 */
const StatSourceChip = ({ source, methodology, label = "Sources", className }: StatSourceChipProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1 rounded-full border border-muted/30 bg-muted/10 px-2 py-0.5 text-[10px] font-medium text-muted-foreground hover:bg-muted/20 hover:text-foreground transition-colors",
            className,
          )}
          aria-label="View sources and methodology"
        >
          <Info className="h-2.5 w-2.5" />
          <span>{label}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="w-80 text-xs">
        <div className="space-y-2">
          <div>
            <p className="font-semibold text-foreground mb-1">Sources</p>
            <p className="text-muted-foreground leading-relaxed">{source}</p>
          </div>
          {methodology && (
            <div className="pt-2 border-t border-muted/20">
              <p className="font-semibold text-foreground mb-1">Methodology</p>
              <p className="text-muted-foreground leading-relaxed">{methodology}</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StatSourceChip;
