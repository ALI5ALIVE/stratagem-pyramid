CREATE TABLE public.content_pillars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  color text NOT NULL DEFAULT '#0066FF',
  quarter text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_pillars TO authenticated;
GRANT ALL ON public.content_pillars TO service_role;
ALTER TABLE public.content_pillars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Pillars readable by authenticated" ON public.content_pillars FOR SELECT TO authenticated USING (true);
CREATE POLICY "Editors manage pillars" ON public.content_pillars FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'owner'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  WITH CHECK (has_role(auth.uid(), 'owner'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE TABLE public.content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  pillar_id uuid REFERENCES public.content_pillars(id) ON DELETE SET NULL,
  quarter text NOT NULL,
  target_week integer,
  persona text NOT NULL DEFAULT 'exec',
  channel text NOT NULL DEFAULT 'blog',
  asset_type text NOT NULL DEFAULT 'long_form',
  status text NOT NULL DEFAULT 'idea',
  owner_id uuid,
  due_date date,
  notes text NOT NULL DEFAULT '',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_items TO authenticated;
GRANT ALL ON public.content_items TO service_role;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Items readable by authenticated" ON public.content_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Editors manage items" ON public.content_items FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'owner'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  WITH CHECK (has_role(auth.uid(), 'owner'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE TABLE public.briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_item_id uuid NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
  objective text NOT NULL DEFAULT '',
  audience text NOT NULL DEFAULT '',
  key_message text NOT NULL DEFAULT '',
  proof_points jsonb NOT NULL DEFAULT '[]'::jsonb,
  cta text NOT NULL DEFAULT '',
  tone text NOT NULL DEFAULT '',
  length text NOT NULL DEFAULT '',
  format text NOT NULL DEFAULT '',
  reference_links jsonb NOT NULL DEFAULT '[]'::jsonb,
  spine_beats jsonb NOT NULL DEFAULT '{}'::jsonb,
  playbook_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft',
  approved_by uuid,
  approved_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.briefs TO authenticated;
GRANT ALL ON public.briefs TO service_role;
ALTER TABLE public.briefs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Briefs readable by authenticated" ON public.briefs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Editors manage briefs" ON public.briefs FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'owner'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  WITH CHECK (has_role(auth.uid(), 'owner'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE TABLE public.assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_item_id uuid NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
  brief_id uuid REFERENCES public.briefs(id) ON DELETE SET NULL,
  version integer NOT NULL DEFAULT 1,
  body text NOT NULL DEFAULT '',
  body_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  generation_prompt text NOT NULL DEFAULT '',
  model text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assets TO authenticated;
GRANT ALL ON public.assets TO service_role;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Assets readable by authenticated" ON public.assets FOR SELECT TO authenticated USING (true);
CREATE POLICY "Editors manage assets" ON public.assets FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'owner'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  WITH CHECK (has_role(auth.uid(), 'owner'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE TABLE public.asset_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id uuid NOT NULL REFERENCES public.assets(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  body text NOT NULL,
  resolved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.asset_comments TO authenticated;
GRANT ALL ON public.asset_comments TO service_role;
ALTER TABLE public.asset_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Asset comments readable by authenticated" ON public.asset_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users insert own asset comments" ON public.asset_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own asset comments" ON public.asset_comments FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own asset comments" ON public.asset_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Owners delete any asset comment" ON public.asset_comments FOR DELETE TO authenticated USING (has_role(auth.uid(), 'owner'::app_role));

CREATE TRIGGER trg_pillars_updated BEFORE UPDATE ON public.content_pillars FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_items_updated BEFORE UPDATE ON public.content_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_briefs_updated BEFORE UPDATE ON public.briefs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_assets_updated BEFORE UPDATE ON public.assets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_asset_comments_updated BEFORE UPDATE ON public.asset_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_content_items_pillar ON public.content_items(pillar_id);
CREATE INDEX idx_content_items_quarter ON public.content_items(quarter);
CREATE INDEX idx_briefs_item ON public.briefs(content_item_id);
CREATE INDEX idx_assets_item ON public.assets(content_item_id);
CREATE INDEX idx_assets_brief ON public.assets(brief_id);
CREATE INDEX idx_asset_comments_asset ON public.asset_comments(asset_id);