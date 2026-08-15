'use client';
import { useEffect, useState } from 'react';

export default function CallbackPage(){
 const [message,setMessage]=useState('Completing secure Deriv login…');
 useEffect(()=>{(async()=>{
  const params=new URLSearchParams(location.search); const code=params.get('code'); const state=params.get('state'); const expected=sessionStorage.getItem('oauth_state'); const verifier=sessionStorage.getItem('pkce_verifier');
  if(params.get('error')){setMessage(params.get('error_description')||'Deriv login was cancelled.');return}
  if(!code||!state||state!==expected||!verifier){setMessage('Invalid OAuth callback. Please start login again.');return}
  try{const res=await fetch('/api/oauth/token',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code,codeVerifier:verifier,redirectUri:process.env.NEXT_PUBLIC_DERIV_REDIRECT_URI})});const data=await res.json();if(!res.ok||!data.access_token)throw new Error(data.error||data.message||'Token exchange failed');sessionStorage.removeItem('oauth_state');sessionStorage.removeItem('pkce_verifier');sessionStorage.setItem('deriv_token',data.access_token);setMessage('Login successful. Opening workspace…');setTimeout(()=>location.href='/',300)}catch(e:any){setMessage(`Login failed: ${e.message}`)}})()},[]);
 return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#07111f',color:'#e8f0fb',fontFamily:'system-ui'}}><div style={{padding:30,border:'1px solid #1b2c42',borderRadius:12,background:'#0b1728',textAlign:'center'}}><h2>Real Deriv Bot</h2><p>{message}</p></div></main>
}
