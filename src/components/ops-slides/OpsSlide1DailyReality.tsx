import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, AlertTriangle, FileX, Users, Search, MessageSquare, Quote } from "lucide-react";

interface OpsSlide1Props extends SlideNarrationProps {
  slideNumber?: number;
}

const timeline = [
  { time: "06:15", event: "Hard landing report — filed in safety system", color: "text-red-400" },
  { time: "08:30", event: "Ops notice — different system, no link to report", color: "text-amber-400" },
  { time: "10:00", event: "Training team unaware — crew flies next sector", color: "text-red-400" },
  { time: "14:00", event: "Compliance asks for evidence — 3 emails, 2 spreadsheets", color: "text-amber-400" },
  { time: "17:30", event: "Investigation open — same event, third duplicate entry", color: "text-orange-400" },
];

const painPoints = [
  { icon: FileX, label: "Siloed Systems", desc: "Safety, content, training — all disconnected" },
  { icon: Search, label: "Invisible Signals", desc: "40% of reports never trigger action" },
  { icon: Clock, label: "Slow Investigations", desc: "3-week average to close a finding" },
  { icon: Users, label: "Manual Coordination", desc: "60% of time spent chasing, not improving" },
  { icon: AlertTriangle, label: "Recurring Events", desc: "Same incidents repeat quarter after quarter" },
];

const OpsSlide1DailyReality = ({ slideNumber, ...narrationProps }: OpsSlide1Props) => {
  return (
    <SalesSlideContainer
      id="ops-slide-1"
      title="Your Daily Reality"
      subtitle="A day in the life of disconnected operations"
      slideNumber={slideNumber}
      {...narrationProps}
    >
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        {/* Left: Timeline */}
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Day in the Life
          </h3>
          <div className="space-y-2">
            {timeline.map((item) => (
              <div key={item.time} className="flex items-start gap-3 group">
                <span className="text-xs font-mono text-muted-foreground w-12 shrink-0 mt-0.5">
                  {item.time}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                <span className={`text-sm ${item.color}`}>{item.event}</span>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="mt-4 p-3 rounded-lg border border-muted/30 bg-muted/5">
            <div className="flex items-start gap-2">
              <Quote className="h-4 w-4 text-primary/50 shrink-0 mt-0.5" />
              <p className="text-sm italic text-muted-foreground">
                "Every disconnected system is a risk you can't see."
              </p>
            </div>
          </div>
        </div>

        {/* Right: Pain points */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            The Pattern
          </h3>
          {painPoints.map((point) => (
            <div
              key={point.label}
              className="flex items-start gap-3 p-3 rounded-lg border border-muted/20 bg-muted/5 hover:bg-muted/10 transition-colors"
            >
              <point.icon className="h-5 w-5 text-red-400/80 shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium text-foreground">{point.label}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide1DailyReality;
