
DROP VIEW IF EXISTS public.academy_progress_per_user;

CREATE VIEW public.academy_progress_per_user
WITH (security_invoker = true) AS
SELECT
  a.user_id, a.module_id,
  max(a.score) AS best_score,
  bool_or(a.passed) AS passed,
  count(*) AS attempts,
  max(a.completed_at) AS last_attempt_at
FROM public.academy_attempts a
GROUP BY a.user_id, a.module_id;
