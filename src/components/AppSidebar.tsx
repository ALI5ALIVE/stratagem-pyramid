import {
  Presentation, Brain,
  Rocket, BookOpen, Home, Users, ScrollText, Workflow, Sparkles, Zap, Smartphone, Layers, Radio,
  LogIn, LogOut, GraduationCap, Mic, FlaskConical
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
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
  { title: "Short — Customer Overview", url: "/customer-overview", icon: Presentation },
  { title: "Medium — Executive Pitch", url: "/pitch-executive-3", icon: Rocket },
];

const additionalResourceItems: NavItem[] = [
  { title: "CEO Overview", url: "/pitch-executive-2", icon: Rocket },
  { title: "Long — Technical Deep Dive", url: "/pitch-technical-v4", icon: BookOpen },
];

const salesEnablementItems: NavItem[] = [
  { title: "Sales Enablement Academy", url: "/academy", icon: GraduationCap },
  { title: "Sales Enablement Training", url: "/sales-enablement", icon: GraduationCap },
  { title: "Practice Center", url: "/practice-center", icon: Mic, badge: "New" },
];

const researchItems: NavItem[] = [
  { title: "Category Research Programme", url: "/category-research-programme", icon: FlaskConical, badge: "New" },
];

const capabilityItems: NavItem[] = [
  { title: "Platform Playbook", url: "/platform-playbook", icon: Layers, badge: "Master" },
  { title: "AI Capabilities Infographic", url: "/ai-infographic", icon: Sparkles, badge: "New" },
  { title: "Signals 101", url: "/signals-playbook", icon: Radio },
  { title: "Intelligence Layer Playbook", url: "/coanalyst", icon: Brain },
  { title: "Regulation Management", url: "/regulation-management", icon: ScrollText },
  { title: "DTOP Operating Model", url: "/dtop-playbook", icon: Workflow },
  { title: "Insights & Recommendations", url: "/insights-playbook", icon: Sparkles },
  { title: "Automation", url: "/automation-playbook", icon: Zap },
  { title: "Unified Mobile App", url: "/mobile-playbook", icon: Smartphone },
];

const targetAudienceItems: NavItem[] = [
  { title: "Personas", url: "/personas", icon: Users },
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
        <NavGroup label="Research & Category" items={researchItems} />
        <SidebarSeparator />
        <NavGroup label="Capabilities" items={capabilityItems} />
        <SidebarSeparator />
        <NavGroup label="Additional Resources" items={additionalResourceItems} />

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
      </SidebarContent>
    </Sidebar>
  );
}
