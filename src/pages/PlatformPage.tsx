import MainNavigation from "@/components/MainNavigation";
import PlatformHero from "@/components/platform/PlatformHero";
import PlatformProblem from "@/components/platform/PlatformProblem";
import PlatformOperatingModel from "@/components/platform/PlatformOperatingModel";
import PlatformCapabilities from "@/components/platform/PlatformCapabilities";
import PlatformValueLadder from "@/components/platform/PlatformValueLadder";
import PlatformTransformation from "@/components/platform/PlatformTransformation";
import PlatformAIStory from "@/components/platform/PlatformAIStory";
import PlatformProofPoints from "@/components/platform/PlatformProofPoints";
import PlatformCTA from "@/components/platform/PlatformCTA";

const PlatformPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <PlatformHero />
      <PlatformProblem />
      <PlatformOperatingModel />
      <PlatformCapabilities />
      <PlatformValueLadder />
      <PlatformTransformation />
      <PlatformAIStory />
      <PlatformProofPoints />
      <PlatformCTA />
    </div>
  );
};

export default PlatformPage;
