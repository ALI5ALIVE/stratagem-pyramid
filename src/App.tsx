import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SlideDeck from "./pages/SlideDeck";
import HomepageMockup from "./pages/HomepageMockup";
import PlatformPage from "./pages/PlatformPage";
import NotFound from "./pages/NotFound";
import AirlinesPage from "./pages/solutions/AirlinesPage";
import DefensePage from "./pages/solutions/DefensePage";
import RailPage from "./pages/solutions/RailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SlideDeck />} />
          <Route path="/homepage-mockup" element={<HomepageMockup />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/solutions/airlines" element={<AirlinesPage />} />
          <Route path="/solutions/defense" element={<DefensePage />} />
          <Route path="/solutions/rail" element={<RailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
