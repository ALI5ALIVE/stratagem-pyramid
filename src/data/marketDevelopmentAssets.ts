import {
  FlaskConical, Calculator, Activity,
  BookOpen, Package, Compass,
  Radio, Brain, Users,
  Newspaper, Sparkles, CalendarDays, FileText,
  Globe, Building2, Plane, Shield, Train, Layers,
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
        purpose: "McKinsey-style mixed-methods study (survey n=300, 30–40 interviews, secondary synthesis) to validate category language and willingness-to-pay.",
        status: "In Research",
        icon: FlaskConical,
      },
      {
        title: "Line of Sight ROI Model",
        href: "/line-of-sight",
        purpose: "Interactive ROI calculator built on Eurocontrol, IATA and SITA cost models — quant proof of controllable operational cost.",
        status: "Live",
        icon: Calculator,
      },
      {
        title: "Maturity Curve Diagnostic",
        href: "/maturity-curve",
        purpose: "Five-stage operational maturity instrument used to benchmark prospects and anchor research segmentation.",
        status: "Live",
        icon: Activity,
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
    id: "messaging",
    number: "03",
    label: "Messaging & Narrative",
    eyebrow: "The story stack",
    headline: "One narrative, layered for every audience.",
    intro:
      "The core stories — Signals, Intelligence Layer, Personas — that translate the category into language for boards, operators and technical buyers.",
    accent: "violet",
    assets: [
      {
        title: "Signals 101",
        href: "/signals-playbook",
        purpose: "Foundational narrative: what a signal is, why ~65% never make it home, and how Comply365 closes the loop.",
        status: "Live",
        icon: Radio,
      },
      {
        title: "Intelligence Layer Playbook",
        href: "/coanalyst",
        purpose: "The 90% vs 35% accuracy story — domain intelligence as the bridge from event to control.",
        status: "Live",
        icon: Brain,
      },
      {
        title: "Personas Deep Dive",
        href: "/personas",
        purpose: "Five buyer/user personas with messaging, objections and discovery questions — the audience map for every asset.",
        status: "Live",
        icon: Users,
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
  {
    id: "brand",
    number: "05",
    label: "Brand & Category Homepages",
    eyebrow: "Public surfaces",
    headline: "Where the category meets the market.",
    intro:
      "The public-facing brand surfaces — flagship home, industry pages and exploratory mockups — that present the category to prospects, analysts and press.",
    accent: "rose",
    assets: [
      {
        title: "Comply365 Home",
        href: "/comply365-home",
        purpose: "Flagship brand home — the canonical public narrative for the Operational Performance Platform.",
        status: "Live",
        icon: Globe,
      },
      {
        title: "Operational Platform Home",
        href: "/operational-platform",
        purpose: "Product-led category home presenting the platform as the operating system for operational performance.",
        status: "Live",
        icon: Layers,
      },
      {
        title: "Platform Mockup",
        href: "/platform-mockup",
        purpose: "Exploratory brand surface used to test alternate framings of the platform story.",
        status: "Draft",
        icon: Building2,
      },
      {
        title: "Homepage Mockup",
        href: "/homepage-mockup",
        purpose: "Alternate homepage concept under evaluation alongside the flagship.",
        status: "Draft",
        icon: Building2,
      },
      {
        title: "Airlines",
        href: "/solutions/airlines",
        purpose: "Industry surface translating the category for aviation operations.",
        status: "Live",
        icon: Plane,
      },
      {
        title: "Defense",
        href: "/solutions/defense",
        purpose: "Industry surface translating the category for defense and mission-critical operations.",
        status: "Live",
        icon: Shield,
      },
      {
        title: "Rail",
        href: "/solutions/rail",
        purpose: "Industry surface translating the category for rail operators.",
        status: "Live",
        icon: Train,
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
