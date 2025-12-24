import { Buffer } from 'buffer';
window.Buffer = Buffer;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routes';
import { initAnalytics } from './lib/analytics';
import './index.css';

initAnalytics();

const router = createRouter({ routeTree, basepath: '/projects' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
