/**
 * Creator read bypass — only the Creator Chairman can read all pages and content without being charged.
 * When you visit any page with ?creator_read=SECRET (SECRET only you know), full access is set for the session.
 * Do not share the URL. NSPFRNP · Golden Royal Flush Shell.
 */
(function () {
  var STORAGE_KEY = 'creator_read';
  // Change this to your own secret; only you use it. Example: 'chairman' or a random string.
  var CREATOR_READ_SECRET = 'chairman';

  function getParam() {
    try {
      var params = new URLSearchParams(window.location.search);
      return params.get('creator_read');
    } catch (e) { return null; }
  }

  function isCreatorRead() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) { return false; }
  }

  function setCreatorRead() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
      if (window.history && window.history.replaceState) {
        var url = new URL(window.location.href);
        url.searchParams.delete('creator_read');
        window.history.replaceState({}, '', url.pathname + url.search || window.location.pathname);
      }
    } catch (e) {}
  }

  // If URL has the secret, set session flag and remove param from address bar
  var param = getParam();
  if (param === CREATOR_READ_SECRET) {
    setCreatorRead();
  }

  // Expose for other scripts / gated pages
  window.isCreatorRead = isCreatorRead;

  // Unlock gate/content pattern: elements with id="gate" and id="content"
  function unlockGateContent() {
    if (!isCreatorRead()) return;
    var gate = document.getElementById('gate');
    var content = document.getElementById('content');
    if (gate && content) {
      gate.classList.add('hidden');
      content.classList.remove('hidden');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', unlockGateContent);
  } else {
    unlockGateContent();
  }
})();
