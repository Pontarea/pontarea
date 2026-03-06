import type { VercelRequest, VercelResponse } from '@vercel/node';

async function verifyHmac(payload: string, sig: string, secret: string): Promise<boolean> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const sigBytes = Buffer.from(sig, 'base64url');
  return crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(payload));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { token } = req.body as { token?: string };
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || !token) return res.status(401).json({ valid: false });

  try {
    const dot = token.indexOf('.');
    if (dot === -1) return res.status(401).json({ valid: false });

    const encodedPayload = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const payload = Buffer.from(encodedPayload, 'base64url').toString();

    const ok = await verifyHmac(payload, sig, secret);
    if (!ok) return res.status(401).json({ valid: false, reason: 'bad_sig' });

    const parts = payload.split(':');
    if (parts[0] !== 'magic' && parts[0] !== 'session') {
      return res.status(401).json({ valid: false, reason: 'wrong_type' });
    }

    const expiry = parseInt(parts[1]);
    if (isNaN(expiry) || Date.now() > expiry) {
      return res.status(401).json({ valid: false, reason: 'expired' });
    }

    return res.status(200).json({ valid: true });
  } catch {
    return res.status(401).json({ valid: false });
  }
}
