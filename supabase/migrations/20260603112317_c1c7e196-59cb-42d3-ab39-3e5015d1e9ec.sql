
ALTER TABLE public.briefs
  ADD COLUMN IF NOT EXISTS voice text NOT NULL DEFAULT 'corporate';

ALTER TABLE public.assets
  ADD COLUMN IF NOT EXISTS scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS score_total integer,
  ADD COLUMN IF NOT EXISTS score_band text;
