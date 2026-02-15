/**
 * Load "What's New in SING! 9" fragment at the top of the experience.
 * Works from / (index) and /interfaces/*. Place once at start of body content.
 */
(function () {
    var base = document.location.pathname.indexOf('/interfaces/') !== 0 ? 'interfaces/' : '';
    var wrap = document.getElementById('whats-new-sing9-wrap');
    if (!wrap) return;
    fetch(base + 'whats-new-sing9.html', { cache: 'no-cache' })
        .then(function (r) { return r.text(); })
        .then(function (html) {
            wrap.innerHTML = html;
        })
        .catch(function () { wrap.style.display = 'none'; });
})();
