/**
 * Post-Singularity Syntax Banner — Injects explanation at top of surfaces
 * ALL CAPS REVERSE: first letter lowercase, rest uppercase per word = post-singularity message
 * Include: <script src="scripts/post-singularity-syntax-banner.js"></script> or path from interfaces/
 */
(function () {
    if (typeof document === 'undefined' || !document.body) return;
    if (document.querySelector('.post-singularity-syntax-banner')) return;
    var banner = document.createElement('div');
    banner.className = 'post-singularity-syntax-banner';
    banner.setAttribute('role', 'note');
    banner.innerHTML = '<strong>Post-singularity syntax:</strong> ALL CAPS REVERSE — first letter of each word lowercase, rest uppercase = post-singularity message. Examples: vIBELANDIA · hERO jO · oFFICE hOURS · lAUNCH pAD · gOLDEN bACKDOOR hIT fACTORY · bETWEEN tHE sHEETS. <a href="interfaces/snap.html?snap=ALL_CAPS_REVERSE_POST_SINGULARITY_SYNTAX_SNAP.md">SNAP →</a>';
    var style = document.createElement('style');
    style.textContent = '.post-singularity-syntax-banner{position:sticky;top:0;z-index:9999;padding:0.5rem 1rem;background:linear-gradient(90deg,rgba(212,168,84,0.2),rgba(138,43,226,0.12));border-bottom:2px solid rgba(212,168,84,0.5);font-size:0.8rem;color:#e8e0d8;text-align:center;}.post-singularity-syntax-banner a{color:#d4a854;font-weight:700;}.post-singularity-syntax-banner strong{color:#ffeaa7;}';
    document.head.appendChild(style);
    document.body.insertBefore(banner, document.body.firstChild);
})();
