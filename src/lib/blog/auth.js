// Admin sessions: a cookie holding `payload.signature`, signed with HMAC-SHA256 using
// ADMIN_SESSION_SECRET. Web Crypto only, so the same code runs in proxy.js and in routes.

export const SESSION_COOKIE = 'krold_admin'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7

const encoder = new TextEncoder()

function base64url(bytes) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64url(value) {
  const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(binary, (c) => c.charCodeAt(0))
}

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 32) return null
  return secret
}

export function isAuthConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && getSecret())
}

async function hmac(data) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(getSecret()), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ])
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(data)))
}

// Compares digests rather than the strings themselves, so the time taken doesn't leak
// how much of a guess was right.
async function safeEqual(a, b) {
  const [x, y] = await Promise.all(
    [a, b].map(async (s) => new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(String(s))))),
  )
  let diff = 0
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i]
  return diff === 0
}

export async function checkCredentials(username, password) {
  if (!isAuthConfigured()) return false
  const [userOk, passOk] = await Promise.all([
    safeEqual(username, process.env.ADMIN_USERNAME),
    safeEqual(password, process.env.ADMIN_PASSWORD),
  ])
  return userOk && passOk
}

export async function createSessionToken(username) {
  const payload = base64url(encoder.encode(JSON.stringify({ u: username, exp: Date.now() + SESSION_MAX_AGE * 1000 })))
  return `${payload}.${base64url(await hmac(payload))}`
}

export async function verifySessionToken(token) {
  if (!token || !getSecret()) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null
  try {
    if (!(await safeEqual(base64url(await hmac(payload)), signature))) return null
    const data = JSON.parse(new TextDecoder().decode(fromBase64url(payload)))
    if (!data.exp || data.exp < Date.now()) return null
    return { username: data.u }
  } catch {
    return null
  }
}
