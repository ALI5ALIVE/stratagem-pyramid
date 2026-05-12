import { Link, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  useAcademy,
  getCoreModules,
  getSpecialistModules,
  hasCoreCert,
  hasMasterCert,
  type AcademyModule,
  type ProgressRow,
} from "@/hooks/useAcademyProgress";
import { Award, Printer, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ACCENT_BORDER: Record<string, string> = {
  violet: "border-violet-500/40",
  emerald: "border-emerald-500/40",
  amber: "border-amber-500/40",
  blue: "border-blue-500/40",
  rose: "border-rose-500/40",
  sky: "border-sky-500/40",
  primary: "border-primary/40",
};

function CertificateFrame({
  title,
  subtitle,
  recipient,
  body,
  accent = "primary",
  detailGrid,
  master = false,
}: {
  title: string;
  subtitle: string;
  recipient: string;
  body: string;
  accent?: string;
  detailGrid?: React.ReactNode;
  master?: boolean;
}) {
  const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const border = master ? "border-amber-400/60" : ACCENT_BORDER[accent] ?? ACCENT_BORDER.primary;
  return (
    <div className="min-h-screen bg-background py-10 px-6 print:p-0">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between mb-4 print:hidden">
          <Button asChild variant="ghost" size="sm"><Link to="/academy/certificate"><ArrowLeft className="h-4 w-4 mr-1" />Certificates</Link></Button>
          <Button onClick={() => window.print()} size="sm"><Printer className="h-4 w-4 mr-1" />Print</Button>
        </div>
        <div className={`border-4 ${border} rounded-2xl p-12 bg-card text-center ${master ? "shadow-[0_0_60px_-10px_rgba(251,191,36,0.25)]" : ""}`}>
          <Award className={`h-12 w-12 mx-auto mb-4 ${master ? "text-amber-400" : "text-primary"}`} />
          <div className={`text-[11px] uppercase font-mono tracking-widest mb-2 ${master ? "text-amber-400" : "text-primary"}`}>
            {title}
          </div>
          <div className="text-sm text-muted-foreground mb-6">{subtitle}</div>
          <div className="text-3xl font-bold text-foreground mb-2">{recipient}</div>
          <div className="text-sm text-muted-foreground mb-8 max-w-xl mx-auto">{body}</div>
          {detailGrid}
          <div className="text-xs text-muted-foreground mt-6">{date}</div>
        </div>
      </div>
    </div>
  );
}

function CertificateIndex() {
  const { modules, progress } = useAcademy();
  const core = getCoreModules(modules);
  const specialists = getSpecialistModules(modules);
  const coreDone = hasCoreCert(modules, progress);
  const masterDone = hasMasterCert(modules, progress);

  const earnedSpecialists = specialists.filter((m) => progress[m.id]?.passed);

  return (
    <div className="min-h-screen bg-background py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button asChild variant="ghost" size="sm"><Link to="/academy"><ArrowLeft className="h-4 w-4 mr-1" />Academy</Link></Button>
            <h1 className="text-2xl font-bold mt-2">My Certificates</h1>
            <p className="text-sm text-muted-foreground">Earned and pending certifications.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Master cert */}
          <Card className={`p-5 ${masterDone ? "border-amber-500/50 bg-amber-500/5" : "opacity-70"}`}>
            <div className="flex items-start gap-3 mb-3">
              <Award className={`h-8 w-8 ${masterDone ? "text-amber-400" : "text-muted-foreground"}`} />
              <div>
                <div className="text-base font-semibold">Master Certification</div>
                <div className="text-[11px] text-muted-foreground">All 3 core weeks + all 7 playbooks</div>
              </div>
            </div>
            {masterDone ? (
              <Button asChild size="sm"><Link to="/academy/certificate/master">View certificate</Link></Button>
            ) : (
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground"><Lock className="h-3 w-3" /> Pass every module</div>
            )}
          </Card>

          {/* Core cert */}
          <Card className={`p-5 ${coreDone ? "" : "opacity-70"}`}>
            <div className="flex items-start gap-3 mb-3">
              <Award className={`h-8 w-8 ${coreDone ? "text-primary" : "text-muted-foreground"}`} />
              <div>
                <div className="text-base font-semibold">Core Sales Enablement</div>
                <div className="text-[11px] text-muted-foreground">Weeks 1, 2 and 3 of the core curriculum</div>
              </div>
            </div>
            {coreDone ? (
              <Button asChild size="sm" variant="outline"><Link to="/academy/certificate/core">View certificate</Link></Button>
            ) : (
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground"><Lock className="h-3 w-3" /> Pass all 3 core weeks</div>
            )}
          </Card>

          {/* Specialist certs */}
          {specialists.map((m) => {
            const earned = !!progress[m.id]?.passed;
            return (
              <Card key={m.id} className={`p-5 ${earned ? "" : "opacity-70"}`}>
                <div className="flex items-start gap-3 mb-3">
                  <Award className={`h-7 w-7 ${earned ? "text-primary" : "text-muted-foreground"}`} />
                  <div>
                    <div className="text-sm font-semibold">{m.title}</div>
                    <div className="text-[11px] text-muted-foreground">Specialist · {m.kicker ?? "Playbook"}</div>
                  </div>
                </div>
                {earned ? (
                  <Button asChild size="sm" variant="outline"><Link to={`/academy/certificate/${m.specialty}`}>View certificate</Link></Button>
                ) : (
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground"><Lock className="h-3 w-3" /> Pass the {m.kicker?.toLowerCase() ?? "playbook"} quiz</div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-6 text-[11px] text-muted-foreground">
          Earned {earnedSpecialists.length} of {specialists.length} specialist certificates · Core: {coreDone ? "earned" : "in progress"} · Master: {masterDone ? "earned" : "in progress"}
        </div>
      </div>
    </div>
  );
}

function MasterCertificate({ name }: { name: string }) {
  const { modules, progress } = useAcademy();
  if (!hasMasterCert(modules, progress)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
        <Lock className="h-6 w-6" />
        Master Certification unlocks once every module is passed.
        <Button asChild variant="outline" size="sm"><Link to="/academy/certificate">Back to certificates</Link></Button>
      </div>
    );
  }
  const tracks = modules.sort((a, b) => a.order_index - b.order_index);
  return (
    <CertificateFrame
      master
      title="Master Certification"
      subtitle="Comply365 Sales Enablement Academy"
      recipient={name}
      body="has successfully completed the entire Sales Enablement Academy — every core week and every specialist playbook — and demonstrated mastery of the Operational Performance Platform and the DTOP operating model."
      detailGrid={
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-2xl mx-auto">
          {tracks.map((m) => (
            <div key={m.id} className="text-[11px] p-2 rounded border border-border">
              <div className="font-mono uppercase text-amber-400 text-[10px]">
                {m.track === "specialist" ? (m.kicker ?? "Playbook") : `Week ${m.week_number ?? m.module_number}`}
              </div>
              <div className="text-foreground truncate">{progress[m.id]?.best_score}%</div>
            </div>
          ))}
        </div>
      }
    />
  );
}

function CoreCertificate({ name }: { name: string }) {
  const { modules, progress } = useAcademy();
  const core = getCoreModules(modules);
  if (!hasCoreCert(modules, progress)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
        <Lock className="h-6 w-6" />
        Complete all 3 core weeks to earn this certificate.
        <Button asChild variant="outline" size="sm"><Link to="/academy/certificate">Back to certificates</Link></Button>
      </div>
    );
  }
  return (
    <CertificateFrame
      title="Sales Enablement Certificate"
      subtitle="Comply365 Sales Enablement Academy · Core curriculum"
      recipient={name}
      body="has successfully completed the three core weeks — Foundation, Capabilities, and Sell & Win — of the Sales Enablement Academy."
      detailGrid={
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          {core.map((m) => (
            <div key={m.id} className="text-[11px] p-2 rounded border border-border">
              <div className="font-mono uppercase text-primary text-[10px]">Wk {m.week_number ?? m.module_number}{m.kicker ? ` · ${m.kicker}` : ''}</div>
              <div className="text-foreground">{progress[m.id]?.best_score}%</div>
            </div>
          ))}
        </div>
      }
    />
  );
}

function SpecialistCertificate({ name, specialty }: { name: string; specialty: string }) {
  const { modules, progress } = useAcademy();
  const m = modules.find((x) => x.specialty === specialty) as AcademyModule | undefined;
  if (!m) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Unknown specialty. <Link to="/academy/certificate" className="text-primary ml-2">Back</Link>
      </div>
    );
  }
  const p: ProgressRow | undefined = progress[m.id];
  if (!p?.passed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
        <Lock className="h-6 w-6" />
        Pass the {m.title} quiz to earn this certificate.
        <Button asChild variant="outline" size="sm"><Link to="/academy/certificate">Back to certificates</Link></Button>
      </div>
    );
  }
  return (
    <CertificateFrame
      title={`${m.title} — Specialist`}
      subtitle="Comply365 Sales Enablement Academy · Specialist Playbook"
      recipient={name}
      body={`has demonstrated specialist competency on ${m.title} and is qualified to deliver the playbook in customer conversations.`}
      accent={m.accent_color ?? "primary"}
      detailGrid={
        <div className="text-[11px] text-muted-foreground">
          Best quiz score: <span className="text-foreground font-medium">{p.best_score}%</span> · Attempts: {p.attempts}
        </div>
      }
    />
  );
}

export default function Certificate() {
  const { profile, user } = useAuth();
  const { specialty } = useParams();
  const name = profile?.display_name ?? user?.email ?? "Reviewer";

  if (!specialty) return <CertificateIndex />;
  if (specialty === "master") return <MasterCertificate name={name} />;
  if (specialty === "core") return <CoreCertificate name={name} />;
  return <SpecialistCertificate name={name} specialty={specialty} />;
}
