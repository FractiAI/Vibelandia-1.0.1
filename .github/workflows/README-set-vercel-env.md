# Set Vercel env (manual workflow)

This workflow pushes environment variables to your Vercel project so you don’t need Node on your machine.

## 1. Add secrets in GitHub

1. Open your repo on GitHub.
2. Go to **Settings** → **Secrets and variables** → **Actions**.
3. Click **New repository secret** and add:

| Secret name | Required | Description |
|-------------|----------|-------------|
| `VERCEL_TOKEN` | **Yes** | From [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VIBELANDIA_SUPABASE_ANON_KEY` | Optional | Supabase anon key (for auth) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Same as above (build uses this) |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Supabase project URL |
| `VIBELANDIA_PAYPAL_CLIENT_ID` | Optional | PayPal client ID (for checkout button) |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Optional | Same (if you use this name) |
| **PayPal pipe** (for `/api/payment/paypal/*`) | | |
| `PAYPAL_CLIENT_ID` | Optional | PayPal app Client ID (or use *_SANDBOX / *_LIVE) |
| `PAYPAL_CLIENT_SECRET` | Optional | PayPal app Client Secret (stored as secret) |
| `PAYPAL_MODE` | Optional | `sandbox` or `production` |
| `PAYPAL_CLIENT_ID_SANDBOX` / `PAYPAL_CLIENT_SECRET_SANDBOX` | Optional | Sandbox credentials |
| `PAYPAL_CLIENT_ID_LIVE` / `PAYPAL_CLIENT_SECRET_LIVE` | Optional | Live credentials |
| `VERCEL_PROJECT_ID` | Optional | Default: `psw-vibelandia-sing4` |
| `VERCEL_TEAM_ID` | Optional | Only if project is under a team |

## 2. Run the workflow

1. Go to **Actions**.
2. Select **Set Vercel env** in the left sidebar.
3. Click **Run workflow** (use the default branch).
4. Wait for the run to finish (green check).

## 3. Redeploy

In Vercel, trigger a new deployment (e.g. redeploy from the dashboard or push a commit) so the new env vars are used.
