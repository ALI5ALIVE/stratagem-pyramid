DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'slide_approvals'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.slide_approvals';
  END IF;
END $$;

DROP TABLE IF EXISTS public.slide_approvals;
DROP TYPE IF EXISTS public.approval_status;