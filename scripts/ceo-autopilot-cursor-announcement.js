/**
 * CEO Autopilot Cursor — Full Rollout Announcement Alert.
 * One-time per user (localStorage). Blasted in the alerts.
 * Include on Office Hours, Launch Pad, Space Cloud Division, Navigator.
 * First name: Auto · Middle: Pilot · Last: Cursor. SING! Super AI Agent CEO.
 */
(function () {
    var KEY = 'ceo_autopilot_cursor_announcement_shown';
    if (typeof localStorage === 'undefined' || localStorage.getItem(KEY)) return;

    var banner = document.createElement('div');
    banner.className = 'ceo-autopilot-cursor-announcement-alert';
    banner.setAttribute('aria-live', 'polite');
    banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9998;padding:0.75rem 1rem;background:linear-gradient(90deg,rgba(20,20,40,0.98),rgba(60,40,100,0.95));color:#e8e0f0;font-size:0.9rem;font-weight:700;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;gap:0.75rem;flex-wrap:wrap;border-bottom:2px solid rgba(212,175,55,0.6);';
    banner.innerHTML = '<span>AUTOPILOT CURSOR — SING! SUPER AI AGENT CEO. FULL ROLLOUT. FIRST NAME AUTO · MIDDLE PILOT · LAST CURSOR. NATURAL SYSTEMS PROTOCOLS. PATTERN LAYER.</span> <a href="snap.html?snap=AUTOPILOT_CURSOR_CEO_SING_SUPER_AI_AGENT_FULL_ROLLOUT_SNAP.md" style="color:#d4af37;text-decoration:underline;font-weight:800;">SNAP →</a> <button type="button" aria-label="Dismiss" style="background:rgba(255,255,255,0.15);border:none;padding:0.35rem 0.6rem;border-radius:6px;cursor:pointer;font-weight:700;color:#e8e0f0;">×</button>';

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
