import { Link } from "react-router-dom";
import {
  useAcademy,
  isModuleUnlocked,
  getCoreModules,
  getSpecialistModules,
  hasCoreCert,
  hasMasterCert,
  type AcademyModule,
  type ProgressRow,
} from "@/hooks/useAcademyProgress";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Lock, PlayCircle, Award, ShieldCheck, ArrowRight, Clock, BookOpen, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ACCENT_BADGE: Record<string, string> = {
  violet: "border-violet-500/40 bg-violet-500/10 text-violet-300",
  emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  blue: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  rose: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  sky: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  primary: "border-primary/40 bg-primary/10 text-primary",
};

function badgeClass(accent?: string) {
  return ACCENT_BADGE[accent ?? "primary"] ?? ACCENT_BADGE.primary;
}

function ModuleCard({
  m,
  p,
  unlocked,
  variant,
}: {
  m: AcademyModule;
  p: ProgressRow | undefined;
  unlocked: boolean;
  variant: "core" | "specialist";
}) {
  const passed = !!p?.passed;
  const inProgress = !!p && !p.passed;
  return (
    <Card className={`p-5 ${!unlocked ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${badgeClass(m.accent_color)}`}>
            {variant === "core"
              ? `Week ${m.week_number ?? m.module_number} · ${m.kicker ?? ""}`
              : `${m.kicker ?? "Playbook"} · Specialist`}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />~{m.estimated_minutes} min
          </span>
        </div>
        {passed ? (
          <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-medium whitespace-nowrap">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {p?.best_score}%
          </span>
        ) : !unlocked ? (
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3" />Locked
          </span>
        ) : inProgress ? (
          <span className="text-[11px] text-amber-500 font-medium">Best {p?.best_score}%</span>
        ) : (
          <span className="text-[11px] text-muted-foreground">Not started</span>
        )}
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1.5 leading-snug">{m.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">{m.learning_goal}</p>
      <div className="flex gap-2 flex-wrap">
        <Button asChild size="sm" variant={passed ? "outline" : "default"} disabled={!unlocked}>
          <Link to={unlocked ? `/academy/${m.id}` : "#"}>
            <PlayCircle className="h-4 w-4 mr-1.5" />
            {passed ? "Re-watch" : "Start lesson"}
          </Link>
        </Button>
        {unlocked && (
          <Button asChild size="sm" variant="ghost">
            <Link to={`/academy/${m.id}/quiz`}>
              Take quiz <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        )}
        {passed && variant === "specialist" && m.specialty && (
          <Button asChild size="sm" variant="ghost">
            <Link to={`/academy/certificate/${m.specialty}`}>
              <Award className="h-3.5 w-3.5 mr-1" />Cert
            </Link>
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function AcademyHome() {
  const { user, profile } = useAuth();
  const { modules, progress, loading } = useAcademy();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "owner")
      .then(({ data }) => setIsOwner((data ?? []).length > 0));
  }, [user]);

  const coreModules = getCoreModules(modules);
  const specialistModules = getSpecialistModules(modules);
  const corePassed = coreModules.filter((m) => progress[m.id]?.passed).length;
  const specialistPassed = specialistModules.filter((m) => progress[m.id]?.passed).length;
  const totalPassed = corePassed + specialistPassed;
  const totalModules = coreModules.length + specialistModules.length;
  const coreDone = hasCoreCert(modules, progress);
  const masterDone = hasMasterCert(modules, progress);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-primary font-mono mb-1">Academy</div>
            <h1 className="text-2xl font-bold tracking-tight">Sales Enablement Academy</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Core curriculum (3 weeks) plus 7 Specialist Playbooks. Pass each quiz to earn a certificate; complete everything to earn the Master Certification.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isOwner && (
              <Button asChild variant="outline" size="sm">
                <Link to="/academy/admin"><ShieldCheck className="h-4 w-4 mr-1.5" />Admin</Link>
              </Button>
            )}
            <Button asChild size="sm" variant={masterDone ? "default" : "outline"}>
              <Link to="/academy/certificate"><Award className="h-4 w-4 mr-1.5" />My certificates</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Hello {profile?.display_name ?? "there"} —
          </div>
          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${totalModules ? (totalPassed / totalModules) * 100 : 0}%` }}
            />
          </div>
          <div className="text-sm font-medium text-foreground">
            {totalPassed} / {totalModules} modules passed
          </div>
        </div>

        {loading ? (
          <div className="text-sm text-muted-foreground">Loading modules…</div>
        ) : (
          <>
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Core curriculum</h2>
                <span className="text-[11px] text-muted-foreground">· 3 weeks · linear</span>
                {coreDone && (
                  <Link to="/academy/certificate/core" className="ml-auto text-[11px] text-primary hover:underline flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" />Core certificate earned
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coreModules.map((m) => (
                  <ModuleCard
                    key={m.id}
                    m={m}
                    p={progress[m.id]}
                    unlocked={isModuleUnlocked(m, modules, progress)}
                    variant="core"
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Specialist playbooks</h2>
                <span className="text-[11px] text-muted-foreground">· open in any order</span>
              </div>

              <Card className={`p-4 mb-4 ${masterDone ? "border-amber-500/50 bg-amber-500/5" : ""}`}>
                <div className="flex items-center gap-4">
                  <Award className={`h-8 w-8 ${masterDone ? "text-amber-400" : "text-muted-foreground"}`} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground">
                      Master Sales Enablement Certification
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {masterDone
                        ? "Awarded — every core week and every specialist playbook passed."
                        : `Pass all 3 core weeks and all ${specialistModules.length} specialist playbooks to earn the Master Certification.`}
                    </div>
                  </div>
                  {masterDone ? (
                    <Button asChild size="sm">
                      <Link to="/academy/certificate/master"><Award className="h-4 w-4 mr-1.5" />View Master Cert</Link>
                    </Button>
                  ) : (
                    <div className="text-[11px] font-mono text-muted-foreground">
                      {totalPassed} / {totalModules}
                    </div>
                  )}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specialistModules.map((m) => (
                  <ModuleCard
                    key={m.id}
                    m={m}
                    p={progress[m.id]}
                    unlocked={isModuleUnlocked(m, modules, progress)}
                    variant="specialist"
                  />
                ))}
              </div>
            </section>
          </>
        )}

        <div className="mt-8 text-[11px] text-muted-foreground">
          Need the full deck? <Link to="/sales-enablement" className="text-primary hover:underline">Open the full Sales Enablement presentation →</Link>
        </div>
      </div>
    </div>
  );
}
