import { BookOpen, Layers, FileText, Mic, ClipboardCheck, Lightbulb, Users, ShoppingCart, CheckCircle2 } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

const quarterlyStructure = [
  { label: "1 core campaign theme", icon: Layers, color: "text-primary" },
  { label: "1 campaign guide or hero asset", icon: FileText, color: "text-amber-400" },
  { label: "1 webinar", icon: Mic, color: "text-emerald-400" },
  { label: "1 decision asset", icon: ClipboardCheck, color: "text-purple-400" },
  { label: "Persona-led supporting content", icon: Users, color: "text-blue-400" },
  { label: "Sales enablement content", icon: ShoppingCart, color: "text-rose-400" },
  { label: "6 thought leadership articles", icon: Lightbulb, color: "text-indigo-400" },
];

const contentPrinciples = [
  "Market point of view",
  "Practical application",
  "Buying-group relevance",
  "A clear action step",
  "A decision-support asset",
];

const thoughtLeadershipGoals = [
  "Challenge outdated assumptions",
  "Define operational performance in the market's language",
  "Explain DTOP and signals in a way buyers can understand",
  "Create authority around the category before product conversations deepen",
];

const finalProgramme = [
  { label: "Modular flagship report", count: "1" },
  { label: "Quarterly campaign guides", count: "4" },
  { label: "Webinars", count: "4" },
  { label: "Quarterly decision assets", count: "4" },
  { label: "Thought leadership articles", count: "24" },
  { label: "Persona-led briefs", count: "5+" },
  { label: "Practical tools", count: "8+" },
  { label: "Quarterly sales enablement", count: "4" },
  { label: "Business case & proof content", count: "4+" },
];

const SlideContentArchitecture = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  return (
    <SlideContainer
      id="slide-content-architecture"
      title="Annual Content Architecture"
      subtitle="One anchor asset and four quarterly chapters — modular, disciplined, strategic"
      slideNumber={5}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
    >
      <div className="flex-1 flex flex-col gap-4 h-full overflow-hidden">
        {/* Anchor asset hero */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-primary uppercase tracking-widest font-semibold mb-0.5">Anchor Asset</p>
              <h3 className="text-base font-bold text-foreground">Flying High Report</h3>
              <p className="text-[11px] text-muted-foreground leading-snug mt-1">
                A modular flagship report that defines the category problem, introduces DTOP, 
                explains signals, and lays out the path to higher operational performance.
              </p>
            </div>
          </div>
        </div>

        {/* Three columns */}
        <div className="flex-1 grid grid-cols-3 gap-4 overflow-hidden">
          {/* Quarterly structure */}
          <div className="bg-card/60 border border-border/50 rounded-xl p-4 flex flex-col">
            <h3 className="text-sm font-bold text-foreground mb-3">Quarterly Structure</h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">
              Each quarter should include:
            </p>
            <div className="space-y-2 flex-1">
              {quarterlyStructure.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2.5 bg-background/50 rounded-lg px-3 py-2">
                    <Icon className={cn("w-3.5 h-3.5 shrink-0", item.color)} />
                    <span className="text-[11px] text-foreground/80 font-medium">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content principles */}
          <div className="bg-card/60 border border-border/50 rounded-xl p-4 flex flex-col">
            <h3 className="text-sm font-bold text-foreground mb-3">Content Principles</h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">
              Every quarter should combine:
            </p>
            <div className="space-y-2 flex-1">
              {contentPrinciples.map((principle) => (
                <div key={principle} className="flex items-center gap-2.5 bg-background/50 rounded-lg px-3 py-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px] text-foreground/80 font-medium">{principle}</span>
                </div>
              ))}
            </div>

            {/* Thought leadership */}
            <div className="mt-auto pt-3 border-t border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Thought Leadership</p>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed mb-2 italic">
                Not a bolt-on — one of the programme's core growth engines.
              </p>
              <div className="space-y-1">
                {thoughtLeadershipGoals.map((goal, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-[9px] text-indigo-400 font-bold mt-0.5">{i + 1}.</span>
                    <span className="text-[10px] text-foreground/70 leading-snug">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final programme summary */}
          <div className="bg-card/60 border border-border/50 rounded-xl p-4 flex flex-col">
            <h3 className="text-sm font-bold text-foreground mb-3">Final Programme</h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">
              Strategic enough for leadership audiences, practical enough for operational stakeholders, 
              and structured enough for internal teams to produce with confidence.
            </p>
            <div className="space-y-1.5 flex-1">
              {finalProgramme.map((item) => (
                <div key={item.label} className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2">
                  <span className="text-[11px] text-foreground/80">{item.label}</span>
                  <span className="text-xs font-bold text-primary">{item.count}</span>
                </div>
              ))}
            </div>

            {/* Budget note */}
            <div className="mt-auto pt-3 border-t border-border/30">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Budget</p>
              <p className="text-[10px] text-foreground/70 leading-relaxed">
                £7,000/month — sufficient for a focused, modular programme. 
                Not for disconnected one-off assets. Content created efficiently, then improved through review and iteration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideContentArchitecture;
