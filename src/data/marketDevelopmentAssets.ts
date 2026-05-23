import {
  FlaskConical,
  BookOpen, Package, Compass,
  Newspaper, Sparkles, CalendarDays, FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AssetStatus = "Live" | "Draft" | "In Research";

export interface MarketAsset {
  title: string;
  href: string;
  purpose: string;
  status: AssetStatus;
  icon: LucideIcon;
}

export interface MarketWorkstream {
  id: string;
  number: string;
  label: string;
  eyebrow: string;
  headline: string;
  intro: string;
  accent: "blue" | "amber" | "violet" | "emerald" | "rose";
  assets: MarketAsset[];
}

export const workstreams: MarketWorkstream[] = [
  {
    id: "research",
    number: "01",
    label: "Research & Evidence",
    eyebrow: "Outside-in proof",
    headline: "Evidence the category exists — before we name it.",
    intro:
      "Primary and secondary research that validates the operating-gap thesis, quantifies the cost of disconnection, and gives analysts and buyers a defensible benchmark.",
    accent: "blue",
    assets: [
      {
        title: "Category Research Programme",
        href: "/category-research-programme",
        purpose: "McKinsey-style mixed-methods study (survey n=300, 18–24 executive interviews, secondary synthesis) to validate category language and willingness-to-pay.",
        status: "In Research",
        icon: FlaskConical,
      },
    ],
  },
  {
    id: "positioning",
    number: "02",
    label: "Positioning & Category Design",
    eyebrow: "Category architecture",
    headline: "Name the new game and the rules to win it.",
    intro:
      "The canonical category narrative, the operating model that gives it shape, and the executive forum where we test it directly with buyers.",
    accent: "amber",
    assets: [
      {
        title: "Positioning & Messaging Playbook",
        href: "/positioning-playbook",
        purpose: "Single source of truth: category definition, master narrative, pillars × personas, competitive frame, brand rules.",
        status: "Live",
        icon: BookOpen,
      },
      {
        title: "DTOP Packaging POV",
        href: "/dtop-packaging-pov",
        purpose: "How we package the Detect–Trigger–Orchestrate–Prove operating model commercially and narratively.",
        status: "Live",
        icon: Package,
      },
      {
        title: "Strategy Vision Session",
        href: "/strategy-vision-session",
        purpose: "Three-hour executive whiteboard — outcome-led conversation that tests the category narrative with real operators.",
        status: "Live",
        icon: Compass,
      },
    ],
  },
  {
    id: "content",
    number: "04",
    label: "Content Strategy & Thought Leadership",
    eyebrow: "Demand creation",
    headline: "Editorial firepower behind the category.",
    intro:
      "The pillars, the flagship visual assets, and the live events that turn research and positioning into a market conversation.",
    accent: "emerald",
    assets: [
      {
        title: "Content Strategy",
        href: "/content-strategy",
        purpose: "Editorial plan, content pillars, and channel mix that ladder up to the category narrative.",
        status: "Live",
        icon: Newspaper,
      },
      {
        title: "AI Capabilities Infographic",
        href: "/ai-infographic",
        purpose: "Visual thought-leadership asset — how generative AI maps to operational decisions across the platform.",
        status: "Live",
        icon: Sparkles,
      },
      {
        title: "Event: From Signals to Control",
        href: "/events/from-signals-to-control",
        purpose: "Flagship customer event — the category narrative delivered live to operators and analysts.",
        status: "Live",
        icon: CalendarDays,
      },
      {
        title: "Event Brief",
        href: "/events/from-signals-to-control/brief",
        purpose: "Pre-read briefing pack: agenda, speakers, narrative arc and outcomes.",
        status: "Live",
        icon: FileText,
      },
    ],
  },
];

export const operatingRhythm = [
  { cadence: "Quarterly", item: "Research cut", detail: "Refresh survey + interview waves; publish methodology notes." },
  { cadence: "Monthly", item: "Narrative review", detail: "Pressure-test category claims against new field evidence." },
  { cadence: "Monthly", item: "Content council", detail: "Editorial plan, pillar progress, analyst coverage tracking." },
  { cadence: "Weekly", item: "Asset stand-up", detail: "Status across positioning, brand and event workstreams." },
];
