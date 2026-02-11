/**
 * Mature Gold Heart Zone — top and bottom of all user surfaces.
 * NSPFRNP. See GOLD_HEARTED_GROWN_UPS_ZONE_SNAP.md.
 */
(function () {
  var LINE1 = 'Mature Gold Heart Zone';
  var LINE2 = 'All disclaimers apply. Fictional use only; no endorsement.';
  var TEXT = LINE1 + ' · ' + LINE2;
  var topBar = document.createElement('div');
  topBar.className = 'gold-hearted-grown-ups-zone-bar top';
  topBar.setAttribute('aria-label', LINE1 + '. ' + LINE2);
  topBar.textContent = TEXT;
  var bottomBar = document.createElement('div');
  bottomBar.className = 'gold-hearted-grown-ups-zone-bar bottom';
  bottomBar.setAttribute('aria-label', LINE1 + '. ' + LINE2);
  bottomBar.textContent = TEXT;
  function inject() {
    if (document.body && !document.querySelector('.gold-hearted-grown-ups-zone-bar')) {
      document.body.insertBefore(topBar, document.body.firstChild);
      document.body.appendChild(bottomBar);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
