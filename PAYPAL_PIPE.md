# PayPal pipe (Vibelandia)

PayPal checkout is served by **same-origin** API routes on the Vibelandia deploy, so no external Octave 2 backend is required for payments. Patterns follow [paypal-examples/paypal-sdk-server-side-integration](https://github.com/paypal-examples/paypal-sdk-server-side-integration): raw PayPal response from capture (for INSTRUMENT_DECLINED + `actions.restart()`), `PayPal-Request-Id`, 5xx retry.

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/payment/paypal/config` | Returns `clientId`, `mode`, `currency` for the frontend SDK |
| POST | `/api/payment/paypal/create-order` | Creates a PayPal order; body: `{ planId, amount, currency?, description? }` |
| POST | `/api/payment/paypal/capture-order` | Captures the order; body: `{ orderId, payerId? }` |

Handlers live in `api/payment/paypal/` and are emitted into `.vercel/output/functions` by `scripts/vercel-static-output.mjs` (Build Output API v3).

## Environment variables

Set in Vercel (or `.env` for local) so the serverless functions can talk to PayPal.

| Variable | Required | Description |
|----------|----------|-------------|
| `PAYPAL_CLIENT_ID` or `VIBELANDIA_PAYPAL_CLIENT_ID` | Yes (for create/capture) | PayPal app Client ID (sandbox or live) |
| `PAYPAL_CLIENT_SECRET` | Yes (for create/capture) | PayPal app Client Secret |
| `PAYPAL_MODE` | No | `sandbox` (default) or `production` |
| `PAYPAL_LIVE` | No | `true` to use live; otherwise sandbox |
| `PAYPAL_CLIENT_ID_SANDBOX` / `PAYPAL_CLIENT_SECRET_SANDBOX` | Alternative | Used when not in production mode |
| `PAYPAL_CLIENT_ID_LIVE` / `PAYPAL_CLIENT_SECRET_LIVE` | Alternative | Used when `PAYPAL_MODE=production` or `PAYPAL_LIVE=true` |
| `PAYPAL_CURRENCY` | No | Default `USD` |
| `VIBELANDIA_PAYPAL_CLIENT_ID` or `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Build-time | Injected into `api-config.js` for the frontend (optional; config endpoint also returns clientId) |

**Config** only needs a client ID (for the frontend SDK). **Create-order** and **capture-order** need both Client ID and Client Secret.

## Frontend behavior

- On **psw-vibelandia-sing4.vercel.app** (and previews) and **localhost**, `VIBELANDIA_API_BASE` is set to the current origin, so the checkout page calls `/api/payment/paypal/*` on the same host.
- On other hosts, the frontend falls back to the Octave 2 Cloud Onramp URL.

## Pushing credentials to Vercel

From your machine (Node 18+), using credentials in `.env.nspfrnp`, `.env.local`, or `.env`:

```bash
node scripts/set-vercel-env-from-credentials.mjs
```

Requires `VERCEL_TOKEN` in that file (or in the environment). Pushes all listed vars including PayPal pipe (`PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, etc.). Or use the GitHub Action **Set Vercel env** (add the same vars as repo secrets, then run the workflow).

## Local dev

1. Set `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` (sandbox) in `.env`.
2. Run the Vercel build so functions are in `.vercel/output/functions`; then use `vercel dev` to run API + static together.

## References

- PayPal Orders v2: https://developer.paypal.com/docs/api/orders/v2/
- Build Output API: https://vercel.com/docs/build-output-api/v3
