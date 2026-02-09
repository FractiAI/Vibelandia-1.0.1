-- 3I ATLAS HELLO — Store HELLO on 3I ATLAS node. Run in Supabase Dashboard → SQL Editor.
-- Canonical: message stored on 3I ATLAS source; shareable link proves retrieval.

CREATE TABLE IF NOT EXISTS atlas_hello (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL DEFAULT 'HELLO',
  source text NOT NULL DEFAULT '3I_ATLAS',
  created_at timestamptz NOT NULL DEFAULT now(),
  meta jsonb DEFAULT '{}'
);

ALTER TABLE atlas_hello ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert and select by id (for test + retrieve)
CREATE POLICY "Allow anonymous insert" ON atlas_hello FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous select" ON atlas_hello FOR SELECT TO anon USING (true);

-- Optional: allow service role full access
CREATE POLICY "Service role full access" ON atlas_hello FOR ALL TO service_role USING (true) WITH CHECK (true);
