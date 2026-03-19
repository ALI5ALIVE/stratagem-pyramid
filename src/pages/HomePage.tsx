import { Link } from "react-router-dom";
import { 
  Rocket, Briefcase, BookOpen, 
  Presentation, TrendingUp, Brain, FileText, 
  ArrowRight
} from "lucide-react";
import logo from "@/assets/comply365-logo-white.png";

interface DeckCard {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  accent: string;
}

const pitchDecks: DeckCard[] = [
  {
    title: "Executive Pitch",
    description: "C-suite strategic ROI narrative. Provocation to commitment in 5 minutes.",
    href: "/pitch-executive",
    icon: Rocket,
    badge: "8 slides",
    accent: "from-primary to-accent",
  },
  {
    title: "Operational Pitch",
    description: "VP Ops & Safety workflow depth. Daily pain to 90-day pilot.",
    href: "/pitch-operational",
    icon: Briefcase,
    badge: "12 slides",
    accent: "from-accent to-comply-teal",
  },
  {
    title: "Technical Deep-Dive",
    description: "IT & Innovation architecture detail. Intelligence tiers to 2026 roadmap.",
    href: "/pitch-technical",
    icon: BookOpen,
    badge: "20 slides",
    accent: "from-comply-teal to-primary",
  },
];

const strategyDecks: DeckCard[] = [
  {
    title: "Strategy Deck",
    description: "Master positioning narrative and category creation framework.",
    href: "/strategy",
    icon: Presentation,
    badge: "15 slides",
    accent: "from-primary to-accent",
  },
  {
    title: "Value Deck",
    description: "Value framework with interactive ROI calculator and KPI trees.",
    href: "/value-deck",
    icon: TrendingUp,
    accent: "from-accent to-comply-teal",
  },
  {
    title: "CoAnalyst Playbook",
    description: "AI product positioning, messaging architecture, and go-to-market.",
    href: "/coanalyst",
    icon: Brain,
    badge: "15 slides",
    accent: "from-comply-plum to-primary",
  },
  {
    title: "Content Strategy",
    description: "Channel architecture, content inventory, and sales enablement.",
    href: "/content-strategy",
    icon: FileText,
    accent: "from-comply-teal to-accent",
  },
];

const tools: DeckCard[] = [
  {
    title: "Line of Sight",
    description: "Interactive KPI calculator, scorecard, and performance shift curve.",
    href: "/line-of-sight",
    icon: Target,
    accent: "from-primary to-accent",
  },
  {
    title: "Homepage Mockup",
    description: "Website concept preview with platform ecosystem visualization.",
    href: "/homepage-mockup",
    icon: Globe,
    accent: "from-accent to-comply-teal",
  },
];

const solutions: DeckCard[] = [
  {
    title: "Airlines",
    description: "Aviation-specific operational performance use cases.",
    href: "/solutions/airlines",
    icon: Plane,
    accent: "from-primary to-accent",
  },
  {
    title: "Defense",
    description: "Defense & government compliance and readiness.",
    href: "/solutions/defense",
    icon: Shield,
    accent: "from-accent to-comply-teal",
  },
  {
    title: "Rail",
    description: "Rail safety and operational compliance.",
    href: "/solutions/rail",
    icon: Train,
    accent: "from-comply-teal to-primary",
  },
];

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-foreground tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function DeckCardComponent({ card }: { card: DeckCard }) {
  return (
    <Link
      to={card.href}
      className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
    >
      {/* Gradient top edge */}
      <div className={`absolute inset-x-0 top-0 h-[2px] rounded-t-xl bg-gradient-to-r ${card.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
          <card.icon className="h-5 w-5 text-primary" />
        </div>
        {card.badge && (
          <span className="text-[11px] font-medium text-muted-foreground bg-secondary rounded-full px-2.5 py-0.5">
            {card.badge}
          </span>
        )}
      </div>
      
      <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {card.title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">
        {card.description}
      </p>
      
      <div className="mt-4 flex items-center text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1">
        Open <ArrowRight className="ml-1 h-3 w-3" />
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Comply365" className="h-7" />
            <div className="h-5 w-px bg-border" />
            <span className="text-sm font-medium text-muted-foreground">Stratagem</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-4">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Command Centre
        </h1>
        <p className="text-muted-foreground mt-1 text-sm max-w-xl">
          Every deck, playbook, and tool — ready to present. Pick a deck and go.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16 space-y-12">
        {/* Pitch Decks */}
        <section>
          <SectionHeader 
            title="Customer Pitch Decks" 
            subtitle="Audience-tailored presentations for external delivery" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pitchDecks.map((card) => (
              <DeckCardComponent key={card.href} card={card} />
            ))}
          </div>
        </section>

        {/* Strategy */}
        <section>
          <SectionHeader 
            title="Strategy & Positioning" 
            subtitle="Internal playbooks and frameworks" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strategyDecks.map((card) => (
              <DeckCardComponent key={card.href} card={card} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
