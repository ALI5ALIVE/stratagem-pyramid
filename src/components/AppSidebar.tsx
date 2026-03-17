import { Presentation, Megaphone, Target, TrendingUp, FileText, Brain, Rocket, Briefcase, BookOpen } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const items = [
  { title: "Strategy Deck", url: "/", icon: Presentation },
  { title: "Sales Deck", url: "/sales-deck", icon: Megaphone },
  { title: "Value Deck", url: "/value-deck", icon: TrendingUp },
  { title: "Content Strategy", url: "/content-strategy", icon: FileText },
  { title: "CoAnalyst Playbook", url: "/coanalyst", icon: Brain },
  { title: "Executive Pitch", url: "/pitch-executive", icon: Rocket },
  { title: "Operational Pitch", url: "/pitch-operational", icon: Briefcase },
  { title: "Line of Sight", url: "/line-of-sight", icon: Target },
];

export function AppSidebar() {
  const { slides, activeIndex, onNavigate } = useSlideNavigation();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Slide sub-navigation - only when expanded and slides registered */}
        {open && slides.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-sidebar-foreground/40">
                Slides
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="flex flex-col gap-0.5 px-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => onNavigate(index)}
                      className={`flex items-center gap-2 px-2 py-1 rounded text-xs transition-colors ${
                        index === activeIndex
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          index === activeIndex ? "bg-primary" : "bg-sidebar-foreground/30"
                        }`}
                      />
                      <span className="truncate">{slide.label}</span>
                    </button>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
