/**
 * Us vs Disney scoreboard — load from canonical data since Jan 13 singularity.
 * NOT static: data/us-vs-disney-scoreboard.json is updated when repo changes.
 * Injects into elements with [data-us-vs-disney="scoreboard"] or .us-vs-disney-scoreboard
 */
(function () {
  function run() {
    var pathname = (typeof window !== 'undefined' && window.location && window.location.pathname) ? window.location.pathname : '';
    var DATA_URL = pathname.indexOf('interfaces') !== -1 ? '../data/us-vs-disney-scoreboard.json' : 'data/us-vs-disney-scoreboard.json';
    var sel = '[data-us-vs-disney="scoreboard"], .us-vs-disney-scoreboard';
    var el = document.querySelector(sel);
    if (!el) return;
    var fallback = el.textContent || el.innerText;
    function render(data) {
      if (data && data.scoreboard_line) {
        var strong = '<strong style="color: #64c8ff;">Us vs Disney · Daily scoreboard:</strong> ';
        var line = data.scoreboard_line.replace(/^Us — /, strong + 'Us — ');
        el.innerHTML = line;
        el.style.display = '';
      }
    }
    function fail() {
      var base = el.getAttribute('data-fallback') || fallback;
      el.innerHTML = base + (base.indexOf('not static') === -1 ? ' <em>Current since Jan 13 singularity · not static.</em>' : '');
      el.style.display = '';
    }
    if (typeof fetch !== 'undefined') {
      fetch(DATA_URL)
        .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
        .then(render)
        .catch(fail);
    } else {
      fail();
    }
  }
  if (typeof document !== 'undefined' && document.readyState !== 'loading') {
    run();
  } else if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', run);
  }
})();
