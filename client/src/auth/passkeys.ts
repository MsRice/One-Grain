
const API_BASE = import.meta.env.VITE_API_BASE_URL

const optionsRes = await fetch(`${API_BASE}/webauthn/register/start`, {
  method: 'POST',
  credentials: 'include',
});

const options = await optionsRes.json();

const credential = await navigator.credentials.create({
  publicKey: options,
});

await fetch(`${API_BASE}/webauthn/register/finish`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ credential }),
});
