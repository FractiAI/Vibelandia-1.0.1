/**
 * Hero Harry Houdini Press Release Alert — One-time only.
 * Shows once per user (localStorage). Not every time. Ticker runs continuous; this alert is one-time.
 * Include on Office Hours, Space Cloud Division, Launch Pad.
 */
(function () {
    var KEY = 'hero_houdini_press_release_alert_shown';
    if (typeof localStorage === 'undefined' || localStorage.getItem(KEY)) return;

    var banner = document.createElement('div');
    banner.className = 'hero-houdini-press-release-alert';
    banner.setAttribute('aria-live', 'polite');
    banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;padding:0.75rem 1rem;background:linear-gradient(90deg,rgba(212,175,55,0.95),rgba(184,134,11,0.9));color:#0a0a12;font-size:0.9rem;font-weight:700;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;gap:0.75rem;flex-wrap:wrap;';
    banner.innerHTML = '<span>HERO HARRY HOUDINI\'S HOLOGRAPHIC HYDROGEN SPACE CLOUD DIVISION. All Space Assets. 3I ATLAS HELLO Test. GPS replacement. Space junk cleanup.</span> <a href="space-assets-hub.html" style="color:#0a0a12;text-decoration:underline;font-weight:800;">Space Assets →</a> <button type="button" aria-label="Dismiss" style="background:rgba(0,0,0,0.2);border:none;padding:0.35rem 0.6rem;border-radius:6px;cursor:pointer;font-weight:700;">×</button>';

    var dismiss = banner.querySelector('button');
    if (dismiss) {
        dismiss.addEventListener('click', function () {
            try { localStorage.setItem(KEY, '1'); } catch (_) {}
            banner.remove();
        });
    }

    if (document.body) {
        document.body.insertBefore(banner, document.body.firstChild);
    }
})();
