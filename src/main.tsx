import { Buffer } from 'buffer';
window.Buffer = Buffer;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routes';
import { initAnalytics, trackEvent } from './lib/analytics';
import { Button } from './components/ui/button';
import './index.css';

initAnalytics();

const router = createRouter({ routeTree, basepath: '/projects' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function ErrorFallback({ resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground">An unexpected error occurred.</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

function handleError(error: Error) {
  trackEvent('error_boundary_caught', { message: error.message });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
