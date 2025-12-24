'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, LogIn, LogOut } from 'lucide-react';

const ICON_SIZE = 'w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]';
const ICON_BUTTON_CLASS = 'flex items-center justify-center transition-opacity hover:opacity-70';

function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('isAdmin');
    const hasAdminParam = adminParam === 'true';
    setIsAdmin(hasAdminParam);
    setIsAdminLoading(false);
  }, []);

  return { isAdmin, isAdminLoading };
}

function LoadingButton() {
  return (
    <div className={`${ICON_SIZE} flex items-center justify-center`}>
      <Loader2 className={`${ICON_SIZE} text-foreground animate-spin`} />
    </div>
  );
}

interface LogoutButtonProps {
  onLogout: () => void;
}

function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <button
      onClick={onLogout}
      className={`${ICON_BUTTON_CLASS} border-0 bg-transparent p-0`}
      title="Sign out"
    >
      <LogOut className={`${ICON_SIZE} text-foreground`} />
    </button>
  );
}

interface SignInButtonProps {
  onLogin: () => void;
}

function SignInButton({ onLogin }: SignInButtonProps) {
  return (
    <button onClick={onLogin} className={`${ICON_BUTTON_CLASS} border-0 bg-transparent p-0`} title="Sign in with GitHub">
      <LogIn className={`${ICON_SIZE} text-foreground`} />
    </button>
  );
}

export function AuthButton() {
  const { isAdmin, isAdminLoading } = useIsAdmin();
  const { isAuthenticated, loading, login, logout } = useAuth();

  const isLoading = isAdminLoading || loading;

  if (isLoading) {
    return null;
  }

  if (!isAdmin) {
    return null;
  }

  if (isAuthenticated) {
    return <LogoutButton onLogout={logout} />;
  }

  return <SignInButton onLogin={login} />;
}
