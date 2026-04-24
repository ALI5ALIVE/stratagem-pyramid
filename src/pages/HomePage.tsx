import { Link } from "react-router-dom";
import { 
  Rocket, Briefcase, BookOpen, 
  Presentation, Brain, FileText, 
  ArrowRight, Users, ScrollText, Workflow, Layers, Sparkles, Zap, Smartphone, GraduationCap
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
    title: "Customer Overview",
    description: "Customer-facing · Sales-led. 10-slide narrative from today's reality to the first 90 days. No architecture, no acronyms.",
    href: "/customer-overview",
    icon: Presentation,
    badge: "10 slides · ~20 min",
    accent: "from-primary to-comply-teal",
  },
  {
    title: "Executive Pitch 3",
    description: "Executive narrative powered by the platform's strongest visuals — DTOP, 5-layer architecture, and intelligence depth.",
    href: "/pitch-executive-3",
    icon: Layers,
    badge: "20 slides",
    accent: "from-comply-teal to-accent",
  },
  {
    title: "Technical Deep Dive v4",
    description: "Compressed architecture · Data substrate folded into Intelligence. Same arc, simpler 4-layer story.",
    href: "/pitch-technical-v4",
    icon: BookOpen,
    badge: "4-layer model · ~30 slides",
    accent: "from-primary to-comply-teal",
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
    title: "Content Strategy",
    description: "Channel architecture, content inventory, and sales enablement.",
    href: "/content-strategy",
    icon: FileText,
    accent: "from-comply-teal to-accent",
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pitchDecks.map((card) => (
              <DeckCardComponent key={card.href} card={card} />
            ))}
          </div>
        </section>

        {/* Sales Enablement & Training */}
        <section>
          <SectionHeader 
            title="Sales Enablement & Training" 
            subtitle="Onboarding and ongoing training for the sales team" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DeckCardComponent card={{
              title: "Sales Enablement Training",
              description: "Plain-English walkthrough of the Operational Performance Platform — built to onboard a new rep in their first week.",
              href: "/sales-enablement",
              icon: GraduationCap,
              badge: "24 slides · ~35 min",
              accent: "from-emerald-500 to-primary",
            }} />
          </div>
        </section>

        {/* Tools */}
        <section>
          <SectionHeader 
            title="Capabilities" 
            subtitle="Per-capability playbooks for the Operational Performance Platform" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DeckCardComponent card={{
              title: "Platform Playbook",
              description: "Master positioning for the Operational Performance Platform — core apps, data foundation, intelligence layer, mobile, and DTOP.",
              href: "/platform-playbook",
              icon: Layers,
              badge: "13 slides",
              accent: "from-primary to-comply-teal",
            }} />
            <DeckCardComponent card={{
              title: "CoAnalyst Playbook",
              description: "AI product positioning, messaging architecture, and go-to-market.",
              href: "/coanalyst",
              icon: Brain,
              badge: "15 slides",
              accent: "from-comply-plum to-primary",
            }} />
            <DeckCardComponent card={{
              title: "Regulation Management",
              description: "Messaging & positioning playbook for the Regulation Management solution. Pain points, value pillars, objections, and commercial model.",
              href: "/regulation-management",
              icon: ScrollText,
              badge: "Playbook",
              accent: "from-primary to-comply-teal",
            }} />
            <DeckCardComponent card={{
              title: "DTOP Operating Model",
              description: "Sales enablement playbook for the DTOP operating model. Why, what, how, competitive positioning, and objection handling.",
              href: "/dtop-playbook",
              icon: Workflow,
              badge: "12 slides",
              accent: "from-blue-500 to-violet-500",
            }} />
            <DeckCardComponent card={{
              title: "Insights & Recommendations",
              description: "Positioning playbook for AI-driven insights and recommended actions across operational data.",
              href: "/insights-playbook",
              icon: Sparkles,
              badge: "11 slides",
              accent: "from-comply-teal to-primary",
            }} />
            <DeckCardComponent card={{
              title: "Automation",
              description: "Platform-wide automation playbook — Prismatic-powered orchestration across the operational stack.",
              href: "/automation-playbook",
              icon: Zap,
              badge: "11 slides",
              accent: "from-accent to-comply-plum",
            }} />
            <DeckCardComponent card={{
              title: "Unified Mobile App",
              description: "One trusted mobile entry point for the frontline — Content, Training and Safety in one shell.",
              href: "/mobile-playbook",
              icon: Smartphone,
              badge: "11 slides",
              accent: "from-accent to-comply-teal",
            }} />
          </div>
        </section>

        {/* Target Audience */}
        <section>
          <SectionHeader 
            title="Target Audience" 
            subtitle="Buyer personas, messaging and discovery questions" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DeckCardComponent card={{
              title: "Persona Deep-Dive",
              description: "Comprehensive buyer personas with messaging, objections, and discovery questions for every stakeholder.",
              href: "/personas",
              icon: Users,
              badge: "5 personas",
              accent: "from-violet-500 to-cyan-500",
            }} />
          </div>
        </section>

        {/* Strategy */}
        <section>
          <SectionHeader 
            title="Strategy & Positioning" 
            subtitle="Internal playbooks and frameworks" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {strategyDecks.map((card) => (
              <DeckCardComponent key={card.href} card={card} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
