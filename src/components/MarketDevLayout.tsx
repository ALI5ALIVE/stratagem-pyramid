import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MarketDevSidebar } from "@/components/MarketDevSidebar";
import { SlideNavigationProvider } from "@/contexts/SlideNavigationContext";

export function MarketDevLayout() {
  return (
    <SlideNavigationProvider>
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen flex w-full">
          <MarketDevSidebar />
          <main className="flex-1 min-w-0">
            <SidebarTrigger className="fixed top-2 left-2 z-50 bg-background/80 backdrop-blur-sm" />
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </SlideNavigationProvider>
  );
}