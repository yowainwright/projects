'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Github, LogOut } from 'lucide-react';

const BUTTON_BASE = 'flex items-center gap-2 text-sm rounded-md transition-colors';
const LOADING_BUTTON_CLASS = `${BUTTON_BASE} px-3 py-1.5 bg-muted text-muted-foreground`;
const SIGN_IN_BUTTON_CLASS = `${BUTTON_BASE} px-3 py-1.5 bg-foreground text-background hover:bg-foreground/90`;
const LOGOUT_BUTTON_CLASS = `${BUTTON_BASE} gap-1 px-2 py-1 hover:bg-muted`;

function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('isAdmin');
    const hasAdminParam = adminParam === 'true';
    setIsAdmin(hasAdminParam);
  }, []);

  return isAdmin;
}

function LoadingButton() {
  return (
    <button disabled className={LOADING_BUTTON_CLASS}>
      Loading...
    </button>
  );
}

interface AuthenticatedUserProps {
  avatarUrl: string;
  login: string;
  onLogout: () => void;
}

function AuthenticatedUser({ avatarUrl, login, onLogout }: AuthenticatedUserProps) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={avatarUrl}
        alt={login}
        className="w-6 h-6 rounded-full"
      />
      <span className="text-sm text-muted-foreground hidden sm:inline">
        {login}
      </span>
      <button
        onClick={onLogout}
        className={LOGOUT_BUTTON_CLASS}
        title="Sign out"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}

interface SignInButtonProps {
  onLogin: () => void;
}

function SignInButton({ onLogin }: SignInButtonProps) {
  return (
    <button onClick={onLogin} className={SIGN_IN_BUTTON_CLASS}>
      <Github className="w-4 h-4" />
      Sign in
    </button>
  );
}

export function AuthButton() {
  const isAdmin = useIsAdmin();
  const { user, isAuthenticated, loading, login, logout } = useAuth();

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return <LoadingButton />;
  }

  const isLoggedIn = isAuthenticated && user;
  if (isLoggedIn) {
    return (
      <AuthenticatedUser
        avatarUrl={user.avatar_url}
        login={user.login}
        onLogout={logout}
      />
    );
  }

  return <SignInButton onLogin={login} />;
}
