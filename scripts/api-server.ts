import handler from '../api/auth/github/callback';

const PORT = 3001;

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === '/api/auth/github/callback') {
      return handler(req);
    }

    return new Response('Not found', { status: 404 });
  },
});

console.log(`API server running at http://localhost:${PORT}`);
