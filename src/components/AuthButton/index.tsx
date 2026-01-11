'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, LogIn, LogOut } from 'lucide-react';

const ICON_SIZE = 'w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]';
const ICON_BUTTON_CLASS = 'flex items-center justify-center transition-opacity hover:opacity-70';

function useAuthParams() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShowLogin(params.get('login') === 'true');
    setIsLoggedIn(params.get('isLoggedIn') === 'true');
    setIsLoading(false);
  }, []);

  return { showLogin, isLoggedIn, isLoading };
}

export function AuthButton() {
  const { showLogin, isLoggedIn, isLoading: paramLoading } = useAuthParams();
  const { isAuthenticated, loading, login, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isLoading = paramLoading || loading;

  useEffect(() => {
    if (isLoading) return;
    const hasTokenButNoParam = isAuthenticated && !isLoggedIn;
    if (hasTokenButNoParam) {
      logout();
    }
  }, [isLoading, isAuthenticated, isLoggedIn, logout]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    window.location.href = '/projects/';
  };

  if (isLoading || isLoggingOut) {
    return (
      <div className={`${ICON_SIZE} flex items-center justify-center`}>
        <Loader2 className={`${ICON_SIZE} text-foreground animate-spin`} />
      </div>
    );
  }

  if (isLoggedIn && isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        className={`${ICON_BUTTON_CLASS} border-0 bg-transparent p-0`}
        title="Sign out"
      >
        <LogOut className={`${ICON_SIZE} text-foreground`} />
      </button>
    );
  }

  if (showLogin && !isAuthenticated) {
    return (
      <button
        onClick={login}
        className={`${ICON_BUTTON_CLASS} border-0 bg-transparent p-0`}
        title="Sign in with GitHub"
      >
        <LogIn className={`${ICON_SIZE} text-foreground`} />
      </button>
    );
  }

  return null;
}
