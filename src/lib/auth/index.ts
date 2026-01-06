const env = (import.meta as unknown as { env: Record<string, string> }).env;

export const GITHUB_CLIENT_ID = env.VITE_GITHUB_CLIENT_ID;
export const GITHUB_REDIRECT_URI = env.VITE_GITHUB_REDIRECT_URI || `${window.location.origin}/projects/auth/callback`;

export function initiateGitHubLogin() {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_REDIRECT_URI,
    scope: 'repo user:email',
    state: crypto.randomUUID(),
  });

  sessionStorage.setItem('oauth_state', params.get('state')!);
  window.location.href = `https://github.com/login/oauth/authorize?${params}`;
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  email: string;
}

export function getStoredUser(): GitHubUser | null {
  const stored = localStorage.getItem('github_user');
  return stored ? JSON.parse(stored) : null;
}

export function getStoredToken(): string | null {
  return localStorage.getItem('github_token');
}

export function setAuth(user: GitHubUser, token: string) {
  localStorage.setItem('github_user', JSON.stringify(user));
  localStorage.setItem('github_token', token);
}

export function clearAuth() {
  localStorage.removeItem('github_user');
  localStorage.removeItem('github_token');
  sessionStorage.removeItem('oauth_state');
}

export function isAuthenticated(): boolean {
  return !!getStoredToken();
}
