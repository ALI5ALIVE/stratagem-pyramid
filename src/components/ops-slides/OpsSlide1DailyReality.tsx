import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Clock, AlertTriangle, FileX, Users, Search, Star, RefreshCw, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface OpsSlide1Props extends SlideNarrationProps {
  slideNumber?: number;
}

const inboxItems = [
  { time: "08:15", source: "Content Mgr365", sender: "Content Manager365", subject: "Procedure revision update requires your approval", preview: "SOP-ENG-42 v3.1 revision ready for sign-off. 2 departments pending…", urgency: "Action Required", urgencyColor: "bg-amber-500/15 text-amber-400 border-amber-500/30", unread: true, starred: true },
  { time: "09:30", source: "Safety Mgr365", sender: "Safety Manager365", subject: "Overdue audit finding — corrective action past due", preview: "Finding #2847 — corrective action overdue by 12 days. Escalation…", urgency: "Critical", urgencyColor: "bg-red-500/15 text-red-400 border-red-500/30", unread: true, starred: true },
  { time: "10:45", source: "Training Mgr365", sender: "Training Manager365", subject: "Type rating renewal — bid for simulator slots required", preview: "3 crew members due for recurrent. Sim availability closing in 5 days…", urgency: "Warning", urgencyColor: "bg-amber-500/15 text-amber-400 border-amber-500/30", unread: true, starred: false },
  { time: "13:00", source: "Safety Mgr365", sender: "Safety Manager365", subject: "Your input required for risk control effectiveness review", preview: "Risk control RC-114 requires quarterly effectiveness assessment…", urgency: "Action Required", urgencyColor: "bg-amber-500/15 text-amber-400 border-amber-500/30", unread: false, starred: false },
  { time: "15:30", source: "Content Mgr365", sender: "Content Manager365", subject: "Regulation revision — new update requires applicability review", preview: "EASA AD 2026-0034 published. Applicability assessment needed for 4 SOPs…", urgency: "Critical", urgencyColor: "bg-red-500/15 text-red-400 border-red-500/30", unread: false, starred: true },
];

const painPoints = [
  { icon: FileX, label: "Cross-Dept Requests", stat: "5 depts, 1 queue" },
  { icon: Search, label: "Buried Approvals", stat: "40% overdue" },
  { icon: Clock, label: "Slow Coordination", stat: "3-week avg" },
  { icon: Users, label: "Multi-Dept Input", stat: "60% chasing" },
  { icon: AlertTriangle, label: "Missed Deadlines", stat: "Quarter after quarter" },
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
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Inbox */}
        <div className="flex flex-col rounded-lg border border-muted/30 bg-card overflow-hidden flex-1">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-3 py-2 border-b border-muted/20 bg-muted/5">
            <Checkbox className="h-3.5 w-3.5" />
            <RefreshCw className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            <div className="flex items-center gap-1.5 flex-1 rounded-md border border-muted/30 bg-background px-2 py-1">
              <Search className="h-3 w-3 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">Search messages…</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-foreground">Inbox</span>
              <span className="text-[10px] font-bold bg-destructive text-destructive-foreground rounded-full px-1.5 py-0.5 leading-none">5</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">3 systems · 0 linked</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-muted/15 overflow-auto flex-1">
            {inboxItems.map((item) => (
              <div
                key={item.time}
                className={`flex items-center gap-2.5 px-3 py-2 hover:bg-muted/10 transition-colors ${item.unread ? "bg-accent/5" : ""}`}
              >
                <Checkbox className="h-3.5 w-3.5 shrink-0" />
                <Star className={`h-3.5 w-3.5 shrink-0 ${item.starred ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
                <span className={`text-xs w-[110px] shrink-0 truncate ${item.unread ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                  {item.sender}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs truncate ${item.unread ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                      {item.subject}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 truncate hidden lg:inline">
                      — {item.preview}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className={`text-[9px] px-1.5 py-0 shrink-0 ${item.urgencyColor}`}>
                  {item.urgency}
                </Badge>
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-muted-foreground border-muted/40 shrink-0">
                  {item.source}
                </Badge>
                <span className="text-[10px] font-mono text-muted-foreground shrink-0 w-[38px] text-right">
                  {item.time}
                </span>
              </div>
            ))}
          </div>

          <div className="px-3 py-1.5 border-t border-muted/20 bg-muted/5">
            <p className="text-[10px] text-muted-foreground italic text-center">
              Same event. 3 systems. No connection. No action taken.
            </p>
          </div>
        </div>

        {/* Pain points strip */}
        <div className="space-y-1.5">
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            The Pattern
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {painPoints.map((point) => (
              <div
                key={point.label}
                className="flex flex-col items-center gap-1 p-2.5 rounded-lg border border-muted/20 bg-muted/5 text-center"
              >
                <point.icon className="h-4 w-4 text-destructive/70" />
                <span className="text-[11px] font-medium text-foreground leading-tight">{point.label}</span>
                <span className="text-[10px] text-muted-foreground">{point.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SalesSlideContainer>
  );
};

export default OpsSlide1DailyReality;
