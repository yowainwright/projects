import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function AuthCallback() {
  const { handleCallback } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const hasRequiredParams = code && state;

    if (!hasRequiredParams) {
      setStatus('error');
      setError('Missing OAuth parameters');
      return;
    }

    handleCallback(code, state)
      .then(() => {
        setStatus('success');
        window.location.href = '/projects/?isLoggedIn=true';
      })
      .catch((err) => {
        setStatus('error');
        setError(err.message);
      });
  }, [handleCallback]);

  const isLoading = status === 'loading';
  const isError = status === 'error';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Authenticating...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500">Authentication failed: {error}</p>
        <a href="/projects/" className="text-blue-500 underline">
          Return to projects
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-green-500">Success! Redirecting...</p>
    </div>
  );
}
