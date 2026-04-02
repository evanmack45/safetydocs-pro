# SafetyDocs Pro - Deployment Guide

Production deployment on Vercel with Stripe payments and Anthropic Claude AI.

## Prerequisites

- GitHub repository: https://github.com/evanmack45/safetydocs-pro
- A Vercel account (free tier works)
- A Stripe account with API keys
- An Anthropic API key

## 1. Vercel Setup

### Option A: Vercel Dashboard (recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository" and select `evanmack45/safetydocs-pro`
3. Vercel auto-detects Next.js. Confirm these build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build --turbopack`
   - **Output Directory:** (leave default)
   - **Install Command:** `npm install`
4. Add environment variables (see Section 2 below) before clicking Deploy
5. Click **Deploy**

### Option B: Vercel CLI

```bash
npm i -g vercel
cd safetydocs-pro
vercel login
vercel link          # Link to your Vercel team/project
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add ANTHROPIC_API_KEY production
vercel --prod        # Deploy to production
```

## 2. Environment Variables

Add these in Vercel Dashboard > Project Settings > Environment Variables (or via CLI above):

| Variable | Where to get it | Example |
|----------|----------------|---------|
| `STRIPE_SECRET_KEY` | https://dashboard.stripe.com/apikeys | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Created in Step 3 below | `whsec_...` |
| `ANTHROPIC_API_KEY` | https://console.anthropic.com/settings/keys | `sk-ant-...` |

Set all three for the **Production** environment. For preview deployments, use Stripe test keys (`sk_test_...`).

See `.env.production.example` for a local reference.

## 3. Stripe Webhook Configuration

After the first deploy, you have a production URL (e.g., `https://safetydocs-pro.vercel.app`).

1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Set the endpoint URL: `https://YOUR-DOMAIN.vercel.app/api/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (`whsec_...`)
7. Add it as `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
8. Redeploy: Vercel Dashboard > Deployments > three-dot menu > Redeploy

### Testing webhooks locally

```bash
# Install Stripe CLI: https://docs.stripe.com/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/webhook
# Copy the webhook signing secret it prints and add to .env.local
```

## 4. Domain Configuration (optional)

1. Vercel Dashboard > Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel (CNAME or A record)
4. Vercel provisions SSL automatically
5. Update the Stripe webhook endpoint URL to use the custom domain

## 5. Post-Deployment Verification

Run through this checklist after every production deploy:

- [ ] **Health check:** `curl https://YOUR-DOMAIN/api/health` returns `{"status":"healthy",...}`
- [ ] **Homepage loads:** Visit the root URL, confirm hero section and pricing render
- [ ] **Pricing page:** `/pricing` shows all three document types with correct prices
- [ ] **Generate page:** `/generate` loads the document selection form
- [ ] **Blog:** `/blog` lists all articles, each article page loads
- [ ] **Sitemap:** `/sitemap.xml` returns valid XML
- [ ] **Robots.txt:** `/robots.txt` returns expected content
- [ ] **Stripe test purchase:** Use Stripe test card `4242 4242 4242 4242` to complete a checkout (requires Stripe test keys)
- [ ] **Webhook delivery:** Check Stripe Dashboard > Webhooks > endpoint > Recent deliveries for 200 responses
- [ ] **Security headers:** Verify `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy` in response headers

## 6. Monitoring

Set up uptime monitoring against the health check endpoint:

```
GET https://YOUR-DOMAIN/api/health
Expected: 200 OK with {"status":"healthy"}
Alert if: status is "degraded" or non-200 response
Interval: 5 minutes
```

The health endpoint reports:
- `status`: "healthy" (all env vars set) or "degraded" (missing env vars)
- `version`: from package.json
- `env`: which environment variables are configured (boolean, no values exposed)

## 7. Updating

Push to `main` branch on GitHub. Vercel auto-deploys on push.

```bash
git push origin main
```

Preview deployments are created automatically for pull requests.

## Cost Estimates

| Service | Tier | Monthly cost |
|---------|------|-------------|
| Vercel | Hobby (free) | $0 |
| Stripe | Pay-as-you-go | 2.9% + $0.30 per transaction |
| Anthropic API | Pay-per-token | ~$0.01-0.10 per document generation |
| Custom domain | Optional | ~$10-15/year |

The Vercel free tier includes 100 GB bandwidth and serverless function invocations sufficient for early traffic. Upgrade to Pro ($20/mo) if you exceed limits or need team features.
