/**
 * GET /api/payment/paypal/config
 * Returns PayPal client config for the frontend (clientId, mode, currency).
 * Env: PAYPAL_CLIENT_ID or VIBELANDIA_PAYPAL_CLIENT_ID; PAYPAL_MODE or PAYPAL_LIVE.
 */

function getPayPalClientId() {
  const id =
    process.env.PAYPAL_CLIENT_ID ||
    process.env.VIBELANDIA_PAYPAL_CLIENT_ID ||
    (process.env.PAYPAL_MODE === 'production' || process.env.PAYPAL_LIVE === 'true'
      ? process.env.PAYPAL_CLIENT_ID_LIVE
      : process.env.PAYPAL_CLIENT_ID_SANDBOX);
  return id || '';
}

function getMode() {
  if (process.env.PAYPAL_MODE === 'production' || process.env.PAYPAL_LIVE === 'true') return 'production';
  return 'sandbox';
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const clientId = getPayPalClientId();
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    clientId,
    mode: getMode(),
    currency: process.env.PAYPAL_CURRENCY || 'USD',
  });
}
