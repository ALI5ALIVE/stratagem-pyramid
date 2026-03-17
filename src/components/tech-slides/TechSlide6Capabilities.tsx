import SalesSlideContainer from "@/components/sales-slides/SalesSlideContainer";
import { SlideNarrationProps } from "@/types/slideProps";
import { Link, RefreshCw, BadgeCheck } from "lucide-react";

interface Props extends SlideNarrationProps { slideNumber?: number; }

const pillars = [
  {
    icon: Link, title: "Connected Foundation", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30",
    desc: "A single data fabric connecting safety, content, and training — eliminating silos by design.",
    details: ["Unified data model across all three applications", "Real-time event propagation between modules", "Shared taxonomy and classification (4,000+ categories)", "Single sign-on and role-based access"],
  },
  {
    icon: RefreshCw, title: "Continuous Improvement", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30",
    desc: "Closed-loop learning that turns every signal into a measurable improvement cycle.",
    details: ["DTOP pipeline automates detect-to-prove", "Pattern recognition across historical data", "Automated corrective action workflows", "Recurrence tracking and trend analysis"],
  },
  {
    icon: BadgeCheck, title: "Proof at Scale", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30",
    desc: "Continuous, auditable evidence that every action was taken, every person was trained, every outcome was measured.",
    details: ["Automated audit package generation", "Real-time compliance dashboards", "Training completion evidence chains", "Regulatory submission-ready reports"],
  },
];

const TechSlide6Capabilities = ({ slideNumber, ...narrationProps }: Props) => (
  <SalesSlideContainer id="tech-slide-6" title="Platform Capabilities" subtitle="Three pillars that define the Operational Performance Platform" slideNumber={slideNumber} {...narrationProps}>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
      {pillars.map((p) => (
        <div key={p.title} className={`rounded-xl border ${p.border} ${p.bg} p-5 flex flex-col`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${p.bg} border ${p.border}`}>
              <p.icon className={`h-5 w-5 ${p.color}`} />
            </div>
            <h3 className={`text-lg font-bold ${p.color}`}>{p.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
          <ul className="space-y-2 flex-1">
            {p.details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${p.color.replace("text-", "bg-")}/60`} />
                {d}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </SalesSlideContainer>
);

export default TechSlide6Capabilities;
