import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SlideNavigationProvider } from "@/contexts/SlideNavigationContext";

export function AppLayout() {
  return (
    <SlideNavigationProvider>
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarTrigger className="fixed top-2 left-2 z-[60] bg-background/80 backdrop-blur-sm" />
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </SlideNavigationProvider>
  );
}
