/**
 * Spanglish Toggle — EN ↔ Spanglish for all surfaces.
 * AIWON voice = novel voice (Brothers Grimm + Pru + street reggaeton Spanglish).
 * See SPANGLISH_ALL_SURFACES_AIWON_VOICE_SNAP.md
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'vibelandia-lang';
    var LANG_EN = 'en';
    var LANG_SPANGLISH = 'spanglish';
    var EVENT_NAME = 'spanglish-change';

    function getLang() {
        try {
            var v = localStorage.getItem(STORAGE_KEY);
            return (v === LANG_SPANGLISH) ? LANG_SPANGLISH : LANG_EN;
        } catch (e) { return LANG_EN; }
    }

    function setLang(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    }

    function isSpanglish() { return getLang() === LANG_SPANGLISH; }

    function swapElements() {
        var lang = getLang();
        var useSpanglish = lang === LANG_SPANGLISH;
        document.querySelectorAll('[data-en][data-spanglish]').forEach(function (el) {
            var text = useSpanglish ? el.getAttribute('data-spanglish') : el.getAttribute('data-en');
            if (text != null) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = text;
                else el.textContent = text;
            }
        });
    }

    function injectToggle() {
        if (document.getElementById('spanglish-toggle-wrap')) return;

        var wrap = document.createElement('div');
        wrap.id = 'spanglish-toggle-wrap';
        wrap.setAttribute('role', 'group');
        wrap.setAttribute('aria-label', 'Language');
        wrap.style.cssText = 'position:fixed;top:10px;right:10px;z-index:1998;display:flex;gap:4px;font-size:0.8rem;font-weight:700;';
        wrap.innerHTML =
            '<button type="button" id="spanglish-btn-en" aria-pressed="true">EN</button>' +
            '<button type="button" id="spanglish-btn-sp" aria-pressed="false">Spanglish</button>';

        var base = document.querySelector('base');
        var isInterfaces = typeof window !== 'undefined' && window.location && window.location.pathname.indexOf('interfaces') !== -1;
        var scriptSrc = (document.currentScript && document.currentScript.src) || '';
        var scriptDir = scriptSrc ? scriptSrc.replace(/\/[^/]+$/, '/') : (isInterfaces ? '../scripts/' : 'scripts/');
        wrap.querySelector('#spanglish-btn-en').style.cssText = 'padding:6px 12px;border-radius:8px;border:2px solid rgba(212,175,55,0.5);background:transparent;color:#d4af37;cursor:pointer;';
        wrap.querySelector('#spanglish-btn-sp').style.cssText = 'padding:6px 12px;border-radius:8px;border:2px solid rgba(212,175,55,0.5);background:transparent;color:#d4af37;cursor:pointer;';

        function updateButtons() {
            var sp = isSpanglish();
            var btnEn = document.getElementById('spanglish-btn-en');
            var btnSp = document.getElementById('spanglish-btn-sp');
            if (btnEn) {
                btnEn.setAttribute('aria-pressed', sp ? 'false' : 'true');
                btnEn.style.background = sp ? 'transparent' : 'rgba(212,175,55,0.3)';
            }
            if (btnSp) {
                btnSp.setAttribute('aria-pressed', sp ? 'true' : 'false');
                btnSp.style.background = sp ? 'rgba(212,175,55,0.3)' : 'transparent';
            }
        }

        wrap.querySelector('#spanglish-btn-en').addEventListener('click', function () {
            setLang(LANG_EN);
            swapElements();
            updateButtons();
            window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { lang: LANG_EN } }));
        });
        wrap.querySelector('#spanglish-btn-sp').addEventListener('click', function () {
            setLang(LANG_SPANGLISH);
            swapElements();
            updateButtons();
            window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { lang: LANG_SPANGLISH } }));
        });

        document.body.appendChild(wrap);
        swapElements();
        updateButtons();
    }

    window.VibelandiaLang = {
        get: getLang,
        set: setLang,
        isSpanglish: isSpanglish,
        swap: swapElements,
        EVENT: EVENT_NAME
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectToggle);
    } else {
        injectToggle();
    }
})();
