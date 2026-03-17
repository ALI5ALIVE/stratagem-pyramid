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
          <main className="flex-1 min-w-0 relative">
            <SidebarTrigger className="fixed top-2 z-50 bg-background/80 backdrop-blur-sm transition-[left] duration-200 left-[calc(var(--sidebar-width,3rem)+0.5rem)]" />
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </SlideNavigationProvider>
  );
}
