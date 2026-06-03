CREATE TABLE public.brief_jobs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by uuid NOT NULL,
  status text NOT NULL DEFAULT 'queued',
  total integer NOT NULL DEFAULT 0,
  succeeded integer NOT NULL DEFAULT 0,
  failed integer NOT NULL DEFAULT 0,
  skipped integer NOT NULL DEFAULT 0,
  filters jsonb NOT NULL DEFAULT '{}'::jsonb,
  voice text NOT NULL DEFAULT 'corporate',
  errors jsonb NOT NULL DEFAULT '[]'::jsonb,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.brief_jobs TO authenticated;
GRANT ALL ON public.brief_jobs TO service_role;

ALTER TABLE public.brief_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Editors read brief jobs"
ON public.brief_jobs FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'owner'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors insert own brief jobs"
ON public.brief_jobs FOR INSERT TO authenticated
WITH CHECK ((has_role(auth.uid(), 'owner'::app_role) OR has_role(auth.uid(), 'editor'::app_role)) AND created_by = auth.uid());

CREATE POLICY "Editors update brief jobs"
ON public.brief_jobs FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'owner'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE TRIGGER update_brief_jobs_updated_at
BEFORE UPDATE ON public.brief_jobs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();