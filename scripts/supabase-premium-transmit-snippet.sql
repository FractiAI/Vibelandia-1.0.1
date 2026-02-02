-- Copy-paste into Supabase Dashboard → SQL Editor → New query → Run
-- Creates premium_transmit_events table and inserts the three selected events (Sun Spots 8m, Schumann HELLO, 3I/ATLAS 4:20→5:00 PST).

-- 1) Create table (same shape as pulse/premium_transmit_log.json)
CREATE TABLE IF NOT EXISTS public.premium_transmit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  plan_id text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}',
  validation text,
  at_utc timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2) Optional: comment and index
COMMENT ON TABLE public.premium_transmit_events IS 'Premium transmit log — Sun Spots · Schumann · 3I/ATLAS (same pattern as scripts/premium-transmit.mjs → pulse/premium_transmit_log.json)';
CREATE INDEX IF NOT EXISTS idx_premium_transmit_events_at_utc ON public.premium_transmit_events (at_utc DESC);
CREATE INDEX IF NOT EXISTS idx_premium_transmit_events_event_type ON public.premium_transmit_events (event_type);

-- 3) Enable RLS (then allow anon/service as needed)
ALTER TABLE public.premium_transmit_events ENABLE ROW LEVEL SECURITY;

-- 4) Policy: allow insert and select for authenticated and anon (for logging from app/script)
DROP POLICY IF EXISTS "Allow read premium_transmit_events" ON public.premium_transmit_events;
CREATE POLICY "Allow read premium_transmit_events" ON public.premium_transmit_events
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert premium_transmit_events" ON public.premium_transmit_events;
CREATE POLICY "Allow insert premium_transmit_events" ON public.premium_transmit_events
  FOR INSERT WITH CHECK (true);

-- 5) Insert the three selected events (PST California)
INSERT INTO public.premium_transmit_events (event_type, plan_id, payload, validation, at_utc)
VALUES
  (
    'sun_spots_8m',
    'sun-spots-8m',
    '{"sacred_message": "Hello from Vibelandia — first premium Sun Spot test.", "sun_spot_name": "Vibelandia-Hello-1"}'::jsonb,
    'T+8m Schumann 21.4 Hz; T+16m GOES; T+24m extended',
    now()
  ),
  (
    'schumann_igaming',
    'schumann-igaming',
    '{"art_description": "Display the word HELLO in the Schumann layer — five letters, clear and readable, as a single session art piece.", "style": "Block letters, PST California time."}'::jsonb,
    'Session display; Update Certificate available.',
    now()
  ),
  (
    '3i_atlas_egs_day',
    '3i-atlas-egs-day',
    '{"duration": "1 day", "timezone": "America/Los_Angeles", "schedule": [{"action": "ON", "at_pst": "16:20", "at_local": "4:20 PM PST"}, {"action": "OFF", "at_pst": "16:53", "at_local": "4:53 PM PST (33 min later)"}, {"action": "ON", "at_pst": "17:00", "at_local": "5:00 PM PST (5 o''clock somewhere)"}, {"action": "OFF", "at_pst": "17:33", "at_local": "5:33 PM PST (33 min later)"}]}'::jsonb,
    'Two windows, 33 min each; take down at contract end.',
    now()
  );

-- 6) Verify (run separately if you only want to inspect)
-- SELECT id, event_type, plan_id, payload, at_utc FROM public.premium_transmit_events ORDER BY at_utc DESC;
