/**
 * POST /api/payment/paypal/create-order
 * Creates a PayPal order via REST v2. Body: { planId, amount, currency?, description? }.
 * Env: PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET (or *_SANDBOX / *_LIVE by mode).
 */

const SANDBOX_BASE = 'https://api-m.sandbox.paypal.com';
const LIVE_BASE = 'https://api-m.paypal.com';

function getBaseUrl() {
  if (process.env.PAYPAL_MODE === 'production' || process.env.PAYPAL_LIVE === 'true') return LIVE_BASE;
  return SANDBOX_BASE;
}

function getClientId() {
  if (process.env.PAYPAL_MODE === 'production' || process.env.PAYPAL_LIVE === 'true') {
    return process.env.PAYPAL_CLIENT_ID_LIVE || process.env.PAYPAL_CLIENT_ID;
  }
  return process.env.PAYPAL_CLIENT_ID_SANDBOX || process.env.PAYPAL_CLIENT_ID;
}

function getClientSecret() {
  if (process.env.PAYPAL_MODE === 'production' || process.env.PAYPAL_LIVE === 'true') {
    return process.env.PAYPAL_CLIENT_SECRET_LIVE || process.env.PAYPAL_CLIENT_SECRET;
  }
  return process.env.PAYPAL_CLIENT_SECRET_SANDBOX || process.env.PAYPAL_CLIENT_SECRET;
}

async function getAccessToken() {
  const base = getBaseUrl();
  const clientId = getClientId();
  const clientSecret = getClientSecret();
  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const r = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`PayPal token failed: ${r.status} ${t}`);
  }
  const data = await r.json();
  return data.access_token;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  let body;
  try {
    body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount < 0) {
    return res.status(400).json({ error: 'Invalid or missing amount' });
  }
  if (amount === 0) {
    return res.status(200).json({ orderId: 'contact-required' });
  }
  const currency = body.currency || 'USD';
  const description = body.description || 'Vibelandia purchase';

  try {
    const token = await getAccessToken();
    const base = getBaseUrl();
    const createPayload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: description.slice(0, 127),
        },
      ],
    };
    const r = await fetch(`${base}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Accept-Language': 'en_US',
      },
      body: JSON.stringify(createPayload),
    });
    if (!r.ok) {
      const t = await r.text();
      return res.status(502).json({ error: `PayPal create order failed: ${r.status}`, details: t });
    }
    const order = await r.json();
    const orderId = order.id;
    if (!orderId) {
      return res.status(502).json({ error: 'PayPal did not return order id' });
    }
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      orderId,
      approvalUrl: order.links?.find((l) => l.rel === 'approve')?.href,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return res.status(500).json({ error: msg });
  }
}
