import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProjectsMicrofrontend } from '@/components/ProjectsMicrofrontend';
import { Toaster } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export function App() {
  const { loading } = useAuth();
  const [isAuthRedirect, setIsAuthRedirect] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsAuthRedirect(params.get('isLoggedIn') === 'true');
  }, []);

  if (loading && isAuthRedirect) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-foreground" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="section">
        <header className="header__description">
          <h1>
            Projects showcase: This page showcase projects I work on, maintain, or have done so in the past.
          </h1>
        </header>
        <ProjectsMicrofrontend />
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </>
  );
}
