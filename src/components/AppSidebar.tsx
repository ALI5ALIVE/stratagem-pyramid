import {
  Presentation, Target, FileText, Brain,
  Rocket, Briefcase, BookOpen, Home, Globe, Users, ScrollText, Workflow, Sparkles, Zap, Smartphone, Layers,
  MessageSquare, LogIn, LogOut, GraduationCap
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useSlideNavigation } from "@/contexts/SlideNavigationContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
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

type NavItem = {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: string;
};

const pitchItems: NavItem[] = [
  { title: "Customer Overview", url: "/customer-overview", icon: Presentation },
  { title: "Executive Pitch 3", url: "/pitch-executive-3", icon: Rocket },
  { title: "Technical Deep Dive v4", url: "/pitch-technical-v4", icon: BookOpen },
];

const salesEnablementItems: NavItem[] = [
  { title: "Sales Enablement Training", url: "/sales-enablement", icon: GraduationCap },
];

const capabilityItems: NavItem[] = [
  { title: "Platform Playbook", url: "/platform-playbook", icon: Layers, badge: "Master" },
  { title: "CoAnalyst", url: "/coanalyst", icon: Brain },
  { title: "Insights & Recs", url: "/insights-playbook", icon: Sparkles },
  { title: "Automation", url: "/automation-playbook", icon: Zap },
  { title: "Unified Mobile", url: "/mobile-playbook", icon: Smartphone },
  { title: "DTOP Operating Model", url: "/dtop-playbook", icon: Workflow },
  { title: "Regulation Mgmt", url: "/regulation-management", icon: ScrollText },
];

const targetAudienceItems: NavItem[] = [
  { title: "Personas", url: "/personas", icon: Users },
];

const strategyItems: NavItem[] = [
  { title: "Strategy Deck", url: "/strategy", icon: Presentation },
  { title: "Content Strategy", url: "/content-strategy", icon: FileText },
];

const referenceItems: NavItem[] = [
  { title: "Line of Sight", url: "/line-of-sight", icon: Target },
  { title: "Homepage Mockup", url: "/homepage-mockup", icon: Globe },
];

const collaborationItems: NavItem[] = [
  { title: "Reviews", url: "/review", icon: MessageSquare },
];

function NavGroup({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-sidebar-foreground/40">
        {label}
      </SidebarGroupLabel>
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
                  <span className="flex-1 truncate">{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto rounded-sm bg-primary/15 text-primary px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const { slides, activeIndex, onNavigate } = useSlideNavigation();
  const { open } = useSidebar();
  const { user, profile, signOut } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar">
        {/* Home */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home">
                  <NavLink
                    to="/"
                    end
                    className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />
        <NavGroup label="Target Audience" items={targetAudienceItems} />
        <SidebarSeparator />
        <NavGroup label="Pitch Decks" items={pitchItems} />
        <SidebarSeparator />
        <NavGroup label="Sales Enablement" items={salesEnablementItems} />
        <SidebarSeparator />
        <NavGroup label="Capabilities" items={capabilityItems} />
        <SidebarSeparator />
        <NavGroup label="Reference" items={referenceItems} />
        <SidebarSeparator />
        <NavGroup label="Strategy" items={strategyItems} />
        <SidebarSeparator />
        <NavGroup label="Collaboration" items={collaborationItems} />

        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {user ? (
                  <SidebarMenuButton onClick={() => signOut()} tooltip={profile?.display_name ?? "Sign out"}>
                    <span className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white shrink-0"
                      style={{ background: profile?.avatar_color ?? "#0066FF" }}>
                      {(profile?.display_name ?? "?").charAt(0).toUpperCase()}
                    </span>
                    {open && <span className="flex-1 truncate text-xs">{profile?.display_name ?? user.email}</span>}
                    <LogOut className="h-3.5 w-3.5 opacity-60" />
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild tooltip="Sign in">
                    <Link to="/auth" className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                      <LogIn className="h-4 w-4" />
                      <span>Sign in</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
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
