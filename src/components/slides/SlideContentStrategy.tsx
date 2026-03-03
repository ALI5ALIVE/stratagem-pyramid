import { useState } from "react";
import { Shield, Zap, Target, TrendingUp, AlertOctagon, RefreshCw, Cog, Radio, RotateCcw, BadgeCheck } from "lucide-react";
import SlideContainer from "./SlideContainer";
import type { SlideNarrationProps } from "@/types/slideProps";
import { cn } from "@/lib/utils";

interface JourneyStage {
  num: number;
  title: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

interface ContentAsset {
  title: string;
  format: string;
  audience: string;
  summary: string;
}

interface Quarter {
  id: string;
  label: string;
  theme: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderAccent: string;
  narrative: string;
  quarterMessage: string;
  dtopRole: string;
  messageTerritory: string[];
  journeyStageNums: number[];
  assets: ContentAsset[];
}

const journeyStages: JourneyStage[] = [
  { num: 1, title: "The status quo is failing", icon: AlertOctagon, color: "text-red-400", bg: "bg-red-400" },
  { num: 2, title: "Performance needs redefining", icon: RefreshCw, color: "text-amber-400", bg: "bg-amber-400" },
  { num: 3, title: "There is a better operating model", icon: Cog, color: "text-emerald-400", bg: "bg-emerald-400" },
  { num: 4, title: "Signals create line of sight", icon: Radio, color: "text-blue-400", bg: "bg-blue-400" },
  { num: 5, title: "Readiness becomes continuous", icon: RotateCcw, color: "text-purple-400", bg: "bg-purple-400" },
  { num: 6, title: "Progress can be proved", icon: BadgeCheck, color: "text-primary", bg: "bg-primary" },
];

const quarters: Quarter[] = [
  {
    id: "q1",
    label: "Q1",
    theme: "Build the Foundation",
    subtitle: "Apr · May · Jun",
    icon: Shield,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderAccent: "border-blue-400/40",
    quarterMessage: "You cannot raise performance on fragmented foundations.",
    narrative: "Performance breaks down when safety, compliance, training, content, and IT improve separately. Before organisations can improve how they act, they need a connected foundation built on shared visibility, governance, and accountability.",
    dtopRole: "Introduce Detect as the need to see what matters clearly, and prepare the ground for Trigger, Orchestrate, and Improve by showing why disconnected systems weaken the whole performance model.",
    messageTerritory: [
      "The market is still managing performance in silos",
      "Fragmented systems reduce control and slow progress",
      "Connected foundations are the first step to better performance",
    ],
    journeyStageNums: [1, 2],
    assets: [
      {
        title: "Flying High Report: Chapter 1",
        format: "Flagship Report",
        audience: "Executive, Safety, Compliance, Training, IT leaders",
        summary: "Defines the category problem, introduces the fragmentation challenge, and establishes why operational performance requires a connected foundation rather than isolated improvement streams.",
      },
      {
        title: "Build the Foundation for Performance",
        format: "Campaign Guide",
        audience: "Marketing, Sales, wider buying group",
        summary: "The primary campaign asset for Q1. Walks the market through the case for connected foundations, using real operational friction points as evidence.",
      },
      {
        title: "Why Fragmented Systems Quietly Reduce Performance",
        format: "Webinar",
        audience: "Safety, Compliance, Training leaders and their teams",
        summary: "Interactive session exploring how siloed systems create drag, inconsistency, and reduced accountability — and what connected foundations look like in practice.",
      },
      {
        title: "The Operational Performance Baseline",
        format: "Decision Asset",
        audience: "Executive sponsors, project leads evaluating readiness",
        summary: "A structured self-assessment tool helping organisations benchmark their current operational maturity across safety, compliance, training, content, and IT alignment.",
      },
      {
        title: "What Operational Performance Actually Means",
        format: "Education Brief",
        audience: "Buying group members new to the concept",
        summary: "Reframes performance beyond activity metrics. Explains why performance is a cross-functional outcome, not a department-level measure.",
      },
      {
        title: "Why Content, Safety, and Training Must Work Together",
        format: "Education Brief",
        audience: "Cross-functional stakeholders across safety, training, and content",
        summary: "Shows how disconnected improvement streams weaken follow-through and reduce visibility for leadership teams trying to coordinate change.",
      },
      {
        title: "Governance Without Drag",
        format: "Thought Leadership",
        audience: "Compliance and IT leaders",
        summary: "Challenges the assumption that stronger governance means slower operations. Makes the case for lightweight, connected governance models.",
      },
      {
        title: "The Hidden Cost of Disconnected Workflows",
        format: "Thought Leadership",
        audience: "Executive and IT leaders",
        summary: "Quantifies the operational cost of fragmentation — from duplicated effort to delayed response — and positions connected workflows as the alternative.",
      },
      {
        title: "Readiness Starts Before Training Completion",
        format: "Thought Leadership",
        audience: "Training and Safety leaders",
        summary: "Argues that readiness is not a training metric. It begins with visibility, governance, and shared accountability across functions.",
      },
      {
        title: "Shared Language for Shared Performance",
        format: "Thought Leadership",
        audience: "Cross-functional leadership teams",
        summary: "Explores how misaligned terminology across safety, compliance, and training teams creates friction and slows coordinated improvement.",
      },
      {
        title: "Why IT Cannot Fix What Operations Cannot See",
        format: "Thought Leadership",
        audience: "IT and Operations leaders",
        summary: "Argues that technology alone cannot resolve operational fragmentation. Without shared visibility across functions, IT investment solves symptoms rather than root causes.",
      },
      {
        title: "The Five Signs Your Performance Model Is Fragmented",
        format: "Thought Leadership",
        audience: "Executive and Safety leaders",
        summary: "A diagnostic narrative identifying the five most common indicators that an organisation's performance model is siloed — from duplicated KPIs to inconsistent escalation paths.",
      },
      {
        title: "Fragmentation Risk Checklist",
        format: "Practical Tool",
        audience: "Operations and IT teams evaluating current state",
        summary: "A downloadable diagnostic checklist helping organisations identify where fragmentation is creating the most operational drag.",
      },
      {
        title: "Connected Foundations Quick-Start Guide",
        format: "Practical Tool",
        audience: "Project leads and change managers",
        summary: "A step-by-step primer for teams beginning the transition from siloed operations to a connected performance foundation, with prioritisation frameworks.",
      },
      {
        title: "Stakeholder Alignment Canvas",
        format: "Practical Tool",
        audience: "Executive sponsors and project leads",
        summary: "A workshop-ready tool for mapping stakeholder priorities, identifying alignment gaps, and building consensus around a connected performance approach.",
      },
      {
        title: "Q1 Email Nurture Sequence",
        format: "Nurture Content",
        audience: "Marketing-qualified leads across the buying group",
        summary: "A structured 6-touch email sequence building the Q1 narrative from fragmentation awareness through to connected foundation readiness.",
      },
      {
        title: "Q1 Social Content Pack",
        format: "Social Content",
        audience: "LinkedIn audience — executive and practitioner segments",
        summary: "A suite of social posts, carousels, and short-form content amplifying Q1 themes across LinkedIn, designed for both brand and employee advocacy channels.",
      },
      {
        title: "Q1 Sales Narrative Sheet",
        format: "Sales Enablement",
        audience: "Sales teams and account managers",
        summary: "Equips sales teams with the Q1 outcome-led story: why fragmented foundations limit performance and how connected models change the conversation.",
      },
    ],
  },
  {
    id: "q2",
    label: "Q2",
    theme: "From Signals to Action",
    subtitle: "Jul · Aug · Sep",
    icon: Zap,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderAccent: "border-amber-400/40",
    quarterMessage: "Performance improves when signals lead to action, not delay.",
    narrative: "Operational performance is shaped by what happens after something important is identified. The real challenge is not simply visibility — it is how quickly and consistently teams trigger response, coordinate action, and close the gap between issue and follow-through.",
    dtopRole: "DTOP comes fully into view: Detect what matters → Trigger the right response → Orchestrate cross-functional action → Begin to Improve through follow-through and learning.",
    messageTerritory: [
      "Visibility alone does not improve performance",
      "Signals create value when ownership is clear",
      "Coordinated response reduces lag and strengthens control",
    ],
    journeyStageNums: [3, 4],
    assets: [
      {
        title: "Flying High Report: Chapter 2",
        format: "Flagship Report",
        audience: "Executive, Safety, Compliance, Training, IT leaders",
        summary: "Introduces the DTOP operating model in full. Shows how signals differ from data and why coordinated response is the key to operational improvement.",
      },
      {
        title: "From Signal to Action",
        format: "Campaign Guide",
        audience: "Marketing, Sales, wider buying group",
        summary: "The Q2 campaign anchor. Maps the journey from identifying a signal to triggering the right response and coordinating action across teams.",
      },
      {
        title: "Closing the Gap Between Signal and Response",
        format: "Webinar",
        audience: "Safety, Operations, and Compliance leaders",
        summary: "Explores why most organisations lose value between detection and action, and how DTOP creates a practical bridge from awareness to coordinated follow-through.",
      },
      {
        title: "Signal-to-Action Gap Diagnostic",
        format: "Decision Asset",
        audience: "Operations and Safety leaders evaluating response capability",
        summary: "A structured assessment helping organisations measure the lag between identifying an issue and initiating a coordinated response.",
      },
      {
        title: "What Operational Performance Actually Means",
        format: "Education Brief",
        audience: "Buying group members entering the conversation in Q2",
        summary: "A refreshed primer for new stakeholders joining the evaluation. Reframes performance beyond activity metrics and connects to the DTOP model introduced this quarter.",
      },
      {
        title: "The DTOP Operating Model Explained",
        format: "Education Brief",
        audience: "Cross-functional stakeholders and project leads",
        summary: "A clear, visual explanation of Detect, Trigger, Orchestrate, Improve — how the four capabilities connect and why each stage depends on the others.",
      },
      {
        title: "How Signals Differ from Data",
        format: "Thought Leadership",
        audience: "Executive and IT leaders",
        summary: "Data tells you what is happening. Signals tell you what matters. This piece explains the distinction and why it changes the performance conversation.",
      },
      {
        title: "The Cost of Delayed Response",
        format: "Thought Leadership",
        audience: "Executive sponsors and Safety leaders",
        summary: "Explores how operational lag between signal and action creates compounding risk, reduced accountability, and weaker follow-through.",
      },
      {
        title: "Ownership is the Missing Link",
        format: "Thought Leadership",
        audience: "Operations and Compliance leaders",
        summary: "Argues that signals only create value when accountability is clear — when someone owns the response and the timeline is governed.",
      },
      {
        title: "Why Cross-Functional Triggers Outperform Escalation",
        format: "Thought Leadership",
        audience: "Safety and Operations leaders",
        summary: "Compares traditional escalation-based response with trigger-based orchestration. Shows how cross-functional triggers reduce lag and distribute accountability.",
      },
      {
        title: "The Signal Maturity Spectrum",
        format: "Thought Leadership",
        audience: "IT and Executive leaders",
        summary: "Maps signal capability from reactive data review to proactive, automated triggers. Helps organisations place themselves on the spectrum and identify next steps.",
      },
      {
        title: "When Good Data Leads to Bad Decisions",
        format: "Thought Leadership",
        audience: "Executive and Compliance leaders",
        summary: "Explores how organisations with strong data practices still make poor operational decisions — because data without signal context lacks prioritisation and urgency.",
      },
      {
        title: "DTOP Quick-Reference Card",
        format: "Practical Tool",
        audience: "Project leads and change managers",
        summary: "A single-page visual reference summarising the DTOP model, key definitions, and how each capability connects to operational outcomes.",
      },
      {
        title: "Signal Mapping Workshop Kit",
        format: "Practical Tool",
        audience: "Operations, Safety, and Compliance teams",
        summary: "A facilitation pack for running internal workshops to identify, classify, and prioritise operational signals across functions.",
      },
      {
        title: "Response Ownership Matrix Template",
        format: "Practical Tool",
        audience: "Operations and project leads",
        summary: "A downloadable template for mapping signals to owners, response timelines, and escalation paths — turning the DTOP model into practical governance.",
      },
      {
        title: "Q2 Email Nurture Sequence",
        format: "Nurture Content",
        audience: "Marketing-qualified leads across the buying group",
        summary: "A structured 6-touch email sequence building the Q2 narrative from signal awareness through DTOP understanding to coordinated action readiness.",
      },
      {
        title: "Q2 Social Content Pack",
        format: "Social Content",
        audience: "LinkedIn audience — executive and practitioner segments",
        summary: "A suite of social posts, carousels, and short-form content amplifying Q2 signal-to-action themes, designed for brand and employee advocacy channels.",
      },
      {
        title: "Q2 Sales Narrative Sheet",
        format: "Sales Enablement",
        audience: "Sales teams and account managers",
        summary: "Equips sales with the Q2 story: visibility alone does not improve performance — signals, triggers, and coordinated action do.",
      },
    ],
  },
  {
    id: "q3",
    label: "Q3",
    theme: "Make Readiness Continuous",
    subtitle: "Oct · Nov · Dec",
    icon: Target,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderAccent: "border-emerald-400/40",
    quarterMessage: "Readiness is not an event. It is a condition of performance.",
    narrative: "Readiness should not be treated as a periodic push or a completion exercise. It is an ongoing performance capability built when training, compliance, and operational change work together inside a connected model.",
    dtopRole: "Emphasises the back half of DTOP: stronger Orchestrate across functions, clearer Improve through role-based readiness, consistency, and confidence over time.",
    messageTerritory: [
      "Readiness goes beyond training completion",
      "Continuous readiness improves predictability and control",
      "Role-based alignment strengthens performance across teams",
    ],
    journeyStageNums: [5],
    assets: [
      {
        title: "Flying High Report: Chapter 3",
        format: "Flagship Report",
        audience: "Executive, Safety, Training, Compliance leaders",
        summary: "Focuses on continuous readiness as a performance capability. Shows how training, compliance, and operational change must work together inside a connected model.",
      },
      {
        title: "Make Readiness Continuous",
        format: "Campaign Guide",
        audience: "Marketing, Sales, wider buying group",
        summary: "The Q3 campaign anchor. Moves the conversation from episodic training events to continuous, role-based readiness as a measurable performance condition.",
      },
      {
        title: "Continuous Readiness in Practice",
        format: "Webinar",
        audience: "Training and Compliance leaders and their teams",
        summary: "Practical session showing how organisations move from periodic readiness pushes to continuous capability — with examples of what changes operationally.",
      },
      {
        title: "Readiness Scorecard",
        format: "Decision Asset",
        audience: "Training leaders and executive sponsors",
        summary: "A structured tool helping organisations measure readiness beyond completion rates — assessing role alignment, consistency, and confidence across teams.",
      },
      {
        title: "From Signals to Readiness: The DTOP Connection",
        format: "Education Brief",
        audience: "Buying group members joining the conversation in Q3",
        summary: "Bridges the Q2 signal-to-action narrative with Q3 readiness themes. Shows how continuous readiness depends on the detection and trigger capabilities built earlier.",
      },
      {
        title: "What Continuous Readiness Looks Like in Practice",
        format: "Education Brief",
        audience: "Training, Compliance, and Operations teams",
        summary: "A practical primer moving beyond theory. Illustrates the day-to-day differences between episodic and continuous readiness models with operational examples.",
      },
      {
        title: "From Completion to Competence",
        format: "Thought Leadership",
        audience: "Training and Safety leaders",
        summary: "Challenges the assumption that training completion equals readiness. Makes the case for competence-based measures tied to operational outcomes.",
      },
      {
        title: "Role-Based Readiness Explained",
        format: "Thought Leadership",
        audience: "Training and Compliance leaders",
        summary: "Explains why readiness must be role-specific, not generic — and how connected models make role-based alignment practical at scale.",
      },
      {
        title: "Why Predictability Depends on Readiness",
        format: "Thought Leadership",
        audience: "Executive and Operations leaders",
        summary: "Connects continuous readiness to operational predictability — showing how organisations that maintain readiness reduce lag and improve consistency.",
      },
      {
        title: "The Readiness Decay Problem",
        format: "Thought Leadership",
        audience: "Training and Safety leaders",
        summary: "Examines how readiness degrades between training events and why continuous reinforcement through connected systems prevents competence erosion.",
      },
      {
        title: "Readiness as a Leading Indicator",
        format: "Thought Leadership",
        audience: "Executive and Compliance leaders",
        summary: "Repositions readiness from a lagging compliance metric to a leading indicator of operational performance, safety culture, and organisational resilience.",
      },
      {
        title: "Why One-Size Training Fails High-Stakes Operations",
        format: "Thought Leadership",
        audience: "Training leaders and Operations managers",
        summary: "Makes the case that generic training programmes cannot deliver role-specific competence. Connects role-based alignment to measurable performance improvement.",
      },
      {
        title: "Readiness Self-Assessment Toolkit",
        format: "Practical Tool",
        audience: "Training leaders and project leads",
        summary: "A structured self-assessment helping organisations evaluate readiness maturity across role alignment, content currency, assessment rigour, and feedback loops.",
      },
      {
        title: "Continuous Readiness Implementation Checklist",
        format: "Practical Tool",
        audience: "Project leads and change managers",
        summary: "A step-by-step checklist for transitioning from periodic training cycles to a continuous readiness model, including governance, technology, and measurement requirements.",
      },
      {
        title: "Role-Based Content Mapping Template",
        format: "Practical Tool",
        audience: "Training and Content teams",
        summary: "A downloadable template for mapping content assets to specific roles, competencies, and readiness outcomes — ensuring training investment aligns with operational need.",
      },
      {
        title: "Q3 Email Nurture Sequence",
        format: "Nurture Content",
        audience: "Marketing-qualified leads across the buying group",
        summary: "A structured 6-touch email sequence building the Q3 narrative from readiness awareness through continuous capability to measurable competence outcomes.",
      },
      {
        title: "Q3 Social Content Pack",
        format: "Social Content",
        audience: "LinkedIn audience — executive and practitioner segments",
        summary: "A suite of social posts, carousels, and short-form content amplifying Q3 readiness themes, designed for brand and employee advocacy channels.",
      },
      {
        title: "Q3 Sales Narrative Sheet",
        format: "Sales Enablement",
        audience: "Sales teams and account managers",
        summary: "Equips sales with the Q3 story: readiness is not a training event — it is a continuous condition that drives predictable performance.",
      },
    ],
  },
  {
    id: "q4",
    label: "Q4",
    theme: "Prove Performance at Scale",
    subtitle: "Jan · Feb · Mar",
    icon: TrendingUp,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderAccent: "border-purple-400/40",
    quarterMessage: "Performance only scales when progress can be proved.",
    narrative: "Performance improvement only scales when organisations can prove progress, readiness, and control across teams and regions. Leaders need more than activity reporting — they need evidence that supports confident decisions.",
    dtopRole: "Completes the DTOP story by focusing on Improve as measurable, repeatable, and scalable. The operating model turns into evidence, confidence, and wider rollout potential.",
    messageTerritory: [
      "Proof matters more than reporting volume",
      "Standardisation strengthens confidence at scale",
      "Visibility, readiness, and evidence support investment and expansion",
    ],
    journeyStageNums: [6],
    assets: [
      {
        title: "Flying High Report: Chapter 4",
        format: "Flagship Report",
        audience: "Executive sponsors and buying group leaders",
        summary: "The concluding chapter. Focuses on proving performance at scale — turning the DTOP operating model into measurable evidence, confidence, and expansion potential.",
      },
      {
        title: "Prove Performance at Scale",
        format: "Campaign Guide",
        audience: "Marketing, Sales, wider buying group",
        summary: "The Q4 campaign anchor. Shows how organisations move from activity reporting to evidence-based proof that supports investment and wider rollout.",
      },
      {
        title: "How to Prove Progress Without More Reporting Burden",
        format: "Webinar",
        audience: "Executive, Compliance, and IT leaders",
        summary: "Explores how connected operating models generate proof as a by-product of coordinated action — rather than requiring additional reporting overhead.",
      },
      {
        title: "Operational Performance Business Case Pack",
        format: "Decision Asset",
        audience: "Executive sponsors, CFOs, and procurement leads",
        summary: "Structured materials for later-stage investment or expansion conversations. Includes evidence frameworks, ROI structures, and outcome mapping templates.",
      },
      {
        title: "The Full DTOP Journey: Foundation to Proof",
        format: "Education Brief",
        audience: "New buying group members and late-stage evaluators",
        summary: "A comprehensive recap of the full fiscal year narrative — from fragmented foundations through signals and readiness to scalable proof. Designed for stakeholders joining the conversation late.",
      },
      {
        title: "What Good Looks Like: Performance Evidence in Practice",
        format: "Education Brief",
        audience: "Executive sponsors and project leads",
        summary: "Illustrates what credible performance evidence looks like across safety, compliance, training, and operations — moving beyond dashboards to outcome-based proof.",
      },
      {
        title: "Evidence Over Activity",
        format: "Thought Leadership",
        audience: "Executive and Compliance leaders",
        summary: "Makes the case that reporting volume is not proof of progress. Evidence comes from connected action, measurable readiness, and traceable outcomes.",
      },
      {
        title: "Scaling With Confidence",
        format: "Thought Leadership",
        audience: "Executive and IT leaders",
        summary: "Explores how standardisation, visibility, and evidence create the conditions for confident expansion across teams, regions, and operating environments.",
      },
      {
        title: "The Performance Proof Gap",
        format: "Thought Leadership",
        audience: "Operations and Safety leaders",
        summary: "Identifies the gap between activity and evidence in most organisations — and shows how DTOP closes it through connected workflows and traceable outcomes.",
      },
      {
        title: "Why Boards Need Performance Evidence, Not Dashboards",
        format: "Thought Leadership",
        audience: "Executive sponsors and board-level stakeholders",
        summary: "Argues that leadership teams need traceable evidence of operational improvement — not more dashboards. Connects DTOP outcomes to board-level confidence and investment decisions.",
      },
      {
        title: "The ROI of Connected Operations",
        format: "Thought Leadership",
        audience: "CFOs, Executive sponsors, and procurement leads",
        summary: "Quantifies the return on investment from moving to a connected operating model — from reduced duplication and faster response to measurable readiness improvements.",
      },
      {
        title: "From Pilot to Programme: When to Scale",
        format: "Thought Leadership",
        audience: "Executive and Operations leaders",
        summary: "Provides a framework for evaluating when a pilot has generated sufficient evidence to justify wider rollout — and what conditions must be met for confident expansion.",
      },
      {
        title: "Performance Evidence Framework",
        format: "Practical Tool",
        audience: "Project leads and executive sponsors",
        summary: "A structured framework for defining, collecting, and presenting operational performance evidence — designed for internal business cases and board presentations.",
      },
      {
        title: "Expansion Readiness Checklist",
        format: "Practical Tool",
        audience: "Operations leaders and project leads",
        summary: "A diagnostic checklist helping organisations assess whether they have sufficient evidence, governance, and capability to scale from pilot to enterprise-wide deployment.",
      },
      {
        title: "ROI Calculation Template",
        format: "Practical Tool",
        audience: "CFOs, procurement leads, and project sponsors",
        summary: "A downloadable template for calculating and presenting the return on investment from connected operational performance — including efficiency, risk reduction, and readiness metrics.",
      },
      {
        title: "Q4 Email Nurture Sequence",
        format: "Nurture Content",
        audience: "Marketing-qualified leads across the buying group",
        summary: "A structured 6-touch email sequence building the Q4 narrative from evidence awareness through proof frameworks to investment and expansion readiness.",
      },
      {
        title: "Q4 Social Content Pack",
        format: "Social Content",
        audience: "LinkedIn audience — executive and practitioner segments",
        summary: "A suite of social posts, carousels, and short-form content amplifying Q4 proof-at-scale themes, designed for brand and employee advocacy channels.",
      },
      {
        title: "Q4 Sales Narrative Sheet",
        format: "Sales Enablement",
        audience: "Sales teams and account managers",
        summary: "Equips sales with the Q4 story: performance only scales when progress can be proved — and that requires evidence, not just more reporting.",
      },
    ],
  },
];

const SlideContentStrategy = ({
  isPlaying = false,
  isLoading = false,
  progress = 0,
  hasCompleted = false,
  onPlay,
  onPause,
  onNextSlide,
}: SlideNarrationProps) => {
  const [activeQuarter, setActiveQuarter] = useState(0);
  const q = quarters[activeQuarter];

  return (
    <SlideContainer
      id="slide-content-strategy"
      title="Quarterly Strategy"
      subtitle="Four chapters that build the case — from foundation to proof"
      slideNumber={3}
      isPlaying={isPlaying}
      isLoading={isLoading}
      progress={progress}
      hasCompleted={hasCompleted}
      onPlay={onPlay}
      onPause={onPause}
      onNextSlide={onNextSlide}
      className="!h-auto !min-h-screen !overflow-visible"
    >
      <div className="flex flex-col gap-4">
        {/* Quarter tabs */}
        <div className="flex gap-2">
          {quarters.map((quarter, i) => {
            const Icon = quarter.icon;
            return (
              <button
                key={quarter.id}
                onClick={() => setActiveQuarter(i)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                  activeQuarter === i
                    ? `${quarter.bgColor} ${quarter.borderAccent} scale-[1.02]`
                    : "bg-card/30 border-border/20 hover:border-border/50 hover:bg-card/50"
                )}
              >
                <Icon className={cn("w-5 h-5", activeQuarter === i ? quarter.color : "text-muted-foreground")} />
                <div className="text-sm font-bold text-foreground">{quarter.label}: {quarter.theme}</div>
                <div className="text-xs text-muted-foreground">{quarter.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Content Journey Stages — 6 stages strip */}
        <div className="grid grid-cols-6 gap-2">
          {journeyStages.map((stage) => {
            const StageIcon = stage.icon;
            const isActive = q.journeyStageNums.includes(stage.num);
            return (
              <div
                key={stage.num}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all",
                  isActive
                    ? `${stage.bg} border-transparent shadow-sm`
                    : "bg-card/20 border-border/20 opacity-40"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                  isActive ? "text-white" : "text-muted-foreground"
                )}>
                  {stage.num}
                </div>
                <p className={cn("text-xs leading-tight", isActive ? "text-white font-medium" : "text-muted-foreground")}>{stage.title}</p>
              </div>
            );
          })}
        </div>

        {/* Core message */}
        <div className={cn("rounded-xl px-6 py-4 border-2", q.bgColor, q.borderAccent)}>
          <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-1">Core Message</p>
          <p className="text-lg text-foreground font-bold">{q.quarterMessage}</p>
        </div>

        {/* Three-column: Narrative + DTOP Role + Message Territory — restyled with stronger separation */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-muted/50 border border-border rounded-xl px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full bg-primary" />
              <p className="text-xs text-foreground uppercase tracking-wider font-bold">Quarter Narrative</p>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{q.narrative}</p>
          </div>
          <div className="bg-muted/50 border border-border rounded-xl px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full bg-accent-foreground" />
              <p className="text-xs text-foreground uppercase tracking-wider font-bold">Role of DTOP</p>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{q.dtopRole}</p>
          </div>
          <div className="bg-muted/50 border border-border rounded-xl px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full bg-primary" />
              <p className="text-xs text-foreground uppercase tracking-wider font-bold">Message Territory</p>
            </div>
            <div className="space-y-2">
              {q.messageTerritory.map((msg) => (
                <div key={msg} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                  <p className="text-sm text-foreground/70 leading-snug">{msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Ideas — Pinterest-style masonry with distinct background */}
        <div className="bg-muted border border-border rounded-2xl p-6 -mx-2">
          <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-4">
            Content Ideas · {q.assets.length} assets
          </p>
          <div className="columns-3 gap-4 space-y-4">
            {q.assets.map((asset, i) => (
              <div
                key={asset.title}
                className={cn(
                  "break-inside-avoid rounded-xl border px-5 py-4",
                  i % 2 === 0
                    ? "bg-background border-border/60"
                    : "bg-card border-border/40"
                )}
              >
                <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">{asset.format}</p>
                <h4 className="text-sm font-bold text-foreground leading-snug">{asset.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 mb-2">{asset.audience}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">{asset.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideContentStrategy;
