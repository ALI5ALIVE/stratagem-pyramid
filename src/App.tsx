import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AppLayout } from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import OperationalPlatformHome from "./pages/OperationalPlatformHome";
import SlideDeck from "./pages/SlideDeck";

import HomepageMockup from "./pages/HomepageMockup";
import NotFound from "./pages/NotFound";
import AirlinesPage from "./pages/solutions/AirlinesPage";
import DefensePage from "./pages/solutions/DefensePage";
import RailPage from "./pages/solutions/RailPage";
import LineOfSightPage from "./pages/LineOfSightPage";
import ValueDeck from "./pages/ValueDeck";
import ContentStrategyPage from "./pages/ContentStrategyPage";
import CoAnalystDeck from "./pages/CoAnalystDeck";
import ExecutivePitch from "./pages/ExecutivePitch";
import ExecutivePitch2 from "./pages/ExecutivePitch2";
import ExecutivePitch3 from "./pages/ExecutivePitch3";
import OperationalPitch from "./pages/OperationalPitch";
import TechnicalDeepDive from "./pages/TechnicalDeepDive";
import CoAnalystPreview from "./pages/CoAnalystPreview";
import PersonaDeepDive from "./pages/PersonaDeepDive";
import RegulationManagementPlaybook from "./pages/RegulationManagementPlaybook";
import DTOPPlaybook from "./pages/DTOPPlaybook";
import InsightsPlaybook from "./pages/InsightsPlaybook";
import AutomationPlaybook from "./pages/AutomationPlaybook";
import MobilePlaybook from "./pages/MobilePlaybook";
import PlatformPlaybook from "./pages/PlatformPlaybook";
import SignalsPlaybook from "./pages/SignalsPlaybook";
import SalesEnablement from "./pages/SalesEnablement";
import RoadmapDeck from "./pages/RoadmapDeck";
import AuthPage from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import ReviewDashboard from "./pages/ReviewDashboard";
import CustomerOverview from "./pages/CustomerOverview";
import PlatformOverview from "./pages/PlatformOverview";
import Comply365Home from "./pages/Comply365Home";
import Comply365MockupHome from "./pages/Comply365MockupHome";
import SignalsEvent from "./pages/events/SignalsEvent";
import SignalsEventBrief from "./pages/events/SignalsEventBrief";
import PasswordGate from "./components/shared/PasswordGate";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/academy/RequireAuth";
import AcademyHome from "./pages/academy/AcademyHome";
import ModuleLesson from "./pages/academy/ModuleLesson";
import ModuleQuiz from "./pages/academy/ModuleQuiz";
import QuizResult from "./pages/academy/QuizResult";
import Certificate from "./pages/academy/Certificate";
import AdminDashboard from "./pages/academy/AdminDashboard";

const TechnicalDeepDiveV4 = lazy(() => import("./pages/TechnicalDeepDiveV4"));
const PracticeCenter = lazy(() => import("./pages/PracticeCenter"));
const AdminKnowledgeBase = lazy(() => import("./pages/AdminKnowledgeBase"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background text-foreground" />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/operational-platform" element={<OperationalPlatformHome />} />
            <Route path="/strategy" element={<SlideDeck />} />
            
            <Route path="/value-deck" element={<ValueDeck />} />
            <Route path="/content-strategy" element={<ContentStrategyPage />} />
            <Route path="/coanalyst" element={<CoAnalystDeck />} />
            <Route path="/pitch-executive" element={<ExecutivePitch />} />
            <Route path="/pitch-executive-2" element={<ExecutivePitch2 />} />
            <Route path="/pitch-executive-3" element={<ExecutivePitch3 />} />
            <Route path="/pitch-operational" element={<OperationalPitch />} />
            <Route path="/pitch-technical" element={<TechnicalDeepDive />} />
            <Route path="/pitch-technical-v4" element={<Suspense fallback={<PageLoader />}><TechnicalDeepDiveV4 /></Suspense>} />
            <Route path="/coanalyst-preview" element={<CoAnalystPreview />} />
            
            <Route path="/homepage-mockup" element={<HomepageMockup />} />
            <Route path="/solutions/airlines" element={<AirlinesPage />} />
            <Route path="/solutions/defense" element={<DefensePage />} />
            <Route path="/solutions/rail" element={<RailPage />} />
            <Route path="/line-of-sight" element={<LineOfSightPage />} />
            <Route path="/personas" element={<PersonaDeepDive />} />
            <Route path="/regulation-management" element={<RegulationManagementPlaybook />} />
            <Route path="/dtop-playbook" element={<DTOPPlaybook />} />
            <Route path="/insights-playbook" element={<InsightsPlaybook />} />
            <Route path="/automation-playbook" element={<AutomationPlaybook />} />
            <Route path="/mobile-playbook" element={<MobilePlaybook />} />
            <Route path="/platform-playbook" element={<PlatformPlaybook />} />
            <Route path="/signals-playbook" element={<SignalsPlaybook />} />
            <Route path="/sales-enablement" element={<SalesEnablement />} />
            <Route path="/practice-center" element={<RequireAuth><Suspense fallback={<PageLoader />}><PracticeCenter /></Suspense></RequireAuth>} />
            <Route path="/admin/knowledge-base" element={<RequireAuth><Suspense fallback={<PageLoader />}><AdminKnowledgeBase /></Suspense></RequireAuth>} />
            <Route path="/roadmap" element={<RoadmapDeck />} />
            <Route path="/review" element={<ReviewDashboard />} />
            <Route path="/customer-overview" element={<CustomerOverview />} />
            <Route path="/platform" element={<PasswordGate><PlatformOverview /></PasswordGate>} />
            <Route path="/comply365-home" element={<PasswordGate><Comply365Home /></PasswordGate>} />
            <Route path="/comply365-mockup" element={<Comply365MockupHome />} />
            <Route path="/events/from-signals-to-control" element={<SignalsEvent />} />
            <Route path="/events/from-signals-to-control/brief" element={<SignalsEventBrief />} />
            <Route path="/academy" element={<RequireAuth><AcademyHome /></RequireAuth>} />
            <Route path="/academy/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
            <Route path="/academy/certificate" element={<RequireAuth><Certificate /></RequireAuth>} />
            <Route path="/academy/certificate/:specialty" element={<RequireAuth><Certificate /></RequireAuth>} />
            <Route path="/academy/:moduleId" element={<RequireAuth><ModuleLesson /></RequireAuth>} />
            <Route path="/academy/:moduleId/quiz" element={<RequireAuth><ModuleQuiz /></RequireAuth>} />
            <Route path="/academy/:moduleId/result" element={<RequireAuth><QuizResult /></RequireAuth>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
