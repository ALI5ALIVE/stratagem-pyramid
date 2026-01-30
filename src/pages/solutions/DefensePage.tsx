import MainNavigation from "@/components/MainNavigation";
import IndustryHero from "@/components/solutions/IndustryHero";
import IndustryTrustBar from "@/components/solutions/IndustryTrustBar";
import IndustryChallenge from "@/components/solutions/IndustryChallenge";
import IndustryDTOP from "@/components/solutions/IndustryDTOP";
import IndustryPillars from "@/components/solutions/IndustryPillars";
import IndustryCapabilities from "@/components/solutions/IndustryCapabilities";
import IndustryCTA from "@/components/solutions/IndustryCTA";

const DefensePage = () => {
  const challenges = [
    {
      before: "Maintenance data disconnected from training systems",
      after: "Safety signals automatically drive qualification updates",
    },
    {
      before: "Manual airworthiness documentation and configuration control",
      after: "Automated configuration management across all platforms",
    },
    {
      before: "Disparate training systems across units and platforms",
      after: "Unified competency management for mission readiness",
    },
    {
      before: "Reactive maintenance schedules based on calendar",
      after: "Predictive readiness posture based on operational signals",
    },
  ];

  const dtopSteps = [
    {
      step: "Detect" as const,
      title: "Capture Mission-Critical Signals",
      description: "Identify maintenance events, safety incidents, and configuration changes.",
      example: "Aircraft maintenance event or safety incident captured",
    },
    {
      step: "Trigger" as const,
      title: "Initiate Qualification Action",
      description: "Automatically generate procedure updates and qualification requirements.",
      example: "Technical order update and technician requalification triggered",
    },
    {
      step: "Orchestrate" as const,
      title: "Execute Coordinated Change",
      description: "Deploy updates across technical orders, training, and qualifications.",
      example: "Procedure updates published, targeted training deployed",
    },
    {
      step: "Prove" as const,
      title: "Document Airworthiness",
      description: "Generate authority-ready compliance evidence and readiness posture.",
      example: "Airworthiness authority documentation complete",
    },
  ];

  const pillars = {
    safety: {
      title: "Safety Performance",
      metric: "Mission-critical",
      description: "Incident reduction through connected signal-to-action workflows.",
    },
    content: {
      title: "Content Performance",
      metric: "Configuration accuracy",
      description: "Technical order currency maintained through automated change management.",
    },
    training: {
      title: "Training Performance",
      metric: "Warfighter readiness",
      description: "Competency assurance through risk-targeted qualification management.",
    },
  };

  const capabilities = {
    connected: {
      title: "Connected Foundation",
      description: "Unified data model connecting maintenance, technical orders, and qualifications.",
    },
    continuous: {
      title: "Continuous Improvement",
      description: "Automated workflows that trigger coordinated change across all platforms.",
    },
    proof: {
      title: "Proof at Scale",
      description: "Continuous airworthiness evidence and authority-ready documentation.",
    },
    ai: {
      title: "AI Force Multiplier",
      description: "Intelligent automation that amplifies maintenance and training effectiveness.",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <IndustryHero
        industry="Defense"
        headline="The Operational Performance Platform"
        scopeLine="for Defense Safety, Content, and Training"
        subhead="Mission readiness demands connected systems. Unify maintenance signals, technical orders, and qualification management across platforms. Maintain continuous airworthiness, accelerate time-to-qualified, and deliver authority-ready compliance evidence."
      />
      
      <IndustryTrustBar
        industry="Defense"
        primaryStat="Trusted by military aviation"
        primaryLabel="across multiple allied nations"
        secondaryStat="100K+"
        secondaryLabel="qualified personnel"
      />
      
      <IndustryChallenge
        industry="Defense"
        headline="From Siloed Systems to Mission Readiness"
        subhead="Defense operations depend on maintenance, technical data, and training systems that don't talk to each other. The result: reduced readiness and compliance risk."
        challenges={challenges}
      />
      
      <IndustryDTOP
        industry="Defense"
        headline="The Continuous Improvement Operating Model"
        subhead="Detect → Trigger → Orchestrate → Prove. A closed-loop system that maintains mission readiness through connected operations."
        steps={dtopSteps}
      />
      
      <IndustryPillars
        industry="Defense"
        headline="What Operational Performance Means for Defense"
        subhead="Operational performance in defense is about maintaining mission readiness through connected safety, content, and training systems."
        pillars={pillars}
      />
      
      <IndustryCapabilities
        industry="Defense"
        headline="Platform Capabilities"
        subhead="Four interconnected capabilities that serve as a force multiplier for defense operations."
        capabilities={capabilities}
      />
      
      <IndustryCTA
        industry="Defense"
        headline="Ready to enhance mission readiness?"
        subhead="See how defense organizations are transforming operational performance."
      />
    </div>
  );
};

export default DefensePage;
