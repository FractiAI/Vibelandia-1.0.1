/**
 * Octave 2 API base URL — shared by auth, profile, payments.
 * Syntheverse 7 Octave 2-3 Public Cloud Onramp.
 * Override via window.VIBELANDIA_API_BASE before loading auth-api.js if needed.
 */
(function () {
  if (typeof window !== 'undefined' && !window.VIBELANDIA_API_BASE) {
    window.VIBELANDIA_API_BASE = 'https://syntheverse-poc.vercel.app';
  }
})();
