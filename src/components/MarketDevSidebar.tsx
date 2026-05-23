import {
  Home, Compass, Microscope, Target, Package, Eye, FileText,
  Sparkles, Calendar, ClipboardList, Mic, LogIn, LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
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

type NavItem = { title: string; url: string; icon: React.ElementType; badge?: string };

const hubItems: NavItem[] = [
  { title: "Market Development Hub", url: "/market-development", icon: Compass },
];

const researchItems: NavItem[] = [
  { title: "Category Research Programme", url: "/category-research-programme", icon: Microscope },
  { title: "Strategy & Vision Session", url: "/strategy-vision-session", icon: Target },
];

const positioningItems: NavItem[] = [
  { title: "Positioning Playbook", url: "/positioning-playbook", icon: Eye },
  { title: "DTOP Packaging POV", url: "/dtop-packaging-pov", icon: Package },
];

const contentItems: NavItem[] = [
  { title: "Content Strategy", url: "/content-strategy", icon: FileText },
  { title: "AI Infographic", url: "/ai-infographic", icon: Sparkles },
  { title: "Keynote: Silos to Signals", url: "/keynote/silos-to-signals", icon: Mic, badge: "New" },
];

const eventItems: NavItem[] = [
  { title: "Signals → Control Event", url: "/events/from-signals-to-control", icon: Calendar },
  { title: "Event Brief", url: "/events/from-signals-to-control/brief", icon: ClipboardList },
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

export function MarketDevSidebar() {
  const { open } = useSidebar();
  const { user, profile, signOut } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-sidebar-foreground/40">
            Market Development
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Command Center">
                  <NavLink
                    to="/"
                    end
                    className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  >
                    <Home className="h-4 w-4" />
                    <span>Command Center</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />
        <NavGroup label="Hub" items={hubItems} />
        <SidebarSeparator />
        <NavGroup label="Research" items={researchItems} />
        <SidebarSeparator />
        <NavGroup label="Positioning" items={positioningItems} />
        <SidebarSeparator />
        <NavGroup label="Content & Thought Leadership" items={contentItems} />
        <SidebarSeparator />
        <NavGroup label="Events" items={eventItems} />

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