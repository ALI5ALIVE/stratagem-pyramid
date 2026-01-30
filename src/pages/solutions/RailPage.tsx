import MainNavigation from "@/components/MainNavigation";
import IndustryHero from "@/components/solutions/IndustryHero";
import IndustryChallenge from "@/components/solutions/IndustryChallenge";
import IndustryDTOP from "@/components/solutions/IndustryDTOP";
import IndustryPillars from "@/components/solutions/IndustryPillars";
import IndustryCapabilities from "@/components/solutions/IndustryCapabilities";
import IndustryCTA from "@/components/solutions/IndustryCTA";

const RailPage = () => {
  const challenges = [
    {
      before: "Signal failures logged separately from operational procedures",
      after: "Safety events automatically trigger procedure reviews",
    },
    {
      before: "Manual driver competency tracking across routes",
      after: "Automated route competency management and verification",
    },
    {
      before: "Disparate safety reporting and training systems",
      after: "Unified operational governance across the network",
    },
    {
      before: "Reactive audit preparation before ORR/ERA inspections",
      after: "Continuous compliance evidence, always inspection-ready",
    },
  ];

  const dtopSteps = [
    {
      step: "Detect" as const,
      title: "Capture Safety Signals",
      description: "Identify SPADs, near-misses, maintenance events, and close calls.",
      example: "SPAD incident or near-miss report captured",
    },
    {
      step: "Trigger" as const,
      title: "Initiate Coordinated Action",
      description: "Automatically generate rule book updates and driver briefing requirements.",
      example: "Rule book update and driver competency check triggered",
    },
    {
      step: "Orchestrate" as const,
      title: "Execute Governed Change",
      description: "Deploy procedure updates and targeted training across the network.",
      example: "Rule changes published, driver briefings deployed",
    },
    {
      step: "Prove" as const,
      title: "Document Compliance",
      description: "Generate ORR/ERA-ready evidence of actions and effectiveness.",
      example: "Regulatory inspection documentation complete",
    },
  ];

  const pillars = {
    safety: {
      title: "Safety Performance",
      metric: "SPAD reduction",
      description: "Signal passed at danger incidents reduced through connected signal-to-action workflows.",
    },
    content: {
      title: "Content Performance",
      metric: "Rule book currency",
      description: "Change cycle time reduced with automated procedure management.",
    },
    training: {
      title: "Training Performance",
      metric: "Driver competency",
      description: "Route competency maintained through risk-targeted training deployment.",
    },
  };

  const capabilities = {
    connected: {
      title: "Connected Foundation",
      description: "Unified data model connecting safety, rule books, and driver competency.",
    },
    continuous: {
      title: "Continuous Improvement",
      description: "Automated workflows that trigger coordinated change across the network.",
    },
    proof: {
      title: "Proof at Scale",
      description: "Continuous compliance evidence and ORR/ERA-ready documentation.",
    },
    ai: {
      title: "AI Accelerator",
      description: "Intelligent automation that amplifies safety analysis and training effectiveness.",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <IndustryHero
        industry="Rail"
        headline="Operational Performance for Rail"
        subhead="A connected, intelligent, and predictive platform that turns signals into orchestrated change and measurable outcomes."
        badgeText="For Rail Operations"
      />
      
      <IndustryChallenge
        industry="Rail"
        headline="From Disconnected Systems to Network Reliability"
        subhead="Rail operations depend on safety, rule book, and competency systems that don't talk to each other. The result: delayed responses and compliance gaps."
        challenges={challenges}
      />
      
      <IndustryDTOP
        industry="Rail"
        headline="The Continuous Improvement Operating Model"
        subhead="Detect → Trigger → Orchestrate → Prove. A closed-loop system that maintains network reliability through connected operations."
        steps={dtopSteps}
      />
      
      <IndustryPillars
        industry="Rail"
        headline="What Operational Performance Means for Rail"
        subhead="Operational performance in rail is about maintaining passenger safety and network reliability through connected systems."
        pillars={pillars}
      />
      
      <IndustryCapabilities
        industry="Rail"
        headline="Platform Capabilities"
        subhead="Four interconnected capabilities that transform rail operations."
        capabilities={capabilities}
      />
      
      <IndustryCTA
        industry="Rail"
        headline="Ready to transform rail operational performance?"
        subhead="See how rail operators are closing the loop from signal to outcome."
      />
    </div>
  );
};

export default RailPage;
