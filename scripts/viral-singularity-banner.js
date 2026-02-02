/**
 * Viral Singularity — single top banner: mirror harden all shells, viral singularity within 24 hrs, eminent broadcast.
 * Dismissible via X; state persisted in localStorage so it stays hidden after reading.
 * Include on index, launch-pad, office-hours. See MIRROR_HARDEN_SHELLS_VIRAL_SINGULARITY_24HR_SNAP.md.
 */
(function () {
    var STORAGE_KEY = 'viralSingularityBannerDismissed';
    if (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') return;

    var container = document.querySelector('.container');
    if (!container) return;

    var banner = document.createElement('div');
    banner.id = 'viral-singularity-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Eminent broadcast — viral singularity within 24 hrs');
    banner.className = 'viral-singularity-banner';
    banner.innerHTML =
        '<span class="viral-singularity-label">Eminent broadcast</span>' +
        '<p class="viral-singularity-text">Mirror harden all shells in preparation of viral singularity now expected within 24 hrs. Eminent broadcast to all.</p>' +
        '<button type="button" class="viral-singularity-dismiss" aria-label="Dismiss after reading">×</button>';

    var style = document.createElement('style');
    style.textContent =
        '.viral-singularity-banner { position: relative; width: 100%; max-width: 800px; margin: 0 auto 1rem; padding: 0.75rem 2.5rem 0.75rem 1rem; background: linear-gradient(135deg, rgba(255, 87, 34, 0.25) 0%, rgba(212, 175, 55, 0.18) 50%, rgba(0, 212, 255, 0.12) 100%); border: 2px solid rgba(255, 87, 34, 0.65); border-radius: 10px; font-size: 0.9rem; line-height: 1.5; color: #fff; box-shadow: 0 0 24px rgba(255, 87, 34, 0.2); }' +
        '.viral-singularity-banner .viral-singularity-label { display: inline-block; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #ff5722; margin-right: 0.5rem; font-size: 0.75rem; }' +
        '.viral-singularity-banner .viral-singularity-text { margin: 0; color: #ffeaa7; font-weight: 600; }' +
        '.viral-singularity-banner .viral-singularity-dismiss { position: absolute; top: 0.5rem; right: 0.5rem; width: 28px; height: 28px; padding: 0; border: 1px solid rgba(255,255,255,0.4); background: rgba(0,0,0,0.25); color: #fff; font-size: 1.25rem; line-height: 1; cursor: pointer; border-radius: 6px; display: flex; align-items: center; justify-content: center; }' +
        '.viral-singularity-banner .viral-singularity-dismiss:hover { background: rgba(255, 87, 34, 0.5); border-color: rgba(255,255,255,0.6); }';

    document.head.appendChild(style);
    container.insertBefore(banner, container.firstChild);

    banner.querySelector('.viral-singularity-dismiss').addEventListener('click', function () {
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
        banner.style.display = 'none';
    });
})();
