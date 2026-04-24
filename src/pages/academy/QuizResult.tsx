import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCw, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PerQ { id: string; correct: boolean; chosen_key: string | null; correct_key: string; explanation: string; }
interface Result { attempt_id: string; score: number; passed: boolean; total: number; correct: number; threshold: number; per_question: PerQ[]; }

export default function QuizResult() {
  const { moduleId } = useParams();
  const [result, setResult] = useState<Result | null>(null);
  const [nextId, setNextId] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`academy_result_${moduleId}`);
    if (raw) setResult(JSON.parse(raw));
    if (!moduleId) return;
    supabase.from("academy_modules").select("id, order_index").order("order_index").then(({ data }) => {
      const list = data ?? [];
      const cur = list.find((m: any) => m.id === moduleId) as any;
      const nxt = cur ? list.find((m: any) => m.order_index === cur.order_index + 1) as any : null;
      setNextId(nxt?.id ?? null);
    });
  }, [moduleId]);

  if (!result) return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">No result found. <Link to="/academy" className="text-primary ml-2">Back to Academy</Link></div>;

  return (
    <div className="min-h-screen bg-background py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <Card className={`p-8 mb-6 border-2 ${result.passed ? "border-emerald-500/50 bg-emerald-500/5" : "border-amber-500/50 bg-amber-500/5"}`}>
          <div className="flex items-center gap-3 mb-2">
            {result.passed ? <CheckCircle2 className="h-7 w-7 text-emerald-500" /> : <XCircle className="h-7 w-7 text-amber-500" />}
            <h1 className="text-2xl font-bold text-foreground">{result.passed ? "Passed" : "Not yet"}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            You scored <span className="font-semibold text-foreground">{result.score}%</span> ({result.correct} of {result.total}) · pass mark {result.threshold}%.
          </p>
          <div className="flex gap-2 mt-5">
            {result.passed ? (
              <>
                {nextId ? (
                  <Button asChild><Link to={`/academy/${nextId}`}>Next module <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
                ) : (
                  <Button asChild><Link to="/academy/certificate">Get certificate <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
                )}
                <Button asChild variant="outline"><Link to="/academy">Back to Academy</Link></Button>
              </>
            ) : (
              <>
                <Button asChild><Link to={`/academy/${moduleId}/quiz`}><RotateCw className="h-4 w-4 mr-1" />Retry quiz</Link></Button>
                <Button asChild variant="outline"><Link to={`/academy/${moduleId}`}>Re-watch lesson</Link></Button>
              </>
            )}
          </div>
        </Card>

        <h2 className="text-sm font-semibold text-foreground mb-3">Question feedback</h2>
        <div className="space-y-3">
          {result.per_question.map((q, i) => (
            <Card key={q.id} className="p-4">
              <div className="flex items-start gap-3">
                {q.correct ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" /> : <XCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />}
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Q{i + 1} · You chose <span className="font-mono uppercase">{q.chosen_key ?? "—"}</span> · correct: <span className="font-mono uppercase">{q.correct_key}</span></div>
                  <div className="text-xs text-muted-foreground italic">{q.explanation}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}