import { describe, test, expect } from 'bun:test';
import handler from '../../../api/auth/github/callback';

const createRequest = (options: {
  method?: string;
  origin?: string;
  body?: unknown;
  ip?: string;
}) => {
  const { method = 'POST', origin = 'http://localhost:5173', body, ip = '127.0.0.1' } = options;
  return new Request('http://localhost:3001/api/auth/github/callback', {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Origin': origin,
      'x-forwarded-for': ip,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};

describe('api/auth/github/callback', () => {
  describe('CORS', () => {
    test('handles OPTIONS preflight request', async () => {
      const req = createRequest({ method: 'OPTIONS' });
      const res = await handler(req);

      expect(res.status).toBe(204);
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:5173');
      expect(res.headers.get('Access-Control-Allow-Methods')).toBe('POST, OPTIONS');
    });

    test('allows localhost origins', async () => {
      const req = createRequest({ method: 'OPTIONS', origin: 'http://localhost:4173' });
      const res = await handler(req);

      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:4173');
    });

    test('allows production origin', async () => {
      const req = createRequest({ method: 'OPTIONS', origin: 'https://jeffry.in' });
      const res = await handler(req);

      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://jeffry.in');
    });

    test('falls back to first allowed origin for unknown origins', async () => {
      const req = createRequest({ method: 'OPTIONS', origin: 'https://evil.com' });
      const res = await handler(req);

      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:5173');
    });
  });

  describe('method validation', () => {
    test('rejects non-POST methods', async () => {
      const req = createRequest({ method: 'GET' });
      const res = await handler(req);

      expect(res.status).toBe(405);
    });
  });

  describe('input validation', () => {
    test('returns 400 when code is missing', async () => {
      const req = createRequest({ body: {} });
      const res = await handler(req);

      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe('Missing or invalid code');
    });

    test('returns 400 when code is not a string', async () => {
      const req = createRequest({ body: { code: 123 } });
      const res = await handler(req);

      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe('Missing or invalid code');
    });

    test('returns 400 for invalid JSON body', async () => {
      const req = new Request('http://localhost:3001/api/auth/github/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:5173',
          'x-forwarded-for': '127.0.0.1',
        },
        body: 'not valid json',
      });
      const res = await handler(req);

      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe('Invalid JSON body');
    });
  });

  describe('rate limiting', () => {
    test('allows requests under limit', async () => {
      const req = createRequest({ body: { code: 'test' }, ip: '192.168.1.1' });
      const res = await handler(req);

      expect(res.status).not.toBe(429);
    });
  });
});
