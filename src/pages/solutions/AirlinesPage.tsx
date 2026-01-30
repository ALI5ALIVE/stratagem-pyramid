import MainNavigation from "@/components/MainNavigation";
import IndustryHero from "@/components/solutions/IndustryHero";
import IndustryTrustBar from "@/components/solutions/IndustryTrustBar";
import IndustryChallenge from "@/components/solutions/IndustryChallenge";
import IndustryDTOP from "@/components/solutions/IndustryDTOP";
import IndustryPillars from "@/components/solutions/IndustryPillars";
import IndustryCapabilities from "@/components/solutions/IndustryCapabilities";
import IndustryCTA from "@/components/solutions/IndustryCTA";

const AirlinesPage = () => {
  const challenges = [
    {
      before: "FOQA data sits in isolation, disconnected from procedures",
      after: "Safety signals automatically trigger procedure updates",
    },
    {
      before: "Manual coordination between safety, content, and training teams",
      after: "Automated workflows across all operational domains",
    },
    {
      before: "Audit scrambles before FAA/EASA inspections",
      after: "Continuous proof of compliance, always audit-ready",
    },
    {
      before: "Reactive training schedules based on calendar, not risk",
      after: "Training targeted to actual operational risk signals",
    },
  ];

  const dtopSteps = [
    {
      step: "Detect" as const,
      title: "Capture Safety Signals",
      description: "Automatically identify events requiring action across your operation.",
      example: "FOQA exceedance, ASAP report, or audit finding captured",
    },
    {
      step: "Trigger" as const,
      title: "Initiate Coordinated Action",
      description: "Automatically generate review tasks and training requirements.",
      example: "Procedure review and crew training requirement triggered",
    },
    {
      step: "Orchestrate" as const,
      title: "Execute Governed Change",
      description: "Coordinate updates across manuals, training, and communications.",
      example: "Manual updates published, targeted crew briefings deployed",
    },
    {
      step: "Prove" as const,
      title: "Document Outcomes",
      description: "Generate audit-ready evidence of actions and effectiveness.",
      example: "FAA/EASA inspection-ready documentation complete",
    },
  ];

  const pillars = {
    safety: {
      title: "Safety Performance",
      metric: "50% faster",
      description: "Investigation closure time reduced through connected signal-to-action workflows.",
    },
    content: {
      title: "Content Performance",
      metric: "60% faster",
      description: "Regulatory change cycles accelerated with automated procedure management.",
    },
    training: {
      title: "Training Performance",
      metric: "94% readiness",
      description: "Workforce competency maintained through risk-targeted training deployment.",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <IndustryHero
        industry="Airlines"
        headline="The Operational Performance Platform"
        badgeText="For Commercial Aviation"
        scopeLine="for Safety, Content, and Training"
        subhead="From FOQA signal to crew action — automatically. Connect safety events, procedure updates, and targeted training into one governed system. Close investigations faster, eliminate audit scrambles, and prove continuous improvement to FAA and EASA."
      />
      
      <IndustryTrustBar
        industry="Airlines"
        primaryStat="Trusted by 50+ airlines"
        primaryLabel="including 7 of the top 10 in North America"
        secondaryStat="500K+"
        secondaryLabel="crew members"
      />
      
      <IndustryChallenge
        industry="Airlines"
        headline="From Fragmented Tools to Connected Operations"
        subhead="Airlines depend on safety, content, and training systems that don't talk to each other. The result: manual workarounds, delayed responses, and audit scrambles."
        challenges={challenges}
      />
      
      <IndustryDTOP
        industry="Airlines"
        headline="The Continuous Improvement Operating Model"
        subhead="Detect → Trigger → Orchestrate → Prove. A closed-loop system that turns every signal into measurable improvement."
        steps={dtopSteps}
      />
      
      <IndustryPillars
        industry="Airlines"
        headline="What Operational Performance Means for Airlines"
        subhead="Performance isn't just OTP or fuel burn. It's the speed and effectiveness of your safety, content, and training systems."
        pillars={pillars}
      />
      
      <IndustryCapabilities
        industry="Airlines"
        headline="Platform Capabilities"
        subhead="Four interconnected capabilities that transform airline operations."
      />
      
      <IndustryCTA
        industry="Airlines"
        headline="Ready to transform airline operational performance?"
        subhead="See how leading airlines are closing the loop from signal to outcome."
      />
    </div>
  );
};

export default AirlinesPage;
