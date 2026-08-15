# Real — Deriv Bot-style trading workspace

A Vercel-ready Next.js workspace built around the current Deriv API architecture: OAuth 2.0 + PKCE, real-time public tick streams, authenticated account discovery, OTP WebSocket setup, contract proposals and buys, and a Blockly visual strategy builder.

## Vercel environment variables

Add these in **Vercel → Project → Settings → Environment Variables** for Production (and Preview if desired):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_DERIV_CLIENT_ID` | Your registered Deriv OAuth 2.0 client ID |
| `NEXT_PUBLIC_DERIV_REDIRECT_URI` | Exact registered callback, e.g. `https://YOUR-DOMAIN/callback` |
| `NEXT_PUBLIC_DERIV_API_BASE` | `https://api.derivws.com` |
| `NEXT_PUBLIC_DERIV_LEGACY_APP_ID` | Optional legacy V1 app ID; normally blank |

Do not commit access tokens, client secrets, or `.env` files.

## Deriv OAuth callback

Register the exact value of `NEXT_PUBLIC_DERIV_REDIRECT_URI` in the Deriv OAuth application. The app uses the current Authorization Code + PKCE flow and exchanges the authorization code server-side at `/api/oauth/token`.

## Deployment

Import `vincentmasinde55-png/Real` into Vercel. The project uses the Next.js framework and requires no custom build command.

## Trading safety

The interface defaults to a demo account when one is available. Selecting a real account and purchasing a contract can place a real-money trade. Verify account, stake, contract and environment before pressing Purchase/Run.

## Current scope

- Deriv-style dark workspace
- Blockly bot builder
- Trade/analysis/condition/utility toolbox
- Live tick chart using the public Deriv WebSocket
- OAuth 2.0 + PKCE login and callback
- Account discovery through the new Options REST API
- Demo/real account selection
- OTP-authenticated trading WebSocket
- Proposal → buy flow
- Transactions/journal area
- Vercel environment-variable template

The builder is modular so the full Deriv Bot block library, XML import/export, indicator blocks, contract lifecycle subscriptions and richer transaction/journal panels can be expanded without replacing the workspace.
