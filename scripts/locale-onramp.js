/**
 * Locale onramp — prevents hard stop for non-English users (e.g. Colombia).
 * Detects browser language; if Spanish (or other non-en), shows a dismissible
 * banner with Spanish-first message and link to README.es.md so they have a
 * path instead of an English-only dead end. See COLOMBIA_ENGLISH_ONLY_HARD_STOP_LOCALE_ONRAMP_SNAP.md
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'locale-onramp-dismissed';
    var BANNER_ID = 'locale-onramp-banner';

    function primaryLang() {
        if (navigator.language) return navigator.language.toLowerCase().split('-')[0];
        if (navigator.languages && navigator.languages.length) return navigator.languages[0].toLowerCase().split('-')[0];
        return 'en';
    }

    function shouldShowBanner() {
        if (sessionStorage.getItem(STORAGE_KEY)) return false;
        var lang = primaryLang();
        return lang !== 'en';
    }

    function readmeEsUrl() {
        var pathname = typeof location !== 'undefined' && location.pathname || '';
        var base = pathname.indexOf('interfaces') !== -1 ? '../' : '';
        return base + 'README.es.md';
    }

    function dismiss() {
        try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
        var el = document.getElementById(BANNER_ID);
        if (el) el.remove();
    }

    function injectBanner() {
        if (!shouldShowBanner()) return;

        var readmeUrl = readmeEsUrl();
        var banner = document.createElement('div');
        banner.id = BANNER_ID;
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-label', 'Language notice');
        banner.style.cssText = [
            'position:relative',
            'width:100%',
            'padding:12px 44px 12px 16px',
            'background:linear-gradient(135deg, rgba(26,26,46,0.98) 0%, rgba(22,33,62,0.98) 100%)',
            'border-bottom:2px solid rgba(0,212,255,0.4)',
            'color:#e0e0e0',
            'font-size:0.95rem',
            'line-height:1.5',
            'box-sizing:border-box',
            'z-index:1999'
        ].join(';');

        var isSpanish = primaryLang() === 'es';
        var firstLine = isSpanish
            ? 'Estamos en inglés por ahora. <strong><a href="' + readmeUrl + '" style="color:#00d4ff;">README en español</a></strong>.'
            : 'We\'re in English for now. <strong><a href="' + readmeUrl + '" style="color:#00d4ff;">README en español</a></strong> (Spanish).';
        var secondLine = isSpanish
            ? 'We\'re in English for now. Spanish experience coming soon.'
            : 'Spanish experience coming soon. You\'re welcome here.';

        banner.innerHTML =
            '<div style="max-width:900px;margin:0 auto;">' +
            '<p style="margin:0 0 4px 0;">' + firstLine + '</p>' +
            '<p style="margin:0;font-size:0.85rem;color:#aaa;">' + secondLine + '</p>' +
            '</div>' +
            '<button type="button" onclick="window.localeOnrampDismiss && window.localeOnrampDismiss()" aria-label="Close" style="position:absolute;top:10px;right:10px;background:transparent;border:none;color:#888;cursor:pointer;font-size:1.4rem;line-height:1;padding:4px;">&times;</button>';

        window.localeOnrampDismiss = dismiss;
        document.body.insertBefore(banner, document.body.firstChild);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectBanner);
    } else {
        injectBanner();
    }
})();
