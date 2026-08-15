import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code, codeVerifier, redirectUri } = await request.json();
    const clientId = process.env.NEXT_PUBLIC_DERIV_CLIENT_ID;
    const configuredRedirect = process.env.NEXT_PUBLIC_DERIV_REDIRECT_URI;
    if (!clientId) return NextResponse.json({ error: 'Missing NEXT_PUBLIC_DERIV_CLIENT_ID' }, { status: 500 });
    if (!code || !codeVerifier) return NextResponse.json({ error: 'Missing authorization code or PKCE verifier' }, { status: 400 });
    const uri = redirectUri || configuredRedirect;
    if (!uri) return NextResponse.json({ error: 'Missing redirect URI' }, { status: 500 });
    const body = new URLSearchParams({ grant_type:'authorization_code', client_id:clientId, code, code_verifier:codeVerifier, redirect_uri:uri });
    const response = await fetch('https://auth.deriv.com/oauth2/token', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body, cache:'no-store' });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Token exchange failed' }, { status:500 });
  }
}
