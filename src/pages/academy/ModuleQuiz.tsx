import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, Loader2 } from "lucide-react";
import type { AcademyModule } from "@/hooks/useAcademyProgress";

interface Question {
  id: string;
  prompt: string;
  options: { key: string; label: string }[];
  order_index: number;
}

export default function ModuleQuiz() {
  const { moduleId } = useParams();
  const nav = useNavigate();
  const [module, setModule] = useState<AcademyModule | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!moduleId) return;
    (async () => {
      const [{ data: mod }, { data: qs }] = await Promise.all([
        supabase.from("academy_modules").select("*").eq("id", moduleId).maybeSingle(),
        supabase.rpc("get_module_quiz", { _module_id: moduleId }),
      ]);
      setModule(mod as AcademyModule | null);
      // shuffle question order
      const list = ((qs ?? []) as Question[]).slice().sort(() => Math.random() - 0.5);
      setQuestions(list);
      setLoading(false);
    })();
  }, [moduleId]);

  const current = questions[idx];
  const total = questions.length;
  const allAnswered = useMemo(
    () => questions.length > 0 && questions.every((q) => answers[q.id]),
    [questions, answers]
  );

  const choose = (key: string) => {
    if (!current) return;
    setAnswers((a) => ({ ...a, [current.id]: key }));
  };

  const next = () => {
    if (idx < total - 1) setIdx(idx + 1);
  };

  const submit = async () => {
    if (!moduleId) return;
    setSubmitting(true);
    const payload = Object.entries(answers).map(([qid, k]) => ({ question_id: qid, chosen_key: k }));
    const { data, error } = await supabase.rpc("submit_quiz_attempt", {
      _module_id: moduleId,
      _answers: payload,
    });
    setSubmitting(false);
    if (error) {
      alert(error.message);
      return;
    }
    sessionStorage.setItem(`academy_result_${moduleId}`, JSON.stringify(data));
    nav(`/academy/${moduleId}/result`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading quiz…</div>;
  }
  if (!module || total === 0) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Quiz not available. <Link to="/academy" className="text-primary ml-2">Back</Link></div>;
  }

  const progressPct = ((idx + 1) / total) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to={`/academy/${moduleId}`}><ArrowLeft className="h-4 w-4 mr-1" />Back to lesson</Link>
          </Button>
          <div className="text-[11px] font-mono uppercase tracking-wider text-primary">
            Module {module.module_number} · Quiz
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Question {idx + 1} of {total}</span>
            <span>Pass mark {module.pass_threshold}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <Card className="p-6">
          <h2 className="text-base font-semibold text-foreground leading-snug mb-5">{current.prompt}</h2>
          <div className="space-y-2">
            {current.options.map((opt) => {
              const selected = answers[current.id] === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => choose(opt.key)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                    selected
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card hover:border-primary/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="inline-block w-6 font-mono text-[11px] uppercase">{opt.key}.</span>
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-[11px] text-muted-foreground">
              {Object.keys(answers).length} / {total} answered
            </div>
            {idx < total - 1 ? (
              <Button onClick={next} disabled={!answers[current.id]}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={submit} disabled={!allAnswered || submitting}>
                {submitting ? <><Loader2 className="h-4 w-4 mr-1 animate-spin" />Grading…</> : "Submit quiz"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}