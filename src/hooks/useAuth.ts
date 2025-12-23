import { useState, useEffect, useCallback } from 'react';
import {
  getStoredUser,
  getStoredToken,
  setAuth,
  clearAuth,
  initiateGitHubLogin,
  type GitHubUser,
} from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    const storedToken = getStoredToken();
    setUser(storedUser);
    setToken(storedToken);
    setLoading(false);
  }, []);

  const login = useCallback(() => {
    initiateGitHubLogin();
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    setToken(null);
  }, []);

  const handleCallback = useCallback(async (code: string, state: string) => {
    const storedState = localStorage.getItem('oauth_state');
    const isInvalidState = state !== storedState;

    if (isInvalidState) {
      throw new Error('Invalid OAuth state');
    }

    const response = await fetch('/api/auth/github/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const isError = !response.ok;
    if (isError) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await response.json();
    setAuth(data.user, data.token);
    setUser(data.user);
    setToken(data.token);
  }, []);

  const isAuthenticated = Boolean(token);

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    handleCallback,
  };
}
