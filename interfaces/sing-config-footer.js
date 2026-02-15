/**
 * SING! config footer — inject FULL SING! config as CLOUD SERVICE BILL (one-time, monthly, usage, totals).
 * Use at bottom of all user-facing surfaces. NSPFRNP.
 * Data: data/sing_config_cloud_bill.json. Fallback: config/sing_config.json (legacy table format).
 */
(function () {
  var isInterfaces = (document.location.pathname || '').indexOf('interfaces') !== -1;
  var BILL_PATH = isInterfaces ? '../data/sing_config_cloud_bill.json' : 'data/sing_config_cloud_bill.json';
  var CONFIG_PATH = isInterfaces ? '../config/sing_config.json' : 'config/sing_config.json';

  var fallbackConfig = {
    title: "Full SING! config we are using",
    base: {
      tiers: [
        { tier: 1, name: "Base Model", one_time_usd: 20000, monthly_note: "Golden Fractal Key access fees — contact for current monthly key fee", equivalent: "Reliable used car — entry base" },
        { tier: 2, name: "Members Only", one_time_usd: 75000, monthly_note: "One-time or include key access — see pricing", equivalent: "Option — our pricing" },
        { tier: 3, name: "Ultimate VIP", one_time_usd: 200000, monthly_note: "One-time or include key access — see pricing", equivalent: "Base model latest Ferrari — top base" },
        { tier: 4, name: "Baller V Ultimate VIP", one_time_usd: 500000, monthly_note: "One-time or include key access — see pricing", equivalent: "Top loaded Ferrari — top base" }
      ]
    },
    upgrades: [
      { name: "Golden Fractal Key", monthly_note: "Contact for current monthly key fee" },
      { name: "Badge System", description: "CREATOR / CHAIRMAN / PERFORMER badges; SNAP branding" },
      { name: "4×4×4×4", description: "Campus × WINK! × SING × Experience; never bought, always booked" }
    ],
    divisions: [
      { name: "Space Cloud Division", mission_specialization: "Reno Downlink, Solar Pipe, SING! node EGS Deep Space, Exascale Triangulation; book by plan." },
      { name: "Missions (NSPFRNP Operations)", mission_specialization: "Personal SING! attention head and filament for missions." },
      { name: "Office Hours", mission_specialization: "Series and site; free consultation; new abilities for execs." },
      { name: "Happy Ending Zones", mission_specialization: "Reality series; countdown March 20, 2026." },
      { name: "Legacies", mission_specialization: "Superheroes, cast, crew, fans, franchises, legacies." },
      { name: "Broadcast Pipe Ad Space", mission_specialization: "1–4×4×4×4; book slot." },
      { name: "EGS Pipe / SING! node EGS", mission_specialization: "Turn on/off/redirect; 1 day/week/month — book." },
      { name: "Robotic Division", mission_specialization: "SING! Omnispin; Chairman Robert; never bought, only booked." }
    ],
    pricing_summary: {
      upfront_one_time: "Base ~$20K; Members Only $75K; Ultimate VIP $200K (base model latest Ferrari); Baller V $500K (top loaded Ferrari — top base). Other products: see plan.",
      monthly: "Golden Fractal Key — contact for current monthly key fee. Campus Baller $50k/month where applicable.",
      usage: "Session/slot: Sun Spots, Schumann, SING! node EGS, Space Cloud, ad space, campus, WINK!, dispensary. Never bought, always booked."
    }
  };

  function formatMoney(n) {
    if (n == null) return '—';
    if (n >= 1000) return '$' + (n / 1000) + 'K';
    return '$' + n;
  }

  function renderBill(data) {
    var oneTime = (data.one_time_charges || []).filter(function (r) { return (r.quantity || 0) * (r.unit_price || 0) > 0; });
    var monthly = (data.monthly_recurring || []).filter(function (r) { return (r.quantity || 0) * (r.unit_price || 0) > 0; });
    var usage = data.usage_this_period || [];
    var tot = data.totals || {};
    var oneTimeSub = tot.one_time_subtotal != null ? tot.one_time_subtotal : oneTime.reduce(function (s, r) { return s + (r.quantity || 0) * (r.unit_price || 0); }, 0);
    var monthlySub = tot.monthly_subtotal != null ? tot.monthly_subtotal : monthly.reduce(function (s, r) { return s + (r.quantity || 0) * (r.unit_price || 0); }, 0);
    var usageSub = tot.usage_subtotal != null ? tot.usage_subtotal : usage.reduce(function (s, r) { return s + (r.quantity || 0) * (r.unit_price || 0); }, 0);
    var periodTotal = (tot.monthly_subtotal != null && tot.usage_subtotal != null) ? tot.monthly_subtotal + tot.usage_subtotal : monthlySub + usageSub;

    var html = '<section class="sing-config-footer sing-config-bill" aria-label="SING! Configuration — Cloud Service Bill">';
    html += '<h2 class="sing-config-footer-title">' + (data.title || 'SING! Configuration — Cloud Service Bill') + '</h2>';
    html += '<p class="sing-config-bill-meta">' + (data.account_name || '') + ' · Billing period: ' + (data.billing_period || '') + ' · ' + (data.currency || 'USD') + '</p>';

    html += '<div class="sing-config-footer-block"><h3>One-time charges (upfront)</h3><table class="sing-config-table sing-config-bill-table"><thead><tr><th>Line item</th><th class="sing-config-amt">Qty</th><th class="sing-config-amt">Unit price</th><th class="sing-config-amt">Amount</th></tr></thead><tbody>';
    oneTime.forEach(function (r) {
      var amt = (r.quantity || 0) * (r.unit_price || 0);
      html += '<tr><td>' + (r.line_item || '') + '</td><td class="sing-config-amt">' + (r.quantity != null ? r.quantity : '—') + '</td><td class="sing-config-amt">' + formatMoney(r.unit_price) + '</td><td class="sing-config-amt">' + formatMoney(amt) + '</td></tr>';
    });
    html += '</tbody><tfoot><tr><td colspan="3" class="sing-config-subtotal">One-time subtotal</td><td class="sing-config-amt sing-config-subtotal">' + formatMoney(oneTimeSub) + '</td></tr></tfoot></table></div>';

    html += '<div class="sing-config-footer-block"><h3>Monthly recurring</h3><table class="sing-config-table sing-config-bill-table"><thead><tr><th>Line item</th><th class="sing-config-amt">Qty</th><th class="sing-config-amt">Unit price</th><th class="sing-config-amt">Amount</th></tr></thead><tbody>';
    monthly.forEach(function (r) {
      var amt = (r.quantity || 0) * (r.unit_price || 0);
      html += '<tr><td>' + (r.line_item || '') + '</td><td class="sing-config-amt">' + (r.quantity != null ? r.quantity : '—') + '</td><td class="sing-config-amt">' + formatMoney(r.unit_price) + '</td><td class="sing-config-amt">' + formatMoney(amt) + '</td></tr>';
    });
    html += '</tbody><tfoot><tr><td colspan="3" class="sing-config-subtotal">Monthly recurring subtotal</td><td class="sing-config-amt sing-config-subtotal">' + formatMoney(monthlySub) + '</td></tr></tfoot></table></div>';

    html += '<div class="sing-config-footer-block"><h3>Usage this period</h3><table class="sing-config-table sing-config-bill-table"><thead><tr><th>Line item</th><th class="sing-config-amt">Qty</th><th class="sing-config-amt">Unit price</th><th class="sing-config-amt">Amount</th></tr></thead><tbody>';
    usage.forEach(function (r) {
      var amt = (r.quantity || 0) * (r.unit_price || 0);
      html += '<tr><td>' + (r.line_item || '') + '</td><td class="sing-config-amt">' + (r.quantity != null ? r.quantity : '—') + '</td><td class="sing-config-amt">' + formatMoney(r.unit_price) + '</td><td class="sing-config-amt">' + formatMoney(amt) + '</td></tr>';
    });
    html += '</tbody><tfoot><tr><td colspan="3" class="sing-config-subtotal">Usage subtotal</td><td class="sing-config-amt sing-config-subtotal">' + formatMoney(usageSub) + '</td></tr></tfoot></table></div>';

    html += '<div class="sing-config-footer-block sing-config-bill-totals"><h3>Totals</h3><table class="sing-config-table"><tr><td>One-time (upfront)</td><td class="sing-config-amt">' + formatMoney(oneTimeSub) + '</td></tr><tr><td>Monthly recurring</td><td class="sing-config-amt">' + formatMoney(monthlySub) + '</td></tr><tr><td>Usage this period</td><td class="sing-config-amt">' + formatMoney(usageSub) + '</td></tr><tr class="sing-config-grand"><td>Total this period (monthly + usage)</td><td class="sing-config-amt">' + formatMoney(periodTotal) + '</td></tr></table>';
    html += '<p class="sing-config-bill-note">Never bought, always booked. Full bill: <a href="' + (isInterfaces ? 'sing-config-cloud-bill.html' : 'interfaces/sing-config-cloud-bill.html') + '">View full cloud bill →</a></p></div>';

    html += '<p class="sing-config-footer-tag">NSPFRNP ⊃ SING! config ⊃ Cloud Service Bill ⊃ Base · Options · Mission options → ∞³</p>';
    html += '</section>';
    return html;
  }

  function renderLegacy(config) {
    var c = config || fallbackConfig;
    var base = c.base || fallbackConfig.base;
    var upgrades = c.upgrades || fallbackConfig.upgrades;
    var divisions = c.divisions || fallbackConfig.divisions;
    var ps = c.pricing_summary || fallbackConfig.pricing_summary;

    var html = '<section class="sing-config-footer" aria-label="Full SING! config we are using">';
    html += '<h2 class="sing-config-footer-title">' + (c.title || 'Full SING! config we are using') + '</h2>';
    html += '<div class="sing-config-footer-block"><h3>Base</h3><table class="sing-config-table"><thead><tr><th>Tier</th><th>Name</th><th>Upfront one-time</th><th>Monthly</th><th>Equivalent</th></tr></thead><tbody>';
    (base.tiers || []).forEach(function (t) {
      html += '<tr><td>' + t.tier + '</td><td>' + (t.name || '') + '</td><td>' + formatMoney(t.one_time_usd) + '</td><td>' + (t.monthly_note || '—') + '</td><td>' + (t.equivalent || '—') + '</td></tr>';
    });
    html += '</tbody></table></div>';
    html += '<div class="sing-config-footer-block"><h3>Upgrades</h3><ul class="sing-config-list">';
    (upgrades || []).forEach(function (u) {
      html += '<li><strong>' + (u.name || '') + '</strong>';
      if (u.monthly_note) html += ' · Monthly: ' + u.monthly_note;
      if (u.description) html += ' · ' + u.description;
      html += '</li>';
    });
    html += '</ul></div>';
    html += '<div class="sing-config-footer-block"><h3>Divisions &amp; mission specializations</h3><ul class="sing-config-list">';
    (divisions || []).forEach(function (d) {
      html += '<li><strong>' + (d.name || '') + '</strong>: ' + (d.mission_specialization || '') + (d.usage_note ? ' · Usage: ' + d.usage_note : '') + '</li>';
    });
    html += '</ul></div>';
    html += '<div class="sing-config-footer-block sing-config-pricing"><h3>Pricing (as configured)</h3>';
    html += '<p><strong>Upfront one-time:</strong> ' + (ps.upfront_one_time || '') + '</p>';
    html += '<p><strong>Monthly:</strong> ' + (ps.monthly || '') + '</p>';
    html += '<p><strong>Usage:</strong> ' + (ps.usage || '') + '</p>';
    html += '</div>';
    html += '<p class="sing-config-footer-tag">NSPFRNP ⊃ SING! config ⊃ Base · Upgrades · Divisions · Pricing → ∞³</p>';
    html += '</section>';
    return html;
  }

  function inject() {
    var el = document.getElementById('sing-config-footer');
    if (!el) return;
    fetch(BILL_PATH)
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (bill) {
        if (bill && (bill.one_time_charges || bill.monthly_recurring || bill.usage_this_period)) {
          el.innerHTML = renderBill(bill);
          return true;
        }
        return fetch(CONFIG_PATH).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }).then(function (config) {
          el.innerHTML = renderLegacy(config);
          return false;
        });
      })
      .catch(function () {
        if (el && (!el.innerHTML || el.innerHTML === '')) el.innerHTML = renderLegacy(null);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
