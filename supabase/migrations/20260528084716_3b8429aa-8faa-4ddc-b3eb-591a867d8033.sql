
-- Page view tracking table
CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  route text NOT NULL,
  deck_id text,
  session_id text,
  duration_ms integer,
  viewed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_views_user ON public.page_views(user_id, viewed_at DESC);
CREATE INDEX idx_page_views_viewed_at ON public.page_views(viewed_at DESC);

GRANT SELECT, INSERT, UPDATE ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own page views"
  ON public.page_views FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own page views"
  ON public.page_views FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users read own or owner reads all"
  ON public.page_views FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'owner'::app_role));

CREATE POLICY "Owners delete page views"
  ON public.page_views FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'owner'::app_role));

-- Activity summary (owner only)
CREATE OR REPLACE FUNCTION public.get_user_activity_summary()
RETURNS TABLE (
  user_id uuid,
  display_name text,
  email text,
  avatar_color text,
  last_sign_in_at timestamptz,
  created_at timestamptz,
  sign_in_count bigint,
  academy_modules_passed bigint,
  academy_avg_score numeric,
  academy_last_attempt timestamptz,
  page_views_total bigint,
  decks_visited bigint,
  last_page_view timestamptz,
  comments_total bigint,
  last_comment_at timestamptz
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'owner'::app_role) THEN
    RAISE EXCEPTION 'Owner access required';
  END IF;

  RETURN QUERY
  SELECT
    p.id AS user_id,
    p.display_name,
    u.email::text AS email,
    p.avatar_color,
    u.last_sign_in_at,
    p.created_at,
    (SELECT count(*) FROM auth.audit_log_entries a
       WHERE (a.payload->>'actor_id')::uuid = p.id
         AND a.payload->>'action' = 'login') AS sign_in_count,
    (SELECT count(*) FROM public.academy_attempts aa WHERE aa.user_id = p.id AND aa.passed) AS academy_modules_passed,
    (SELECT round(avg(aa.score)::numeric, 1) FROM public.academy_attempts aa WHERE aa.user_id = p.id) AS academy_avg_score,
    (SELECT max(aa.completed_at) FROM public.academy_attempts aa WHERE aa.user_id = p.id) AS academy_last_attempt,
    (SELECT count(*) FROM public.page_views pv WHERE pv.user_id = p.id) AS page_views_total,
    (SELECT count(DISTINCT pv.deck_id) FROM public.page_views pv WHERE pv.user_id = p.id AND pv.deck_id IS NOT NULL) AS decks_visited,
    (SELECT max(pv.viewed_at) FROM public.page_views pv WHERE pv.user_id = p.id) AS last_page_view,
    (SELECT count(*) FROM public.slide_comments sc WHERE sc.user_id = p.id) AS comments_total,
    (SELECT max(sc.created_at) FROM public.slide_comments sc WHERE sc.user_id = p.id) AS last_comment_at
  FROM public.profiles p
  LEFT JOIN auth.users u ON u.id = p.id
  ORDER BY u.last_sign_in_at DESC NULLS LAST;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_user_activity_summary() TO authenticated;

-- Per-user detail (owner only)
CREATE OR REPLACE FUNCTION public.get_user_activity_detail(_user_id uuid)
RETURNS TABLE (
  page_views jsonb,
  deck_counts jsonb,
  attempts jsonb,
  comments jsonb
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT has_role(auth.uid(), 'owner'::app_role) THEN
    RAISE EXCEPTION 'Owner access required';
  END IF;

  RETURN QUERY
  SELECT
    (SELECT coalesce(jsonb_agg(row_to_json(t) ORDER BY t.viewed_at DESC), '[]'::jsonb)
       FROM (SELECT id, route, deck_id, viewed_at, duration_ms
             FROM public.page_views
             WHERE user_id = _user_id
             ORDER BY viewed_at DESC
             LIMIT 200) t),
    (SELECT coalesce(jsonb_agg(jsonb_build_object('deck_id', deck_id, 'count', c) ORDER BY c DESC), '[]'::jsonb)
       FROM (SELECT deck_id, count(*) AS c
             FROM public.page_views
             WHERE user_id = _user_id AND deck_id IS NOT NULL
             GROUP BY deck_id) d),
    (SELECT coalesce(jsonb_agg(row_to_json(a) ORDER BY a.completed_at DESC), '[]'::jsonb)
       FROM (SELECT module_id, score, passed, completed_at, correct_count, total_questions
             FROM public.academy_attempts
             WHERE user_id = _user_id
             ORDER BY completed_at DESC) a),
    (SELECT coalesce(jsonb_agg(row_to_json(c) ORDER BY c.created_at DESC), '[]'::jsonb)
       FROM (SELECT id, deck_id, slide_id, body, created_at, resolved
             FROM public.slide_comments
             WHERE user_id = _user_id
             ORDER BY created_at DESC
             LIMIT 200) c);
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_user_activity_detail(uuid) TO authenticated;
