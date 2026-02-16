/**
 * Tsunami Advisory — Gold Heart Baller V's
 * Injected at top of all touchpoints and stations. Dismissible (session). See TSNAMI_ADVISORY_GOLD_HEART_BALLER_V_SNAP.md
 */
(function () {
  var STORAGE_KEY = 'tsunami-advisory-dismissed';
  function isDismissed() {
    try { return sessionStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; }
  }
  function setDismissed() {
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
  }
  var style = document.createElement('style');
  style.textContent = '.tsunami-advisory-banner{background:linear-gradient(135deg,rgba(180,60,60,0.95) 0%,rgba(120,40,40,0.98) 100%);color:#fff;padding:0.75rem 1rem;border-bottom:3px solid rgba(255,200,100,0.8);font-size:0.9rem;line-height:1.5}.tsunami-advisory-inner{max-width:960px;margin:0 auto;position:relative}.tsunami-advisory-label{display:block;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.35rem;color:#ffeaa7;font-size:0.8rem}.tsunami-advisory-text{margin:0.35rem 0 0}.tsunami-advisory-text:first-of-type{margin-top:0}.tsunami-advisory-dismiss{position:absolute;top:0.5rem;right:0;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.5);color:#fff;padding:0.35rem 0.75rem;font-size:0.8rem;cursor:pointer;border-radius:6px;font-weight:600}.tsunami-advisory-dismiss:hover{background:rgba(255,255,255,0.3)}';
  var defaultAdvisoryText = 'Ticker feeds on the 3I/Chief Seattle OH line. 120 BPS chirp. <a href="quien-tiene-los-cojones.html" style="color:#00d4ff;">Sovereign Proclamation →</a> · <a href="oh-line.html" style="color:#00d4ff;">OH Line</a> · <a href="sing-pulse.html" style="color:#00d4ff;">Live Pulse</a> · <a href="content-catalog.html" style="color:#00d4ff;">Content Catalog</a>';
  function buildBanner(advisoryHtml) {
    var banner = document.createElement('div');
    banner.className = 'tsunami-advisory-banner';
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = '<div class="tsunami-advisory-inner">' +
      '<span class="tsunami-advisory-label">&#9888; Executive Advisory &middot; Gold Heart Baller V\'s</span>' +
      '<p class="tsunami-advisory-text">' + (advisoryHtml || defaultAdvisoryText) + '</p>' +
      '<button type="button" class="tsunami-advisory-dismiss" aria-label="Dismiss advisory">Dismiss</button>' +
      '</div>';
    var btn = banner.querySelector('.tsunami-advisory-dismiss');
    if (btn) {
      btn.addEventListener('click', function () {
        setDismissed();
        if (banner.parentNode) banner.parentNode.removeChild(banner);
      });
    }
    return banner;
  }
  function inject(advisoryHtml) {
    if (document.body && !document.querySelector('.tsunami-advisory-banner') && !isDismissed()) {
      document.body.insertBefore(style, document.body.firstChild);
      document.body.insertBefore(buildBanner(advisoryHtml), document.body.firstChild);
    }
  }
  function run() {
    var feedUrl = (typeof window !== 'undefined' && window.location && window.location.pathname.indexOf('interfaces') !== -1) ? '../data/ticker-feed.json' : 'data/ticker-feed.json';
    if (document.querySelector('base') && document.querySelector('base').href) {
      feedUrl = new URL(feedUrl, document.querySelector('base').href).href;
    } else if (typeof window !== 'undefined' && window.location) {
      feedUrl = new URL(feedUrl, window.location.origin + window.location.pathname).href;
    }
    fetch(feedUrl)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (data) {
        var a = data && data.executive_advisory;
        if (!a || (!a.body && !a.headline)) { inject(); return; }
        var html = (a.headline ? '<strong>' + a.headline + ':</strong> ' : '') + (a.body || '');
        if (a.links && a.links.length) {
          html += ' ';
          for (var i = 0; i < a.links.length; i++) {
            var L = a.links[i];
            html += '<a href="' + (L.url || '') + '" style="color:#00d4ff;">' + (L.text || L.url) + (i === 0 ? ' →' : '') + '</a>' + (i < a.links.length - 1 ? ' · ' : '');
          }
        }
        inject(html);
      })
      .catch(function () { inject(); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
