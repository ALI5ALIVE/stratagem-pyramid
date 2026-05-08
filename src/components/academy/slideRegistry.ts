import SESlide0Title from "@/components/sales-enablement-slides/SESlide0Title";
import SERecapSlide from "@/components/sales-enablement-slides/SERecapSlide";
import SELayerTalkTrack from "@/components/sales-enablement-slides/SELayerTalkTrack";
import SEObjections from "@/components/sales-enablement-slides/SEObjections";
import SEClosingForReps from "@/components/sales-enablement-slides/SEClosingForReps";
import SEPlainEnglishShift from "@/components/sales-enablement-slides/SEPlainEnglishShift";
import SEDiscoveryToClose from "@/components/sales-enablement-slides/SEDiscoveryToClose";
import SEUseCaseCheatSheet from "@/components/sales-enablement-slides/SEUseCaseCheatSheet";

import TechSlide1StrategicShift from "@/components/tech-slides/TechSlide1StrategicShift";
import PFSlide9Value from "@/components/platform-slides/PFSlide9Value";
import TechV4PlatformOverview from "@/components/tech-slides/v4/TechV4PlatformOverview";
import TechV4Slide4aSafetyManager from "@/components/tech-slides/v4/TechV4Slide4aSafetyManager";
import TechV4Slide4bContentManager from "@/components/tech-slides/v4/TechV4Slide4bContentManager";
import TechV4Slide4cTrainingManager from "@/components/tech-slides/v4/TechV4Slide4cTrainingManager";
import TechV4Slide7CoAnalyst from "@/components/tech-slides/v4/TechV4Slide7CoAnalyst";
import TechV4SlideInsights from "@/components/tech-slides/v4/TechV4SlideInsights";
import TechV4SlideAutomation from "@/components/tech-slides/v4/TechV4SlideAutomation";
import TechV4SlideTiersVsAI from "@/components/tech-slides/v4/TechV4SlideTiersVsAI";
import TechV4SlideMobile from "@/components/tech-slides/v4/TechV4SlideMobile";
import TechV4Slide5DTOP from "@/components/tech-slides/v4/TechV4Slide5DTOP";
import TechSlideRegulationSummary from "@/components/tech-slides/TechSlideRegulationSummary";
import CustomerOutcomesSlide from "@/components/shared/CustomerOutcomesSlide";
import TechSlideWhyComply from "@/components/tech-slides/TechSlideWhyComply";

export const SLIDE_REGISTRY: Record<string, React.ComponentType<any>> = {
  "se-slide-0": SESlide0Title,
  "se-slide-shift": TechSlide1StrategicShift,
  "se-plain-english-shift": SEPlainEnglishShift,
  "se-slide-whatis": TechV4PlatformOverview,
  "se-slide-value": PFSlide9Value,
  "se-slide-recap-m2": SERecapSlide,
  "se-slide-4a": TechV4Slide4aSafetyManager,
  "se-slide-4b": TechV4Slide4bContentManager,
  "se-slide-4c": TechV4Slide4cTrainingManager,
  "se-slide-coanalyst": TechV4Slide7CoAnalyst,
  "se-slide-insights": TechV4SlideInsights,
  "se-slide-automation": TechV4SlideAutomation,
  "se-slide-tiers-vs-ai": TechV4SlideTiersVsAI,
  "se-slide-mobile": TechV4SlideMobile,
  "se-slide-dtop": TechV4Slide5DTOP,
  "se-slide-talktrack": SELayerTalkTrack,
  "se-discovery-to-close": SEDiscoveryToClose,
  "se-usecase-cheatsheet": SEUseCaseCheatSheet,
  "se-slide-regmgmt": TechSlideRegulationSummary,
  "se-slide-outcomes": CustomerOutcomesSlide,
  "se-slide-objections": SEObjections,
  "se-slide-why": TechSlideWhyComply,
  "se-slide-closing": SEClosingForReps,
};