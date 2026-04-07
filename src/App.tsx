import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import HomePage from "./pages/HomePage";
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
import OperationalPitch from "./pages/OperationalPitch";
import TechnicalDeepDive from "./pages/TechnicalDeepDive";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/strategy" element={<SlideDeck />} />
            
            <Route path="/value-deck" element={<ValueDeck />} />
            <Route path="/content-strategy" element={<ContentStrategyPage />} />
            <Route path="/coanalyst" element={<CoAnalystDeck />} />
            <Route path="/pitch-executive" element={<ExecutivePitch />} />
            <Route path="/pitch-executive-2" element={<ExecutivePitch2 />} />
            <Route path="/pitch-operational" element={<OperationalPitch />} />
            <Route path="/pitch-technical" element={<TechnicalDeepDive />} />
            
            <Route path="/homepage-mockup" element={<HomepageMockup />} />
            <Route path="/solutions/airlines" element={<AirlinesPage />} />
            <Route path="/solutions/defense" element={<DefensePage />} />
            <Route path="/solutions/rail" element={<RailPage />} />
            <Route path="/line-of-sight" element={<LineOfSightPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
