import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, AlertTriangle, FileX, Users, Search, Mail, Inbox, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OpsSlide1Props extends SlideNarrationProps {
  slideNumber?: number;
}

const inboxItems = [
  { time: "06:15", source: "SMS", subject: "Hard landing report filed — runway 27L", urgency: "Critical", urgencyColor: "bg-red-500/15 text-red-400 border-red-500/30" },
  { time: "08:30", source: "Ops Portal", subject: "Crew scheduling notice — no link to SMS report", urgency: "Warning", urgencyColor: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  { time: "10:00", source: "Email", subject: "Training team unaware — crew flies next sector", urgency: "Critical", urgencyColor: "bg-red-500/15 text-red-400 border-red-500/30" },
  { time: "14:00", source: "Spreadsheet", subject: "Compliance requests evidence — 3 emails, 2 attachments", urgency: "Warning", urgencyColor: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  { time: "17:30", source: "SMS", subject: "Investigation opened — third duplicate entry for same event", urgency: "Escalation", urgencyColor: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
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
        {/* Left: Inbox */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Inbox className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Inbox
              </h3>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              5 unread · 3 systems · 0 linked
            </span>
          </div>

          <div className="rounded-lg border border-muted/30 bg-card divide-y divide-muted/20 overflow-hidden">
            {inboxItems.map((item) => (
              <div
                key={item.time}
                className="flex items-start gap-3 px-3 py-2.5 hover:bg-muted/10 transition-colors"
              >
                <Mail className="h-4 w-4 text-primary/50 shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${item.urgencyColor}`}>
                      {item.urgency}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground border-muted/40">
                      {item.source}
                    </Badge>
                    <span className="text-[10px] font-mono text-muted-foreground ml-auto shrink-0">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-sm text-foreground truncate">{item.subject}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground italic text-center mt-2">
            Same event. 3 systems. No connection.
          </p>
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
