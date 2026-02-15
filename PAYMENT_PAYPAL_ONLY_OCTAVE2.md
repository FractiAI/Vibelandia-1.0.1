# Payment: PayPal Only via Octave 2 Cloud Onramp

**Policy:** Payments are **PayPal only**, via the [Syntheverse 7 Octave 2-3 Public Cloud Onramp](https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp). All other payment pipes (Stripe, Venmo, Cash App, MetaMask, etc.) are **removed** at the Cloud Onramp (Octave 2).

---

## Octave 1 (this repo — psw.vibelandia.sing9)

- **Payment flow:** `interfaces/payment-checkout.html` → Cloud Onramp API (Octave 2).
- **Client:** `src/paypal-payment-system.ts` — all payment operations go to Octave 2 (`/api/payment/paypal/*`: config, create-order, capture-order).
- **No other payment methods** are exposed in this repo; PayPal only.

---

## Octave 2 (Cloud Onramp repo — changes required there)

**Repository:** https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp  
**Live URL:** https://syntheverse-poc.vercel.app

### Checklist: Activate PayPal only, remove other payment pipes

1. **Activate PayPal**
   - Ensure PayPal SDK/API routes are the **only** active payment provider.
   - Ensure `/api/payment/paypal/config`, `create-order`, `capture-order` (or equivalent) are live and used by Octave 1.

2. **Remove other payment pipes**
   - **Stripe:** Remove or disable Stripe Checkout, Stripe Billing Portal, Stripe webhooks for payments; remove Stripe from README/“Payment Methods” and env docs.
   - **Venmo / Cash App:** Remove any Venmo/Cash App payment routes and UI; remove from docs and env.
   - **MetaMask / crypto:** Remove MetaMask (or other wallet) as initial/default payment option; remove from “Payment Methods” and flows.
   - **NSPFRP Auto Mode:** If it referred to non-PayPal methods, update so only PayPal is the payment pipe.

3. **Docs and env**
   - **README / payment docs:** State “Payment: PayPal only.” Remove Stripe, Venmo, Cash App, MetaMask from “Payment Methods” and feature lists.
   - **Environment variables:** Remove or document as unused any Stripe/Venmo/Cash App/MetaMask keys; keep only PayPal-related and app/auth/env.

4. **Optional**
   - Add a short “Payment: PayPal only” note in the Cloud Onramp README and, if present, in a PAYMENT or SETUP doc.

---

## Reference

- **Octave 1 payment client:** `src/paypal-payment-system.ts` (calls Octave 2 PayPal API).
- **Cloud Onramp connection:** [CLOUD_API_CONNECTION.md](./CLOUD_API_CONNECTION.md).
- **Cloud Onramp repo:** [FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp](https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp).

**To apply the Octave 2 changes:** Open the Cloud Onramp repository in Cursor (clone or add to workspace), then implement the checklist above in that repo.
