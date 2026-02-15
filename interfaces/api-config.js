/**
 * Octave 2 API base URL — shared by profile, payments (orders/complete).
 * When served from Vibelandia deploy (psw-vibelandia-sing9), use same-origin so
 * PayPal pipe hits local /api/payment/paypal/*. Otherwise Octave 2 Cloud Onramp.
 * Override via window.VIBELANDIA_API_BASE before loading auth-api.js if needed.
 */
(function () {
  if (typeof window === 'undefined') return;
  if (window.VIBELANDIA_API_BASE !== undefined) return;
  var host = window.location.hostname || '';
  var isVibelandiaDeploy = host === 'psw-vibelandia-sing9.vercel.app' || (host.endsWith('.vercel.app') && host.indexOf('psw-vibelandia-sing9') !== -1) || host === 'localhost' || host === '127.0.0.1';
  window.VIBELANDIA_API_BASE = isVibelandiaDeploy ? window.location.origin : 'https://syntheverse-poc.vercel.app';
})();

/**
 * Supabase — auth (and Google OAuth). sing9: NO SUPABASE (minimal footprint, edge self-validating).
 * For non-sing9 deployments, set window.VIBELANDIA_SUPABASE_URL and window.VIBELANDIA_SUPABASE_ANON_KEY
 * at build time or before loading auth-api.js. Anon key: Supabase Dashboard → Settings → API → anon public.
 * When both are empty/undefined, auth-api uses edge-only path (no Supabase). sing9 leaves both unset.
 */
(function () {
  if (typeof window === 'undefined') return;
  if (!window.VIBELANDIA_SUPABASE_ANON_KEY) {
    window.VIBELANDIA_SUPABASE_ANON_KEY = '';
  }
  if (!window.VIBELANDIA_SUPABASE_URL) {
    window.VIBELANDIA_SUPABASE_URL = ''; // sing9: no Supabase; edge self-validating
  }
})();

/**
 * Google OAuth client ID — for Google Identity Services (GIS) One Tap / Sign-in button on profile.
 * Same client ID as configured in Supabase Dashboard → Auth → Providers → Google.
 * Get from Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID (Web).
 * Optional: set VIBELANDIA_GOOGLE_CLIENT_ID or NEXT_PUBLIC_GOOGLE_CLIENT_ID at build or in window.
 */
(function () {
  if (typeof window === 'undefined') return;
  if (!window.VIBELANDIA_GOOGLE_CLIENT_ID && !window.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    window.VIBELANDIA_GOOGLE_CLIENT_ID = '';
  }
})();

/**
 * PayPal client ID — OUR app's Client ID so funds go to our account.
 * Must be the same PayPal app as Octave 2 uses (Octave 2 needs same app's Client ID + Secret for create-order/capture-order).
 * Get from https://developer.paypal.com/dashboard/applications/sandbox (Sandbox) or Live.
 */
(function () {
  if (typeof window === 'undefined') return;
  if (!window.VIBELANDIA_PAYPAL_CLIENT_ID) {
    // Replace with your PayPal Client ID (Sandbox or Live)
    window.VIBELANDIA_PAYPAL_CLIENT_ID = 'REPLACE_WITH_YOUR_PAYPAL_CLIENT_ID';
  }
})();
