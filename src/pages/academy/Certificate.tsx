import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAcademy } from "@/hooks/useAcademyProgress";
import { Award, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Certificate() {
  const { profile, user } = useAuth();
  const { modules, progress } = useAcademy();
  const allDone = modules.length > 0 && modules.every((m) => progress[m.id]?.passed);
  const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  if (!allDone) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Complete all 6 modules to earn your certificate.
        <Link to="/academy" className="text-primary ml-2">Back</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-6 print:p-0">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between mb-4 print:hidden">
          <Button asChild variant="ghost" size="sm"><Link to="/academy">← Back</Link></Button>
          <Button onClick={() => window.print()} size="sm"><Printer className="h-4 w-4 mr-1" />Print</Button>
        </div>
        <div className="border-4 border-primary/30 rounded-2xl p-12 bg-card text-center">
          <Award className="h-12 w-12 text-primary mx-auto mb-4" />
          <div className="text-[11px] uppercase font-mono tracking-widest text-primary mb-2">Certificate of Completion</div>
          <div className="text-sm text-muted-foreground mb-6">Comply365 Sales Enablement Academy</div>
          <div className="text-3xl font-bold text-foreground mb-2">{profile?.display_name ?? user?.email}</div>
          <div className="text-sm text-muted-foreground mb-8">has successfully completed all six modules of the Sales Enablement Academy and demonstrated competency on the Operational Performance Platform.</div>
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
            {modules.map((m) => (
              <div key={m.id} className="text-[11px] p-2 rounded border border-border">
                <div className="font-mono uppercase text-primary text-[10px]">M{m.module_number}</div>
                <div className="text-foreground">{progress[m.id]?.best_score}%</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">{date}</div>
        </div>
      </div>
    </div>
  );
}