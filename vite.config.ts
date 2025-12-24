import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import million from 'million/compiler';
import path from 'path';

const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://us.i.posthog.com https://giscus.app",
    "style-src 'self' 'unsafe-inline' https://jeffry.in https://fonts.googleapis.com",
    "img-src 'self' https: data: https://yowainwright.imgix.net",
    "connect-src 'self' https://api.github.com https://github.com https://us.i.posthog.com",
    "frame-src https://giscus.app",
    "font-src 'self' https://fonts.gstatic.com https://jeffry.in https://yowainwright.imgix.net",
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export default defineConfig({
  base: '/projects/',
  builder: 'rolldown',
  plugins: [
    million.vite({ auto: true }),
    react(),
    tailwindcss(),
    {
      name: 'security-headers',
      configureServer(server) {
        server.middlewares.use((_, res, next) => {
          for (const [header, value] of Object.entries(securityHeaders)) {
            res.setHeader(header, value);
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
