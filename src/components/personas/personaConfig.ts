import { Briefcase, ShieldAlert, BookOpen, GraduationCap, type LucideIcon } from "lucide-react";

export type PersonaId = "coo" | "safety" | "content" | "training";

export interface PersonaOutcome {
  metric: string;
  metricLabel: string;
  promise: string;
  pillar: string;
}

export interface Persona {
  id: PersonaId;
  role: string;
  shortRole: string;
  icon: LucideIcon;
  color: string; // tailwind text color
  bg: string;
  border: string;
  ringFrom: string; // gradient stop
  promise: string; // home card copy
  homeHook: string; // 1-line headline
  dtopFocus: "D" | "T" | "O" | "P";
  dtopFocusReason: string;
  outcomes: PersonaOutcome[];
}

export const PERSONAS: Persona[] = [
  {
    id: "coo",
    role: "Chief Operating Officer",
    shortRole: "COO",
    icon: Briefcase,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    ringFrom: "from-primary",
    homeHook: "Operational performance is finally measurable.",
    promise:
      "Connect content, safety and training into one performance system — with proof you can take to the board.",
    dtopFocus: "P",
    dtopFocusReason: "Prove — controllable cost, audit-ready evidence, line-of-sight to outcomes.",
    outcomes: [
      { pillar: "Controllable Cost", metric: "70%", metricLabel: "faster time-to-change", promise: "Less rework, fewer disruptions, lower cost-to-serve." },
      { pillar: "Systemic Risk", metric: "40%", metricLabel: "fewer recurrent issues", promise: "Weak signals surface early, before they hit revenue." },
      { pillar: "Line-of-Sight", metric: "1", metricLabel: "operating model across functions", promise: "One source of truth from frontline to boardroom." },
    ],
  },
  {
    id: "safety",
    role: "Head of Safety",
    shortRole: "Safety",
    icon: ShieldAlert,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    ringFrom: "from-emerald-400",
    homeHook: "From events to control.",
    promise:
      "Turn reports, observations and audits into prescriptive action with a closed-loop audit trail.",
    dtopFocus: "D",
    dtopFocusReason: "Detect — weak signals across operational data become triaged actions, not buried PDFs.",
    outcomes: [
      { pillar: "Recommended Actions", metric: "~90%", metricLabel: "domain accuracy at L4–5", promise: "CoAnalyst recommends the next safety action — grounded in your corpus." },
      { pillar: "Audit by Design", metric: "0", metricLabel: "audit-prep projects", promise: "Evidence is a byproduct of the work, not a quarterly scramble." },
      { pillar: "Closed Loop", metric: "100%", metricLabel: "events linked to action", promise: "No safety event ends without a documented response." },
    ],
  },
  {
    id: "content",
    role: "Head of Content / Tech Pubs",
    shortRole: "Content",
    icon: BookOpen,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    ringFrom: "from-amber-400",
    homeHook: "Manuals that act, not just read.",
    promise:
      "Operational content as living, queryable knowledge — every revision linked to training and safety impact.",
    dtopFocus: "T",
    dtopFocusReason: "Trigger — a manual change automatically triggers training, briefings and safety updates.",
    outcomes: [
      { pillar: "Time-to-Change", metric: "70%", metricLabel: "faster revision cycle", promise: "Author once, distribute everywhere it matters." },
      { pillar: "Living Knowledge", metric: "1", metricLabel: "queryable corpus", promise: "Content is structured, traceable and AI-ready by default." },
      { pillar: "Linked Impact", metric: "100%", metricLabel: "revisions with downstream actions", promise: "Every change connects to who must read, train and acknowledge." },
    ],
  },
  {
    id: "training",
    role: "Head of Training",
    shortRole: "Training",
    icon: GraduationCap,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/30",
    ringFrom: "from-violet-400",
    homeHook: "Competence wired to operational reality.",
    promise:
      "Move from records to readiness — training that responds to manual changes, safety signals and role context.",
    dtopFocus: "O",
    dtopFocusReason: "Orchestrate — the right learner gets the right module the moment a signal demands it.",
    outcomes: [
      { pillar: "Readiness", metric: "Real-time", metricLabel: "competency state", promise: "See who is ready for what, by role and by shift." },
      { pillar: "Triggered Learning", metric: "Auto", metricLabel: "from content & safety events", promise: "Training assigns itself when the operation changes." },
      { pillar: "Provable Competence", metric: "100%", metricLabel: "evidence-linked completions", promise: "Audit and regulator-ready competence trail." },
    ],
  },
];

export const getPersona = (id: string | null): Persona =>
  PERSONAS.find((p) => p.id === id) ?? PERSONAS[0];