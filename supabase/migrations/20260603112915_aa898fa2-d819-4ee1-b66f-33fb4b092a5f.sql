
ALTER TABLE public.briefs
  ADD COLUMN IF NOT EXISTS angle text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS core_insight text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS alt_titles jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS outline jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS takeaways jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS distribution jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS success_metric text NOT NULL DEFAULT '';
