ALTER TABLE public.content_pillars ADD COLUMN IF NOT EXISTS slug TEXT;
UPDATE public.content_pillars SET slug = CASE quarter
  WHEN 'Q1' THEN 'dtop-education'
  WHEN 'Q2' THEN 'intelligence-proof'
  WHEN 'Q3' THEN 'industry-solutions'
  WHEN 'Q4' THEN 'sales-enablement'
END WHERE slug IS NULL;
ALTER TABLE public.content_pillars ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS content_pillars_slug_key ON public.content_pillars(slug);
CREATE UNIQUE INDEX IF NOT EXISTS briefs_content_item_id_key ON public.briefs(content_item_id);
CREATE UNIQUE INDEX IF NOT EXISTS content_items_title_quarter_key ON public.content_items(title, quarter);