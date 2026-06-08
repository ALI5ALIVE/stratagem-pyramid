import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const DECK_PREFIXES: Array<[RegExp, string]> = [
  [/^\/academy/, "academy"],
  [/^\/admin/, "admin"],
  [/^\/pitch-executive-3/, "pitch-executive-3"],
  [/^\/pitch-executive-2/, "pitch-executive-2"],
  [/^\/pitch-executive/, "pitch-executive"],
  [/^\/pitch-operational/, "pitch-operational"],
  [/^\/pitch-technical-v4/, "pitch-technical-v4"],
  [/^\/pitch-technical/, "pitch-technical"],
  [/^\/coanalyst/, "coanalyst"],
  [/^\/dtop-playbook/, "dtop-playbook"],
  [/^\/insights-playbook/, "insights-playbook"],
  [/^\/automation-playbook/, "automation-playbook"],
  [/^\/mobile-playbook/, "mobile-playbook"],
  [/^\/platform-playbook/, "platform-playbook"],
  [/^\/signals-playbook/, "signals-playbook"],
  [/^\/regulation-management/, "regulation-management"],
  [/^\/sales-enablement/, "sales-enablement"],
  [/^\/practice-center/, "practice-center"],
  [/^\/roadmap/, "roadmap"],
  [/^\/line-of-sight/, "line-of-sight"],
  [/^\/solutions\/airlines/, "solutions-airlines"],
  [/^\/solutions\/defense/, "solutions-defense"],
  [/^\/solutions\/rail/, "solutions-rail"],
  [/^\/personas/, "personas"],
  [/^\/platform/, "platform"],
  [/^\/value-deck/, "value-deck"],
  [/^\/review/, "review"],
  [/^\/market-development/, "market-development"],
  [/^\/positioning-playbook/, "positioning-playbook"],
  [/^\/dtop-packaging-pov/, "dtop-packaging-pov"],
  [/^\/content-strategy/, "content-strategy"],
  [/^\/events\//, "events"],
  [/^\/keynote\//, "keynote"],
  [/^\/ai-naming-brief/, "ai-naming-brief"],
  [/^\/ai-infographic/, "ai-infographic"],
  [/^\/strategy/, "strategy"],
  [/^\/operational-platform/, "operational-platform"],
];

function deckIdFor(pathname: string): string | null {
  for (const [re, id] of DECK_PREFIXES) if (re.test(pathname)) return id;
  if (pathname === "/") return "home";
  return null;
}

function getSessionId(): string {
  try {
    const key = "pv_session_id";
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(key, id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

export function usePageViewTracker() {
  const { user } = useAuth();
  const location = useLocation();
  const lastRef = useRef<{ id: string; route: string; at: number } | null>(null);

  useEffect(() => {
    if (!user) return;
    const route = location.pathname;
    // Skip auth pages
    if (route === "/auth" || route === "/reset-password") return;

    // Close previous row with duration
    const prev = lastRef.current;
    if (prev) {
      const duration = Date.now() - prev.at;
      supabase.from("page_views").update({ duration_ms: duration }).eq("id", prev.id).then(() => {});
    }

    const sessionId = getSessionId();
    const deckId = deckIdFor(route);
    let cancelled = false;
    supabase
      .from("page_views")
      .insert({ user_id: user.id, route, deck_id: deckId, session_id: sessionId })
      .select("id")
      .single()
      .then(({ data }) => {
        if (cancelled || !data) return;
        lastRef.current = { id: data.id, route, at: Date.now() };
      });

    return () => { cancelled = true; };
  }, [location.pathname, user]);

  // Flush duration on unload
  useEffect(() => {
    const onUnload = () => {
      const prev = lastRef.current;
      if (!prev) return;
      const duration = Date.now() - prev.at;
      try {
        navigator.sendBeacon?.(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/page_views?id=eq.${prev.id}`,
          new Blob([JSON.stringify({ duration_ms: duration })], { type: "application/json" })
        );
      } catch { /* noop */ }
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);
}