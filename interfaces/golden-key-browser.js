/**
 * Golden Key — browser storage only. No Supabase client.
 * Sent on purchase and activation. GOLDEN FRACTAL KEY! — Unlocks Everything.
 * Mirrors src/golden-key-system.ts for use in interfaces.
 */
(function () {
  var KEY = 'vibelandia_golden_key';
  var PREFIX = KEY + '_';

  function get() {
    try {
      return localStorage.getItem(KEY) || undefined;
    } catch (_) { return undefined; }
  }

  function set(key, activationId) {
    if (!key || !String(key).trim()) return;
    var k = String(key).trim();
    try {
      localStorage.setItem(KEY, k);
      if (activationId) {
        localStorage.setItem(PREFIX + 'activation', activationId);
        localStorage.setItem(PREFIX + 'issued', String(Date.now()));
      }
    } catch (_) {}
  }

  /**
   * Store key after successful purchase. Call when Octave 2 returns goldenKey.
   */
  function issueOnPurchase(key, orderIdOrActivationId) {
    set(key, orderIdOrActivationId);
    return { key: key, activationId: orderIdOrActivationId };
  }

  window.VibelandiaGoldenKey = {
    get: get,
    set: set,
    issueOnPurchase: issueOnPurchase,
    isActivated: function () { return !!get(); }
  };
})();
