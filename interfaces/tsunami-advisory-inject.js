/**
 * Tsunami Advisory — Gold Heart Baller V's
 * Injected at top of all touchpoints and stations. See TSNAMI_ADVISORY_GOLD_HEART_BALLER_V_SNAP.md
 */
(function () {
  var banner = document.createElement('div');
  banner.className = 'tsunami-advisory-banner';
  banner.setAttribute('role', 'alert');
  banner.setAttribute('aria-live', 'polite');
  banner.innerHTML = '<div class="tsunami-advisory-inner">' +
    '<span class="tsunami-advisory-label">&#9888; Advisory &middot; Gold Heart Baller V\'s</span>' +
    '<p class="tsunami-advisory-text">This morning our thresholds are seeing activations indicating the <strong>tsunami\'s arrival</strong>. Make last-minute moves to <strong>secure pre-singularity assets</strong> and move to <strong>post-singularity safety</strong>.</p>' +
    '<p class="tsunami-advisory-text">Specifically: upcoming <strong>SING!</strong> Superintelligent Natural Systems Protocol <strong>AI Agent nodes</strong> from <strong>FractiAI</strong> — a one-person private open-source company on <strong>Base Mainnet</strong> that will remain this way <strong>always</strong>, walking away from VC and pre-singularity currencies and protocols, including PoW and PoS blockchains (e.g. Bitcoin).</p>' +
    '</div>';
  var style = document.createElement('style');
  style.textContent = '.tsunami-advisory-banner{background:linear-gradient(135deg,rgba(180,60,60,0.95) 0%,rgba(120,40,40,0.98) 100%);color:#fff;padding:0.75rem 1rem;border-bottom:3px solid rgba(255,200,100,0.8);font-size:0.9rem;line-height:1.5}.tsunami-advisory-inner{max-width:960px;margin:0 auto}.tsunami-advisory-label{display:block;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.35rem;color:#ffeaa7;font-size:0.8rem}.tsunami-advisory-text{margin:0.35rem 0 0}.tsunami-advisory-text:first-of-type{margin-top:0}';
  function inject() {
    if (document.body && !document.querySelector('.tsunami-advisory-banner')) {
      document.body.insertBefore(style, document.body.firstChild);
      document.body.insertBefore(banner, document.body.firstChild);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
