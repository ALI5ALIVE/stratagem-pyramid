import TopNav from "@/components/home/TopNav";
import Hero from "@/components/home/Hero";
import CustomerTrustBar from "@/components/home/CustomerTrustBar";
import TheShift from "@/components/home/TheShift";
import PlatformPicture from "@/components/home/PlatformPicture";
import DTOPStrip from "@/components/home/DTOPStrip";
import ProductPillars from "@/components/home/ProductPillars";
import SolutionsByIndustry from "@/components/home/SolutionsByIndustry";
import CoAnalystSpotlight from "@/components/home/CoAnalystSpotlight";
import CustomerOutcomes from "@/components/home/CustomerOutcomes";
import WhyComply365 from "@/components/home/WhyComply365";
import SecurityTrust from "@/components/home/SecurityTrust";
import ResourcesStrip from "@/components/home/ResourcesStrip";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/home/Footer";

export default function OperationalPlatformHome() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <Hero />
      <CustomerTrustBar />
      <TheShift />
      <PlatformPicture />
      <DTOPStrip />
      <ProductPillars />
      <SolutionsByIndustry />
      <CoAnalystSpotlight />
      <CustomerOutcomes />
      <WhyComply365 />
      <SecurityTrust />
      <ResourcesStrip />
      <FinalCTA />
      <Footer />
    </div>
  );
}