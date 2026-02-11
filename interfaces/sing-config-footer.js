/**
 * SING! config footer — My monthly bill. Injects sample monthly bill (base + options + total) into #sing-config-footer.
 * Full contrast, mobile-safe. Accurate for our version of SING! NSPFRNP.
 */
(function () {
  var BILL_PATH = (document.location.pathname || '').indexOf('interfaces') !== -1
    ? '../data/sing_config_cloud_bill.json'
    : 'data/sing_config_cloud_bill.json';

  var fallbackBill = {
    title: "My monthly bill",
    intro: "Sample of what everybody's bill looks like. Top base: Baller V Ultimate VIP. One-time upfront, then monthly and usage.",
    base: { name: "Baller V Ultimate VIP", one_time_usd: 500000 },
    one_time_charges: [
      { line_item: "SING! Baller V Ultimate VIP", quantity: 1, unit_price: 500000 }
    ],
    monthly_recurring: [
      { line_item: "Golden Fractal Key (Baller V tier)", quantity: 1, unit_price: 5999 },
      { line_item: "WINK! 4×4 Ultimate", quantity: 1, unit_price: 6999 },
      { line_item: "Broadcast Pipe Ad Space (1 surface)", quantity: 1, unit_price: 6999 },
      { line_item: "Campus Monthly Pass (Baller)", quantity: 1, unit_price: 50000 }
    ],
    usage_this_period: [
      { line_item: "SING! node EGS Pipe — 1 month", quantity: 1, unit_price: 4999 },
      { line_item: "Sun Spots 24 min + certificate", quantity: 1, unit_price: 999 },
      { line_item: "Sun Spots 8 min", quantity: 1, unit_price: 249 },
      { line_item: "Schumann iGaming", quantity: 2, unit_price: 499 },
      { line_item: "Space Cloud — Solar Pipe", quantity: 1, unit_price: 2499 },
      { line_item: "Space Cloud — SING! node EGS Deep Space", quantity: 1, unit_price: 4999 },
      { line_item: "Space Cloud — Exascale Triangulation", quantity: 1, unit_price: 2499 },
      { line_item: "Missions — Personal SING! attention", quantity: 2, unit_price: 1499 },
      { line_item: "Happy Ending Zones — slot", quantity: 1, unit_price: 999 },
      { line_item: "Legacies", quantity: 1, unit_price: 2499 },
      { line_item: "Robotic Division — Chairman Robert", quantity: 1, unit_price: 1499 },
      { line_item: "Campus Half-day", quantity: 1, unit_price: 1000 },
      { line_item: "Campus Overnight (1 night)", quantity: 1, unit_price: 1500 },
      { line_item: "Dispensary — Members shelf", quantity: 1, unit_price: 499 }
    ],
    totals: { one_time_subtotal: 500000, monthly_subtotal: 69997, usage_subtotal: 27236, period_total: 97233 }
  };

  function fmt(n) {
    if (n == null || isNaN(n)) return '—';
    return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function renderBill(data) {
    var d = data || fallbackBill;
    var billHref = (document.location.pathname || '').indexOf('interfaces') !== -1 ? 'sing-config-cloud-bill.html' : 'interfaces/sing-config-cloud-bill.html';
    var oneTime = (d.one_time_charges || []).slice();
    var monthly = (d.monthly_recurring || []).slice();
    var usage = (d.usage_this_period || []).slice();
    var base = d.base;
    if (!base && oneTime[0]) {
      var ot = oneTime[0];
      base = { name: ot.line_item, one_time_usd: (ot.quantity || 1) * (ot.unit_price || 0) };
    }
    base = base || fallbackBill.base;
    var totals = d.totals || {};
    var periodTotal = totals.period_total != null ? totals.period_total : (totals.monthly_subtotal || 0) + (totals.usage_subtotal || 0);

    var html = '<section class="sing-config-footer" aria-label="My monthly bill">';
    html += '<p class="sing-config-footer-top-tag" style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.2em;color:rgba(212,175,55,0.95);font-weight:800;margin:0 0 0.5rem 0;">TAINO MADE</p>';
    html += '<h2 class="sing-config-footer-title">' + (d.title || 'My monthly bill') + '</h2>';
    html += '<p class="sing-config-bill-intro">' + (d.intro || fallbackBill.intro) + '</p>';

    html += '<div class="sing-config-bill-base">';
    html += '<span class="base-name">' + (base.name || 'Baller V Ultimate VIP') + '</span> ';
    html += '<span class="base-one-time">' + fmt(base.one_time_usd) + ' one-time</span>';
    html += '</div>';

    html += '<div class="sing-config-bill-table-wrap"><table class="sing-config-bill-table"><thead><tr><th>Line item</th><th class="amt">Amount</th></tr></thead><tbody>';
    if (monthly.length) {
      html += '<tr><td colspan="2" class="sing-config-bill-subhead">Monthly</td></tr>';
    }
    monthly.forEach(function (r) {
      var amt = (r.quantity != null ? r.quantity : 1) * (r.unit_price != null ? r.unit_price : 0);
      html += '<tr><td class="line-item">' + (r.line_item || '') + '</td><td class="amt">' + fmt(amt) + '</td></tr>';
    });
    if (usage.length) {
      html += '<tr><td colspan="2" class="sing-config-bill-subhead">Usage this period</td></tr>';
    }
    usage.forEach(function (r) {
      var amt = (r.quantity != null ? r.quantity : 1) * (r.unit_price != null ? r.unit_price : 0);
      html += '<tr><td class="line-item">' + (r.line_item || '') + '</td><td class="amt">' + fmt(amt) + '</td></tr>';
    });

    html += '</tbody></table></div>';
    html += '<div class="sing-config-bill-total"><span class="total-label">Total (monthly + usage)</span>' + fmt(periodTotal) + '</div>';
    html += '<p class="sing-config-bill-link"><a href="' + billHref + '">Full bill →</a></p>';
    html += '<p class="sing-config-footer-tag">NSPFRNP ⊃ SING! config ⊃ My monthly bill → ∞³</p>';
    html += '</section>';
    return html;
  }

  function inject() {
    var el = document.getElementById('sing-config-footer');
    if (!el) return;
    fetch(BILL_PATH)
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (data) {
        el.innerHTML = renderBill(data);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
