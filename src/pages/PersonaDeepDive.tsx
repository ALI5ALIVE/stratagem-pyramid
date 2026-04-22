import { useState } from "react";
import { personaProfiles, PersonaProfile } from "@/data/personaProfiles";
import { Briefcase, Shield, Plane, GraduationCap, Monitor, ChevronRight, MessageSquare, Target, AlertTriangle, Zap, CheckCircle2, Quote, BarChart3, HelpCircle, FileText, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import SlideCommentLayer from "@/components/comments/SlideCommentLayer";
import PersonaDownloadButton from "@/components/PersonaDownloadButton";

const iconMap: Record<string, React.ElementType> = {
  Briefcase, Shield, Plane, GraduationCap, Monitor,
};

function PersonaTab({ persona, isActive, onClick }: { persona: PersonaProfile; isActive: boolean; onClick: () => void }) {
  const Icon = iconMap[persona.iconName] || Briefcase;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all w-full ${
        isActive
          ? `${persona.bgColor} ${persona.borderColor} border ${persona.color} font-medium`
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent"
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="min-w-0">
        <div className="text-sm font-medium truncate">{persona.title}</div>
        <div className="text-[11px] text-muted-foreground">{persona.seniority}</div>
      </div>
      {isActive && <ChevronRight className="h-4 w-4 ml-auto shrink-0" />}
    </button>
  );
}

function SectionCard({ title, icon: Icon, color, children }: { title: string; icon: React.ElementType; color?: string; children: React.ReactNode }) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="pb-3 pt-4 px-5">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Icon className={`h-4 w-4 ${color || "text-primary"}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-4">{children}</CardContent>
    </Card>
  );
}

function BulletList({ items, color }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-foreground/80 leading-relaxed">
          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${color || "bg-primary"}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PersonaDetail({ persona }: { persona: PersonaProfile }) {
  const Icon = iconMap[persona.iconName] || Briefcase;
  const dotColor = persona.bgColor.replace("/10", "/60");

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className={`${persona.bgColor} ${persona.borderColor} border rounded-xl p-6`}>
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${persona.bgColor} ${persona.borderColor} border`}>
            <Icon className={`h-6 w-6 ${persona.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className={`text-xl font-bold ${persona.color}`}>{persona.title}</h2>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {persona.titleVariants.map((v, i) => (
                <Badge key={i} variant="outline" className="text-[10px] border-border/50">{v}</Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge className={`${persona.bgColor} ${persona.color} border ${persona.borderColor} text-xs`}>{persona.seniority}</Badge>
            <PersonaDownloadButton persona={persona} />
          </div>
        </div>
        <p className="text-sm text-foreground/70 mt-4 leading-relaxed">{persona.profileSummary}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <div className="bg-background/30 rounded-lg p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Reports To</p>
            <p className="text-xs text-foreground">{persona.reportsTo}</p>
          </div>
          <div className="bg-background/30 rounded-lg p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Org Context</p>
            <p className="text-xs text-foreground">{persona.orgContext}</p>
          </div>
          <div className="bg-background/30 rounded-lg p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Budget Influence</p>
            <p className="text-xs text-foreground">{persona.budgetInfluence}</p>
          </div>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Strategic Priorities" icon={Target} color={persona.color}>
          <BulletList items={persona.strategicPriorities} color={dotColor} />
        </SectionCard>

        <SectionCard title="Daily Pain Points" icon={AlertTriangle} color="text-amber-400">
          <BulletList items={persona.dailyPains} color="bg-amber-400/60" />
        </SectionCard>

        <SectionCard title="Buying Triggers" icon={Zap} color="text-yellow-400">
          <BulletList items={persona.buyingTriggers} color="bg-yellow-400/60" />
        </SectionCard>

        <SectionCard title="Decision Criteria" icon={CheckCircle2} color="text-green-400">
          <BulletList items={persona.decisionCriteria} color="bg-green-400/60" />
        </SectionCard>
      </div>

      {/* Value Proposition - full width */}
      <SectionCard title="Value Proposition" icon={Quote} color={persona.color}>
        <p className="text-sm text-foreground leading-relaxed italic border-l-2 border-primary/30 pl-4">{persona.valueProposition}</p>
      </SectionCard>

      {/* Key Messages */}
      <SectionCard title="Key Messages" icon={MessageSquare} color={persona.color}>
        <div className="space-y-3">
          {persona.keyMessages.map((msg, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${persona.bgColor} ${persona.color}`}>{i + 1}</span>
              <p className="text-sm text-foreground/80 leading-relaxed">{msg}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Objection Handling - Accordion */}
      <SectionCard title="Objection Handling" icon={AlertTriangle} color="text-red-400">
        <Accordion type="single" collapsible className="w-full">
          {persona.objections.map((obj, i) => (
            <AccordionItem key={i} value={`obj-${i}`} className="border-border/30">
              <AccordionTrigger className="text-sm text-foreground/90 hover:no-underline py-3">
                <span className="text-left pr-2">&ldquo;{obj.objection}&rdquo;</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold mb-1">Recommended Response</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{obj.response}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionCard>

      {/* Content Alignment */}
      <SectionCard title="Content Alignment" icon={FileText} color={persona.color}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-bold">Preferred Formats</p>
            <ul className="space-y-1">
              {persona.contentAlignment.preferredFormats.map((f, i) => (
                <li key={i} className="text-xs text-foreground/70">• {f}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-bold">Channels</p>
            <ul className="space-y-1">
              {persona.contentAlignment.channels.map((c, i) => (
                <li key={i} className="text-xs text-foreground/70">• {c}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-bold">Content Themes</p>
            <ul className="space-y-1">
              {persona.contentAlignment.contentThemes.map((t, i) => (
                <li key={i} className="text-xs text-foreground/70">• {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* Metrics + Discovery - two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Metrics That Matter" icon={BarChart3} color={persona.color}>
          <BulletList items={persona.metricsThatMatter} color={dotColor} />
        </SectionCard>

        <SectionCard title="Discovery Questions" icon={HelpCircle} color={persona.color}>
          <div className="space-y-2">
            {persona.discoveryQuestions.map((q, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-[10px] font-bold text-muted-foreground mt-0.5 shrink-0">Q{i + 1}</span>
                <p className="text-sm text-foreground/80 leading-relaxed italic">{q}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default function PersonaDeepDive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const active = personaProfiles[activeIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <div className="h-5 w-px bg-border" />
          <div>
            <h1 className="text-lg font-bold text-foreground">Persona Deep-Dive Hub</h1>
            <p className="text-xs text-muted-foreground">Comprehensive persona profiles for sales enablement & content alignment</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Mobile: horizontal chips */}
        {isMobile && (
          <>
          <div className="flex justify-end mb-3">
            <PersonaDownloadButton persona={active} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {personaProfiles.map((p, i) => {
              const Icon = iconMap[p.iconName] || Briefcase;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveIndex(i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border shrink-0 ${
                    i === activeIndex
                      ? `${p.bgColor} ${p.borderColor} ${p.color}`
                      : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {p.title}
                </button>
              );
            })}
          </div>
          </>
        )}

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          {!isMobile && (
            <div className="w-64 shrink-0">
              <div className="sticky top-24 space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3 px-2 font-bold">Personas</p>
                {personaProfiles.map((p, i) => (
                  <PersonaTab key={p.id} persona={p} isActive={i === activeIndex} onClick={() => setActiveIndex(i)} />
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0 relative">
            <SlideCommentLayer deckId="personas" slideId={active.id} variant="dark" />
            <PersonaDetail persona={active} />
          </div>
        </div>
      </div>
    </div>
  );
}
