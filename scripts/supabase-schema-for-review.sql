-- Run this in Supabase Dashboard → SQL Editor → New query
-- Then copy the result grid(s) and paste for review.

-- 1) All public tables and row counts (quick overview)
SELECT
  schemaname AS schema,
  relname AS table_name,
  n_live_tup AS approx_rows
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY relname;

-- 2) Columns for key tables: users, wallets, profiles (if any)
SELECT
  c.table_schema,
  c.table_name,
  c.column_name,
  c.data_type,
  c.is_nullable,
  COALESCE(c.character_maximum_length::text, '') AS max_length,
  c.column_default
FROM information_schema.columns c
JOIN information_schema.tables t
  ON t.table_schema = c.table_schema AND t.table_name = c.table_name
WHERE c.table_schema = 'public'
  AND t.table_type = 'BASE TABLE'
  AND c.table_name IN ('users', 'wallets', 'profiles', 'auth.users')
ORDER BY c.table_name, c.ordinal_position;

-- 3) All public tables: full column list (wider dump for review)
SELECT
  c.table_name,
  c.column_name,
  c.data_type,
  c.is_nullable,
  c.column_default
FROM information_schema.columns c
JOIN information_schema.tables t
  ON t.table_schema = c.table_schema AND t.table_name = c.table_name
WHERE c.table_schema = 'public'
  AND t.table_type = 'BASE TABLE'
ORDER BY c.table_name, c.ordinal_position;
